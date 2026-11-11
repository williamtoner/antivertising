'use strict';

var DEFAULTS = { enabled: true, mode: 'auto', fallback: true, pausedHosts: [], stats: null, logging: true, logMeta: null };

var HINTS = {
  auto: 'Whichever hurts most: usually the arch-rival, but for gambling, crypto and pay-later ads, the thing that makes the whole industry pointless.',
  rival: 'Always the competitor. A Pepsi ad becomes a Coke ad.',
  nemesis: 'Always the opposed industry. A Pepsi ad becomes an ad for tap water.'
};

var SITE = 'https://williamtoner.net/antivertising/';
// A rough market price for one display ad view, in US dollars.
var PER_VIEW = 0.003;

var $ = function (id) { return document.getElementById(id); };
var state = {};
var host = null;

function render() {
  document.body.classList.toggle('off', !state.enabled);
  $('enabled').checked = state.enabled;
  $('fallback').checked = state.fallback;
  $('logging').checked = state.logging;
  var logged = state.logMeta ? state.logMeta.count : 0;
  $('log-count').textContent = logged + (logged === 1 ? ' ad logged' : ' ads logged');
  $('log-export').disabled = logged === 0;
  $('log-clear').disabled = logged === 0;
  document.querySelectorAll('input[name="mode"]').forEach(function (input) {
    input.checked = input.value === state.mode;
  });
  $('mode-hint').textContent = HINTS[state.mode] || '';

  if (host) {
    $('pause-row').hidden = false;
    $('host').textContent = host;
    $('pause').checked = state.pausedHosts.indexOf(host) !== -1;
  }

  var stats = state.stats || { total: 0, victims: {} };
  $('total').textContent = String(stats.total);
  var wasted = stats.total * PER_VIEW;
  $('waste').textContent = stats.total === 0 ? '' :
    'About ' + (wasted < 1 ? Math.max(1, Math.round(wasted * 100)) + '\u00a2' : '$' + wasted.toFixed(2)) + ' of ad money wasted';
  var victims = Object.keys(stats.victims || {})
    .map(function (name) { return { name: name, n: stats.victims[name] }; })
    .sort(function (a, b) { return b.n - a.n; })
    .slice(0, 5);
  $('victims-section').hidden = victims.length === 0;
  var list = $('victims');
  list.textContent = '';
  victims.forEach(function (v) {
    var li = document.createElement('li');
    var who = document.createElement('span');
    who.className = 'who';
    who.textContent = v.name;
    var n = document.createElement('span');
    n.className = 'n';
    n.textContent = '×' + v.n;
    li.appendChild(who);
    li.appendChild(n);
    list.appendChild(li);
  });
}

function save(patch) {
  for (var k in patch) state[k] = patch[k];
  chrome.storage.local.set(patch);
  render();
}

$('enabled').addEventListener('change', function (e) { save({ enabled: e.target.checked }); });
$('fallback').addEventListener('change', function (e) { save({ fallback: e.target.checked }); });
document.querySelectorAll('input[name="mode"]').forEach(function (input) {
  input.addEventListener('change', function () { if (input.checked) save({ mode: input.value }); });
});
$('pause').addEventListener('change', function (e) {
  var hosts = state.pausedHosts.filter(function (h) { return h !== host; });
  if (e.target.checked) hosts.push(host);
  save({ pausedHosts: hosts });
});
$('site').href = SITE;
$('share-score').addEventListener('click', function () {
  var stats = state.stats || { total: 0, victims: {} };
  var victims = Object.keys(stats.victims || {})
    .filter(function (name) { return name !== 'Unidentified advertisers' && !/\(brand unknown\)$/.test(name); })
    .map(function (name) { return { name: name, n: stats.victims[name] }; })
    .sort(function (a, b) { return b.n - a.n; })
    .slice(0, 5);
  chrome.tabs.create({
    url: chrome.runtime.getURL('share/share.html') + '#' + encodeURIComponent(JSON.stringify({ total: stats.total, victims: victims }))
  });
});
$('reset').addEventListener('click', function () { save({ stats: null }); });
$('logging').addEventListener('change', function (e) { save({ logging: e.target.checked }); });

function logKeys(meta) {
  var keys = [];
  if (meta) for (var i = meta.first; i <= meta.last; i++) keys.push('log:' + i);
  return keys;
}

// The log is a file the user saves themselves: nothing is uploaded anywhere.
$('log-export').addEventListener('click', function () {
  var keys = logKeys(state.logMeta);
  chrome.storage.local.get(keys, function (stored) {
    var entries = [];
    keys.forEach(function (key) { entries = entries.concat(stored[key] || []); });
    var file = {
      app: 'Antivertising',
      version: chrome.runtime.getManifest().version,
      exported: new Date().toISOString(),
      count: entries.length,
      entries: entries
    };
    var url = URL.createObjectURL(new Blob([JSON.stringify(file, null, 1)], { type: 'application/json' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'antivertising-log-' + file.exported.slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  });
});

// Two clicks, so a slip does not throw the dataset away.
var clearArmed = null;
$('log-clear').addEventListener('click', function (e) {
  var button = e.target;
  if (!clearArmed) {
    button.textContent = 'Really clear?';
    clearArmed = setTimeout(function () { clearArmed = null; button.textContent = 'Clear'; }, 3000);
    return;
  }
  clearTimeout(clearArmed);
  clearArmed = null;
  button.textContent = 'Clear';
  chrome.storage.local.remove(logKeys(state.logMeta).concat('logMeta'));
  state.logMeta = null;
  render();
});

chrome.storage.onChanged.addListener(function (changes, area) {
  if (area !== 'local') return;
  if (changes.stats) state.stats = changes.stats.newValue || null;
  if (changes.logMeta) state.logMeta = changes.logMeta.newValue || null;
  if (changes.stats || changes.logMeta) render();
});

chrome.storage.local.get(DEFAULTS, function (stored) {
  state = stored;
  render();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      var url = new URL(tabs[0].url);
      if (url.protocol === 'http:' || url.protocol === 'https:') host = url.hostname;
    } catch (e) { /* no readable URL for this tab */ }
    render();
  });
});
