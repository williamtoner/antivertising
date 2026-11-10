/*
 * Antivertising engine: works out who paid for an ad, then picks the
 * replacement that hurts them most. Pure functions, no DOM, no browser APIs,
 * so it runs in the content script and under plain Node for tests.
 */
(function (root) {
  'use strict';

  var DATA = root.AV_DATA || (typeof require === 'function' ? require('./data.js') : null);

  // How much a counter-ad hurts, on the same 1-10 scale as nemesis.damage.
  var DAMAGE_ARCH = 9;   // the sale goes straight to the arch-rival
  var DAMAGE_RIVAL = 7;  // the sale goes to some other competitor

  // Links that say something about the ad network, not the advertiser.
  var SKIP_URL = /adchoices|adprefs|ad-preferences|adssettings|whythisad|why-this-ad|aboutads|privacy|opt-?out|\/policies|\/legal|\/terms/i;

  var MAX_URLS = 80;
  var MAX_TEXT = 4000;

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normaliseText(s) {
    return String(s || '').replace(/[‘’ʼ]/g, "'").replace(/\s+/g, ' ').slice(0, MAX_TEXT);
  }

  function wordRe(phrase) {
    return new RegExp('(^|[^a-z0-9])' + escapeRe(phrase.toLowerCase()) + '(?=$|[^a-z0-9])', 'g');
  }

  // ---- index ---------------------------------------------------------------

  function buildIndex(data) {
    var brands = {};
    var domains = [];
    var aliases = [];
    var keywords = [];

    Object.keys(data.categories).forEach(function (catId) {
      var cat = data.categories[catId];
      cat.id = catId;
      cat.brands.forEach(function (brand) {
        brand.category = catId;
        brands[brand.id] = brand;
        brand.domains.forEach(function (d) {
          domains.push({ domain: d.toLowerCase(), brand: brand });
        });
        var names = (brand.aliases || []).slice();
        if (!brand.strict) names.push(brand.name);
        names.forEach(function (name) {
          aliases.push({ text: name.toLowerCase(), re: wordRe(name), brand: brand });
        });
      });
      (cat.keywords || []).forEach(function (kw) {
        var strong = kw.charAt(0) === '!';
        var phrase = strong ? kw.slice(1) : kw;
        keywords.push({ re: wordRe(phrase), cat: cat, weight: strong ? 2 : 1 });
      });
    });

    // Most specific first: "music.apple.com" before "apple.com",
    // "Uber Eats" before "Uber".
    domains.sort(function (a, b) { return b.domain.length - a.domain.length; });
    aliases.sort(function (a, b) { return b.text.length - a.text.length; });

    return { brands: brands, domains: domains, aliases: aliases, keywords: keywords, data: data };
  }

  var INDEX = DATA ? buildIndex(DATA) : null;

  // ---- reading signals -----------------------------------------------------

  // Every hostname mentioned by a URL, including ones buried in click-tracker
  // parameters such as ...doubleclick.net/click?adurl=https%3A%2F%2Fpepsi.com
  function hostsFromUrl(raw) {
    raw = String(raw || '');
    if (!/^https?:/i.test(raw)) return [];
    if (SKIP_URL.test(raw.split('?')[0])) return [];
    var found = {};
    var s = raw;
    for (var i = 0; i < 3; i++) {
      var re = /https?:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi;
      var m;
      while ((m = re.exec(s))) found[m[1].toLowerCase().replace(/^www\./, '')] = true;
      var decoded;
      try { decoded = decodeURIComponent(s); } catch (e) { break; }
      if (decoded === s) break;
      s = decoded;
    }
    return Object.keys(found);
  }

  function brandForHost(host, index) {
    for (var i = 0; i < index.domains.length; i++) {
      var d = index.domains[i].domain;
      if (host === d || host.slice(-(d.length + 1)) === '.' + d) return index.domains[i].brand;
    }
    return null;
  }

  /*
   * signals: { urls: string[], text: string }
   * returns: { brand, category, score, via } where via is
   *          'domain' | 'text' | 'keyword' | null
   */
  function identify(signals, index) {
    index = index || INDEX;
    var scores = {};
    var via = {};
    var urls = (signals && signals.urls) || [];
    var text = normaliseText(signals && signals.text).toLowerCase();

    function add(brand, points, how) {
      scores[brand.id] = (scores[brand.id] || 0) + points;
      if (how === 'domain' || !via[brand.id]) via[brand.id] = how;
    }

    var domainHits = {};
    urls.slice(0, MAX_URLS).forEach(function (url) {
      hostsFromUrl(url).forEach(function (host) {
        var brand = brandForHost(host, index);
        if (!brand) return;
        domainHits[brand.id] = (domainHits[brand.id] || 0) + 1;
        if (domainHits[brand.id] <= 3) add(brand, 3, 'domain');
      });
    });

    // Longest aliases first; blank out each hit so "Uber Eats" is not also
    // counted as "Uber".
    var remaining = text;
    var textHits = {};
    index.aliases.forEach(function (alias) {
      alias.re.lastIndex = 0;
      if (!alias.re.test(remaining)) return;
      alias.re.lastIndex = 0;
      remaining = remaining.replace(alias.re, function (match, lead) {
        return lead + new Array(match.length - lead.length + 1).join('_');
      });
      textHits[alias.brand.id] = (textHits[alias.brand.id] || 0) + 1;
      if (textHits[alias.brand.id] <= 2) add(alias.brand, 2, 'text');
    });

    var best = null;
    Object.keys(scores).forEach(function (id) {
      if (!best || scores[id] > scores[best]) best = id;
    });
    if (best) {
      var brand = index.brands[best];
      return { brand: brand, category: index.data.categories[brand.category], score: scores[best], via: via[best] };
    }

    // No brand: fall back to what kind of thing is being sold.
    var catScores = {};
    index.keywords.forEach(function (kw) {
      kw.re.lastIndex = 0;
      if (kw.re.test(text)) catScores[kw.cat.id] = (catScores[kw.cat.id] || 0) + kw.weight;
    });
    var bestCat = null;
    Object.keys(catScores).forEach(function (id) {
      if (catScores[id] >= 2 && (!bestCat || catScores[id] > catScores[bestCat])) bestCat = id;
    });
    if (bestCat) {
      return { brand: null, category: index.data.categories[bestCat], score: catScores[bestCat], via: 'keyword' };
    }
    return { brand: null, category: null, score: 0, via: null };
  }

  // ---- choosing the counter-ad ---------------------------------------------

  function pick(list, rng) {
    return list[Math.floor(rng() * list.length) % list.length];
  }

  function rivalCreative(brand, original, damage) {
    var origName = original ? original.name : 'the other one';
    return {
      kind: 'rival',
      id: brand.id,
      name: brand.name,
      color: brand.color,
      line: brand.line.replace(/\{orig\}/g, origName),
      cta: 'Try ' + brand.name + ' instead',
      url: brand.url || 'https://www.' + brand.domains[0] + '/',
      original: original ? original.name : null,
      category: null,
      damage: damage
    };
  }

  function nemesisCreative(cat, original, rng) {
    var n = cat.nemesis;
    return {
      kind: 'nemesis',
      id: 'nemesis:' + cat.id,
      name: n.name,
      color: n.color,
      line: pick(n.lines, rng),
      cta: n.cta || null,
      url: n.url || null,
      original: original ? original.name : null,
      category: original ? null : cat.label,
      damage: n.damage
    };
  }

  function genericCreative(data, rng) {
    var g = data.generic;
    return {
      kind: 'generic', id: 'generic', name: g.name, color: g.color,
      line: pick(g.lines, rng), cta: g.cta || null, url: null, original: null, category: null, damage: 1
    };
  }

  /*
   * match: result of identify()
   * opts:  { mode: 'auto' | 'rival' | 'nemesis', fallback: boolean, rng }
   *
   * auto    whichever option has the highest damage score
   * rival   always a competitor (unless the category forbids it)
   * nemesis always the opposed industry
   *
   * Returns a creative, or null when nothing should be shown.
   */
  function pickCounter(match, opts, index) {
    index = index || INDEX;
    opts = opts || {};
    var rng = opts.rng || Math.random;
    var mode = opts.mode || 'auto';
    var cat = match && match.category;

    if (!cat) return opts.fallback === false ? null : genericCreative(index.data, rng);

    var original = match.brand;
    var rivals = [];
    if (!cat.noRival) {
      var arch = original && original.arch ? index.brands[original.arch] : null;
      if (arch && arch.line) rivals.push({ brand: arch, damage: DAMAGE_ARCH });
      cat.brands.forEach(function (candidate) {
        if (!candidate.line) return;
        if (original && candidate.id === original.id) return;
        if (arch && candidate.id === arch.id) return;
        rivals.push({ brand: candidate, damage: DAMAGE_RIVAL });
      });
    }

    function bestRival() {
      var top = rivals[0].damage;
      var pool = rivals.filter(function (r) { return r.damage === top; });
      var choice = pick(pool, rng);
      return rivalCreative(choice.brand, original, choice.damage);
    }

    if (mode === 'nemesis' || !rivals.length) return nemesisCreative(cat, original, rng);
    if (mode === 'rival') return bestRival();

    // auto: we only know the category, not the brand, so there is no specific
    // competitor to hand the sale to. Attack the category instead.
    if (!original) return nemesisCreative(cat, original, rng);
    return cat.nemesis.damage > rivals[0].damage ? nemesisCreative(cat, original, rng) : bestRival();
  }

  var api = {
    buildIndex: buildIndex,
    hostsFromUrl: hostsFromUrl,
    identify: identify,
    pickCounter: pickCounter,
    DAMAGE_ARCH: DAMAGE_ARCH,
    DAMAGE_RIVAL: DAMAGE_RIVAL
  };

  root.AV = root.AV || {};
  for (var k in api) root.AV[k] = api[k];
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
