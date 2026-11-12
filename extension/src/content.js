/*
 * Top-frame content script: finds ad slots, asks the background worker who
 * paid for each one and what should replace it, and swaps that in.
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

  /*
   * Ads fill in whenever they like, so a slot is watched, not polled: it is
   * looked at again the moment something inside it changes. Changes in the
   * page reach us through a MutationObserver; changes inside ad frames, which
   * the page cannot see, reach us as a ping from the frame (collector.js).
   * A recognised advertiser is swapped on the spot.
   *
   * A look gathers what the page can see of the slot and hands it to the
   * background worker, which reads the slot's frames, works out who paid and
   * picks the replacement. The brand list lives there, once, and not in
   * every page.
   */
  var LOOK_GAP = 120;                           // least time between two looks at one slot, ms
  var SAFETY = [0, 300, 1000, 2500, 5000, 9000]; // looks made even if nothing prompts one, ms after the slot is found
  var MAX_LOOKS = 80;                           // then the slot is left alone

  // The generic heckle is for advertisers we do not know, so it must not fire
  // while the ad is still arriving. Once the ad has shown us links or text it
  // goes up as soon as nothing new has turned up for QUIET. An ad that gives
  // nothing away gets longer, and one whose frame has not even loaded, longer still.
  var SETTLE_MIN = 1200;
  var QUIET = 800;
  var SETTLE_BARE = 6000;
  var SETTLE_UNLOADED = 15000;

  var settings = DEFAULTS;
  var tracked = new WeakSet();
  var promoted = new WeakSet(); // frames handled on their own, see splitSlot()
  var released = new WeakSet(); // slots whose real ad the reader asked to see again
  var pending = [];             // slots being watched: see track()
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
    if (scanTimer === null) scanTimer = setTimeout(scan, 100);
  }

  function hasCreative(slot) {
    return slot.matches('iframe, img, video') || !!slot.querySelector('iframe, img, video, canvas, a[href]');
  }

  function isInterstitial(rect) {
    return rect.width > innerWidth * 0.9 && rect.height > innerHeight * 0.9;
  }

  function track(slot) {
    tracked.add(slot);
    if (pending.length >= 300) finish(pending[0]);
    var rec = {
      slot: slot, born: Date.now(), done: false, timer: null, due: 0, busy: false, again: false,
      looks: 0, lookedAt: 0, safety: 0,
      creativeAt: 0, // when the slot first held something to replace
      newsAt: 0,     // when a look last learnt something new
      print: '',     // what the last look learnt, in brief
      heckleAt: 0    // when the generic heckle falls due, if it does
    };
    pending.push(rec);
    wake(rec, 0);
  }

  function finish(rec) {
    rec.done = true;
    if (rec.timer !== null) { clearTimeout(rec.timer); rec.timer = null; }
    var at = pending.indexOf(rec);
    if (at !== -1) pending.splice(at, 1);
  }

  // Look at this slot in `delay` ms, or sooner if a look is already due.
  // A slot that keeps changing is looked at less and less often.
  function wake(rec, delay) {
    if (rec.done) return;
    var gap = Math.min(LOOK_GAP << Math.floor(rec.looks / 8), 5000);
    var at = Math.max(Date.now() + (delay || 0), rec.lookedAt + gap);
    if (rec.timer !== null) {
      if (rec.due <= at) return;
      clearTimeout(rec.timer);
    }
    rec.due = at;
    rec.timer = setTimeout(function () { rec.timer = null; look(rec); }, Math.max(0, at - Date.now()));
  }

  // Nothing more to do for now: line up the next look, if one is owed.
  function rest(rec) {
    if (rec.again) { rec.again = false; wake(rec, 0); return; }
    if (rec.looks >= MAX_LOOKS) { finish(rec); return; }
    var now = Date.now();
    var next = Infinity;
    while (rec.safety < SAFETY.length && rec.born + SAFETY[rec.safety] <= now) rec.safety++;
    if (rec.safety < SAFETY.length) next = rec.born + SAFETY[rec.safety];
    if (rec.heckleAt) next = Math.min(next, rec.heckleAt);
    if (next !== Infinity) wake(rec, next - now);
    // Otherwise the slot waits for a change inside it to wake it.
  }

  function isRich(signals) {
    return signals.links.length > 0 || signals.text.trim().length >= 20;
  }

  function look(rec) {
    var slot = rec.slot;
    if (rec.done) return;
    if (!isActive() || !slot.isConnected || slot.hasAttribute('data-antivertised') || released.has(slot)) { finish(rec); return; }
    if (rec.busy) { rec.again = true; return; }
    // Ad scripts tag containers as they go, so a slot that looked outermost
    // a moment ago may now sit inside a bigger one. Leave it to the outer
    // slot, and never swap around a card that is already showing.
    if (!promoted.has(slot) && slot.parentElement && slot.parentElement.closest(SLOT_SELECTOR)) { finish(rec); scheduleScan(); return; }
    if (slot.querySelector('[data-antivertising]')) { finish(rec); return; }
    if (splitSlot(slot)) { finish(rec); return; }

    var rect = slot.getBoundingClientRect();
    rec.lookedAt = Date.now();
    rec.looks++;
    if (!bigEnough(rect)) { rest(rec); return; }
    if (!rec.creativeAt && hasCreative(slot)) rec.creativeAt = rec.lookedAt;

    // What the page itself can see of the slot, and which frames to ask about the rest.
    var local = globalThis.AVCollect(slot);
    var frames = slot.matches('iframe') ? [slot] : Array.prototype.slice.call(slot.querySelectorAll('iframe'));
    var tokens = [];
    var unloaded = false; // a frame in the slot has not begun to load
    frames.forEach(function (frame) {
      var token = frame.contentWindow && globalThis.AVFrameToken(frame.contentWindow);
      if (token) tokens.push(token);
      else if (bigEnough(frame.getBoundingClientRect())) unloaded = true;
    });

    var bareWait = unloaded ? SETTLE_UNLOADED : SETTLE_BARE;
    var mayHeckle = settings.fallback && rec.creativeAt;
    if (!tokens.length && !local.urls.length && !local.text.trim() && !(mayHeckle && rec.lookedAt >= rec.creativeAt + bareWait)) {
      // Nothing to go on yet, and nothing to ask anyone.
      rec.heckleAt = mayHeckle ? rec.creativeAt + bareWait : 0;
      rest(rec);
      return;
    }

    rec.busy = true;
    send({
      type: 'av-look',
      tokens: tokens,
      local: { urls: local.urls, links: local.links, text: local.text },
      mode: settings.mode,
      logging: settings.logging,
      debug: settings.debug
    }).then(function (answer) {
      rec.busy = false;
      if (rec.done) return;
      if (!isActive() || !slot.isConnected) { finish(rec); return; }
      if (!answer) { rest(rec); return; } // the extension was reloaded, or is busy starting
      var now = Date.now();
      if (answer.print !== rec.print) { rec.print = answer.print; rec.newsAt = now; }
      if (answer.debug) report(slot, rect, rec.looks, frames.length, answer);

      var creative = answer.creative;
      rec.heckleAt = 0;
      if (!creative && mayHeckle && answer.heckle) {
        // For a slot built from frames only what the frames say counts: the
        // page's own "Advertisement" label around them says nothing about the ad.
        var rich = frames.length ? answer.rich : isRich(local);
        rec.heckleAt = unloaded ? rec.creativeAt + SETTLE_UNLOADED
          : rich ? Math.max(rec.creativeAt + SETTLE_MIN, rec.newsAt + QUIET)
          : rec.creativeAt + SETTLE_BARE;
        if (now >= rec.heckleAt) creative = answer.heckle;
      }
      if (creative && swap(slot, creative, answer.log)) { finish(rec); return; }
      rest(rec);
    });
  }

  // A frame somewhere under this page says its contents changed (see
  // collector.js). Look again at the slot it belongs to.
  globalThis.AVFrameChanged = function (win) {
    if (!pending.length) return;
    var child = win;
    try {
      // Up to the frame that sits directly in this page.
      for (var hops = 0; hops < 12 && child && child.parent !== window && child.parent !== child; hops++) child = child.parent;
    } catch (e) { return; }
    pending.slice().forEach(function (rec) {
      var frames = rec.slot.matches('iframe') ? [rec.slot] : rec.slot.querySelectorAll('iframe');
      for (var i = 0; i < frames.length; i++) {
        if (frames[i].contentWindow === child) { wake(rec, 0); return; }
      }
    });
  };

  // Something in the page changed: look again at any watched slot it was in.
  function onMutations(records) {
    scheduleScan();
    if (!pending.length) return;
    for (var i = 0; i < records.length && i < 200; i++) {
      var node = records[i].target;
      for (var j = 0; j < pending.length; j++) {
        if (pending[j].slot === node || pending[j].slot.contains(node)) wake(pending[j], 0);
      }
    }
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
  function report(slot, rect, look, frames, answer) {
    var line = {
      slot: slot.tagName.toLowerCase() + (slot.id ? '#' + slot.id : '') + (slot.className && typeof slot.className === 'string' ? '.' + slot.className.split(/\s+/)[0] : ''),
      size: Math.round(rect.width) + 'x' + Math.round(rect.height),
      attempt: look,
      frames: frames
    };
    for (var k in answer.debug) line[k] = answer.debug[k];
    console.log('[antivertising] ' + JSON.stringify(line));
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
    released.add(entry.slot);
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
      released = new WeakSet();
      scan();
    } else if (!isActive() && wasActive) {
      pending.slice().forEach(finish);
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
    new MutationObserver(onMutations).observe(document.documentElement, {
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
