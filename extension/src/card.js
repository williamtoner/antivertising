/*
 * Draws a counter-ad. The card lives in a closed shadow root so page CSS
 * cannot restyle it, and adapts to the slot it replaces (leaderboard,
 * rectangle, skyscraper, mobile banner) with container queries.
 */
(function (root) {
  'use strict';

  var CSS = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    '.card{position:relative;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--fg);',
    '  font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;',
    '  box-shadow:inset 0 0 0 1px rgba(0,0,0,.14);animation:av-in .35s cubic-bezier(.2,.8,.2,1) both;}',
    '@keyframes av-in{from{clip-path:inset(0 100% 0 0);}to{clip-path:inset(0 0 0 0);}}',
    '@media (prefers-reduced-motion:reduce){.card{animation:none;}}',

    // default: rectangle (300x250 and friends)
    '.link{display:flex;flex-direction:column;justify-content:space-between;gap:10px;width:100%;height:100%;',
    '  padding:26px 18px 16px;color:inherit;text-decoration:none;}',
    'a.link{cursor:pointer;}',
    '.body{display:flex;flex-direction:column;gap:10px;min-height:0;min-width:0;}',
    '.name{font-weight:900;letter-spacing:-.025em;line-height:.98;text-wrap:balance;overflow-wrap:anywhere;',
    '  font-size:min(var(--fit),calc(var(--k) * clamp(22px,14cqw,46px)));}',
    '.line{font-weight:500;line-height:1.3;text-wrap:pretty;font-size:clamp(13px,5.4cqw,18px);}',
    '.cta{align-self:flex-start;flex:none;max-width:100%;padding:8px 14px;border-radius:999px;background:var(--fg);color:var(--bg);',
    '  font-weight:700;font-size:13px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    'a.link:hover .cta{text-decoration:underline;}',
    'a.link:focus-visible{outline:3px solid var(--fg);outline-offset:-5px;}',

    // the corner flag: says what happened here, click to undo it
    '.tag{position:absolute;top:0;right:0;display:flex;align-items:center;gap:5px;max-width:100%;height:16px;padding:0 6px;',
    '  border:0;border-bottom-left-radius:6px;background:#111;color:#ffd60a;cursor:pointer;',
    '  font:700 9px/16px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;',
    '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.tag:hover,.tag:focus-visible{background:#ffd60a;color:#111;outline:none;}',
    '.tag .undo{display:none;}',
    '.tag:hover .what,.tag:focus-visible .what{display:none;}',
    '.tag:hover .undo,.tag:focus-visible .undo{display:inline;}',

    // leaderboards and banners (728x90, 970x250, 320x50)
    '@container (min-aspect-ratio:5/2){',
    '  .link{flex-direction:row;align-items:center;gap:4cqw;padding:14px 3cqw 6px;}',
    '  .body{flex:1;flex-direction:row;align-items:center;gap:3.5cqw;}',
    '  .name{flex:none;max-width:45cqw;font-size:min(var(--fit-wide),calc(var(--k) * clamp(17px,36cqh,56px)));}',
    '  .line{flex:1;font-size:clamp(11px,17cqh,22px);line-height:1.2;}',
    '  .cta{align-self:center;}',
    '}',
    // billboards (970x250): tall enough to stack the name over the line
    '@container (min-aspect-ratio:5/2) and (min-height:140px){',
    '  .body{flex-direction:column;align-items:flex-start;justify-content:center;gap:1.2cqw;}',
    '  .name{max-width:100%;font-size:min(var(--fit),calc(var(--k) * clamp(26px,30cqh,72px)));}',
    '  .line{flex:none;font-size:clamp(14px,11cqh,26px);}',
    '}',
    // phone banners (320x100, 468x60): no room for a button, and long lines get cut off cleanly
    '@container (min-aspect-ratio:5/2) and (max-width:560px){',
    '  .cta{display:none;}',
    '  .name{max-width:40cqw;}',
    '  .line{font-size:clamp(11px,13cqh,14px);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;}',
    '}',
    '@container (min-aspect-ratio:5/2) and (max-height:64px){',
    '  .link{padding:15px 10px 2px;}',
    '  .name{font-size:min(var(--fit-wide),calc(var(--k) * 17px));}',
    '  .line{font-size:11px;line-height:1.15;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;}',
    '}',

    // skyscrapers (160x600, 300x600)
    '@container (max-aspect-ratio:2/3){',
    '  .link{padding:30px 9cqw 9cqw;}',
    '  .body{gap:14px;}',
    '  .name{font-size:min(var(--fit),calc(var(--k) * clamp(19px,19cqw,54px)));}',
    '  .line{font-size:clamp(13px,9cqw,22px);}',
    '  .cta{align-self:stretch;text-align:center;white-space:normal;}',
    '}',

    // very small slots: the name is all there is room for
    '@container (max-width:140px){.cta{font-size:11px;padding:7px 8px;}}',
    '@container (max-height:120px) and (max-aspect-ratio:5/2){.line{display:none;}}'
  ].join('\n');

  var sheet = null;
  function getSheet() {
    if (!sheet) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS);
    }
    return sheet;
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

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /*
   * creative: from AV.pickCounter()
   * box:      { width, height } of the slot being replaced, in CSS pixels
   * onUndo:   called when the user clicks the corner flag to get the real ad back
   */
  function renderCard(creative, box, onUndo) {
    var host = document.createElement('div');
    host.setAttribute('data-antivertising', creative.kind);
    host.setAttribute('data-av-counter', creative.id);
    host.setAttribute('data-av-original', creative.original || creative.category || '');

    var s = host.style;
    s.setProperty('all', 'initial', 'important');
    s.setProperty('display', 'block', 'important');
    s.setProperty('width', Math.round(box.width) + 'px', 'important');
    s.setProperty('height', Math.round(box.height) + 'px', 'important');
    s.setProperty('overflow', 'hidden', 'important');
    // Must be inline: "all: initial !important" above would beat a :host rule.
    s.setProperty('container-type', 'size', 'important');

    var shadow = host.attachShadow({ mode: 'closed' });
    shadow.adoptedStyleSheets = [getSheet()];

    var card = el('div', 'card');
    card.style.setProperty('--bg', creative.color);
    card.style.setProperty('--fg', textOn(creative.color));
    // Long names ("Waiting Until You Can Afford It") get smaller type...
    var len = creative.name.length;
    card.style.setProperty('--k', len > 24 ? '.52' : len > 16 ? '.66' : len > 11 ? '.82' : '1');
    // ...and no single word ("ExpressVPN") may be wider than the card.
    var longest = creative.name.split(/\s+/).reduce(function (m, w) { return Math.max(m, w.length); }, 1);
    var perChar = 0.74; // generous average glyph width of heavy sans, in em
    var inner = Math.min(box.width - 38, box.width * 0.8); // narrowest padding box of any layout
    card.style.setProperty('--fit', Math.max(10, Math.floor(inner / (longest * perChar))) + 'px');
    card.style.setProperty('--fit-wide', Math.max(10, Math.floor((box.width * 0.45) / (longest * perChar))) + 'px');

    var link = el(creative.url ? 'a' : 'div', 'link');
    if (creative.url) {
      link.href = creative.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    var body = el('div', 'body');
    body.appendChild(el('div', 'name', creative.name));
    body.appendChild(el('div', 'line', creative.line));
    link.appendChild(body);
    if (creative.cta) link.appendChild(el('div', 'cta', creative.cta + (creative.url ? ' →' : '')));
    card.appendChild(link);

    var tag = el('button', 'tag');
    tag.type = 'button';
    var subject = creative.original || creative.category;
    var what = subject ? 'Antivert · was: ' + subject : 'Antivert';
    tag.title = 'Antivertising replaced ' + (subject ? 'an ad for ' + subject : 'an ad') +
      ' here. Not affiliated with or paid for by ' + creative.name + '. Click to show the original ad.';
    tag.appendChild(el('span', 'what', what));
    tag.appendChild(el('span', 'undo', 'Show original ad'));
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (onUndo) onUndo();
    });
    card.appendChild(tag);

    shadow.appendChild(card);
    return host;
  }

  root.AV = root.AV || {};
  root.AV.renderCard = renderCard;
  root.AV.textOn = textOn;
})(globalThis);
