/*
 * The long list, part one: more brands for the categories data.js defines,
 * weighted towards Japan and the United States.
 *
 * One row per brand, using the helpers at the bottom of data.js:
 *   x(id, name, colour, 'domain domain', archRivalId, 'alias|alias', strict)
 * A final 1 marks a name too ambiguous to match in ad text or on a foreign
 * domain; such a brand is recognised only by its listed domains and aliases.
 *
 * Japanese aliases are matched as substrings, so short katakana that turns up
 * inside ordinary words is avoided on purpose.
 */
(function (root) {
  'use strict';

  var data = root.AV_DATA || require('./data.js');
  var R = data.rows;
  var x = R.x;

  // ---- Japanese names and local domains for brands data.js already knows ----

  R.alias('coca-cola', 'コカ・コーラ|コカコーラ|綾鷹|い・ろ・は・す');
  R.dom('coca-cola', 'cocacola.co.jp cocacola.jp');
  R.alias('pepsi', 'ペプシ');
  R.alias('red-bull', 'レッドブル');
  R.alias('monster', 'モンスターエナジー');
  R.alias('mcdonalds', 'マクドナルド|ビッグマック|マックフライ');
  R.alias('burger-king', 'バーガーキング');
  R.alias('kfc', 'ケンタッキー');
  R.dom('kfc', 'kfc.co.jp');
  R.alias('subway', 'サブウェイ');
  R.dom('subway', 'subway.co.jp');
  R.alias('dominos', 'ドミノ・ピザ|ドミノピザ');
  R.alias('pizza-hut', 'ピザハット');
  R.alias('starbucks', 'スターバックス|スタバ');
  R.alias('nespresso', 'ネスプレッソ');
  R.alias('uber-eats', 'ウーバーイーツ');
  R.alias('toyota', 'トヨタ|プリウス|アルファード|ヤリス');
  R.alias('honda', 'ホンダ|N-BOX');
  R.alias('nissan', '日産');
  R.alias('tesla', 'テスラ');
  R.dom('bmw', 'bmw.co.jp');
  R.alias('mercedes', 'メルセデス・ベンツ|メルセデス');
  R.dom('mercedes', 'mercedes-benz.co.jp');
  R.alias('audi', 'アウディ');
  R.dom('audi', 'audi.co.jp');
  R.alias('volkswagen', 'フォルクスワーゲン');
  R.dom('volkswagen', 'volkswagen.co.jp');
  R.alias('hyundai', 'ヒョンデ');
  R.alias('booking', 'ブッキングドットコム');
  R.alias('expedia', 'エクスペディア');
  R.alias('airbnb', 'エアビーアンドビー');
  R.alias('trivago', 'トリバゴ');
  R.alias('tripadvisor', 'トリップアドバイザー');
  R.alias('apple', 'アイフォン');
  R.alias('netflix', 'ネットフリックス|ネトフリ');
  R.alias('disney-plus', 'ディズニープラス');
  R.alias('prime-video', 'プライムビデオ|プライム・ビデオ');
  R.alias('spotify', 'スポティファイ');
  R.alias('amazon', 'アマゾン|Amazonプライム|プライムデー');
  R.alias('temu', 'ティームー');
  R.alias('shein', 'シーイン');
  R.alias('aliexpress', 'アリエクスプレス');
  R.alias('costco', 'コストコ');
  R.alias('uniqlo', 'ユニクロ');
  R.alias('nike', 'ナイキ');
  R.alias('adidas', 'アディダス');
  R.alias('puma', 'プーマ');
  R.alias('new-balance', 'ニューバランス');
  R.alias('asics', 'アシックス');
  R.alias('under-armour', 'アンダーアーマー');
  R.alias('binance', 'バイナンス');
  R.alias('coinbase', 'コインベース');
  R.alias('mastercard', 'マスターカード');
  R.alias('amex', 'アメックス|アメリカン・エキスプレス');
  R.alias('visa', 'Visaカード|Visaのタッチ決済');
  R.alias('nordvpn', 'ノードVPN');
  R.alias('surfshark', 'サーフシャーク');
  R.alias('tempur', 'テンピュール');
  R.alias('emma', 'エマ・スリープ|エマスリープ');
  R.alias('tinder', 'ティンダー');
  R.alias('chatgpt', 'チャットGPT');
  R.alias('heineken', 'ハイネケン');
  R.alias('nintendo', '任天堂|ニンテンドースイッチ|マリオカート|スプラトゥーン|どうぶつの森');
  R.alias('playstation', 'プレイステーション|プレステ');
  R.alias('duolingo', 'デュオリンゴ');
  R.alias('gillette', 'ジレット');
  R.alias('hellofresh', 'ハローフレッシュ');

  // ---- ad-copy keywords, mostly Japanese ("!" = strong enough on its own) ----

  R.kw('fastfood', ['ハンバーガー', '牛丼', '回転寿司', 'テイクアウト', '期間限定メニュー']);
  R.kw('coffee', ['コーヒー', '珈琲', 'カフェラテ']);
  R.kw('delivery', ['!フードデリバリー', '出前', '配達料']);
  R.kw('rides', ['!タクシーアプリ', '!配車アプリ']);
  R.kw('cars', ['試乗', '!新車', '中古車', '車検', '残価設定', '燃費', 'ハイブリッド車', 'electric vehicle', 'msrp']);
  R.kw('airlines', ['航空券', '!格安航空券', 'マイル', '直行便']);
  R.kw('travel', ['!宿泊予約', '!ホテル予約', '温泉宿', '旅行予約', 'ツアー', '宿泊プラン', 'vacation packages', 'cruise']);
  R.kw('phones', ['!スマホ本体', '機種変更', '下取り']);
  R.kw('carriers', ['!格安sim', '!格安スマホ', '乗り換え', '月額基本料', 'データ無制限', '!光回線', 'home internet', 'wireless plan']);
  R.kw('streaming', ['!見放題', '独占配信', '無料トライアル', '配信中']);
  R.kw('music', ['!聴き放題', '音楽配信']);
  R.kw('shopping', ['送料無料', 'ポイント最大', 'タイムセール', 'お買い物マラソン', 'クーポン配布中', 'セール開催中', 'black friday', 'cyber monday']);
  R.kw('fashion', ['新作アイテム', 'コーデ', 'レディースファッション', 'メンズファッション', 'アウター']);
  R.kw('sportswear', ['スニーカー', 'ランニングシューズ', 'スポーツウェア']);
  R.kw('gambling', ['!カジノ', '!オンラインカジノ', '!競馬', '!競輪', '!パチンコ', '!ブックメーカー', '!入金不要ボーナス', '馬券', 'オッズ', '!sweepstakes casino', '!daily fantasy']);
  R.kw('crypto', ['!仮想通貨', '!暗号資産', '!ビットコイン', 'イーサリアム', 'nft']);
  R.kw('investing', ['!nisa', '!つみたて投資', '!株式投資', '!投資信託', '!fx口座', 'ideco', '資産運用', '口座開設', '証券口座']);
  R.kw('bnpl', ['!あと払い', '!後払い', '分割手数料無料']);
  R.kw('cards', ['!クレジットカード', '!年会費無料', '!新規入会', '入会特典', 'ポイント還元']);
  R.kw('insurance', ['!自動車保険', '!生命保険', '!医療保険', '!がん保険', '!火災保険', '保険料', '保険の見直し', 'お見積り', '!life insurance', '!medicare', 'health plan']);
  R.kw('vpn', ['!vpnサービス']);
  R.kw('mealkits', ['!ミールキット', '!宅配弁当', '冷凍弁当', '宅食']);
  R.kw('mattress', ['!マットレス', '寝具', '敷布団']);
  R.kw('sitebuilders', ['!レンタルサーバー', '!ホームページ作成', 'ドメイン取得', 'ネットショップ開設', 'wordpress hosting']);
  R.kw('dating', ['!マッチングアプリ', '!婚活', '!結婚相談所', '恋活', '出会い']);
  R.kw('ai', ['!生成ai', '!aiアシスタント', 'aiチャット', 'ai agent']);
  R.kw('cloud', ['!クラウドサーバー', 'vps']);
  R.kw('worktools', ['!タスク管理', '!プロジェクト管理', 'ビジネスチャット', 'web会議']);
  R.kw('tax', ['!確定申告', '年末調整']);
  R.kw('beer', ['ビール', '発泡酒', '生ビール', 'お酒は20歳になってから']);
  R.kw('gaming', ['ゲーム機', 'ダウンロード版', '予約受付中']);
  R.kw('fitness', ['!パーソナルジム', '!フィットネスジム', 'ダイエット', '月額制ジム', '入会金無料', '無料体験']);
  R.kw('learning', ['!オンライン英会話', '!英会話', '!通信教育', '!プログラミングスクール', '資格取得', '無料体験レッスン', 'オンライン講座', 'online degree']);
  R.kw('razors', ['!カミソリ', '!シェーバー', '髭剃り']);

  // ---- soft drinks -----------------------------------------------------------

  R.add('soda', [
    x('7up', '7UP', '#00a651', '7up.com', 'sprite', 'Seven Up'),
    x('pocari', 'Pocari Sweat', '#0068b7', 'pocarisweat.jp otsuka.co.jp', 'aquarius', 'ポカリスエット|ポカリ|大塚製薬|カロリーメイト|オロナミンC'),
    x('aquarius', 'Aquarius', '#0091d5', 'aquarius-sports.jp', 'pocari', 'アクエリアス', 1),
    x('gatorade', 'Gatorade', '#f36f21', 'gatorade.com', 'powerade'),
    x('powerade', 'Powerade', '#00539b', 'powerade.com', 'gatorade'),
    x('bodyarmor', 'BODYARMOR', '#e4002b', 'drinkbodyarmor.com', 'gatorade'),
    x('liquid-death', 'Liquid Death', '#1a1a1a', 'liquiddeath.com', 'lacroix'),
    x('lacroix', 'LaCroix', '#00a3ad', 'lacroixwater.com', 'liquid-death', 'La Croix'),
    x('poppi', 'Poppi', '#ff5fa2', 'drinkpoppi.com', 'olipop', 'Poppi soda', 1),
    x('olipop', 'OLIPOP', '#f58220', 'drinkolipop.com', 'poppi'),
    x('ito-en', 'Ito En', '#00693e', 'itoen.co.jp itoen.com', 'calpis', '伊藤園|お〜いお茶|おーいお茶'),
    x('calpis', 'Calpis', '#0068b7', 'calpis.info calpis.co.jp asahiinryo.co.jp', 'pocari', 'カルピス|三ツ矢サイダー|アサヒ飲料'),
    x('schweppes', 'Schweppes', '#b8860b', 'schweppes.com', 'canada-dry'),
    x('canada-dry', 'Canada Dry', '#00693e', 'canadadry.com', 'schweppes'),
    x('lipton', 'Lipton', '#d4a017', 'lipton.com', 'ito-en', 'リプトン'),
    x('san-pellegrino', 'S.Pellegrino', '#003b83', 'sanpellegrino.com', 'perrier', 'San Pellegrino'),
    x('perrier', 'Perrier', '#00843d', 'perrier.com', 'san-pellegrino', 'ペリエ'),
    x('evian', 'evian', '#e4007f', 'evian.com', 'fiji-water', 'エビアン'),
    x('fiji-water', 'FIJI Water', '#00a3e0', 'fijiwater.com', 'evian', 'Fiji Water', 1)
  ]);

  R.add('energy', [
    x('rockstar', 'Rockstar Energy', '#b8860b', 'rockstarenergy.com', 'monster', 'Rockstar Energy', 1),
    x('bang', 'Bang Energy', '#1a1a1a', 'bangenergy.com', 'celsius', 'Bang Energy', 1),
    x('ghost', 'GHOST', '#1a1a1a', 'ghostlifestyle.com', 'celsius', 'GHOST Energy', 1),
    x('alani-nu', 'Alani Nu', '#e75480', 'alaninu.com', 'celsius'),
    x('5-hour', '5-hour ENERGY', '#e4002b', '5hourenergy.com', 'red-bull', '5 Hour Energy'),
    x('c4', 'C4 Energy', '#b8860b', 'cellucor.com c4energy.com', 'celsius', 'C4 Energy|Cellucor', 1),
    x('zone-energy', 'ZONe', '#7b3fe4', 'zone-energy.jp', 'monster', 'ZONe ENERGY|ZONeエナジー', 1),
    x('lipovitan', 'Lipovitan D', '#0068b7', 'taisho.co.jp', 'red-bull', 'リポビタン|大正製薬')
  ]);

  // ---- fast food and restaurants ------------------------------------------------

  R.add('fastfood', [
    x('mos-burger', 'MOS Burger', '#008a3e', 'mos.jp mos.co.jp', 'mcdonalds', 'モスバーガー|モスチキン'),
    x('lotteria', 'Lotteria', '#e60012', 'lotteria.jp', 'mos-burger', 'ロッテリア'),
    x('freshness', 'Freshness Burger', '#00693e', 'freshnessburger.co.jp', 'mos-burger', 'フレッシュネスバーガー'),
    x('yoshinoya', 'Yoshinoya', '#f39800', 'yoshinoya.com yoshinoyaamerica.com', 'sukiya', '吉野家'),
    x('sukiya', 'Sukiya', '#e60012', 'sukiya.jp', 'yoshinoya', 'すき家'),
    x('matsuya', 'Matsuya', '#f7b500', 'matsuyafoods.co.jp', 'yoshinoya', '松屋フーズ|松屋の牛めし', 1),
    x('saizeriya', 'Saizeriya', '#00913a', 'saizeriya.co.jp', 'skylark', 'サイゼリヤ'),
    x('skylark', 'Gusto', '#e60012', 'skylark.co.jp', 'saizeriya', 'すかいらーく|バーミヤン', 1),
    x('coco-ichi', 'CoCo Ichibanya', '#f7b500', 'ichibanya.co.jp', 'matsuya', 'ココイチ|CoCo壱番屋|ココ壱'),
    x('marugame', 'Marugame Seimen', '#1a1a1a', 'marugame.com marugame-seimen.com marugameudon.com', 'hanamaru', '丸亀製麺|Marugame Udon'),
    x('hanamaru', 'Hanamaru Udon', '#f39800', 'hanamaruudon.com', 'marugame', 'はなまるうどん'),
    x('sushiro', 'Sushiro', '#e60012', 'akindo-sushiro.co.jp', 'kura-sushi', 'スシロー'),
    x('kura-sushi', 'Kura Sushi', '#e60012', 'kurasushi.co.jp kurasushi.com', 'sushiro', 'くら寿司'),
    x('hama-sushi', 'Hama Sushi', '#0068b7', 'hama-sushi.co.jp', 'sushiro', 'はま寿司'),
    x('pizza-la', 'Pizza-La', '#e60012', 'pizza-la.co.jp', 'dominos', 'ピザーラ'),
    x('mister-donut', 'Mister Donut', '#f7b500', 'misterdonut.jp', 'krispy-kreme', 'ミスタードーナツ|ミスド'),
    x('krispy-kreme', 'Krispy Kreme', '#00664f', 'krispykreme.com krispykreme.jp', 'dunkin', 'クリスピー・クリーム'),
    x('ootoya', 'Ootoya', '#1a1a1a', 'ootoya.com', 'yayoiken', '大戸屋'),
    x('yayoiken', 'Yayoi-ken', '#e60012', 'yayoiken.com', 'ootoya', 'やよい軒'),
    x('ringer-hut', 'Ringer Hut', '#e60012', 'ringerhut.jp', 'marugame', 'リンガーハット'),
    x('gyukaku', 'Gyu-Kaku', '#e60012', 'gyukaku.ne.jp gyu-kaku.com', 'yoshinoya', '牛角'),
    x('five-guys', 'Five Guys', '#e4002b', 'fiveguys.com', 'shake-shack'),
    x('shake-shack', 'Shake Shack', '#5fa136', 'shakeshack.com shakeshack.jp', 'five-guys', 'シェイクシャック'),
    x('in-n-out', 'In-N-Out', '#e4002b', 'in-n-out.com', 'five-guys', 'In-N-Out Burger'),
    x('chipotle', 'Chipotle', '#a81612', 'chipotle.com', 'taco-bell'),
    x('arbys', "Arby's", '#d71921', 'arbys.com', 'wendys', 'Arbys'),
    x('sonic', 'Sonic Drive-In', '#0073cf', 'sonicdrivein.com', 'wendys', 'Sonic Drive-In', 1),
    x('jack-in-the-box', 'Jack in the Box', '#e4002b', 'jackinthebox.com', 'wendys'),
    x('dairy-queen', 'Dairy Queen', '#e4002b', 'dairyqueen.com dq.com', 'wendys', 'DQ Blizzard'),
    x('panda-express', 'Panda Express', '#d02b2e', 'pandaexpress.com', 'chipotle'),
    x('panera', 'Panera', '#5a7d2f', 'panerabread.com', 'subway', 'Panera Bread'),
    x('little-caesars', 'Little Caesars', '#ff6600', 'littlecaesars.com', 'dominos'),
    x('jersey-mikes', "Jersey Mike's", '#00529b', 'jerseymikes.com', 'subway', 'Jersey Mikes'),
    x('jimmy-johns', "Jimmy John's", '#e4002b', 'jimmyjohns.com', 'subway', 'Jimmy Johns'),
    x('raising-canes', "Raising Cane's", '#e4002b', 'raisingcanes.com', 'chick-fil-a', 'Raising Canes'),
    x('wingstop', 'Wingstop', '#006938', 'wingstop.com', 'popeyes'),
    x('whataburger', 'Whataburger', '#ff770f', 'whataburger.com', 'mcdonalds'),
    x('culvers', "Culver's", '#005596', 'culvers.com', 'wendys', 'Culvers'),
    x('carls-jr', "Carl's Jr.", '#e4002b', 'carlsjr.com hardees.com', 'burger-king', "Carls Jr|Hardee's|Hardees"),
    x('dennys', "Denny's", '#d4a017', 'dennys.com dennys.jp', 'ihop', 'Dennys|デニーズ'),
    x('ihop', 'IHOP', '#0064b0', 'ihop.com', 'dennys'),
    x('applebees', "Applebee's", '#c8102e', 'applebees.com', 'chilis', 'Applebees'),
    x('chilis', "Chili's", '#d2232a', 'chilis.com', 'applebees', "Chili's Grill", 1),
    x('olive-garden', 'Olive Garden', '#6b8e23', 'olivegarden.com', 'applebees'),
    x('outback', 'Outback Steakhouse', '#8b1a1a', 'outback.com', 'applebees', 'Outback Steakhouse', 1),
    x('buffalo-wild-wings', 'Buffalo Wild Wings', '#d4a017', 'buffalowildwings.com', 'wingstop')
  ]);

  R.add('coffee', [
    x('doutor', 'Doutor', '#f7b500', 'doutor.co.jp', 'komeda', 'ドトール'),
    x('komeda', 'Komeda Coffee', '#7b3f00', 'komeda.co.jp', 'doutor', 'コメダ珈琲|コメダ'),
    x('tullys', "Tully's Coffee", '#00693e', 'tullys.co.jp', 'starbucks', 'タリーズ|Tullys'),
    x('blue-bottle', 'Blue Bottle Coffee', '#00a3e0', 'bluebottlecoffee.com bluebottlecoffee.jp', 'starbucks', 'ブルーボトル|Blue Bottle'),
    x('peets', "Peet's Coffee", '#3b2314', 'peets.com', 'starbucks', 'Peets'),
    x('dutch-bros', 'Dutch Bros', '#0057b8', 'dutchbros.com', 'starbucks'),
    x('ucc', 'UCC Coffee', '#c8102e', 'ucc.co.jp', 'nescafe', 'UCC上島珈琲|UCCコーヒー', 1),
    x('nescafe', 'Nescafé', '#e4002b', 'nescafe.com', 'ucc', 'Nescafe|ネスカフェ'),
    x('lavazza', 'Lavazza', '#0a3266', 'lavazza.com lavazzausa.com', 'illy'),
    x('illy', 'illy', '#e4002b', 'illy.com', 'lavazza', 'illy caffè|illycaffè', 1),
    x('key-coffee', 'Key Coffee', '#003b83', 'keycoffee.co.jp', 'ucc', 'キーコーヒー'),
    x('agf', 'AGF', '#e60012', 'agf.ajinomoto.co.jp agf.co.jp', 'nescafe', 'ブレンディ|Blendy|味の素AGF', 1)
  ]);

  R.add('delivery', [
    x('demaecan', 'Demae-can', '#e60012', 'demae-can.com', 'uber-eats', '出前館'),
    x('wolt', 'Wolt', '#009de0', 'wolt.com', 'uber-eats', 'ウォルト'),
    x('gopuff', 'Gopuff', '#00a4ff', 'gopuff.com', 'doordash'),
    x('postmates', 'Postmates', '#1a1a1a', 'postmates.com', 'doordash'),
    x('seamless', 'Seamless', '#f63440', 'seamless.com', 'doordash', 'Seamless delivery', 1),
    x('shipt', 'Shipt', '#23cc6b', 'shipt.com', 'instacart'),
    x('amazon-fresh', 'Amazon Fresh', '#77bc1f', 'fresh.amazon.com', 'instacart', 'Amazon Fresh|Amazonフレッシュ', 1)
  ]);

  R.add('rides', [
    x('go-taxi', 'GO', '#0a2540', 'go.goinc.jp goinc.jp', 'uber', 'タクシーアプリGO|GOタクシー|タクシーアプリ「GO」', 1),
    x('s-ride', 'S.RIDE', '#1a1a1a', 'sride.jp', 'go-taxi', 'エスライド'),
    x('didi', 'DiDi', '#ff7d41', 'didiglobal.com didimobility.co.jp', 'uber', 'ディディ'),
    x('grab', 'Grab', '#00b14f', 'grab.com', 'uber', 'Grab app|GrabFood|GrabCar', 1),
    x('waymo', 'Waymo', '#00a37a', 'waymo.com', 'uber'),
    x('lime', 'Lime', '#32b432', 'li.me', 'uber', 'Lime scooter|Lime bike', 1),
    x('luup', 'LUUP', '#00a99d', 'luup.sc', 'lime', 'LUUP', 1)
  ]);

  // ---- cars ---------------------------------------------------------------------

  R.add('cars', [
    x('subaru', 'Subaru', '#013c74', 'subaru.com subaru.jp', 'mazda', 'スバル'),
    x('mazda', 'Mazda', '#910a2d', 'mazda.com mazda.co.jp mazdausa.com', 'subaru', 'マツダ'),
    x('lexus', 'Lexus', '#1a1a1a', 'lexus.com lexus.jp', 'mercedes', 'レクサス'),
    x('mitsubishi-motors', 'Mitsubishi Motors', '#e60012', 'mitsubishi-motors.com mitsubishi-motors.co.jp mitsubishicars.com', 'nissan', '三菱自動車|Mitsubishi Outlander|デリカ'),
    x('suzuki', 'Suzuki', '#e30613', 'suzuki.co.jp globalsuzuki.com', 'daihatsu', 'スズキ|スペーシア|ハスラー|ジムニー'),
    x('daihatsu', 'Daihatsu', '#e60012', 'daihatsu.co.jp', 'suzuki', 'ダイハツ|タント'),
    x('jeep', 'Jeep', '#3a5f0b', 'jeep.com jeep-japan.com', 'ford', 'Jeep Wrangler|Jeep Grand Cherokee'),
    x('ram', 'Ram Trucks', '#1a1a1a', 'ramtrucks.com', 'ford', 'Ram 1500|Ram Trucks', 1),
    x('gmc', 'GMC', '#c8102e', 'gmc.com', 'ford', 'GMC Sierra'),
    x('cadillac', 'Cadillac', '#1a1a1a', 'cadillac.com', 'lincoln-motor', 'キャデラック'),
    x('lincoln-motor', 'Lincoln', '#1a1a1a', 'lincoln.com', 'cadillac', 'Lincoln Navigator|Lincoln Aviator|Lincoln Corsair', 1),
    x('buick', 'Buick', '#1a1a1a', 'buick.com', 'lexus'),
    x('dodge', 'Dodge', '#c8102e', 'dodge.com', 'ford', 'Dodge Charger|Dodge Durango|Dodge Hornet', 1),
    x('chrysler', 'Chrysler', '#003b83', 'chrysler.com', 'honda'),
    x('volvo', 'Volvo', '#003057', 'volvocars.com', 'audi', 'ボルボ'),
    x('porsche', 'Porsche', '#b12b28', 'porsche.com', 'bmw', 'ポルシェ'),
    x('land-rover', 'Land Rover', '#005a2b', 'landrover.com landrover.co.jp landroverusa.com', 'jeep', 'Range Rover|ランドローバー|レンジローバー'),
    x('jaguar', 'Jaguar', '#1a1a1a', 'jaguar.com jaguarusa.com', 'porsche', 'Jaguar F-PACE|Jaguar I-PACE', 1),
    x('mini', 'MINI', '#1a1a1a', 'mini.com mini.jp miniusa.com', 'volkswagen', 'MINI Cooper|MINI Countryman', 1),
    x('rivian', 'Rivian', '#f7a600', 'rivian.com', 'tesla'),
    x('lucid', 'Lucid', '#b8a165', 'lucidmotors.com', 'tesla', 'Lucid Air|Lucid Gravity|Lucid Motors', 1),
    x('polestar', 'Polestar', '#1a1a1a', 'polestar.com', 'tesla'),
    x('byd', 'BYD', '#e60012', 'byd.com byd.co.jp', 'tesla'),
    x('acura', 'Acura', '#1a1a1a', 'acura.com', 'lexus'),
    x('infiniti', 'INFINITI', '#1a1a1a', 'infinitiusa.com infiniti.com', 'lexus'),
    x('genesis', 'Genesis', '#1a1a1a', 'genesis.com', 'lexus', 'Genesis GV70|Genesis GV80|Genesis G80', 1),
    x('peugeot', 'Peugeot', '#003b83', 'peugeot.com peugeot.co.jp', 'renault', 'プジョー'),
    x('renault', 'Renault', '#d4a017', 'renault.com renault.jp', 'peugeot', 'ルノー'),
    x('fiat', 'Fiat', '#9d0d15', 'fiat.com fiat-auto.co.jp fiatusa.com', 'mini', 'Fiat 500|フィアット', 1),
    x('citroen', 'Citroën', '#da291c', 'citroen.com citroen.jp citroen.co.uk', 'peugeot', 'Citroen|シトロエン'),
    x('opel', 'Opel', '#1a1a1a', 'opel.com opel.de', 'volkswagen'),
    x('skoda', 'Škoda', '#0e3a2f', 'skoda-auto.com skoda.co.uk', 'volkswagen', 'Skoda'),
    x('seat', 'SEAT', '#1a1a1a', 'seat.com seat.co.uk', 'skoda', 'SEAT Ibiza|SEAT Leon|SEAT Arona', 1),
    x('cupra', 'CUPRA', '#95572b', 'cupraofficial.com cupraofficial.co.uk', 'seat'),
    x('dacia', 'Dacia', '#646b52', 'dacia.com dacia.co.uk', 'skoda'),
    x('alfa-romeo', 'Alfa Romeo', '#981e32', 'alfaromeo.com alfaromeo-jp.com alfaromeousa.com', 'bmw', 'アルファロメオ'),
    x('maserati', 'Maserati', '#0c2340', 'maserati.com', 'porsche', 'マセラティ'),
    x('ferrari', 'Ferrari', '#d40000', 'ferrari.com', 'lamborghini', 'フェラーリ'),
    x('lamborghini', 'Lamborghini', '#1a1a1a', 'lamborghini.com', 'ferrari', 'ランボルギーニ'),
    x('bentley', 'Bentley', '#1a1a1a', 'bentleymotors.com', 'porsche', 'Bentley Motors|ベントレー', 1),
    x('carvana', 'Carvana', '#00aed9', 'carvana.com', 'carmax'),
    x('carmax', 'CarMax', '#003b83', 'carmax.com', 'carvana'),
    x('cargurus', 'CarGurus', '#ef3742', 'cargurus.com', 'autotrader'),
    x('autotrader', 'Autotrader', '#f26522', 'autotrader.com autotrader.co.uk', 'cargurus', 'Auto Trader'),
    x('cars-com', 'Cars.com', '#532380', 'cars.com', 'cargurus', 'Cars.com', 1),
    x('gulliver', 'Gulliver', '#e60012', '221616.com', 'carsensor', 'ガリバー 中古車|中古車のガリバー', 1),
    x('carsensor', 'Carsensor', '#e60012', 'carsensor.net', 'goo-net', 'カーセンサー'),
    x('goo-net', 'Goo-net', '#00913a', 'goo-net.com', 'carsensor', 'グーネット'),
    x('nextage', 'Nextage', '#e60012', 'nextage.jp', 'gulliver', 'ネクステージ'),
    x('kinto', 'KINTO', '#00708d', 'kinto-jp.com kinto-mobility.com', 'carsensor', 'KINTO', 1),
    x('autobacs', 'Autobacs', '#f39800', 'autobacs.com', 'yellow-hat', 'オートバックス'),
    x('yellow-hat', 'Yellow Hat', '#d4a017', 'yellowhat.jp', 'autobacs', 'イエローハット'),
    x('bridgestone', 'Bridgestone', '#e60012', 'bridgestone.co.jp bridgestone.com bridgestonetire.com', 'michelin', 'ブリヂストン'),
    x('michelin', 'Michelin', '#27509b', 'michelin.com michelin.co.jp michelinman.com', 'bridgestone', 'ミシュラン'),
    x('goodyear', 'Goodyear', '#004ea8', 'goodyear.com', 'michelin'),
    x('harley', 'Harley-Davidson', '#f36f21', 'harley-davidson.com', 'honda', 'Harley Davidson|ハーレーダビッドソン')
  ]);

  // ---- airlines and travel ----------------------------------------------------------

  R.add('airlines', [
    x('ana', 'ANA', '#13448f', 'ana.co.jp', 'jal', '全日空|ANAマイレージ|All Nippon Airways', 1),
    x('jal', 'JAL', '#c8102e', 'jal.co.jp jal.com', 'ana', '日本航空|JALマイレージ|Japan Airlines', 1),
    x('peach', 'Peach', '#b5007f', 'flypeach.com', 'jetstar', 'ピーチ航空|Peach Aviation', 1),
    x('jetstar', 'Jetstar', '#ff5a00', 'jetstar.com', 'peach', 'ジェットスター'),
    x('zipair', 'ZIPAIR', '#1a1a1a', 'zipair.net', 'peach'),
    x('skymark', 'Skymark', '#003b83', 'skymark.co.jp', 'peach', 'スカイマーク'),
    x('starflyer', 'Star Flyer', '#1a1a1a', 'starflyer.jp', 'skymark', 'スターフライヤー'),
    x('alaska', 'Alaska Airlines', '#01426a', 'alaskaair.com', 'delta', 'Alaska Airlines', 1),
    x('spirit', 'Spirit Airlines', '#b8a100', 'spirit.com', 'frontier', 'Spirit Airlines', 1),
    x('frontier', 'Frontier Airlines', '#00693e', 'flyfrontier.com', 'spirit', 'Frontier Airlines', 1),
    x('hawaiian', 'Hawaiian Airlines', '#413691', 'hawaiianairlines.com hawaiianairlines.co.jp', 'alaska', 'Hawaiian Airlines|ハワイアン航空', 1),
    x('emirates', 'Emirates', '#d71921', 'emirates.com', 'qatar', 'Fly Emirates|Emirates Airline|エミレーツ航空', 1),
    x('qatar', 'Qatar Airways', '#5c0632', 'qatarairways.com', 'emirates', 'カタール航空'),
    x('singapore-air', 'Singapore Airlines', '#f99f1c', 'singaporeair.com', 'cathay', 'シンガポール航空'),
    x('cathay', 'Cathay Pacific', '#005d63', 'cathaypacific.com', 'singapore-air', 'キャセイパシフィック'),
    x('korean-air', 'Korean Air', '#0064d2', 'koreanair.com', 'ana', '大韓航空'),
    x('lufthansa', 'Lufthansa', '#05164d', 'lufthansa.com', 'british-airways', 'ルフトハンザ'),
    x('air-france', 'Air France', '#002157', 'airfrance.com airfrance.co.jp airfrance.us', 'lufthansa', 'エールフランス'),
    x('klm', 'KLM', '#00a1de', 'klm.com klm.nl klm.co.jp', 'lufthansa'),
    x('air-canada', 'Air Canada', '#d22630', 'aircanada.com', 'united'),
    x('qantas', 'Qantas', '#e0001b', 'qantas.com', 'singapore-air', 'カンタス'),
    x('turkish', 'Turkish Airlines', '#c8102e', 'turkishairlines.com', 'emirates', 'ターキッシュ エアラインズ'),
    x('etihad', 'Etihad', '#bd8b13', 'etihad.com', 'emirates', 'エティハド'),
    x('eva-air', 'EVA Air', '#00693e', 'evaair.com', 'cathay', 'エバー航空'),
    x('virgin-atlantic', 'Virgin Atlantic', '#e10a0a', 'virginatlantic.com', 'british-airways'),
    x('finnair', 'Finnair', '#0b1560', 'finnair.com', 'lufthansa', 'フィンエアー')
  ]);

  R.add('travel', [
    x('rakuten-travel', 'Rakuten Travel', '#bf0000', 'travel.rakuten.co.jp travel.rakuten.com', 'jalan', '楽天トラベル|Rakuten Travel', 1),
    x('jalan', 'Jalan', '#ff6600', 'jalan.net', 'rakuten-travel', 'じゃらん'),
    x('ikyu', 'Ikyu', '#0a2a5e', 'ikyu.com', 'jalan', '一休.com'),
    x('jtb', 'JTB', '#c8102e', 'jtb.co.jp', 'his'),
    x('his', 'HIS', '#00a0e9', 'his-j.com his-usa.com', 'jtb', 'H.I.S.|エイチ・アイ・エス', 1),
    x('yahoo-travel', 'Yahoo! Travel', '#ff0033', 'travel.yahoo.co.jp', 'rakuten-travel', 'Yahoo!トラベル|ヤフートラベル', 1),
    x('airtrip', 'AirTrip', '#00a0e9', 'airtrip.jp', 'skyscanner', 'エアトリ'),
    x('hankyu-travel', 'Hankyu Travel', '#7b1e3a', 'hankyu-travel.com', 'jtb', '阪急交通社'),
    x('club-tourism', 'Club Tourism', '#e60012', 'club-t.com', 'jtb', 'クラブツーリズム'),
    x('agoda', 'Agoda', '#5392f9', 'agoda.com', 'booking', 'アゴダ'),
    x('trip-com', 'Trip.com', '#287dfa', 'trip.com', 'booking', 'Trip.com', 1),
    x('kayak', 'KAYAK', '#ff690f', 'kayak.com kayak.co.jp', 'skyscanner', 'Kayak.com', 1),
    x('skyscanner', 'Skyscanner', '#0770e3', 'skyscanner.com skyscanner.net skyscanner.jp', 'kayak', 'スカイスキャナー'),
    x('priceline', 'Priceline', '#0068ef', 'priceline.com', 'expedia'),
    x('hopper', 'Hopper', '#fa6866', 'hopper.com', 'kayak', 'Hopper app', 1),
    x('marriott', 'Marriott', '#a6192e', 'marriott.com marriott.co.jp', 'hilton', 'マリオット|Marriott Bonvoy'),
    x('hilton', 'Hilton', '#002c51', 'hilton.com hiltonhotels.jp', 'marriott', 'ヒルトン'),
    x('hyatt', 'Hyatt', '#1a1a1a', 'hyatt.com', 'marriott', 'ハイアット'),
    x('ihg', 'IHG', '#e35205', 'ihg.com', 'marriott', 'Holiday Inn|InterContinental|IHG One Rewards'),
    x('wyndham', 'Wyndham', '#0075c9', 'wyndhamhotels.com', 'ihg'),
    x('apa', 'APA Hotel', '#f7b500', 'apahotel.com', 'toyoko-inn', 'アパホテル'),
    x('toyoko-inn', 'Toyoko Inn', '#003b83', 'toyoko-inn.com', 'apa', '東横イン|東横INN'),
    x('hoshino', 'Hoshino Resorts', '#1a1a1a', 'hoshinoresorts.com', 'ikyu', '星野リゾート|星のや'),
    x('club-med', 'Club Med', '#003b83', 'clubmed.com clubmed.co.jp clubmed.us', 'hoshino', 'クラブメッド'),
    x('klook', 'Klook', '#ff5b00', 'klook.com', 'kkday'),
    x('kkday', 'KKday', '#26bec9', 'kkday.com', 'klook'),
    x('viator', 'Viator', '#328e04', 'viator.com', 'getyourguide'),
    x('getyourguide', 'GetYourGuide', '#ff5533', 'getyourguide.com', 'viator'),
    x('royal-caribbean', 'Royal Caribbean', '#0f1c4d', 'royalcaribbean.com', 'carnival'),
    x('carnival', 'Carnival', '#e4002b', 'carnival.com', 'royal-caribbean', 'Carnival Cruise', 1),
    x('norwegian-cruise', 'Norwegian Cruise Line', '#00a3e0', 'ncl.com', 'royal-caribbean', 'NCL cruises'),
    x('viking', 'Viking', '#1a1a1a', 'vikingcruises.com viking.com', 'royal-caribbean', 'Viking Cruises|Viking River', 1),
    x('disney-parks', 'Disney Parks', '#113ccf', 'disneyworld.disney.go.com disneyland.disney.go.com tokyodisneyresort.jp', 'usj', 'Walt Disney World|Disneyland|東京ディズニーリゾート|東京ディズニーランド|ディズニーシー', 1),
    x('usj', 'Universal Studios', '#0068b7', 'usj.co.jp universalorlando.com universalstudioshollywood.com', 'disney-parks', 'ユニバーサル・スタジオ・ジャパン|Universal Orlando|USJ', 1),
    x('jr-east', 'JR East', '#008803', 'jreast.co.jp eki-net.com', 'jr-central', 'JR東日本|えきねっと|大人の休日倶楽部', 1),
    x('jr-central', 'JR Central', '#f77321', 'jr-central.co.jp smart-ex.jp', 'jr-east', 'JR東海|スマートEX', 1)
  ]);

  // ---- phones, networks, streaming, music ---------------------------------------

  R.add('phones', [
    x('xiaomi', 'Xiaomi', '#ff6900', 'mi.com xiaomi.com', 'samsung', 'シャオミ|Redmi'),
    x('oppo', 'OPPO', '#046a38', 'oppo.com', 'xiaomi', 'オッポ'),
    x('xperia', 'Sony Xperia', '#1a1a1a', 'xperia.sony.jp', 'samsung', 'Xperia|エクスペリア', 1),
    x('motorola', 'Motorola', '#001428', 'motorola.com', 'samsung', 'モトローラ|Moto G'),
    x('oneplus', 'OnePlus', '#f5010c', 'oneplus.com', 'samsung'),
    x('nothing', 'Nothing', '#1a1a1a', 'nothing.tech', 'google-pixel', 'Nothing Phone', 1),
    x('huawei', 'Huawei', '#cf0a2c', 'huawei.com consumer.huawei.com', 'xiaomi', 'ファーウェイ')
  ]);

  R.add('carriers', [
    x('docomo', 'NTT Docomo', '#cc0033', 'docomo.ne.jp nttdocomo.co.jp', 'au', 'ドコモ|docomo|irumo|eximo'),
    x('au', 'au', '#eb5505', 'au.com', 'docomo', 'auでんき|auスマートパス|auひかり|au 5G|KDDI', 1),
    x('softbank', 'SoftBank', '#8a8d8f', 'softbank.jp', 'docomo', 'ソフトバンク'),
    x('rakuten-mobile', 'Rakuten Mobile', '#bf0000', 'mobile.rakuten.co.jp network.mobile.rakuten.co.jp', 'docomo', '楽天モバイル|Rakuten最強プラン'),
    x('ahamo', 'ahamo', '#00b8a9', 'ahamo.com', 'povo', 'アハモ'),
    x('povo', 'povo', '#d4b800', 'povo.jp', 'ahamo'),
    x('linemo', 'LINEMO', '#06c755', 'linemo.jp', 'ahamo', 'ラインモ'),
    x('uq-mobile', 'UQ mobile', '#e4007f', 'uqwimax.jp', 'ymobile', 'UQモバイル|UQ WiMAX'),
    x('ymobile', 'Y!mobile', '#e60012', 'ymobile.jp', 'uq-mobile', 'ワイモバイル|Y!mobile|Ymobile', 1),
    x('iijmio', 'IIJmio', '#00a0e9', 'iijmio.jp', 'mineo'),
    x('mineo', 'mineo', '#70b82e', 'mineo.jp', 'iijmio', 'マイネオ'),
    x('nuro', 'NURO Hikari', '#1a1a1a', 'nuro.jp', 'softbank', 'NURO光|NURO 光'),
    x('xfinity', 'Xfinity', '#6138f5', 'xfinity.com comcast.com', 'verizon', 'Comcast'),
    x('spectrum', 'Spectrum', '#0099d8', 'spectrum.com', 'xfinity', 'Spectrum Internet|Spectrum Mobile|Spectrum One', 1),
    x('cox', 'Cox', '#00a9e0', 'cox.com', 'xfinity', 'Cox Internet|Cox Communications', 1),
    x('starlink', 'Starlink', '#1a1a1a', 'starlink.com', 'xfinity'),
    x('visible', 'Visible', '#1800ff', 'visible.com', 'mint-mobile', 'Visible wireless|Visible by Verizon', 1),
    x('cricket', 'Cricket Wireless', '#5fb53b', 'cricketwireless.com', 'mint-mobile', 'Cricket Wireless', 1),
    x('boost', 'Boost Mobile', '#f7901e', 'boostmobile.com', 'mint-mobile', 'Boost Mobile', 1),
    x('google-fi', 'Google Fi', '#4285f4', 'fi.google.com', 'mint-mobile', 'Google Fi', 1),
    x('us-mobile', 'US Mobile', '#1a1a1a', 'usmobile.com', 'mint-mobile', 'US Mobile', 1),
    x('metro-tmobile', 'Metro by T-Mobile', '#6e3fa3', 'metrobyt-mobile.com', 'cricket'),
    x('three-uk', 'Three', '#1a1a1a', 'three.co.uk', 'ee', 'Three Mobile', 1),
    x('sky-uk', 'Sky', '#0072c9', 'sky.com', 'virgin-media', 'Sky Broadband|Sky Glass|Sky Mobile|Sky TV', 1),
    x('virgin-media', 'Virgin Media', '#e10a0a', 'virginmedia.com', 'sky-uk')
  ]);

  R.add('streaming', [
    x('u-next', 'U-NEXT', '#1a1a1a', 'unext.jp video.unext.jp', 'netflix', 'ユーネクスト'),
    x('abema', 'ABEMA', '#1a1a1a', 'abema.tv', 'u-next', 'アベマ'),
    x('dazn', 'DAZN', '#0c161c', 'dazn.com', 'abema', 'ダゾーン'),
    x('d-anime', 'd Anime Store', '#f47a20', 'animestore.docomo.ne.jp', 'crunchyroll', 'dアニメストア', 1),
    x('tver', 'TVer', '#00a0e9', 'tver.jp', 'abema', 'ティーバー'),
    x('wowow', 'WOWOW', '#0068b7', 'wowow.co.jp', 'u-next'),
    x('lemino', 'Lemino', '#1a1a1a', 'lemino.docomo.ne.jp', 'u-next', 'レミノ'),
    x('fod', 'FOD', '#e60012', 'fod.fujitv.co.jp', 'tver', 'FODプレミアム|フジテレビオンデマンド', 1),
    x('telasa', 'TELASA', '#1a1a1a', 'telasa.jp', 'u-next', 'テラサ'),
    x('dmm-tv', 'DMM TV', '#1a1a1a', 'tv.dmm.com', 'u-next', 'DMM TV|DMMプレミアム', 1),
    x('niconico', 'niconico', '#252525', 'nicovideo.jp', 'abema', 'ニコニコ動画'),
    x('crunchyroll', 'Crunchyroll', '#f47521', 'crunchyroll.com', 'netflix', 'クランチロール'),
    x('youtube-premium', 'YouTube Premium', '#ff0000', 'tv.youtube.com', 'netflix', 'YouTube TV|YouTube Premium', 1),
    x('sling', 'Sling TV', '#0085ff', 'sling.com', 'youtube-premium', 'Sling TV', 1),
    x('fubo', 'Fubo', '#e4002b', 'fubo.tv', 'youtube-premium', 'FuboTV'),
    x('espn-plus', 'ESPN+', '#e4002b', 'plus.espn.com', 'peacock', 'ESPN Plus|ESPN+', 1),
    x('discovery-plus', 'discovery+', '#2175d9', 'discoveryplus.com', 'max', 'Discovery Plus|discovery+', 1),
    x('tubi', 'Tubi', '#7408ff', 'tubitv.com', 'pluto'),
    x('pluto', 'Pluto TV', '#1a1a1a', 'pluto.tv', 'tubi'),
    x('roku', 'Roku', '#662d91', 'roku.com', 'apple-tv'),
    x('twitch', 'Twitch', '#9146ff', 'twitch.tv', 'youtube-premium', 'Twitch.tv|Twitch stream|Twitch streamer', 1),
    x('starz', 'STARZ', '#1a1a1a', 'starz.com', 'max'),
    x('britbox', 'BritBox', '#1a1a1a', 'britbox.com', 'netflix'),
    x('mubi', 'MUBI', '#1a1a1a', 'mubi.com', 'netflix'),
    x('curiosity', 'Curiosity Stream', '#f7a600', 'curiositystream.com', 'discovery-plus')
  ]);

  R.add('music', [
    x('amazon-music', 'Amazon Music', '#0fa8b5', 'music.amazon.com music.amazon.co.jp', 'spotify', 'Amazon Music', 1),
    x('line-music', 'LINE MUSIC', '#06c755', 'music.line.me', 'spotify', 'LINE MUSIC', 1),
    x('awa', 'AWA', '#1a1a1a', 'awa.fm', 'line-music', '', 1),
    x('pandora', 'Pandora', '#224099', 'pandora.com', 'spotify', 'Pandora music|Pandora Premium|Pandora radio', 1),
    x('siriusxm', 'SiriusXM', '#0000eb', 'siriusxm.com', 'spotify', 'Sirius XM'),
    x('deezer', 'Deezer', '#a238ff', 'deezer.com', 'spotify'),
    x('soundcloud', 'SoundCloud', '#ff5500', 'soundcloud.com', 'spotify'),
    x('iheart', 'iHeartRadio', '#c6002b', 'iheart.com', 'siriusxm', 'iHeart')
  ]);

  // ---- shopping, fashion, sportswear ---------------------------------------------

  R.add('shopping', [
    x('rakuten', 'Rakuten', '#bf0000', 'rakuten.co.jp rakuten.com', 'amazon', '楽天市場|楽天スーパーセール|楽天ポイント'),
    x('yahoo-shopping', 'Yahoo! Shopping', '#ff0033', 'shopping.yahoo.co.jp', 'rakuten', 'Yahoo!ショッピング|ヤフーショッピング|Yahoo! Shopping', 1),
    x('mercari', 'Mercari', '#ff0211', 'mercari.com jp.mercari.com', 'ebay', 'メルカリ'),
    x('yahoo-auctions', 'Yahoo! Auctions', '#d4a017', 'auctions.yahoo.co.jp', 'mercari', 'ヤフオク', 1),
    x('rakuma', 'Rakuma', '#e3007f', 'fril.jp', 'mercari', 'ラクマ'),
    x('qoo10', 'Qoo10', '#ea0029', 'qoo10.jp', 'rakuten', 'メガ割'),
    x('lohaco', 'LOHACO', '#e60012', 'lohaco.yahoo.co.jp lohaco.jp', 'amazon', 'ロハコ'),
    x('askul', 'ASKUL', '#e60012', 'askul.co.jp', 'amazon', 'アスクル'),
    x('au-pay-market', 'au PAY Market', '#eb5505', 'wowma.jp', 'rakuten', 'au PAY マーケット|au PAYマーケット', 1),
    x('donki', 'Don Quijote', '#00a0e9', 'donki.com', 'daiso', 'ドン・キホーテ|ドンキホーテ|Donki'),
    x('daiso', 'Daiso', '#e4007f', 'daiso-sangyo.co.jp daisonet.com', 'donki', 'ダイソー'),
    x('japanet', 'Japanet Takata', '#e60012', 'japanet.co.jp', 'shop-channel', 'ジャパネット'),
    x('shop-channel', 'Shop Channel', '#e60012', 'shopch.jp', 'japanet', 'ショップチャンネル'),
    x('qvc', 'QVC', '#00a9e0', 'qvc.com qvc.jp', 'shop-channel'),
    x('belle-maison', 'Belle Maison', '#c8102e', 'bellemaison.jp', 'nissen', 'ベルメゾン'),
    x('nissen', 'Nissen', '#e60012', 'nissen.co.jp', 'belle-maison', 'ニッセン'),
    x('matsukiyo', 'Matsumoto Kiyoshi', '#d4a017', 'matsukiyo.co.jp matsukiyococokara-online.com', 'welcia', 'マツモトキヨシ|マツキヨ'),
    x('welcia', 'Welcia', '#e60012', 'welcia-yakkyoku.co.jp', 'matsukiyo', 'ウエルシア'),
    x('kohls', "Kohl's", '#1a1a1a', 'kohls.com', 'target', 'Kohls'),
    x('macys', "Macy's", '#e21a2c', 'macys.com', 'kohls', 'Macys'),
    x('jcpenney', 'JCPenney', '#d0202e', 'jcpenney.com', 'macys', 'JC Penney'),
    x('sams-club', "Sam's Club", '#0067a0', 'samsclub.com', 'costco', 'Sams Club'),
    x('bjs', "BJ's", '#d6001c', 'bjs.com', 'costco', "BJ's Wholesale", 1),
    x('dollar-general', 'Dollar General', '#b8a100', 'dollargeneral.com', 'dollar-tree'),
    x('dollar-tree', 'Dollar Tree', '#00843d', 'dollartree.com', 'dollar-general'),
    x('tiktok-shop', 'TikTok Shop', '#1a1a1a', 'shop.tiktok.com', 'temu', 'TikTok Shop', 1),
    x('wish', 'Wish', '#2fb7ec', 'wish.com', 'temu', 'Wish.com', 1),
    x('poshmark', 'Poshmark', '#822432', 'poshmark.com', 'mercari'),
    x('walgreens', 'Walgreens', '#e31837', 'walgreens.com', 'cvs'),
    x('cvs', 'CVS', '#cc0000', 'cvs.com', 'walgreens', 'CVS Pharmacy')
  ]);

  R.add('fashion', [
    x('zozotown', 'ZOZOTOWN', '#1a1a1a', 'zozo.jp', 'rakuten-fashion', 'ゾゾタウン|ZOZO'),
    x('rakuten-fashion', 'Rakuten Fashion', '#bf0000', 'brandavenue.rakuten.co.jp', 'zozotown', '楽天ファッション|Rakuten Fashion', 1),
    x('gu', 'GU', '#0033a0', 'gu-global.com', 'shimamura', 'ジーユー', 1),
    x('shimamura', 'Shimamura', '#e60012', 'shimamura.gr.jp', 'gu', 'しまむら'),
    x('beams', 'BEAMS', '#f15a22', 'beams.co.jp', 'united-arrows', 'ビームス', 1),
    x('united-arrows', 'United Arrows', '#1a1a1a', 'united-arrows.co.jp', 'beams', 'ユナイテッドアローズ'),
    x('workman', 'Workman', '#f7b500', 'workman.co.jp', 'uniqlo', 'ワークマン', 1),
    x('aoyama', 'Yofuku no Aoyama', '#003b83', 'y-aoyama.jp', 'aoki', '洋服の青山'),
    x('aoki', 'AOKI', '#003b83', 'aoki-style.com', 'aoyama', '', 1),
    x('shoplist', 'SHOPLIST', '#e4007f', 'shop-list.com', 'zozotown', 'ショップリスト'),
    x('wacoal', 'Wacoal', '#b5007f', 'wacoal.jp wacoal.co.jp', 'peach-john', 'ワコール'),
    x('peach-john', 'PEACH JOHN', '#f15b9c', 'peachjohn.co.jp', 'wacoal', 'ピーチ・ジョン|ピーチジョン'),
    x('gap', 'Gap', '#002868', 'gap.com gap.co.jp', 'hm', 'Gap Factory|Gap Inc', 1),
    x('old-navy', 'Old Navy', '#003764', 'oldnavy.com oldnavy.gap.com', 'gap'),
    x('banana-republic', 'Banana Republic', '#1a1a1a', 'bananarepublic.com bananarepublic.gap.com', 'j-crew'),
    x('j-crew', 'J.Crew', '#1a1a1a', 'jcrew.com', 'banana-republic', 'J Crew'),
    x('levis', "Levi's", '#c41230', 'levi.com levi.jp', 'gap', 'Levis|リーバイス'),
    x('ralph-lauren', 'Ralph Lauren', '#041e42', 'ralphlauren.com ralphlauren.co.jp', 'tommy', 'ラルフローレン'),
    x('tommy', 'Tommy Hilfiger', '#c8102e', 'tommy.com', 'ralph-lauren', 'トミーヒルフィガー'),
    x('calvin-klein', 'Calvin Klein', '#1a1a1a', 'calvinklein.com calvinklein.us', 'tommy', 'カルバン・クライン'),
    x('abercrombie', 'Abercrombie & Fitch', '#1a1a1a', 'abercrombie.com', 'american-eagle', 'Abercrombie|アバクロ'),
    x('american-eagle', 'American Eagle', '#00205b', 'ae.com', 'abercrombie', 'Aerie'),
    x('hollister', 'Hollister', '#1c3a63', 'hollisterco.com', 'american-eagle'),
    x('forever-21', 'Forever 21', '#b8a100', 'forever21.com', 'shein'),
    x('mango', 'Mango', '#1a1a1a', 'mango.com', 'zara', 'Mango fashion|MANGO outlet', 1),
    x('anthropologie', 'Anthropologie', '#1a1a1a', 'anthropologie.com', 'urban-outfitters'),
    x('urban-outfitters', 'Urban Outfitters', '#1a1a1a', 'urbanoutfitters.com', 'anthropologie'),
    x('nordstrom', 'Nordstrom', '#1a1a1a', 'nordstrom.com nordstromrack.com', 'macys', 'Nordstrom Rack'),
    x('skims', 'SKIMS', '#8c7b6b', 'skims.com', 'aritzia'),
    x('aritzia', 'Aritzia', '#1a1a1a', 'aritzia.com', 'skims'),
    x('everlane', 'Everlane', '#1a1a1a', 'everlane.com', 'uniqlo'),
    x('quince', 'Quince', '#1a1a1a', 'quince.com', 'everlane', 'Quince cashmere', 1),
    x('bonobos', 'Bonobos', '#003b83', 'bonobos.com', 'j-crew'),
    x('stitch-fix', 'Stitch Fix', '#00a3ad', 'stitchfix.com', 'nordstrom'),
    x('revolve', 'REVOLVE', '#1a1a1a', 'revolve.com', 'asos', 'REVOLVE clothing|Revolve.com', 1),
    x('fashion-nova', 'Fashion Nova', '#1a1a1a', 'fashionnova.com', 'shein'),
    x('boohoo', 'boohoo', '#1a1a1a', 'boohoo.com', 'shein', 'boohoo.com|boohooMAN', 1),
    x('victorias-secret', "Victoria's Secret", '#d9608f', 'victoriassecret.com', 'skims', 'Victorias Secret'),
    x('coach', 'Coach', '#1a1a1a', 'coach.com coachoutlet.com', 'michael-kors', 'Coach Outlet|コーチ アウトレット', 1),
    x('michael-kors', 'Michael Kors', '#1a1a1a', 'michaelkors.com michaelkors.jp', 'coach', 'マイケル・コース'),
    x('kate-spade', 'Kate Spade', '#1a1a1a', 'katespade.com katespade.jp', 'coach', 'ケイト・スペード'),
    x('gucci', 'Gucci', '#1a1a1a', 'gucci.com', 'louis-vuitton', 'グッチ'),
    x('louis-vuitton', 'Louis Vuitton', '#3b2314', 'louisvuitton.com', 'gucci', 'ルイ・ヴィトン'),
    x('prada', 'Prada', '#1a1a1a', 'prada.com', 'gucci', 'プラダ'),
    x('burberry', 'Burberry', '#1a1a1a', 'burberry.com', 'gucci', 'バーバリー'),
    x('chanel', 'Chanel', '#1a1a1a', 'chanel.com', 'dior', 'シャネル'),
    x('dior', 'Dior', '#1a1a1a', 'dior.com', 'chanel', 'ディオール'),
    x('hermes', 'Hermès', '#f37021', 'hermes.com', 'louis-vuitton', 'Hermes|エルメス'),
    x('tiffany', 'Tiffany & Co.', '#0a9a96', 'tiffany.com tiffany.co.jp', 'cartier', 'Tiffany|ティファニー'),
    x('cartier', 'Cartier', '#a6192e', 'cartier.com cartier.jp', 'tiffany', 'カルティエ'),
    x('pandora-jewelry', 'Pandora', '#c98aa0', 'pandora.net', 'tiffany', 'Pandora jewelry|Pandora charms', 1),
    x('rolex', 'Rolex', '#006039', 'rolex.com', 'omega', 'ロレックス'),
    x('omega', 'OMEGA', '#c8102e', 'omegawatches.com omegawatches.jp', 'rolex', 'OMEGA Seamaster|OMEGA Speedmaster|OMEGA watches', 1),
    x('seiko', 'Seiko', '#1a1a1a', 'seikowatches.com seiko.co.jp', 'citizen', 'セイコー|グランドセイコー|Grand Seiko'),
    x('citizen', 'Citizen', '#003b83', 'citizen.jp citizenwatch.com', 'seiko', 'シチズン時計|Citizen Eco-Drive', 1),
    x('casio', 'Casio', '#003b83', 'casio.com casio.co.jp', 'seiko', 'カシオ|G-SHOCK')
  ]);

  R.add('sportswear', [
    x('mizuno', 'Mizuno', '#001489', 'mizuno.com mizuno.jp mizunousa.com', 'asics', 'ミズノ'),
    x('onitsuka', 'Onitsuka Tiger', '#f7b500', 'onitsukatiger.com', 'new-balance', 'オニツカタイガー'),
    x('hoka', 'HOKA', '#00a3e0', 'hoka.com', 'on-running', 'ホカオネオネ|HOKA ONE ONE'),
    x('on-running', 'On', '#1a1a1a', 'on.com on-running.com', 'hoka', 'On Running|On Cloud|Cloudmonster', 1),
    x('skechers', 'Skechers', '#003b83', 'skechers.com skechers.jp', 'new-balance', 'スケッチャーズ'),
    x('converse', 'Converse', '#1a1a1a', 'converse.com converse.co.jp', 'vans', 'Converse Chuck|Converse All Star|コンバース', 1),
    x('vans', 'Vans', '#c8102e', 'vans.com vans.co.jp', 'converse', 'Vans shoes|Vans Old Skool', 1),
    x('crocs', 'Crocs', '#00a94f', 'crocs.com crocs.co.jp', 'birkenstock', 'クロックス'),
    x('birkenstock', 'Birkenstock', '#003b83', 'birkenstock.com', 'crocs', 'ビルケンシュトック'),
    x('allbirds', 'Allbirds', '#212a2f', 'allbirds.com allbirds.jp', 'hoka'),
    x('fila', 'FILA', '#002d62', 'fila.com', 'reebok'),
    x('champion', 'Champion', '#c8102e', 'champion.com championusa.jp', 'fila', 'Champion sportswear|Champion hoodie', 1),
    x('gymshark', 'Gymshark', '#1a1a1a', 'gymshark.com', 'lululemon'),
    x('alo', 'Alo Yoga', '#1a1a1a', 'aloyoga.com', 'lululemon', 'Alo Yoga', 1),
    x('vuori', 'Vuori', '#1a1a1a', 'vuoriclothing.com vuori.com', 'lululemon'),
    x('salomon', 'Salomon', '#1a1a1a', 'salomon.com', 'hoka', 'サロモン'),
    x('brooks', 'Brooks', '#1a4f9c', 'brooksrunning.com', 'hoka', 'Brooks Running|Brooks Ghost|Brooks Glycerin', 1),
    x('saucony', 'Saucony', '#e4002b', 'saucony.com', 'brooks', 'サッカニー'),
    x('foot-locker', 'Foot Locker', '#1a1a1a', 'footlocker.com', 'nike'),
    x('abc-mart', 'ABC-MART', '#e60012', 'abc-mart.net abc-mart.com', 'foot-locker', 'ABCマート'),
    x('dicks', "Dick's Sporting Goods", '#006747', 'dickssportinggoods.com', 'foot-locker', "DICK'S Sporting Goods|Dicks Sporting Goods", 1),
    x('rei', 'REI', '#1f513f', 'rei.com', 'patagonia', 'REI Co-op', 1),
    x('patagonia', 'Patagonia', '#1a1a1a', 'patagonia.com patagonia.jp', 'north-face', 'Patagonia jacket|Patagonia.com|パタゴニア', 1),
    x('north-face', 'The North Face', '#1a1a1a', 'thenorthface.com goldwin.co.jp', 'patagonia', 'North Face|ノースフェイス|ザ・ノース・フェイス'),
    x('columbia', 'Columbia', '#005a9c', 'columbia.com columbiasports.co.jp', 'north-face', 'Columbia Sportswear', 1),
    x('montbell', 'mont-bell', '#00693e', 'montbell.jp montbell.com', 'snow-peak', 'モンベル|montbell'),
    x('snow-peak', 'Snow Peak', '#1a1a1a', 'snowpeak.co.jp snowpeak.com', 'montbell', 'スノーピーク'),
    x('arcteryx', "Arc'teryx", '#1a1a1a', 'arcteryx.com arcteryx.jp', 'patagonia', 'Arcteryx|アークテリクス'),
    x('yeti', 'YETI', '#002b45', 'yeti.com', 'stanley', 'YETI cooler|YETI Rambler', 1),
    x('stanley', 'Stanley', '#1a1a1a', 'stanley1913.com', 'yeti', 'Stanley Quencher|Stanley tumbler', 1),
    x('alpen', 'Alpen', '#e60012', 'alpen-group.jp', 'xebio', 'スポーツデポ|アルペン アウトドアーズ', 1),
    x('xebio', 'Xebio', '#003b83', 'supersports.com xebio.co.jp', 'alpen', 'ゼビオ'),
    x('callaway', 'Callaway', '#1a1a1a', 'callawaygolf.com callawaygolf.jp', 'taylormade', 'キャロウェイ'),
    x('taylormade', 'TaylorMade', '#1a1a1a', 'taylormadegolf.com taylormadegolf.jp', 'callaway', 'テーラーメイド'),
    x('titleist', 'Titleist', '#1a1a1a', 'titleist.com titleist.co.jp', 'callaway', 'タイトリスト')
  ]);

  // ---- money: gambling, crypto, trading, pay-later, cards, insurance -----------------

  R.add('gambling', [
    x('caesars', 'Caesars Sportsbook', '#b8a165', 'caesars.com', '', 'Caesars Sportsbook|Caesars Palace Online', 1),
    x('espn-bet', 'ESPN BET', '#e4002b', 'espnbet.com', '', 'ESPN BET', 1),
    x('fanatics-sb', 'Fanatics Sportsbook', '#e4002b', 'sportsbook.fanatics.com', '', 'Fanatics Sportsbook|Fanatics Casino', 1),
    x('prizepicks', 'PrizePicks', '#6c1ed9', 'prizepicks.com', ''),
    x('underdog', 'Underdog Fantasy', '#f7b500', 'underdogfantasy.com', '', 'Underdog Fantasy', 1),
    x('hard-rock-bet', 'Hard Rock Bet', '#1a1a1a', 'hardrock.bet', ''),
    x('betrivers', 'BetRivers', '#1a3c6e', 'betrivers.com', ''),
    x('chumba', 'Chumba Casino', '#e4002b', 'chumbacasino.com', ''),
    x('mcluck', 'McLuck', '#6c1ed9', 'mcluck.com', ''),
    x('high-5', 'High 5 Casino', '#6c1ed9', 'high5casino.com', ''),
    x('pulsz', 'Pulsz', '#e4007f', 'pulsz.com', ''),
    x('wow-vegas', 'WOW Vegas', '#6c1ed9', 'wowvegas.com', ''),
    x('jackpocket', 'Jackpocket', '#00a3e0', 'jackpocket.com', ''),
    x('kalshi', 'Kalshi', '#00a37a', 'kalshi.com', ''),
    x('polymarket', 'Polymarket', '#1652f0', 'polymarket.com', ''),
    x('888', '888', '#1a1a1a', '888.com 888casino.com 888sport.com 888poker.com', '', '888casino|888sport|888poker', 1),
    x('bwin', 'bwin', '#1a1a1a', 'bwin.com', ''),
    x('unibet', 'Unibet', '#147b45', 'unibet.com unibet.co.uk', ''),
    x('betano', 'Betano', '#ff3c00', 'betano.com', ''),
    x('1xbet', '1xBet', '#1a5685', '1xbet.com', ''),
    x('roobet', 'Roobet', '#f7b500', 'roobet.com', ''),
    x('bc-game', 'BC.GAME', '#00a37a', 'bc.game', ''),
    x('sportsbet-io', 'Sportsbet.io', '#00a37a', 'sportsbet.io', ''),
    x('jra', 'JRA', '#00693e', 'jra.go.jp jra.jp', '', '日本中央競馬会|JRA', 1),
    x('keirin', 'KEIRIN.JP', '#e60012', 'keirin.jp', '', 'KEIRIN.JP', 1),
    x('boatrace', 'Boat Race', '#0068b7', 'boatrace.jp', '', 'ボートレース|競艇|テレボート', 1),
    x('winticket', 'WINTICKET', '#e60012', 'winticket.jp', '', 'ウィンチケット'),
    x('tipstar', 'TIPSTAR', '#1a1a1a', 'tipstar.com', ''),
    x('rakuten-keiba', 'Rakuten Keiba', '#bf0000', 'keiba.rakuten.co.jp', '', '楽天競馬', 1),
    x('oddspark', 'Odds Park', '#0068b7', 'oddspark.com', '', 'オッズパーク'),
    x('spat4', 'SPAT4', '#e60012', 'spat4.jp', ''),
    x('takarakuji', 'Takarakuji', '#e60012', 'takarakuji-official.jp', '', '宝くじ|ロト6|ロト7|年末ジャンボ', 1),
    x('toto-lottery', 'Sports Kuji', '#f39800', 'toto-dream.com', '', 'スポーツくじ', 1),
    x('vera-john', 'Vera&John', '#00a37a', 'verajohn.com', '', 'ベラジョン'),
    x('yuugado', 'Yuugado', '#1a1a1a', 'yuugado.com', '', '遊雅堂'),
    x('maruhan', 'Maruhan', '#e60012', 'maruhan.co.jp', '', 'マルハン')
  ]);

  R.add('crypto', [
    x('bitflyer', 'bitFlyer', '#1e88e5', 'bitflyer.com', 'coincheck', 'ビットフライヤー'),
    x('coincheck', 'Coincheck', '#0aa5ac', 'coincheck.com', 'bitflyer', 'コインチェック'),
    x('gmo-coin', 'GMO Coin', '#005bac', 'coin.z.com', 'bitflyer', 'GMOコイン', 1),
    x('bitbank', 'bitbank', '#1a1a1a', 'bitbank.cc', 'bitflyer', 'ビットバンク'),
    x('sbi-vc', 'SBI VC Trade', '#0068b7', 'sbivc.co.jp', 'bitflyer', 'SBI VCトレード', 1),
    x('rakuten-wallet', 'Rakuten Wallet', '#bf0000', 'rakuten-wallet.co.jp', 'bitflyer', '楽天ウォレット'),
    x('bybit', 'Bybit', '#f7a600', 'bybit.com', 'binance'),
    x('okx', 'OKX', '#1a1a1a', 'okx.com', 'binance'),
    x('kucoin', 'KuCoin', '#01bc8d', 'kucoin.com', 'binance'),
    x('bitget', 'Bitget', '#03aac7', 'bitget.com', 'bybit'),
    x('mexc', 'MEXC', '#0b8ff0', 'mexc.com', 'bybit'),
    x('gate-io', 'Gate.io', '#2354e6', 'gate.io gate.com', 'bybit', 'Gate.io', 1),
    x('metamask', 'MetaMask', '#f6851b', 'metamask.io', 'coinbase'),
    x('ledger', 'Ledger', '#1a1a1a', 'ledger.com', 'trezor', 'Ledger wallet|Ledger Nano', 1),
    x('trezor', 'Trezor', '#00854d', 'trezor.io', 'ledger'),
    x('uniswap', 'Uniswap', '#ff007a', 'uniswap.org', 'coinbase'),
    x('phantom', 'Phantom', '#7b6fe0', 'phantom.com phantom.app', 'metamask', 'Phantom wallet', 1),
    x('solana', 'Solana', '#9945ff', 'solana.com', 'coinbase')
  ]);

  R.add('investing', [
    x('sbi-sec', 'SBI Securities', '#0068b7', 'sbisec.co.jp', 'rakuten-sec', 'SBI証券'),
    x('rakuten-sec', 'Rakuten Securities', '#bf0000', 'rakuten-sec.co.jp', 'sbi-sec', '楽天証券'),
    x('monex', 'Monex', '#003b83', 'monex.co.jp', 'sbi-sec', 'マネックス証券'),
    x('matsui', 'Matsui Securities', '#e60012', 'matsui.co.jp', 'sbi-sec', '松井証券'),
    x('au-kabucom', 'au Kabucom', '#eb5505', 'kabu.com', 'sbi-sec', 'auカブコム証券|カブコム'),
    x('nomura', 'Nomura', '#c8102e', 'nomura.co.jp nomura.com', 'daiwa', '野村證券|野村証券'),
    x('daiwa', 'Daiwa Securities', '#003b83', 'daiwa.jp', 'nomura', '大和証券'),
    x('smbc-nikko', 'SMBC Nikko', '#00693e', 'smbcnikko.co.jp', 'nomura', 'SMBC日興証券'),
    x('wealthnavi', 'WealthNavi', '#1f3b6e', 'wealthnavi.com', 'rakuten-sec', 'ウェルスナビ'),
    x('paypay-sec', 'PayPay Securities', '#ff0033', 'paypay-sec.co.jp', 'rakuten-sec', 'PayPay証券', 1),
    x('moomoo', 'moomoo', '#ff6900', 'moomoo.com', 'webull', 'ムームー証券'),
    x('dmm-fx', 'DMM FX', '#1a1a1a', 'fx.dmm.com kabu.dmm.com', 'gmo-click', 'DMM FX|DMM株', 1),
    x('gmo-click', 'GMO Click Securities', '#003b83', 'click-sec.com', 'dmm-fx', 'GMOクリック証券'),
    x('gaitame', 'Gaitame.com', '#e60012', 'gaitame.com', 'dmm-fx', '外為どっとコム', 1),
    x('minna-fx', 'Minna no FX', '#f39800', 'min-fx.jp', 'dmm-fx', 'みんなのFX'),
    x('ig', 'IG', '#e4002b', 'ig.com', 'etoro', 'IG証券|IG Markets', 1),
    x('oanda', 'OANDA', '#00693e', 'oanda.com oanda.jp', 'ig'),
    x('vanguard', 'Vanguard', '#96151d', 'vanguard.com', 'fidelity', 'Vanguard funds|Vanguard ETF|Vanguard Group', 1),
    x('etrade', 'E*TRADE', '#6633cc', 'etrade.com', 'schwab', 'ETRADE|E-Trade'),
    x('webull', 'Webull', '#0d6efd', 'webull.com', 'robinhood'),
    x('ibkr', 'Interactive Brokers', '#d81222', 'interactivebrokers.com interactivebrokers.co.jp', 'schwab', 'IBKR'),
    x('betterment', 'Betterment', '#1e5ed4', 'betterment.com', 'wealthfront', 'Betterment investing|Betterment.com', 1),
    x('wealthfront', 'Wealthfront', '#4840bb', 'wealthfront.com', 'betterment'),
    x('acorns', 'Acorns', '#74c043', 'acorns.com', 'robinhood', 'Acorns app|Acorns invest', 1),
    x('public', 'Public', '#0b2dff', 'public.com', 'robinhood', 'Public.com|Public app', 1),
    x('stash', 'Stash', '#6c3fc5', 'stash.com', 'acorns', 'Stash app|Stash invest', 1),
    x('tradingview', 'TradingView', '#2962ff', 'tradingview.com', 'webull'),
    x('plus500', 'Plus500', '#0a2896', 'plus500.com', 'etoro'),
    x('trading212', 'Trading 212', '#00a7e1', 'trading212.com', 'etoro'),
    x('xm', 'XM', '#e4002b', 'xm.com', 'etoro', 'XM Trading|XMTrading', 1),
    x('exness', 'Exness', '#c9a800', 'exness.com', 'xm'),
    x('motley-fool', 'The Motley Fool', '#e4002b', 'fool.com', 'vanguard', 'Motley Fool'),
    x('fisher', 'Fisher Investments', '#00693e', 'fisherinvestments.com', 'vanguard'),
    x('edward-jones', 'Edward Jones', '#d4a017', 'edwardjones.com', 'fidelity'),
    x('morgan-stanley', 'Morgan Stanley', '#003b83', 'morganstanley.com', 'goldman'),
    x('goldman', 'Goldman Sachs', '#5a7fa8', 'goldmansachs.com marcus.com', 'morgan-stanley', 'Marcus by Goldman Sachs')
  ]);

  R.add('bnpl', [
    x('paidy', 'Paidy', '#e5007d', 'paidy.com', 'klarna', 'ペイディ'),
    x('merpay', 'Merpay', '#ff0211', 'merpay.com', 'paidy', 'メルペイ'),
    x('atone', 'atone', '#00b5ad', 'atone.be', 'paidy', 'atone 後払い', 1),
    x('zip-pay', 'Zip', '#7b5fe0', 'zip.co', 'affirm', 'Zip Pay|Pay with Zip', 1),
    x('sezzle', 'Sezzle', '#382757', 'sezzle.com', 'afterpay')
  ]);

  R.add('cards', [
    x('rakuten-card', 'Rakuten Card', '#bf0000', 'rakuten-card.co.jp', 'jcb', '楽天カード'),
    x('jcb', 'JCB', '#0e4c96', 'jcb.co.jp jcb.jp global.jcb', 'visa', 'JCBカード'),
    x('smbc-card', 'SMBC Card', '#00693e', 'smbc-card.com', 'rakuten-card', '三井住友カード'),
    x('epos', 'Epos Card', '#e60012', 'eposcard.co.jp', 'rakuten-card', 'エポスカード'),
    x('aeon-card', 'AEON Card', '#b60081', 'aeon.co.jp', 'rakuten-card', 'イオンカード', 1),
    x('d-card', 'd CARD', '#cc0033', 'dcard.docomo.ne.jp d-card.jp', 'rakuten-card', 'dカード', 1),
    x('saison', 'Saison Card', '#00479d', 'saisoncard.co.jp', 'jcb', 'セゾンカード'),
    x('orico', 'Orico', '#f39800', 'orico.co.jp', 'jcb', 'オリコカード'),
    x('paypay-card', 'PayPay Card', '#ff0033', 'paypay-card.co.jp', 'rakuten-card', 'PayPayカード', 1),
    x('citi', 'Citi', '#003b70', 'citi.com citibank.com', 'chase', 'Citibank|Citi Double Cash|Citi Custom Cash|Citi card', 1),
    x('barclaycard', 'Barclaycard', '#00aeef', 'barclaycard.co.uk', 'amex'),
    x('apple-card', 'Apple Card', '#1a1a1a', 'card.apple.com', 'amex', 'Apple Card', 1),
    x('bilt', 'Bilt', '#1a1a1a', 'biltrewards.com', 'chase', 'Bilt Rewards|Bilt Mastercard', 1),
    x('nerdwallet', 'NerdWallet', '#00ae4d', 'nerdwallet.com', 'credit-karma'),
    x('credit-karma', 'Credit Karma', '#008600', 'creditkarma.com', 'nerdwallet'),
    x('bankrate', 'Bankrate', '#0157ff', 'bankrate.com', 'nerdwallet'),
    x('experian', 'Experian', '#1d4f91', 'experian.com', 'credit-karma')
  ]);

  R.add('insurance', [
    x('sony-sonpo', 'Sony Insurance', '#003b83', 'sonysonpo.co.jp', 'tokio-marine', 'ソニー損保'),
    x('tokio-marine', 'Tokio Marine', '#00a0e9', 'tokiomarine-nichido.co.jp tokiomarine.com', 'sompo', '東京海上日動|東京海上'),
    x('sompo', 'Sompo Japan', '#e60012', 'sompo-japan.co.jp', 'tokio-marine', '損保ジャパン|SOMPO'),
    x('ms-ins', 'Mitsui Sumitomo Insurance', '#00693e', 'ms-ins.com', 'tokio-marine', '三井住友海上'),
    x('sbi-sonpo', 'SBI Insurance', '#0068b7', 'sbisonpo.co.jp', 'sony-sonpo', 'SBI損保'),
    x('rakuten-insurance', 'Rakuten Insurance', '#bf0000', 'rakuten-insurance.co.jp rakuten-sonpo.co.jp rakuten-life.co.jp', 'sony-sonpo', '楽天損保|楽天生命|楽天保険'),
    x('zurich', 'Zurich', '#003399', 'zurich.co.jp zurich.com', 'sony-sonpo', 'チューリッヒ保険|Zurich Insurance', 1),
    x('axa', 'AXA', '#00008f', 'axa-direct.co.jp axa.co.jp axa.com', 'zurich', 'アクサダイレクト|アクサ生命'),
    x('aflac', 'Aflac', '#00a7e1', 'aflac.com aflac.co.jp', 'lifenet', 'アフラック'),
    x('lifenet', 'Lifenet', '#6a9a1f', 'lifenet-seimei.co.jp', 'aflac', 'ライフネット生命'),
    x('nissay', 'Nippon Life', '#e60012', 'nissay.co.jp', 'dai-ichi', '日本生命|ニッセイ'),
    x('dai-ichi', 'Dai-ichi Life', '#e60012', 'dai-ichi-life.co.jp', 'nissay', '第一生命'),
    x('meiji-yasuda', 'Meiji Yasuda', '#00693e', 'meijiyasuda.co.jp', 'nissay', '明治安田生命|明治安田'),
    x('sumitomo-life', 'Sumitomo Life', '#00693e', 'sumitomolife.co.jp', 'nissay', '住友生命'),
    x('kampo', 'Japan Post Insurance', '#00693e', 'jp-life.japanpost.jp', 'nissay', 'かんぽ生命'),
    x('orix-life', 'ORIX Life', '#003b83', 'orixlife.co.jp', 'lifenet', 'オリックス生命'),
    x('metlife', 'MetLife', '#0090da', 'metlife.com metlife.co.jp', 'prudential', 'メットライフ'),
    x('prudential', 'Prudential', '#00629b', 'prudential.com prudential.co.jp', 'metlife', 'プルデンシャル生命'),
    x('hoken-madoguchi', 'Hoken no Madoguchi', '#f39800', 'hokennomadoguchi.com', 'lifenet', 'ほけんの窓口'),
    x('hoken-ichiba', 'Hoken Ichiba', '#e60012', 'hokende.com', 'hoken-madoguchi', '保険市場'),
    x('farmers', 'Farmers Insurance', '#003087', 'farmers.com', 'state-farm', 'Farmers Insurance', 1),
    x('nationwide', 'Nationwide', '#1c57a5', 'nationwide.com', 'state-farm', 'Nationwide Insurance|Nationwide is on your side', 1),
    x('travelers', 'Travelers', '#e31837', 'travelers.com', 'allstate', 'Travelers Insurance', 1),
    x('lemonade', 'Lemonade', '#ff0083', 'lemonade.com', 'geico', 'Lemonade Insurance|Lemonade renters', 1),
    x('root', 'Root Insurance', '#ff4a00', 'joinroot.com', 'progressive', 'Root Insurance', 1),
    x('the-general', 'The General', '#00693e', 'thegeneral.com', 'geico', 'The General Insurance', 1),
    x('the-zebra', 'The Zebra', '#1a1a1a', 'thezebra.com', 'geico', 'The Zebra', 1),
    x('policygenius', 'Policygenius', '#f7941d', 'policygenius.com', 'the-zebra'),
    x('ethos', 'Ethos', '#056257', 'ethoslife.com', 'policygenius', 'Ethos Life', 1),
    x('humana', 'Humana', '#4e8a00', 'humana.com', 'unitedhealthcare'),
    x('unitedhealthcare', 'UnitedHealthcare', '#002677', 'uhc.com', 'humana', 'United Healthcare'),
    x('cigna', 'Cigna', '#0170bc', 'cigna.com', 'unitedhealthcare'),
    x('aetna', 'Aetna', '#7d3f98', 'aetna.com', 'cigna'),
    x('blue-cross', 'Blue Cross Blue Shield', '#0072ce', 'bcbs.com', 'unitedhealthcare', 'BlueCross|Blue Cross')
  ]);

  // ---- software and services -------------------------------------------------------

  R.add('vpn', [
    x('cyberghost', 'CyberGhost', '#c9a100', 'cyberghostvpn.com', 'nordvpn'),
    x('pia', 'Private Internet Access', '#4bb543', 'privateinternetaccess.com', 'nordvpn'),
    x('mullvad', 'Mullvad', '#294d73', 'mullvad.net', 'proton-vpn'),
    x('ipvanish', 'IPVanish', '#6fbc1e', 'ipvanish.com', 'nordvpn'),
    x('tunnelbear', 'TunnelBear', '#f7b500', 'tunnelbear.com', 'nordvpn'),
    x('millenvpn', 'MillenVPN', '#00a0e9', 'millenvpn.jp', 'nordvpn', 'ミレンVPN')
  ]);

  R.add('mealkits', [
    x('oisix', 'Oisix', '#00913a', 'oisix.com', 'nosh', 'オイシックス|Kit Oisix'),
    x('nosh', 'nosh', '#f15a22', 'nosh.jp', 'oisix', 'ナッシュ', 1),
    x('yoshikei', 'Yoshikei', '#e60012', 'yoshikei-dvlp.co.jp', 'oisix', 'ヨシケイ'),
    x('watami', 'Watami no Takushoku', '#00913a', 'watami-takushoku.co.jp', 'yoshikei', 'ワタミの宅食'),
    x('base-food', 'BASE FOOD', '#1a1a1a', 'basefood.co.jp', 'nosh', 'ベースフード|ベースブレッド|BASE BREAD'),
    x('everyplate', 'EveryPlate', '#f58220', 'everyplate.com', 'hellofresh'),
    x('green-chef', 'Green Chef', '#00693e', 'greenchef.com', 'hellofresh'),
    x('sunbasket', 'Sunbasket', '#f58220', 'sunbasket.com', 'hellofresh'),
    x('dinnerly', 'Dinnerly', '#f7b500', 'dinnerly.com', 'everyplate'),
    x('cookunity', 'CookUnity', '#1a1a1a', 'cookunity.com', 'factor'),
    x('daily-harvest', 'Daily Harvest', '#1a1a1a', 'daily-harvest.com', 'factor'),
    x('marley-spoon', 'Marley Spoon', '#1a1a1a', 'marleyspoon.com', 'hellofresh')
  ]);

  R.add('mattress', [
    x('nectar', 'Nectar', '#2e3a8c', 'nectarsleep.com', 'casper', 'Nectar mattress|Nectar Sleep', 1),
    x('sleep-number', 'Sleep Number', '#00205b', 'sleepnumber.com', 'tempur'),
    x('helix', 'Helix', '#0b2545', 'helixsleep.com', 'casper', 'Helix mattress|Helix Sleep', 1),
    x('tuft-needle', 'Tuft & Needle', '#3d9b8f', 'tuftandneedle.com', 'casper', 'Tuft and Needle'),
    x('avocado', 'Avocado', '#00693e', 'avocadogreenmattress.com', 'saatva', 'Avocado mattress|Avocado Green', 1),
    x('dreamcloud', 'DreamCloud', '#1c2a5b', 'dreamcloudsleep.com', 'nectar'),
    x('brooklyn-bedding', 'Brooklyn Bedding', '#003b83', 'brooklynbedding.com', 'helix'),
    x('leesa', 'Leesa', '#1a1a1a', 'leesa.com', 'casper'),
    x('serta', 'Serta', '#00205b', 'serta.com', 'sealy'),
    x('sealy', 'Sealy', '#003b83', 'sealy.com', 'serta'),
    x('mattress-firm', 'Mattress Firm', '#d0202e', 'mattressfirm.com', 'sleep-number'),
    x('eight-sleep', 'Eight Sleep', '#1a1a1a', 'eightsleep.com', 'sleep-number'),
    x('airweave', 'airweave', '#00a0e9', 'airweave.jp airweave.com', 'nishikawa', 'エアウィーヴ'),
    x('nishikawa', 'Nishikawa', '#003b83', 'nishikawa1566.com', 'airweave', '西川 マットレス|nishikawa|西川AiR', 1),
    x('koala', 'Koala', '#4c9a2a', 'koala.com', 'emma', 'コアラマットレス|Koala mattress', 1),
    x('nell', 'NELL', '#1a1a1a', 'nell.life', 'koala', 'NELLマットレス', 1),
    x('simmons', 'Simmons', '#1a1a1a', 'simmons.com simmons.co.jp', 'serta', 'シモンズベッド', 1),
    x('france-bed', 'France Bed', '#003b83', 'francebed.co.jp', 'simmons', 'フランスベッド'),
    x('truesleeper', 'True Sleeper', '#003b83', 'shopjapan.co.jp', 'airweave', 'トゥルースリーパー|ショップジャパン')
  ]);

  R.add('sitebuilders', [
    x('bluehost', 'Bluehost', '#196bde', 'bluehost.com', 'hostinger'),
    x('hostinger', 'Hostinger', '#673de6', 'hostinger.com', 'bluehost'),
    x('hostgator', 'HostGator', '#d48a00', 'hostgator.com', 'bluehost'),
    x('namecheap', 'Namecheap', '#de3723', 'namecheap.com', 'godaddy'),
    x('siteground', 'SiteGround', '#4b3bab', 'siteground.com', 'bluehost'),
    x('ionos', 'IONOS', '#003d8f', 'ionos.com', 'godaddy'),
    x('strato', 'STRATO', '#e07000', 'strato.de strato.nl', 'ionos'),
    x('bigcommerce', 'BigCommerce', '#121118', 'bigcommerce.com', 'shopify'),
    x('framer', 'Framer', '#0055ff', 'framer.com', 'webflow', 'Framer sites', 1),
    x('jimdo', 'Jimdo', '#1a1a1a', 'jimdo.com', 'wix'),
    x('peraichi', 'Peraichi', '#00a0e9', 'peraichi.com', 'jimdo', 'ペライチ'),
    x('base-ec', 'BASE', '#1a1a1a', 'thebase.com thebase.in', 'stores-jp', 'BASE ネットショップ', 1),
    x('stores-jp', 'STORES', '#1a1a1a', 'stores.jp stores.fun', 'base-ec', 'STORES ネットショップ|STORES予約', 1),
    x('sakura-internet', 'Sakura Internet', '#e4007f', 'sakura.ad.jp sakura.ne.jp', 'conoha', 'さくらインターネット|さくらのクラウド|さくらのレンタルサーバ'),
    x('conoha', 'ConoHa', '#00a0e9', 'conoha.jp', 'xserver', 'ConoHa WING'),
    x('xserver', 'Xserver', '#0068b7', 'xserver.ne.jp', 'conoha', 'エックスサーバー'),
    x('lolipop', 'Lolipop', '#f39800', 'lolipop.jp', 'xserver', 'ロリポップ！'),
    x('onamae', 'Onamae.com', '#e60012', 'onamae.com', 'muumuu', 'お名前.com', 1),
    x('muumuu', 'MuuMuu Domain', '#d9608f', 'muumuu-domain.com', 'onamae', 'ムームードメイン')
  ]);

  R.add('dating', [
    x('pairs', 'Pairs', '#00a99d', 'pairs.lv', 'tapple', 'ペアーズ', 1),
    x('tapple', 'Tapple', '#ff5a79', 'tapple.me', 'pairs', 'タップル'),
    x('with-app', 'with', '#ff6f61', 'with.is', 'pairs', 'マッチングアプリwith', 1),
    x('omiai', 'Omiai', '#0091ea', 'omiai-jp.com', 'pairs', '', 1),
    x('zexy-enmusubi', 'Zexy Enmusubi', '#e4007f', 'zexy-enmusubi.net', 'pairs', 'ゼクシィ縁結び'),
    x('o-net', 'O-net', '#e4007f', 'onet.co.jp', 'partner-agent', 'オーネット'),
    x('partner-agent', 'Partner Agent', '#e4007f', 'p-a.jp', 'o-net', 'パートナーエージェント'),
    x('ibj', 'IBJ', '#003b83', 'ibjapan.com', 'o-net', 'IBJメンバーズ|日本結婚相談所連盟', 1),
    x('cmb', 'Coffee Meets Bagel', '#f26b3a', 'coffeemeetsbagel.com', 'hinge'),
    x('okcupid', 'OkCupid', '#0500be', 'okcupid.com', 'tinder'),
    x('pof', 'Plenty of Fish', '#1a1a1a', 'pof.com', 'okcupid', 'POF dating'),
    x('grindr', 'Grindr', '#c9a100', 'grindr.com', 'tinder'),
    x('badoo', 'Badoo', '#783bf9', 'badoo.com', 'tinder'),
    x('happn', 'happn', '#ff3464', 'happn.com', 'tinder'),
    x('ourtime', 'OurTime', '#00a3ad', 'ourtime.com', 'eharmony'),
    x('silversingles', 'SilverSingles', '#5f6b7a', 'silversingles.com', 'ourtime'),
    x('elite-singles', 'EliteSingles', '#003b83', 'elitesingles.com', 'eharmony'),
    x('zoosk', 'Zoosk', '#00a3e0', 'zoosk.com', 'match')
  ]);

  R.add('ai', [
    x('deepseek', 'DeepSeek', '#4d6bfe', 'deepseek.com', 'chatgpt'),
    x('mistral', 'Mistral AI', '#fa520f', 'mistral.ai', 'chatgpt', 'Mistral AI|Le Chat Mistral', 1),
    x('midjourney', 'Midjourney', '#1a1a1a', 'midjourney.com', 'chatgpt'),
    x('character-ai', 'Character.AI', '#1a1a1a', 'character.ai', 'chatgpt', 'Character AI'),
    x('cursor', 'Cursor', '#1a1a1a', 'cursor.com cursor.sh', 'claude', 'Cursor AI|Cursor editor', 1),
    x('meta-ai', 'Meta AI', '#0668e1', 'meta.ai', 'chatgpt', 'Meta AI', 1),
    x('jasper', 'Jasper', '#fa4028', 'jasper.ai', 'chatgpt', 'Jasper AI', 1),
    x('elevenlabs', 'ElevenLabs', '#1a1a1a', 'elevenlabs.io', 'chatgpt'),
    x('replit', 'Replit', '#f26207', 'replit.com', 'cursor'),
    x('manus', 'Manus', '#1a1a1a', 'manus.im', 'chatgpt', 'Manus AI', 1),
    x('genspark', 'Genspark', '#1a1a1a', 'genspark.ai', 'perplexity')
  ]);

  R.add('cloud', [
    x('linode', 'Akamai Cloud', '#00b159', 'linode.com akamai.com', 'digitalocean', 'Linode|Akamai'),
    x('heroku', 'Heroku', '#430098', 'heroku.com', 'vercel'),
    x('netlify', 'Netlify', '#00ad9f', 'netlify.com', 'vercel'),
    x('supabase', 'Supabase', '#2a9d6a', 'supabase.com', 'vercel')
  ]);

  R.add('worktools', [
    x('airtable', 'Airtable', '#1283da', 'airtable.com', 'notion'),
    x('smartsheet', 'Smartsheet', '#0e2947', 'smartsheet.com', 'monday'),
    x('basecamp', 'Basecamp', '#1d2d35', 'basecamp.com', 'asana'),
    x('miro', 'Miro', '#c9a100', 'miro.com', 'notion'),
    x('wrike', 'Wrike', '#08a652', 'wrike.com', 'asana'),
    x('evernote', 'Evernote', '#00a82d', 'evernote.com', 'notion'),
    x('todoist', 'Todoist', '#e44332', 'todoist.com', 'notion'),
    x('calendly', 'Calendly', '#006bff', 'calendly.com', 'zoom'),
    x('loom', 'Loom', '#625df5', 'loom.com', 'zoom', 'Loom video', 1),
    x('linear', 'Linear', '#5e6ad2', 'linear.app', 'jira', 'Linear app', 1),
    x('backlog', 'Backlog', '#2fa37a', 'backlog.com nulab.com', 'jira', 'Nulab', 1),
    x('chatwork', 'Chatwork', '#f03747', 'chatwork.com', 'slack', 'チャットワーク'),
    x('line-works', 'LINE WORKS', '#00a63a', 'line-works.com line.worksmobile.com', 'slack', 'LINE WORKS|ラインワークス', 1),
    x('ringcentral', 'RingCentral', '#ff7a00', 'ringcentral.com', 'zoom'),
    x('dropbox', 'Dropbox', '#0061ff', 'dropbox.com', 'box-cloud'),
    x('box-cloud', 'Box', '#0061d5', 'box.com', 'dropbox', 'Box cloud|Box AI', 1),
    x('google-workspace', 'Google Workspace', '#4285f4', 'workspace.google.com', 'teams', 'Google Workspace', 1)
  ]);

  // ---- beer, consoles, fitness, learning, razors ---------------------------------

  R.add('beer', [
    x('asahi', 'Asahi', '#00358e', 'asahibeer.co.jp asahibeer.com asahisuperdry.com', 'kirin', 'アサヒビール|スーパードライ|Asahi Super Dry|Asahi Beer|アサヒ生ビール', 1),
    x('kirin', 'Kirin', '#e60012', 'kirin.co.jp kirinholdings.com', 'asahi', 'キリンビール|一番搾り|Kirin Ichiban|午後の紅茶|本麒麟|氷結'),
    x('sapporo', 'Sapporo', '#a8842c', 'sapporobeer.jp sapporobeer.com', 'kirin', 'サッポロビール|黒ラベル|ヱビス|エビスビール|YEBISU', 1),
    x('suntory', 'Suntory', '#2f9bb8', 'suntory.co.jp suntory.com', 'kirin', 'サントリー|プレモル|プレミアム・モルツ|クラフトボス|伊右衛門|角ハイボール'),
    x('orion-beer', 'Orion Beer', '#0068b7', 'orionbeer.co.jp', 'asahi', 'オリオンビール', 1),
    x('yona-yona', 'Yona Yona Ale', '#f7b500', 'yohobrewing.com', 'kirin', 'よなよなエール|ヤッホーブルーイング'),
    x('michelob', 'Michelob ULTRA', '#003b83', 'michelobultra.com', 'coors', 'Michelob Ultra|Michelob'),
    x('busch', 'Busch', '#003b83', 'busch.com', 'miller-lite', 'Busch Light|Busch beer', 1),
    x('sam-adams', 'Samuel Adams', '#003b83', 'samueladams.com', 'blue-moon', 'Sam Adams'),
    x('blue-moon', 'Blue Moon', '#003b83', 'bluemoonbrewingcompany.com', 'sam-adams', 'Blue Moon Belgian|Blue Moon beer', 1),
    x('carlsberg', 'Carlsberg', '#00693e', 'carlsberg.com', 'heineken'),
    x('peroni', 'Peroni', '#003b83', 'peroni.com peroniitaly.com', 'stella', 'Peroni Nastro Azzurro'),
    x('dos-equis', 'Dos Equis', '#00693e', 'dosequis.com', 'corona'),
    x('white-claw', 'White Claw', '#1a1a1a', 'whiteclaw.com', 'truly'),
    x('truly', 'Truly', '#00a3e0', 'trulyhardseltzer.com', 'white-claw', 'Truly Hard Seltzer', 1),
    x('high-noon', 'High Noon', '#c9a100', 'highnoonspirits.com', 'white-claw', 'High Noon seltzer|High Noon Sun Sips', 1),
    x('athletic-brewing', 'Athletic Brewing', '#003b83', 'athleticbrewing.com', 'heineken')
  ]);

  R.add('gaming', [
    x('meta-quest', 'Meta Quest', '#0668e1', 'meta.com', 'playstation', 'Meta Quest|Quest 3', 1),
    x('gamestop', 'GameStop', '#e4002b', 'gamestop.com', 'steam'),
    x('geo', 'GEO', '#c9a100', 'geo-online.co.jp', 'gamestop', 'ゲオオンライン', 1)
  ]);

  R.add('fitness', [
    x('rizap', 'RIZAP', '#1a1a1a', 'rizap.jp', 'anytime', 'ライザップ'),
    x('chocozap', 'chocoZAP', '#c9a100', 'chocozap.jp', 'anytime', 'チョコザップ'),
    x('anytime', 'Anytime Fitness', '#6e2c91', 'anytimefitness.com anytimefitness.co.jp', 'chocozap', 'エニタイムフィットネス|エニタイム'),
    x('konami-sports', 'Konami Sports Club', '#e60012', 'konamisportsclub.jp', 'anytime', 'コナミスポーツ'),
    x('joyfit', 'JOYFIT', '#f39800', 'joyfit.jp', 'anytime', 'ジョイフィット'),
    x('curves', 'Curves', '#7b3fe4', 'curves.co.jp curves.com', 'chocozap', 'カーブス', 1),
    x('tipness', 'Tipness', '#e60012', 'tipness.co.jp', 'konami-sports', 'ティップネス'),
    x('central-sports', 'Central Sports', '#003b83', 'central.co.jp', 'konami-sports', 'セントラルスポーツ'),
    x('lava', 'LAVA', '#e4007f', 'yoga-lava.com', 'curves', 'ホットヨガスタジオLAVA|ホットヨガLAVA', 1),
    x('asken', 'Asken', '#6a9a1f', 'asken.jp', 'myfitnesspal', 'あすけん'),
    x('golds-gym', "Gold's Gym", '#c9a100', 'goldsgym.com goldsgym.jp', 'planet-fitness', 'Golds Gym|ゴールドジム'),
    x('equinox', 'Equinox', '#1a1a1a', 'equinox.com', 'peloton', 'Equinox gym|Equinox membership', 1),
    x('la-fitness', 'LA Fitness', '#003b83', 'lafitness.com', 'planet-fitness'),
    x('orangetheory', 'Orangetheory', '#f58220', 'orangetheory.com', 'peloton', 'Orangetheory Fitness'),
    x('crunch', 'Crunch Fitness', '#f15a22', 'crunch.com', 'planet-fitness', 'Crunch Fitness', 1),
    x('24-hour', '24 Hour Fitness', '#e4002b', '24hourfitness.com', 'la-fitness'),
    x('classpass', 'ClassPass', '#0055ff', 'classpass.com', 'equinox'),
    x('strava', 'Strava', '#fc4c02', 'strava.com', 'garmin'),
    x('fitbit', 'Fitbit', '#00b0b9', 'fitbit.com', 'garmin'),
    x('garmin', 'Garmin', '#1a1a1a', 'garmin.com garmin.co.jp', 'fitbit', 'ガーミン'),
    x('whoop', 'WHOOP', '#1a1a1a', 'whoop.com', 'oura'),
    x('oura', 'Oura', '#1a1a1a', 'ouraring.com', 'whoop', 'Oura Ring'),
    x('myfitnesspal', 'MyFitnessPal', '#0066ee', 'myfitnesspal.com', 'noom'),
    x('tonal', 'Tonal', '#1a1a1a', 'tonal.com', 'peloton', 'Tonal gym|Tonal trainer', 1),
    x('bowflex', 'Bowflex', '#e4002b', 'bowflex.com', 'peloton'),
    x('nordictrack', 'NordicTrack', '#1a1a1a', 'nordictrack.com', 'peloton'),
    x('hydrow', 'Hydrow', '#1a1a1a', 'hydrow.com', 'peloton')
  ]);

  R.add('learning', [
    x('dmm-eikaiwa', 'DMM Eikaiwa', '#1a1a1a', 'eikaiwa.dmm.com', 'rarejob', 'DMM英会話', 1),
    x('rarejob', 'RareJob', '#f39800', 'rarejob.com', 'dmm-eikaiwa', 'レアジョブ'),
    x('native-camp', 'NativeCamp', '#f7941d', 'nativecamp.net', 'dmm-eikaiwa', 'ネイティブキャンプ'),
    x('cambly', 'Cambly', '#d4a800', 'cambly.com', 'preply', 'キャンブリー'),
    x('study-sapuri', 'Study Sapuri', '#00a0e9', 'studysapuri.jp', 'shinkenzemi', 'スタディサプリ|スタサプ'),
    x('shinkenzemi', 'Shinkenzemi', '#e60012', 'benesse.co.jp benesse.ne.jp', 'study-sapuri', '進研ゼミ|こどもちゃれんじ|ベネッセ|Benesse'),
    x('z-kai', 'Z-kai', '#003b83', 'zkai.co.jp', 'shinkenzemi', 'Z会'),
    x('kumon', 'Kumon', '#4a9fc9', 'kumon.ne.jp kumon.com', 'shinkenzemi', '公文式|KUMON'),
    x('smile-zemi', 'Smile Zemi', '#00a0e9', 'smile-zemi.jp', 'shinkenzemi', 'スマイルゼミ'),
    x('toshin', 'Toshin', '#00913a', 'toshin.com', 'study-sapuri', '東進ハイスクール'),
    x('u-can', 'U-CAN', '#e60012', 'u-can.co.jp', 'study-sapuri', 'ユーキャン'),
    x('techacademy', 'TechAcademy', '#00a0e9', 'techacademy.jp', 'progate', 'テックアカデミー'),
    x('progate', 'Progate', '#2b546a', 'prog-8.com progate.com', 'techacademy', 'プロゲート'),
    x('berlitz', 'Berlitz', '#003b83', 'berlitz.com berlitz.co.jp', 'gaba', 'ベルリッツ'),
    x('gaba', 'Gaba', '#e60012', 'gaba.co.jp', 'berlitz', 'Gabaマンツーマン英会話|Gaba英会話', 1),
    x('ecc', 'ECC', '#e60012', 'ecc.jp ecc.co.jp', 'berlitz', 'ECC外語学院|ECCジュニア', 1),
    x('nova-eikaiwa', 'NOVA', '#e4007f', 'nova.co.jp', 'ecc', '駅前留学NOVA|NOVA英会話', 1),
    x('speak-app', 'Speak', '#1a1a1a', 'speak.com', 'duolingo', 'Speak app|スピークバディ', 1),
    x('edx', 'edX', '#02262b', 'edx.org', 'coursera'),
    x('udacity', 'Udacity', '#0296c2', 'udacity.com', 'coursera'),
    x('brilliant', 'Brilliant', '#1a1a1a', 'brilliant.org', 'duolingo', 'Brilliant.org', 1),
    x('codecademy', 'Codecademy', '#1f4056', 'codecademy.com', 'udemy'),
    x('datacamp', 'DataCamp', '#03a14a', 'datacamp.com', 'codecademy'),
    x('chegg', 'Chegg', '#eb7100', 'chegg.com', 'quizlet'),
    x('quizlet', 'Quizlet', '#4255ff', 'quizlet.com', 'chegg'),
    x('preply', 'Preply', '#e0508a', 'preply.com', 'italki'),
    x('italki', 'italki', '#ff4338', 'italki.com', 'preply'),
    x('abcmouse', 'ABCmouse', '#e4002b', 'abcmouse.com', 'duolingo'),
    x('outschool', 'Outschool', '#4b01d4', 'outschool.com', 'abcmouse'),
    x('snhu', 'SNHU', '#0a3370', 'snhu.edu', 'wgu', 'Southern New Hampshire University'),
    x('wgu', 'WGU', '#003057', 'wgu.edu', 'snhu', 'Western Governors University'),
    x('phoenix', 'University of Phoenix', '#e4002b', 'phoenix.edu', 'snhu')
  ]);

  R.add('razors', [
    x('schick', 'Schick', '#00693e', 'schick.com schick.jp', 'gillette', 'Schick Hydro|シック ハイドロ'),
    x('braun', 'Braun', '#1a1a1a', 'braun.com braun.jp', 'gillette', 'ブラウン シェーバー|Braun Series', 1),
    x('billie', 'Billie', '#d9608f', 'mybillie.com', 'harrys', 'Billie razor', 1),
    x('athena-club', 'Athena Club', '#8a74b8', 'athenaclub.com', 'billie'),
    x('kai', 'KAI', '#003b83', 'kai-group.com', 'schick', '貝印', 1)
  ]);
})(typeof globalThis !== 'undefined' ? globalThis : this);
