/*
 * Engine tests. No dependencies and no test runner, so this works on any
 * Node version:   node test/engine.test.js
 */
'use strict';

var assert = require('assert');
var DATA = require('../extension/src/data.js');
var AV = require('../extension/src/engine.js');

var passed = 0;
var failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    failed++;
    console.error('FAIL  ' + name + '\n      ' + String(e.message).split('\n').join('\n      '));
  }
}

function first() { return 0; }        // deterministic rng: always the first option
function id(signals) {
  var m = AV.identify(signals);
  return m.brand ? m.brand.id : m.category ? 'category:' + m.category.id : null;
}

// ---- the database is internally consistent ---------------------------------

test('every brand id is unique, has a domain, and a valid colour', function () {
  var seen = {};
  Object.keys(DATA.categories).forEach(function (catId) {
    DATA.categories[catId].brands.forEach(function (b) {
      assert.ok(!seen[b.id], 'duplicate brand id ' + b.id);
      seen[b.id] = true;
      assert.ok(b.domains.length > 0, b.id + ' has no domains');
      assert.ok(/^#[0-9a-f]{6}$/.test(b.color), b.id + ' has a bad colour ' + b.color);
    });
  });
});

test('every domain belongs to exactly one brand', function () {
  var owner = {};
  Object.keys(DATA.categories).forEach(function (catId) {
    DATA.categories[catId].brands.forEach(function (b) {
      b.domains.forEach(function (d) {
        assert.ok(!owner[d], d + ' is claimed by both ' + owner[d] + ' and ' + b.id);
        owner[d] = b.id;
      });
    });
  });
});

test('every arch-rival exists, is a different brand, and has a pitch', function () {
  var index = AV.buildIndex(DATA);
  Object.keys(index.brands).forEach(function (brandId) {
    var b = index.brands[brandId];
    if (!b.arch) return;
    var arch = index.brands[b.arch];
    assert.ok(arch, b.id + ' has unknown arch-rival ' + b.arch);
    assert.notStrictEqual(arch.id, b.id);
    assert.ok(arch.line, b.arch + ' is an arch-rival but has no line');
  });
});

test('every category has a nemesis with lines, and rivals unless forbidden', function () {
  Object.keys(DATA.categories).forEach(function (catId) {
    var cat = DATA.categories[catId];
    assert.ok(cat.nemesis && cat.nemesis.lines.length > 0, catId + ' has no nemesis lines');
    assert.ok(cat.nemesis.damage >= 1 && cat.nemesis.damage <= 10, catId + ' nemesis damage out of range');
    if (cat.noRival) return;
    cat.brands.forEach(function (b) { assert.ok(b.line, b.id + ' has no pitch line'); });
    assert.ok(cat.brands.length >= 2, catId + ' needs at least two brands to have rivals');
  });
});

// ---- reading URLs -----------------------------------------------------------

test('finds the landing page inside click-tracker URLs', function () {
  assert.deepStrictEqual(
    AV.hostsFromUrl('https://googleads.g.doubleclick.net/pcs/click?xai=1&adurl=https%3A%2F%2Fwww.pepsi.com%2Fzero').sort(),
    ['googleads.g.doubleclick.net', 'pepsi.com']
  );
  // double-encoded
  assert.ok(AV.hostsFromUrl('https://t.example/r?u=https%253A%252F%252Fwww.nike.com%252Frun').indexOf('nike.com') !== -1);
  // unencoded, tacked on the end
  assert.ok(AV.hostsFromUrl('https://ad.doubleclick.net/ddm/clk/1;2?https://sportsbook.draftkings.com/x').indexOf('sportsbook.draftkings.com') !== -1);
});

test('ignores ad-network housekeeping links and non-web URLs', function () {
  assert.deepStrictEqual(AV.hostsFromUrl('https://www.amazon.com/adprefs'), []);
  assert.deepStrictEqual(AV.hostsFromUrl('https://adssettings.google.com/whythisad?reasons=abc'), []);
  assert.deepStrictEqual(AV.hostsFromUrl('javascript:void(0)'), []);
  assert.deepStrictEqual(AV.hostsFromUrl('%E0%A4%A'), []);
});

// ---- identifying the advertiser ----------------------------------------------

test('identifies a brand from its landing domain', function () {
  assert.strictEqual(id({ urls: ['https://www.pepsi.com/'], text: '' }), 'pepsi');
  assert.strictEqual(id({ urls: ['https://shop.adidas.co.uk/sale'], text: '' }), 'adidas');
});

test('the most specific domain wins', function () {
  assert.strictEqual(id({ urls: ['https://music.apple.com/us/browse'], text: '' }), 'apple-music');
  assert.strictEqual(id({ urls: ['https://www.apple.com/iphone'], text: '' }), 'apple');
  assert.strictEqual(id({ urls: ['https://aws.amazon.com/free'], text: '' }), 'aws');
  assert.strictEqual(id({ urls: ['https://www.amazon.com/dp/B000'], text: '' }), 'amazon');
});

test('lookalike domains do not match', function () {
  assert.strictEqual(id({ urls: ['https://notpepsi.com/', 'https://pepsi.com.evil.example/'], text: '' }), null);
  assert.strictEqual(id({ urls: ['https://aax.amazon-adsystem.com/x/c/abc'], text: '' }), null);
});

test('sites named after JavaScript built-ins are not brands', function () {
  ['constructor', 'tostring', 'valueof', 'hasownproperty', '__proto__'].forEach(function (word) {
    assert.strictEqual(id({ urls: ['https://' + word.replace(/_/g, '') + '.io/'], text: word + ' toString constructor' }), null);
  });
});

test('identifies a brand from ad text', function () {
  assert.strictEqual(id({ urls: [], text: 'Nothing beats a Big Mac®. Order now.' }), 'mcdonalds');
  assert.strictEqual(id({ urls: [], text: 'Switch to T-Mobile today' }), 't-mobile');
  assert.strictEqual(id({ urls: [], text: 'McDonald’s breakfast' }), 'mcdonalds'); // curly apostrophe
});

test('longer names win over the names they contain', function () {
  assert.strictEqual(id({ urls: [], text: 'Get dinner with Uber Eats' }), 'uber-eats');
  assert.strictEqual(id({ urls: [], text: 'Get there with Uber' }), 'uber');
  assert.strictEqual(id({ urls: [], text: 'Listen on Apple Music' }), 'apple-music');
});

test('ambiguous words are not treated as brands', function () {
  assert.strictEqual(id({ urls: [], text: 'Hit your sales target with the max plan. Chase your dreams, united.' }), null);
  assert.strictEqual(id({ urls: [], text: 'An apple a day, delivered. Find your match.' }), null);
  assert.strictEqual(id({ urls: [], text: 'pineapple and grapefruit' }), null);
});

test('a landing domain outweighs a name mentioned in passing', function () {
  assert.strictEqual(id({ urls: ['https://www.coca-cola.com/'], text: 'Better than Pepsi' }), 'coca-cola');
});

test('falls back to the category when there is no brand', function () {
  assert.strictEqual(id({ urls: [], text: 'The all-new 2027 SUV. Lease from $399. Book a test drive.' }), 'category:cars');
  assert.strictEqual(id({ urls: [], text: 'Join the sportsbook everyone is talking about' }), 'category:gambling');
  // one weak keyword is not enough
  assert.strictEqual(id({ urls: [], text: 'A lovely coffee table' }), null);
});

test('unknown ads identify as nothing', function () {
  var m = AV.identify({ urls: ['https://zorblax.example/widgets'], text: 'Zorblax Widgets' });
  assert.strictEqual(m.brand, null);
  assert.strictEqual(m.category, null);
  assert.deepStrictEqual(AV.identify({}).brand, null);
  assert.deepStrictEqual(AV.identify(null).brand, null);
});

// ---- choosing the counter-ad -----------------------------------------------------

function counter(signals, mode) {
  return AV.pickCounter(AV.identify(signals), { mode: mode || 'auto', rng: first });
}

test('max damage sends Pepsi to Coke and Coke to Pepsi', function () {
  var c = counter({ urls: ['https://pepsi.com/'], text: '' });
  assert.strictEqual(c.kind, 'rival');
  assert.strictEqual(c.id, 'coca-cola');
  assert.strictEqual(c.original, 'Pepsi');
  assert.strictEqual(c.url, 'https://coca-cola.com/');
  assert.ok(c.line.indexOf('Pepsi') !== -1 && c.line.indexOf('{orig}') === -1, c.line);
  assert.strictEqual(counter({ urls: ['https://coke.com/'], text: '' }).id, 'pepsi');
});

test('a brand is never replaced with itself', function () {
  var index = AV.buildIndex(DATA);
  Object.keys(index.brands).forEach(function (brandId) {
    var b = index.brands[brandId];
    ['auto', 'rival', 'nemesis'].forEach(function (mode) {
      [0, 0.5, 0.999].forEach(function (r) {
        var c = AV.pickCounter({ brand: b, category: DATA.categories[b.category] }, { mode: mode, rng: function () { return r; } });
        assert.ok(c, 'no counter for ' + b.id);
        assert.notStrictEqual(c.id, b.id, b.id + ' was replaced with itself in ' + mode + ' mode');
        assert.ok(c.line && c.line.indexOf('{orig}') === -1, 'unfilled line for ' + b.id + ': ' + c.line);
      });
    });
  });
});

test('gambling ads never become other gambling ads, in any mode', function () {
  ['auto', 'rival', 'nemesis'].forEach(function (mode) {
    var c = counter({ urls: ['https://sportsbook.draftkings.com/'], text: '' }, mode);
    assert.strictEqual(c.kind, 'nemesis');
    assert.strictEqual(c.name, 'Keeping Your Money');
    assert.strictEqual(c.original, 'DraftKings');
  });
});

test('max damage picks the nemesis when it outscores the arch-rival', function () {
  assert.strictEqual(counter({ urls: ['https://coinbase.com/'], text: '' }).name, 'A Savings Account');
  assert.strictEqual(counter({ urls: ['https://klarna.com/'], text: '' }).name, 'Waiting Until You Can Afford It');
  // ...but not when it does not
  assert.strictEqual(counter({ urls: ['https://nordvpn.com/'], text: '' }).id, 'expressvpn');
});

test('rival and nemesis modes override the damage score', function () {
  assert.strictEqual(counter({ urls: ['https://coinbase.com/'], text: '' }, 'rival').id, 'binance');
  var n = counter({ urls: ['https://pepsi.com/'], text: '' }, 'nemesis');
  assert.strictEqual(n.kind, 'nemesis');
  assert.strictEqual(n.name, 'Tap Water');
});

test('category-only matches attack the category', function () {
  var c = counter({ urls: [], text: 'The all-new SUV. Book a test drive.' });
  assert.strictEqual(c.kind, 'nemesis');
  assert.strictEqual(c.name, 'The Bus');
  assert.strictEqual(c.original, null);
  assert.strictEqual(c.category, 'cars');
  // rival mode with no known brand still produces a readable line
  var r = counter({ urls: [], text: 'The all-new SUV. Book a test drive.' }, 'rival');
  assert.strictEqual(r.kind, 'rival');
  assert.ok(r.line.indexOf('the other one') !== -1, r.line);
});

test('unidentified ads get the generic heckle, or nothing if that is switched off', function () {
  var none = AV.identify({ urls: [], text: 'Zorblax' });
  assert.strictEqual(AV.pickCounter(none, { rng: first }).kind, 'generic');
  assert.strictEqual(AV.pickCounter(none, { rng: first, fallback: false }), null);
});

// ---- advertisers that are not in the database ------------------------------------

test('names the landing site of an unknown advertiser', function () {
  var m = AV.identify({ links: ['https://googleads.g.doubleclick.net/pcs/click?x=1&adurl=https%3A%2F%2Fwww.nl.bauhaus%2Ftuin'], urls: [], text: '' });
  assert.strictEqual(m.brand, null);
  assert.strictEqual(m.domain, 'nl.bauhaus');
  assert.strictEqual(AV.identify({ links: ['https://donate.good360.org/give'], urls: [], text: '' }).domain, 'good360.org');
  assert.strictEqual(AV.identify({ links: ['https://shop.example.co.uk/x'], urls: [], text: '' }).domain, 'example.co.uk');
});

test('ad plumbing is never mistaken for the advertiser', function () {
  var links = [
    'https://googleads.g.doubleclick.net/dbm/clk?sa=L&ai=Cabc',
    'https://hal90008.redintelligence.net/c/p2o26hj0t6l9cpm',
    'https://ads.pexi.nl/click/123',
    'https://click.someexchange.io/r?id=5',
    'https://adssettings.google.com/whythisad?reasons=abc'
  ];
  assert.strictEqual(AV.identify({ links: links, urls: links, text: '' }).domain, null);
  // frame sources are not click targets, so they never name the advertiser
  assert.strictEqual(AV.identify({ links: [], urls: ['https://creative-host.example/ad.html'], text: '' }).domain, null);
});

test('a wrapped landing page beats a stray direct link', function () {
  var m = AV.identify({ links: [
    'https://www.somewhere-else.example/',
    'https://adclick.g.doubleclick.net/aclk?adurl=https://www.realadvertiser.example/offer'
  ], urls: [], text: '' });
  assert.strictEqual(m.domain, 'realadvertiser.example');
});

test('slots that only link to the page itself are house promos, not ads', function () {
  var m = AV.identify({ links: ['https://www.tomshardware.com/best-picks/best-cpus'], urls: [], text: 'Best CPUs', pageHost: 'www.tomshardware.com' });
  assert.strictEqual(m.house, true);
  assert.strictEqual(m.domain, null);
  // a house promo that mentions brands in passing is still a house promo
  var cpus = AV.identify({ links: ['https://www.tomshardware.com/reviews/best-cpus'], urls: [], text: 'Best CPUs for Gaming: the top AMD and Intel processors', pageHost: 'www.tomshardware.com' });
  assert.strictEqual(cpus.house, true);
  assert.strictEqual(cpus.brand, null);
  // a paid ad on the same page is not
  var paid = AV.identify({ links: ['https://www.tomshardware.com/about', 'https://www.acer.example/sale'], urls: [], text: '', pageHost: 'www.tomshardware.com' });
  assert.strictEqual(paid.house, false);
  assert.strictEqual(paid.domain, 'acer.example');
  // a click tracker that merely mentions this page is a paid ad, not a house promo
  var tracked = AV.identify({ links: ['https://googleads.g.doubleclick.net/pcs/click?xai=abc&ref=https%3A%2F%2Fwww.speedtest.net%2F'], urls: [], text: '', pageHost: 'www.speedtest.net' });
  assert.strictEqual(tracked.house, false);
  // ...unless the tracker's stated destination is this very site
  var served = AV.identify({ links: ['https://adclick.g.doubleclick.net/pcs/click?xai=abc&adurl=https://www.tomshardware.com/best-picks'], urls: [], text: '', pageHost: 'www.tomshardware.com' });
  assert.strictEqual(served.house, true);
  // and no links at all tells us nothing either way
  assert.strictEqual(AV.identify({ links: [], urls: [], text: '', pageHost: 'x.example' }).house, false);
});

test('a brand promoting itself on its own site is a house promo', function () {
  // On nike.com, a box about Nike is not an ad Nike paid someone for.
  var own = AV.identify({ urls: ['https://www.nike.com/run'], links: ['https://ads.example.net/c?u=https%3A%2F%2Fwww.nike.com%2Frun'], text: 'Nike. Run further.', pageHost: 'www.nike.com' });
  assert.strictEqual(own.brand, null);
  assert.strictEqual(own.house, true);
  // The same box on somebody else's site is an ad.
  assert.strictEqual(id({ urls: ['https://www.nike.com/run'], links: ['https://www.nike.com/run'], text: 'Nike. Run further.', pageHost: 'news.example.org' }), 'nike');
  // And a rival's ad on nike.com is still an ad.
  assert.strictEqual(id({ urls: ['https://www.adidas.com/'], links: ['https://www.adidas.com/'], text: 'adidas', pageHost: 'www.nike.com' }), 'adidas');
});

test('the heckle names the advertiser when it can', function () {
  var named = AV.pickCounter(AV.identify({ links: ['https://www.zorblax.example/widgets'], urls: [], text: '' }), { rng: first });
  assert.strictEqual(named.kind, 'generic');
  assert.strictEqual(named.original, 'zorblax.example');
  assert.ok(named.line.indexOf('zorblax.example') !== -1 && named.line.indexOf('{orig}') === -1, named.line);
  // category known, brand not: the nemesis card still says who it was
  var car = AV.pickCounter(AV.identify({ links: ['https://www.vroomly.example/'], urls: [], text: 'The all-new SUV. Book a test drive.' }), { rng: first });
  assert.strictEqual(car.name, 'The Bus');
  assert.strictEqual(car.original, 'vroomly.example');
});

// ---- the long list ---------------------------------------------------------------

test('the long list is loaded and well formed', function () {
  var index = AV.buildIndex(DATA);
  assert.ok(Object.keys(index.brands).length > 1000, 'only ' + Object.keys(index.brands).length + ' brands');
  var aliasOwner = {};
  index.aliases.forEach(function (a) {
    assert.ok(!aliasOwner[a.text] || aliasOwner[a.text] === a.brand.id, 'the name "' + a.text + '" is claimed by both ' + aliasOwner[a.text] + ' and ' + a.brand.id);
    aliasOwner[a.text] = a.brand.id;
  });
  Object.keys(index.brands).forEach(function (brandId) {
    index.brands[brandId].domains.forEach(function (d) {
      assert.ok(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d), brandId + ' has a malformed domain ' + d);
    });
  });
  Object.keys(index.labels).forEach(function (label) {
    assert.notStrictEqual(index.labels[label], false, 'two brands share the domain name "' + label + '"');
  });
});

test('a distinctive brand is recognised on any country domain', function () {
  assert.strictEqual(id({ urls: ['https://www.ikea.jp/rooms'], text: '' }), 'ikea');
  assert.strictEqual(id({ urls: ['https://www.amazon.co.jp/dp/B000'], text: '' }), 'amazon');
  assert.strictEqual(id({ urls: ['https://www.nike.com.br/'], text: '' }), 'nike');
  // a more specific entry still wins
  assert.strictEqual(id({ urls: ['https://travel.rakuten.co.jp/'], text: '' }), 'rakuten-travel');
  assert.strictEqual(id({ urls: ['https://www.rakuten.co.jp/'], text: '' }), 'rakuten');
});

test('ambiguous names are not stretched to other domains', function () {
  // Zoom the audio company and Corona the heater maker are not our Zoom and Corona.
  assert.strictEqual(id({ urls: ['https://zoomcorp.com/', 'https://www.zoom.co.jp/'], text: '' }), null);
  assert.strictEqual(id({ urls: ['https://www.corona.co.jp/'], text: '' }), null);
  assert.strictEqual(id({ urls: ['https://nike.cheap-shoes.example/'], text: '' }), null);
});

test('identifies brands from Japanese ad text', function () {
  assert.strictEqual(id({ urls: [], text: 'メルカリで売って、ほしいものを買おう' }), 'mercari');
  assert.strictEqual(id({ urls: [], text: 'ドコモからのお知らせ' }), 'docomo');
  // the longer name wins: PayPay Bank, not PayPay
  assert.strictEqual(id({ urls: [], text: 'PayPay銀行で口座開設' }), 'paypay-bank');
  assert.strictEqual(id({ urls: [], text: 'PayPayで支払うとおトク' }), 'paypay');
  // full-width letters are the same letters
  assert.strictEqual(id({ urls: [], text: 'ＰａｙＰａｙで支払うとおトク' }), 'paypay');
});

test('Japanese ad copy gives away the category', function () {
  assert.strictEqual(id({ urls: [], text: '全身脱毛が月々1,000円。無料カウンセリング予約受付中' }), 'category:clinics');
  assert.strictEqual(id({ urls: [], text: '最短即日融資。カードローンのお申込みはこちら' }), 'category:loans');
  assert.strictEqual(id({ urls: [], text: '事前登録受付中！豪華ガチャ100連無料' }), 'category:games');
});

test('brands from the long list get a filled-in pitch', function () {
  var c = counter({ urls: ['https://www.yoshinoya.com/'], text: '' });
  assert.strictEqual(c.kind, 'rival');
  assert.strictEqual(c.id, 'sukiya');
  assert.ok(c.line.indexOf('Yoshinoya') !== -1 && c.line.indexOf('Sukiya') !== -1, c.line);
  assert.ok(c.line.indexOf('{') === -1, c.line);
});

test('lenders and cosmetic clinics never become rival ads', function () {
  ['auto', 'rival', 'nemesis'].forEach(function (mode) {
    var loan = counter({ urls: ['https://www.acom.co.jp/'], text: '' }, mode);
    assert.strictEqual(loan.kind, 'nemesis');
    assert.strictEqual(loan.name, 'Not Borrowing It');
    var clinic = counter({ urls: [], text: '湘南美容クリニックの二重整形' }, mode);
    assert.strictEqual(clinic.kind, 'nemesis');
    assert.strictEqual(clinic.name, 'Being Fine As You Are');
  });
});

test('an app-store link is not an ad for the store', function () {
  var m = AV.identify({ links: ['https://apps.apple.com/jp/app/some-game/id123'], urls: ['https://apps.apple.com/jp/app/some-game/id123'], text: '事前登録受付中！豪華ガチャ100連無料' });
  assert.strictEqual(m.brand, null);
  assert.strictEqual(m.category.id, 'games');
  assert.strictEqual(m.domain, null);
});

console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
