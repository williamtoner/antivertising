/*
 * Antivertising engine: works out who paid for an ad, then picks the
 * replacement that hurts them most. Pure functions, no DOM, no browser APIs,
 * so it runs in the content script and under plain Node for tests.
 */
(function (root) {
  'use strict';

  // data.js is the hand-written core; the other data-*.js files add the long list.
  var DATA = root.AV_DATA || (typeof require === 'function' ? require('./data.js') : null);

  // How much a counter-ad hurts, on the same 1-10 scale as nemesis.damage.
  var DAMAGE_ARCH = 9;   // the sale goes straight to the arch-rival
  var DAMAGE_RIVAL = 7;  // the sale goes to some other competitor

  // Links that say something about the ad network, not the advertiser.
  var SKIP_URL = /adchoices|adprefs|ad[-_]?preferences|adssettings|whythisad|why-this-ad|aboutads|about-service|privacy|opt-?out|\/policies|\/legal|\/terms/i;

  var MAX_URLS = 80;
  var MAX_TEXT = 4000;

  var MIN_LABEL = 4;

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normaliseText(s) {
    s = String(s || '');
    // Full-width "ＰａｙＰａｙ" and half-width kana should compare equal to the plain forms.
    if (s.normalize) s = s.normalize('NFKC');
    return s.replace(/[‘’ʼ]/g, "'").replace(/\s+/g, ' ').slice(0, MAX_TEXT);
  }

  function wordRe(phrase) {
    return new RegExp('(^|[^a-z0-9])' + escapeRe(phrase.toLowerCase()) + '(?=$|[^a-z0-9])', 'g');
  }

  // ---- index ---------------------------------------------------------------

  /*
   * The bank holds thousands of brands and every ad is checked against all of
   * them, several times as it loads, so the index is built for looking up, not
   * for scanning:
   *   domains  a table from site to brand
   *   aliases  names to look for in ad text, longest first, and `starts`, a
   *            table from a name's first two characters to the names that
   *            begin with them, so only names that could be in a text are tried
   */
  function buildIndex(data) {
    // Tables with no inherited keys: a site called constructor.io must not
    // find Object's own "constructor".
    var brands = Object.create(null);
    var domains = Object.create(null);
    var labels = Object.create(null);
    var aliases = [];
    var keywords = [];

    Object.keys(data.categories).forEach(function (catId) {
      var cat = data.categories[catId];
      cat.id = catId;
      cat.brands.forEach(function (brand) {
        brand.category = catId;
        brands[brand.id] = brand;
        brand.domains.forEach(function (d) {
          d = d.toLowerCase();
          if (!domains[d]) domains[d] = brand;
          // A distinctive name is the same advertiser on any country's domain:
          // ikea.com, ikea.jp, ikea.co.uk. Not for ambiguous names ("strict"),
          // where zoom.co.jp or corona.co.jp is somebody else entirely, and
          // not for subdomain entries such as music.apple.com.
          var label = d.split('.')[0];
          if (brand.strict || label.length < MIN_LABEL || siteOf(d) !== d) return;
          if (labels[label] && labels[label] !== brand) { labels[label] = false; return; }
          if (labels[label] !== false) labels[label] = brand;
        });
        var names = (brand.aliases || []).slice();
        if (!brand.strict) names.push(brand.name);
        names.forEach(function (name) {
          name = normaliseText(name).toLowerCase();
          if (name) aliases.push({ text: name, re: null, brand: brand });
        });
      });
      (cat.keywords || []).forEach(function (kw) {
        var strong = kw.charAt(0) === '!';
        var phrase = normaliseText(strong ? kw.slice(1) : kw);
        keywords.push({ text: phrase.toLowerCase(), re: null, cat: cat, weight: strong ? 2 : 1 });
      });
    });

    // Longest first, so that "Uber Eats" is found before "Uber".
    aliases.sort(function (a, b) { return b.text.length - a.text.length; });
    var starts = Object.create(null);
    aliases.forEach(function (alias, i) {
      var key = alias.text.slice(0, 2);
      (starts[key] = starts[key] || []).push(i);
    });

    return { brands: brands, domains: domains, labels: labels, aliases: aliases, starts: starts, keywords: keywords, data: data };
  }

  // The names that could appear in this text, longest first.
  function aliasesIn(text, index) {
    var seen = Object.create(null);
    var found = [];
    function take(key) {
      if (seen[key]) return;
      seen[key] = true;
      var list = index.starts[key];
      if (list) for (var j = 0; j < list.length; j++) found.push(list[j]);
    }
    for (var i = 0; i < text.length; i++) {
      take(text.charAt(i));          // names one character long
      if (i + 1 < text.length) take(text.substr(i, 2));
    }
    found.sort(function (a, b) { return a - b; });
    return found.map(function (i) { return index.aliases[i]; });
  }

  var INDEX = null; // built on first use, after siteOf() below exists
  function theIndex() {
    if (!INDEX && DATA) INDEX = buildIndex(DATA);
    return INDEX;
  }

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

  // Most specific first: "music.apple.com" before "apple.com".
  function brandForHost(host, index) {
    var rest = host;
    while (rest.indexOf('.') !== -1) {
      if (index.domains[rest]) return index.domains[rest];
      rest = rest.slice(rest.indexOf('.') + 1);
    }
    return index.labels[siteOf(host).split('.')[0]] || null;
  }

  // ---- naming advertisers we have never heard of ----------------------------
  // Most real ads are for brands that are not in the database. We can often
  // still say where the ad leads, which makes for a better heckle than nothing.

  // Ad plumbing: servers that sit between the click and the advertiser.
  var INFRA_DOMAINS = [
    'doubleclick.net', 'googlesyndication.com', 'googleadservices.com', 'google.com', 'gstatic.com',
    '2mdn.net', 'adtrafficquality.google', 'googletagservices.com', 'googletagmanager.com',
    'amazon-adsystem.com', 'adnxs.com', 'criteo.com', 'criteo.net', 'taboola.com', 'outbrain.com',
    'pubmatic.com', 'rubiconproject.com', 'openx.net', 'adform.net', 'smartadserver.com',
    'casalemedia.com', 'adsrvr.org', 'moatads.com', 'doubleverify.com', 'adsafeprotected.com',
    'scorecardresearch.com', 'quantserve.com', 'integralads.com', 'adlightning.com', 'confiant.com', 'redintelligence.net', 'optinadserving.com',
    'youradchoices.com', 'aboutads.info', 'flashtalking.com', 'serving-sys.com', 'sizmek.com',
    'teads.tv', 'media.net', 'sharethrough.com', '3lift.com', 'yieldmo.com', 'innovid.com',
    'adroll.com', 'bidswitch.net', 'demdex.net', 'everesttech.net', 'dotomi.com', 'mathtag.com',
    'rlcdn.com', 'bluekai.com', 'krxd.net', 'tapad.com', 'agkn.com', 'w3.org', 'facebook.com',
    'instagram.com', 'x.com', 'twitter.com', 'youtube.com', 'linkedin.com', 'tiktok.com',
    // Japanese ad networks
    'i-mobile.co.jp', 'microad.jp', 'microad.net', 'adingo.jp', 'fluct.jp', 'gmossp-sp.jp', 'genieesspv.jp',
    'geniee.jp', 'gssprt.jp', 'logly.co.jp', 'popin.cc', 'yimg.jp', 'yjtag.jp', 'ard.yahoo.co.jp',
    'rd.listing.yahoo.co.jp', 'yads.yahoo.co.jp', 'im-apps.net', 'impact-ad.jp', 'socdm.com', 'ladsp.com',
    'adtdp.com', 'amoad.com', 'zucks.net', 'nend.net', 'ad-stir.com', 'aja-recommend.com', 'uncn.jp',
    'smartnews-ads.com', 'a8.net', 'valuecommerce.com', 'accesstrade.net', 'moshimo.com', 'ipdsrv.de',
    // App stores: where an app ad leads, but not who paid for it
    'apps.apple.com', 'itunes.apple.com', 'play.google.com', 'apps.microsoft.com', 'app.adjust.com',
    'onelink.me', 'app.link', 'appsflyer.com'
  ];
  // An app ad's store link must not be read as an ad for the store's owner.
  var STORE_HOSTS = { 'apps.apple.com': 1, 'itunes.apple.com': 1, 'play.google.com': 1, 'apps.microsoft.com': 1 };
  // Hostname labels that give plumbing away: ads.example.com, click.example.net
  var INFRA_LABEL = /(^|[.-])(ads?|adx|adserver|adserving|adservice|clicks?|clk|track|tracking|trk|pixel|sync|redirect|rtb|bid|dsp|ssp|cdn|static|analytics|metrics|tags?|beacon|events?)\d*(?=[.-])/;

  function isInfra(host) {
    for (var i = 0; i < INFRA_DOMAINS.length; i++) {
      var d = INFRA_DOMAINS[i];
      if (host === d || host.slice(-(d.length + 1)) === '.' + d) return true;
    }
    return INFRA_LABEL.test(host);
  }

  // "shop.example.co.uk" -> "example.co.uk". A rule of thumb, not the full
  // public-suffix list, which is good enough for a label on a joke.
  var SECOND_LEVEL = { co: 1, com: 1, org: 1, net: 1, ac: 1, gov: 1, edu: 1, ne: 1, or: 1, go: 1 };
  function siteOf(host) {
    var labels = String(host || '').toLowerCase().replace(/^www\./, '').split('.');
    if (labels.length <= 2) return labels.join('.');
    var tld = labels[labels.length - 1];
    var keep = tld.length === 2 && SECOND_LEVEL[labels[labels.length - 2]] ? 3 : 2;
    return labels.slice(-keep).join('.');
  }

  // The site named by a click tracker's adurl= parameter, the one place a
  // tracker states its destination outright.
  function adurlSite(link) {
    var m = /[?&;]adurl=([^&]+)/i.exec(link);
    if (!m) return null;
    var target = m[1];
    try { target = decodeURIComponent(target); } catch (e) { /* use it as it is */ }
    var host = /^https?:\/\/([a-z0-9.-]+)/i.exec(target);
    return host ? siteOf(host[1]) : null;
  }

  /*
   * Where do this ad's click links lead? A landing page wrapped inside a
   * click-tracker URL counts double; a bare link to a non-plumbing host
   * counts once. Returns { domain, house }: house means every link we could
   * read goes back to the page's own site, i.e. the publisher is promoting
   * itself and nobody paid for the slot.
   */
  function landingDomain(links, pageHost) {
    var counts = {};
    var own = pageHost ? siteOf(pageHost) : null;
    var ownHits = 0;
    (links || []).slice(0, MAX_URLS).forEach(function (link) {
      var hosts = hostsFromUrl(link);
      if (!hosts.length) return;
      // Click trackers often carry the address of the page the ad is on.
      // That is not where the ad leads, and not a sign of a house promo.
      var wrapped = hosts.slice(1).filter(function (h) { return !isInfra(h) && siteOf(h) !== own; });
      var found = wrapped.length ? wrapped : isInfra(hosts[0]) ? [] : [hosts[0]];
      if (!wrapped.length && own && adurlSite(link) === own) ownHits++;
      found.forEach(function (h) {
        var site = siteOf(h);
        if (site === own) { ownHits++; return; }
        counts[site] = (counts[site] || 0) + (wrapped.length ? 2 : 1);
      });
    });
    var best = null;
    Object.keys(counts).forEach(function (site) {
      if (!best || counts[site] > counts[best]) best = site;
    });
    return { domain: best, house: !best && ownHits > 0 };
  }

  /*
   * signals: { urls: string[], links: string[], text: string, pageHost: string }
   * returns: { brand, category, score, via, domain, house } where
   *   via     how the brand or category was recognised:
   *           'domain' | 'text' | 'keyword' | null
   *   domain  where the ad's links lead, even if we do not know the brand
   *   house   the slot only links to the page's own site
   */
  function identify(signals, index) {
    index = index || theIndex();
    var scores = {};
    var via = {};
    var urls = (signals && signals.urls) || [];
    var text = normaliseText(signals && signals.text).toLowerCase();
    var landing = landingDomain(signals && signals.links, signals && signals.pageHost);

    function add(brand, points, how) {
      scores[brand.id] = (scores[brand.id] || 0) + points;
      if (how === 'domain' || !via[brand.id]) via[brand.id] = how;
    }

    // The page may itself belong to a brand we know: a newspaper, a shop.
    // Its own boxes, linking to its own pages, are not ads somebody paid for.
    var pageHost = (signals && signals.pageHost) || '';
    var ownSite = pageHost ? siteOf(pageHost) : null;
    var owner = pageHost ? brandForHost(pageHost.toLowerCase().replace(/^www\./, ''), index) : null;

    var domainHits = {};
    urls.slice(0, MAX_URLS).forEach(function (url) {
      hostsFromUrl(url).forEach(function (host) {
        if (ownSite && siteOf(host) === ownSite) return;
        var brand = STORE_HOSTS[host] ? null : brandForHost(host, index);
        if (!brand) return;
        domainHits[brand.id] = (domainHits[brand.id] || 0) + 1;
        if (domainHits[brand.id] <= 3) add(brand, 3, 'domain');
      });
    });

    // Longest aliases first; blank out each hit so "Uber Eats" is not also
    // counted as "Uber".
    var remaining = text;
    var textHits = {};
    aliasesIn(text, index).forEach(function (alias) {
      // The cheap test first: most names that start like something in the
      // text are not in it.
      if (remaining.indexOf(alias.text) === -1) return;
      if (!alias.re) alias.re = wordRe(alias.text);
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
    // A slot whose every link leads back to this site is the publisher's own
    // box ("Best CPUs for gaming"), however many brands its text mentions.
    // Only a brand's own domain proves somebody paid.
    if (landing.house && (!best || via[best] !== 'domain')) {
      return { brand: null, category: null, score: 0, via: null, domain: null, house: true };
    }
    // The site advertising itself on its own pages, wherever the link goes.
    if (best && owner && owner.id === best) {
      return { brand: null, category: null, score: 0, via: null, domain: null, house: true };
    }

    if (best) {
      var brand = index.brands[best];
      return { brand: brand, category: index.data.categories[brand.category], score: scores[best], via: via[best], domain: landing.domain, house: false };
    }

    // No brand: fall back to what kind of thing is being sold.
    var catScores = {};
    index.keywords.forEach(function (kw) {
      if (text.indexOf(kw.text) === -1) return;
      if (!kw.re) kw.re = wordRe(kw.text);
      kw.re.lastIndex = 0;
      if (kw.re.test(text)) catScores[kw.cat.id] = (catScores[kw.cat.id] || 0) + kw.weight;
    });
    var bestCat = null;
    Object.keys(catScores).forEach(function (id) {
      if (catScores[id] >= 2 && (!bestCat || catScores[id] > catScores[bestCat])) bestCat = id;
    });
    if (bestCat) {
      return { brand: null, category: index.data.categories[bestCat], score: catScores[bestCat], via: 'keyword', domain: landing.domain, house: false };
    }
    return { brand: null, category: null, score: 0, via: null, domain: landing.domain, house: landing.house };
  }

  // ---- choosing the counter-ad ---------------------------------------------

  function pick(list, rng) {
    return list[Math.floor(rng() * list.length) % list.length];
  }

  // original: the brand that paid, if we know it. domain: where the ad leads,
  // which is the next best name for whoever paid.
  function rivalCreative(brand, original, damage, domain) {
    var origName = original ? original.name : domain || 'the other one';
    return {
      kind: 'rival',
      id: brand.id,
      name: brand.name,
      color: brand.color,
      line: brand.line.replace(/\{orig\}/g, origName),
      cta: 'Try ' + brand.name + ' instead',
      // The bare domain, not "www.": a forgotten www record is the one that
      // ends up pointing at a stranger's site. data.js lists the exceptions.
      url: brand.url || 'https://' + brand.domains[0] + '/',
      original: original ? original.name : domain || null,
      category: null,
      damage: damage
    };
  }

  function nemesisCreative(cat, original, rng, domain) {
    var n = cat.nemesis;
    return {
      kind: 'nemesis',
      id: 'nemesis:' + cat.id,
      name: n.name,
      color: n.color,
      line: pick(n.lines, rng),
      cta: n.cta || null,
      url: n.url || null,
      original: original ? original.name : domain || null,
      category: original ? null : cat.label,
      damage: n.damage
    };
  }

  function genericCreative(data, rng, domain) {
    var g = data.generic;
    var line = domain ? pick(g.namedLines, rng).replace(/\{orig\}/g, domain) : pick(g.lines, rng);
    return {
      kind: 'generic', id: 'generic', name: g.name, color: g.color,
      line: line, cta: g.cta || null, url: null, original: domain || null, category: null, damage: 1
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
    index = index || theIndex();
    opts = opts || {};
    var rng = opts.rng || Math.random;
    var mode = opts.mode || 'auto';
    var cat = match && match.category;

    var domain = (match && match.domain) || null;

    if (!cat) return opts.fallback === false ? null : genericCreative(index.data, rng, domain);

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
      return rivalCreative(choice.brand, original, choice.damage, domain);
    }

    if (mode === 'nemesis' || !rivals.length) return nemesisCreative(cat, original, rng, domain);
    if (mode === 'rival') return bestRival();

    // auto: we only know the category, not the brand, so there is no specific
    // competitor to hand the sale to. Attack the category instead.
    if (!original) return nemesisCreative(cat, original, rng, domain);
    return cat.nemesis.damage > rivals[0].damage ? nemesisCreative(cat, original, rng, domain) : bestRival();
  }

  var api = {
    buildIndex: buildIndex,
    hostsFromUrl: hostsFromUrl,
    identify: identify,
    landingDomain: landingDomain,
    siteOf: siteOf,
    isInfra: isInfra,
    pickCounter: pickCounter,
    DAMAGE_ARCH: DAMAGE_ARCH,
    DAMAGE_RIVAL: DAMAGE_RIVAL
  };

  root.AV = root.AV || {};
  for (var k in api) root.AV[k] = api[k];
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
