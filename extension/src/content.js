/*
 * Top-frame content script: finds ad slots, works out who paid for each one,
 * and swaps in the counter-ad.
 */
(function () {
  'use strict';
  if (window.top !== window || globalThis.__avStarted) return;
  globalThis.__avStarted = true;

  var AV = globalThis.AV;
  var AV_HELLO = globalThis.AV_HELLO; // token prefix, defined in collector.js

  // Containers the big ad networks render into. Deliberately no generic
  // ".ad" / ".banner" class guesses: a false positive here eats page content.
  var AD_HOSTS = [
    'doubleclick.net', 'googlesyndication.com', 'googleadservices.com', 'amazon-adsystem.com',
    'adnxs.com', 'criteo.com', 'criteo.net', 'taboola.com', 'outbrain.com', 'pubmatic.com',
    'rubiconproject.com', 'openx.net', 'adform.net', 'smartadserver.com', 'media.net',
    'teads.tv', 'sharethrough.com', '3lift.com', 'yieldmo.com', 'adsrvr.org', 'casalemedia.com'
  ];
  var SLOT_SELECTOR = [
    'ins.adsbygoogle',
    '[id^="div-gpt-ad"]',
    '[id^="google_ads_iframe"]',
    'iframe[id^="aswift_"]',
    '[data-google-query-id]',
    '[data-ad-slot]',
    'amp-ad',
    'div[id^="taboola-"]',
    '.OUTBRAIN'
  ].concat(AD_HOSTS.map(function (h) { return 'iframe[src*="' + h + '"]'; })).join(',');

  var DEFAULTS = { enabled: true, mode: 'auto', fallback: true, pausedHosts: [] };

  // Ads fill in asynchronously, so each slot gets several looks (ms after it
  // is first seen). A recognised advertiser is swapped at once; the generic
  // heckle waits until FALLBACK_FROM so slow creatives get a fair chance.
  var ATTEMPTS = [400, 1200, 2500, 5000, 9000];
  var FALLBACK_FROM = 3;

  var settings = DEFAULTS;
  var tracked = new WeakSet();
  var swaps = [];
  var swapCount = 0;
  var scanTimer = null;

  function isActive() {
    return settings.enabled && settings.pausedHosts.indexOf(location.hostname) === -1;
  }

  function send(msg) {
    try {
      return chrome.runtime.sendMessage(msg).catch(function () { return null; });
    } catch (e) {
      return Promise.resolve(null); // extension was reloaded under this page
    }
  }

  // ---- finding slots ---------------------------------------------------------

  function scan() {
    scanTimer = null;
    if (!isActive()) return;
    var found = document.querySelectorAll(SLOT_SELECTOR);
    for (var i = 0; i < found.length; i++) {
      var slot = found[i];
      if (tracked.has(slot)) continue;
      // Only the outermost container: a GPT div holds a container div holds an iframe.
      if (slot.parentElement && slot.parentElement.closest(SLOT_SELECTOR)) continue;
      track(slot);
    }
  }

  function scheduleScan() {
    if (scanTimer === null) scanTimer = setTimeout(scan, 400);
  }

  function hasCreative(slot) {
    return slot.matches('iframe, img, video') || !!slot.querySelector('iframe, img, video, canvas, a[href]');
  }

  function isInterstitial(rect) {
    return rect.width > innerWidth * 0.9 && rect.height > innerHeight * 0.9;
  }

  function track(slot) {
    tracked.add(slot);
    var i = 0;

    function attempt() {
      if (!isActive() || !slot.isConnected || slot.hasAttribute('data-antivertised')) return;
      var rect = slot.getBoundingClientRect();
      var usable = rect.width >= 60 && rect.height >= 30 && !isInterstitial(rect);
      var looked = usable ? gather(slot) : Promise.resolve(null);

      looked.then(function (signals) {
        if (signals && isActive() && slot.isConnected) {
          var match = AV.identify(signals);
          var creative = null;
          if (match.category) {
            creative = AV.pickCounter(match, { mode: settings.mode });
          } else if (i >= FALLBACK_FROM && settings.fallback && hasCreative(slot)) {
            creative = AV.pickCounter(match, { mode: settings.mode, fallback: true });
          }
          if (creative && swap(slot, creative)) return;
        }
        i++;
        if (i < ATTEMPTS.length) setTimeout(attempt, ATTEMPTS[i] - ATTEMPTS[i - 1]);
      });
    }

    setTimeout(attempt, ATTEMPTS[0]);
  }

  // ---- working out who the advertiser is --------------------------------------

  function nonce() {
    var bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.prototype.map.call(bytes, function (b) { return (b + 256).toString(16).slice(1); }).join('');
  }

  /*
   * A page cannot read a cross-origin iframe, and a content script cannot ask
   * Chrome "which frame is this element?". So: hand each iframe in the slot a
   * one-off token. The collector inside that frame shows the token to the
   * background worker, which now knows the frame's id and can ask it, and
   * every frame nested inside it, for their links and text.
   */
  function gather(slot) {
    var local = globalThis.AVCollect(slot);
    var frames = slot.matches('iframe') ? [slot] : Array.prototype.slice.call(slot.querySelectorAll('iframe'));
    var targets = [];
    frames.forEach(function (frame) {
      if (frame.contentWindow) targets.push({ win: frame.contentWindow, nonce: nonce() });
    });
    if (!targets.length) return Promise.resolve(local);

    var reply = send({ type: 'av-collect-frames', nonces: targets.map(function (t) { return t.nonce; }) });
    targets.forEach(function (t) {
      try { t.win.postMessage(AV_HELLO + t.nonce, '*'); } catch (e) { /* frame went away */ }
    });

    return reply.then(function (remote) {
      if (!remote) return local;
      return { urls: local.urls.concat(remote.urls || []), text: local.text + ' ' + (remote.text || '') };
    });
  }

  // ---- swapping -----------------------------------------------------------------

  var COPIED = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'float', 'vertical-align'];
  var POSITIONED = ['position', 'top', 'right', 'bottom', 'left', 'z-index'];

  function swap(slot, creative) {
    var rect = slot.getBoundingClientRect();
    if (rect.width < 60 || rect.height < 30) return false;
    var cs = getComputedStyle(slot);

    var entry = { slot: slot, host: null, display: slot.style.getPropertyValue('display'), priority: slot.style.getPropertyPriority('display') };
    var host = AV.renderCard(creative, { width: rect.width, height: rect.height }, function () { undo(entry); });
    entry.host = host;

    // Sit exactly where the ad sat.
    host.style.setProperty('display', cs.display.indexOf('inline') === 0 ? 'inline-block' : 'block', 'important');
    var props = COPIED;
    if (cs.position !== 'static' && cs.position !== 'relative') props = props.concat(POSITIONED);
    props.forEach(function (p) { host.style.setProperty(p, cs.getPropertyValue(p), 'important'); });

    slot.setAttribute('data-antivertised', creative.id);
    slot.style.setProperty('display', 'none', 'important');
    slot.parentNode.insertBefore(host, slot);
    swaps.push(entry);
    swapCount++;

    send({
      type: 'av-swapped',
      original: creative.original || (creative.category ? creative.category + ' (brand unknown)' : null),
      counter: creative.name,
      kind: creative.kind,
      count: swapCount
    });
    return true;
  }

  function undo(entry) {
    var at = swaps.indexOf(entry);
    if (at === -1) return;
    swaps.splice(at, 1);
    entry.host.remove();
    entry.slot.removeAttribute('data-antivertised');
    if (entry.display) entry.slot.style.setProperty('display', entry.display, entry.priority);
    else entry.slot.style.removeProperty('display');
  }

  // ---- lifecycle ------------------------------------------------------------------

  function applySettings(next) {
    var wasActive = isActive();
    settings = next;
    if (isActive() && !wasActive) {
      tracked = new WeakSet();
      scan();
    } else if (!isActive() && wasActive) {
      swaps.slice().forEach(undo);
    }
  }

  function merged(stored) {
    var out = {};
    for (var k in DEFAULTS) out[k] = stored && stored[k] !== undefined ? stored[k] : DEFAULTS[k];
    return out;
  }

  chrome.storage.local.get(DEFAULTS, function (stored) {
    settings = merged(stored);
    scan();
    new MutationObserver(scheduleScan).observe(document.documentElement, { childList: true, subtree: true });
  });

  chrome.storage.onChanged.addListener(function (changes, area) {
    if (area !== 'local') return;
    var next = merged(settings);
    var touched = false;
    for (var k in DEFAULTS) {
      if (changes[k]) { next[k] = changes[k].newValue !== undefined ? changes[k].newValue : DEFAULTS[k]; touched = true; }
    }
    if (touched) applySettings(next);
  });
})();
