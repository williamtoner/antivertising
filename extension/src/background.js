/*
 * Service worker. Two jobs:
 *   1. Relay: a page cannot see inside cross-origin ad iframes, so when the
 *      top frame asks about a slot we query every frame nested under it.
 *   2. Scorekeeping: count swaps for the popup and the toolbar badge.
 *
 * The only state held in memory is the half-second frame handshake below
 * (workers are killed when idle); everything lasting goes in
 * chrome.storage.local. Nothing is sent over the network.
 */
'use strict';

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
          var out = reply || { urls: [], text: '' };
          if (url && out.urls.indexOf(url) === -1) out.urls.push(url);
          return out;
        });
    }));
  }).then(function (replies) {
    var urls = [];
    var text = '';
    replies.forEach(function (r) {
      urls = urls.concat(r.urls || []);
      text += ' ' + (r.text || '');
    });
    return { urls: urls.slice(0, MAX_URLS), text: text.slice(0, MAX_TEXT) };
  });
}

// Storage writes are read-modify-write, so run them one at a time.
var statsQueue = Promise.resolve();

function recordSwap(msg) {
  statsQueue = statsQueue.then(function () {
    return chrome.storage.local.get({ stats: null });
  }).then(function (stored) {
    var stats = stored.stats || { total: 0, since: Date.now(), victims: {}, weapons: {} };
    stats.total++;
    var victim = msg.original || 'Unidentified advertisers';
    stats.victims[victim] = (stats.victims[victim] || 0) + 1;
    if (msg.counter) stats.weapons[msg.counter] = (stats.weapons[msg.counter] || 0) + 1;
    return chrome.storage.local.set({ stats: stats });
  }).catch(function () { /* keep the queue alive */ });
}

function setBadge(tabId, count) {
  chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: '#111111' });
  if (chrome.action.setBadgeTextColor) chrome.action.setBadgeTextColor({ tabId: tabId, color: '#ffd60a' });
  chrome.action.setBadgeText({ tabId: tabId, text: count > 0 ? String(count) : '' });
}

// ---- frame handshake ---------------------------------------------------------
// The top frame gives each ad iframe a one-off token and tells us which tokens
// to expect; the frame's collector shows us the token, and the message's
// sender tells us that frame's id. Either side may arrive first.

var HELLO_WAIT_MS = 500;
var arrived = new Map(); // nonce -> { tabId, frameId }   hello came first
var waiting = new Map(); // nonce -> { tabId, resolve }   request came first

function frameIdFor(tabId, nonce) {
  var early = arrived.get(nonce);
  if (early) {
    arrived.delete(nonce);
    return Promise.resolve(early.tabId === tabId ? early.frameId : -1);
  }
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
  var waiter = waiting.get(nonce);
  if (waiter) {
    waiting.delete(nonce);
    waiter.resolve(waiter.tabId === sender.tab.id ? sender.frameId : -1);
    return;
  }
  if (arrived.size > 200) arrived.clear(); // unclaimed tokens are worthless
  arrived.set(nonce, { tabId: sender.tab.id, frameId: sender.frameId });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (!msg || !sender.tab) return;

  if (msg.type === 'av-frame-hello' && typeof msg.nonce === 'string') {
    frameHello(sender, msg.nonce);
    return;
  }

  if (msg.type === 'av-collect-frames' && Array.isArray(msg.nonces)) {
    var tabId = sender.tab.id;
    Promise.all(msg.nonces.slice(0, MAX_FRAMES).map(function (n) { return frameIdFor(tabId, String(n)); }))
      .then(function (frameIds) { return collectFrames(tabId, frameIds); })
      .then(sendResponse, function () { sendResponse({ urls: [], text: '' }); });
    return true; // answering asynchronously
  }

  if (msg.type === 'av-swapped') {
    recordSwap(msg);
    setBadge(sender.tab.id, msg.count | 0);
  }
});
