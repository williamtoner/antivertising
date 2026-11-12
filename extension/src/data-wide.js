/*
 * The long list, part three: more categories, each with its own nemesis.
 * The brands that belong to them are in data-jp.js, data-us.js and
 * data-world.js, which also add brands to the earlier categories.
 *
 * Categories marked noRival never show a competitor, only the nemesis:
 * medicines, lawyers and tobacco get the same treatment as gambling.
 */
(function (root) {
  'use strict';

  var data = root.AV_DATA || require('./data.js');
  var R = data.rows;

  function cat(id, label, keywords, name, color, damage, cta, lines, noRival) {
    var def = { label: label, keywords: keywords, nemesis: { name: name, color: color, damage: damage, cta: cta, lines: lines } };
    if (noRival) def.noRival = true;
    R.cat(id, def, []);
  }

  // ---- occasions and reading ------------------------------------------------------

  cat('weddings', 'weddings',
    ['wedding venue', 'wedding registry', 'bridal', '!結婚式場', 'ブライダルフェア', '婚約指輪', '結婚指輪'],
    'The Registry Office', '#9d174d', 7, 'Bring two witnesses',
    ['Legally identical.', 'Guest list: two witnesses.', 'Spend the difference on the next forty years.']);

  cat('news', 'news subscriptions',
    ['subscribe for unlimited access', 'digital subscription', 'unlimited articles', '!電子版', '有料会員', '購読'],
    "The Library's Newspaper Rack", '#374151', 5, 'Find a chair',
    ['Every paper. No paywall.', 'Includes the crossword.', 'Somebody has already done the sudoku, in pen.']);

  // ---- things in the cupboard ---------------------------------------------------

  cat('household', 'household goods',
    ['laundry detergent', 'fabric softener', 'dish soap', 'paper towels', 'stain remover', '!洗濯洗剤', '柔軟剤', '食器用洗剤', '消臭', '除菌'],
    'Vinegar and Baking Soda', '#4d7c0f', 6, 'Check the kitchen',
    ['Cleans most things. Costs almost nothing.', 'No mountain-spring fragrance. No plastic trigger.', "Your grandmother's entire cleaning cupboard."]);

  cat('baby', 'baby goods',
    ['diapers', 'nappies', 'baby formula', 'stroller', 'car seat', '!おむつ', 'ベビーカー', 'チャイルドシート', '粉ミルク', 'ベビー用品'],
    'Hand-Me-Downs', '#6d28d9', 7, 'Ask a cousin',
    ['Babies cannot read labels.', 'Used for three months by a cousin. Good as new.', 'The pram does not need suspension.']);

  cat('toys', 'toys',
    ['building sets', 'action figures', 'ages 3+', 'ages 6+', '!おもちゃ', 'プラモデル', 'フィギュア', '知育玩具'],
    'A Cardboard Box', '#b45309', 7, 'Find a box',
    ['It is a rocket. It is a castle. It was free.', 'Batteries not included, or needed.', 'The toy came in the better toy.']);

  // ---- things for the house ------------------------------------------------------

  cat('stationery', 'office supplies',
    ['office supplies', 'ink and toner', 'printer paper', '!文房具', 'オフィス用品', 'ボールペン', '手帳'],
    'The Pen You Already Have', '#1e3a8a', 5, 'Check the drawer',
    ['There are eleven in the drawer.', 'It writes. That was the brief.', 'Check the bottom of the bag first.']);

  cat('homesecurity', 'home security',
    ['home security system', 'video doorbell', 'security cameras', '24/7 monitoring', '!ホームセキュリティ', '防犯カメラ', '見守りサービス'],
    'Locking the Door', '#3f3f46', 6, 'Turn the key',
    ['Most burglars try the handle first.', 'No monthly fee. No app.', 'Works during power cuts.']);

  cat('moving', 'removals and storage',
    ['moving quotes', 'self storage', 'storage units', 'movers near you', '!引越し', '引っ越し見積', 'トランクルーム', '不用品回収'],
    'Owning Less', '#57534e', 6, 'Start a pile',
    ['Fewer boxes. Smaller van.', 'Half of it has not been unpacked since last time.', 'The cheapest thing to move is nothing.']);

  cat('power', 'energy suppliers',
    ['electricity plans', 'energy tariff', 'solar panels', 'switch energy supplier', '!電気料金', '新電力', 'ガス料金', '太陽光発電', '蓄電池'],
    'A Jumper', '#7f1d1d', 6, 'Put one on',
    ['One degree lower. One layer more.', 'Fixed tariff: you already own it.', 'No smart meter required.']);

  // ---- getting about ---------------------------------------------------------------

  cat('fuel', 'petrol stations',
    ['fuel rewards', 'cents off per gallon', 'premium gasoline', 'ガソリンスタンド', 'ガソリン割引', '給油'],
    'Your Legs', '#065f46', 6, 'Use them',
    ['Zero per litre.', 'Fill up with breakfast.', 'The loyalty scheme is that you get fitter.']);

  cat('shipping', 'couriers',
    ['shipping rates', 'overnight delivery', 'ship a package', '宅配便', '送料', '集荷'],
    'Handing It Over Yourself', '#713f12', 4, 'Go round',
    ['Guaranteed delivery. You are the tracking.', 'No card through the door.', 'Next-day, if you leave tomorrow.']);

  // ---- services ------------------------------------------------------------------

  cat('universities', 'degrees and courses',
    ['online degree', 'earn your degree', "bachelor's degree", "master's degree", 'mba program', '!通信制大学', '資料請求', 'オープンキャンパス', '専門学校'],
    'A Reading List', '#312e81', 6, 'Start with one book',
    ['The reading list is public. The debt is optional.', 'No application fee.', 'Graduation is whenever you finish the books.']);

  cat('printing', 'printing',
    ['business cards', 'custom printing', 'photo books', 'flyers and posters', '!ネット印刷', '名刺印刷', 'フォトブック', 'チラシ印刷'],
    'A PDF', '#4c1d95', 5, 'Attach it',
    ['Minimum order: zero copies.', 'Nobody has ever had to recycle an attachment.', 'For business cards, say your name clearly.']);

  cat('points', 'cashback and coupons',
    ['cash back', 'coupon codes', 'promo codes', 'earn points', '!ポイ活', 'ポイントサイト', 'クーポン配布', 'キャッシュバック'],
    'Not Buying It: 100% Off', '#111827', 8, 'Close the tab',
    ['The biggest saving is on the things you skip.', 'No code needed.', 'Cashback of everything, instantly.']);

  cat('adtech', 'advertising',
    ['advertise your business', 'reach new customers', 'ad campaigns', 'grow your audience', '!広告運用', 'web広告', '集客', 'リスティング広告'],
    'Word of Mouth', '#064e3b', 9, 'Make something good',
    ['Free. Trusted. Cannot be bought, which is the point.', 'Make something good. People talk.', 'No targeting. No dashboard.']);

  // ---- never a rival, only the nemesis ---------------------------------------------

  cat('health', 'medicines and online clinics',
    ['ask your doctor', 'prescription', 'side effects may include', 'online doctor', 'telehealth', '!オンライン診療', '処方薬', '第2類医薬品', '医薬品'],
    'Your Actual Doctor', '#134e4a', 7, 'Make an appointment',
    ['Knows your history. Is not selling a subscription.', 'Ask them, not an advert.', 'Side effects of asking: none.'], true);

  cat('legal', 'legal services',
    ['free case review', 'no win no fee', 'personal injury', 'injury lawyer', 'debt relief', '!過払い金', '債務整理', '法律事務所', '無料相談'],
    'Reading the Small Print', '#292524', 5, 'Find your glasses',
    ['It is free and takes ten minutes.', 'Ask what the fee is before you ask anything else.', 'The free consultation is the advert.'], true);

  cat('tobacco', 'tobacco and vapes',
    ['heated tobacco', 'nicotine pouches', 'vape', '!加熱式たばこ', '電子タバコ', 'たばこ'],
    'Fresh Air', '#0c4a6e', 10, 'Breathe in',
    ['Free. Unflavoured. Available everywhere.', 'No device. No pods. No cough.', "Your lungs' first choice."], true);
})(typeof globalThis !== 'undefined' ? globalThis : this);
