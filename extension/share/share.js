/*
 * Draws a 1200x675 picture of one swap (or of the running score) for the
 * user to save or post. What to draw arrives in the URL fragment, written
 * by the background worker or the popup.
 */
'use strict';

var SITE = 'https://williamtoner.net/antivertising/';
var SITE_LABEL = SITE.replace(/^https:\/\//, '').replace(/\/$/, '');
var STACK = '"AV Archivo", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
var INK = '#111111';
var HAZARD = '#ffd60a';
var TEXT = '#f4f1e8';
var MUTED = '#a39f93';
var W = 1200;
var H = 675;

var data = {};
try { data = JSON.parse(decodeURIComponent(location.hash.slice(1))) || {}; } catch (e) { /* drawn as an empty score */ }
var isScore = typeof data.total === 'number';

var canvas = document.getElementById('picture');
var ctx = canvas.getContext('2d');

function font(weight, size, stretch, spacing) {
  ctx.font = weight + ' ' + size + 'px ' + STACK;
  if ('fontStretch' in ctx) ctx.fontStretch = stretch || 'normal';
  if ('letterSpacing' in ctx) ctx.letterSpacing = (spacing || 0) + 'px';
}

function wrap(text, maxW) {
  var lines = [];
  var line = '';
  String(text).split(/\s+/).forEach(function (word) {
    var next = line ? line + ' ' + word : word;
    if (line && ctx.measureText(next).width > maxW) { lines.push(line); line = word; }
    else line = next;
  });
  if (line) lines.push(line);
  return lines;
}

// Largest size at which `text` fits the box; returns the lines to draw.
function fitted(text, weight, stretch, maxW, maxH, maxSize, leading) {
  for (var size = maxSize; size > 12; size -= 2) {
    font(weight, size, stretch, -size * 0.02);
    var lines = wrap(text, maxW);
    var widest = lines.reduce(function (m, l) { return Math.max(m, ctx.measureText(l).width); }, 0);
    if (widest <= maxW && lines.length * size * leading <= maxH) return { size: size, lines: lines };
  }
  return { size: 12, lines: wrap(text, maxW) };
}

function block(text, x, y, weight, stretch, maxW, maxH, maxSize, leading, colour) {
  var f = fitted(text, weight, stretch, maxW, maxH, maxSize, leading);
  font(weight, f.size, stretch, -f.size * 0.02);
  ctx.fillStyle = colour;
  ctx.textBaseline = 'top';
  f.lines.forEach(function (line, i) { ctx.fillText(line, x, y + i * f.size * leading); });
  return f.lines.length * f.size * leading;
}

function frame() {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = HAZARD;
  ctx.fillRect(0, 0, W, 10);
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  font(900, 26, 'expanded', 0);
  ctx.fillText('ANTIVERTISING', 64, 52);
  font(500, 22, 'normal', 0);
  ctx.fillStyle = MUTED;
  ctx.fillText('Ads aren’t blocked. They’re betrayed.', 64, 596);
  ctx.textAlign = 'right';
  ctx.fillStyle = HAZARD;
  font(700, 22, 'normal', 0);
  ctx.fillText(SITE_LABEL, W - 64, 596);
  ctx.textAlign = 'left';
}

// A 300x250 card, drawn the way card.js lays one out, scaled up.
function card(x, y, k) {
  var bg = /^#[0-9a-f]{6}$/i.test(data.color || '') ? data.color : '#111111';
  var fg = AV.textOn(bg);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(k, k);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 300, 250);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, 300, 20);
  ctx.textBaseline = 'middle';
  font(700, 10, 'semi-condensed', 0.9);
  ctx.fillStyle = HAZARD;
  ctx.fillText(String(data.paid || '').toUpperCase(), 8, 10.5);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#a8a290';
  ctx.fillText('ANTIVERTISING', 292, 10.5);
  ctx.textAlign = 'left';

  var name = AV.fitName(String(data.name || ''), 264, 98, 3, 72);
  font(900, name.size, name.stretch, -name.size * 0.02);
  ctx.fillStyle = fg;
  ctx.textBaseline = 'top';
  name.lines.forEach(function (line, i) { ctx.fillText(line, 18, 34 + i * name.size * 0.92); });
  var below = 34 + name.lines.length * name.size * 0.92 + 10;

  font(500, 15.6, 'normal', 0);
  wrap(data.line || '', 264).slice(0, 3).forEach(function (line, i) { ctx.fillText(line, 18, below + i * 20); });

  if (data.cta) {
    font(800, 13, 'normal', 0);
    var label = data.cta + ' →';
    var w = Math.min(264, ctx.measureText(label).width + 26);
    ctx.fillRect(18, 250 - 16 - 33, w, 33);
    ctx.fillStyle = bg;
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 31, 250 - 16 - 16);
  }
  ctx.restore();
  ctx.strokeStyle = '#3a3a3a';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, 300 * k - 1, 250 * k - 1);
}

function drawSwap() {
  frame();
  var k = 1.72;
  card(W - 64 - 300 * k, 124, k);
  var colW = W - 64 - 300 * k - 64 - 48;
  var used = block(data.paid + '.', 64, 150, 900, 'condensed', colW, 190, 84, 0.96, TEXT);
  block('It says ' + data.name + ' now.', 64, 150 + used + 18, 900, 'condensed', colW, 190, 84, 0.96, HAZARD);
  if (data.page) {
    font(500, 22, 'normal', 0);
    ctx.fillStyle = MUTED;
    ctx.fillText('Seen on ' + data.page, 64, 556);
  }
}

function drawScore() {
  frame();
  var total = String(data.total);
  font(900, 250, total.length > 4 ? 'condensed' : 'expanded', -5);
  ctx.fillStyle = HAZARD;
  ctx.textBaseline = 'top';
  var size = 250;
  while (ctx.measureText(total).width > 560 && size > 80) { size -= 10; font(900, size, total.length > 4 ? 'condensed' : 'expanded', -size * 0.02); }
  ctx.fillText(total, 58, 132);
  block('ads turned against whoever paid for them.', 64, 132 + size + 8, 800, 'normal', 540, 130, 44, 1.08, TEXT);

  var victims = Array.isArray(data.victims) ? data.victims.slice(0, 5) : [];
  if (victims.length) {
    font(700, 18, 'semi-condensed', 2);
    ctx.fillStyle = MUTED;
    ctx.fillText('MOST SABOTAGED', 700, 150);
    victims.forEach(function (v, i) {
      var y = 196 + i * 62;
      font(800, 36, 'normal', -0.5);
      ctx.fillStyle = TEXT;
      var label = String(v.name);
      while (ctx.measureText(label).width > 340 && label.length > 4) label = label.slice(0, -2);
      ctx.fillText(label === String(v.name) ? label : label + '…', 700, y);
      ctx.textAlign = 'right';
      ctx.fillStyle = HAZARD;
      ctx.fillText('×' + v.n, W - 64, y);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2e2e2e';
      ctx.fillRect(700, y + 50, W - 64 - 700, 1);
    });
  }
}

function caption() {
  if (isScore) return data.total + ' ads turned against whoever paid for them. Antivertising doesn’t block ads, it betrays them.';
  return data.paid + '. It says ' + data.name + ' now.';
}

function draw() { if (isScore) drawScore(); else drawSwap(); }

var statusEl = document.getElementById('status');
function say(text) { statusEl.textContent = text; }

document.getElementById('what').textContent = isScore
  ? 'A picture of your score, ready to post.'
  : 'A picture of the swap, ready to post.';
document.getElementById('post').href = 'https://x.com/intent/post?text=' + encodeURIComponent(caption()) + '&url=' + encodeURIComponent(SITE);

document.getElementById('save').addEventListener('click', function () {
  canvas.toBlob(function (blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = isScore ? 'antivertising-score.png' : 'antivertising-swap.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
    say('Saved to your Downloads folder.');
  }, 'image/png');
});

document.getElementById('copy').addEventListener('click', function () {
  canvas.toBlob(function (blob) {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      .then(function () { say('Image copied. Paste it into a post.'); },
            function () { say('Could not copy. Use Save image instead.'); });
  }, 'image/png');
});

document.getElementById('caption').addEventListener('click', function () {
  navigator.clipboard.writeText(caption() + ' ' + SITE)
    .then(function () { say('Caption copied.'); }, function () { say('Could not copy the caption.'); });
});

draw();
AV.loadCardFont().then(draw);
