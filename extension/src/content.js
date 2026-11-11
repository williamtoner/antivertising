/*
 * Top-frame content script: finds ad slots, works out who paid for each one,
 * and swaps in the counter-ad.
 */
(function () {
  'use strict';
  if (window.top !== window || globalThis.__avStarted) return;
  globalThis.__avStarted = true;

  var AV = globalThis.AV;

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

  var DEFAULTS = { enabled: true, mode: 'auto', fallback: true, pausedHosts: [], debug: false, logging: true };

  // Ads fill in asynchronously, so each slot gets several looks (ms after it
  // is first seen). A recognised advertiser is swapped at once; the generic
  // heckle waits until FALLBACK_FROM so slow creatives get a fair chance.
  var ATTEMPTS = [400, 1200, 2500, 5000, 9000];
  var FALLBACK_FROM = 3;

  var settings = DEFAULTS;
  var tracked = new WeakSet();
  var promoted = new WeakSet(); // frames handled on their own, see splitSlot()
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
      // Ad scripts tag containers as they go, so a slot that looked outermost
      // a second ago may now sit inside a bigger one. Leave it to the outer
      // slot, and never swap around a card that is already showing.
      if (!promoted.has(slot) && slot.parentElement && slot.parentElement.closest(SLOT_SELECTOR)) { scheduleScan(); return; }
      if (slot.querySelector('[data-antivertising]')) return;
      if (splitSlot(slot)) return;

      var rect = slot.getBoundingClientRect();
      var usable = rect.width >= 60 && rect.height >= 30;
      var looked = usable ? gather(slot) : Promise.resolve(null);

      looked.then(function (signals) {
        if (signals && isActive() && slot.isConnected) {
          var match = AV.identify(signals);
          if (settings.debug) report(slot, rect, i, signals, match);
          var creative = null;
          if (match.category) {
            creative = AV.pickCounter(match, { mode: settings.mode });
          } else if (i >= FALLBACK_FROM && settings.fallback && hasCreative(slot) && !match.house) {
            // match.house: the slot only links back to this very site, so it
            // is the publisher promoting itself, not a paid ad. Leave it.
            creative = AV.pickCounter(match, { mode: settings.mode, fallback: true });
          }
          if (creative && swap(slot, creative, logEntry(signals, match))) return;
        }
        i++;
        if (i < ATTEMPTS.length) setTimeout(attempt, ATTEMPTS[i] - ATTEMPTS[i - 1]);
      });
    }

    setTimeout(attempt, ATTEMPTS[0]);
  }

  function bigEnough(rect) {
    return rect.width >= 60 && rect.height >= 30;
  }

  function visibleFrames(slot) {
    var out = [];
    var frames = slot.querySelectorAll('iframe');
    for (var i = 0; i < frames.length; i++) {
      if (bigEnough(frames[i].getBoundingClientRect())) out.push(frames[i]);
    }
    return out;
  }

  /*
   * Some "slots" are really a whole column holding several separate ads.
   * One card stretched over the column would be absurd, so hand each ad
   * frame on to be dealt with by itself. Returns true if it did.
   */
  function splitSlot(slot) {
    if (slot.matches('iframe')) return false;
    var frames = visibleFrames(slot);
    if (frames.length < 2) return false;
    var slotRect = slot.getBoundingClientRect();
    var covered = 0;
    frames.forEach(function (f) { var r = f.getBoundingClientRect(); covered += r.width * r.height; });
    if (slotRect.width * slotRect.height <= covered * 1.25) return false;
    frames.forEach(function (f) {
      if (tracked.has(f)) return;
      promoted.add(f);
      track(f);
    });
    return true;
  }

  /*
   * What to actually replace. Usually the slot itself, but publishers often
   * mark a whole full-width band as the "slot" with a 970x250 creative centred
   * inside it. Covering the band would be wrong, so when the slot holds one
   * visible creative frame that is clearly smaller, replace just that (or the
   * tight wrapper around it) and leave the band alone.
   */
  function targetFor(slot) {
    if (slot.matches('iframe')) return slot;
    var slotRect = slot.getBoundingClientRect();
    var visible = visibleFrames(slot);
    if (visible.length !== 1) return slot;

    var frameRect = visible[0].getBoundingClientRect();
    var frameArea = frameRect.width * frameRect.height;
    if (slotRect.width * slotRect.height <= frameArea * 1.25) return slot;

    var target = visible[0];
    while (target.parentElement && target.parentElement !== slot) {
      var r = target.parentElement.getBoundingClientRect();
      if (r.width * r.height > frameArea * 1.25) break;
      target = target.parentElement;
    }
    return target;
  }

  // Switch on with chrome.storage.local.set({ debug: true }) from the service
  // worker console; every look at every slot is then logged to the page console.
  function report(slot, rect, attempt, signals, match) {
    var hosts = {};
    signals.urls.forEach(function (u) { AV.hostsFromUrl(u).forEach(function (h) { hosts[h] = true; }); });
    console.log('[antivertising] ' + JSON.stringify({
      slot: slot.tagName.toLowerCase() + (slot.id ? '#' + slot.id : '') + (slot.className && typeof slot.className === 'string' ? '.' + slot.className.split(/\s+/)[0] : ''),
      size: Math.round(rect.width) + 'x' + Math.round(rect.height),
      attempt: attempt,
      frames: slot.matches('iframe') ? 1 : slot.querySelectorAll('iframe').length,
      urls: signals.urls.length,
      hosts: Object.keys(hosts).slice(0, 25),
      links: signals.links.slice(0, 8).map(function (u) { return u.slice(0, 200); }),
      text: signals.text.slice(0, 160),
      match: match.brand ? match.brand.id : match.category ? 'category:' + match.category.id : null,
      via: match.via,
      domain: match.domain,
      house: match.house
    }));
  }

  /*
   * One row of the ad log: what this ad gave away about itself and what it
   * matched. Kept in the browser (see background.js) and only ever leaves it
   * when the user presses Export in the popup. The page is recorded as a
   * hostname, never a full address.
   */
  var LOG_HOSTS = 12;
  var LOG_TEXT = 400;

  function logEntry(signals, match) {
    if (!settings.logging) return null;
    var own = AV.siteOf(location.hostname);
    var seen = {};
    var hosts = [];
    signals.urls.forEach(function (u) {
      AV.hostsFromUrl(u).forEach(function (h) {
        var site = AV.siteOf(h);
        if (seen[site] || site === own || AV.isInfra(h) || hosts.length >= LOG_HOSTS) return;
        seen[site] = true;
        hosts.push(site);
      });
    });
    return {
      page: location.hostname,
      landing: match.domain || null,
      brand: match.brand ? match.brand.id : null,
      category: match.category ? match.category.id : null,
      via: match.via || null,
      hosts: hosts,
      text: signals.text.replace(/\s+/g, ' ').trim().slice(0, LOG_TEXT)
    };
  }

  // ---- working out who the advertiser is --------------------------------------

  /*
   * A page cannot read a cross-origin iframe, and a content script cannot ask
   * Chrome "which frame is this element?". Each frame has announced a one-off
   * token to us (see the handshake in collector.js); we pass the tokens of
   * the slot's iframes to the background worker, which finds the frames that
   * own them and asks those, and every frame nested inside them, for their
   * links and text.
   */
  function gather(slot) {
    var local = globalThis.AVCollect(slot);
    local.pageHost = location.hostname;
    var frames = slot.matches('iframe') ? [slot] : Array.prototype.slice.call(slot.querySelectorAll('iframe'));
    var tokens = [];
    frames.forEach(function (frame) {
      var token = frame.contentWindow && globalThis.AVFrameToken(frame.contentWindow);
      if (token) tokens.push(token);
    });
    if (!tokens.length) return Promise.resolve(local); // frames not loaded yet; we look again later

    var reply = send({ type: 'av-collect-frames', nonces: tokens });

    return reply.then(function (remote) {
      if (!remote) return local;
      return {
        urls: local.urls.concat(remote.urls || []),
        links: local.links.concat(remote.links || []),
        text: local.text + ' ' + (remote.text || ''),
        pageHost: local.pageHost
      };
    });
  }

  // ---- swapping -----------------------------------------------------------------

  var COPIED = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'float', 'vertical-align'];
  var POSITIONED = ['position', 'top', 'right', 'bottom', 'left', 'z-index'];

  function swap(slot, creative, log) {
    var target = targetFor(slot);
    var rect = target.getBoundingClientRect();
    // Full-screen interstitials are left alone: a card with no close button
    // over the whole page would trap the reader.
    if (!bigEnough(rect) || isInterstitial(rect)) return false;
    var cs = getComputedStyle(target);

    var entry = { slot: slot, target: target, host: null, display: target.style.getPropertyValue('display'), priority: target.style.getPropertyPriority('display') };
    var host = AV.renderCard(creative, { width: rect.width, height: rect.height }, function () { undo(entry); }, function () {
      send({
        type: 'av-share',
        share: {
          paid: AV.paidText(creative),
          name: creative.name,
          line: creative.line,
          cta: creative.cta || '',
          color: creative.color,
          page: location.hostname
        }
      });
    });
    entry.host = host;

    // Sit exactly where the ad sat.
    host.style.setProperty('display', cs.display.indexOf('inline') === 0 ? 'inline-block' : 'block', 'important');
    var props = COPIED;
    if (cs.position !== 'static' && cs.position !== 'relative') props = props.concat(POSITIONED);
    props.forEach(function (p) { host.style.setProperty(p, cs.getPropertyValue(p), 'important'); });

    slot.setAttribute('data-antivertised', creative.id);
    target.style.setProperty('display', 'none', 'important');
    target.parentNode.insertBefore(host, target);
    swaps.push(entry);
    swapCount++;

    if (log) {
      log.size = Math.round(rect.width) + 'x' + Math.round(rect.height);
      log.kind = creative.kind;
      log.counter = creative.id;
      log.counterName = creative.name;
      log.mode = settings.mode;
    }
    send({
      type: 'av-swapped',
      original: creative.original || (creative.category ? creative.category + ' (brand unknown)' : null),
      counter: creative.name,
      kind: creative.kind,
      count: swapCount,
      log: log || null
    });
    return true;
  }

  function undo(entry) {
    var at = swaps.indexOf(entry);
    if (at === -1) return;
    swaps.splice(at, 1);
    entry.host.remove();
    entry.slot.removeAttribute('data-antivertised');
    if (entry.display) entry.target.style.setProperty('display', entry.display, entry.priority);
    else entry.target.style.removeProperty('display');
  }

  // ---- lifecycle ------------------------------------------------------------------

  function applySettings(next) {
    var wasActive = isActive();
    settings = next;
    if (isActive() && !wasActive) {
      tracked = new WeakSet();
      promoted = new WeakSet();
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
    new MutationObserver(scheduleScan).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'src', 'data-google-query-id', 'data-ad-slot']
    });
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
