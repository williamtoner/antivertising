/*
 * Draws a counter-ad. The card lives in a closed shadow root so page CSS
 * cannot restyle it. A black strip across the top says who paid for the
 * space; below it the rival's name is set as large as the slot allows, in
 * whichever width of the typeface fits best.
 *
 * The slot's size is known when the card is made, so the layout is worked
 * out here in JS (text is measured on a canvas, never by forcing the page
 * to lay itself out).
 */
(function (root) {
  'use strict';

  var FAMILY = 'AV Archivo';
  var STACK = '"' + FAMILY + '",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  var STRIP_H = 20;
  var FLAG_H = 14;
  var NAME_LH = 0.92;
  var NAME_LS = -0.02; // em

  var CSS = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    '.card{position:relative;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--fg);',
    '  font-family:' + STACK + ';font-synthesis:none;',
    '  box-shadow:inset 0 0 0 1px rgba(0,0,0,.14);animation:av-in .4s cubic-bezier(.2,.8,.2,1) both;}',
    '@keyframes av-in{from{clip-path:inset(0 100% 0 0);}to{clip-path:inset(0 0 0 0);}}',
    '@media (prefers-reduced-motion:reduce){.card{animation:none;}}',

    // the strip: who paid, and (on hover) what you can do about it
    '.strip{position:absolute;z-index:1;top:0;left:0;right:0;height:' + STRIP_H + 'px;display:flex;align-items:stretch;',
    '  justify-content:space-between;gap:8px;padding-left:8px;background:#111;color:#ffd60a;',
    '  font-weight:700;font-stretch:semi-condensed;font-size:10px;line-height:' + STRIP_H + 'px;letter-spacing:.09em;',
    '  text-transform:uppercase;white-space:nowrap;}',
    '.paid{min-width:0;overflow:hidden;text-overflow:ellipsis;}',
    '.right{display:flex;flex:none;}',
    '.mark{padding:0 8px;color:#a8a290;}',
    '.acts{display:none;}',
    '.acts button{all:unset;padding:0 8px;cursor:pointer;color:#ffd60a;border-left:1px solid #3a3a3a;}',
    '.acts button:hover,.acts button:focus-visible{background:#ffd60a;color:#111;}',
    '.strip.live:hover .acts,.strip.live:focus-within .acts{display:flex;}',
    '.strip.live:hover .mark,.strip.live:focus-within .mark{display:none;}',
    '.narrow .mark{display:none;}',
    '.narrow .strip.live:hover .paid,.narrow .strip.live:focus-within .paid{display:none;}',
    '.narrow .strip.live:hover,.narrow .strip.live:focus-within{justify-content:flex-end;}',
    // slots too short for a strip get a corner flag instead
    '.flag .strip{left:auto;max-width:100%;height:' + FLAG_H + 'px;padding-left:6px;border-bottom-left-radius:5px;',
    '  font-size:9px;line-height:' + FLAG_H + 'px;}',
    '.flag .paid{padding-right:6px;}',
    '.flag .mark{display:none;}',
    '.flag .strip.live:hover .paid,.flag .strip.live:focus-within .paid{display:none;}',

    '.link{position:absolute;inset:0;display:flex;padding:var(--pt) var(--px) var(--pb);color:inherit;text-decoration:none;}',
    'a.link{cursor:pointer;}',
    'a.link:focus-visible{outline:3px solid var(--fg);outline-offset:-5px;}',
    '.body{display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0;}',
    '.name{font-weight:900;font-size:var(--fs);font-stretch:var(--st);line-height:' + NAME_LH + ';letter-spacing:' + NAME_LS + 'em;}',
    '.nl{display:block;white-space:nowrap;}',
    '.name.loose{overflow-wrap:anywhere;}',
    '.line{font-weight:500;font-size:var(--ls);font-stretch:var(--lst,normal);line-height:1.28;text-wrap:pretty;',
    '  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:var(--lc);overflow:hidden;}',
    '.cta{flex:none;align-self:flex-start;max-width:100%;padding:9px 13px 8px;border-radius:2px;background:var(--fg);color:var(--bg);',
    '  font-weight:800;font-size:13px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    'a.link:hover .cta{text-decoration:underline;text-underline-offset:2px;}',

    '.rect .link,.sky .link{flex-direction:column;justify-content:space-between;gap:10px;}',
    '.sky .body{gap:14px;}',
    '.sky .cta{align-self:stretch;text-align:center;white-space:normal;}',
    '.banner .link,.billboard .link{flex-direction:row;align-items:center;gap:var(--cg);}',
    '.banner .body{flex:1;flex-direction:row;align-items:center;gap:var(--cg);}',
    '.banner .name{flex:none;}',
    '.banner .line{flex:1;line-height:1.2;}',
    '.billboard .body{flex:1;justify-content:center;}',
    '.banner .cta,.billboard .cta{align-self:center;}'
  ].join('\n');

  var sheet = null;
  function getSheet() {
    if (!sheet) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS);
    }
    return sheet;
  }

  // ---- typeface ------------------------------------------------------------------
  // In the extension the font file ships with it and is added to the page as
  // bytes, so the page's own font rules do not get a say. Anywhere else (the
  // website) the page is expected to declare "AV Archivo" itself. If it never
  // arrives the cards fall back to the system font.

  var fontReady = null;
  function loadFont() {
    if (fontReady) return fontReady;
    fontReady = new Promise(function (resolve) {
      var done = function () { resolve(true); };
      var failed = function () { resolve(false); };
      try {
        var ext = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL;
        if (!ext) {
          document.fonts.load('900 20px "' + FAMILY + '"').then(done, failed);
          return;
        }
        fetch(chrome.runtime.getURL('fonts/archivo.woff2'))
          .then(function (res) { return res.arrayBuffer(); })
          .then(function (bytes) {
            return new FontFace(FAMILY, bytes, { weight: '100 900', stretch: '62% 125%' }).load();
          })
          .then(function (face) { document.fonts.add(face); })
          .then(done, failed);
      } catch (e) { failed(); }
    });
    return fontReady;
  }

  // ---- fitting the name ---------------------------------------------------------

  var WIDTHS = ['normal', 'semi-condensed', 'condensed', 'extra-condensed'];
  var ctx = null;

  // Width of each word, and of a space, in ems.
  function measure(words, stretch) {
    if (!ctx) ctx = document.createElement('canvas').getContext('2d');
    ctx.font = '900 100px ' + STACK;
    if ('fontStretch' in ctx) ctx.fontStretch = stretch;
    return {
      words: words.map(function (w) { return ctx.measureText(w).width / 100 + NAME_LS * w.length; }),
      space: ctx.measureText(' ').width / 100 + NAME_LS
    };
  }

  // Fewest lines that hold the words within `room` ems; null if a word is too wide.
  function countLines(m, room) {
    var lines = 1;
    var used = 0;
    for (var i = 0; i < m.words.length; i++) {
      var w = m.words[i];
      if (w > room) return null;
      if (used && used + m.space + w > room) { lines++; used = w; }
      else used = used ? used + m.space + w : w;
    }
    return lines;
  }

  // Split into exactly `count` lines so that the longest is as short as possible.
  function balance(m, count) {
    var n = m.words.length;
    function width(from, to) {
      var sum = 0;
      for (var i = from; i < to; i++) sum += m.words[i] + (i > from ? m.space : 0);
      return sum;
    }
    var memo = {};
    function best(from, left) {
      var key = from + ':' + left;
      if (memo[key]) return memo[key];
      var out;
      if (left === 1) {
        out = { worst: width(from, n), cuts: [] };
      } else {
        out = { worst: Infinity, cuts: [] };
        for (var cut = from + 1; cut <= n - (left - 1); cut++) {
          var rest = best(cut, left - 1);
          var worst = Math.max(width(from, cut), rest.worst);
          if (worst < out.worst) out = { worst: worst, cuts: [cut].concat(rest.cuts) };
        }
      }
      memo[key] = out;
      return out;
    }
    return best(0, Math.min(count, n)).cuts;
  }

  /*
   * The largest setting of `name` that fits maxW x maxH pixels in at most
   * maxLines lines. Narrower cuts of the typeface are only used when they
   * buy a noticeably bigger size.
   */
  function fitName(name, maxW, maxH, maxLines, cap) {
    var words = name.split(/\s+/).filter(Boolean);
    var order = (name.length <= 5 ? ['expanded'] : []).concat(WIDTHS);
    var tries = order.map(function (stretch) {
      var m = measure(words, stretch);
      function fits(size) {
        var lines = countLines(m, maxW / size);
        return lines !== null && lines <= maxLines && lines * size * NAME_LH <= maxH;
      }
      var lo = 9;
      var hi = Math.max(lo, cap);
      if (!fits(lo)) return { stretch: stretch, size: 0, m: m };
      if (fits(hi)) lo = hi;
      else for (var i = 0; i < 9; i++) { var mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
      return { stretch: stretch, size: Math.floor(lo), m: m };
    });
    var best = tries.reduce(function (a, t) { return Math.max(a, t.size); }, 0);
    if (!best) return { loose: true, stretch: 'extra-condensed', size: 11, lines: [name] };
    var pick = tries.filter(function (t) { return t.size >= best * 0.74; })[0];
    var count = countLines(pick.m, maxW / pick.size);
    var cuts = balance(pick.m, count);
    var lines = [];
    var from = 0;
    cuts.concat(words.length).forEach(function (cut) {
      lines.push(words.slice(from, cut).join(' '));
      from = cut;
    });
    return { loose: false, stretch: pick.stretch, size: pick.size, lines: lines };
  }

  function clamp(lo, v, hi) { return Math.max(lo, Math.min(v, hi)); }

  // Everything about a card that depends only on the size of its slot.
  function layoutFor(W, H) {
    var ratio = W / H;
    var strip = H >= 80 && W >= 120;
    var top = strip ? STRIP_H : 0;
    var type = ratio >= 2.5 ? (H >= 140 ? 'billboard' : 'banner') : ratio <= 0.67 ? 'sky' : 'rect';
    var L = { type: type, strip: strip, narrow: W < 250, cta: true, line: true, gap: 10 };

    if (type === 'banner') {
      L.px = clamp(8, W * 0.03, 28);
      L.pt = strip ? top + 4 : FLAG_H;
      L.pb = strip ? 4 : 3;
      L.cg = clamp(8, W * 0.03, 28);
      var bh = H - L.pt - L.pb;
      L.line = W >= 300;
      L.cta = W >= 600;
      L.nameW = L.line ? (W - 2 * L.px) * 0.42 : W - 2 * L.px;
      L.nameH = bh;
      L.nameLines = bh >= 56 ? 2 : 1;
      L.cap = Math.min(64, bh * 0.9);
      L.ls = clamp(11, bh * 0.24, 20);
      L.lc = Math.max(1, Math.floor(bh / (L.ls * 1.2)));
      L.lineRoom = null;
    } else if (type === 'billboard') {
      L.px = W * 0.035;
      L.pt = top + 16;
      L.pb = 16;
      L.cg = W * 0.035;
      var ch = H - L.pt - L.pb;
      L.nameW = (W - 2 * L.px) * 0.66;
      L.nameH = ch * 0.56;
      L.nameLines = 2;
      L.cap = Math.min(88, L.nameH);
      L.ls = clamp(14, ch * 0.1, 24);
      L.lineRoom = ch;
    } else if (type === 'sky') {
      L.px = clamp(9, W * 0.09, 26);
      L.pt = top + 16;
      L.pb = L.px;
      L.gap = 14;
      var sh = H - L.pt - L.pb;
      L.nameW = W - 2 * L.px;
      L.nameH = sh * 0.42;
      L.nameLines = 6;
      L.cap = Math.min(76, W * 0.4);
      L.ls = clamp(13, W * 0.085, 22);
      L.ctaH = W < 200 ? 52 : 36;
      L.lineRoom = sh - L.ctaH - 10;
    } else {
      L.px = clamp(9, W * 0.06, 22);
      L.pt = strip ? top + 16 : FLAG_H + 4;
      L.pb = Math.max(8, L.px - 2);
      var rh = H - L.pt - L.pb;
      L.cta = rh >= 80 && W >= 140;
      L.ctaH = 34;
      L.line = rh >= 100;
      L.nameW = W - 2 * L.px;
      L.nameH = (L.line ? 0.5 : L.cta ? 0.6 : 1) * rh;
      L.nameLines = 3;
      L.cap = Math.min(72, W * 0.3, L.nameH);
      L.ls = clamp(13, W * 0.052, 18);
      L.lineRoom = rh - (L.cta ? L.ctaH + 10 : 0);
    }
    L.lst = W < 200 ? 'semi-condensed' : 'normal';
    return L;
  }

  // Black or white, whichever reads better on the brand colour.
  function textOn(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return '#ffffff';
    var n = parseInt(m[1], 16);
    var lum = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    return L > 0.4 ? '#111111' : '#ffffff';
  }

  // The sentence on the strip. Also used by the share image.
  function paidText(creative) {
    if (creative.original) return creative.original + ' paid for this';
    if (creative.category) return 'Was an ad for ' + creative.category;
    return 'Someone paid for this';
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function action(label, title, fn) {
    var button = el('button', null, label);
    button.type = 'button';
    button.title = title;
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      fn();
    });
    return button;
  }

  /*
   * creative: from AV.pickCounter()
   * box:      { width, height } of the slot being replaced, in CSS pixels
   * onUndo:   called when the user asks for the real ad back
   * onShare:  optional; called when the user asks to share this swap
   */
  function renderCard(creative, box, onUndo, onShare) {
    var W = Math.round(box.width);
    var H = Math.round(box.height);
    var host = document.createElement('div');
    host.setAttribute('data-antivertising', creative.kind);
    host.setAttribute('data-av-counter', creative.id);
    host.setAttribute('data-av-original', creative.original || creative.category || '');

    var s = host.style;
    s.setProperty('all', 'initial', 'important');
    s.setProperty('display', 'block', 'important');
    s.setProperty('width', W + 'px', 'important');
    s.setProperty('height', H + 'px', 'important');
    s.setProperty('overflow', 'hidden', 'important');

    var shadow = host.attachShadow({ mode: 'closed' });
    shadow.adoptedStyleSheets = [getSheet()];

    var L = layoutFor(W, H);
    var card = el('div', 'card ' + L.type + (L.strip ? '' : ' flag') + (L.narrow ? ' narrow' : ''));
    var v = card.style;
    v.setProperty('--bg', creative.color);
    v.setProperty('--fg', textOn(creative.color));
    v.setProperty('--px', L.px + 'px');
    v.setProperty('--pt', L.pt + 'px');
    v.setProperty('--pb', L.pb + 'px');
    if (L.cg) v.setProperty('--cg', L.cg + 'px');
    v.setProperty('--ls', L.ls + 'px');
    v.setProperty('--lst', L.lst);

    var link = el(creative.url ? 'a' : 'div', 'link');
    if (creative.url) {
      link.href = creative.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    var body = el('div', 'body');
    var name = el('div', 'name');
    var line = L.line ? el('div', 'line', creative.line) : null;
    body.appendChild(name);
    if (line) body.appendChild(line);
    link.appendChild(body);
    if (L.cta && creative.cta) link.appendChild(el('div', 'cta', creative.cta + (creative.url ? ' →' : '')));
    card.appendChild(link);

    // Runs now with whatever font is available, and again once ours has loaded.
    function fit() {
      var f = fitName(creative.name, L.nameW, L.nameH, L.nameLines, L.cap);
      v.setProperty('--fs', f.size + 'px');
      v.setProperty('--st', f.stretch);
      name.textContent = '';
      name.classList.toggle('loose', f.loose);
      f.lines.forEach(function (text) { name.appendChild(f.loose ? document.createTextNode(text) : el('span', 'nl', text)); });
      if (!line) return;
      var lines = L.lc;
      if (L.lineRoom !== null) {
        var used = f.loose ? L.nameH : f.lines.length * f.size * NAME_LH;
        lines = Math.floor((L.lineRoom - used - L.gap) / (L.ls * 1.28));
      }
      line.style.display = lines < 1 ? 'none' : '';
      v.setProperty('--lc', String(Math.max(1, lines)));
    }
    fit();
    loadFont().then(function (ok) { if (ok) fit(); });

    var subject = creative.original || creative.category;
    var strip = el('div', 'strip');
    var paid = el('span', 'paid', paidText(creative));
    paid.title = 'Antivertising replaced ' + (subject ? 'an ad for ' + subject : 'an ad') +
      ' here. Not affiliated with or paid for by ' + creative.name + '.';
    strip.appendChild(paid);
    var right = el('span', 'right');
    right.appendChild(el('span', 'mark', 'Antivertising'));
    var acts = el('span', 'acts');
    if (onShare) acts.appendChild(action('Share', 'Make a picture of this swap to post', onShare));
    if (onUndo) acts.appendChild(action(L.narrow ? 'Undo' : 'Show original', 'Put the original ad back', onUndo));
    if (acts.firstChild) {
      strip.classList.add('live');
      right.appendChild(acts);
    }
    strip.appendChild(right);
    card.appendChild(strip);

    shadow.appendChild(card);
    return host;
  }

  root.AV = root.AV || {};
  root.AV.renderCard = renderCard;
  root.AV.textOn = textOn;
  root.AV.paidText = paidText;
  root.AV.fitName = fitName;
  root.AV.loadCardFont = loadFont;
  root.AV.CARD_FONT = FAMILY;
})(globalThis);
