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

  function collect(rootEl) {
    var urls = [];
    var seen = {};

    function addUrl(u) {
      if (typeof u !== 'string' || !/^https?:/i.test(u)) return;
      if (seen[u] || urls.length >= MAX_URLS) return;
      seen[u] = true;
      urls.push(u.slice(0, 2000));
    }

    if (rootEl.matches('a[href], area[href]')) addUrl(rootEl.href);
    if (rootEl.matches('iframe[src]')) addUrl(rootEl.src);
    var wrapper = rootEl.parentElement && rootEl.parentElement.closest('a[href]');
    if (wrapper) addUrl(wrapper.href);

    rootEl.querySelectorAll('a[href], area[href]').forEach(function (a) { addUrl(a.href); });
    rootEl.querySelectorAll('iframe[src]').forEach(function (f) { addUrl(f.src); });
    rootEl.querySelectorAll('[' + URL_ATTRS.join('],[') + ']').forEach(function (el) {
      URL_ATTRS.forEach(function (attr) { addUrl(el.getAttribute(attr)); });
    });

    // innerText is the rendered text; textContent would drag in <script> and <style>.
    var parts = [typeof rootEl.innerText === 'string' ? rootEl.innerText : ''];
    var labelled = rootEl.querySelectorAll('img[alt], [aria-label], [title]');
    for (var i = 0; i < labelled.length && i < 60; i++) {
      var el = labelled[i];
      parts.push(el.getAttribute('alt') || '', el.getAttribute('aria-label') || '', el.getAttribute('title') || '');
    }

    return { urls: urls, text: parts.join(' ').replace(/\s+/g, ' ').slice(0, MAX_TEXT) };
  }

  globalThis.AVCollect = collect;

  // Frame handshake. The top frame hands each ad iframe a one-off token; we
  // pass it to the background worker, which is how it learns which frame id
  // belongs to which <iframe> element. The token carries no information.
  var HELLO = 'antivertising:';
  globalThis.AV_HELLO = HELLO;

  if (window !== window.top) {
    window.addEventListener('message', function (e) {
      if (e.source !== window.parent || typeof e.data !== 'string') return;
      if (e.data.slice(0, HELLO.length) !== HELLO) return;
      var token = e.data.slice(HELLO.length);
      if (!/^[0-9a-f]{32}$/.test(token)) return;
      e.stopImmediatePropagation(); // ours; the ad's own scripts need not see it
      try {
        chrome.runtime.sendMessage({ type: 'av-frame-hello', nonce: token }).catch(function () {});
      } catch (err) { /* extension was reloaded under this page */ }
    }, true);
  }

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (!msg || msg.type !== 'av-collect') return;
    var root = document.documentElement;
    var out = root ? collect(root) : { urls: [], text: '' };
    out.urls.unshift(location.href);
    sendResponse(out);
  });
})();
