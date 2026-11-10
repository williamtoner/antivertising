'use strict';

var DEFAULTS = { enabled: true, mode: 'auto', fallback: true, pausedHosts: [], stats: null };

var HINTS = {
  auto: 'Whichever hurts most: usually the arch-rival, but for gambling, crypto and pay-later ads, the thing that makes the whole industry pointless.',
  rival: 'Always the competitor. A Pepsi ad becomes a Coke ad.',
  nemesis: 'Always the opposed industry. A Pepsi ad becomes an ad for tap water.'
};

var $ = function (id) { return document.getElementById(id); };
var state = {};
var host = null;

function render() {
  document.body.classList.toggle('off', !state.enabled);
  $('enabled').checked = state.enabled;
  $('fallback').checked = state.fallback;
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
$('reset').addEventListener('click', function () { save({ stats: null }); });

chrome.storage.onChanged.addListener(function (changes, area) {
  if (area !== 'local' || !changes.stats) return;
  state.stats = changes.stats.newValue || null;
  render();
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
