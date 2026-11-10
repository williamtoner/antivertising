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
  assert.strictEqual(c.url, 'https://www.coca-cola.com/');
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

console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
