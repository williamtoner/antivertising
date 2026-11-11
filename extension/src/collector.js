/*
 * Runs in every frame. Most ads live inside cross-origin iframes the page
 * itself cannot read, so each frame reports what it can see about its own
 * contents (link targets and visible text) when the background worker asks.
 *
 * Nothing is posted to the page and nothing leaves the browser: replies go
 * over the extension's private message channel only.
 */
(function () {
  'use strict';
  if (globalThis.AVCollect) return;

  var MAX_URLS = 60;
  var MAX_TEXT = 3000;
  var URL_ATTRS = ['data-href', 'data-url', 'data-click-url', 'data-destination-url'];
  var NOT_TEXT = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, TEXTAREA: 1, TITLE: 1 };

  // Text a person could read. Walks text nodes rather than using innerText,
  // which falls back to raw textContent (scripts and all) in frames that are
  // not being rendered, as many ad frames are not.
  function readableText(rootEl) {
    var walker = rootEl.ownerDocument.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        return !parent || NOT_TEXT[parent.tagName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var out = '';
    var node;
    while (out.length < MAX_TEXT && (node = walker.nextNode())) {
      var t = node.nodeValue.trim();
      if (t) out += ' ' + t;
    }
    return out;
  }

  // Rich-media ads often have no link at all: the click is handled in script,
  // and the landing page sits in a variable such as clickTag or in an
  // "adurl=" parameter. Only values under those names are taken; a script's
  // other URLs are trackers and libraries, which say nothing about who paid.
  var MAX_SCRIPT_CHARS = 300000;
  var MAX_SCRIPT_TARGETS = 12;
  var CLICK_VAR = /(?:adurl|click_?tag\d*|click_?url|click_?through_?url|destination_?url|landing_?page(?:_?url)?|final_?url)["']?\s*[=:]\s*["']?(https?(?::\/\/|%3A%2F%2F)[^"'\s\\<>&]{4,400})/gi;

  function scriptTargets(rootEl) {
    var out = [];
    var budget = MAX_SCRIPT_CHARS;
    var scripts = rootEl.querySelectorAll('script:not([src])');
    for (var i = 0; i < scripts.length && budget > 0 && out.length < MAX_SCRIPT_TARGETS; i++) {
      var code = (scripts[i].textContent || '').slice(0, budget);
      budget -= code.length;
      if (!/adurl|click|destination|landing|final/i.test(code)) continue;
      // Undo the escaping used inside JavaScript and JSON strings.
      code = code.replace(/\\(?:x3d|u003d)/gi, '=').replace(/\\(?:x26|u0026)/gi, '&').replace(/\\\//g, '/');
      code = code.replace(/\\(["'])/g, '$1');
      CLICK_VAR.lastIndex = 0;
      var m;
      while (out.length < MAX_SCRIPT_TARGETS && (m = CLICK_VAR.exec(code))) {
        var u = m[1];
        if (/^https?%3A/i.test(u)) {
          try { u = decodeURIComponent(u); } catch (e) { continue; }
        }
        out.push(u);
      }
    }
    return out;
  }

  /*
   * returns {
   *   links: where a click would go (anchor targets): the best evidence of
   *          who the advertiser is
   *   urls:  links plus everything else URL-shaped (frame sources and so on)
   *   text:  readable text, image alt text and labels
   * }
   */
  function collect(rootEl) {
    var urls = [];
    var links = [];
    var seen = {};

    function addUrl(u, isLink) {
      if (typeof u !== 'string' || !/^https?:/i.test(u)) return;
      if (seen[u] || urls.length >= MAX_URLS) return;
      seen[u] = true;
      u = u.slice(0, 2000);
      urls.push(u);
      if (isLink) links.push(u);
    }

    if (rootEl.matches('a[href], area[href]')) addUrl(rootEl.href, true);
    var wrapper = rootEl.parentElement && rootEl.parentElement.closest('a[href]');
    if (wrapper) addUrl(wrapper.href, true);
    rootEl.querySelectorAll('a[href], area[href]').forEach(function (a) { addUrl(a.href, true); });
    rootEl.querySelectorAll('[' + URL_ATTRS.join('],[') + ']').forEach(function (el) {
      URL_ATTRS.forEach(function (attr) { addUrl(el.getAttribute(attr), true); });
    });

    scriptTargets(rootEl).forEach(function (u) { addUrl(u, true); });

    if (rootEl.matches('iframe[src]')) addUrl(rootEl.src, false);
    rootEl.querySelectorAll('iframe[src]').forEach(function (f) { addUrl(f.src, false); });

    var parts = [readableText(rootEl)];
    // Frame titles are boilerplate ("Advertisement", "3rd party ad content").
    var labelled = rootEl.querySelectorAll('img[alt], [aria-label]:not(iframe), [title]:not(iframe)');
    for (var i = 0; i < labelled.length && i < 60; i++) {
      var el = labelled[i];
      parts.push(el.getAttribute('alt') || '', el.getAttribute('aria-label') || '', el.getAttribute('title') || '');
    }

    return { urls: urls, links: links, text: parts.join(' ').replace(/\s+/g, ' ').slice(0, MAX_TEXT) };
  }

  globalThis.AVCollect = collect;

  /*
   * Frame handshake: how the top frame learns which Chrome frame id belongs
   * to which <iframe> element, something no API will tell a content script.
   *
   *   1. Each frame directly under the top frame makes up a random token and
   *      posts it to its parent. The top frame sees which window the message
   *      came from, so it can pair the token with the <iframe> element.
   *   2. When the top frame wants to know about an iframe, it gives that
   *      token to the background worker, which asks every frame in the tab
   *      "whose is this?". The owner answers, and the answer's sender is the
   *      frame id.
   *
   * It runs in this direction, child to parent, because ad scripts build
   * their frames with document.open(), which silently removes every DOM
   * event listener inside the frame. The top document's listener and
   * chrome.runtime listeners survive that. The token carries no information.
   */
  var HELLO = 'antivertising:';
  var TOKEN = /^[0-9a-f]{32}$/;
  var MAX_CHILDREN = 400;
  var myToken = null;

  function newToken() {
    var bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.prototype.map.call(bytes, function (b) { return (b + 256).toString(16).slice(1); }).join('');
  }

  if (window === window.top) {
    var children = []; // { win, token } for frames directly under this one
    window.addEventListener('message', function (e) {
      if (typeof e.data !== 'string' || e.data.slice(0, HELLO.length) !== HELLO) return;
      var token = e.data.slice(HELLO.length);
      if (!TOKEN.test(token)) return;
      e.stopImmediatePropagation(); // ours; the page's own scripts need not see it
      if (!e.source || e.source === window) return;
      for (var i = 0; i < children.length; i++) {
        if (children[i].win === e.source) { children[i].token = token; return; }
      }
      if (children.length >= MAX_CHILDREN) {
        children = children.filter(function (c) { return !c.win.closed; }).slice(-MAX_CHILDREN / 2);
      }
      children.push({ win: e.source, token: token });
    }, true);

    // The token announced by the frame behind this window, if it has one yet.
    globalThis.AVFrameToken = function (win) {
      for (var i = 0; i < children.length; i++) if (children[i].win === win) return children[i].token;
      return null;
    };
  } else {
    var underTop = false;
    try { underTop = window.parent === window.top; } catch (err) { /* cannot happen for parent/top, but be safe */ }
    if (underTop) {
      myToken = newToken();
      try { window.parent.postMessage(HELLO + myToken, '*'); } catch (err) { /* parent went away */ }
    }
  }

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg && msg.type === 'av-who') {
      if (myToken && Array.isArray(msg.tokens) && msg.tokens.indexOf(myToken) !== -1) {
        try {
          chrome.runtime.sendMessage({ type: 'av-frame-hello', nonce: myToken }).catch(function () {});
        } catch (err) { /* extension was reloaded under this page */ }
      }
      return;
    }
    if (!msg || msg.type !== 'av-collect') return;
    var root = document.documentElement;
    var out = root ? collect(root) : { urls: [], links: [], text: '' };
    out.urls.unshift(location.href);
    sendResponse(out);
  });
})();
