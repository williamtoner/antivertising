/*
 * Background worker (a service worker in Chrome, an event page in Firefox).
 * Three jobs:
 *   1. Reading: a page cannot see inside cross-origin ad iframes, so when the
 *      top frame asks about a slot we query every frame nested under it.
 *   2. Deciding: who paid for the ad, and what should replace it. The brand
 *      list is thousands of rows; it is loaded here, once for the whole
 *      browser, and not into every page.
 *   3. Scorekeeping: count swaps for the popup and the toolbar badge, and
 *      keep the ad log (what each ad was and what replaced it).
 *
 * The only state held in memory is the half-second frame handshake below
 * (the browser stops the worker when idle); everything lasting goes in
 * chrome.storage.local. Nothing is sent over the network.
 */
'use strict';

// The brand list and the engine. Chrome loads them here; Firefox, whose
// background page cannot, is given the same list by tools/build_firefox.py.
if (typeof importScripts === 'function') {
  importScripts(
    'data.js', 'data-more.js', 'data-new.js', 'data-wide.js', 'data-jp.js', 'data-us.js', 'data-world.js',
    'engine.js'
  );
}
var AV = globalThis.AV;

var MAX_FRAMES = 25;
var MAX_URLS = 120;
var MAX_TEXT = 6000;

function collectFrames(tabId, rootIds) {
  return chrome.webNavigation.getAllFrames({ tabId: tabId }).then(function (frames) {
    var children = {};
    var byId = {};
    (frames || []).forEach(function (f) {
      byId[f.frameId] = f;
      (children[f.parentFrameId] = children[f.parentFrameId] || []).push(f.frameId);
    });

    // The requested frames plus everything nested inside them.
    var wanted = [];
    var queue = rootIds.filter(function (id) { return id > 0 && byId[id]; });
    while (queue.length && wanted.length < MAX_FRAMES) {
      var id = queue.shift();
      if (wanted.indexOf(id) !== -1) continue;
      wanted.push(id);
      (children[id] || []).forEach(function (child) { queue.push(child); });
    }

    return Promise.all(wanted.map(function (frameId) {
      return chrome.tabs.sendMessage(tabId, { type: 'av-collect' }, { frameId: frameId })
        .catch(function () { return null; }) // frame not ready, or not scriptable
        .then(function (reply) {
          // Even if the frame did not answer, its own URL often names the advertiser.
          var url = byId[frameId].url;
          var out = reply || { urls: [], links: [], text: '' };
          if (url && out.urls.indexOf(url) === -1) out.urls.push(url);
          return out;
        });
    }));
  }).then(function (replies) {
    var urls = [];
    var links = [];
    var text = '';
    replies.forEach(function (r) {
      urls = urls.concat(r.urls || []);
      links = links.concat(r.links || []);
      text += ' ' + (r.text || '');
    });
    return { urls: urls.slice(0, MAX_URLS), links: links.slice(0, MAX_URLS), text: text.slice(0, MAX_TEXT) };
  });
}

// ---- who paid, and what replaces it ------------------------------------------

var LOG_HOSTS = 12;
var LOG_TEXT = 400;

function strings(list, max, length) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, max).filter(function (v) { return typeof v === 'string'; }).map(function (v) { return v.slice(0, length); });
}

function isRich(signals) {
  return signals.links.length > 0 || signals.text.trim().length >= 20;
}

/*
 * One row of the ad log: what this ad gave away about itself and what it
 * matched. It stays in the browser and only ever leaves it when the user
 * presses Export in the popup. The page is recorded as a hostname, never a
 * full address. The page script adds the size and the replacement when it
 * makes the swap.
 */
function logEntry(signals, match) {
  var own = AV.siteOf(signals.pageHost);
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
    page: signals.pageHost,
    landing: match.domain || null,
    brand: match.brand ? match.brand.id : null,
    category: match.category ? match.category.id : null,
    via: match.via || null,
    hosts: hosts,
    text: signals.text.replace(/\s+/g, ' ').trim().slice(0, LOG_TEXT)
  };
}

/*
 * msg.local: what the page could see of the slot. remote: what the slot's
 * frames said, or null if it has none that answered. Returns
 *   creative  the counter-ad, when we know the advertiser or at least the category
 *   heckle    the generic card, when we do not; the page shows it once the
 *             ad has had time to say more
 *   print     a fingerprint of what was learnt, so the page can tell news from no news
 *   rich      whether the frames have shown links or text yet
 *   log       the ad-log row, if logging is on
 */
function decide(msg, remote, pageHost) {
  var local = msg.local && typeof msg.local === 'object' ? msg.local : {};
  var signals = {
    urls: strings(local.urls, 60, 2000).concat(remote ? remote.urls : []),
    links: strings(local.links, 60, 2000).concat(remote ? remote.links : []),
    text: (typeof local.text === 'string' ? local.text.slice(0, 3000) : '') + ' ' + (remote ? remote.text : ''),
    pageHost: pageHost
  };
  var mode = msg.mode === 'rival' || msg.mode === 'nemesis' ? msg.mode : 'auto';
  var match = AV.identify(signals);
  var out = {
    print: signals.urls.length + '/' + signals.links.length + '/' + signals.text.length,
    rich: !!remote && isRich(remote),
    creative: null,
    heckle: null,
    log: msg.logging ? logEntry(signals, match) : null
  };
  if (match.category) {
    out.creative = AV.pickCounter(match, { mode: mode });
  } else if (!match.house) {
    // match.house: the slot only links back to this very site, so it is the
    // publisher promoting itself, not a paid ad. It is left alone.
    out.heckle = AV.pickCounter(match, { mode: mode, fallback: true });
  }
  if (msg.debug) {
    var hosts = {};
    signals.urls.forEach(function (u) { AV.hostsFromUrl(u).forEach(function (h) { hosts[h] = true; }); });
    out.debug = {
      urls: signals.urls.length,
      hosts: Object.keys(hosts).slice(0, 25),
      links: signals.links.slice(0, 8).map(function (u) { return u.slice(0, 200); }),
      text: signals.text.slice(0, 160),
      match: match.brand ? match.brand.id : match.category ? 'category:' + match.category.id : null,
      via: match.via,
      domain: match.domain,
      house: match.house
    };
  }
  return out;
}

// The ad log is stored in chunks ("log:0", "log:1", ...) so that adding a row
// rewrites a couple of hundred entries, not the whole history. logMeta says
// which chunks exist. The oldest chunk is dropped once the log is full.
var LOG_CHUNK = 200;
var LOG_MAX_CHUNKS = 100; // 20,000 ads

function cleanLog(log) {
  if (!log || typeof log !== 'object') return null;
  function str(v, max) { return typeof v === 'string' ? v.slice(0, max) : null; }
  return {
    t: Date.now(),
    page: str(log.page, 200),
    size: str(log.size, 20),
    landing: str(log.landing, 200),
    brand: str(log.brand, 60),
    category: str(log.category, 60),
    via: str(log.via, 20),
    hosts: Array.isArray(log.hosts) ? log.hosts.slice(0, 12).map(function (h) { return String(h).slice(0, 200); }) : [],
    text: str(log.text, 400) || '',
    kind: str(log.kind, 20),
    counter: str(log.counter, 80),
    counterName: str(log.counterName, 80),
    mode: str(log.mode, 20)
  };
}

// Storage writes are read-modify-write, so run them one at a time.
var statsQueue = Promise.resolve();

function recordSwap(msg) {
  var entry = cleanLog(msg.log);
  statsQueue = statsQueue.then(function () {
    return chrome.storage.local.get({ stats: null, logMeta: null });
  }).then(function (stored) {
    var stats = stored.stats || { total: 0, since: Date.now(), victims: {}, weapons: {} };
    stats.total++;
    var victim = msg.original || 'Unidentified advertisers';
    stats.victims[victim] = (stats.victims[victim] || 0) + 1;
    if (msg.counter) stats.weapons[msg.counter] = (stats.weapons[msg.counter] || 0) + 1;
    if (!entry) return chrome.storage.local.set({ stats: stats });

    var meta = stored.logMeta || { first: 0, last: 0, count: 0 };
    var key = 'log:' + meta.last;
    var want = {};
    want[key] = [];
    return chrome.storage.local.get(want).then(function (got) {
      var chunk = got[key];
      var drop = null;
      if (chunk.length >= LOG_CHUNK) {
        meta.last++;
        key = 'log:' + meta.last;
        chunk = [];
        if (meta.last - meta.first >= LOG_MAX_CHUNKS) {
          drop = 'log:' + meta.first;
          meta.first++;
          meta.count -= LOG_CHUNK;
        }
      }
      chunk.push(entry);
      meta.count++;
      var out = { stats: stats, logMeta: meta };
      out[key] = chunk;
      return chrome.storage.local.set(out).then(function () {
        return drop ? chrome.storage.local.remove(drop) : null;
      });
    });
  }).catch(function () { /* keep the queue alive */ });
}

function setBadge(tabId, count) {
  chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: '#111111' });
  if (chrome.action.setBadgeTextColor) chrome.action.setBadgeTextColor({ tabId: tabId, color: '#ffd60a' });
  chrome.action.setBadgeText({ tabId: tabId, text: count > 0 ? String(count) : '' });
}

// ---- frame handshake ---------------------------------------------------------
// The top frame gives us the tokens of the ad iframes it wants read (each
// frame made its own up; see collector.js). We ask every frame in the tab
// whose they are; the owner answers, and that message's sender is the frame
// id. Answers are remembered for a while, since each slot is looked at
// several times.

var HELLO_WAIT_MS = 500;
var arrived = new Map(); // nonce -> { tabId, frameId }   owners we know
var waiting = new Map(); // nonce -> { tabId, resolve }   asked, no answer yet

function frameIdFor(tabId, nonce) {
  var known = arrived.get(nonce);
  if (known) return Promise.resolve(known.tabId === tabId ? known.frameId : -1);
  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      waiting.delete(nonce);
      resolve(-1); // frame has not loaded yet; the page will ask again
    }, HELLO_WAIT_MS);
    waiting.set(nonce, {
      tabId: tabId,
      resolve: function (frameId) { clearTimeout(timer); resolve(frameId); }
    });
  });
}

function frameHello(sender, nonce) {
  if (arrived.size > 500) arrived.clear(); // only a cache: owners can be asked again
  arrived.set(nonce, { tabId: sender.tab.id, frameId: sender.frameId });
  var waiter = waiting.get(nonce);
  if (waiter) {
    waiting.delete(nonce);
    waiter.resolve(waiter.tabId === sender.tab.id ? sender.frameId : -1);
    return;
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (!msg || !sender.tab) return;

  if (msg.type === 'av-frame-hello' && typeof msg.nonce === 'string') {
    frameHello(sender, msg.nonce);
    return;
  }

  if (msg.type === 'av-look') {
    var tabId = sender.tab.id;
    var pageHost = '';
    try { pageHost = new URL(sender.url || sender.tab.url).hostname; } catch (e) { /* no address to go on */ }
    var nonces = Array.isArray(msg.tokens) ? msg.tokens.slice(0, MAX_FRAMES).map(String) : [];
    var read = Promise.resolve(null);
    if (nonces.length) {
      var unknown = nonces.filter(function (n) { return !arrived.has(n); });
      var lookups = nonces.map(function (n) { return frameIdFor(tabId, n); });
      if (unknown.length) {
        // No frameId: this goes to every frame in the tab. Only owners react.
        chrome.tabs.sendMessage(tabId, { type: 'av-who', tokens: unknown }).catch(function () {});
      }
      read = Promise.all(lookups)
        .then(function (frameIds) { return collectFrames(tabId, frameIds); })
        .catch(function () { return null; });
    }
    read
      .then(function (remote) { return decide(msg, remote, pageHost); })
      .then(sendResponse, function () { sendResponse(null); });
    return true; // answering asynchronously
  }

  if (msg.type === 'av-share' && msg.share && typeof msg.share === 'object') {
    // The picture is drawn on one of our own pages, not on the site.
    var share = {};
    ['paid', 'name', 'line', 'cta', 'color', 'page'].forEach(function (k) {
      if (typeof msg.share[k] === 'string') share[k] = msg.share[k].slice(0, 300);
    });
    chrome.tabs.create({
      url: chrome.runtime.getURL('share/share.html') + '#' + encodeURIComponent(JSON.stringify(share)),
      index: sender.tab.index + 1
    });
    return;
  }

  if (msg.type === 'av-swapped') {
    recordSwap(msg);
    setBadge(sender.tab.id, msg.count | 0);
  }
});
