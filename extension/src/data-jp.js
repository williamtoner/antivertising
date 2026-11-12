/*
 * The long list, part four: brands from Japan, for every category.
 * Same one-row-per-brand format as data-more.js:
 *   x(id, name, colour, 'domain domain', archRivalId, 'alias|alias', strict)
 */
(function (root) {
  'use strict';

  var data = root.AV_DATA || require('./data.js');
  var R = data.rows;
  var x = R.x;

  // ---- soft drinks ---------------------------------------------------------

  R.add('soda', [
    x('dydo', 'DyDo', '#e60012', 'dydo.co.jp', 'ito-en', 'ダイドードリンコ|ダイドーブレンド|DyDo DRINCO'),
    x('pokka-sapporo', 'Pokka Sapporo', '#f8b500', 'pokkasapporo-fb.jp', 'ito-en', 'ポッカサッポロ|キレートレモン|ポッカレモン|じっくりコトコト'),
    x('sangaria', 'Sangaria', '#0068b7', 'sangaria.co.jp', 'dydo', 'サンガリア'),
    x('lupicia', 'LUPICIA', '#5a3a22', 'lupicia.com', 'ito-en', 'ルピシア'),
    x('ehime-inryo', 'POM Juice', '#f39800', 'ehime-inryo.co.jp', 'kagome', 'ポンジュース|えひめ飲料', 1),
    x('marusan-ai', 'Marusan-Ai', '#00913a', 'marusanai.co.jp', 'kikkoman', 'マルサンアイ|ひとつ上の豆乳'),
    x('premium-water', 'Premium Water', '#00a0e9', 'premium-water.net', 'cosmo-water', 'プレミアムウォーター', 1),
    x('cosmo-water', 'Cosmo Water', '#1d2088', 'cosmowater.com', 'premium-water', 'コスモウォーター'),
    x('aqua-clara', 'Aqua Clara', '#0099d9', 'aquaclara.co.jp', 'crecla', 'アクアクララ'),
    x('crecla', 'Crecla', '#00a7e1', 'crecla.jp', 'aqua-clara', 'クリクラ'),
    x('frecious', 'FRECIOUS', '#6cbb5a', 'frecious.jp', 'premium-water', 'フレシャス'),
    x('waterstand', 'Water Stand', '#00b2e3', 'waterstand.jp', 'premium-water', 'ウォータースタンド', 1),
    x('fukujuen', 'Fukujuen', '#00693e', 'fukujuen.com', 'ito-en', '福寿園'),
    x('pure-hawaiian', 'Pure Hawaiian', '#00a0e9', 'hawaiiwater.co.jp', 'cosmo-water', 'ピュアハワイアン|ハワイアンウォーター', 1)
  ]);

  // ---- fast food -----------------------------------------------------------

  R.add('fastfood', [
    x('nakau', 'Nakau', '#b5121b', 'nakau.co.jp', 'yoshinoya', 'なか卯'),
    x('kappa-sushi', 'Kappa Sushi', '#00a040', 'kappasushi.jp kappa-create.co.jp', 'sushiro', 'かっぱ寿司'),
    x('gin-no-sara', 'Gin no Sara', '#8a8d8f', 'ginsara.jp', 'kappa-sushi', '銀のさら'),
    x('gindaco', 'Gindaco', '#d7000f', 'gindaco.com', 'mcdonalds', '築地銀だこ|銀だこ'),
    x('tenya', 'Tenya', '#d9a400', 'tenya.co.jp', 'yoshinoya', '天丼てんや'),
    x('royal-host', 'Royal Host', '#e8380d', 'royalhost.jp', 'skylark', 'ロイヤルホスト'),
    x('joyfull', 'Joyfull', '#f08300', 'joyfull.co.jp', 'saizeriya', 'ファミリーレストラン ジョイフル|ジョイフルの'),
    x('bikkuri-donkey', 'Bikkuri Donkey', '#8b5a2b', 'bikkuri-donkey.com', 'skylark', 'びっくりドンキー'),
    x('cocos', "COCO'S", '#e60012', 'cocos-jpn.co.jp', 'skylark', 'ココスジャパン|ココスの|ファミレス ココス', 1),
    x('jolly-pasta', 'Jolly-Pasta', '#c8102e', 'jolly-pasta.co.jp', 'saizeriya', 'ジョリーパスタ'),
    x('bronco-billy', 'Bronco Billy', '#7b3f00', 'bronco.co.jp', 'ikinari-steak', 'ブロンコビリー'),
    x('ikinari-steak', 'Ikinari Steak', '#1a1a1a', 'ikinaristeak.com', 'pepper-lunch', 'いきなり!ステーキ|いきなりステーキ'),
    x('pepper-lunch', 'Pepper Lunch', '#e60012', 'pepperlunch.com', 'ikinari-steak', 'ペッパーランチ'),
    x('ippudo', 'Ippudo', '#b5121b', 'ippudo.com', 'ichiran', '一風堂'),
    x('ichiran', 'Ichiran', '#c8102e', 'ichiran.com', 'ippudo', '一蘭 とんこつ|天然とんこつラーメン専門店|一蘭公式'),
    x('tenkaippin', 'Tenkaippin', '#d7000f', 'tenkaippin.co.jp', 'ippudo', '天下一品 ラーメン|天下一品 こってり|天下一品のこってり|天一 こってり'),
    x('kourakuen', 'Kourakuen', '#e60012', 'kourakuen.co.jp', 'hidakaya', '幸楽苑'),
    x('hidakaya', 'Hidakaya', '#e60012', 'hiday.co.jp', 'gyoza-ohsho', '日高屋'),
    x('gyoza-ohsho', 'Gyoza no Ohsho', '#d7000f', 'ohsho.co.jp', 'osaka-ohsho', '餃子の王将'),
    x('osaka-ohsho', 'Osaka Ohsho', '#e60012', 'osaka-ohsho.com', 'gyoza-ohsho', '大阪王将'),
    x('torikizoku', 'Torikizoku', '#f5c400', 'torikizoku.co.jp', 'kushikatsu-tanaka', '鳥貴族'),
    x('kushikatsu-tanaka', 'Kushikatsu Tanaka', '#e8a400', 'kushi-tanaka.com', 'torikizoku', '串カツ田中'),
    x('yakiniku-king', 'Yakiniku King', '#c8102e', 'yakiniku-king.jp', 'gyukaku', '焼肉きんぐ'),
    x('yakiniku-like', 'Yakiniku Like', '#f08300', 'yakiniku-like.com', 'gyukaku', '焼肉ライク'),
    x('anrakutei', 'Anrakutei', '#b5121b', 'anrakutei.co.jp', 'gyukaku', '安楽亭'),
    x('jojoen', 'Jojoen', '#231815', 'jojoen.co.jp', 'gyukaku', '叙々苑'),
    x('kisoji', 'Kisoji', '#5b3a29', 'kisoji.co.jp', 'washoku-sato', '木曽路 しゃぶしゃぶ|しゃぶしゃぶ木曽路|木曽路の'),
    x('washoku-sato', 'Washoku Sato', '#00693e', 'sato-res.com', 'ootoya', '和食さと'),
    x('hotto-motto', 'Hotto Motto', '#e60012', 'hottomotto.com', 'hokka-hokka-tei', 'ほっともっと'),
    x('hokka-hokka-tei', 'Hokka Hokka Tei', '#f08300', 'hokkahokka-tei.com', 'hotto-motto', 'ほっかほっか亭'),
    x('origin-bento', 'Origin Bento', '#e8380d', 'toshu.co.jp', 'hotto-motto', 'オリジン弁当|キッチンオリジン'),
    x('katsuya', 'Katsuya', '#f5c400', 'arclandservice.co.jp', 'matsuya', 'とんかつ かつや|かつ丼 かつや|かつやの|からやま', 1),
    x('big-boy', 'Big Boy', '#e60012', 'bigboyjapan.co.jp', 'bikkuri-donkey', 'ビッグボーイ', 1)
  ]);

  // ---- coffee --------------------------------------------------------------

  R.add('coffee', [
    x('saint-marc', 'Saint Marc Cafe', '#6f4e37', 'saint-marc-hd.com', 'doutor', 'サンマルクカフェ|チョコクロ'),
    x('pronto', 'PRONTO', '#00704a', 'pronto.co.jp', 'doutor', 'プロント カフェ|PRONTO カフェ', 1),
    x('hoshino-coffee', 'Hoshino Coffee', '#4b2e1e', 'hoshinocoffee.com', 'komeda', '星乃珈琲店|星乃珈琲'),
    x('ogawa-coffee', 'Ogawa Coffee', '#3b2314', 'oc-ogawa.co.jp', 'key-coffee', '小川珈琲'),
    x('sawai-coffee', 'Sawai Coffee', '#5c3317', 'sawaicoffee.co.jp', 'ucc', '澤井珈琲'),
    x('postcoffee', 'PostCoffee', '#222222', 'postcoffee.co', 'blue-bottle', 'ポストコーヒー'),
    x('kalita', 'Kalita', '#c8102e', 'kalita.co.jp', 'hario', 'カリタ コーヒー|カリタ ドリッパー|Kalita ウェーブ'),
    x('hario', 'HARIO', '#d6001c', 'hario.co.jp hario.com', 'kalita', 'ハリオ V60|ハリオ ドリッパー|HARIO V60')
  ]);

  // ---- food delivery -------------------------------------------------------

  R.add('delivery', [
    x('gochikuru', 'Gochikuru', '#e60012', 'gochikuru.com', 'kurumesi', 'ごちクル'),
    x('kurumesi', 'Kurumesi Bento', '#e95513', 'kurumesi-bentou.com', 'gochikuru', 'くるめし弁当')
  ]);

  // ---- ride-hailing --------------------------------------------------------

  R.add('rides', [
    x('nearme', 'NearMe', '#00a0e9', 'nearme.jp', 'go-taxi', 'ニアミー'),
    x('nihon-kotsu', 'Nihon Kotsu', '#003f8e', 'nihon-kotsu.co.jp', 's-ride', '日本交通タクシー|日本交通株式会社|日本交通のタクシー'),
    x('km-taxi', 'km Taxi', '#00693e', 'km-group.co.jp', 'nihon-kotsu', '国際自動車|kmタクシー', 1),
    x('docomo-bikeshare', 'Docomo Bike Share', '#cc0033', 'docomo-cycle.jp', 'luup', 'ドコモ・バイクシェア|ドコモバイクシェア', 1),
    x('hello-cycling', 'HELLO CYCLING', '#f8b500', 'hellocycling.jp', 'luup', 'ハローサイクリング', 1),
    x('charichari', 'Charichari', '#e60012', 'charichari.bike', 'luup', 'チャリチャリ')
  ]);

  // ---- cars ----------------------------------------------------------------

  R.add('cars', [
    x('isuzu', 'Isuzu', '#e60012', 'isuzu.co.jp', 'hino', 'いすゞ'),
    x('hino', 'Hino', '#e60012', 'hino.co.jp', 'isuzu', '日野自動車|日野デュトロ|日野プロフィア'),
    x('yamaha-motor', 'Yamaha Motor', '#e60012', 'yamaha-motor.co.jp', 'honda', 'ヤマハ発動機|ヤマハ バイク|PAS 電動アシスト'),
    x('kawasaki-motors', 'Kawasaki', '#69be28', 'kawasaki-motors.com', 'yamaha-motor', 'カワサキモータース|カワサキ バイク|Kawasaki Ninja|カワサキ Ninja', 1),
    x('yokohama-tire', 'Yokohama Tire', '#e60012', 'y-yokohama.com', 'bridgestone', 'ヨコハマタイヤ|横浜ゴム|アイスガード|BluEarth'),
    x('dunlop', 'Dunlop', '#f5c400', 'tyre.dunlop.co.jp', 'bridgestone', 'ダンロップ|シンクロウェザー|ウインターマックス'),
    x('toyo-tires', 'Toyo Tires', '#00479d', 'toyotires.co.jp', 'yokohama-tire', 'トーヨータイヤ|プロクセス|オープンカントリー'),
    x('fujicorporation', 'Fuji Corporation', '#e60012', 'fujicorporation.com', 'autoway', 'フジ・コーポレーション|タイヤ&ホイール館フジ|フジコーポレーション', 1),
    x('autoway', 'AUTOWAY', '#e60012', 'autoway.jp', 'fujicorporation', 'オートウェイ'),
    x('tirehood', 'TIREHOOD', '#f08300', 'tire-hood.com', 'autoway', 'タイヤフッド'),
    x('taiyakan', 'Tire Kan', '#e60012', 'taiyakan.co.jp', 'autobacs', 'タイヤ館'),
    x('jms', 'Jms', '#e60012', 'jms-car.com', 'autobacs', 'ジェームス カー用品|ジェームス 車検', 1),
    x('upgarage', 'UP GARAGE', '#f5c400', 'upgarage.com', 'autobacs', 'アップガレージ'),
    x('carmate', 'CARMATE', '#e60012', 'carmate.co.jp', 'soft99', 'カーメイト'),
    x('soft99', 'SOFT99', '#f5c400', 'soft99.co.jp', 'carmate', 'ソフト99|ガラコ|フクピカ'),
    x('keeper', 'KeePer', '#00479d', 'keepercoating.jp', 'soft99', 'キーパーコーティング|KeePer技研|キーパーラボ|KeePer LABO', 1),
    x('kure', 'KURE', '#e60012', 'kure.com', 'soft99', '呉工業|KURE 5-56|クレ5-56', 1),
    x('comtec', 'COMTEC', '#00479d', 'e-comtec.co.jp', 'yupiteru', 'コムテック'),
    x('yupiteru', 'Yupiteru', '#e60012', 'yupiteru.co.jp', 'comtec', 'ユピテル'),
    x('cellstar', 'CELLSTAR', '#e60012', 'cellstar.co.jp', 'yupiteru', 'セルスター'),
    x('alpine', 'ALPINE', '#00479d', 'alpine.co.jp', 'pioneer-car', 'アルパイン ナビ|ALPINE ビッグX|アルパイン ビッグX|アルパインスタイル', 1),
    x('pioneer-car', 'Pioneer', '#e60012', 'jpn.pioneer', 'alpine', 'カロッツェリア|楽ナビ|サイバーナビ|パイオニア カーナビ', 1),
    x('wecars', 'WECARS', '#00a0e9', 'wecars.co.jp', 'gulliver', 'ウィーカーズ'),
    x('carseven', 'Carseven', '#e60012', 'carseven.co.jp', 'gulliver', 'カーセブン'),
    x('apple-kaitori', 'Apple Auto', '#e60012', 'applenet.co.jp', 'gulliver', 'アップル 車買取|車買取 アップル|車買取のアップル', 1),
    x('rabbit-kaitori', 'Rabbit', '#e60012', 'e-rabbit.jp', 'gulliver', 'ラビット 車買取|車買取 ラビット|ラビットの車買取', 1),
    x('carnext', 'Car Next', '#00913a', 'carnext.jp', 'mota', 'カーネクスト', 1),
    x('mota', 'MOTA', '#e60012', 'autoc-one.jp', 'navikuru', 'MOTA車買取|MOTA 車買取|モータ 車買取', 1),
    x('navikuru', 'Navikuru', '#f08300', 'navikuru.jp', 'mota', 'ナビクル'),
    x('ucarpac', 'Ucar Pac', '#00a0e9', 'ucarpac.com', 'mota', 'ユーカーパック'),
    x('rakuten-car', 'Rakuten Car', '#bf0000', 'car.rakuten.co.jp', 'carsensor', '楽天Car', 1),
    x('yanase', 'YANASE', '#1f2a44', 'yanase.co.jp', 'nextage', 'ヤナセ'),
    x('carmo-kun', 'Carmo-kun', '#00a0e9', 'carmo-kun.jp', 'kinto', 'カルモくん|定額カルモくん'),
    x('cosmo-mycar', 'Cosmo My Car Lease', '#00479d', 'cosmo-mycar.com', 'carmo-kun', 'コスモMyカーリース|コスモマイカーリース'),
    x('niconori', 'Niconori', '#f08300', 'niconori.jp', 'carmo-kun', 'ニコノリ'),
    x('holiday-shaken', 'Holiday Shaken', '#e60012', 'holiday-fc.com', 'kobac', 'ホリデー車検'),
    x('kobac', 'Kobac', '#e60012', 'kobac.co.jp', 'holiday-shaken', '車検のコバック|コバック 車検'),
    x('bike-o', 'Bike O', '#e60012', '8190.jp', 'red-baron', 'バイク王'),
    x('red-baron', 'Red Baron', '#e60012', 'redbaron.co.jp', 'bike-o', 'レッドバロン', 1),
    x('2rinkan', '2rinkan', '#e60012', '2rinkan.jp', 'naps', '2りんかん'),
    x('naps', 'NAPS', '#e60012', 'naps-jp.com', '2rinkan', 'ナップス バイク|ナップス バイク用品', 1),
    x('webike', 'Webike', '#e60012', 'webike.net', 'naps', 'ウェビック'),
    x('sellca', 'SellCa', '#e60012', 'sellca-sellcar.com', 'ucarpac', 'セルカ 車|セルカ オークション|SellCa 中古車'),
    x('orix-carlease', 'ORIX Car Lease', '#00479d', 'carlease-online.jp', 'carmo-kun', 'オリックスカーリース|オリックス カーリース', 1)
  ]);

  // ---- airlines ------------------------------------------------------------

  R.add('airlines', [
    x('airdo', 'AIRDO', '#00a0e9', 'airdo.jp', 'skymark', 'エア・ドゥ|エアドゥ'),
    x('solaseed', 'Solaseed Air', '#8fc31f', 'solaseedair.jp', 'starflyer', 'ソラシドエア'),
    x('fda', 'Fuji Dream Airlines', '#e60012', 'fujidream.co.jp', 'skymark', 'フジドリームエアラインズ'),
    x('ibex', 'IBEX Airlines', '#e4007f', 'ibexair.co.jp', 'airdo', 'IBEXエアラインズ|アイベックスエアラインズ'),
    x('toki-air', 'TOKI AIR', '#e60012', 'tokiair.com', 'fda', 'トキエア')
  ]);

  // ---- travel booking ------------------------------------------------------

  R.add('travel', [
    x('dormy-inn', 'Dormy Inn', '#003f8e', 'dormy-hotels.com', 'route-inn', 'ドーミーイン|共立リゾート'),
    x('route-inn', 'Route Inn', '#00693e', 'route-inn.co.jp', 'toyoko-inn', 'ルートイン'),
    x('super-hotel', 'Super Hotel', '#f8b500', 'superhotel.co.jp', 'toyoko-inn', 'スーパーホテル', 1),
    x('daiwa-roynet', 'Daiwa Roynet Hotels', '#003f8e', 'daiwaroynet.jp', 'mitsui-garden', 'ダイワロイネットホテル'),
    x('mitsui-garden', 'Mitsui Garden Hotels', '#00693e', 'gardenhotels.co.jp', 'daiwa-roynet', '三井ガーデンホテル', 1),
    x('richmond-hotel', 'Richmond Hotels', '#8b0000', 'richmondhotel.jp', 'daiwa-roynet', 'リッチモンドホテル', 1),
    x('sotetsu-hotels', 'Sotetsu Fresa Inn', '#0068b7', 'sotetsu-hotels.com', 'route-inn', '相鉄フレッサイン|相鉄ホテルズ'),
    x('tokyu-hotels', 'Tokyu Hotels', '#b8860b', 'tokyuhotels.co.jp', 'prince-hotels', '東急ホテルズ|東急ステイ|東急REIホテル'),
    x('prince-hotels', 'Prince Hotels', '#003f8e', 'princehotels.co.jp princehotels.com', 'tokyu-hotels', 'プリンスホテル'),
    x('okura-nikko', 'Okura Nikko Hotels', '#8b6f3e', 'okura-nikko.com okura.com', 'imperial-hotel', 'ホテルオークラ|オークラ ニッコー ホテルズ|ホテル日航|ニッコー・ホテルズ'),
    x('imperial-hotel', 'Imperial Hotel', '#8b0000', 'imperialhotel.co.jp', 'okura-nikko', '帝国ホテル', 1),
    x('new-otani', 'Hotel New Otani', '#003f8e', 'newotani.co.jp', 'imperial-hotel', 'ホテルニューオータニ|ニューオータニ'),
    x('hotel-monterey', 'Hotel Monterey', '#8b0000', 'hotelmonterey.co.jp', 'richmond-hotel', 'ホテルモントレ', 1),
    x('washington-hotel', 'Washington Hotel', '#003f8e', 'washington-hotels.jp gracery.com', 'richmond-hotel', 'ワシントンホテル|藤田観光|ホテルグレイスリー', 1),
    x('mystays', 'Hotel MyStays', '#0068b7', 'mystays.com iconia.co.jp', 'dormy-inn', 'マイステイズ|アイコニア・ホスピタリティ'),
    x('candeo', 'Candeo Hotels', '#1a1a1a', 'candeohotels.com', 'dormy-inn', 'カンデオホテルズ'),
    x('livemax', 'Hotel Livemax', '#e60012', 'hotel-livemax.com', 'super-hotel', 'ホテルリブマックス'),
    x('smile-hotel', 'Smile Hotel', '#f39800', 'smile-hotels.com', 'super-hotel', 'スマイルホテル', 1),
    x('via-inn', 'Via Inn', '#0068b7', 'viainn.com', 'route-inn', 'ヴィアイン'),
    x('keio-plaza', 'Keio Plaza Hotel', '#003f8e', 'keioplaza.co.jp', 'new-otani', '京王プラザホテル'),
    x('rihga-royal', 'RIHGA Royal Hotel', '#8b6f3e', 'rihga.co.jp', 'imperial-hotel', 'リーガロイヤルホテル'),
    x('hankyu-hanshin-hotels', 'Hankyu Hanshin Hotels', '#8b0000', 'hankyu-hotel.com', 'rihga-royal', '阪急阪神ホテルズ|阪急阪神第一ホテルグループ'),
    x('nishitetsu-hotels', 'Nishitetsu Hotels', '#0068b7', 'nnr-h.com', 'daiwa-roynet', '西鉄ホテルズ|ソラリア西鉄ホテル|西鉄イン'),
    x('henn-na-hotel', 'Henn na Hotel', '#00a0e9', 'hennnahotel.com', 'apa', '変なホテル'),
    x('ooedo-onsen', 'Ooedo Onsen Monogatari', '#8b0000', 'ooedoonsen.jp yukai-r.jp', 'itoen-hotels', '大江戸温泉物語|湯快リゾート'),
    x('itoen-hotels', 'Itoen Hotels', '#00693e', 'itoenhotel.com', 'ooedo-onsen', '伊東園ホテルズ|伊東園ホテル'),
    x('kamenoi-hotel', 'Kamenoi Hotel', '#0b3b5c', 'kamenoi-hotels.com', 'ooedo-onsen', '亀の井ホテル'),
    x('resorttrust', 'Resorttrust', '#8b6f3e', 'resorttrust.co.jp', 'hoshino', 'リゾートトラスト|エクシブ'),
    x('hawaiians', 'Spa Resort Hawaiians', '#e95513', 'hawaiians.co.jp', 'ooedo-onsen', 'スパリゾートハワイアンズ', 1),
    x('yukoyuko', 'Yukoyuko', '#e95513', 'yukoyuko.net', 'jalan', 'ゆこゆこ'),
    x('relux', 'Relux', '#1a1a1a', 'rlx.jp', 'ikyu'),
    x('rurubu-travel', 'Rurubu Travel', '#e60012', 'rurubu.travel rurubu.jp', 'jalan', 'るるぶトラベル|るるぶ'),
    x('nippon-travel', 'Nippon Travel Agency', '#e60012', 'nta.co.jp', 'jtb', '日本旅行の赤い風船|日本旅行 赤い風船|赤い風船|株式会社日本旅行', 1),
    x('knt', 'Kinki Nippon Tourist', '#00529b', 'knt.co.jp', 'jtb', '近畿日本ツーリスト|近ツリ'),
    x('yomiuri-ryoko', 'Yomiuri Travel', '#e60012', 'yomiuri-ryokou.co.jp', 'club-tourism', '読売旅行'),
    x('tobu-top-tours', 'Tobu Top Tours', '#0068b7', 'tobutoptours.co.jp', 'knt', '東武トップツアーズ'),
    x('tabikobo', 'Tabikobo', '#e95513', 'tabikobo.com', 'his', '旅工房'),
    x('newt', 'NEWT', '#ff3c5f', 'newt.net', 'his', 'NEWT（ニュート）|海外旅行アプリNEWT|令和トラベル', 1),
    x('travelko', 'Travelko', '#f39800', 'tour.ne.jp', 'skyscanner', 'Travelko|旅行比較サイト「トラベルコ」|トラベルコ 比較', 1),
    x('skyticket', 'skyticket', '#00a0e9', 'skyticket.jp', 'airtrip', 'スカイチケット'),
    x('sakura-travel', 'Sakura Travel', '#e4007f', 'sakuratravel.jp', 'airtrip', 'さくらトラベル', 1),
    x('asoview', 'Asoview', '#f39800', 'asoview.com', 'jalan', 'アソビュー'),
    x('activity-japan', 'Activity Japan', '#00a0e9', 'activityjapan.com', 'asoview', 'アクティビティジャパン', 1),
    x('veltra', 'VELTRA', '#0b3b8c', 'veltra.com', 'klook'),
    x('willer', 'WILLER', '#e4007f', 'willer.co.jp', 'kosokubus', 'ウィラートラベル|WILLER TRAVEL|WILLER EXPRESS|ウィラーエクスプレス'),
    x('kosokubus', 'Kosokubus.com', '#0068b7', 'kosokubus.com', 'willer', '高速バスドットコム', 1),
    x('bushikaku', 'Bus Hikaku Navi', '#f39800', 'bushikaku.net', 'kosokubus', 'バス比較なび'),
    x('hafh', 'HafH', '#e4007f', 'hafh.com', 'airbnb'),
    x('jr-west', 'JR West', '#0072bc', 'westjr.co.jp jr-odekake.net', 'jr-central', 'JR西日本|JRおでかけネット|e5489|ICOCA', 1),
    x('jr-kyushu', 'JR Kyushu', '#e60012', 'jrkyushu.co.jp', 'jr-west', 'JR九州', 1),
    x('jr-hokkaido', 'JR Hokkaido', '#7ac143', 'jrhokkaido.co.jp', 'jr-east', 'JR北海道', 1),
    x('jr-shikoku', 'JR Shikoku', '#00a0e9', 'jr-shikoku.co.jp', 'jr-west', 'JR四国', 1),
    x('odakyu', 'Odakyu', '#0068b7', 'odakyu.jp', 'tobu', '小田急電鉄|ロマンスカー', 1),
    x('tobu', 'Tobu Railway', '#003f8e', 'tobu.co.jp', 'odakyu', '東武鉄道|スペーシアX', 1),
    x('seibu', 'Seibu Railway', '#0068b7', 'seiburailway.jp', 'tobu', '西武鉄道'),
    x('keio', 'Keio', '#dd0077', 'keio.co.jp', 'odakyu', '京王電鉄', 1),
    x('tokyu', 'Tokyu', '#e60012', 'tokyu.co.jp', 'odakyu', '東急電鉄', 1),
    x('keikyu', 'Keikyu', '#e60012', 'keikyu.co.jp', 'keisei', '京急電鉄|京浜急行'),
    x('keisei', 'Keisei', '#0068b7', 'keisei.co.jp', 'keikyu', '京成電鉄|スカイライナー'),
    x('tokyo-metro', 'Tokyo Metro', '#149dd3', 'tokyometro.jp', 'jr-east', 'Tokyo Metro|東京メトロ24時間券|東京メトロmy!アプリ', 1),
    x('kintetsu', 'Kintetsu', '#e60012', 'kintetsu.co.jp', 'jr-west', '近鉄電車|近畿日本鉄道|近鉄特急', 1),
    x('hankyu', 'Hankyu', '#7b2d26', 'hankyu.co.jp', 'keihan', '阪急電鉄|阪急電車', 1),
    x('nankai', 'Nankai', '#0068b7', 'nankai.co.jp', 'kintetsu', '南海電鉄|南海電気鉄道|ラピート', 1),
    x('keihan', 'Keihan', '#00693e', 'keihan.co.jp', 'hankyu', '京阪電車|京阪電気鉄道', 1),
    x('meitetsu', 'Meitetsu', '#e60012', 'meitetsu.co.jp', 'kintetsu', '名古屋鉄道|名鉄電車|ミュースカイ', 1),
    x('nishitetsu', 'Nishitetsu', '#0068b7', 'nishitetsu.jp', 'jr-kyushu', '西鉄電車|西日本鉄道|西鉄バス', 1),
    x('fujiq', 'Fuji-Q Highland', '#e60012', 'fujiq.jp', 'nagashima', '富士急ハイランド'),
    x('huis-ten-bosch', 'Huis Ten Bosch', '#8b0000', 'huistenbosch.co.jp', 'usj', 'ハウステンボス'),
    x('nagashima', 'Nagashima Resort', '#0068b7', 'nagashima-onsen.co.jp', 'fujiq', 'ナガシマスパーランド|ナガシマリゾート|なばなの里'),
    x('yomiuriland', 'Yomiuriland', '#e95513', 'yomiuriland.com', 'fujiq', 'よみうりランド'),
    x('puroland', 'Sanrio Puroland', '#e4007f', 'puroland.jp', 'disney-parks', 'サンリオピューロランド|ピューロランド'),
    x('legoland-japan', 'LEGOLAND Japan', '#e3000b', 'legoland.jp', 'usj', 'レゴランド', 1),
    x('ghibli-park', 'Ghibli Park', '#00693e', 'ghibli-park.jp', 'disney-parks', 'ジブリパーク'),
    x('tokyo-dome-city', 'Tokyo Dome City', '#e60012', 'tokyo-dome.co.jp', 'yomiuriland', '東京ドームシティ'),
    x('seibuen', 'Seibuen Amusement Park', '#e95513', 'seibu-leisure.co.jp', 'yomiuriland', '西武園ゆうえんち'),
    x('hirakata-park', 'Hirakata Park', '#e60012', 'hirakatapark.co.jp', 'usj', 'ひらかたパーク|ひらパー'),
    x('suzuka-circuit', 'Suzuka Circuit', '#e60012', 'suzukacircuit.jp', 'nagashima', '鈴鹿サーキット'),
    x('shima-spain-mura', 'Shima Spain Village', '#f8b500', 'parque-net.com', 'nagashima', '志摩スペイン村'),
    x('kamogawa-seaworld', 'Kamogawa Sea World', '#0068b7', 'kamogawa-seaworld.jp', 'hakkeijima', '鴨川シーワールド'),
    x('hakkeijima', 'Yokohama Hakkeijima Sea Paradise', '#00a0e9', 'seaparadise.co.jp', 'kamogawa-seaworld', '八景島シーパラダイス', 1),
    x('kaiyukan', 'Kaiyukan', '#0068b7', 'kaiyukan.com', 'usj', '海遊館'),
    x('teamlab', 'teamLab', '#1a1a1a', 'teamlab.art', 'ghibli-park', 'チームラボ'),
    x('kidzania', 'KidZania', '#e60012', 'kidzania.jp', 'puroland', 'キッザニア'),
    x('asuka-cruise', 'Asuka Cruise', '#003f8e', 'asukacruise.co.jp', 'best1cruise', '飛鳥クルーズ|飛鳥II|飛鳥Ⅲ'),
    x('best1cruise', 'Best One Cruise', '#0068b7', 'best1cruise.com', 'asuka-cruise', 'ベストワンクルーズ')
  ]);

  // ---- phones --------------------------------------------------------------

  R.add('phones', [
    x('fcnt', 'FCNT', '#e60012', 'fcnt.com', 'xperia', 'arrows We|arrows Alpha|らくらくスマートフォン|らくらくホン'),
    x('kyocera', 'Kyocera', '#e60012', 'kyocera.co.jp', 'fcnt', '京セラ|TORQUE G06|京セラ TORQUE|かんたんスマホ'),
    x('iosys', 'IOSYS', '#e60012', 'iosys.co.jp', 'janpara', 'イオシス'),
    x('janpara', 'Janpara', '#f08300', 'janpara.co.jp', 'iosys', 'じゃんぱら'),
    x('nicosuma', 'Nicosuma', '#00a0e9', 'nicosuma.com', 'iosys', 'にこスマ'),
    x('musbi', 'Musbi', '#00913a', 'musbi.net', 'iosys', 'ムスビー')
  ]);

  // ---- mobile networks -----------------------------------------------------

  R.add('carriers', [
    x('flets', "FLET'S Hikari", '#0068b7', 'flets.com flets-w.com ntt-east.co.jp ntt-west.co.jp', 'nuro', 'フレッツ光|フレッツ 光|NTT東日本|NTT西日本'),
    x('biglobe', 'BIGLOBE', '#ff7f00', 'biglobe.ne.jp', 'so-net', 'ビッグローブ'),
    x('so-net', 'So-net', '#e60012', 'so-net.ne.jp', 'biglobe', 'So-net光|ソネット光|ソニーネットワークコミュニケーションズ'),
    x('nifty', '@nifty', '#ffcc00', 'nifty.com', 'biglobe', '@nifty光|ニフティ光|@nifty|ニフティ株式会社', 1),
    x('ocn', 'OCN', '#0068b7', 'ocn.ne.jp', 'biglobe', 'OCN光|OCN モバイル ONE|OCNモバイル|OCNインターネット', 1),
    x('eo-hikari', 'eo Hikari', '#e4007f', 'eonet.jp', 'nuro', 'eo光|オプテージ'),
    x('commufa', 'Commufa Hikari', '#e95513', 'commufa.jp', 'flets', 'コミュファ光|コミュファ'),
    x('pikara', 'Pikara Hikari', '#f39800', 'pikara.jp', 'flets', 'ピカラ光'),
    x('mega-egg', 'MEGA EGG', '#e60012', 'megaegg.jp', 'flets', 'メガ・エッグ|メガエッグ'),
    x('bbiq', 'BBIQ', '#00a0e9', 'bbiq.jp', 'flets', 'ビビック光|BBIQ光'),
    x('jcom', 'J:COM', '#e60012', 'jcom.co.jp', 'flets', 'ジェイコム'),
    x('itscom', 'iTSCOM', '#e60012', 'itscom.co.jp', 'jcom', 'イッツコム|イッツ・コミュニケーションズ'),
    x('gmo-tokutoku', 'GMO Tokutoku BB', '#005bac', 'gmobb.jp', 'biglobe', 'GMOとくとくBB|とくとくBB'),
    x('broad-wimax', 'Broad WiMAX', '#00a0e9', 'wimax-broad.jp', 'uq-mobile', 'ブロードワイマックス'),
    x('enhikari', 'en Hikari', '#00a651', 'enhikari.jp', 'gmo-tokutoku', 'enひかり', 1),
    x('excite-bb', 'Excite', '#e60012', 'excite.co.jp', 'biglobe', 'エキサイトモバイル|excite MEC光|エキサイト光|エキサイトMEC光', 1),
    x('dti', 'DTI', '#0068b7', 'dream.jp', 'so-net', 'DTI光|DTI SIM|DTI WiMAX', 1),
    x('asahi-net', 'ASAHI Net', '#e60012', 'asahi-net.jp asahi-net.or.jp', 'so-net', 'ASAHIネット|朝日ネット'),
    x('hi-ho', 'hi-ho', '#f39800', 'hi-ho.jp hi-ho.ne.jp', 'so-net', 'hi-ho ひかり|hi-hoひかり', 1),
    x('t-com', '@T COM', '#0068b7', 't-com.ne.jp', 'so-net', '@T COM|アットティーコム', 1),
    x('libmo', 'LIBMO', '#f39800', 'libmo.jp', 'mineo'),
    x('his-mobile', 'HIS Mobile', '#0068b7', 'his-mobile.com', 'iijmio', 'HISモバイル'),
    x('aeon-mobile', 'AEON Mobile', '#b60081', 'aeonmobile.jp', 'mineo', 'イオンモバイル', 1),
    x('yu-mobile', 'y.u mobile', '#00b2a9', 'yumobile.jp', 'mineo', 'y.u mobile|ワイユーモバイル', 1),
    x('nihon-tsushin', 'Nihon Tsushin SIM', '#0068b7', 'nihontsushin.com', 'iijmio', '日本通信SIM'),
    x('linksmate', 'LinksMate', '#f39800', 'linksmate.jp', 'mineo', 'リンクスメイト'),
    x('qt-mobile', 'QTmobile', '#00a0e9', 'qtmobile.jp', 'mineo', 'QTモバイル'),
    x('tone-mobile', 'TONE mobile', '#00a040', 'tone.ne.jp', 'aeon-mobile', 'トーンモバイル', 1),
    x('global-wifi', 'Global WiFi', '#0068b7', 'townwifi.com', 'imoto-wifi', 'グローバルWiFi', 1),
    x('imoto-wifi', 'Imoto no WiFi', '#ffe100', 'imotonowifi.jp', 'global-wifi', 'イモトのWiFi'),
    x('mugen-wifi', 'Mugen WiFi', '#e60012', 'mugen-wifi.com', 'imoto-wifi', 'ムゲンWiFi')
  ]);

  // ---- streaming -----------------------------------------------------------

  R.add('streaming', [
    x('hikari-tv', 'Hikari TV', '#00a0e9', 'hikaritv.net', 'u-next', 'ひかりTV'),
    x('skyperfectv', 'SKY PerfecTV!', '#0068b7', 'skyperfectv.co.jp', 'wowow', 'スカパー'),
    x('jsports', 'J SPORTS', '#003f8e', 'jsports.co.jp', 'dazn', 'Jスポーツ|J SPORTSオンデマンド'),
    x('bandai-channel', 'Bandai Channel', '#e60012', 'b-ch.com', 'd-anime', 'バンダイチャンネル'),
    x('rakuten-tv', 'Rakuten TV', '#bf0000', 'tv.rakuten.co.jp', 'u-next', '楽天TV|Rakuten TV', 1),
    x('music-jp', 'music.jp', '#e4007f', 'music.jp music-book.jp', 'u-next', 'music.jp', 1),
    x('video-market', 'Video Market', '#e60012', 'videomarket.jp', 'u-next', 'ビデオマーケット', 1),
    x('nhk-ondemand', 'NHK On Demand', '#0068b7', 'nhk-ondemand.jp', 'tver', 'NHKオンデマンド', 1),
    x('pococha', 'Pococha', '#00c4cc', 'pococha.com', 'twitcasting', 'ポコチャ'),
    x('twitcasting', 'TwitCasting', '#1e90ff', 'twitcasting.tv', 'pococha', 'ツイキャス'),
    x('iriam', 'IRIAM', '#1a1a1a', 'iriam.com', 'pococha', '', 1),
    x('openrec', 'OPENREC.tv', '#e60012', 'openrec.tv', 'twitch', 'オープンレック')
  ]);

  // ---- music streaming -----------------------------------------------------

  R.add('music', [
    x('rakuten-music', 'Rakuten Music', '#bf0000', 'music.rakuten.co.jp', 'line-music', '楽天ミュージック|Rakuten Music', 1),
    x('mora', 'mora', '#e60012', 'mora.jp', 'recochoku', 'mora qualitas|mora ハイレゾ|音楽ダウンロード mora', 1),
    x('recochoku', 'RecoChoku', '#e60012', 'recochoku.jp', 'mora', 'レコチョク'),
    x('ototoy', 'OTOTOY', '#1a1a1a', 'ototoy.jp', 'mora'),
    x('usen', 'USEN', '#e60012', 'usen.com', 'awa', 'USEN MUSIC|ユーセン'),
    x('joysound', 'JOYSOUND', '#e60012', 'joysound.com', 'dam', 'ジョイサウンド'),
    x('dam', 'DAM', '#e60012', 'clubdam.com', 'joysound', 'カラオケDAM|第一興商|DAM★とも', 1),
    x('radiko', 'radiko', '#00a7e9', 'radiko.jp', 'spotify', 'ラジコプレミアム|radikoプレミアム'),
    x('tunecore-japan', 'TuneCore Japan', '#1a1a1a', 'tunecore.co.jp', 'ototoy', 'チューンコア', 1)
  ]);

  // ---- online shopping -----------------------------------------------------

  R.add('shopping', [
    x('tsuruha', 'Tsuruha Drug', '#e60012', 'tsuruha.co.jp', 'welcia', 'ツルハドラッグ|ツルハグループ'),
    x('sugi-pharmacy', 'Sugi Pharmacy', '#e4007f', 'sugi-net.jp', 'welcia', 'スギ薬局|スギドラッグ'),
    x('sundrug', 'Sundrug', '#e60012', 'sundrug.co.jp', 'matsukiyo', 'サンドラッグ'),
    x('cosmos-drug', 'Cosmos Pharmaceutical', '#e4007f', 'cosmospc.co.jp', 'welcia', 'コスモス薬品|ドラッグコスモス|ディスカウントドラッグコスモス'),
    x('kusuri-aoki', 'Kusuri no Aoki', '#00913a', 'kusuri-aoki.co.jp', 'tsuruha', 'クスリのアオキ'),
    x('create-sd', 'Create SD', '#e60012', 'create-sd.co.jp', 'welcia', 'クリエイトSD|クリエイトエス・ディー'),
    x('kawachi', 'Kawachi', '#e60012', 'cawachi.co.jp', 'cosmos-drug', 'カワチ薬品'),
    x('tomods', "Tomod's", '#00a0e9', 'tomods.jp', 'matsukiyo', 'トモズ', 1),
    x('daikoku-drug', 'Daikoku Drug', '#e60012', 'daikokudrug.com', 'sundrug', 'ダイコクドラッグ'),
    x('kirindo', 'Kirindo', '#f5a200', 'kirindo.co.jp', 'sugi-pharmacy', 'キリン堂'),
    x('kokumin', 'Kokumin', '#e60012', 'kokumin.co.jp', 'matsukiyo', 'コクミンドラッグ|コクミン薬局'),
    x('satudora', 'Satudora', '#e60012', 'satudora.jp', 'tsuruha', 'サツドラ|サッポロドラッグストアー'),
    x('genky', 'Genky', '#e60012', 'genky.co.jp', 'cosmos-drug', 'ゲンキー'),
    x('ainz-tulpe', 'Ainz & Tulpe', '#e4007f', 'ainz-tulpe.jp', 'matsukiyo', 'アインズ&トルペ|アインズトルペ'),
    x('isetan-mitsukoshi', 'Isetan Mitsukoshi', '#1a1a1a', 'mistore.jp imhds.co.jp', 'takashimaya', '三越伊勢丹|伊勢丹|日本橋三越|銀座三越'),
    x('takashimaya', 'Takashimaya', '#b5121b', 'takashimaya.co.jp', 'isetan-mitsukoshi', '高島屋|髙島屋'),
    x('daimaru-matsuzakaya', 'Daimaru Matsuzakaya', '#00693e', 'daimaru-matsuzakaya.jp daimaru.co.jp matsuzakaya.co.jp', 'takashimaya', '大丸松坂屋|松坂屋|大丸東京|大丸梅田|大丸札幌'),
    x('hankyu-dept', 'Hankyu Department Store', '#7b1e2b', 'hankyu-dept.co.jp hanshin-dept.jp', 'takashimaya', '阪急百貨店|阪急うめだ本店|阪神百貨店'),
    x('sogo-seibu', 'Sogo & Seibu', '#00479d', 'sogo-seibu.jp', 'isetan-mitsukoshi', 'そごう・西武|西武・そごう|西武池袋本店|そごう横浜'),
    x('kintetsu-dept', 'Kintetsu Department Store', '#b5121b', 'd-kintetsu.co.jp', 'hankyu-dept', '近鉄百貨店|あべのハルカス近鉄本店'),
    x('tokyu-dept', 'Tokyu Department Store', '#e60012', 'tokyu-dept.co.jp', 'isetan-mitsukoshi', '東急百貨店'),
    x('odakyu-dept', 'Odakyu Department Store', '#00479d', 'odakyu-dept.co.jp', 'isetan-mitsukoshi', '小田急百貨店'),
    x('keio-dept', 'Keio Department Store', '#e4007f', 'keionet.com', 'odakyu-dept', '京王百貨店'),
    x('marui', 'Marui', '#e60012', '0101.co.jp', 'parco', 'マルイ ウェブチャネル|マルイの|丸井グループ|OIOI', 1),
    x('parco', 'PARCO', '#1a1a1a', 'parco.jp parco.co.jp', 'lumine', '渋谷PARCO|パルコ公式|PARCO ONLINE STORE|池袋PARCO', 1),
    x('lumine', 'LUMINE', '#00a0e9', 'lumine.ne.jp', 'parco', 'ルミネカード|ルミネ新宿|ルミネエスト|アイルミネ|ルミネ10%オフ', 1),
    x('lalaport', 'LaLaport', '#e4007f', 'mitsui-shopping-park.com', 'premium-outlets', 'ららぽーと|三井ショッピングパーク|三井アウトレットパーク|ラゾーナ川崎'),
    x('premium-outlets', 'Premium Outlets', '#1a1a1a', 'premiumoutlets.co.jp', 'lalaport', 'プレミアム・アウトレット|プレミアムアウトレット', 1),
    x('seria', 'Seria', '#e4007f', 'seria-group.com', 'daiso', 'セリア|Seria 100均', 1),
    x('can-do', 'Can Do', '#f08300', 'cando-web.co.jp', 'daiso', 'キャンドゥ', 1),
    x('3coins', '3COINS', '#00693e', '3coins.jp', 'daiso', 'スリーコインズ|スリコ'),
    x('village-vanguard', 'Village Vanguard', '#f5c400', 'village-v.co.jp', 'donki', 'ヴィレッジヴァンガード|ヴィレヴァン', 1),
    x('mr-max', 'MrMax', '#e60012', 'mrmax.co.jp', 'donki', 'ミスターマックス'),
    x('dinos', 'dinos', '#e60012', 'dinos.co.jp', 'belle-maison', 'ディノス', 1),
    x('cecile', 'Cecile', '#e4007f', 'cecile.co.jp', 'nissen', 'セシール', 1),
    x('felissimo', 'Felissimo', '#e60012', 'felissimo.co.jp', 'belle-maison', 'フェリシモ'),
    x('belluna', 'Belluna', '#e4007f', 'belluna.jp', 'nissen', 'ベルーナ'),
    x('cataloghouse', 'Catalog House', '#e60012', 'cataloghouse.co.jp', 'japanet', '通販生活|カタログハウス', 1),
    x('hokuoh-kurashi', 'Hokuoh Kurashi', '#8a7f72', 'hokuohkurashi.com', 'felissimo', '北欧、暮らしの道具店|北欧暮らしの道具店'),
    x('nakagawa-masashichi', 'Nakagawa Masashichi', '#3b2314', 'nakagawa-masashichi.jp', 'hokuoh-kurashi', '中川政七商店'),
    x('creema', 'Creema', '#e8380d', 'creema.jp', 'minne', 'クリーマ ハンドメイド|Creema ハンドメイド'),
    x('minne', 'minne', '#f08300', 'minne.com', 'creema', 'ミンネ ハンドメイド|minne ハンドメイド', 1),
    x('makuake', 'Makuake', '#e60012', 'makuake.com', 'rakuten', 'マクアケ'),
    x('jimoty', 'Jimoty', '#00a0e9', 'jmty.jp', 'mercari', 'ジモティー'),
    x('2nd-street', '2nd STREET', '#1a1a1a', '2ndstreet.jp', 'mercari', 'セカンドストリート|セカスト', 1),
    x('bookoff', 'BOOKOFF', '#f5c400', 'bookoff.co.jp bookoffonline.co.jp', 'mercari', 'ブックオフ'),
    x('hardoff', 'HARD OFF', '#00913a', 'hardoff.co.jp', '2nd-street', 'ハードオフ|オフハウス', 1),
    x('treasure-factory', 'Treasure Factory', '#e60012', 'treasure-f.com', '2nd-street', 'トレジャーファクトリー|トレファク'),
    x('snkrdunk', 'SNKRDUNK', '#1a1a1a', 'snkrdunk.com', 'mercari', 'スニーカーダンク|スニダン'),
    x('komehyo', 'KOMEHYO', '#b5121b', 'komehyo.co.jp komehyo.jp', 'daikokuya', 'コメ兵'),
    x('daikokuya', 'Daikokuya', '#f08300', 'e-daikoku.com', 'komehyo', '大黒屋 買取|質屋 大黒屋|大黒屋 ブランド', 1),
    x('nanboya', 'Nanboya', '#1f2a44', 'nanboya.com', 'komehyo', 'なんぼや'),
    x('otakaraya', 'Otakaraya', '#e60012', 'otakaraya.jp', 'buysell', 'おたからや'),
    x('buysell', 'BuySell', '#00479d', 'buysell-kaitori.com', 'otakaraya', 'バイセル'),
    x('fuku-chan', 'Fuku-chan', '#e60012', 'fuku-chan.info', 'buysell', '買取 福ちゃん|福ちゃん 買取|福ちゃんの出張買取', 1),
    x('kaitori-daikichi', 'Kaitori Daikichi', '#e60012', 'kaitori-daikichi.jp', 'otakaraya', '買取大吉'),
    x('takeya', 'Takeya', '#4b1e78', 'takeya.co.jp', 'donki', '多慶屋'),
    x('plaza-style', 'PLAZA', '#e4007f', 'plazastyle.com', 'village-vanguard', 'PLAZA プラザ|プラザ ライフスタイルストア|PLAZA オンラインストア', 1),
    x('shaddy', 'Shaddy', '#e60012', 'shaddy.jp', 'ringbell', 'シャディ'),
    x('ringbell', 'RINGBELL', '#b5121b', 'ringbell.co.jp', 'shaddy', 'リンベル'),
    x('giftmall', 'Giftmall', '#e8380d', 'giftmall.co.jp', 'anny-gift', 'ギフトモール'),
    x('anny-gift', 'Anny', '#e4007f', 'anny.gift', 'giftmall', 'Anny ギフト|アニー ギフト|Anny（アニー）', 1),
    x('tanp', 'TANP', '#f08300', 'tanp.jp', 'giftmall', 'タンプ ギフト|TANP ギフト', 1)
  ]);

  // ---- fashion -------------------------------------------------------------

  R.add('fashion', [
    x('honeys', 'Honeys', '#e4007f', 'honeys.co.jp honeys-onlineshop.com', 'shimamura', 'ハニーズ', 1),
    x('adastria', 'and ST', '#1a1a1a', 'dot-st.com adastria.co.jp', 'stripe-club', 'アダストリア|ドットエスティ|アンドエスティ|グローバルワーク|ローリーズファーム|ニコアンド', 1),
    x('stripe-club', 'STRIPE CLUB', '#00693e', 'stripe-club.com', 'adastria', 'ストライプクラブ|アースミュージック&エコロジー|earth music&ecology', 1),
    x('pal-closet', 'PAL CLOSET', '#1a1a1a', 'palcloset.jp', 'adastria', 'パルクローゼット|チャオパニック|Kastane'),
    x('baycrews', 'BAYCREWS', '#1a1a1a', 'baycrews.jp', 'united-arrows', 'ベイクルーズ|JOURNAL STANDARD|ジャーナルスタンダード|Spick & Span'),
    x('ships', 'SHIPS', '#1f2a44', 'shipsltd.co.jp', 'beams', 'SHIPS MEN|SHIPS WOMEN|SHIPS any|シップス公式|SHIPS 公式', 1),
    x('urban-research', 'URBAN RESEARCH', '#1a1a1a', 'urban-research.jp', 'beams', 'アーバンリサーチ', 1),
    x('nano-universe', 'nano・universe', '#1a1a1a', 'nanouniverse.jp', 'united-arrows', 'ナノ・ユニバース|ナノユニバース|nano universe', 1),
    x('freaks-store', "FREAK'S STORE", '#1f2a44', 'freaksstore.com daytona-park.com', 'beams', 'フリークスストア|FREAKS STORE|デイトナパーク', 1),
    x('onward', 'Onward', '#1a1a1a', 'onward.co.jp', 'world-fashion', 'オンワード・クローゼット|オンワード樫山|ONWARD CROSSET|J.PRESS|五大陸', 1),
    x('world-fashion', 'WORLD', '#1a1a1a', 'world.co.jp', 'onward', 'ワールド オンラインストア|WORLD ONLINE STORE|TAKEO KIKUCHI|タケオキクチ|INDIVI', 1),
    x('sanyo-shokai', 'Sanyo Shokai', '#1f2a44', 'sanyo-shokai.co.jp', 'onward', '三陽商会|ポール・スチュアート|マッキントッシュ ロンドン'),
    x('wego-fashion', 'WEGO', '#1a1a1a', 'wego.jp', 'gu', 'ウィゴー', 1),
    x('grail', 'GRL', '#e4007f', 'grail.bz', 'shein', 'グレイル 通販|GRL グレイル|グレイル公式', 1),
    x('titivate', 'titivate', '#8a7f72', 'titivate.jp', 'grail', 'ティティベイト', 1),
    x('reedit', 'Re:EDIT', '#8a7f72', 'reedit.jp', 'grail', 'リエディ'),
    x('soulberry', 'soulberry', '#8a7f72', 'soulberry.jp', 'grail', 'ソウルベリー'),
    x('graniph', 'graniph', '#1a1a1a', 'graniph.com', 'uniqlo', 'グラニフ'),
    x('usagi-online', 'USAGI ONLINE', '#e4007f', 'usagi-online.com', 'zozotown', 'ウサギオンライン|SNIDEL|スナイデル|ジェラート ピケ|ジェラートピケ|gelato pique|FRAY I.D'),
    x('runway-channel', 'RUNWAY channel', '#1a1a1a', 'runway-webstore.com', 'usagi-online', 'ランウェイチャンネル|MOUSSY|マウジー'),
    x('samantha-thavasa', 'Samantha Thavasa', '#e4007f', 'samantha.co.jp', 'kate-spade', 'サマンサタバサ'),
    x('bape', 'BAPE', '#4b5320', 'bape.com', 'beams', 'ア・ベイシング・エイプ|A BATHING APE'),
    x('comme-des-garcons', 'Comme des Garçons', '#1a1a1a', 'comme-des-garcons.com', 'issey-miyake', 'コム デ ギャルソン|コムデギャルソン|Comme des Garcons'),
    x('issey-miyake', 'Issey Miyake', '#1a1a1a', 'isseymiyake.com', 'comme-des-garcons', 'イッセイ ミヤケ|イッセイミヤケ|PLEATS PLEASE|BAO BAO ISSEY MIYAKE'),
    x('yohji-yamamoto', 'Yohji Yamamoto', '#1a1a1a', 'yohjiyamamoto.co.jp', 'comme-des-garcons', 'ヨウジヤマモト'),
    x('yoshida-kaban', 'Yoshida & Co.', '#1a1a1a', 'yoshidakaban.com', 'tsuchiya-kaban', '吉田カバン|ポーター タンカー|PORTER タンカー'),
    x('tsuchiya-kaban', 'Tsuchiya Kaban', '#5b3a29', 'tsuchiya-kaban.jp', 'yoshida-kaban', '土屋鞄'),
    x('motherhouse', 'MOTHERHOUSE', '#5b3a29', 'motherhouse.co.jp', 'tsuchiya-kaban', 'マザーハウス', 1),
    x('ace-luggage', 'ACE', '#00479d', 'ace.jp', 'yoshida-kaban', 'エース スーツケース|プロテカ|ProtecA', 1),
    x('seiban', 'Seiban', '#e60012', 'seiban.co.jp', 'fit-chan', 'セイバン|天使のはね'),
    x('fit-chan', 'Fit-chan', '#e4007f', 'fit-chan.com', 'seiban', 'フィットちゃん'),
    x('regal-shoes', 'REGAL', '#5b3a29', 'regal.co.jp regalshoes.jp', 'chiyoda-shoes', 'リーガル 靴|REGAL SHOES|リーガルシューズ', 1),
    x('chiyoda-shoes', 'Chiyoda', '#e60012', 'kutsu.com chiyodagrp.co.jp', 'abc-mart', '東京靴流通センター|シュープラザ|靴のチヨダ', 1),
    x('moonstar', 'MoonStar', '#00479d', 'moonstar.co.jp', 'regal-shoes', 'ムーンスター', 1),
    x('gunze', 'GUNZE', '#00479d', 'gunze.jp gunze.co.jp', 'wacoal', 'グンゼ|BODY WILD|キレイラボ'),
    x('tutuanna', 'tutuanna', '#e4007f', 'tutuanna.jp', 'peach-john', 'チュチュアンナ'),
    x('aimerfeel', 'aimerfeel', '#e4007f', 'aimerfeel.jp', 'peach-john', 'エメフィール'),
    x('charle', 'Charle', '#e4007f', 'charle.co.jp', 'wacoal', 'シャルレ', 1),
    x('fukuske', 'Fukuske', '#e60012', 'fukuske.com', 'gunze', '福助 靴下|福助 足袋'),
    x('atsugi', 'ATSUGI', '#e4007f', 'atsugi.co.jp', 'gunze', 'アツギ ストッキング|アツギ タイツ|ASTIGU', 1),
    x('tabio', 'Tabio', '#b5121b', 'tabio.com', 'fukuske', 'タビオ|靴下屋'),
    x('konaka', 'Konaka', '#00479d', 'konaka.co.jp', 'aoyama', '紳士服コナカ|紳士服のコナカ|SUIT SELECT|スーツセレクト'),
    x('haruyama', 'Haruyama', '#00479d', 'haruyama.jp', 'aoki', 'はるやま'),
    x('fabric-tokyo', 'FABRIC TOKYO', '#1f2a44', 'fabric-tokyo.com', 'kashiyama', 'ファブリックトウキョウ'),
    x('kashiyama', 'KASHIYAMA', '#1f2a44', 'kashiyama1927.jp', 'fabric-tokyo', 'カシヤマ オーダースーツ|KASHIYAMA オーダー'),
    x('global-style', 'Global Style', '#1f2a44', 'global-style.jp', 'kashiyama', 'グローバルスタイル', 1),
    x('ordersuit-sada', 'SADA', '#1f2a44', 'ordersuit.info', 'global-style', 'オーダースーツSADA', 1),
    x('kimono-yamato', 'Kimono Yamato', '#b5121b', 'kimono-yamato.co.jp', 'kyoto-kimono-yuzen', 'きものやまと'),
    x('kyoto-kimono-yuzen', 'Kyoto Kimono Yuzen', '#e4007f', 'kyotokimonoyuzen.co.jp', 'kimono-yamato', '京都きもの友禅'),
    x('right-on', 'Right-on', '#00479d', 'right-on.co.jp', 'uniqlo', 'ライトオン', 1),
    x('mac-house', 'Mac-House', '#e60012', 'mac-house.co.jp', 'right-on', 'マックハウス'),
    x('edwin', 'EDWIN', '#00479d', 'edwin.co.jp', 'levis', 'エドウイン|エドウィン', 1),
    x('doclasse', 'DoCLASSE', '#b5121b', 'doclasse.com', 'uniqlo', 'ドゥクラッセ'),
    x('buyma', 'BUYMA', '#1a1a1a', 'buyma.com', 'zozotown', 'バイマ'),
    x('magaseek', 'MAGASEEK', '#e4007f', 'magaseek.com', 'zozotown', 'マガシーク'),
    x('locondo', 'LOCONDO', '#e60012', 'locondo.jp', 'zozotown', 'ロコンド'),
    x('aircloset', 'airCloset', '#e4007f', 'air-closet.com', 'mechakari', 'エアークローゼット|エアクロ'),
    x('mechakari', 'MECHAKARI', '#e4007f', 'mechakari.com', 'aircloset', 'メチャカリ'),
    x('laxus', 'Laxus', '#b5121b', 'laxus.co', 'aircloset', 'ラクサス バッグ|ラクサス ブランドバッグ|Laxus ブランドバッグ', 1),
    x('brandear', 'Brandear', '#e60012', 'brandear.jp', 'reclo', 'ブランディア'),
    x('reclo', 'RECLO', '#1a1a1a', 'reclo.jp', 'brandear', 'リクロ ブランド|RECLO 買取'),
    x('narumiya', 'NARUMIYA ONLINE', '#e4007f', 'narumiya-online.jp', 'shimamura', 'ナルミヤ オンライン|ナルミヤオンライン|メゾピアノ|petit main'),
    x('4c-jewelry', '4℃', '#00a0e9', 'fdcp.co.jp', 'star-jewelry', '4℃ ジュエリー|4℃ ブライダル|4℃ ネックレス|ヨンドシー', 1),
    x('mikimoto', 'Mikimoto', '#1a1a1a', 'mikimoto.com', 'tasaki', 'ミキモト'),
    x('tasaki', 'TASAKI', '#1a1a1a', 'tasaki.co.jp', 'mikimoto', 'タサキ パール|TASAKI バランス'),
    x('star-jewelry', 'Star Jewelry', '#1f2a44', 'star-jewelry.com', '4c-jewelry', 'スタージュエリー'),
    x('agete', 'agete', '#5b3a29', 'agete.com', 'star-jewelry', 'アガット'),
    x('vendome-aoyama', 'Vendome Aoyama', '#1a1a1a', 'vendome.jp', '4c-jewelry', 'ヴァンドーム青山'),
    x('the-kiss', 'THE KISS', '#e4007f', 'thekiss.co.jp', '4c-jewelry', 'ザ・キッス ペアリング|THE KISS ペア|THE KISS ジュエリー', 1),
    x('tsutsumi', 'Jewelry Tsutsumi', '#b5121b', 'tsutsumi.co.jp', '4c-jewelry', 'ジュエリーツツミ'),
    x('festaria', 'festaria', '#e4007f', 'festaria.jp', '4c-jewelry', 'フェスタリア'),
    x('ginza-tanaka', 'GINZA TANAKA', '#b8860b', 'ginzatanaka.co.jp', 'mikimoto', 'ギンザタナカ|田中貴金属ジュエリー'),
    x('knot-watch', 'Knot', '#1a1a1a', 'knot-designs.com', 'seiko', 'Knot 時計|ノット 腕時計|Knot 腕時計', 1),
    x('bradelis', 'BRADELIS New York', '#1a1a1a', 'bradelisny.com', 'wacoal', 'ブラデリスニューヨーク|ブラデリス')
  ]);

  // ---- sportswear ----------------------------------------------------------

  R.add('sportswear', [
    x('descente', 'DESCENTE', '#1a1a1a', 'descente.co.jp', 'asics', 'デサント|水沢ダウン', 1),
    x('yonex', 'YONEX', '#00479d', 'yonex.co.jp yonex.com', 'mizuno', 'ヨネックス'),
    x('phiten', 'Phiten', '#1a1a1a', 'phiten.com', 'mizuno', 'ファイテン'),
    x('finetrack', 'finetrack', '#e60012', 'finetrack.com', 'montbell', 'ファイントラック'),
    x('and-wander', 'and wander', '#1a1a1a', 'andwander.com', 'snow-peak', 'アンドワンダー', 1),
    x('nanga', 'NANGA', '#e60012', 'nanga.jp', 'montbell', 'ナンガ ダウン|ナンガ シュラフ|NANGA オーロラ'),
    x('logos-outdoor', 'LOGOS', '#00913a', 'logos.ne.jp', 'snow-peak', 'ロゴス キャンプ|LOGOS キャンプ|ロゴス テント|LOGOS テント', 1),
    x('captain-stag', 'Captain Stag', '#00693e', 'captainstag.net', 'logos-outdoor', 'キャプテンスタッグ'),
    x('dod-camp', 'DOD', '#1a1a1a', 'dod.camp', 'snow-peak', 'DOD キャンプ|DOD テント|ディーオーディー', 1),
    x('uniflame', 'UNIFLAME', '#e60012', 'uniflame.co.jp', 'snow-peak', 'ユニフレーム'),
    x('ogawa-tent', 'ogawa', '#5b3a29', 'campal.co.jp', 'snow-peak', 'ogawa テント|オガワ テント|キャンパルジャパン', 1),
    x('wild-1', 'WILD-1', '#00693e', 'wild1.co.jp', 'montbell', 'ワイルドワン'),
    x('sports-authority', 'Sports Authority', '#e60012', 'megasports.jp', 'xebio', 'スポーツオーソリティ|メガスポーツ', 1),
    x('himaraya', 'Himaraya', '#e60012', 'himaraya.co.jp', 'alpen', 'ヒマラヤスポーツ|スポーツヒマラヤ|ヒマラヤ オンライン'),
    x('murasaki-sports', 'Murasaki Sports', '#4b1e78', 'murasaki.co.jp', 'xebio', 'ムラサキスポーツ'),
    x('oshmans', "OSHMAN'S", '#e60012', 'oshmans.co.jp', 'xebio', 'オッシュマンズ', 1),
    x('atmos', 'atmos', '#1a1a1a', 'atmos-tokyo.com', 'abc-mart', 'アトモス スニーカー|atmos スニーカー|atmos pink|atmos 公式', 1),
    x('gdo', 'GDO', '#00913a', 'golfdigest.co.jp', 'golf-partner', 'ゴルフダイジェスト・オンライン|GDOゴルフショップ|GDO ゴルフ', 1),
    x('golf-partner', 'Golf Partner', '#00913a', 'golfpartner.jp golfpartner.co.jp', 'gdo', 'ゴルフパートナー', 1),
    x('tsuruya-golf', 'Tsuruya Golf', '#e60012', 'tsuruyagolf.co.jp', 'nikigolf', 'つるやゴルフ'),
    x('nikigolf', 'Niki Golf', '#e60012', 'nikigolf.co.jp nikigolf.jp', 'tsuruya-golf', '二木ゴルフ'),
    x('dunlop-sports', 'Dunlop Sports', '#e60012', 'sports.dunlop.co.jp', 'callaway', 'ゼクシオ|XXIO|スリクソン|SRIXON'),
    x('honma-golf', 'HONMA', '#b8860b', 'honmagolf.com', 'callaway', '本間ゴルフ|ホンマゴルフ|HONMA GOLF'),
    x('prgr', 'PRGR', '#1a1a1a', 'prgr-golf.com', 'taylormade', 'プロギア'),
    x('bridgestone-golf', 'Bridgestone Golf', '#e60012', 'jp.golf.bridgestone bs-golf.com', 'callaway', 'ブリヂストンゴルフ|TOUR B X|TOUR B JGR'),
    x('shimano', 'Shimano', '#00479d', 'shimano.com', 'daiwa-fishing', 'シマノ'),
    x('daiwa-fishing', 'DAIWA', '#1a1a1a', 'daiwa.com', 'shimano', 'ダイワ リール|DAIWA 釣り|ダイワ 釣り|グローブライド|ダイワ ロッド', 1),
    x('johshuya', 'Johshuya', '#e60012', 'johshuya.co.jp', 'shimano', '上州屋')
  ]);

  // ---- gambling ------------------------------------------------------------

  R.add('gambling', [
    x('nar-keiba', 'NAR', '#00693e', 'keiba.go.jp', '', '地方競馬', 1),
    x('tck', 'Tokyo City Keiba', '#003f8e', 'tokyocitykeiba.com', '', '東京シティ競馬|大井競馬|トゥインクルレース'),
    x('nankan-keiba', 'Nankan Keiba', '#e60012', 'nankankeiba.com', '', '南関東競馬|南関東4競馬場|川崎競馬|船橋競馬|浦和競馬'),
    x('banei', 'Banei Keiba', '#8b0000', 'banei-keiba.or.jp', '', 'ばんえい競馬|ばんえい十勝'),
    x('autorace', 'AutoRace', '#e60012', 'autorace.jp', '', 'オートレース', 1),
    x('kdreams', 'Kdreams', '#bf0000', 'kdreams.jp', '', 'Kドリームス|ケイドリームス'),
    x('dmm-keirin', 'DMM Keirin', '#1a1a1a', 'keirin.dmm.com', '', 'DMM競輪', 1),
    x('chariloto', 'Chariloto', '#e60012', 'chariloto.com', '', 'チャリロト'),
    x('gamboo', 'Gamboo', '#00a0e9', 'gamboo.jp', '', 'Gamboo BET'),
    x('netkeiba', 'netkeiba', '#00693e', 'netkeiba.com', '', 'ネットケイバ|ウマい馬券'),
    x('jra-van', 'JRA-VAN', '#00693e', 'jra-van.jp', '', 'JRA-VAN', 1),
    x('umanity', 'Umanity', '#e60012', 'umanity.jp', '', 'ウマニティ'),
    x('keibabook', 'Keiba Book', '#003f8e', 'keibabook.co.jp', '', '競馬ブック'),
    x('dynam', 'DYNAM', '#e60012', 'dynam.jp'),
    x('p-world', 'P-WORLD', '#e60012', 'p-world.co.jp', '', 'ピーワールド'),
    x('dmm-pachitown', 'DMM Pachitown', '#1a1a1a', 'p-town.dmm.com', '', 'DMMぱちタウン', 1)
  ]);

  // ---- crypto --------------------------------------------------------------

  R.add('crypto', [
    x('bitpoint', 'BITPOINT', '#00a0e9', 'bitpoint.co.jp', 'coincheck', 'ビットポイント'),
    x('zaif', 'Zaif', '#0b84d8', 'zaif.jp', 'bitbank', 'Zaif取引所'),
    x('bittrade', 'BitTrade', '#1a6cff', 'bittrade.co.jp', 'bitbank', 'ビットトレード|BitTrade Japan', 1),
    x('mercoin', 'Mercoin', '#ff0211', 'mercoin.com', 'coincheck', 'メルコイン|メルカリのビットコイン'),
    x('okcoin-japan', 'OKJ', '#1a1a1a', 'okj.com okcoin.jp', 'bitbank', 'OKCoinJapan|オーケーコイン・ジャパン|OKコインジャパン|オーケージェー', 1),
    x('btcbox', 'BTCBOX', '#f7931a', 'btcbox.co.jp', 'zaif', 'BTCボックス'),
    x('cryptact', 'Cryptact', '#2b7de9', 'cryptact.com', 'coincheck', 'クリプタクト'),
    x('bitlending', 'BitLending', '#0b2a4a', 'bitlending.jp', 'coincheck', 'ビットレンディング')
  ]);

  // ---- trading apps --------------------------------------------------------

  R.add('investing', [
    x('sbi-fx', 'SBI FX Trade', '#0046ad', 'sbifxt.co.jp', 'gmo-click', 'SBI FXトレード|SBIFXトレード'),
    x('gaikaex', 'GMO Gaika', '#005bac', 'gaikaex.com', 'dmm-fx', '外貨ex|GMO外貨'),
    x('hirose-fx', 'Hirose Tusyo', '#e60012', 'hirose-fx.co.jp', 'gaitame', 'ヒロセ通商|LION FX'),
    x('jfx', 'JFX', '#003f8e', 'jfx.co.jp', 'hirose-fx', 'JFX株式会社|MATRIX TRADER', 1),
    x('central-tanshi-fx', 'Central Tanshi FX', '#0068b7', 'central-tanshifx.com', 'gaitame', 'セントラル短資FX|FXダイレクトプラス'),
    x('money-partners', 'Money Partners', '#e60012', 'moneypartners.co.jp', 'gaitame', 'マネーパートナーズ', 1),
    x('light-fx', 'LIGHT FX', '#f39800', 'lightfx.jp', 'minna-fx', 'LIGHT FX|ライトFX', 1),
    x('invast', 'Invast', '#00a0e9', 'invast.jp', 'money-square', 'インヴァスト証券|トライオートFX|トライオートETF|トライオート'),
    x('gaitame-online', 'Gaitame Online', '#e60012', 'gaitameonline.com', 'gaitame', '外為オンライン'),
    x('money-square', 'Money Square', '#0b318f', 'm2j.co.jp', 'invast', 'マネースクエア|トラリピ', 1),
    x('inet-sec', 'Inet Securities', '#005bac', 'inet-sec.co.jp', 'money-square', 'アイネット証券|ループイフダン'),
    x('himawari-sec', 'Himawari Securities', '#f8b500', 'sec.himawari-group.co.jp', 'gaitame-online', 'ひまわり証券'),
    x('fx-broadnet', 'FX Broadnet', '#0068b7', 'fxbroadnet.com', 'gaitame-online', 'FXブロードネット'),
    x('okasan', 'Okasan Securities', '#003f8e', 'okasan.co.jp okasan-online.co.jp', 'daiwa', '岡三証券|岡三オンライン'),
    x('mizuho-sec', 'Mizuho Securities', '#0f218b', 'mizuho-sc.com', 'nomura', 'みずほ証券'),
    x('tokai-tokyo', 'Tokai Tokyo Securities', '#00479d', 'tokaitokyo.co.jp', 'okasan', '東海東京証券'),
    x('iwai-cosmo', 'Iwai Cosmo Securities', '#003f8e', 'iwaicosmo.co.jp', 'okasan', '岩井コスモ証券'),
    x('sbi-neotrade', 'SBI Neotrade Securities', '#0046ad', 'sbineotrade.jp', 'matsui', 'SBIネオトレード証券'),
    x('theo', 'THEO', '#1a1a1a', 'theo.blue', 'wealthnavi', 'THEO+ docomo|おまかせ資産運用THEO|THEO（テオ）', 1),
    x('folio', 'FOLIO', '#1a1a1a', 'folio-sec.com', 'wealthnavi', 'ROBOPRO|FOLIO ROBO PRO|ROBO PRO', 1),
    x('susten', 'SUSTEN', '#0b2a4a', 'susten.jp', 'wealthnavi', 'サステン|SUSTENキャピタル'),
    x('tsumiki', 'tsumiki Securities', '#e95513', 'tsumiki-sec.com', 'rakuten-sec', 'tsumiki証券'),
    x('connect-sec', 'Daiwa Connect Securities', '#00b900', 'connect-sec.co.jp', 'paypay-sec', '大和コネクト証券|CONNECT証券'),
    x('funds-jp', 'Funds', '#0f4c81', 'funds.jp', 'crowd-bank', 'Funds（ファンズ）|貸付ファンドのFunds|ファンズ株式会社', 1),
    x('fundinno', 'FUNDINNO', '#0a3d91', 'fundinno.com', 'funds-jp', 'ファンディーノ'),
    x('creal', 'CREAL', '#0a7c86', 'creal.jp', 'cozuchi', 'クリアル'),
    x('cozuchi', 'COZUCHI', '#1a1a1a', 'cozuchi.com', 'creal'),
    x('ownersbook', 'OwnersBook', '#00529b', 'ownersbook.jp', 'creal', 'オーナーズブック'),
    x('crowd-bank', 'Crowd Bank', '#0b5ea8', 'crowdbank.jp', 'funds-jp', 'クラウドバンク'),
    x('renosy', 'RENOSY', '#e60012', 'renosy.com', 'creal', 'リノシー'),
    x('jp-returns', 'JP Returns', '#003f8e', 'jpreturns.com', 'renosy', 'JPリターンズ'),
    x('nihon-zaitaku', 'Nihon Zaitaku', '#00693e', 'nihonzaitaku.co.jp', 'renosy', '日本財託'),
    x('sawakami', 'Sawakami Fund', '#00693e', 'sawakami.co.jp', 'hifumi', 'さわかみ投信|さわかみファンド'),
    x('hifumi', 'Hifumi', '#e60012', 'hifumi.rheos.jp rheos.jp', 'sawakami', 'ひふみ投信|ひふみプラス|ひふみワールド|レオス・キャピタルワークス', 1),
    x('saison-am', 'Saison Asset Management', '#0068b7', 'saison-am.co.jp', 'hifumi', 'セゾン投信'),
    x('minkabu', 'MINKABU', '#e60012', 'minkabu.jp', 'tradingview', 'みんかぶ|みんなの株式'),
    x('tanaka-kikinzoku', 'Tanaka Kikinzoku', '#b8860b', 'gold.tanaka.co.jp tanaka.co.jp', 'wealthnavi', '田中貴金属', 1)
  ]);

  // ---- buy now, pay later --------------------------------------------------

  R.add('bnpl', [
    x('np-atobarai', 'NP Atobarai', '#00a0e9', 'np-atobarai.jp netprotections.com', 'paidy', 'NP後払い|ネットプロテクションズ'),
    x('gmo-atobarai', 'GMO Atobarai', '#005bac', 'gmo-ps.com', 'np-atobarai', 'GMO後払い|GMOペイメントサービス')
  ]);

  // ---- credit cards --------------------------------------------------------

  R.add('cards', [
    x('jaccs', 'JACCS', '#0068b7', 'jaccs.co.jp', 'orico', 'ジャックス'),
    x('mufg-card', 'Mitsubishi UFJ Card', '#e60000', 'cr.mufg.jp', 'smbc-card', '三菱UFJカード|三菱UFJニコス|MUFGカード'),
    x('view-card', 'View Card', '#00833e', 'viewcard.co.jp', 'epos', 'ビューカード|JRE CARD', 1),
    x('life-card', 'Life Card', '#e60012', 'lifecard.co.jp', 'orico', 'ライフカード', 1),
    x('aplus', 'Aplus', '#e60012', 'aplus.co.jp', 'jaccs', 'アプラスカード|株式会社アプラス|アプラスのローン', 1),
    x('pocket-card', 'Pocket Card', '#e60012', 'pocketcard.co.jp', 'life-card', 'ポケットカード|P-oneカード', 1),
    x('ts-cubic', 'TS CUBIC CARD', '#eb0a1e', 'ts3card.com', 'jcb', 'TS CUBIC|トヨタファイナンス'),
    x('recruit-card', 'Recruit Card', '#0aa5e0', 'recruit-card.jp', 'rakuten-card', 'リクルートカード'),
    x('jal-card', 'JAL Card', '#cc0000', 'jalcard.co.jp', 'rakuten-card', 'JALカード'),
    x('uc-card', 'UC Card', '#003f8e', 'uccard.co.jp', 'saison', 'UCカード', 1),
    x('mi-card', 'MI Card', '#b8860b', 'micard.co.jp', 'epos', 'エムアイカード', 1),
    x('tokyu-card', 'Tokyu Card', '#e60012', 'topcard.co.jp', 'view-card', '東急カード|TOKYU CARD', 1),
    x('jfr-card', 'JFR Card', '#8b6f3e', 'jfr-card.co.jp', 'mi-card', '大丸松坂屋カード|JFRカード', 1),
    x('seven-card', 'Seven Card', '#f58220', '7card.co.jp', 'aeon-card', 'セブンカード・プラス|セブンカード', 1),
    x('nexus-card', 'Nexus Card', '#00a0e9', 'nexuscard.co.jp', 'life-card', 'ネクサスカード|Nexus Card', 1),
    x('luxury-card', 'Luxury Card', '#1a1a1a', 'luxurycard.co.jp', 'amex', 'ラグジュアリーカード', 1),
    x('upsider', 'UPSIDER', '#1a1a1a', 'up-sider.com', 'saison', 'アップサイダー|UPSIDERカード'),
    x('vandle-card', 'Vandle Card', '#f5a623', 'vandle.jp', 'onebank', 'バンドルカード'),
    x('onebank', 'OneBank', '#ff5c5c', 'onebank.jp b43.jp', 'vandle-card', 'ワンバンク|B/43|B43カード', 1),
    x('au-pay-card', 'au PAY Card', '#eb5505', 'kddi-fs.com', 'd-card', 'au PAY カード|au PAYカード', 1)
  ]);

  // ---- insurance -----------------------------------------------------------

  R.add('insurance', [
    x('aioi', 'Aioi Nissay Dowa', '#e60012', 'aioinissaydowa.co.jp', 'ms-ins', 'あいおいニッセイ同和|あいおいニッセイ'),
    x('mitsui-direct', 'Mitsui Direct', '#00a0e9', 'mitsui-direct.co.jp', 'sony-sonpo', '三井ダイレクト損保|三井ダイレクト'),
    x('sompo-direct', 'SOMPO Direct', '#e60012', 'sompo-direct.co.jp ins-saison.co.jp', 'sony-sonpo', 'SOMPOダイレクト|おとなの自動車保険|セゾン自動車火災'),
    x('e-design', 'Tokio Marine Direct', '#e4007f', 'e-design.net edsp.co.jp', 'sony-sonpo', '東京海上ダイレクト|イーデザイン損保'),
    x('kyoei-kasai', 'Kyoei Fire', '#00693e', 'kyoeikasai.co.jp', 'aioi', '共栄火災'),
    x('nisshin-fire', 'Nisshin Fire', '#0068b7', 'nisshinfire.co.jp', 'kyoei-kasai', '日新火災'),
    x('ja-kyosai', 'JA Kyosai', '#00a040', 'ja-kyosai.or.jp', 'kokumin-kyosai', 'JA共済', 1),
    x('kokumin-kyosai', 'Kokumin Kyosai co-op', '#e95513', 'zenrosai.coop', 'kenmin-kyosai', 'こくみん共済|全労済'),
    x('kenmin-kyosai', 'Kenmin Kyosai', '#00a0e9', 'kyosai-cc.or.jp', 'kokumin-kyosai', '都道府県民共済|県民共済|都民共済|府民共済', 1),
    x('coop-kyosai', 'CO-OP Kyosai', '#e60012', 'coopkyosai.coop', 'kenmin-kyosai', 'コープ共済|CO・OP共済'),
    x('taiyo-life', 'Taiyo Life', '#e95513', 'taiyo-seimei.co.jp', 'asahi-life', '太陽生命'),
    x('daido-life', 'Daido Life', '#003f8e', 'daido-life.co.jp', 'taiyo-life', '大同生命'),
    x('fukoku-life', 'Fukoku Life', '#00693e', 'fukoku-life.co.jp', 'asahi-life', 'フコク生命|富国生命'),
    x('asahi-life', 'Asahi Life', '#e60012', 'asahi-life.co.jp', 'fukoku-life', '朝日生命'),
    x('sony-life', 'Sony Life', '#003f8e', 'sonylife.co.jp', 'prudential', 'ソニー生命'),
    x('anshin-life', 'Tokio Marine Nichido Life', '#0068b7', 'tmn-anshin.co.jp', 'sony-life', '東京海上日動あんしん生命|あんしん生命'),
    x('msa-life', 'Mitsui Sumitomo Aioi Life', '#00a040', 'msa-life.co.jp', 'anshin-life', '三井住友海上あいおい生命'),
    x('himawari-life', 'SOMPO Himawari Life', '#f8b500', 'himawari-life.co.jp', 'anshin-life', 'SOMPOひまわり生命|ひまわり生命'),
    x('neo-first', 'Neo First Life', '#e4007f', 'neofirst.co.jp', 'lifenet', 'ネオファースト生命'),
    x('medicare-life', 'Medicare Life', '#00a0e9', 'medicarelife.com', 'orix-life', 'メディケア生命', 1),
    x('hanasaku-life', 'Hanasaku Life', '#e95580', 'life8739.co.jp', 'medicare-life', 'はなさく生命'),
    x('nanairo-life', 'Nanairo Life', '#7b5aa6', 'nanairolife.co.jp', 'hanasaku-life', 'なないろ生命'),
    x('fwd-japan', 'FWD Life Japan', '#e87722', 'fwdlife.co.jp', 'orix-life', 'FWD生命', 1),
    x('gibraltar-life', 'Gibraltar Life', '#003f8e', 'gib-life.co.jp', 'sony-life', 'ジブラルタ生命'),
    x('sbi-life', 'SBI Life', '#0046ad', 'sbilife.co.jp', 'lifenet', 'SBI生命'),
    x('taiju-life', 'Taiju Life', '#00693e', 'taiju-life.co.jp', 'sumitomo-life', '大樹生命'),
    x('au-sonpo', 'au Insurance', '#eb5505', 'au-sonpo.co.jp', 'sbi-sonpo', 'au損保', 1),
    x('mikata', 'Mikata Insurance', '#e60012', 'mikata-ins.co.jp', 'au-sonpo', '弁護士保険ミカタ|ミカタ少額短期保険', 1),
    x('insweb', 'InsWeb', '#f39800', 'insweb.co.jp', 'hoken-ichiba', 'インズウェブ|保険スクエアbang'),
    x('zubat', 'Zubat', '#e60012', 'zba.jp', 'insweb', 'ズバット自動車保険比較|ズバット車買取比較|ズバット引越し比較', 1),
    x('hoken-minaoshi', 'Hoken Minaoshi Honpo', '#e60012', 'hokepon.com', 'hoken-madoguchi', '保険見直し本舗'),
    x('hoken-clinic', 'Hoken Clinic', '#00a0e9', 'hoken-clinic.com', 'hoken-madoguchi', '保険クリニック'),
    x('hoken-mammoth', 'Hoken Mammoth', '#e95513', 'hoken-mammoth.jp', 'money-doctor', '保険マンモス'),
    x('money-doctor', 'Money Doctor', '#003f8e', 'fp-moneydoctor.com', 'hoken-madoguchi', 'マネードクター', 1),
    x('hoken-all', 'Hoken no Zenbu', '#f39800', 'hoken-all.co.jp', 'hoken-mammoth', 'ほけんのぜんぶ')
  ]);

  // ---- VPNs ----------------------------------------------------------------

  R.add('vpn', [
    x('sekai-vpn', 'Sekai VPN', '#0068b7', 'interlink.or.jp', 'millenvpn', 'セカイVPN')
  ]);

  // ---- meal kits -----------------------------------------------------------

  R.add('mealkits', [
    x('zenb', 'ZENB', '#f2c500', 'zenb.jp', 'base-food', 'ゼンブヌードル|ゼンブブレッド|ZENB ヌードル'),
    x('gofood', 'GOFOOD', '#3a7d44', 'gofood.jp', 'nosh', 'ゴーフード|GOFOOD 宅配弁当', 1),
    x('delipicks', 'DELIPICKS', '#1f2a44', 'deli-picks.com chefbox.jp', 'nosh', 'デリピックス|シェフボックス'),
    x('mogumo', 'mogumo', '#f5a200', 'mogumo.jp', 'oisix', 'モグモ'),
    x('radish-boya', 'Radish Boya', '#e95513', 'radishbo-ya.co.jp', 'oisix', 'らでぃっしゅぼーや'),
    x('daichi', 'Daichi wo Mamoru Kai', '#00693e', 'daichi-m.co.jp', 'oisix', '大地を守る会'),
    x('mitsuboshi-farm', 'Mitsuboshi Farm', '#f39800', 'mitsuboshifarm.jp', 'nosh', '三ツ星ファーム|三つ星ファーム'),
    x('green-spoon', 'GREEN SPOON', '#00a040', 'green-spoon.jp', 'nosh', 'グリーンスプーン', 1),
    x('tsukurioki', 'Tsukurioki.jp', '#e95513', 'tsukurioki.jp', 'yoshikei', 'つくりおき.jp'),
    x('muscle-deli', 'Muscle Deli', '#e60012', 'muscledeli.jp', 'nosh', 'マッスルデリ'),
    x('onemile', 'Onemile', '#e60012', 'onemile.jp', 'watami', 'わんまいる'),
    x('magokoro-care', 'Magokoro Care Shoku', '#e95580', 'magokoro-care-shoku.com', 'watami', 'まごころケア食'),
    x('shokutakubin', 'Shokutakubin', '#00a040', 'shokutakubin.com', 'watami', '食宅便'),
    x('wellness-dining', 'Wellness Dining', '#00a040', 'wellness-dining.com', 'shokutakubin', 'ウェルネスダイニング', 1),
    x('tsurukame', 'Dr. Tsurukame Kitchen', '#e60012', 'tsurukame-kitchen.com', 'wellness-dining', 'つるかめキッチン'),
    x('takuhai-cook123', 'Takuhai Cook 123', '#e95513', 'takuhaicook123.jp', 'watami', '宅配クック123|宅配クック ワン・ツゥ・スリー')
  ]);

  // ---- mattresses ----------------------------------------------------------

  R.add('mattress', [
    x('brain-sleep', 'Brain Sleep', '#1f2a44', 'brain-sleep.com', 'airweave', 'ブレインスリープ'),
    x('gokumin', 'GOKUMIN', '#1a1a1a', 'gokumin.co.jp', 'nell', '極眠 マットレス|GOKUMIN マットレス|ゴクミン'),
    x('motton', 'Motton', '#00479d', 'motton-japan.com', 'airweave', 'モットン'),
    x('showa-nishikawa', 'Showa Nishikawa', '#00479d', 'showanishikawa.co.jp', 'nishikawa', '昭和西川|ムアツ'),
    x('dreambed', 'dreambed', '#1f2a44', 'dreambed.jp', 'france-bed', 'ドリームベッド', 1),
    x('japan-bed', 'Nihon Bed', '#5b3a29', 'nihonbed.com', 'simmons', '日本ベッド'),
    x('paramount-bed', 'Paramount Bed', '#00479d', 'paramount.co.jp', 'france-bed', 'パラマウントベッド|INTIME1000|インタイム1000', 1),
    x('lofty', 'LOFTY', '#00a0e9', 'lofty.co.jp', 'nishikawa', 'ロフテー', 1),
    x('tential', 'TENTIAL', '#1a1a1a', 'tential.jp', 'venex', 'BAKUNE|TENTIAL リカバリーウェア'),
    x('venex', 'VENEX', '#1f2a44', 'venex-j.co.jp', 'tential', 'ベネクス リカバリーウェア|VENEX リカバリーウェア', 1)
  ]);

  // ---- website builders ----------------------------------------------------

  R.add('sitebuilders', [
    x('goope', 'Goope', '#f39800', 'goope.jp', 'peraichi'),
    x('studio-design', 'STUDIO', '#1a1a1a', 'studio.design', 'peraichi', 'Studio.Design|STUDIO ノーコード|ノーコードのSTUDIO', 1),
    x('movable-type', 'Movable Type', '#003f8e', 'movabletype.jp sixapart.jp', 'wordpress', 'シックス・アパート|MovableType'),
    x('heteml', 'heteml', '#00a0e9', 'heteml.jp', 'xserver', 'ヘテムル'),
    x('value-domain', 'Value Domain', '#0068b7', 'value-domain.com', 'onamae', 'バリュードメイン', 1),
    x('coreserver', 'CORESERVER', '#e60012', 'coreserver.jp', 'xserver', 'コアサーバー'),
    x('mixhost', 'mixhost', '#00a0e9', 'mixhost.jp', 'conoha', 'ミックスホスト'),
    x('shin-server', 'Shin Rental Server', '#0068b7', 'shin-server.jp', 'xserver', 'シン・レンタルサーバー|シンレンタルサーバー'),
    x('star-server', 'Star Server', '#f8b500', 'star.ne.jp', 'lolipop', 'スターサーバー|スタードメイン', 1),
    x('ecforce', 'ecforce', '#1a1a1a', 'ec-force.com', 'shopify'),
    x('futureshop', 'futureshop', '#e60012', 'future-shop.jp', 'makeshop', 'フューチャーショップ'),
    x('makeshop', 'makeshop', '#e60012', 'makeshop.jp', 'futureshop', 'メイクショップ'),
    x('colorme', 'Color Me Shop', '#00a0e9', 'shop-pro.jp', 'base-ec', 'カラーミーショップ'),
    x('ec-cube', 'EC-CUBE', '#f8b500', 'ec-cube.net', 'shopify', 'イーシーキューブ'),
    x('shopserve', 'shopserve', '#e60012', 'shopserve.jp', 'makeshop', 'ショップサーブ')
  ]);

  // ---- dating apps ---------------------------------------------------------

  R.add('dating', [
    x('marrish', 'marrish', '#e95580', 'marrish.com', 'pairs', 'マリッシュ'),
    x('youbride', 'youbride', '#e4007f', 'youbride.jp', 'marrish', 'ユーブライド'),
    x('tokyo-calendar-date', 'Tokyo Calendar Date', '#1a1a1a', 'tokyo-calendar.jp', 'pairs', '東カレデート|東京カレンダー'),
    x('zwei', 'ZWEI', '#e60012', 'zwei.com', 'o-net', '結婚相談所ツヴァイ|ツヴァイ 結婚相談所|ZWEI（ツヴァイ）', 1),
    x('sunmarie', 'Sunmarie', '#e95580', 'sunmarie.co.jp sunmarie.com', 'o-net', 'サンマリエ'),
    x('nozze', 'NOZZE', '#0068b7', 'nozze.com', 'zwei', 'ノッツェ', 1),
    x('naco-do', 'naco-do', '#00b4a0', 'naco-do.com', 'en-konkatsu', 'ナコード'),
    x('en-konkatsu', 'en Konkatsu Agent', '#00a0e9', 'en-konkatsu.com', 'naco-do', 'エン婚活エージェント|エン婚活'),
    x('exeo', 'EXEO', '#e60012', 'exeo-japan.co.jp', 'otocon', '婚活パーティー エクシオ|エクシオの婚活|エクシオ 婚活', 1),
    x('otocon', 'OTOCON', '#1a1a1a', 'otocon.jp', 'exeo', 'オトコン'),
    x('machicon', 'Machicon Japan', '#f39800', 'machicon.jp', 'otocon', '街コンジャパン')
  ]);

  // ---- AI assistants -------------------------------------------------------

  R.add('ai', [
    x('elyza', 'ELYZA', '#1a1a1a', 'elyza.ai', 'chatgpt'),
    x('exawizards', 'ExaWizards', '#1a1a1a', 'exawizards.com', 'japan-ai', 'エクサウィザーズ|exaBase 生成AI|exaBase'),
    x('japan-ai', 'JAPAN AI', '#e60012', 'japan-ai.co.jp', 'exawizards', 'JAPAN AI CHAT|JAPAN AI AGENT', 1),
    x('preferred-networks', 'Preferred Networks', '#0068b7', 'preferred.jp', 'sakana-ai', 'プリファードネットワークス|PLaMo', 1),
    x('sakana-ai', 'Sakana AI', '#e60012', 'sakana.ai', 'preferred-networks', 'サカナAI'),
    x('felo', 'Felo', '#3b82f6', 'felo.ai', 'perplexity', 'Felo AI|Felo Search', 1),
    x('user-local', 'User Local', '#00a0e9', 'userlocal.jp', 'exawizards', 'ユーザーローカル', 1),
    x('stockmark', 'Stockmark', '#1a1a1a', 'stockmark.co.jp', 'exawizards', 'ストックマーク'),
    x('pksha', 'PKSHA', '#1a1a1a', 'pkshatech.com', 'exawizards'),
    x('ai-sakura', 'AI Sakura-san', '#e95580', 'tifana.ai', 'pksha', 'AIさくらさん', 1),
    x('abeja', 'ABEJA', '#00a0e9', 'abejainc.com', 'pksha', 'アベジャ|ABEJA Platform', 1)
  ]);

  // ---- cloud platforms -----------------------------------------------------

  R.add('cloud', [
    x('idcf', 'IDC Frontier', '#e60012', 'idcf.jp', 'kagoya', 'IDCフロンティア|IDCFクラウド'),
    x('kagoya', 'KAGOYA', '#e60012', 'kagoya.jp', 'idcf', 'カゴヤ・ジャパン'),
    x('webarena', 'WebARENA', '#e60012', 'web.arena.ne.jp', 'kagoya'),
    x('ablenet', 'ABLENET', '#0068b7', 'ablenet.jp', 'kagoya', 'エイブルネット')
  ]);

  // ---- work software -------------------------------------------------------

  R.add('worktools', [
    x('notepm', 'NotePM', '#00a0e9', 'notepm.jp', 'notion'),
    x('jooto', 'Jooto', '#00b4a0', 'jooto.com', 'trello'),
    x('talknote', 'Talknote', '#00a0e9', 'talknote.com', 'chatwork', 'トークノート'),
    x('wowtalk', 'WowTalk', '#f39800', 'wowtalk.jp', 'line-works', 'ワウトーク'),
    x('vcube', 'V-CUBE', '#00a040', 'vcube.com', 'zoom', 'ブイキューブ'),
    x('ovice', 'ovice', '#1a1a1a', 'ovice.com', 'zoom', 'オヴィス'),
    x('rakumo', 'rakumo', '#00a0e9', 'rakumo.com', 'chatwork'),
    x('rimo', 'Rimo Voice', '#1a1a1a', 'rimo.app', 'notepm')
  ]);

  // ---- tax software --------------------------------------------------------

  R.add('tax', [
    x('zeiri4', 'Zeirishi.com', '#f39800', 'zeiri4.com', 'chester', '税理士ドットコム'),
    x('chester', 'Chester Tax', '#003f8e', 'chester-tax.com', 'tsuji-hongo', '税理士法人チェスター|相続税のチェスター'),
    x('tsuji-hongo', 'Tsuji Hongo Tax', '#00693e', 'ht-tax.or.jp', 'chester', '辻・本郷 税理士法人|辻・本郷'),
    x('venture-support', 'Venture Support', '#e60012', 'vs-group.jp', 'tsuji-hongo', 'ベンチャーサポート', 1),
    x('taxnap', 'Taxnap', '#00b4a0', 'taxnap.com', 'zeiri4', 'タックスナップ')
  ]);

  // ---- beer ----------------------------------------------------------------

  R.add('beer', [
    x('coedo', 'COEDO', '#1b3a5c', 'coedobrewery.com', 'yona-yona', 'コエドビール|コエドブルワリー'),
    x('hitachino-nest', 'Hitachino Nest', '#c8102e', 'kiuchibrewery.co.jp hitachino.cc', 'yona-yona', '常陸野ネスト|木内酒造'),
    x('echigo-beer', 'Echigo Beer', '#00693e', 'echigo-beer.jp', 'yona-yona', 'エチゴビール'),
    x('ise-kadoya', 'Ise Kadoya', '#7a1f1f', 'biyagura.jp isekadoyabeer.jp', 'yona-yona', '伊勢角屋麦酒|ISEKADO'),
    x('hoppy', 'Hoppy', '#d7000f', 'hoppy-happy.com', 'asahi', 'ホッピー|Hoppy Beverage', 1),
    x('dreambeer', 'DREAMBEER', '#f5a200', 'dreambeer.jp', 'kirin', 'ドリームビア'),
    x('far-yeast', 'Far Yeast Brewing', '#1a1a1a', 'faryeast.com', 'yona-yona', 'Far Yeast|ファーイーストブルーイング|馨和 KAGUA')
  ]);

  // ---- games consoles ------------------------------------------------------

  R.add('gaming', [
    x('hori', 'HORI', '#e60012', 'hori.jp', 'cyber-gadget', 'ホリ コントローラー|HORI コントローラー|ホリパッド|ファイティングスティック', 1),
    x('cyber-gadget', 'Cyber Gadget', '#00479d', 'cybergadget.co.jp', 'hori', 'サイバーガジェット'),
    x('surugaya', 'Suruga-ya', '#00479d', 'suruga-ya.jp', 'geo', '駿河屋')
  ]);

  // ---- fitness -------------------------------------------------------------

  R.add('fitness', [
    x('cycle-base-asahi', 'Cycle Base Asahi', '#e60012', 'cb-asahi.co.jp', 'daiwa-cycle', 'サイクルベースあさひ'),
    x('daiwa-cycle', 'Daiwa Cycle', '#e60012', 'daiwa-cycle.co.jp', 'cycle-base-asahi', 'ダイワサイクル'),
    x('bridgestone-cycle', 'Bridgestone Cycle', '#e60012', 'bscycle.co.jp', 'cycle-base-asahi', 'ブリヂストンサイクル|アルベルト 自転車'),
    x('ysroad', "Y's Road", '#e60012', 'ysroad.co.jp', 'cycle-base-asahi', 'ワイズロード', 1),
    x('alinco', 'ALINCO', '#00479d', 'alinco.co.jp', 'nordictrack', 'アルインコ'),
    x('renaissance', 'Renaissance', '#e60012', 's-renaissance.co.jp', 'konami-sports', 'スポーツクラブ ルネサンス|スポーツクラブルネサンス|ルネサンス スポーツクラブ', 1),
    x('jexer', 'JEXER', '#00833e', 'jexer.jp', 'tipness', 'ジェクサー'),
    x('nas', 'NAS', '#0068b7', 'nas-club.co.jp', 'central-sports', 'スポーツクラブNAS', 1),
    x('megalos', 'MEGALOS', '#e60012', 'megalos.co.jp', 'tipness', 'メガロス'),
    x('sports-oasis', 'Sports Oasis', '#00a0e9', 'sportsoasis.co.jp', 'megalos', 'スポーツオアシス|東急スポーツオアシス', 1),
    x('holiday-sc', 'Holiday Sports Club', '#f39800', 'holiday-sc.jp', 'konami-sports', 'ホリデイスポーツクラブ', 1),
    x('fit365', 'FIT365', '#f39800', 'fit365.jp', 'joyfit'),
    x('fit-place24', 'FIT PLACE24', '#e60012', 'fitplace.jp', 'chocozap', 'フィットプレイス24|FIT PLACE24', 1),
    x('worldplus-gym', 'World Plus Gym', '#e60012', 'worldplus-gym.com', 'anytime', 'ワールドプラスジム'),
    x('247-workout', '24/7Workout', '#e60012', '247-sports.jp 247-workout.jp', 'rizap', '24/7ワークアウト|24/7Workout', 1),
    x('beyond-gym', 'BEYOND', '#1a1a1a', 'beyond-gym.com', 'rizap', 'BEYOND ジム|パーソナルジムBEYOND|ビヨンドジム', 1),
    x('katagiri-juku', 'Katagiri Juku', '#e60012', 'katagirijuku.jp', 'rizap', 'かたぎり塾'),
    x('dr-stretch', 'Dr.stretch', '#f39800', 'doctorstretch.com', 'rizap', 'ドクターストレッチ|Dr.ストレッチ'),
    x('caldo', 'CALDO', '#e95513', 'hotyoga-caldo.com', 'lava', 'ホットヨガスタジオ カルド|カルド ホットヨガ|ホットヨガ カルド', 1),
    x('zen-place', 'zen place', '#1a1a1a', 'zenplace.co.jp', 'pilates-k', 'ゼンプレイス|zen place pilates', 1),
    x('pilates-k', 'pilates K', '#e95580', 'pilates-k.jp', 'zen-place', 'ピラティスK|pilates K', 1),
    x('rintosull', 'Rintosull', '#e95580', 'rintosull.com', 'pilates-k', 'リントスル'),
    x('feelcycle', 'FEELCYCLE', '#1a1a1a', 'feelcycle.com', 'b-monster', 'フィールサイクル'),
    x('b-monster', 'b-monster', '#1a1a1a', 'b-monster.jp', 'feelcycle', 'ビーモンスター'),
    x('soelu', 'SOELU', '#e95580', 'soelu.com', 'lean-body'),
    x('lean-body', 'LEAN BODY', '#e60012', 'lean-body.jp', 'soelu', 'リーンボディ', 1),
    x('finc', 'FiNC', '#00a0e9', 'finc.com', 'asken')
  ]);

  // ---- online learning -----------------------------------------------------

  R.add('learning', [
    x('aeon-eikaiwa', 'AEON Eikaiwa', '#e60012', 'aeonet.co.jp', 'ecc', '英会話イーオン|イーオン英会話|英会話のイーオン|イーオンキッズ', 1),
    x('shane', 'Shane English School', '#003f8e', 'shane.co.jp', 'aeon-eikaiwa', 'シェーン英会話', 1),
    x('rizap-english', 'RIZAP English', '#1a1a1a', 'rizap-english.jp', 'progrit', 'ライザップイングリッシュ'),
    x('progrit', 'PROGRIT', '#e60012', 'progrit.co.jp', 'rizap-english', 'プログリット'),
    x('toraiz', 'TORAIZ', '#e60012', 'toraiz.jp', 'progrit', 'トライズ'),
    x('english-company', 'ENGLISH COMPANY', '#1a1a1a', 'englishcompany.jp', 'progrit', 'イングリッシュカンパニー|StudyHacker', 1),
    x('bizmates', 'Bizmates', '#00a0e9', 'bizmates.jp', 'rarejob', 'ビズメイツ'),
    x('qq-english', 'QQ English', '#e60012', 'qqeng.com', 'native-camp', 'QQイングリッシュ|QQEnglish'),
    x('kimini', 'Kimini Eikaiwa', '#f39800', 'kimini.online', 'native-camp', 'Kimini英会話|キミニ英会話'),
    x('world-family', 'World Family', '#0068b7', 'world-family.co.jp', 'shinkenzemi', 'ディズニー英語システム|ワールド・ファミリー|ワールドファミリー', 1),
    x('abceed', 'abceed', '#ff5a00', 'abceed.com', 'study-sapuri', 'エービーシード'),
    x('alc', 'ALC', '#e60012', 'alc.co.jp', 'u-can', 'アルク 英語|株式会社アルク|ヒアリングマラソン|英辞郎|キクタン', 1),
    x('cafetalk', 'Cafetalk', '#f39800', 'cafetalk.com', 'italki', 'カフェトーク'),
    x('seiha', 'Seiha English Academy', '#e60012', 'seiha.com', 'ecc', 'セイハ英語学院'),
    x('peppy-kids', 'Peppy Kids Club', '#e95513', 'peppy-kids.com', 'ecc', 'ペッピーキッズクラブ'),
    x('smaryu', 'Smaryu', '#00a0e9', 'smaryu.com', 'school-with', 'スマ留'),
    x('school-with', 'School With', '#00b4a0', 'schoolwith.me', 'smaryu', 'スクールウィズ', 1),
    x('ryugaku-journal', 'Ryugaku Journal', '#0068b7', 'ryugaku.co.jp', 'smaryu', '留学ジャーナル'),
    x('tech-camp', 'TECH CAMP', '#1a1a1a', 'tech-camp.in', 'techacademy', 'テックキャンプ', 1),
    x('samurai-engineer', 'SAMURAI ENGINEER', '#e60012', 'sejuku.net', 'tech-camp', '侍エンジニア|SAMURAI TERAKOYA|侍テラコヤ'),
    x('codecamp', 'CodeCamp', '#00a0e9', 'codecamp.jp', 'techacademy', 'コードキャンプ'),
    x('runteq', 'RUNTEQ', '#e60012', 'runteq.jp', 'tech-camp'),
    x('raisetech', 'RaiseTech', '#1a1a1a', 'raise-tech.net', 'runteq', 'レイズテック'),
    x('aidemy', 'Aidemy', '#e60012', 'aidemy.net', 'kikagaku', 'アイデミー'),
    x('kikagaku', 'Kikagaku', '#1a1a1a', 'kikagaku.co.jp', 'aidemy', 'キカガク'),
    x('digital-hollywood', 'Digital Hollywood', '#1a1a1a', 'dhw.co.jp dhw.ac.jp', 'human-academy', 'デジタルハリウッド|デジハリ'),
    x('human-academy', 'Human Academy', '#e60012', 'athuman.com', 'u-can', 'ヒューマンアカデミー|たのまな', 1),
    x('litalico', 'LITALICO', '#f08300', 'litalico.jp', 'kumon', 'LITALICOワンダー|リタリコ'),
    x('shelikes', 'SHElikes', '#e95580', 'shelikes.jp', 'techacademy', 'シーライクス'),
    x('daytra', 'Daytra', '#00a0e9', 'daily-trial.com', 'techacademy'),
    x('winschool', 'Winschool', '#0068b7', 'winschool.jp', 'human-academy', 'Winスクール'),
    x('internet-academy', 'Internet Academy', '#e60012', 'internetacademy.jp', 'digital-hollywood', 'インターネット・アカデミー|インターネットアカデミー', 1),
    x('dotinstall', 'Dotinstall', '#1a1a1a', 'dotinstall.com', 'progate', 'ドットインストール'),
    x('schoo', 'Schoo', '#1a1a1a', 'schoo.jp', 'udemy'),
    x('street-academy', 'Street Academy', '#00a0e9', 'street-academy.com', 'udemy', 'ストリートアカデミー|ストアカ講座', 1),
    x('globis', 'GLOBIS', '#003f8e', 'globis.co.jp globis.jp globis.ac.jp', 'schoo', 'グロービス'),
    x('try-group', 'TRY Group', '#e60012', 'trygroup.co.jp try-gakuin.com', 'meiko-gijuku', '家庭教師のトライ|個別教室のトライ|トライ式|トライのオンライン', 1),
    x('meiko-gijuku', 'Meiko Gijuku', '#f8b500', 'meikogijuku.jp', 'try-group', '明光義塾'),
    x('tokyo-kobetsu', 'Tokyo Kobetsu Shido Gakuin', '#00a040', 'kobetsu.co.jp', 'meiko-gijuku', '東京個別指導学院|関西個別指導学院'),
    x('school-ie', 'School IE', '#f39800', 'schoolie-net.jp', 'meiko-gijuku', 'スクールIE'),
    x('axis', 'Kobetsu Shido Axis', '#e60012', 'axis-kobetsu.jp', 'meiko-gijuku', '個別指導Axis', 1),
    x('megasta', 'Megasta', '#e60012', 'online-mega.com', 'try-group', 'オンライン家庭教師メガスタ|メガスタ オンライン'),
    x('kawaijuku', 'Kawaijuku', '#003f8e', 'kawai-juku.ac.jp', 'toshin', '河合塾'),
    x('sundai', 'Sundai', '#0068b7', 'sundai.ac.jp', 'kawaijuku', '駿台予備学校|駿台予備校'),
    x('yozemi', 'Yoyogi Seminar', '#e60012', 'yozemi.ac.jp', 'kawaijuku', '代々木ゼミナール|代ゼミ'),
    x('yotsuya-gakuin', 'Yotsuya Gakuin', '#e95513', 'yotsuyagakuin.com', 'kawaijuku', '四谷学院'),
    x('takeda-juku', 'Takeda Juku', '#e60012', 'takeda.tv', 'toshin', '武田塾', 1),
    x('shuei', 'Shuei Yobiko', '#0068b7', 'shuei-yobiko.co.jp', 'toshin', '秀英予備校'),
    x('nichinoken', 'Nichinoken', '#e60012', 'nichinoken.co.jp', 'yotsuya-otsuka', '日能研'),
    x('yotsuya-otsuka', 'Yotsuya Otsuka', '#0068b7', 'yotsuyaotsuka.com', 'nichinoken', '四谷大塚'),
    x('waseda-academy', 'Waseda Academy', '#8b0000', 'waseda-ac.co.jp', 'nichinoken', '早稲田アカデミー|早稲アカ'),
    x('hamagakuen', 'Hamagakuen', '#003f8e', 'hamagakuen.co.jp', 'nichinoken', '浜学園'),
    x('eikoh', 'Eikoh Seminar', '#e60012', 'eikoh.co.jp eikoh-seminar.com', 'waseda-academy', '栄光ゼミナール'),
    x('rinkai', 'Rinkai Seminar', '#0068b7', 'rinkaiseminar.co.jp', 'eikoh', '臨海セミナー'),
    x('ichishin', 'Ichishin Gakuin', '#e60012', 'ichishin.co.jp', 'eikoh', '市進学院'),
    x('shozemi', 'Shonan Seminar', '#e60012', 'shozemi.com', 'rinkai', '湘南ゼミナール'),
    x('gakken', 'Gakken', '#e60012', 'gakken.co.jp gakken.jp', 'kumon', '学研教室|学研プラス|学研の'),
    x('risu', 'RISU', '#00a0e9', 'risu-japan.com', 'smile-zemi', 'RISU算数|RISUきっず', 1),
    x('surala', 'Surala', '#00a0e9', 'surala.jp', 'smile-zemi', 'すらら'),
    x('popy', 'Popy', '#e95513', 'popy.jp', 'shinkenzemi', '月刊ポピー|小学ポピー|中学ポピー|幼児ポピー', 1),
    x('atama-plus', 'atama plus', '#00a0e9', 'atama.plus', 'study-sapuri', 'atama+'),
    x('tac', 'TAC', '#e60012', 'tac-school.co.jp', 'lec', '資格の学校TAC|TAC株式会社', 1),
    x('lec', 'LEC', '#e60012', 'lec-jp.com', 'tac', 'LEC東京リーガルマインド|東京リーガルマインド', 1),
    x('o-hara', 'O-hara', '#003f8e', 'o-hara.jp o-hara.ac.jp', 'tac', '資格の大原|大原学園', 1),
    x('agaroot', 'Agaroot', '#e60012', 'agaroot.jp', 'studying', 'アガルート'),
    x('studying', 'STUDYing', '#0068b7', 'studying.jp', 'agaroot', 'スタディング', 1),
    x('foresight', 'Foresight', '#f39800', 'foresight.jp', 'studying', '通信講座フォーサイト|フォーサイト 通信講座|資格のフォーサイト', 1),
    x('crear', 'CREAR', '#0068b7', 'crear-ac.co.jp', 'tac', 'クレアール', 1),
    x('itojuku', 'Itojuku', '#e60012', 'itojuku.co.jp', 'lec', '伊藤塾'),
    x('shikaku-square', 'Shikaku Square', '#e95513', 'shikaku-square.com', 'agaroot', '資格スクエア'),
    x('caricare', 'Career College Japan', '#e4007f', 'c-c-j.com', 'u-can', 'キャリカレ|キャリアカレッジジャパン'),
    x('sara-school', 'SARA School', '#e4007f', 'saraschool.net', 'caricare', 'SARAスクール'),
    x('nichii', 'Nichii Gakkan', '#00a040', 'nichiigakkan.co.jp', 'u-can', 'ニチイ学館|ニチイ まなびネット'),
    x('nikken-gakuin', 'Nikken Gakuin', '#0068b7', 'ksknet.co.jp', 'sogo-shikaku', '日建学院'),
    x('sogo-shikaku', 'Sogo Shikaku Gakuin', '#e60012', 'shikaku.co.jp', 'nikken-gakuin', '総合資格学院'),
    x('financial-academy', 'Financial Academy', '#003f8e', 'f-academy.jp', 'gfs', 'ファイナンシャルアカデミー|お金の教養講座', 1),
    x('gfs', 'Global Financial School', '#1a1a1a', 'gfs.tokyo', 'financial-academy', 'グローバルファイナンシャルスクール', 1)
  ]);

  // ---- razors --------------------------------------------------------------

  R.add('razors', [
    x('feather', 'Feather', '#00479d', 'feather.co.jp', 'kai', 'フェザー安全剃刀|フェザー カミソリ|フェザー 替刃|FEATHER 剃刀', 1)
  ]);

  // ---- electronics ---------------------------------------------------------

  R.add('electronics', [
    x('daikin', 'Daikin', '#0097e0', 'daikin.co.jp daikin.com', 'mitsubishi-electric', 'ダイキン|うるさらX|うるるとさらら'),
    x('mitsubishi-electric', 'Mitsubishi Electric', '#e60012', 'mitsubishielectric.co.jp', 'daikin', '三菱電機|霧ヶ峰'),
    x('fujitsu-general', 'Fujitsu General', '#e60012', 'fujitsu-general.com generalww.com', 'daikin', '富士通ゼネラル|ノクリア|nocria|ゼネラル エアコン'),
    x('zojirushi', 'Zojirushi', '#00479d', 'zojirushi.co.jp', 'tiger-corp', '象印マホービン|象印 炊飯器|象印の|炎舞炊き'),
    x('tiger-corp', 'Tiger', '#e60012', 'tiger-corporation.com tiger.jp', 'zojirushi', 'タイガー魔法瓶|タイガー 炊飯器|ご泡火炊き', 1),
    x('twinbird', 'Twinbird', '#1a1a1a', 'twinbird.jp', 'iris-ohyama', 'ツインバード'),
    x('siroca', 'siroca', '#3b3b3b', 'siroca.co.jp', 'balmuda', 'シロカ'),
    x('aladdin', 'Aladdin', '#00693e', 'aladdin-aic.com', 'balmuda', 'アラジン トースター|アラジン グラファイト|アラジン ストーブ', 1),
    x('bruno', 'BRUNO', '#b5121b', 'bruno-inc.com', 'balmuda', 'BRUNO ホットプレート|ブルーノ ホットプレート|コンパクトホットプレート', 1),
    x('recolte', 'recolte', '#b5121b', 'recolte-jp.com', 'bruno', 'レコルト', 1),
    x('plusminuszero', 'PLUS MINUS ZERO', '#8a8d8f', 'plusminuszero.jp', 'balmuda', '±0 家電|プラスマイナスゼロ 加湿器|プラスマイナスゼロ 掃除機|プラスマイナスゼロ 家電'),
    x('maxell', 'Maxell', '#e60012', 'maxell.jp', 'panasonic', 'マクセル'),
    x('tescom', 'TESCOM', '#e4007f', 'tescom-japan.co.jp', 'panasonic', 'テスコム'),
    x('omron', 'Omron', '#005eb8', 'omron.co.jp omron.com', 'tanita', 'オムロン'),
    x('tanita', 'Tanita', '#00479d', 'tanita.co.jp', 'omron', 'タニタ'),
    x('jvckenwood', 'JVCKENWOOD', '#1a1a1a', 'jvckenwood.com kenwood.com', 'sony', 'JVCケンウッド|ケンウッド|ビクター|彩速ナビ'),
    x('audio-technica', 'Audio-Technica', '#1a1a1a', 'audio-technica.co.jp audio-technica.com', 'sony', 'オーディオテクニカ'),
    x('yamaha', 'Yamaha', '#4b1e78', 'yamaha.com', 'sony', 'ヤマハ'),
    x('aviot', 'AVIOT', '#1a1a1a', 'aviot.jp', 'anker', 'アビオット'),
    x('ricoh-imaging', 'Ricoh Imaging', '#c8102e', 'ricoh-imaging.co.jp', 'canon', 'リコーイメージング|PENTAX|ペンタックス|RICOH GR'),
    x('sigma-photo', 'SIGMA', '#1a1a1a', 'sigma-global.com sigma-photo.co.jp', 'tamron', 'シグマ レンズ|SIGMA レンズ|SIGMA fp|SIGMA BF', 1),
    x('tamron', 'Tamron', '#00479d', 'tamron.com tamron.jp', 'sigma-photo', 'タムロン'),
    x('map-camera', 'Map Camera', '#e60012', 'mapcamera.com', 'camera-kitamura', 'マップカメラ'),
    x('camera-kitamura', 'Camera no Kitamura', '#f5c400', 'kitamura.jp', 'map-camera', 'カメラのキタムラ'),
    x('sofmap', 'Sofmap', '#00479d', 'sofmap.com', 'yodobashi', 'ソフマップ'),
    x('kojima-denki', 'Kojima', '#e60012', 'kojima.net', 'ks-denki', 'コジマ×ビックカメラ|コジマネット|コジマ電機', 1),
    x('best-denki', 'Best Denki', '#e60012', 'bestdenki.ne.jp', 'yamada-denki', 'ベスト電器'),
    x('cado', 'cado', '#1a1a1a', 'cado.com', 'balmuda', 'カドー 加湿器|cado 加湿器|カドー 空気清浄機|cado 空気清浄機', 1),
    x('cheero', 'cheero', '#f5c400', 'cheero.net', 'anker', 'チーロ モバイルバッテリー|cheero モバイルバッテリー'),
    x('dainichi', 'Dainichi', '#00479d', 'dainichi-net.co.jp', 'iris-ohyama', 'ダイニチ工業|ダイニチ 加湿器|ダイニチ 石油ファンヒーター', 1),
    x('maxzen', 'MAXZEN', '#1a1a1a', 'maxzen.jp', 'iris-ohyama', 'マクスゼン'),
    x('kenko-tokina', 'Kenko Tokina', '#e60012', 'kenko-tokina.co.jp', 'tamron', 'ケンコー・トキナー|ケンコートキナー')
  ]);

  // ---- computers -----------------------------------------------------------

  R.add('computers', [
    x('elecom', 'ELECOM', '#00479d', 'elecom.co.jp', 'buffalo', 'エレコム'),
    x('buffalo', 'BUFFALO', '#e60012', 'buffalo.jp', 'elecom', 'バッファロー Wi-Fi|バッファロー ルーター|BUFFALO ルーター|AirStation|バッファロー NAS|バッファロー SSD', 1),
    x('io-data', 'I-O DATA', '#00479d', 'iodata.jp', 'buffalo', 'アイ・オー・データ|アイオーデータ|IODATA'),
    x('sanwa-supply', 'Sanwa Supply', '#00479d', 'sanwa.co.jp', 'elecom', 'サンワサプライ|サンワダイレクト', 1),
    x('wacom', 'Wacom', '#1a1a1a', 'wacom.com', 'logitech', 'ワコム|Wacom Cintiq|Wacom Intuos'),
    x('eizo', 'EIZO', '#1a1a1a', 'eizo.co.jp eizoglobal.com', 'dell', 'FlexScan|EIZO モニター'),
    x('dynabook', 'Dynabook', '#00479d', 'dynabook.com', 'fmv', 'ダイナブック'),
    x('kioxia', 'KIOXIA', '#00a0e9', 'kioxia.com', 'buffalo', 'キオクシア'),
    x('tsukumo', 'TSUKUMO', '#e60012', 'tsukumo.co.jp', 'dospara', 'ツクモ パソコン|ツクモ ネットショップ|G-GEAR'),
    x('frontier-pc', 'FRONTIER', '#00479d', 'frontier-direct.jp', 'mouse-computer', 'FRONTIER ゲーミングPC|フロンティア ゲーミングPC|フロンティア BTO|FRONTIERダイレクト', 1),
    x('hhkb', 'HHKB', '#3b3b3b', 'happyhackingkb.com', 'realforce', 'Happy Hacking Keyboard|ハッピーハッキングキーボード'),
    x('realforce', 'REALFORCE', '#1a1a1a', 'realforce.co.jp', 'hhkb', 'リアルフォース|東プレ')
  ]);

  // ---- furniture and home --------------------------------------------------

  R.add('home', [
    x('kohnan', 'Kohnan', '#00479d', 'hc-kohnan.com kohnan-eshop.com', 'cainz', 'コーナン'),
    x('shimachu', 'Shimachu', '#00913a', 'shimachu.co.jp', 'nitori', '島忠ホームズ|シマホ|島忠 家具'),
    x('joyful-honda', 'Joyful Honda', '#e60012', 'joyfulhonda.com', 'cainz', 'ジョイフル本田'),
    x('viva-home', 'Viva Home', '#e60012', 'vivahome.co.jp vivahome.com', 'cainz', 'ビバホーム'),
    x('nafco', 'Nafco', '#00479d', 'nafco.tv', 'komeri', 'ナフコ'),
    x('royal-hc', 'Royal Home Center', '#00913a', 'royal-hc.co.jp', 'kohnan', 'ロイヤルホームセンター'),
    x('monotaro', 'MonotaRO', '#e60012', 'monotaro.com', 'komeri', 'モノタロウ'),
    x('makita', 'Makita', '#008c95', 'makita.co.jp', 'hikoki', 'マキタ'),
    x('hikoki', 'HiKOKI', '#00913a', 'hikoki-powertools.jp', 'makita', 'ハイコーキ'),
    x('karimoku', 'Karimoku', '#5b3a29', 'karimoku.co.jp', 'actus', 'カリモク家具|カリモク60'),
    x('actus', 'ACTUS', '#1a1a1a', 'actus-interior.com', 'karimoku', 'アクタス'),
    x('lowya', 'LOWYA', '#1a1a1a', 'low-ya.com', 'nitori', 'ロウヤ'),
    x('tansu-no-gen', 'Tansu no Gen', '#e60012', 'tansu-gen.jp', 'lowya', 'タンスのゲン'),
    x('receno', 'Re:CENO', '#8a7f72', 'receno.com', 'lowya', 'リセノ'),
    x('flymee', 'FLYMEe', '#1a1a1a', 'flymee.jp', 'lowya', 'フライミー'),
    x('idc-otsuka', 'IDC OTSUKA', '#1f2a44', 'idc-otsuka.jp', 'nitori', '大塚家具'),
    x('tokyo-interior', 'Tokyo Interior', '#e60012', 'tokyointerior.co.jp', 'nitori', '東京インテリア'),
    x('keyuca', 'KEYUCA', '#5b5b5b', 'keyuca.com', 'francfranc', 'ケユカ'),
    x('okamura', 'Okamura', '#00479d', 'okamura.co.jp', 'itoki', 'オカムラ'),
    x('itoki', 'ITOKI', '#00a0e9', 'itoki.jp', 'okamura', 'イトーキ'),
    x('takara-standard', 'Takara Standard', '#e60012', 'takara-standard.co.jp', 'lixil', 'タカラスタンダード'),
    x('cleanup', 'Cleanup', '#00479d', 'cleanup.jp', 'takara-standard', 'クリナップ', 1),
    x('ykk-ap', 'YKK AP', '#00479d', 'ykkap.co.jp', 'lixil', 'YKK AP|ワイケイケイ エーピー', 1),
    x('rinnai', 'Rinnai', '#e60012', 'rinnai.co.jp', 'noritz', 'リンナイ'),
    x('noritz', 'Noritz', '#00479d', 'noritz.co.jp', 'rinnai', 'ノーリツ'),
    x('paloma', 'Paloma', '#00479d', 'paloma.co.jp', 'rinnai', 'パロマ ガスコンロ|パロマ 給湯器|株式会社パロマ', 1),
    x('iwatani', 'Iwatani', '#e60012', 'iwatani.co.jp', 'rinnai', 'イワタニ|岩谷産業|カセットフー'),
    x('vermicular', 'Vermicular', '#3b3b3b', 'vermicular.jp', 'iwatani', 'バーミキュラ'),
    x('yamazaki-jitsugyo', 'Yamazaki Jitsugyo', '#1a1a1a', 'yamajitsu.co.jp', 'muji', '山崎実業'),
    x('yamazen', 'YAMAZEN', '#e60012', 'yamazen.co.jp', 'iris-ohyama', '山善 家電|山善 扇風機|山善 こたつ|山善ビズコム'),
    x('thermos', 'THERMOS', '#00479d', 'thermos.jp', 'zojirushi', 'サーモス 真空断熱|サーモス 水筒|サーモス タンブラー|サーモス フライパン|サーモスの', 1),
    x('unico', 'unico', '#5b3a29', 'unico-fan.co.jp', 'actus', 'unico 家具|ウニコ 家具|unico ソファ|unico公式', 1),
    x('afternoon-tea', 'Afternoon Tea', '#3a7d44', 'afternoon-tea.net', 'francfranc', 'アフタヌーンティー・リビング|Afternoon Tea LIVING|アフタヌーンティー・ティールーム', 1),
    x('asahipen', 'Asahipen', '#e60012', 'asahipen.jp', 'cainz', 'アサヒペン'),
    x('sangetsu', 'Sangetsu', '#1f2a44', 'sangetsu.co.jp', 'lixil', 'サンゲツ')
  ]);

  // ---- property ------------------------------------------------------------

  R.add('realestate', [
    x('mec-residence', 'Mitsubishi Estate Residence', '#e60012', 'mecsumai.com', 'mitsui-fudosan', '三菱地所レジデンス|ザ・パークハウス|三菱地所の住まい'),
    x('nomura-re', 'Nomura Real Estate', '#003f8e', 'nomura-re.co.jp nomu.com proud-web.jp', 'mitsui-fudosan', '野村不動産|ノムコム|プラウドシティ|Nomura Real Estate', 1),
    x('tokyu-livable', 'Tokyu Livable', '#00693e', 'livable.co.jp', 'mitsui-fudosan', '東急リバブル', 1),
    x('tokyu-land', 'Tokyu Land', '#00693e', 'tokyu-land.co.jp', 'mec-residence', '東急不動産|ブランズシティ|BRANZ'),
    x('tokyo-tatemono', 'Tokyo Tatemono', '#003f8e', 'tatemono.com brillia.com', 'mec-residence', '東京建物|Brillia'),
    x('daikyo', 'Daikyo', '#e60012', 'daikyo.co.jp', 'haseko', 'ライオンズマンション|株式会社大京|大京アステージ'),
    x('haseko', 'Haseko', '#00693e', 'haseko.co.jp', 'daikyo', '長谷工'),
    x('pressance', 'Pressance', '#8b0000', 'pressance.co.jp', 'haseko', 'プレサンスコーポレーション|プレサンス ロジェ|プレサンス'),
    x('cosmos-initia', 'Cosmos Initia', '#00a0e9', 'cigr.co.jp', 'haseko', 'コスモスイニシア'),
    x('kintetsu-re', 'Kintetsu Real Estate', '#e60012', 'kintetsu-re.co.jp', 'haseko', '近鉄不動産|ローレルコート'),
    x('hankyu-hanshin-re', 'Hankyu Hanshin Properties', '#7b2d26', 'hhp.co.jp', 'kintetsu-re', '阪急阪神不動産'),
    x('nskre', 'Nippon Steel Kowa Real Estate', '#003f8e', 'nskre.co.jp', 'mec-residence', '日鉄興和不動産|リビオシティ'),
    x('century21-japan', 'Century 21 Japan', '#beaf87', 'century21.jp', 'apamanshop', 'センチュリー21', 1),
    x('pitat-house', 'Pitat House', '#00a040', 'pitat.com', 'apamanshop', 'ピタットハウス'),
    x('minimini', 'Mini Mini', '#e60012', 'minimini.jp', 'apamanshop', 'お部屋探しはミニミニ|ミニミニ 賃貸|賃貸のミニミニ', 1),
    x('housemate', 'House Mate', '#0068b7', 'housemate.co.jp', 'able', 'ハウスメイト', 1),
    x('village-house', 'Village House', '#00a040', 'villagehouse.jp', 'leopalace', 'ビレッジハウス', 1),
    x('token', 'Token Corporation', '#00693e', 'token.co.jp homemate.co.jp', 'daito', '東建コーポレーション|ホームメイト', 1),
    x('ki-star', 'KI-Star Real Estate', '#e60012', 'ki-group.co.jp', 'open-house', 'ケイアイスター不動産'),
    x('jutaku-johokan', 'Jutaku Johokan', '#e95513', 'jutakujohokan.co.jp', 'open-house', '住宅情報館'),
    x('katitas', 'KATITAS', '#e60012', 'katitas.jp', 'open-house', 'カチタス'),
    x('renoveru', 'Renoveru', '#1a1a1a', 'renoveru.jp', 'katitas', 'リノベる'),
    x('shinoken', 'Shinoken', '#003f8e', 'shinoken.co.jp', 'daito', 'シノケン'),
    x('fj-next', 'FJ Next', '#003f8e', 'fjnext.com', 'shinoken', 'FJネクスト|ガーラマンション'),
    x('smocca', 'Smocca', '#f39800', 'smocca.jp', 'suumo', 'スモッカ'),
    x('door-chintai', 'DOOR Chintai', '#e95513', 'door.ac', 'suumo', 'DOOR賃貸', 1),
    x('yahoo-fudosan', 'Yahoo! Real Estate', '#ff0033', 'realestate.yahoo.co.jp', 'suumo', 'Yahoo!不動産|ヤフー不動産', 1),
    x('goodrooms', 'goodroom', '#1a1a1a', 'goodrooms.jp', 'suumo', 'グッドルーム'),
    x('oakhouse', 'Oakhouse', '#8fc31f', 'oakhouse.jp', 'leopalace', 'オークハウス'),
    x('ieagent', 'Ieagent', '#f39800', 'ieagent.jp', 'suumo', 'イエプラ'),
    x('airdoor', 'Airdoor', '#00b4a0', 'airdoor.jp', 'suumo', 'エアドア'),
    x('oheyago', 'OHEYAGO', '#00a0e9', 'oheyago.jp', 'suumo', 'オヘヤゴー'),
    x('ielove', 'Ielove', '#e95513', 'ielove.co.jp', 'athome', 'いえらぶ'),
    x('town-life', 'Town Life', '#00a040', 'town-life.jp', 'suumo', 'タウンライフ家づくり|タウンライフ', 1),
    x('home4u', 'HOME4U', '#e95513', 'home4u.jp', 'ieul', 'ホームフォーユー'),
    x('ieul', 'Ieul', '#00a0e9', 'ieul.jp', 'home4u', 'イエウール'),
    x('sumai-step', 'Sumai Step', '#00a040', 'sumai-step.com', 'ieul', 'すまいステップ'),
    x('homepro', 'HomePro', '#e95513', 'homepro.jp', 'rehome-navi', 'ホームプロ リフォーム|リフォーム会社紹介ホームプロ|リフォームのホームプロ', 1),
    x('rehome-navi', 'Reshop Navi', '#00a0e9', 'rehome-navi.com', 'homepro', 'リショップナビ'),
    x('nuri-kae', 'Nurikae', '#f39800', 'nuri-kae.jp', 'rehome-navi', 'ヌリカエ'),
    x('sumitomo-forestry', 'Sumitomo Forestry', '#00693e', 'sfc.jp', 'sekisui-house', '住友林業'),
    x('misawa-home', 'Misawa Homes', '#e60012', 'misawa.co.jp', 'sekisui-heim', 'ミサワホーム'),
    x('toyota-home', 'Toyota Home', '#eb0a1e', 'toyotahome.co.jp', 'misawa-home', 'トヨタホーム'),
    x('mitsui-home', 'Mitsui Home', '#00693e', 'mitsuihome.co.jp', 'sumitomo-forestry', '三井ホーム'),
    x('sekisui-heim', 'Sekisui Heim', '#0068b7', 'sekisuiheim.com', 'misawa-home', 'セキスイハイム'),
    x('tama-home', 'Tama Home', '#e60012', 'tamahome.jp', 'ichijo', 'タマホーム'),
    x('ichijo', 'Ichijo', '#00693e', 'ichijo.co.jp', 'tama-home', '一条工務店', 1),
    x('sweden-house', 'Sweden House', '#005b99', 'swedenhouse.co.jp', 'ichijo', 'スウェーデンハウス', 1),
    x('aqura-home', 'Aqura Home', '#e95513', 'aqura.co.jp', 'tama-home', 'アキュラホーム'),
    x('eyeful-home', 'Eyeful Home', '#e60012', 'eyefulhome.jp', 'tama-home', 'アイフルホーム'),
    x('universal-home', 'Universal Home', '#00693e', 'universalhome.co.jp', 'tama-home', 'ユニバーサルホーム', 1),
    x('cleverly-home', 'Cleverly Home', '#8b0000', 'cleverlyhome.com', 'aqura-home', 'クレバリーホーム'),
    x('hinokiya', 'Hinokiya', '#00693e', 'hinokiya.jp', 'ichijo', '桧家住宅|ヒノキヤグループ'),
    x('aida-sekkei', 'Aida Sekkei', '#e60012', 'aidagroup.co.jp', 'tama-home', 'アイダ設計')
  ]);

  // ---- job sites -----------------------------------------------------------

  R.add('jobs', [
    x('green-tenshoku', 'Green', '#00b050', 'green-japan.com', 'wantedly', '転職サイトGreen|Green転職|IT転職ならGreen', 1),
    x('type-tenshoku', 'type', '#e60012', 'type.jp', 'en-tenshoku', 'type転職エージェント|女の転職type|転職サイトtype|type転職', 1),
    x('jac', 'JAC Recruitment', '#003f8e', 'jac-recruitment.jp', 'bizreach', 'JACリクルートメント'),
    x('pasona', 'Pasona', '#e60012', 'pasona.co.jp pasonacareer.jp', 'recruit-agent', 'パソナキャリア|パソナグループ|株式会社パソナ'),
    x('tempstaff', 'Tempstaff', '#0068b7', 'tempstaff.co.jp', 'staff-service', 'テンプスタッフ|パーソルテンプスタッフ'),
    x('recruit-staffing', 'Recruit Staffing', '#0aa5e0', 'r-staffing.co.jp', 'tempstaff', 'リクルートスタッフィング'),
    x('staff-service', 'Staff Service', '#e60012', 'staffservice.co.jp 022022.net', 'tempstaff', 'スタッフサービス|オー人事', 1),
    x('hatarako', 'Hatarako Net', '#f39800', 'hatarako.net', 'tempstaff', 'はたらこねっと'),
    x('kyujin-box', 'Kyujin Box', '#f08300', 'xn--pckua2a7gp15o89zb.com kyujinbox.com', 'indeed', '求人ボックス'),
    x('stanby', 'Stanby', '#0b5fff', 'stanby.com', 'kyujin-box', '求人検索スタンバイ|スタンバイ 求人|仕事探しはスタンバイ', 1),
    x('career-index', 'CAREER INDEX', '#e60012', 'careerindex.jp', 'indeed', 'キャリアインデックス', 1),
    x('shotworks', 'Shotworks', '#e60012', 'shotworks.jp', 'timee', 'ショットワークス'),
    x('sharefull', 'Sharefull', '#00b4a0', 'sharefull.com', 'timee', 'シェアフル'),
    x('arubaito-ex', 'Arubaito EX', '#e95513', 'arubaito-ex.jp', 'baitoru', 'アルバイトEX'),
    x('froma', 'From A navi', '#e60012', 'froma.com', 'townwork', 'フロムエーナビ|フロム・エー|フロムエー'),
    x('mach-baito', 'Mach Baito', '#e60012', 'j-sen.jp machbaito.jp', 'baitoru', 'マッハバイト'),
    x('shufu-job', 'Shufu JOB', '#e4007f', 'shufu-job.jp', 'townwork', 'しゅふJOB'),
    x('job-medley', 'Job Medley', '#0aa5e0', 'job-medley.com', 'mynavi', 'ジョブメドレー'),
    x('levwell', 'Levwell', '#e95580', 'kango-oshigoto.jp', 'nurse-jinzai-bank', 'レバウェル看護|レバウェル介護|看護のお仕事|レバウェル'),
    x('nurse-jinzai-bank', 'Nurse Senka', '#e4007f', 'nursejinzaibank.com nurse-senka.com', 'levwell', 'ナース専科|ナース人材バンク'),
    x('kango-roo', 'Kango roo!', '#e95580', 'kango-roo.com', 'levwell', '看護roo|看護ルー'),
    x('kaigo-job', 'Kaigo Job', '#00a040', 'kaigojob.com', 'kaigo-batake', 'カイゴジョブ'),
    x('kaigo-batake', 'Kaigo Batake', '#8fc31f', 'kaigobatake.jp', 'kaigo-job', 'かいご畑'),
    x('pharma-staff', 'Pharma Staff', '#00a0e9', '38-8931.com', 'job-medley', 'ファルマスタッフ'),
    x('m3-career', 'M3 Career', '#003f8e', 'm3career.com', 'job-medley', 'エムスリーキャリア'),
    x('hoikushi-bank', 'Hoikushi Bank', '#f39800', 'hoikushibank.com', 'job-medley', '保育士バンク'),
    x('geekly', 'Geekly', '#e60012', 'geekly.co.jp', 'levtech', 'ギークリー'),
    x('findy', 'Findy', '#1a1a1a', 'findy-code.io', 'levtech', 'ファインディ'),
    x('paiza', 'paiza', '#17a2b8', 'paiza.jp', 'levtech'),
    x('workport', 'Workport', '#e60012', 'workport.co.jp', 'doda', 'ワークポート'),
    x('lancers', 'Lancers', '#0b3b8c', 'lancers.jp', 'crowdworks', 'ランサーズ|Lancers.jp', 1),
    x('crowdworks', 'CrowdWorks', '#3c8dbc', 'crowdworks.jp', 'lancers', 'クラウドワークス'),
    x('coconala', 'coconala', '#1a1a1a', 'coconala.com', 'crowdworks', 'ココナラ'),
    x('midworks', 'Midworks', '#00a0e9', 'mid-works.com', 'levtech', 'ミッドワークス'),
    x('it-propartners', 'IT Propartners', '#e95513', 'itpropartners.com', 'levtech', 'ITプロパートナーズ'),
    x('pe-bank', 'PE-BANK', '#003f8e', 'pe-bank.jp', 'levtech', 'PEバンク'),
    x('geechs-job', 'geechs job', '#e60012', 'geechs-job.com', 'levtech', 'ギークスジョブ'),
    x('en-world', 'en world', '#003f8e', 'enworld.com', 'jac', 'エンワールド', 1),
    x('hataractive', 'Hataractive', '#f39800', 'hataractive.jp', 'mynavi', 'ハタラクティブ'),
    x('uzuz', 'UZUZ', '#e60012', 'uzuz.jp', 'hataractive', 'ウズキャリ|第二新卒エージェントUZUZ'),
    x('jaic', 'JAIC', '#e95513', 'jaic-college.jp', 'hataractive', 'ジェイック|就職カレッジ', 1),
    x('neo-career', 'Daini Shinsotsu Agent neo', '#00a0e9', 'daini-agent.jp', 'hataractive', '第二新卒エージェントneo'),
    x('one-career', 'ONE CAREER', '#1a1a1a', 'onecareer.jp', 'mynavi', 'ワンキャリア', 1),
    x('offerbox', 'OfferBox', '#00a0e9', 'offerbox.jp', 'one-career', 'オファーボックス'),
    x('kimisuka', 'Kimisuka', '#e95513', 'kimisuka.com', 'offerbox', 'キミスカ'),
    x('career-tasu', 'Career-tasu', '#e60012', 'career-tasu.jp', 'rikunabi', 'キャリタス就活|キャリタス'),
    x('gakujo', 'Re就活', '#e60012', 're-katsu.jp gakujo.ne.jp', 'mynavi', 'あさがくナビ|株式会社学情|Re就活キャンパス'),
    x('unistyle', 'unistyle', '#003f8e', 'unistyleinc.com', 'one-career', 'ユニスタイル', 1),
    x('gaishi-shukatsu', 'Gaishi Shukatsu', '#1a1a1a', 'gaishishukatsu.com', 'one-career', '外資就活ドットコム|外資就活'),
    x('syukatsu-kaigi', 'Shukatsu Kaigi', '#00a0e9', 'syukatsu-kaigi.jp', 'one-career', '就活会議'),
    x('career-ticket', 'Career Ticket', '#e95513', 'careerticket.jp', 'offerbox', 'キャリアチケット', 1),
    x('tenshoku-kaigi', 'Tenshoku Kaigi', '#0068b7', 'jobtalk.jp', 'openwork', '転職会議'),
    x('miidas', 'MIIDAS', '#1a1a1a', 'miidas.jp', 'bizreach', 'ミイダス'),
    x('youtrust', 'YOUTRUST', '#1a1a1a', 'youtrust.jp', 'wantedly', 'ユートラスト'),
    x('lapras', 'LAPRAS', '#1a1a1a', 'lapras.com', 'findy'),
    x('tenshoku-draft', 'Tenshoku Draft', '#e60012', 'job-draft.jp', 'findy', '転職ドラフト'),
    x('posiwill', 'POSIWILL CAREER', '#1a1a1a', 'posiwill.jp', 'bizreach', 'ポジウィルキャリア|ポジウィル'),
    x('kojo-works', 'Kojo Works', '#e95513', '04510.jp', 'jobcon-plus', '工場ワークス'),
    x('kojo-kyujin-navi', 'Kojo Kyujin Navi', '#0068b7', '717450.net', 'kojo-works', '工場求人ナビ|日総工産'),
    x('jobcon-plus', 'Jobcon Plus', '#e60012', 'job-con.jp', 'kojo-works', 'ジョブコンプラス'),
    x('doraever', 'Dora EVER', '#e60012', 'doraever.jp', 'kojo-works', 'ドラEVER|ドラエバー'),
    x('jobhouse', 'JOBHOUSE', '#f39800', 'jobhouse.jp', 'kojo-works', 'ジョブハウス', 1)
  ]);

  // ---- cosmetics -----------------------------------------------------------

  R.add('beauty', [
    x('mandom', 'Mandom', '#1a1a1a', 'mandom.co.jp', 'kao', 'マンダム|ギャツビー|ルシード|ビフェスタ'),
    x('kracie', 'Kracie', '#e60012', 'kracie.co.jp', 'kao', 'クラシエ|いち髪|肌美精|ディアボーテ|ねるねるねるね'),
    x('sunstar', 'Sunstar', '#00479d', 'sunstar.com', 'lion', 'サンスター|オーラツー|Ora2|G・U・M|緑でサラナ'),
    x('apagard', 'APAGARD', '#00479d', 'sangi-co.com', 'lion', 'アパガード|リナメル'),
    x('cow-brand', 'Cow Brand Soap', '#e60012', 'cow-soap.co.jp', 'kao', '牛乳石鹸|カウブランド|バウンシア'),
    x('fine-today', 'Fine Today', '#e60012', 'finetoday.com', 'kao', 'ファイントゥデイ|TSUBAKI|フィーノ ヘアマスク|fino ヘアマスク|シーブリーズ|専科 パーフェクトホイップ', 1),
    x('hoyu', 'hoyu', '#00479d', 'hoyu.co.jp', 'rishiri', 'ホーユー|ビゲン|シエロ ヘアカラー|メンズビゲン'),
    x('rishiri', 'Sastty', '#1f4e3d', 'sastty.com', 'hoyu', '利尻ヘアカラートリートメント|利尻カラーシャンプー'),
    x('milbon', 'Milbon', '#1a1a1a', 'milbon.co.jp milbon.com', 'shiseido', 'ミルボン|オージュア'),
    x('naris', 'Naris Cosmetics', '#e4007f', 'naris.co.jp', 'pola', 'ナリス化粧品'),
    x('noevir', 'Noevir', '#00479d', 'noevir.co.jp', 'pola', 'ノエビア'),
    x('menard', 'Menard', '#b5121b', 'menard.co.jp', 'pola', 'メナード', 1),
    x('albion', 'ALBION', '#1a1a1a', 'albion.co.jp', 'kose', 'アルビオン|薬用スキンコンディショナー', 1),
    x('attenir', 'Attenir', '#b8860b', 'attenir.co.jp', 'orbis', 'アテニア'),
    x('ci-labo', 'Dr.Ci:Labo', '#00a0e9', 'ci-labo.com', 'fancl', 'ドクターシーラボ|アクアコラーゲンゲル'),
    x('perfect-one', 'Perfect One', '#b8860b', 'shinnihonseiyaku.co.jp', 'ci-labo', 'パーフェクトワン|新日本製薬', 1),
    x('domohorn-wrinkle', 'Domohorn Wrinkle', '#b5121b', 'saishunkan.co.jp', 'pola', 'ドモホルンリンクル|再春館製薬所'),
    x('mediplus', 'Mediplus', '#f08300', 'mediplus-orders.jp', 'ci-labo', 'メディプラスゲル|メディプラス', 1),
    x('etvos', 'ETVOS', '#8a7f72', 'etvos.com', 'orbis', 'エトヴォス'),
    x('decencia', 'DECENCIA', '#b5121b', 'decencia.co.jp', 'orbis', 'ディセンシア|アヤナス', 1),
    x('haba', 'HABA', '#00479d', 'haba.co.jp', 'fancl', 'ハーバー研究所|HABA スクワラン|ハーバー スクワラン', 1),
    x('bglen', 'b.glen', '#00479d', 'bglen.net', 'orbis', 'ビーグレン'),
    x('macchia-label', 'Macchia Label', '#e4007f', 'macchialabel.com', 'orbis', 'マキアレイベル|薬用クリアエステヴェール'),
    x('vernal', 'VERNAL', '#00913a', 'vernal.co.jp', 'dhc', 'ヴァーナル', 1),
    x('rice-force', 'RICE FORCE', '#1f2a44', 'riceforce.com', 'sk-ii', 'ライスフォース'),
    x('coyori', 'Coyori', '#b8860b', 'coyori.com', 'domohorn-wrinkle', 'こより 美容液オイル|Coyori 美容液オイル'),
    x('duo-cleansing', 'DUO', '#1a1a1a', 'duo.jp p-antiaging.com p-antiaging.co.jp', 'manara', 'デュオ ザ クレンジングバーム|DUO クレンジングバーム|ザ クレンジングバーム|プレミアアンチエイジング|カナデル', 1),
    x('manara', 'MANARA', '#f08300', 'manara.jp', 'duo-cleansing', 'マナラ ホットクレンジング|マナラ化粧品|ホットクレンジングゲル'),
    x('chifure', 'CHIFURE', '#00479d', 'chifure.co.jp', 'cezanne', 'ちふれ'),
    x('cezanne', 'CEZANNE', '#e4007f', 'cezanne.co.jp', 'canmake', 'セザンヌ化粧品|セザンヌ コスメ|CEZANNE コスメ|セザンヌ パールグロウ', 1),
    x('canmake', 'CANMAKE', '#e4007f', 'canmake.com', 'cezanne', 'キャンメイク'),
    x('isehan', 'KISSME', '#e4007f', 'isehan.co.jp', 'canmake', '伊勢半|ヒロインメイク|キスミー フェルム', 1),
    x('ettusais', 'ettusais', '#e4007f', 'ettusais.co.jp', 'canmake', 'エテュセ'),
    x('koji-honpo', 'KOJI', '#e4007f', 'koji-honpo.co.jp', 'd-up', 'コージー本舗|ドーリーウインク|アイトーク', 1),
    x('d-up', 'D-UP', '#1a1a1a', 'd-up.co.jp', 'koji-honpo', 'ディーアップ', 1),
    x('rmk', 'RMK', '#1a1a1a', 'rmkrmk.com', 'suqqu', 'RMK ファンデーション|RMK メイクアップ|RMK コスメ', 1),
    x('suqqu', 'SUQQU', '#1a1a1a', 'suqqu.com', 'rmk', 'スック コスメ|SUQQU コスメ'),
    x('three-cosmetics', 'THREE', '#1a1a1a', 'threecosmetics.com', 'shiro', 'THREE コスメ|THREE スキンケア|THREE バランシング', 1),
    x('shiro', 'SHIRO', '#1a1a1a', 'shiro-shiro.jp', 'three-cosmetics', 'SHIRO サボン|SHIRO ホワイトリリー|SHIRO フレグランス|SHIRO オードパルファン', 1),
    x('lululun', 'LuLuLun', '#e4007f', 'lululun.com', 'kose', 'ルルルン'),
    x('scalp-d', 'Scalp D', '#1a1a1a', 'scalp-d.com angfa.jp', 'bulk-homme', 'スカルプD|アンファー'),
    x('bulk-homme', 'BULK HOMME', '#1a1a1a', 'bulk.co.jp', 'scalp-d', 'バルクオム|BULK HOMME', 1),
    x('chapup', 'CHAP UP', '#00479d', 'chapup.jp', 'scalp-d', 'チャップアップ', 1),
    x('newmo', 'NEWMO', '#f5c400', 'tamagokichi.com', 'chapup', 'ニューモ 育毛剤|ニューモ育毛剤|タマゴ基地', 1),
    x('haru-kurokami', 'haru', '#3a7d44', 'haru-shop.jp', 'botanist', 'haru kurokami|kurokamiスカルプ|haru 黒髪スカルプ|haru シャンプー', 1),
    x('kinujo', 'KINUJO', '#e4007f', 'kinujo.jp', 'refa', 'KINUJO ドライヤー|絹女 KINUJO|絹女 ドライヤー|キヌージョ'),
    x('refa', 'ReFa', '#1a1a1a', 'refa.net mtg.gr.jp', 'ya-man', 'リファ ファインバブル|リファ ドライヤー|リファカラット|リファ シャワーヘッド|リファ ビューテック|SIXPAD|シックスパッド'),
    x('ya-man', 'YA-MAN', '#b5121b', 'ya-man.com', 'refa', 'ヤーマン'),
    x('tokiwa-pharma', 'Tokiwa Pharmaceutical', '#e60012', 'tokiwayakuhin.co.jp', 'rohto', '常盤薬品|なめらか本舗|眠眠打破|南天のど飴'),
    x('seikatsu-no-ki', 'Tree of Life', '#3a7d44', 'treeoflife.co.jp', 'the-body-shop', '生活の木', 1),
    x('simius', 'SIMIUS', '#b8860b', 'simius.tokyo mebiusseiyaku.co.jp', 'perfect-one', 'シミウス|メビウス製薬'),
    x('naturelab', 'NatureLab', '#3a7d44', 'naturelab.co.jp', 'botanist', 'ネイチャーラボ|モイスト・ダイアン|Moist Diane|ダイアン パーフェクトビューティ|ラボン 柔軟剤|MARO17'),
    x('andhoney', '&honey', '#f5a200', 'andhoney.jp', 'botanist', 'アンドハニー|&honey ディープモイスト|&honey シャンプー', 1),
    x('medulla', 'MEDULLA', '#1a1a1a', 'medulla.co.jp', 'botanist', 'メデュラ', 1),
    x('kaminomoto', 'Kaminomoto', '#00693e', 'kaminomoto.co.jp', 'scalp-d', '加美乃素'),
    x('uzu', 'UZU BY FLOWFUSHI', '#1a1a1a', 'uzu.team', 'canmake', 'UZU アイオープニングライナー|フローフシ|モテマスカラ|モテライナー'),
    x('phoebe', 'PHOEBE BEAUTY UP', '#e4007f', 'phoebebeautyup.com', 'd-up', 'フィービービューティーアップ|PHOEBE アイラッシュセラム|PHOEBE まつげ美容液'),
    x('yojiya', 'Yojiya', '#1a1a1a', 'yojiya.co.jp', 'the-body-shop', 'よーじや')
  ]);

  // ---- supplements ---------------------------------------------------------

  R.add('supplements', [
    x('egao', 'Egao', '#f08300', '241241.jp', 'yazuya', 'えがおの黒酢|えがおの鮫珠|株式会社えがお|えがおの青汁'),
    x('sun-chlorella', 'Sun Chlorella', '#00913a', 'sunchlorella.co.jp sunchlorella.com', 'kyusai', 'サン・クロレラ|サンクロレラ'),
    x('euglena', 'euglena', '#00913a', 'euglena.jp', 'kyusai', 'ユーグレナ', 1),
    x('yamada-bee-farm', 'Yamada Bee Farm', '#f5a200', '3838.com', 'yazuya', '山田養蜂場'),
    x('kenkoukazoku', 'Kenkou Kazoku', '#e60012', 'kenkoukazoku.co.jp', 'yazuya', '健康家族|伝統にんにく卵黄'),
    x('wakasa-seikatsu', 'Wakasa Seikatsu', '#4b1e78', 'wakasa.jp', 'suntory-wellness', 'わかさ生活|ブルーベリーアイ'),
    x('everlife', 'Everlife', '#b8860b', 'everlife.jp', 'suntory-wellness', 'エバーライフ|皇潤プレミアム|皇潤極', 1),
    x('manda-koso', 'Manda Koso', '#b8860b', 'manda.co.jp', 'yazuya', '万田酵素'),
    x('kitanotatsujin', 'Kita no Kaiteki Kobo', '#00479d', 'kitanotatsujin.com', 'yazuya', '北の快適工房|カイテキオリゴ|北の達人'),
    x('morishita-jintan', 'Morishita Jintan', '#00479d', 'jintan.co.jp', 'yakult', '森下仁丹|ビフィーナ'),
    x('orihiro', 'ORIHIRO', '#00913a', 'orihiro.com', 'itoh-kanpo', 'オリヒロ'),
    x('itoh-kanpo', 'Itoh Kanpo', '#00479d', 'itohkampo.co.jp', 'orihiro', '井藤漢方'),
    x('nippi-collagen', 'Nippi Collagen', '#e4007f', 'nip-col.jp', 'suntory-wellness', 'ニッピコラーゲン'),
    x('be-legend', 'be LEGEND', '#e60012', 'belegend.jp', 'myprotein', 'ビーレジェンド'),
    x('valx', 'VALX', '#1a1a1a', 'valx.jp', 'myprotein', 'バルクス プロテイン|VALX プロテイン'),
    x('kentai', 'Kentai', '#e60012', 'kentai.co.jp', 'be-legend', 'ケンタイ プロテイン|健康体力研究所'),
    x('x-plosion', 'X-PLOSION', '#1a1a1a', 'x-plosion.jp', 'be-legend', 'エクスプロージョン プロテイン|X-PLOSION プロテイン'),
    x('grong', 'GronG', '#00913a', 'grong.jp', 'myprotein', 'グロング'),
    x('alpron', 'ALPRON', '#e60012', 'alpron.co.jp', 'be-legend', 'アルプロン'),
    x('dns-protein', 'DNS', '#1a1a1a', 'dnszone.jp', 'valx', 'DNS プロテイン|DNS ホエイ', 1),
    x('asahi-ryokuken', 'Asahi Ryokuken', '#00913a', 'asahi-ryokuken.co.jp', 'kyusai', 'アサヒ緑健|緑効青汁'),
    x('shizen-shokken', 'Shizen Shokken', '#1f4e3d', 'sizenshokken.co.jp', 'yazuya', '自然食研|しじみ習慣'),
    x('lypo-c', 'Lypo-C', '#f08300', 'lypo-c.shop lypo-c.jp', 'orihiro', 'リポ・カプセル|リポカプセル ビタミンC'),
    x('fujimi', 'FUJIMI', '#e4007f', 'fujimi.me', 'be-legend', 'FUJIMI プロテイン|FUJIMI サプリ|フジミ プロテイン|フジミ サプリ', 1)
  ]);

  // ---- cosmetic clinics ----------------------------------------------------

  R.add('clinics', [
    x('takasu', 'Takasu Clinic', '#003f8e', 'takasu.co.jp', '', '高須クリニック'),
    x('shiromoto', 'Shiromoto Clinic', '#003f8e', 'shiromoto.to', '', '城本クリニック'),
    x('otsuka-biyo', 'Otsuka Cosmetic Surgery', '#e95580', 'otsuka-biyo.co.jp', '', '大塚美容形成外科'),
    x('seishin', 'Seishin Cosmetic Clinic', '#8b6f3e', 'biyougeka.com', '', '聖心美容クリニック'),
    x('kyoritsu-biyo', 'Kyoritsu Cosmetic Surgery', '#e95580', 'kyoritsu-biyo.com', '', '共立美容外科'),
    x('tokyo-biyou-geka', 'Tokyo Biyou Geka', '#003f8e', 'tkc110.jp', '', '東京美容外科'),
    x('mizunomori', 'Mizunomori Clinic', '#00a0e9', 'mizunomori.com', '', '水の森美容クリニック|水の森美容外科'),
    x('mods-clinic', 'Mods Clinic', '#1a1a1a', 'mods-clinic.com', '', 'モッズクリニック'),
    x('tokyo-isea', 'Tokyo ISEA Clinic', '#e95580', 'tokyoisea.com', '', '東京イセアクリニック'),
    x('ta-clinic', 'TA Clinic', '#1a1a1a', 'taclinic.jp', '', 'TAクリニック', 1),
    x('ozaki-clinic', 'Ozaki Clinic', '#e95580', 'ozaki-clinic.com', '', 'オザキクリニック'),
    x('verite', 'Verite Clinic', '#8b6f3e', 'veriteclinic.or.jp', '', 'ヴェリテクリニック'),
    x('shirono', 'Shirono Clinic', '#e95580', 'shirono.net', '', 'シロノクリニック'),
    x('ginza-yoshie', 'Ginza Yoshie Clinic', '#e95580', 'ginzabiyou.com', '', '銀座よしえクリニック'),
    x('lucia-clinic', 'Lucia Clinic', '#e95580', 'lucia-c.com', '', 'ルシアクリニック'),
    x('dio-clinic', 'Dio Clinic', '#00a0e9', 'dioclinic.jp', '', 'ディオクリニック'),
    x('stlassh', 'STLASSH', '#e95580', 'stlassh.com', '', 'ストラッシュ'),
    x('koi-hada', 'Koihada', '#e95580', 'koi-hada.jp', '', '脱毛サロン恋肌|恋肌（こいはだ）'),
    x('lacoco', 'LACOCO', '#e95580', 'la-coco.com', '', '脱毛ラココ|脱毛サロン ラココ'),
    x('mens-rize', 'Mens Rize', '#003f8e', 'mens-rize.com', '', 'メンズリゼ'),
    x('mens-eminal', 'Mens Eminal', '#003f8e', 'mens-eminal.jp', '', 'メンズエミナル'),
    x('tbc', 'TBC', '#e60012', 'tbc.co.jp', '', "エステティックTBC|メンズTBC|MEN'S TBC", 1),
    x('dandy-house', 'Dandy House', '#1a1a1a', 'dandy-house.co.jp miss-paris.co.jp', '', 'ダンディハウス|ミス・パリ|ミスパリ'),
    x('elleseine', 'Elleseine', '#e95580', 'elleseine.co.jp', '', 'エルセーヌ'),
    x('takano-yuri', 'Takano Yuri Beauty Clinic', '#e95580', 'takanoyuri.com', '', 'たかの友梨'),
    x('slim-beauty-house', 'Slim Beauty House', '#e95580', 'slim.co.jp', '', 'スリムビューティハウス', 1),
    x('j-esthe', 'J Esthetic', '#e95580', 'j-esthe.com', '', 'ジェイエステ'),
    x('d-clinic', 'D Clinic', '#003f8e', 'd-clinicgroup.jp', '', 'Dクリニック', 1),
    x('east-ekimae', 'East Ekimae Clinic', '#0068b7', 'eastcl.com', '', 'イースト駅前クリニック'),
    x('hama1', 'Hamamatsucho Daiichi Clinic', '#0068b7', 'hama1-cl.jp', '', '浜松町第一クリニック'),
    x('iland-tower', 'Iland Tower Clinic', '#003f8e', 'ilandtower-clinic.com', '', 'アイランドタワークリニック'),
    x('shinwa-clinic', 'Shinwa Clinic', '#003f8e', 'shinwa-clinic.jp', '', '親和クリニック'),
    x('aderans', 'Aderans', '#e60012', 'aderans.co.jp', '', 'アデランス'),
    x('artnature', 'Art Nature', '#00693e', 'artnature.co.jp', '', 'アートネイチャー'),
    x('reve21', 'Reve21', '#e60012', 'reve21.co.jp', '', 'リーブ21'),
    x('svenson', 'Svenson', '#003f8e', 'svenson.co.jp', '', 'スヴェンソン', 1),
    x('levcli', 'Levcli', '#00a0e9', 'levcli.jp', '', 'レバクリ'),
    x('elife', 'eLife', '#00b4a0', 'elife.clinic', '', 'eLife（イーライフ）|イーライフ オンライン診療', 1),
    x('kireilign', 'Kireilign', '#e95580', 'kireilign.com', '', 'キレイライン矯正|キレイライン'),
    x('oh-my-teeth', 'Oh my teeth', '#1a1a1a', 'oh-my-teeth.com'),
    x('white-essence', 'White Essence', '#00a0e9', 'whiteessence.com', '', 'ホワイトエッセンス', 1),
    x('hanaravi', 'hanaravi', '#e95580', 'hanaravi.jp', '', 'ハナラビ'),
    x('star-whitening', 'Star Whitening', '#f8b500', 'starwhitening.jp', '', 'スターホワイトニング', 1),
    x('shinagawa-lasik', 'Shinagawa LASIK Center', '#0068b7', 'shinagawa-lasik.com', '', '品川近視クリニック'),
    x('ueno-clinic', 'Ueno Clinic', '#003f8e', 'ueno.co.jp', '', '上野クリニック', 1),
    x('norst', 'Tokyo Norst Clinic', '#003f8e', 'norst.co.jp', '', '東京ノーストクリニック|ノーストクリニック'),
    x('abc-clinic', 'ABC Clinic', '#e60012', 'abc-clinic.com', '', 'ABCクリニック', 1)
  ]);

  // ---- video games ---------------------------------------------------------

  R.add('games', [
    x('koei-tecmo', 'Koei Tecmo', '#00479d', 'koeitecmo.co.jp gamecity.ne.jp', 'monster-hunter', 'コーエーテクモ|信長の野望|真・三國無双|三國志 覇道|ライザのアトリエ'),
    x('level-5', 'LEVEL5', '#e60012', 'level5.co.jp', 'pokemon', 'レベルファイブ|妖怪ウォッチ|イナズマイレブン|レイトン教授|ファンタジーライフ'),
    x('atlus', 'ATLUS', '#1a1a1a', 'atlus.co.jp', 'final-fantasy', 'ペルソナ5|ペルソナ3 リロード|ペルソナ4|真・女神転生|メタファー：リファンタジオ'),
    x('fromsoftware', 'FromSoftware', '#1a1a1a', 'fromsoftware.jp', 'monster-hunter', 'フロム・ソフトウェア|フロムソフトウェア|ARMORED CORE|アーマード・コア|ダークソウル|SEKIRO'),
    x('colopl', 'COLOPL', '#f08300', 'colopl.co.jp', 'monster-strike', 'コロプラ|白猫プロジェクト|黒猫のウィズ|白猫テニス'),
    x('dena', 'DeNA', '#1a1a1a', 'dena.com mbga.jp', 'gree-games', 'モバゲー|Mobage|逆転オセロニア|ディー・エヌ・エー'),
    x('gree-games', 'GREE', '#00a0e9', 'gree.jp gree.net wfs.games', 'dena', 'グリー株式会社|GREE ゲーム|ライトフライヤースタジオ|ヘブンバーンズレッド|ヘブバン|アナザーエデン', 1),
    x('klab', 'KLab', '#00479d', 'klab.com', 'colopl', 'キャプテン翼 ～たたかえドリームチーム～|たたかえドリームチーム|BLEACH Brave Souls|ブレソル'),
    x('bushiroad', 'Bushiroad', '#e60012', 'bushiroad.com', 'konami-games', 'ブシロード|カードファイト!! ヴァンガード|ヴァイスシュヴァルツ|バンドリ'),
    x('marvelous', 'Marvelous', '#e60012', 'marv.jp', 'koei-tecmo', '牧場物語|ルーンファクトリー|ドルフィンウェーブ|株式会社マーベラス', 1),
    x('nippon-ichi', 'Nippon Ichi Software', '#00479d', 'nippon1.jp', 'atlus', '日本一ソフトウェア|ディスガイア'),
    x('spike-chunsoft', 'Spike Chunsoft', '#e60012', 'spike-chunsoft.co.jp', 'atlus', 'スパイク・チュンソフト|ダンガンロンパ|風来のシレン'),
    x('arc-system-works', 'Arc System Works', '#e60012', 'arcsystemworks.jp', 'snk', 'アークシステムワークス|ギルティギア|GUILTY GEAR'),
    x('snk', 'SNK', '#00479d', 'snk-corp.co.jp', 'arc-system-works', '餓狼伝説|ザ・キング・オブ・ファイターズ|THE KING OF FIGHTERS|メタルスラッグ', 1),
    x('falcom', 'Falcom', '#00479d', 'falcom.co.jp', 'atlus', '日本ファルコム|英雄伝説|界の軌跡|空の軌跡'),
    x('drecom', 'Drecom', '#e60012', 'drecom.co.jp', 'klab', 'ドリコム|Wizardry Variants Daphne|ウィザードリィ ヴァリアンツ ダフネ'),
    x('kairosoft', 'Kairosoft', '#f5a200', 'kairosoft.net', 'colopl', 'カイロソフト'),
    x('taito', 'TAITO', '#e60012', 'taito.co.jp', 'sega', 'タイトーステーション|スペースインベーダー|電車でGO|タイトーオンラインクレーン'),
    x('toreba', 'Toreba', '#e60012', 'toreba.net', 'taito', 'クレーンゲーム トレバ|トレバ クレーンゲーム|オンラインクレーンゲーム トレバ')
  ]);

  // ---- e-books and manga ---------------------------------------------------

  R.add('reading', [
    x('comic-days', 'Comic DAYS', '#e60012', 'comic-days.com', 'jump-plus', 'コミックDAYS'),
    x('manga-one', 'MangaONE', '#e60012', 'manga-one.com', 'magapoke', 'マンガワン'),
    x('sunday-webry', 'Sunday Webry', '#f39800', 'sunday-webry.com', 'magapoke', 'サンデーうぇぶり'),
    x('manga-park', 'Manga Park', '#00a040', 'manga-park.com', 'manga-one', 'マンガPark'),
    x('tonari-yj', 'Tonari no Young Jump', '#0068b7', 'tonarinoyj.jp ynjn.jp', 'comic-days', 'となりのヤングジャンプ|ヤンジャン！|ヤンジャン＋'),
    x('manga-mee', 'Manga Mee', '#e95580', 'manga-mee.jp', 'palcy', 'マンガMee'),
    x('palcy', 'Palcy', '#e95580', 'palcy.jp', 'manga-mee', 'パルシィ'),
    x('ganma', 'GANMA!', '#e60012', 'ganma.jp', 'comico', 'GANMA'),
    x('comico', 'comico', '#e60012', 'comico.jp', 'line-manga', 'comicoマンガ|comico（コミコ）', 1),
    x('manga-bang', 'Manga BANG!', '#f8b500', 'manga-bang.com', 'piccoma', 'マンガBANG'),
    x('mangabox', 'Manga Box', '#f8b500', 'mangabox.me', 'manga-one', 'マンガボックス'),
    x('cycomi', 'Cycomi', '#00a0e9', 'cycomi.com', 'jump-plus', 'サイコミ'),
    x('kadocomi', 'KadoComi', '#0068b7', 'comic-walker.com', 'comic-days', 'カドコミ|ComicWalker|コミックウォーカー'),
    x('jumptoon', 'Jump TOON', '#e60012', 'jumptoon.com', 'line-manga', 'ジャンプTOON'),
    x('ameba-manga', 'Ameba Manga', '#2dbe60', 'dokusho-ojikan.jp', 'cmoa', 'Amebaマンガ', 1),
    x('comic-jp', 'Comic.jp', '#e60012', 'comic.jp', 'cmoa', 'コミック.jp', 1),
    x('bookpass', 'Bookpass', '#eb5505', 'bookpass.auone.jp', 'booklive', 'auブックパス|ブックパス 読み放題'),
    x('reader-store', 'Reader Store', '#1a1a1a', 'ebookstore.sony.jp', 'booklive', 'リーダーストア|Reader Store', 1),
    x('d-book', 'd Book', '#cc0033', 'dbook.docomo.ne.jp', 'booklive', 'dブック', 1),
    x('d-magazine', 'd Magazine', '#cc0033', 'dmagazine.docomo.ne.jp', 'rakuten-magazine', 'dマガジン', 1),
    x('rakuten-magazine', 'Rakuten Magazine', '#bf0000', 'magazine.rakuten.co.jp', 'd-magazine', '楽天マガジン', 1),
    x('fujisan', 'Fujisan.co.jp', '#e60012', 'fujisan.co.jp', 'rakuten-magazine', 'フジサンマガジン|富士山マガジンサービス|Fujisan.co.jp', 1),
    x('pixiv', 'pixiv', '#0096fa', 'pixiv.net', 'kakuyomu', 'ピクシブ|pixivコミック|pixivFANBOX'),
    x('kakuyomu', 'Kakuyomu', '#4b9ce2', 'kakuyomu.jp', 'narou', 'カクヨム'),
    x('narou', 'Shosetsuka ni Naro', '#18b7cd', 'syosetu.com', 'kakuyomu', '小説家になろう'),
    x('alphapolis', 'AlphaPolis', '#f39800', 'alphapolis.co.jp', 'narou', 'アルファポリス'),
    x('estar', 'Everystar', '#00a0e9', 'estar.jp', 'alphapolis', 'エブリスタ'),
    x('flier', 'flier', '#1a1a1a', 'flierinc.com', 'blinkist', '本の要約サービス flier|flier（フライヤー）|本の要約flier', 1)
  ]);

  // ---- ticket sellers ------------------------------------------------------

  R.add('tickets', [
    x('cnplayguide', 'CN Playguide', '#e60012', 'cnplayguide.com', 'eplus', 'CNプレイガイド'),
    x('rakuten-ticket', 'Rakuten Ticket', '#bf0000', 'ticket.rakuten.co.jp', 'eplus', '楽天チケット', 1),
    x('ticket-ryutsu', 'Ticket Ryutsu Center', '#e60012', 'ticket.co.jp', 'ticketjam', 'チケット流通センター', 1),
    x('ticketjam', 'Ticketjam', '#f39800', 'ticketjam.jp', 'ticket-ryutsu', 'チケジャム|チケットジャム'),
    x('teket', 'teket', '#00b4a0', 'teket.jp', 'livepocket'),
    x('livepocket', 'LivePocket', '#e60012', 'livepocket.jp', 'teket', 'ライブポケット'),
    x('peatix', 'Peatix', '#f39800', 'peatix.com', 'livepocket', 'ピーティックス'),
    x('zaiko', 'ZAIKO', '#1a1a1a', 'zaiko.io', 'eplus'),
    x('tixplus', 'Tixplus', '#e60012', 'tixplus.jp', 'ticket-pia', 'チケプラ'),
    x('ticket-board', 'ticket board', '#0068b7', 'ticket.tickebo.jp', 'lawson-ticket', 'チケットボード', 1),
    x('jleague-ticket', 'J.League Ticket', '#e60012', 'jleague-ticket.jp', 'ticket-pia', 'Jリーグチケット', 1),
    x('mvtk', 'Mubichike', '#e60012', 'mvtk.jp', 'toho-cinemas', 'ムビチケ', 1),
    x('toho-cinemas', 'TOHO Cinemas', '#003f8e', 'tohotheater.jp', 'aeon-cinema', 'シネマイレージ'),
    x('aeon-cinema', 'AEON Cinema', '#b60081', 'aeoncinema.com', 'toho-cinemas', 'ワタシアター|イオンシネマ ワタシアター', 1),
    x('109-cinemas', '109 Cinemas', '#e60012', '109cinemas.net', 'toho-cinemas'),
    x('united-cinemas', 'United Cinemas', '#003f8e', 'unitedcinemas.jp', 'aeon-cinema', 'CLUB-SPICE|ユナイテッド・シネマ公式', 1),
    x('smt-cinema', 'MOVIX', '#e60012', 'smt-cinema.com', 'toho-cinemas', '松竹マルチプレックスシアターズ|SMT Members'),
    x('shiki', 'Shiki Theatre Company', '#003f8e', 'shiki.jp', 'takarazuka', '劇団四季'),
    x('takarazuka', 'Takarazuka Revue', '#5a2d82', 'kageki.hankyu.co.jp', 'shiki', '宝塚歌劇', 1)
  ]);

  // ---- supermarkets --------------------------------------------------------

  R.add('grocery', [
    x('daily-yamazaki', 'Daily Yamazaki', '#e60012', 'daily-yamazaki.jp', 'ministop', 'デイリーヤマザキ'),
    x('seicomart', 'Seicomart', '#f08300', 'seicomart.co.jp', 'lawson', 'セイコーマート'),
    x('maruetsu', 'Maruetsu', '#e60012', 'maruetsu.co.jp', 'life-super', 'マルエツ'),
    x('summit-store', 'Summit', '#00913a', 'summitstore.co.jp', 'life-super', 'サミットストア|スーパー サミット|サミットネットスーパー', 1),
    x('yaoko', 'Yaoko', '#e60012', 'yaoko-net.com', 'life-super', 'ヤオコー'),
    x('ok-store', 'OK Store', '#e60012', 'ok-corporation.jp', 'gyomu', 'オーケーストア|オーケー ネットスーパー|スーパー オーケー', 1),
    x('tokyu-store', 'Tokyu Store', '#e60012', 'tokyu-store.co.jp', 'seijo-ishii', '東急ストア'),
    x('inageya', 'Inageya', '#00913a', 'inageya.co.jp', 'maruetsu', 'いなげや'),
    x('york-benimaru', 'York Benimaru', '#e60012', 'yorkbenimaru.com', 'aeon', 'ヨークベニマル'),
    x('heiwado', 'Heiwado', '#e60012', 'heiwado.jp', 'aeon', '平和堂|アル・プラザ'),
    x('izumiya', 'Izumiya', '#e60012', 'izumiya.co.jp', 'heiwado', 'イズミヤ'),
    x('youme-town', 'youme Town', '#e4007f', 'izumi.co.jp', 'aeon', 'ゆめタウン|ゆめマート'),
    x('apita', 'APITA', '#e60012', 'uny.co.jp', 'aeon', 'アピタ|ピアゴ'),
    x('okuwa', 'Okuwa', '#e60012', 'okuwa.net', 'aeon', 'オークワ'),
    x('beisia', 'Beisia', '#e60012', 'beisia.co.jp', 'trial-super', 'ベイシア'),
    x('trial-super', 'TRIAL', '#e60012', 'trial-net.co.jp', 'gyomu', 'スーパーセンタートライアル|TRIAL GO|トライアルカンパニー', 1),
    x('hanamasa', 'Hanamasa', '#d7000f', 'hanamasa.co.jp', 'gyomu', '肉のハナマサ'),
    x('coop-sapporo', 'Co-op Sapporo', '#00913a', 'sapporo.coop', 'aeon', 'コープさっぽろ'),
    x('seikatsu-club', 'Seikatsu Club', '#f08300', 'seikatsuclub.coop', 'pal-system', '生活クラブ'),
    x('green-beans', 'Green Beans', '#00a040', 'greenbeans.com', 'ito-yokado', 'グリーンビーンズ|Green Beans ネットスーパー', 1),
    x('tabechoku', 'Tabechoku', '#e8380d', 'tabechoku.com', 'pocket-marche', '食べチョク'),
    x('pocket-marche', 'Pocket Marche', '#f08300', 'poke-m.com', 'tabechoku', 'ポケットマルシェ|ポケマル')
  ]);

  // ---- snack foods ---------------------------------------------------------

  R.add('snacks', [
    x('morinaga-milk', 'Morinaga Milk', '#003f98', 'morinagamilk.co.jp', 'megmilk', '森永乳業|マウントレーニア|ビヒダス|森永はぐくみ|パルム アイス'),
    x('megmilk', 'Megmilk Snow Brand', '#0068b7', 'meg-snow.com', 'morinaga-milk', '雪印メグミルク|雪印コーヒー|6Pチーズ|ガセリ菌SP株|さけるチーズ'),
    x('fujiya', 'Fujiya', '#e60012', 'fujiya-peko.co.jp', 'morinaga', '不二家|カントリーマアム|ペコちゃん'),
    x('kameda-seika', 'Kameda Seika', '#e60012', 'kamedaseika.co.jp', 'calbee', '亀田製菓|亀田の柿の種|ハッピーターン'),
    x('yamazaki-biscuits', 'Yamazaki Biscuits', '#003f98', 'yamazaki-biscuits.co.jp', 'calbee', 'ヤマザキビスケット|チップスター|ルヴァンプライム'),
    x('tohato', 'Tohato', '#e60012', 'tohato.jp', 'koikeya', '東ハト|キャラメルコーン|暴君ハバネロ'),
    x('oyatsu-company', 'Oyatsu Company', '#f08300', 'oyatsu.co.jp', 'koikeya', 'おやつカンパニー|ベビースターラーメン|ベビースター'),
    x('kabaya', 'Kabaya', '#e60012', 'kabaya.co.jp', 'kanro', 'カバヤ食品|タフグミ|ジューC'),
    x('kanro', 'Kanro', '#e60012', 'kanro.co.jp', 'uha-mikakuto', 'カンロ|ピュレグミ|金のミルク'),
    x('uha-mikakuto', 'UHA Mikakuto', '#e60012', 'uha-mikakuto.co.jp', 'kanro', 'UHA味覚糖|味覚糖|ぷっちょ|忍者めし'),
    x('imuraya', 'Imuraya', '#7b1e2b', 'imuraya.co.jp', 'akagi', '井村屋|あずきバー'),
    x('akagi', 'Akagi', '#00a0e9', 'akagi.com', 'imuraya', '赤城乳業|ガリガリ君', 1),
    x('royce', "ROYCE'", '#1b2a5b', 'royce.com', 'meiji', 'ロイズ 生チョコレート|ロイズの生チョコ|ロイズ ポテトチップチョコレート|ロイズ公式', 1),
    x('ishiya', 'ISHIYA', '#0b3d91', 'ishiya.co.jp', 'royce', '白い恋人|石屋製菓', 1),
    x('rokkatei', 'Rokkatei', '#b5121b', 'rokkatei.co.jp', 'ishiya', '六花亭|マルセイバターサンド'),
    x('letao', 'LeTAO', '#3b2314', 'letao.jp', 'royce', 'ルタオ|ドゥーブルフロマージュ'),
    x('yoku-moku', 'Yoku Moku', '#00479d', 'yokumoku.co.jp', 'morozoff', 'ヨックモック|シガール'),
    x('morozoff', 'Morozoff', '#7b1e2b', 'morozoff.co.jp', 'yoku-moku', 'モロゾフ'),
    x('marys-chocolate', "Mary's", '#7b0e2b', 'mary.co.jp', 'morozoff', "メリーチョコレート|Mary's Chocolate", 1),
    x('juchheim', 'Juchheim', '#7a5c2e', 'juchheim.co.jp', 'morozoff', 'ユーハイム'),
    x('tokyo-banana', 'Tokyo Banana', '#f5c400', 'tokyobanana.jp', 'ishiya', '東京ばな奈'),
    x('chateraise', 'Chateraise', '#c8102e', 'chateraise.co.jp', 'cozy-corner', 'シャトレーゼ'),
    x('cozy-corner', 'Ginza Cozy Corner', '#e4007f', 'cozycorner.co.jp', 'chateraise', '銀座コージーコーナー|コージーコーナー'),
    x('sanyo-foods', 'Sanyo Foods', '#e60012', 'sanyofoods.co.jp', 'nissin', 'サンヨー食品|サッポロ一番|カップスター'),
    x('myojo-foods', 'Myojo Foods', '#e60012', 'myojofoods.co.jp', 'maruchan', '明星食品|チャルメラ|一平ちゃん|中華三昧'),
    x('acecook', 'Acecook', '#e60012', 'acecook.co.jp', 'nissin', 'エースコック|わかめラーメン|スーパーカップ1.5倍'),
    x('peyoung', 'Peyoung', '#f5c400', 'peyoung.co.jp', 'nissin', 'ペヤング|まるか食品'),
    x('nichirei-foods', 'Nichirei Foods', '#e60012', 'nichireifoods.co.jp', 'ajinomoto', 'ニチレイフーズ|ニチレイ|本格炒め炒飯'),
    x('maruha-nichiro', 'Umios', '#00479d', 'umios.com maruha-nichiro.co.jp', 'nissui', 'マルハニチロ|Maruha Nichiro|ウミオス'),
    x('nissui', 'Nissui', '#00479d', 'nissui.co.jp', 'maruha-nichiro', 'ニッスイ|日本水産|イマークS'),
    x('tablemark', 'TableMark', '#e60012', 'tablemark.co.jp', 'nichirei-foods', 'テーブルマーク'),
    x('nipponham', 'NH Foods', '#e60012', 'nipponham.co.jp', 'itoham', '日本ハム|ニッポンハム|シャウエッセン'),
    x('itoham', 'Itoham', '#e60012', 'itoham.co.jp', 'nipponham', '伊藤ハム|グランドアルトバイエルン'),
    x('prima-ham', 'Prima Ham', '#e60012', 'primaham.co.jp', 'nipponham', 'プリマハム|香薫あらびき'),
    x('marudai', 'Marudai Food', '#e60012', 'marudai.jp', 'itoham', '丸大食品|丸大ハム'),
    x('mizkan', 'Mizkan', '#e60012', 'mizkan.co.jp', 'kikkoman', 'ミツカン|味ぽん|金のつぶ|カンタン酢'),
    x('ebara', 'Ebara Foods', '#e60012', 'ebarafoods.com', 'kikkoman', 'エバラ食品|黄金の味|エバラ焼肉のたれ|プチッと鍋'),
    x('nagatanien', 'Nagatanien', '#e60012', 'nagatanien.co.jp', 'marumiya', '永谷園|お茶づけ海苔'),
    x('marumiya', 'Marumiya', '#e60012', 'marumiya.co.jp', 'nagatanien', '丸美屋|のりたま'),
    x('marukome', 'Marukome', '#e60012', 'marukome.co.jp', 'hanamaruki', 'マルコメ|料亭の味'),
    x('hanamaruki', 'Hanamaruki', '#e60012', 'hanamaruki.co.jp', 'marukome', 'ハナマルキ|液体塩こうじ'),
    x('yamaki', 'Yamaki', '#e60012', 'yamaki.co.jp', 'ninben', 'ヤマキ|割烹白だし', 1),
    x('ninben', 'Ninben', '#1f2a44', 'ninben.co.jp', 'yamaki', 'にんべん|つゆの素ゴールド'),
    x('momoya', 'Momoya', '#e60012', 'momoya.co.jp', 'nagatanien', '桃屋のごはんですよ|桃屋のきざみ|桃屋のラー油|桃屋のザーサイ'),
    x('yamasa', 'Yamasa', '#e60012', 'yamasa.com', 'kikkoman', 'ヤマサ醤油|ヤマサ 鮮度生活|ヤマサ昆布つゆ', 1),
    x('otafuku', 'Otafuku', '#e60012', 'otafuku.co.jp', 'bull-dog', 'オタフクソース|オタフク お好みソース'),
    x('bull-dog', 'Bull-Dog Sauce', '#e60012', 'bulldog.co.jp', 'otafuku', 'ブルドックソース', 1),
    x('nisshin-oillio', 'Nisshin OilliO', '#f5c400', 'nisshin-oillio.com', 'ajinomoto', '日清オイリオ|日清キャノーラ油|日清MCTオイル'),
    x('nisshin-seifun', 'Nisshin Seifun Welna', '#e60012', 'nisshin-seifun-welna.com', 'nippn', '日清製粉ウェルナ|日清製粉|マ・マー|青の洞窟'),
    x('nippn', 'NIPPN', '#e60012', 'nippn.co.jp', 'nisshin-seifun', 'ニップン|オーマイ パスタ|オーマイプレミアム'),
    x('hagoromo', 'Hagoromo Foods', '#00479d', 'hagoromofoods.co.jp', 'maruha-nichiro', 'はごろもフーズ|シーチキン'),
    x('pasco', 'Pasco', '#e60012', 'pasconet.co.jp', 'yamazaki', '敷島製パン|Pasco 超熟|超熟食パン|超熟 イングリッシュマフィン|パスコのパン', 1),
    x('fuji-pan', 'Fuji Pan', '#e60012', 'fujipan.co.jp', 'yamazaki', 'フジパン|ネオバターロール'),
    x('otsuka-foods', 'Otsuka Foods', '#00479d', 'otsukafoods.co.jp', 'house-foods', '大塚食品|ボンカレー|マンナンヒカリ'),
    x('asahi-group-foods', 'Asahi Group Foods', '#00479d', 'asahi-gf.co.jp', 'morinaga', 'アサヒグループ食品|ミンティア|1本満足バー|和光堂|ディアナチュラ|アマノフーズ|クリーム玄米ブラン|エビオス錠'),
    x('riken-vitamin', 'Riken Vitamin', '#00913a', 'rikenvitamin.jp', 'kewpie', '理研ビタミン|ふえるわかめちゃん|リケンのノンオイル'),
    x('sujahta', 'Sujahta Meiraku', '#7a5c2e', 'sujahta.co.jp', 'megmilk', 'スジャータ|めいらく'),
    x('daisho', 'Daisho', '#e60012', 'daisho.co.jp', 'ebara', 'ダイショー|味・塩こしょう', 1),
    x('moranbong', 'Moranbong', '#e60012', 'moranbong.co.jp', 'ebara', 'モランボン'),
    x('mr-cheesecake', 'Mr. CHEESECAKE', '#1f2a44', 'mr-cheesecake.com', 'letao', 'ミスターチーズケーキ'),
    x('snaq-me', 'snaq.me', '#f08300', 'snaq.me', 'oyatsu-company', 'スナックミー')
  ]);

  // ---- spirits -------------------------------------------------------------

  R.add('spirits', [
    x('hakutsuru', 'Hakutsuru', '#003f8e', 'hakutsuru.co.jp', 'gekkeikan', '白鶴酒造|白鶴まる|上撰 白鶴'),
    x('ozeki', 'Ozeki', '#00479d', 'ozeki.co.jp', 'gekkeikan', 'ワンカップ大関|大関株式会社|ワンカップ'),
    x('kiku-masamune', 'Kiku-Masamune', '#b5272d', 'kikumasamune.co.jp', 'hakutsuru', '菊正宗'),
    x('sawanotsuru', 'Sawanotsuru', '#1c4e9d', 'sawanotsuru.co.jp', 'hakutsuru', '沢の鶴'),
    x('nihonsakari', 'Nihonsakari', '#c30d23', 'nihonsakari.co.jp', 'hakutsuru', '日本盛'),
    x('kizakura', 'Kizakura', '#f5c400', 'kizakura.co.jp', 'gekkeikan', '黄桜酒造|黄桜 呑|キザクラ'),
    x('kikusui', 'Kikusui', '#b22222', 'kikusui-sake.com', 'hakkaisan', '菊水酒造|ふなぐち菊水'),
    x('hakkaisan', 'Hakkaisan', '#1f2a44', 'hakkaisan.co.jp', 'dassai', '八海山'),
    x('kubota-sake', 'Kubota Sake', '#2b2b2b', 'asahi-shuzo.co.jp', 'hakkaisan', '朝日酒造|久保田 萬寿|久保田 千寿|久保田 純米大吟醸', 1),
    x('kirishima', 'Kirishima Shuzo', '#231815', 'kirishima.co.jp', 'iichiko', '霧島酒造|黒霧島|白霧島|赤霧島'),
    x('iichiko', 'iichiko', '#00603a', 'iichiko.co.jp', 'kirishima', 'いいちこ|三和酒類'),
    x('choya', 'CHOYA', '#006934', 'choya.co.jp choya.com', 'takara', 'チョーヤ|The CHOYA'),
    x('umenoyado', 'Umenoyado', '#e4007f', 'umenoyado.com', 'choya', '梅乃宿'),
    x('mercian', 'Mercian', '#7b0e2b', 'mercian.co.jp', 'suntory', 'メルシャン|シャトー・メルシャン', 1),
    x('enoteca', 'ENOTECA', '#6b0f1a', 'enoteca.co.jp', 'my-wine-club', 'エノテカ', 1),
    x('my-wine-club', 'My Wine Club', '#8b1a2b', 'mywineclub.com', 'enoteca', 'マイワインクラブ'),
    x('kurand', 'KURAND', '#1a1a1a', 'kurand.jp', 'dassai', 'クランド|酒ガチャ'),
    x('saketaku', 'saketaku', '#27405e', 'saketaku.com', 'kurand', 'サケタク'),
    x('yamaya', 'Yamaya', '#e60012', 'yamaya.jp', 'kakuyasu', 'お酒のやまや|酒のやまや', 1),
    x('kakuyasu', 'Kakuyasu', '#e4007f', 'kakuyasu.co.jp', 'yamaya', 'カクヤス'),
    x('liquor-mountain', 'Liquor Mountain', '#e60012', 'likaman.co.jp', 'kakuyasu', 'リカーマウンテン|リカマン'),
    x('hakushika', 'Hakushika', '#1f2a44', 'hakushika.co.jp', 'hakutsuru', '黒松白鹿|辰馬本家酒造|白鹿 純米'),
    x('oenon', 'Oenon', '#00479d', 'oenon.jp', 'takara', 'オエノン|鍛高譚|ビッグマン 焼酎')
  ]);

  // ---- car rental ----------------------------------------------------------

  R.add('carrental', [
    x('nissan-rentacar', 'Nissan Rent a Car', '#c3002f', 'nissan-rentacar.com', 'toyota-rentacar', '日産レンタカー'),
    x('niconico-rentacar', 'Niconico Rent a Car', '#f39800', 'niconicorentacar.jp', 'nippon-rentacar', 'ニコニコレンタカー'),
    x('j-net-rentacar', 'J-Net Rent a Car', '#e60012', 'j-netrentacar.co.jp', 'orix-rentacar', 'Jネットレンタカー'),
    x('ots-rentacar', 'OTS Rent-a-Car', '#00a0e9', 'otsrentacar.ne.jp otsinternational.jp', 'times-car', 'OTSレンタカー'),
    x('sky-rentacar', 'Sky Rent-a-Car', '#00a0e9', 'skyrent.jp', 'ots-rentacar', 'スカイレンタカー'),
    x('guts-rentacar', 'Guts Rent a Car', '#e60012', 'guts-rentacar.com', 'niconico-rentacar', 'ガッツレンタカー'),
    x('100yen-rentacar', '100 Yen Rent a Car', '#e60012', '100yen-rentacar.jp', 'niconico-rentacar', '100円レンタカー'),
    x('eki-rentacar', 'JR Eki Rent-A-Car', '#00833e', 'ekiren.co.jp', 'toyota-rentacar', '駅レンタカー'),
    x('tabirai', 'Tabirai', '#00a0e9', 'tabirai.net', 'times-car', 'たびらい')
  ]);

  // ---- glasses -------------------------------------------------------------

  R.add('eyewear', [
    x('megane-super', 'Megane Super', '#e60012', 'meganesuper.co.jp', 'megane-ichiba', 'メガネスーパー'),
    x('aigan', 'Aigan', '#00479d', 'aigan.co.jp', 'paris-miki', 'メガネの愛眼|愛眼 メガネ'),
    x('megane-tanaka', 'Megane no Tanaka', '#00479d', 'tanaka-megane.co.jp', 'megane-ichiba', 'メガネの田中'),
    x('vision-megane', 'Vision Megane', '#00479d', 'vision-megane.co.jp', 'megane-ichiba', 'ビジョンメガネ'),
    x('megane-drug', 'Megane Drug', '#e60012', 'meganedrug.com', 'megane-ichiba', 'メガネドラッグ'),
    x('four-nines', '999.9', '#1a1a1a', 'fournines.co.jp', 'kaneko-optical', 'フォーナインズ|999.9 フォーナインズ', 1),
    x('kaneko-optical', 'Kaneko Optical', '#3b2314', 'kaneko-optical.co.jp', 'four-nines', '金子眼鏡'),
    x('hazuki-loupe', 'Hazuki Loupe', '#b5121b', 'hazuki-l.co.jp', 'megane-ichiba', 'ハズキルーペ'),
    x('eyecity', 'Eyecity', '#00a0e9', 'eyecity.jp', 'menicon', 'アイシティ', 1),
    x('seed-contact', 'SEED', '#00479d', 'seed.co.jp', 'menicon', 'シード コンタクト|シード ワンデーピュア|ワンデーピュア|アイコフレ', 1),
    x('lens-mode', 'Lens Mode', '#00479d', 'lensmode.com', 'eyecity', 'レンズモード')
  ]);

  // ---- pet supplies --------------------------------------------------------

  R.add('pets', [
    x('petline', 'Petline', '#e60012', 'petline.co.jp', 'nippon-pet-food', 'ペットライン|メディファス|JPスタイル|キャネットチップ', 1),
    x('nippon-pet-food', 'Nippon Pet Food', '#00479d', 'npf.co.jp', 'petline', '日本ペットフード|ビタワン|コンボ ピュア'),
    x('doggyman', 'DoggyMan', '#e60012', 'doggyman.com', 'petio', 'ドギーマン'),
    x('petio', 'Petio', '#f08300', 'petio.com', 'doggyman', 'ペティオ'),
    x('earth-pet', 'Earth Pet', '#e60012', 'earth-pet.co.jp', 'lion-pet', 'アース・ペット|アースペット', 1),
    x('aixia', 'AIXIA', '#b8860b', 'aixia.jp', 'ciao', 'アイシア|MiawMiaw|ミャウミャウ'),
    x('mogwan', 'Mogwan', '#3a7d44', 'mogwandogfood.co.jp', 'konokono-gohan', 'モグワン'),
    x('canagan', 'Canagan', '#1f4e3d', 'canagandogfood.co.jp', 'konokono-gohan', 'カナガン'),
    x('mognyan', 'Mognyan', '#3a7d44', 'mognyancatfood.co.jp', 'ciao', 'モグニャン'),
    x('konokono-gohan', 'Konoko no Gohan', '#f08300', 'konokototomoni.com', 'mogwan', 'このこのごはん|コノコトトモニ'),
    x('petokoto', 'PETOKOTO', '#f5a200', 'foods.petokoto.com petokoto.com', 'coco-gourmet', 'ペトコトフーズ|PETOKOTO FOODS|ペトコト'),
    x('coco-gourmet', 'CoCo Gourmet', '#e8380d', 'coco-gourmet.com', 'petokoto', 'ココグルメ'),
    x('coo-riku', 'Coo&RIKU', '#e60012', 'pet-coo.com', 'pets-kojima', 'Coo&RIKU|クーアンドリク|ペットショップ クーリク', 1),
    x('pets-kojima', 'Pet no Kojima', '#e60012', 'pets-kojima.com', 'coo-riku', 'ペットの専門店コジマ|ペットのコジマ', 1),
    x('aeon-pet', 'AEON PET', '#e4007f', 'aeonpet.com', 'pets-kojima', 'イオンペット|ペテモ'),
    x('charm-pet', 'Charm', '#00913a', 'shopping-charm.jp', 'petgo', 'チャーム ペット|charm ペット用品|アクアリウム チャーム', 1),
    x('petgo', 'PetGo', '#00479d', 'petgo.jp', 'charm-pet', 'ペットゴー', 1),
    x('catlog', 'Catlog', '#f5a200', 'rabo.cat', 'charm-pet', 'キャトログ|Catlog Board'),
    x('lion-pet', 'Lion Pet', '#00913a', 'lion-pet.co.jp lion-pet.jp', 'earth-pet', 'ライオンペット|ニオイをとる砂|ペットキッス', 1),
    x('yeaster', 'Yeaster', '#e60012', 'yeaster.co.jp', 'petline', 'イースター ペットフード|愛犬元気|日本犬 柴専用', 1),
    x('obremo', 'OBREMO', '#3a7d44', 'obremo.jp', 'mogwan', 'オブレモ'),
    x('buddy-food', 'Buddy FOOD', '#e8380d', 'buddyfood.jp', 'coco-gourmet', 'バディフード'),
    x('ps-hoken', 'PS Hoken', '#e95513', 'pshoken.co.jp', 'ipet', 'PS保険|ペットメディカルサポート', 1),
    x('pet-family', 'Pet & Family', '#f39800', 'petfamilyins.co.jp', 'anicom', 'ペット&ファミリー損保|げんきナンバーわん'),
    x('fpc', 'FPC Pet Insurance', '#e60012', 'fpc-pet.co.jp', 'ps-hoken', 'FPCペット保険|フリーペットほけん', 1),
    x('sbi-prism', 'SBI Prism', '#0046ad', 'sbiprism.co.jp', 'ps-hoken', 'SBIプリズム少短|プリズムペット'),
    x('nihon-pet', 'Nihon Pet Insurance', '#00a0e9', 'nihonpet.co.jp', 'fpc', 'いぬとねこの保険|日本ペット少額短期')
  ]);

  // ---- security software ---------------------------------------------------

  R.add('security', [
    x('soliton', 'Soliton Systems', '#e60012', 'soliton.co.jp', 'hennge', 'ソリトンシステムズ', 1),
    x('lac', 'LAC', '#e60012', 'lac.co.jp', 'nri-secure', '株式会社ラック|ラック セキュリティ', 1),
    x('nri-secure', 'NRI Secure', '#003f8e', 'nri-secure.co.jp', 'lac', 'NRIセキュア'),
    x('digital-arts', 'Digital Arts', '#e60012', 'daj.jp', 'trend-micro', 'デジタルアーツ|i-FILTER', 1),
    x('hennge', 'HENNGE', '#1a1a1a', 'hennge.com', 'soliton', 'HENNGE One'),
    x('globalsign', 'GMO GlobalSign', '#005bac', 'globalsign.com', 'digital-arts', 'GMOグローバルサイン|グローバルサイン'),
    x('lanscope', 'LANSCOPE', '#00a0e9', 'lanscope.jp motex.co.jp', 'assetview', 'ランスコープ|エムオーテックス'),
    x('assetview', 'AssetView', '#e60012', 'hammock.jp', 'lanscope', 'AssetView', 1),
    x('ffri', 'FFRI Security', '#e60012', 'ffri.jp', 'trend-micro', 'FFRI yarai|FFRIセキュリティ'),
    x('tobila', 'Tobila Systems', '#f39800', 'tobila.com', 'norton', 'トビラフォン|トビラシステムズ'),
    x('cscloud', 'Cyber Security Cloud', '#003f8e', 'cscloud.co.jp', 'globalsign', '攻撃遮断くん|サイバーセキュリティクラウド|WafCharm')
  ]);

  // ---- business software ---------------------------------------------------

  R.add('bizsoftware', [
    x('bakuraku', 'Bakuraku', '#1e6ef7', 'bakuraku.jp', 'rakuraku', 'バクラク'),
    x('tokium', 'TOKIUM', '#1a1a1a', 'tokium.jp', 'rakuraku', 'TOKIUM経費精算|トキウム'),
    x('invox', 'invox', '#00a0e9', 'invox.jp', 'bakuraku'),
    x('infomart', 'Infomart', '#e60012', 'infomart.co.jp', 'sansan', 'インフォマート|BtoBプラットフォーム'),
    x('pca', 'PCA', '#0068b7', 'pca.jp', 'yayoi', 'PCA会計|PCAクラウド|ピー・シー・エー', 1),
    x('mjs', 'Miroku Jyoho Service', '#003f8e', 'mjs.co.jp', 'obc', 'ミロク情報サービス'),
    x('tkc', 'TKC', '#003f8e', 'tkc.jp', 'mjs', 'TKC全国会|株式会社TKC', 1),
    x('obic', 'OBIC', '#e60012', 'obic.co.jp', 'obc', 'オービック|OBIC7'),
    x('sorimachi', 'Sorimachi', '#0068b7', 'sorimachi.co.jp', 'yayoi', 'ソリマチ|みんなの青色申告|会計王'),
    x('ohken', 'Ohken', '#e60012', 'ohken.co.jp', 'obc', '応研株式会社|販売大臣|大蔵大臣|給与大臣'),
    x('loglass', 'Loglass', '#1a1a1a', 'loglass.jp', 'money-forward'),
    x('office-station', 'Office Station', '#00a0e9', 'officestation.jp', 'smarthr', 'オフィスステーション', 1),
    x('hrbrain', 'HRBrain', '#1a1a1a', 'hrbrain.jp', 'kaonavi', 'HRブレイン'),
    x('kaonavi', 'Kaonavi', '#00a0e9', 'kaonavi.jp', 'smarthr', 'カオナビ'),
    x('talent-palette', 'Talent Palette', '#e95513', 'talent-p.net', 'kaonavi', 'タレントパレット'),
    x('jinjer', 'jinjer', '#1a1a1a', 'hcm-jinjer.com', 'jobcan', 'ジンジャー勤怠|ジンジャー人事労務|ジンジャー給与'),
    x('teamspirit', 'TeamSpirit', '#00a0e9', 'teamspirit.com', 'king-of-time', 'チームスピリット'),
    x('touch-on-time', 'Touch On Time', '#e60012', 'kintaisystem.com', 'king-of-time', 'タッチオンタイム'),
    x('hrmos', 'HRMOS', '#1a1a1a', 'hrmos.co', 'smarthr', 'ハーモス'),
    x('wevox', 'Wevox', '#00b4a0', 'wevox.io', 'motivation-cloud'),
    x('motivation-cloud', 'Motivation Cloud', '#e60012', 'motivation-cloud.com', 'wevox', 'モチベーションクラウド|リンクアンドモチベーション', 1),
    x('e-sales-manager', 'eSales Manager', '#e60012', 'e-sales.jp', 'salesforce', 'eセールスマネージャー|ソフトブレーン'),
    x('satori', 'SATORI', '#e60012', 'satori.marketing', 'hubspot', 'SATORI マーケティングオートメーション|SATORI株式会社|MAツールSATORI', 1),
    x('b-dash', 'b→dash', '#1a1a1a', 'bdash-marketing.com', 'satori', 'b→dash|ビーダッシュ', 1),
    x('karte', 'KARTE', '#1a1a1a', 'karte.io plaid.co.jp', 'b-dash', 'KARTE Blocks|株式会社プレイド|CXプラットフォーム KARTE', 1),
    x('bownow', 'BowNow', '#00a0e9', 'bow-now.jp', 'satori', 'バウナウ|クラウドサーカス'),
    x('ferret-one', 'ferret One', '#1a1a1a', 'ferret-one.com', 'hubspot', 'フェレットワン'),
    x('blastmail', 'blastmail', '#e60012', 'blastmail.jp', 'mailchimp', 'ブラストメール'),
    x('l-step', 'L Step', '#06c755', 'linestep.net', 'l-message', 'Lステップ', 1),
    x('l-message', 'L Message', '#06c755', 'lme.jp', 'l-step', 'エルメッセージ|L Message（エルメ）', 1),
    x('sales-marker', 'Sales Marker', '#1a1a1a', 'sales-marker.jp', 'uzabase', 'セールスマーカー', 1),
    x('uzabase', 'Uzabase', '#1a1a1a', 'uzabase.com', 'sales-marker', 'ユーザベース|SPEEDA'),
    x('bellface', 'bellFace', '#f39800', 'bell-face.com', 'miitel', 'ベルフェイス'),
    x('miitel', 'MiiTel', '#00a0e9', 'miitel.com', 'bellface', 'ミーテル'),
    x('ivry', 'IVRy', '#1a1a1a', 'ivry.jp', 'fondesk', 'アイブリー'),
    x('fondesk', 'fondesk', '#00b4a0', 'fondesk.jp', 'ivry', 'フォンデスク'),
    x('biztel', 'BIZTEL', '#0068b7', 'biztel.jp', 'miitel', 'ビズテル'),
    x('chatplus', 'ChatPlus', '#00a0e9', 'chatplus.jp', 'zendesk', 'チャットプラス'),
    x('helpfeel', 'Helpfeel', '#1a1a1a', 'helpfeel.com', 'zendesk', 'ヘルプフィール'),
    x('relation', 'Re:lation', '#00a0e9', 'ingage.jp', 'zendesk', 'Re:lation|インゲージ', 1),
    x('formrun', 'formrun', '#1a1a1a', 'form.run', 'kintone', 'フォームラン|formrun', 1),
    x('yappli', 'Yappli', '#1a1a1a', 'yapp.li', 'karte'),
    x('gmo-sign', 'GMO Sign', '#005bac', 'gmosign.com', 'cloudsign', 'GMOサイン|電子印鑑GMOサイン'),
    x('legalon', 'LegalOn', '#1a1a1a', 'legalontech.jp', 'cloudsign', 'リーガルオン|LegalOn Cloud|リーガルフォース|LegalForce'),
    x('smaregi', 'Smaregi', '#00a0e9', 'smaregi.jp', 'airregi', 'スマレジ'),
    x('ubiregi', 'Ubiregi', '#e60012', 'ubiregi.jp', 'smaregi', 'ユビレジ'),
    x('reserva', 'RESERVA', '#0068b7', 'reserva.be', 'airregi', 'レゼルバ|RESERVA予約', 1),
    x('toreta', 'Toreta', '#e95513', 'toreta.in', 'tablecheck'),
    x('tablecheck', 'TableCheck', '#7935d2', 'tablecheck.com', 'toreta', 'テーブルチェック'),
    x('next-engine', 'NEXT ENGINE', '#e60012', 'next-engine.net', 'kintone', 'ネクストエンジン', 1),
    x('kaminashi', 'Kaminashi', '#1a1a1a', 'kaminashi.jp', 'andpad', 'カミナシ'),
    x('andpad', 'ANDPAD', '#e60012', 'andpad.jp', 'kaminashi', 'アンドパッド'),
    x('desknets', "desknet's NEO", '#0068b7', 'desknets.com', 'kintone', 'デスクネッツ|ネオジャパン'),
    x('intra-mart', 'intra-mart', '#e60012', 'intra-mart.jp', 'kintone', 'イントラマート'),
    x('wingarc', 'WingArc1st', '#0068b7', 'wingarc.com', 'asteria', 'ウイングアーク|MotionBoard|invoiceAgent|Dr.Sum'),
    x('asteria', 'ASTERIA', '#e60012', 'asteria.com', 'wingarc', 'アステリア|ASTERIA Warp', 1),
    x('winactor', 'WinActor', '#e60012', 'winactor.com', 'wingarc'),
    x('ai-inside', 'AI inside', '#1a1a1a', 'inside.ai', 'winactor', 'DX Suite', 1),
    x('justsystems', 'JustSystems', '#e60012', 'justsystems.com', 'kintone', '一太郎|ATOK|ジャストシステム')
  ]);

  // ---- banks ---------------------------------------------------------------

  R.add('banks', [
    x('gmo-aozora', 'GMO Aozora Net Bank', '#005bac', 'gmo-aozora.com', 'sbi-net-bank', 'GMOあおぞらネット銀行'),
    x('aozora-bank', 'Aozora Bank', '#0068b7', 'aozorabank.co.jp', 'shinsei', 'あおぞら銀行'),
    x('daiwa-next-bank', 'Daiwa Next Bank', '#c8102e', 'bank-daiwa.co.jp', 'sony-bank', '大和ネクスト銀行'),
    x('smtb', 'Sumitomo Mitsui Trust Bank', '#00693e', 'smtb.jp', 'mufg', '三井住友信託銀行|三井住友信託'),
    x('smbc-trust', 'SMBC Trust Bank', '#00693e', 'smbctb.co.jp', 'sony-bank', 'SMBC信託銀行|プレスティア'),
    x('lawson-bank', 'Lawson Bank', '#0068b7', 'lawsonbank.jp', 'seven-bank', 'ローソン銀行'),
    x('ui-bank', 'UI Bank', '#00a0e9', 'uibank.co.jp', 'minna-bank', 'UI銀行'),
    x('tokyo-star-bank', 'Tokyo Star Bank', '#003b83', 'tokyostarbank.co.jp', 'shinsei', '東京スター銀行'),
    x('orix-bank', 'ORIX Bank', '#00356b', 'orixbank.co.jp', 'sony-bank', 'オリックス銀行'),
    x('sbj-bank', 'SBJ Bank', '#0046ad', 'sbjbank.co.jp', 'tokyo-star-bank', 'SBJ銀行'),
    x('suruga-bank', 'Suruga Bank', '#003b7a', 'surugabank.co.jp', 'shizuoka-bank', 'スルガ銀行'),
    x('shizuoka-bank', 'Shizuoka Bank', '#00a040', 'shizuokabank.co.jp', 'suruga-bank', '静岡銀行|しずぎん'),
    x('yokohama-bank', 'Bank of Yokohama', '#003f8e', 'boy.co.jp', 'chiba-bank', '横浜銀行|はまぎん'),
    x('chiba-bank', 'Chiba Bank', '#e60012', 'chibabank.co.jp', 'yokohama-bank', '千葉銀行|ちばぎん'),
    x('fukuoka-bank', 'Bank of Fukuoka', '#00543e', 'fukuokabank.co.jp', 'nishi-nippon-city', '福岡銀行'),
    x('nishi-nippon-city', 'Nishi-Nippon City Bank', '#009944', 'ncbank.co.jp', 'fukuoka-bank', '西日本シティ銀行'),
    x('hokuyo-bank', 'North Pacific Bank', '#00a651', 'hokuyobank.co.jp', 'yucho', '北洋銀行'),
    x('joyo-bank', 'Joyo Bank', '#e60012', 'joyobank.co.jp', 'chiba-bank', '常陽銀行'),
    x('gunma-bank', 'Gunma Bank', '#00693e', 'gunmabank.co.jp', 'joyo-bank', '群馬銀行'),
    x('hiroshima-bank', 'Hiroshima Bank', '#e8380d', 'hirogin.co.jp', 'fukuoka-bank', '広島銀行|ひろぎん'),
    x('kyoto-bank', 'Bank of Kyoto', '#00a0e9', 'kyotobank.co.jp', 'kansai-mirai', '京都銀行'),
    x('kansai-mirai', 'Kansai Mirai Bank', '#00a650', 'kansaimiraibank.co.jp', 'kyoto-bank', '関西みらい銀行'),
    x('77-bank', '77 Bank', '#e60012', '77bank.co.jp', 'yucho', '七十七銀行'),
    x('hachijuni-bank', 'Hachijuni Nagano Bank', '#0068b7', 'bank.82group.jp 82bank.co.jp', 'shizuoka-bank', '八十二長野銀行|八十二銀行'),
    x('iyo-bank', 'Iyo Bank', '#e60012', 'iyobank.co.jp', 'hiroshima-bank', '伊予銀行'),
    x('ja-bank', 'JA Bank', '#00a040', 'jabank.org', 'yucho', 'JAバンク'),
    x('aruhi', 'SBI ARUHI', '#e4007f', 'sbiaruhi.co.jp aruhi-corp.co.jp', 'sbi-net-bank', 'SBIアルヒ|アルヒ株式会社|ARUHI住宅ローン|ARUHI'),
    x('mogecheck', 'MOGECHECK', '#00b4a0', 'mogecheck.jp', 'aruhi', 'モゲチェック')
  ]);

  // ---- loans ---------------------------------------------------------------

  R.add('loans', [
    x('central-loan', 'Central', '#e60012', '011330.jp', '', 'カードローンのセントラル|セントラル カードローン', 1),
    x('direct-one', 'Direct One', '#0068b7', 'directone.co.jp', '', 'ダイレクトワン', 1),
    x('fukuho', 'Fukuho', '#00693e', 'fukufo.co.jp', '', 'フクホー'),
    x('arrow-loan', 'Arrow', '#e60012', 'my-arrow.co.jp', '', 'キャッシングのアロー|アロー キャッシング', 1),
    x('saison-fundex', 'Saison Fundex', '#0068b7', 'fundex.co.jp', '', 'セゾンファンデックス'),
    x('olta', 'OLTA', '#2c5cc5', 'olta.co.jp', '', 'OLTAクラウドファクタリング|クラウドファクタリングOLTA', 1),
    x('paytner', 'Paytner', '#00b7ce', 'paytner.co.jp', '', 'ペイトナーファクタリング|ペイトナー'),
    x('labol', 'labol', '#ff7a00', 'labol.co.jp', '', 'ラボル ファクタリング|ファクタリング ラボル'),
    x('betrading', 'BeTrading', '#e60012', 'betrading.jp', '', 'ビートレーディング')
  ]);

  // ---- payment apps --------------------------------------------------------

  R.add('payments', [
    x('rakuten-edy', 'Rakuten Edy', '#bf0000', 'edy.rakuten.co.jp', 'waon', '楽天Edy|楽天エディ', 1),
    x('quicpay', 'QUICPay', '#0068b7', 'quicpay.jp', 'id-credit', 'クイックペイ'),
    x('id-credit', 'iD', '#e6b422', 'id-credit.com', 'quicpay', '電子マネーiD|電子マネー「iD」|iD決済', 1),
    x('j-coin', 'J-Coin Pay', '#e60012', 'j-coin.jp', 'paypay', 'J-Coin Pay|Jコインペイ', 1),
    x('cotra', 'Cotra', '#e4007f', 'cotra.ne.jp', 'j-coin', 'ことら送金', 1),
    x('sbi-remit', 'SBI Remit', '#0046ad', 'remit.co.jp', 'paypal', 'SBIレミット'),
    x('gmo-pg', 'GMO Payment Gateway', '#005bac', 'gmo-pg.com', 'sb-payment', 'GMOペイメントゲートウェイ|GMO-PG'),
    x('sb-payment', 'SB Payment Service', '#a7a9ac', 'sbpayment.jp', 'gmo-pg', 'SBペイメントサービス'),
    x('paygent', 'Paygent', '#0068b7', 'paygent.co.jp', 'gmo-pg', 'ペイジェント'),
    x('komoju', 'KOMOJU', '#1a1a8c', 'komoju.com', 'gmo-pg'),
    x('pay-jp', 'PAY.JP', '#1f8ae6', 'pay.jp', 'komoju', 'PAY.JP', 1)
  ]);

  // ---- hometown tax sites --------------------------------------------------

  R.add('furusato', [
    x('au-furusato', 'au PAY Furusato Nozei', '#eb5505', 'furusato.wowma.jp', 'rakuten-furusato', 'au PAY ふるさと納税|au PAYふるさと納税', 1),
    x('jre-furusato', 'JRE MALL Furusato Nozei', '#00833e', 'furusato.jreast.co.jp', 'satofull', 'JRE MALLふるさと納税', 1),
    x('ana-furusato', 'ANA Furusato Nozei', '#13448f', 'furusato.ana.co.jp', 'jal-furusato', 'ANAのふるさと納税', 1),
    x('jal-furusato', 'JAL Furusato Nozei', '#cc0000', 'furusato.jal.co.jp', 'ana-furusato', 'JALふるさと納税', 1),
    x('furusato-honpo', 'Furusato Honpo', '#e95513', 'furusatohonpo.jp', 'furunavi', 'ふるさと本舗'),
    x('furusato-palette', 'Furusato Palette', '#e60012', 'tokyu-furusato.jp', 'furusato-premium', 'ふるさとパレット'),
    x('furulabo', 'Furulabo', '#f39800', 'furusato.asahi.co.jp', 'furusato-honpo', 'ふるラボ'),
    x('mi-furusato', 'Mitsukoshi Isetan Furusato Nozei', '#1a1a1a', 'mifurusato.jp', 'furusato-palette', '三越伊勢丹ふるさと納税'),
    x('saison-furusato', 'Saison no Furusato Nozei', '#0068b7', 'furusato.saisoncard.co.jp', 'furunavi', 'セゾンのふるさと納税', 1)
  ]);

  // ---- weddings ------------------------------------------------------------

  R.add('weddings', [
    x('zexy', 'Zexy', '#e4007f', 'zexy.net', 'mynavi-wedding', 'ゼクシィ'),
    x('mynavi-wedding', 'Mynavi Wedding', '#00a0e9', 'wedding.mynavi.jp', 'zexy', 'マイナビウエディング', 1),
    x('hanayume', 'Hanayume', '#e95580', 'hana-yume.net', 'zexy', 'ハナユメ'),
    x('mwed', 'Minna no Wedding', '#f39800', 'mwed.jp', 'wedding-park', 'みんなのウェディング'),
    x('wedding-park', 'Wedding Park', '#e60012', 'weddingpark.net', 'mwed', 'ウエディングパーク', 1),
    x('tokihana', 'Tokihana', '#e95580', 'tokihana.net', 'hanayume', 'トキハナ'),
    x('placole', 'PLACOLE', '#e95580', 'pla-cole.wedding', 'hanayume', 'プラコレ'),
    x('tgn', 'Take and Give Needs', '#1a1a1a', 'tgn.co.jp', 'watabe', 'テイクアンドギヴ・ニーズ'),
    x('watabe', 'Watabe Wedding', '#e95580', 'watabe-wedding.co.jp', 'tgn', 'ワタベウェディング'),
    x('anniversaire', 'Anniversaire', '#8b6f3e', 'anniversaire.co.jp', 'tgn', 'アニヴェルセル', 1),
    x('novarese', 'ON THE PAGE', '#1a1a1a', 'onthepage.jp novarese.co.jp', 'tgn', 'オンザページ|ノバレーゼ', 1),
    x('escrit', 'Escrit', '#8b0000', 'escrit.jp', 'novarese', 'エスクリ', 1),
    x('best-bridal', 'Best Bridal', '#8b6f3e', 'bestbridal.co.jp', 'tgn', 'ベストブライダル', 1),
    x('smakon', 'Smakon', '#e95580', 'smakon.jp', 'rakukon', 'スマ婚'),
    x('rakukon', 'Rakukon', '#f39800', 'rakukon.com', 'smakon'),
    x('petit-wedding', 'Chiisana Kekkonshiki', '#e95580', 'petitwedding.com', 'smakon', '小さな結婚式'),
    x('studio-aqua', 'Studio AQUA', '#00a0e9', 'studio-aqua.jp decollte.co.jp', 'lavie-factory', 'スタジオアクア|デコルテフォトグラフィー'),
    x('lavie-factory', 'La-vie Factory', '#1a1a1a', 'la-viephoto.com', 'studio-aqua', 'ラヴィ・ファクトリー|ラヴィファクトリー'),
    x('i-primo', 'I-PRIMO', '#8b6f3e', 'iprimo.jp', 'diamond-shiraishi', 'アイプリモ'),
    x('diamond-shiraishi', 'Ginza Diamond Shiraishi', '#1a1a1a', 'diamond-shiraishi.jp', 'i-primo', '銀座ダイヤモンドシライシ|ダイヤモンドシライシ'),
    x('niwaka', 'NIWAKA', '#1a1a1a', 'niwaka.com', 'i-primo', '俄（にわか）|京都 俄'),
    x('exelco', 'EXELCO DIAMOND', '#003f8e', 'exelco.com', 'diamond-shiraishi', 'エクセルコ ダイヤモンド|エクセルコダイヤモンド'),
    x('k-uno', 'K.UNO', '#8b6f3e', 'k-uno.co.jp', 'i-primo', 'ケイウノ'),
    x('brilliance-plus', 'BRILLIANCE+', '#1a1a1a', 'brilliance.co.jp', 'i-primo', 'ブリリアンスプラス', 1),
    x('happo-en', 'Happo-en', '#8b0000', 'happo-en.com', 'chinzanso', '八芳園'),
    x('chinzanso', 'Hotel Chinzanso Tokyo', '#00693e', 'hotel-chinzanso-tokyo.jp', 'happo-en', '椿山荘'),
    x('meiji-kinenkan', 'Meiji Kinenkan', '#8b6f3e', 'meijikinenkan.gr.jp', 'happo-en', '明治記念館'),
    x('piary', 'PIARY', '#e95580', 'piary.jp', 'favori', 'ピアリー'),
    x('favori', 'Favori', '#8b6f3e', 'favori-cloud.com', 'piary', 'ファヴォリ', 1)
  ]);

  // ---- news subscriptions --------------------------------------------------

  R.add('news', [
    x('nikkei', 'Nikkei', '#00456d', 'nikkei.com', 'asahi-shimbun', '日経電子版|日本経済新聞社|日経クロステック|日経ヴェリタス|日経ビジネス電子版|NIKKEI Prime', 1),
    x('asahi-shimbun', 'The Asahi Shimbun', '#e60012', 'asahi.com', 'yomiuri', '朝日新聞デジタル|朝日新聞社', 1),
    x('yomiuri', 'Yomiuri Shimbun', '#e60012', 'yomiuri.co.jp', 'asahi-shimbun', '読売新聞オンライン|読売新聞社'),
    x('mainichi', 'Mainichi Shimbun', '#0068b7', 'mainichi.jp', 'asahi-shimbun', '毎日新聞デジタル|毎日新聞社'),
    x('sankei', 'Sankei Shimbun', '#003f8e', 'sankei.com', 'yomiuri', '産経ニュース|産経新聞社|産経電子版'),
    x('chunichi', 'Chunichi Shimbun', '#0068b7', 'chunichi.co.jp tokyo-np.co.jp', 'yomiuri', '中日新聞|東京新聞'),
    x('hokkaido-np', 'Hokkaido Shimbun', '#00a0e9', 'hokkaido-np.co.jp', 'yomiuri', '北海道新聞'),
    x('nishinippon', 'Nishinippon Shimbun', '#e60012', 'nishinippon.co.jp', 'yomiuri', '西日本新聞'),
    x('kahoku', 'Kahoku Shimpo', '#003f8e', 'kahoku.news', 'yomiuri', '河北新報'),
    x('shizuoka-shimbun', 'Shizuoka Shimbun', '#0068b7', 'at-s.com', 'chunichi', '静岡新聞|アットエス'),
    x('kyoto-np', 'Kyoto Shimbun', '#8b0000', 'kyoto-np.co.jp', 'asahi-shimbun', '京都新聞'),
    x('kobe-np', 'Kobe Shimbun', '#0068b7', 'kobe-np.co.jp', 'asahi-shimbun', '神戸新聞'),
    x('okinawa-times', 'Okinawa Times', '#0068b7', 'okinawatimes.co.jp', 'ryukyu-shimpo', '沖縄タイムス'),
    x('ryukyu-shimpo', 'Ryukyu Shimpo', '#e60012', 'ryukyushimpo.jp', 'okinawa-times', '琉球新報'),
    x('shinmai', 'Shinano Mainichi Shimbun', '#003f8e', 'shinmai.co.jp', 'chunichi', '信濃毎日新聞'),
    x('niigata-nippo', 'Niigata Nippo', '#0068b7', 'niigata-nippo.co.jp', 'yomiuri', '新潟日報'),
    x('kanaloco', 'Kanagawa Shimbun', '#00a0e9', 'kanaloco.jp', 'yomiuri', '神奈川新聞|カナロコ'),
    x('jiji', 'Jiji Press', '#003f8e', 'jiji.com', 'kyodo', '時事通信|時事ドットコム', 1),
    x('kyodo', 'Kyodo News', '#003f8e', '47news.jp kyodonews.jp', 'jiji', '共同通信|47NEWS'),
    x('newspicks', 'NewsPicks', '#1a1a1a', 'newspicks.com', 'nikkei', 'ニューズピックス'),
    x('toyo-keizai', 'Toyo Keizai', '#e60012', 'toyokeizai.net', 'diamond-online', '東洋経済オンライン|会社四季報オンライン|東洋経済新報社'),
    x('diamond-online', 'Diamond Online', '#0068b7', 'diamond.jp', 'toyo-keizai', 'ダイヤモンド・オンライン|ダイヤモンドオンライン|ダイヤモンドZAi|ダイヤモンド・ザイ', 1),
    x('president-online', 'PRESIDENT Online', '#8b0000', 'president.jp', 'toyo-keizai', 'プレジデントオンライン|PRESIDENT Online', 1),
    x('bunshun', 'Bunshun Online', '#e60012', 'bunshun.jp', 'shincho', '文春オンライン|週刊文春 電子版|文藝春秋 電子版'),
    x('shincho', 'Daily Shincho', '#003f8e', 'dailyshincho.jp', 'bunshun', 'デイリー新潮'),
    x('gendai-business', 'Gendai Business', '#e60012', 'gendai.media', 'toyo-keizai', '現代ビジネス'),
    x('nikkan-gendai', 'Nikkan Gendai', '#e60012', 'nikkan-gendai.com', 'bunshun', '日刊ゲンダイ'),
    x('forbes-japan', 'Forbes JAPAN', '#1a1a1a', 'forbesjapan.com', 'newspicks', 'Forbes JAPAN|フォーブス ジャパン', 1),
    x('courrier', 'COURRiER Japon', '#e60012', 'courrier.jp', 'newspicks', 'クーリエ・ジャポン'),
    x('japan-times', 'The Japan Times', '#1a1a1a', 'japantimes.co.jp', 'nikkei', 'ジャパンタイムズ'),
    x('smartnews', 'SmartNews', '#1a1a1a', 'smartnews.com', 'gunosy', 'スマートニュース|スマニュー'),
    x('gunosy', 'Gunosy', '#0068b7', 'gunosy.com', 'smartnews', 'グノシー'),
    x('itmedia', 'ITmedia', '#e60012', 'itmedia.co.jp', 'nikkei', 'アイティメディア'),
    x('nikkan-sports', 'Nikkan Sports', '#0068b7', 'nikkansports.com', 'sponichi', '日刊スポーツ'),
    x('sponichi', 'Sports Nippon', '#e60012', 'sponichi.co.jp', 'nikkan-sports', 'スポニチ|スポーツニッポン'),
    x('hochi', 'Sports Hochi', '#00693e', 'hochi.news', 'nikkan-sports', 'スポーツ報知'),
    x('sanspo', 'Sankei Sports', '#e60012', 'sanspo.com', 'sponichi', 'サンスポ|サンケイスポーツ')
  ]);

  // ---- household goods -----------------------------------------------------

  R.add('household', [
    x('earth-corp', 'Earth Corporation', '#e60012', 'earth.jp', 'kincho', 'アース製薬|アースノーマット|ごきぶりホイホイ|モンダミン|バスロマン|アースジェット|ブラックキャップ', 1),
    x('kincho', 'KINCHO', '#e60012', 'kincho.co.jp', 'earth-corp', 'キンチョー|金鳥の渦巻|金鳥の夏|キンチョール|蚊がいなくなるスプレー|虫コナーズ'),
    x('fumakilla', 'Fumakilla', '#e60012', 'fumakilla.co.jp', 'earth-corp', 'フマキラー|どこでもベープ'),
    x('st-corp', 'S.T. Corporation', '#00913a', 'st-c.co.jp', 'kobayashi', 'エステー株式会社|エステー 消臭力|消臭力|ムシューダ|脱臭炭|米唐番'),
    x('kobayashi', 'Kobayashi Pharmaceutical', '#00479d', 'kobayashi.co.jp', 'st-corp', '小林製薬|熱さまシート|ブルーレット|消臭元|サワデー|ナイシトール|アイボン|糸ようじ'),
    x('hakugen-earth', 'Hakugen Earth', '#00479d', 'hakugen-earth.co.jp', 'st-corp', '白元アース|アイスノン|ミセスロイド|ホッカイロ'),
    x('elleair', 'elleair', '#00a0e9', 'elleair.jp', 'nepia', 'エリエール|大王製紙|アテント|グーン おむつ'),
    x('nepia', 'nepia', '#00913a', 'nepia.co.jp', 'elleair', 'ネピア|鼻セレブ'),
    x('crecia', 'Nippon Paper Crecia', '#00479d', 'crecia.co.jp', 'elleair', '日本製紙クレシア|スコッティ|クリネックス'),
    x('saraya', 'SARAYA', '#00913a', 'saraya.com', 'miyoshi-soap', 'サラヤ|ヤシノミ洗剤|ラカント|ハッピーエレファント'),
    x('miyoshi-soap', 'Miyoshi Soap', '#00479d', 'miyoshisoap.co.jp', 'shabondama', 'ミヨシ石鹸'),
    x('shabondama', 'Shabondama Soap', '#00a0e9', 'shabon.com', 'miyoshi-soap', 'シャボン玉石けん'),
    x('asahi-kasei', 'Asahi Kasei', '#00479d', 'asahi-kasei.co.jp asahi-kasei.com', 'kureha', '旭化成|サランラップ|ジップロック|クックパー'),
    x('kureha', 'Kureha', '#e60012', 'kureha.co.jp', 'asahi-kasei', 'クレハ|クレラップ'),
    x('lec-inc', 'LEC', '#00479d', 'lecinc.co.jp', 'kobayashi', '激落ちくん|バルサン|レック株式会社', 1),
    x('duskin', 'Duskin', '#e60012', 'duskin.co.jp duskin.jp', 'lec-inc', 'ダスキン|メリーメイド'),
    x('bathclin', 'Bathclin', '#00913a', 'bathclin.co.jp', 'earth-corp', 'バスクリン|きき湯'),
    x('cleansui', 'Cleansui', '#00a0e9', 'cleansui.com', 'torayvino', 'クリンスイ'),
    x('torayvino', 'Torayvino', '#00479d', 'torayvino.com', 'cleansui', 'トレビーノ'),
    x('ns-fafa', 'NS FaFa Japan', '#00a0e9', 'nsfafa.jp', 'saraya', 'NSファーファ|ファーファ 柔軟剤|ファーファ 洗剤|ファーファ ファインフレグランス'),
    x('taiyo-yushi', 'Taiyo Yushi', '#3a7d44', 'taiyo-yushi.co.jp', 'miyoshi-soap', '太陽油脂|パックスナチュロン|パックスベビー')
  ]);

  // ---- baby goods ----------------------------------------------------------

  R.add('baby', [
    x('pigeon', 'Pigeon', '#e4007f', 'pigeon.co.jp pigeon.info', 'combi', 'ピジョン|母乳実感', 1),
    x('combi', 'Combi', '#e60012', 'combi.co.jp', 'aprica', 'コンビ ベビーカー|コンビ チャイルドシート|コンビ株式会社|スゴカル|クルムーヴ|ネムリラ', 1),
    x('aprica', 'Aprica', '#e60012', 'aprica.jp', 'combi', 'アップリカ'),
    x('akachan-honpo', 'Akachan Honpo', '#e4007f', 'akachan.jp', 'nishimatsuya', 'アカチャンホンポ|赤ちゃん本舗'),
    x('nishimatsuya', 'Nishimatsuya', '#e4007f', '24028.jp', 'akachan-honpo', '西松屋'),
    x('unicharm', 'Unicharm', '#00479d', 'unicharm.co.jp', 'elleair', 'ユニ・チャーム|ユニチャーム|ムーニー|マミーポコ|ソフィ はだおもい|超快適マスク|ライフリー|デオシート|銀のスプーン|デオトイレ'),
    x('bean-stalk', 'Bean Stalk', '#00479d', 'beanstalksnow.co.jp', 'meiji', 'ビーンスターク|すこやかM1', 1),
    x('richell', 'Richell', '#e4007f', 'richell.co.jp', 'pigeon', 'リッチェル'),
    x('miki-house', 'MIKI HOUSE', '#e60012', 'mikihouse.co.jp', 'nishimatsuya', 'ミキハウス'),
    x('airbuggy', 'AirBuggy', '#1a1a1a', 'airbuggy.com', 'aprica', 'エアバギー'),
    x('katoji', 'KATOJI', '#00479d', 'katoji.co.jp', 'aprica', 'カトージ'),
    x('alobaby', 'ALOBABY', '#3a7d44', 'alo-organic.com', 'pigeon', 'アロベビー')
  ]);

  // ---- toys ----------------------------------------------------------------

  R.add('toys', [
    x('bandai', 'Bandai', '#e60012', 'bandai.co.jp p-bandai.jp', 'takara-tomy', 'バンダイ|プレミアムバンダイ|ガンプラ|一番くじ|ガシャポン|たまごっち|S.H.Figuarts|魂ウェブ'),
    x('takara-tomy', 'Takara Tomy', '#00479d', 'takaratomy.co.jp', 'bandai', 'タカラトミー|トミカ|プラレール|リカちゃん|ベイブレード|デュエル・マスターズ|デュエマ'),
    x('tamiya', 'Tamiya', '#e60012', 'tamiya.com', 'bandai', 'タミヤ|ミニ四駆'),
    x('sanrio', 'Sanrio', '#e4007f', 'sanrio.co.jp sanrio.com', 'san-x', 'サンリオ|ハローキティ|シナモロール|ポムポムプリン|マイメロディ'),
    x('san-x', 'San-X', '#f5a200', 'san-x.co.jp', 'sanrio', 'サンエックス|リラックマ|すみっコぐらし'),
    x('epoch', 'Epoch', '#e60012', 'epoch.jp sylvanianfamilies.com', 'takara-tomy', 'エポック社|シルバニアファミリー|アクアビーズ', 1),
    x('megahouse', 'MegaHouse', '#e60012', 'megahouse.co.jp', 'takara-tomy', 'メガハウス'),
    x('good-smile', 'Good Smile Company', '#f08300', 'goodsmile.com goodsmile.info', 'kotobukiya', 'グッドスマイルカンパニー|ねんどろいど|グッスマ'),
    x('kotobukiya', 'Kotobukiya', '#00479d', 'kotobukiya.co.jp', 'good-smile', 'コトブキヤ'),
    x('kaiyodo', 'Kaiyodo', '#e60012', 'kaiyodo.co.jp', 'good-smile', '海洋堂'),
    x('medicom-toy', 'Medicom Toy', '#1a1a1a', 'medicomtoy.co.jp', 'good-smile', 'メディコム・トイ|メディコムトイ|BE@RBRICK|ベアブリック'),
    x('animate', 'animate', '#00479d', 'animate.co.jp animate-onlineshop.jp', 'amiami', 'アニメイト', 1),
    x('amiami', 'AmiAmi', '#f08300', 'amiami.jp amiami.com', 'animate', 'あみあみ'),
    x('mandarake', 'Mandarake', '#e60012', 'mandarake.co.jp', 'animate', 'まんだらけ'),
    x('kiddy-land', 'Kiddy Land', '#e60012', 'kiddyland.co.jp', 'sanrio', 'キデイランド'),
    x('donguri-kyowakoku', 'Donguri Republic', '#3a7d44', 'benelic.com', 'kiddy-land', 'どんぐり共和国'),
    x('bornelund', 'BorneLund', '#e60012', 'bornelund.co.jp', 'takara-tomy', 'ボーネルンド'),
    x('toysub', 'Toysub!', '#f5a200', 'toysub.net', 'bornelund', 'トイサブ'),
    x('kato-models', 'KATO', '#00693e', 'katomodels.com', 'takara-tomy', 'KATO 鉄道模型|KATO Nゲージ|関水金属', 1)
  ]);

  // ---- office supplies -----------------------------------------------------

  R.add('stationery', [
    x('kokuyo', 'KOKUYO', '#00479d', 'kokuyo.co.jp kokuyo.com', 'king-jim', 'コクヨ|キャンパスノート'),
    x('pilot-pen', 'PILOT', '#00479d', 'pilot.co.jp', 'mitsubishi-pencil', 'パイロット ボールペン|パイロット 万年筆|フリクションボール|フリクション ペン|FRIXION|ジュースアップ', 1),
    x('mitsubishi-pencil', 'Mitsubishi Pencil', '#b5121b', 'mpuni.co.jp', 'pilot-pen', '三菱鉛筆|ジェットストリーム|クルトガ|uni-ball'),
    x('zebra-pen', 'ZEBRA', '#1a1a1a', 'zebra.co.jp', 'pilot-pen', 'ゼブラ ボールペン|サラサクリップ|マイルドライナー|ゼブラ株式会社', 1),
    x('pentel', 'Pentel', '#e60012', 'pentel.co.jp', 'zebra-pen', 'ぺんてる|エナージェル|オレンズ'),
    x('tombow', 'Tombow', '#00479d', 'tombow.com', 'mitsubishi-pencil', 'トンボ鉛筆|MONO消しゴム'),
    x('sakura-craypas', 'Sakura Craypas', '#e4007f', 'craypas.co.jp', 'pentel', 'サクラクレパス'),
    x('king-jim', 'KING JIM', '#00479d', 'kingjim.co.jp', 'kokuyo', 'キングジム|テプラ'),
    x('shachihata', 'Shachihata', '#e60012', 'shachihata.co.jp', 'king-jim', 'シヤチハタ|シャチハタ'),
    x('sailor-pen', 'Sailor', '#1f2a44', 'sailor.co.jp', 'platinum-pen', 'セーラー万年筆', 1),
    x('platinum-pen', 'Platinum', '#1a1a1a', 'platinum-pen.co.jp', 'sailor-pen', 'プラチナ万年筆', 1),
    x('designphil', 'Designphil', '#3a7d44', 'designphil.co.jp midori-japan.co.jp', 'hobonichi', 'デザインフィル|トラベラーズノート|MDノート'),
    x('hobonichi', 'Hobonichi', '#f08300', '1101.com', 'takahashi-shoten', 'ほぼ日手帳|ほぼ日刊イトイ新聞|ほぼ日ストア'),
    x('takahashi-shoten', 'Takahashi Shoten', '#e60012', 'takahashishoten.co.jp', 'hobonichi', '高橋書店|高橋の手帳'),
    x('maruman', 'Maruman', '#f08300', 'e-maruman.co.jp', 'kokuyo', 'マルマン スケッチブック|マルマン ノート|ニーモシネ', 1),
    x('lihit-lab', 'LIHIT LAB.', '#00913a', 'lihit-lab.com', 'king-jim', 'リヒトラブ', 1),
    x('nichiban', 'Nichiban', '#e60012', 'nichiban.co.jp', 'kokuyo', 'ニチバン|セロテープ|ケアリーヴ'),
    x('kaunet', 'Kaunet', '#f08300', 'kaunet.com', 'askul', 'カウネット'),
    x('tanomail', 'Tanomail', '#e60012', 'tanomail.com', 'askul', 'たのめーる'),
    x('itoya', 'Itoya', '#e60012', 'ito-ya.co.jp', 'loft-jp', '伊東屋'),
    x('nolty', 'NOLTY', '#1f2a44', 'nolty.jp', 'takahashi-shoten', '能率手帳|ノルティ 手帳')
  ]);

  // ---- home security -------------------------------------------------------

  R.add('homesecurity', [
    x('secom', 'SECOM', '#003f8e', 'secom.co.jp', 'alsok', 'セコム'),
    x('alsok', 'ALSOK', '#0068b7', 'alsok.co.jp', 'secom', 'アルソック|綜合警備保障'),
    x('csp', 'CSP', '#00693e', 'we-are-csp.co.jp', 'alsok', 'セントラル警備保障', 1),
    x('tokyu-security', 'Tokyu Security', '#e60012', 'tokyu-security.co.jp', 'secom', '東急セキュリティ'),
    x('qrio', 'Qrio', '#1a1a1a', 'qrio.me', 'sesame-lock', 'Qrio Lock|キュリオロック'),
    x('sesame-lock', 'SESAME', '#1a1a1a', 'candyhouse.co', 'qrio', 'セサミ スマートロック|SESAME5|セサミ5', 1),
    x('bitkey', 'Bitkey', '#1a1a1a', 'bitkey.co.jp', 'akerun', 'ビットキー|bitlock'),
    x('akerun', 'Akerun', '#00a0e9', 'akerun.com', 'bitkey', 'アケルン'),
    x('safie', 'Safie', '#1a1a1a', 'safie.jp', 'atom-cam', 'セーフィー'),
    x('atom-cam', 'ATOM Cam', '#00a0e9', 'atomtech.co.jp', 'safie', 'ATOM Cam|アトムテック|アトムカム', 1),
    x('bsize', 'GPS BoT', '#00b4a0', 'bsize.com', 'mamorio', 'GPS BoT|BoTトーク', 1),
    x('mamorio', 'MAMORIO', '#e60012', 'mamorio.jp', 'bsize', 'マモリオ'),
    x('jbr', 'Japan Best Rescue System', '#e60012', 'jbr.co.jp', 'secom', '生活救急車|ジャパンベストレスキューシステム')
  ]);

  // ---- removals and storage ------------------------------------------------

  R.add('moving', [
    x('sakai', 'Sakai Moving Service', '#0068b7', 'hikkoshi-sakai.co.jp', 'art-hikkoshi', 'サカイ引越センター'),
    x('art-hikkoshi', 'Art Moving Center', '#e60012', 'the0123.com', 'sakai', 'アート引越センター'),
    x('arisan', 'Arisan Mark', '#e60012', '2626.co.jp', 'sakai', 'アリさんマークの引越社|アリさんマーク'),
    x('heart-hikkoshi', 'Heart Moving Center', '#e4007f', 'hikkoshi8100.com', 'arisan', 'ハート引越センター'),
    x('ark-hikkoshi', 'Ark Moving Center', '#0068b7', '0003.co.jp', 'heart-hikkoshi', 'アーク引越センター'),
    x('apple-hikkoshi', 'Apple Moving Center', '#e60012', 'apple-hikkoshi.co.jp', 'ark-hikkoshi', 'アップル引越センター'),
    x('hikkoshi-samurai', 'Hikkoshi Samurai', '#e95513', 'hikkoshizamurai.jp', 'sakai', '引越し侍'),
    x('hello-storage', 'Hello Storage', '#f39800', 'hello-storage.com', 'kase-storage', 'ハローストレージ'),
    x('kase-storage', 'Kase Rental Box', '#0068b7', 'kasegroup.co.jp kase88.com', 'hello-storage', '加瀬のレンタルボックス|加瀬倉庫'),
    x('minikura', 'minikura', '#1a1a1a', 'minikura.com', 'sumally-pocket', 'ミニクラ'),
    x('sumally-pocket', 'Sumally Pocket', '#00b4a0', 'pocket.sumally.com', 'minikura', 'サマリーポケット'),
    x('storage-oh', 'Storage Oh', '#e60012', 'storageoh.jp', 'hello-storage', 'ストレージ王'),
    x('quraz', 'Quraz', '#f39800', 'quraz.com', 'hello-storage', 'キュラーズ'),
    x('oshiire-sangyo', 'Oshiire Sangyo', '#e60012', 'oshiire.co.jp', 'kase-storage', '押入れ産業'),
    x('space-plus', 'Space Plus', '#00a0e9', 'spaceplus.jp', 'hello-storage', 'スペースプラス', 1)
  ]);

  // ---- energy suppliers ----------------------------------------------------

  R.add('power', [
    x('tepco', 'TEPCO', '#00529b', 'tepco.co.jp', 'tokyo-gas', '東京電力|くらしTEPCO'),
    x('kepco', 'Kansai Electric Power', '#e60012', 'kepco.co.jp', 'osaka-gas', '関西電力|はぴeみる電|関電ガス', 1),
    x('chuden', 'Chubu Electric Power', '#e95513', 'chuden.co.jp', 'toho-gas', '中部電力|カテエネ'),
    x('tohoku-epco', 'Tohoku Electric Power', '#00a0e9', 'tohoku-epco.co.jp', 'tepco', '東北電力'),
    x('kyuden', 'Kyushu Electric Power', '#e60012', 'kyuden.co.jp', 'saibu-gas', '九州電力|九電みらいエナジー'),
    x('energia', 'Chugoku Electric Power', '#00a040', 'energia.co.jp', 'kyuden', '中国電力', 1),
    x('yonden', 'Shikoku Electric Power', '#e95513', 'yonden.co.jp', 'energia', '四国電力'),
    x('hepco', 'Hokkaido Electric Power', '#0068b7', 'hepco.co.jp', 'hokkaido-gas', '北海道電力|ほくでん'),
    x('rikuden', 'Hokuriku Electric Power', '#00a040', 'rikuden.co.jp', 'chuden', '北陸電力'),
    x('okiden', 'Okinawa Electric Power', '#e60012', 'okiden.co.jp', 'kyuden', '沖縄電力'),
    x('tokyo-gas', 'Tokyo Gas', '#0068b7', 'tokyo-gas.co.jp', 'tepco', '東京ガス'),
    x('osaka-gas', 'Osaka Gas', '#0068b7', 'osakagas.co.jp', 'kepco', '大阪ガス|Daigas'),
    x('toho-gas', 'Toho Gas', '#e60012', 'tohogas.co.jp', 'chuden', '東邦ガス'),
    x('saibu-gas', 'Saibu Gas', '#00a0e9', 'saibugas.co.jp', 'kyuden', '西部ガス'),
    x('hokkaido-gas', 'Hokkaido Gas', '#e95513', 'hokkaido-gas.co.jp', 'hepco', '北海道ガス|北ガス'),
    x('keiyo-gas', 'Keiyo Gas', '#0068b7', 'keiyogas.co.jp', 'tokyo-gas', '京葉ガス'),
    x('nichigas', 'Nichigas', '#e60012', 'nichigas.co.jp', 'tokyo-gas', 'ニチガス|日本瓦斯'),
    x('lemon-gas', 'Lemon Gas', '#ffe100', 'lemongas.co.jp', 'nichigas', 'レモンガス', 1),
    x('looop', 'Looop Denki', '#00a0e9', 'looop-denki.com', 'tepco', 'Looopでんき|ループでんき'),
    x('rakuten-energy', 'Rakuten Energy', '#bf0000', 'energy.rakuten.co.jp', 'looop', '楽天でんき|楽天エナジー|楽天ガス', 1),
    x('cd-energy', 'CD Energy Direct', '#e95513', 'cdedirect.co.jp', 'tokyo-gas', 'CDエナジー'),
    x('terasel', 'TERASEL Denki', '#00a040', 'terasel.jp', 'looop', 'TERASELでんき|テラセルでんき'),
    x('tokyu-power', 'Tokyu Power Supply', '#e60012', 'tokyu-ps.co.jp tokyu-ps.jp', 'tepco', '東急でんき|東急パワーサプライ|東急ガス'),
    x('enechange', 'ENECHANGE', '#00a0e9', 'enechange.jp', 'looop', 'エネチェンジ'),
    x('tainavi', 'Tainavi', '#f39800', 'tainavi.com', 'solar-partners', 'タイナビ'),
    x('solar-partners', 'Solar Partners', '#f8b500', 'solar-partners.jp', 'tainavi', 'ソーラーパートナーズ', 1)
  ]);

  // ---- petrol stations -----------------------------------------------------

  R.add('fuel', [
    x('eneos', 'ENEOS', '#e60012', 'eneos.co.jp', 'idemitsu', 'エネオス|EneJet|エネジェット'),
    x('idemitsu', 'Idemitsu', '#e60012', 'idemitsu.com', 'eneos', '出光興産|出光 ガソリン|アポロステーション|apollostation'),
    x('cosmo-oil', 'Cosmo Oil', '#00479d', 'cosmo-oil.co.jp cosmo-energy.co.jp', 'eneos', 'コスモ石油|コスモ・ザ・カード|コスモエネルギー'),
    x('kygnus', 'Kygnus', '#00479d', 'kygnus.jp', 'cosmo-oil', 'キグナス石油'),
    x('solato', 'SOLATO', '#f08300', 'taiyooil.net', 'cosmo-oil', '太陽石油'),
    x('usami', 'Usami', '#e60012', 'usami-net.com', 'eneos', '宇佐美 ガソリン|宇佐美鉱油|宇佐美グループ')
  ]);

  // ---- couriers ------------------------------------------------------------

  R.add('shipping', [
    x('yamato', 'Yamato Transport', '#ffcc00', 'kuronekoyamato.co.jp yamato-hd.co.jp', 'sagawa', 'ヤマト運輸|クロネコヤマト|クロネコメンバーズ'),
    x('sagawa', 'Sagawa Express', '#005aab', 'sagawa-exp.co.jp', 'yamato', '佐川急便|飛脚宅配便'),
    x('japan-post', 'Japan Post', '#cc0000', 'post.japanpost.jp', 'yamato', '日本郵便|ゆうパック|レターパック|ゆうパケット', 1),
    x('seino', 'Seino Transportation', '#e60012', 'seino.co.jp', 'fukutsu', '西濃運輸|カンガルー便'),
    x('fukutsu', 'Fukuyama Transporting', '#00693e', 'fukutsu.co.jp', 'seino', '福山通運'),
    x('nippon-express', 'Nippon Express', '#00a0e9', 'nipponexpress.com nittsu.co.jp', 'yamato', '日本通運|NX日本通運|日通の引越し'),
    x('tonami', 'Tonami Transportation', '#0068b7', 'tonami.co.jp', 'seino', 'トナミ運輸'),
    x('ecohai', 'Ecohai', '#00a040', 'ecohai.co.jp', 'sagawa', 'エコ配'),
    x('hacobell', 'Hacobell', '#00a0e9', 'hacobell.com', 'pickgo', 'ハコベル'),
    x('pickgo', 'PickGo', '#f39800', 'pickgo.town', 'hacobell', 'ピックゴー'),
    x('openlogi', 'OPENLOGI', '#00a0e9', 'openlogi.com', 'hacobell', 'オープンロジ'),
    x('tenso', 'tenso.com', '#e60012', 'tenso.com', 'buyee', '転送コム', 1),
    x('buyee', 'Buyee', '#e60012', 'buyee.jp', 'tenso')
  ]);

  // ---- degrees and courses -------------------------------------------------

  R.add('universities', [
    x('n-high', 'N High School', '#1a1a1a', 'nnn.ed.jp', 'clark', 'N高等学校|S高等学校|R高等学校|N高グループ|N中等部', 1),
    x('zen-univ', 'ZEN University', '#1a1a1a', 'zen.ac.jp', 'cyber-univ', 'ZEN大学', 1),
    x('cyber-univ', 'Cyber University', '#0068b7', 'cyber-u.ac.jp', 'tou', 'サイバー大学', 1),
    x('tou', 'Tokyo Online University', '#e95513', 'internet.ac.jp', 'cyber-univ', '東京通信大学', 1),
    x('ouj', 'The Open University of Japan', '#003f8e', 'ouj.ac.jp', 'tou', '放送大学', 1),
    x('kyoto-art', 'Kyoto University of the Arts', '#1a1a1a', 'kyoto-art.ac.jp', 'tou', '京都芸術大学'),
    x('teikyo', 'Teikyo University', '#003f8e', 'teikyo-u.ac.jp', 'nihon-univ', '帝京大学'),
    x('nihon-univ', 'Nihon University', '#e60012', 'nihon-u.ac.jp', 'toyo-univ', '日本大学通信教育部|日大通信', 1),
    x('kindai', 'Kindai University', '#003f8e', 'kindai.ac.jp', 'ritsumeikan', 'Kindai University|近大マグロ', 1),
    x('waseda', 'Waseda University', '#8b0000', 'waseda.jp', 'keio-univ'),
    x('keio-univ', 'Keio University', '#003f8e', 'keio.ac.jp', 'waseda', 'Keio University', 1),
    x('meiji-univ', 'Meiji University', '#5a2d82', 'meiji.ac.jp', 'hosei', 'Meiji University', 1),
    x('toyo-univ', 'Toyo University', '#003f8e', 'toyo.ac.jp', 'nihon-univ', 'Toyo University', 1),
    x('hosei', 'Hosei University', '#f39800', 'hosei.ac.jp', 'meiji-univ'),
    x('chuo-univ', 'Chuo University', '#e60012', 'chuo-u.ac.jp', 'hosei', 'Chuo University', 1),
    x('ritsumeikan', 'Ritsumeikan University', '#8b0000', 'ritsumei.ac.jp', 'doshisha'),
    x('doshisha', 'Doshisha University', '#5a2d82', 'doshisha.ac.jp', 'ritsumeikan'),
    x('kansai-univ', 'Kansai University', '#003f8e', 'kansai-u.ac.jp', 'kwansei', 'Kansai University', 1),
    x('kwansei', 'Kwansei Gakuin University', '#003f8e', 'kwansei.ac.jp', 'kansai-univ'),
    x('aoyama-gakuin', 'Aoyama Gakuin University', '#00693e', 'aoyama.ac.jp', 'rikkyo', 'Aoyama Gakuin University', 1),
    x('rikkyo', 'Rikkyo University', '#5a2d82', 'rikkyo.ac.jp', 'aoyama-gakuin'),
    x('sophia', 'Sophia University', '#8b0000', 'sophia.ac.jp', 'waseda', 'Sophia University', 1),
    x('tokai-univ', 'Tokai University', '#0068b7', 'u-tokai.ac.jp', 'nihon-univ', '東海大学'),
    x('senshu', 'Senshu University', '#00693e', 'senshu-u.ac.jp', 'toyo-univ', '専修大学'),
    x('kanagawa-univ', 'Kanagawa University', '#003f8e', 'kanagawa-u.ac.jp', 'senshu', '神奈川大学'),
    x('mode-gakuen', 'Mode Gakuen', '#1a1a1a', 'mode.ac.jp hal.ac.jp', 'vantan', 'モード学園|HAL東京|HAL大阪|HAL名古屋|専門学校HAL', 1),
    x('vantan', 'Vantan', '#1a1a1a', 'vantan.jp', 'mode-gakuen', 'バンタンデザイン研究所|バンタンゲームアカデミー|バンタンテックフォードアカデミー|バンタン高等学院', 1),
    x('yoani', 'Yoyogi Animation Academy', '#e60012', 'yoani.co.jp', 'amg', '代々木アニメーション学院|代アニ'),
    x('amg', 'Amusement Media Academy', '#e95513', 'amgakuin.co.jp', 'yoani', 'アミューズメントメディア総合学院'),
    x('neec', 'Nippon Engineering College', '#0068b7', 'neec.ac.jp', 'mode-gakuen', '日本工学院'),
    x('tsuji', 'Tsuji Culinary Institute', '#8b0000', 'tsuji.ac.jp', 'neec', '辻調理師専門学校|辻調グループ'),
    x('bunka-fashion', 'Bunka Fashion College', '#1a1a1a', 'bunka-fc.ac.jp', 'mode-gakuen', '文化服装学院'),
    x('clark', 'Clark Memorial International High School', '#003f8e', 'clark.ed.jp', 'n-high', 'クラーク記念国際高等学校|クラーク高校|クラーク国際', 1),
    x('daiichi-gakuin', 'Daiichi Gakuin', '#e95513', 'daiichigakuin.ed.jp', 'clark', '第一学院高等学校|第一学院'),
    x('hchs', 'Human Campus High School', '#e60012', 'hchs.ed.jp', 'clark', 'ヒューマンキャンパス高等学校|ヒューマンキャンパス高校', 1),
    x('renaissance-hs', 'Renaissance High School', '#0068b7', 'r-ac.jp', 'n-high', 'ルネサンス高等学校|ルネサンス高校', 1),
    x('kashima-gakuen', 'Kashima Gakuen', '#003f8e', 'kg-school.net', 'clark', '鹿島学園'),
    x('ohzora', 'Ohzora High School', '#00a0e9', 'ohzora.net', 'clark', 'おおぞら高等学院|おおぞら高校'),
    x('telemail', 'Telemail', '#e60012', 'telemail.jp', 'best-shingaku', 'テレメール', 1),
    x('best-shingaku', 'Best Shingaku Net', '#0068b7', 'best-shingaku.net', 'telemail', 'ベスト進学ネット'),
    x('shinronavi', 'Shinro Navi', '#f39800', 'shinronavi.com', 'telemail', '進路ナビ')
  ]);

  // ---- printing ------------------------------------------------------------

  R.add('printing', [
    x('raksul', 'Raksul', '#00b4a0', 'raksul.com', 'printpac', 'ラクスル'),
    x('printpac', 'Printpac', '#e60012', 'printpac.co.jp', 'raksul', 'プリントパック'),
    x('graphic-jp', 'Graphic', '#e60012', 'graphic.jp', 'raksul', '印刷通販のグラフィック|印刷の通販 グラフィック|グラフィック 印刷', 1),
    x('tcpc', 'Tokyo Color Printing', '#0068b7', 'tcpc.co.jp', 'printpac', '東京カラー印刷'),
    x('kingprinters', 'King Printers', '#f8b500', 'kingprinters.com', 'printpac', 'キングプリンターズ'),
    x('kinkos', "Kinko's Japan", '#0068b7', 'kinkos.co.jp', 'accea', 'キンコーズ'),
    x('accea', 'ACCEA', '#e60012', 'accea.co.jp', 'kinkos', 'アクセア'),
    x('shimauma', 'Shimauma Print', '#1a1a1a', 'n-pri.jp', 'mybook', 'しまうまプリント'),
    x('mybook', 'MyBook', '#e60012', 'mybook.co.jp', 'shimauma', 'マイブック フォトブック|アスカネット', 1),
    x('tolot', 'TOLOT', '#e60012', 'tolot.com', 'shimauma'),
    x('nohana', 'nohana', '#f39800', 'nohana.jp', 'tolot'),
    x('photoback', 'Photoback', '#1a1a1a', 'photoback.jp', 'mybook', 'フォトバック'),
    x('aisatsujo', 'Aisatsujo.com', '#8b0000', 'aisatsujo.com', 'raksul', '挨拶状ドットコム'),
    x('hankoya', 'Hankoya.com', '#8b0000', 'hankoya.com', 'raksul', 'ハンコヤドットコム'),
    x('originalprint', 'OriginalPrint.jp', '#e60012', 'originalprint.jp', 'tmix', 'オリジナルプリント.jp'),
    x('tmix', 'TMIX', '#e60012', 'tmix.jp', 'originalprint'),
    x('suzuri', 'SUZURI', '#1a1a1a', 'suzuri.jp', 'tmix'),
    x('up-t', 'UP-T', '#f39800', 'up-t.jp', 'tmix')
  ]);

  // ---- cashback and coupons ------------------------------------------------

  R.add('points', [
    x('moppy', 'Moppy', '#f39800', 'moppy.jp', 'hapitas', 'モッピー'),
    x('hapitas', 'Hapitas', '#e60012', 'hapitas.jp', 'moppy', 'ハピタス'),
    x('point-income', 'Point Income', '#f08300', 'pointi.jp', 'moppy', 'ポイントインカム', 1),
    x('ecnavi', 'ECnavi', '#00a0e9', 'ecnavi.jp', 'point-town', 'ECナビ'),
    x('point-town', 'Point Town', '#e60012', 'pointtown.com', 'ecnavi', 'ポイントタウン', 1),
    x('warau', 'Warau', '#f8b500', 'warau.jp', 'gendama', 'ポイントサイトワラウ'),
    x('gendama', 'Gendama', '#00a040', 'gendama.jp', 'warau', 'げん玉'),
    x('nifty-point', 'Nifty Point Club', '#ffcc00', 'lifemedia.jp', 'ecnavi', 'ニフティポイントクラブ|ライフメディア'),
    x('amefri', 'Amefri', '#00a0e9', 'amefri.net', '', 'アメフリ'),
    x('sugutama', 'Sugutama', '#00a0e9', 'sugutama.jp', 'gendama', 'ポイントサイトすぐたま|すぐたま ポイント'),
    x('powl', 'Powl', '#ff5a5f', 'powl.jp', 'trima', 'ポイ活アプリPowl'),
    x('trima', 'Trima', '#00b4a0', 'trip-mile.com', 'powl', 'ポイ活アプリ「トリマ」|トリマ ポイ活', 1),
    x('macromill', 'Macromill', '#e60012', 'macromill.com', 'infoq', 'マクロミル'),
    x('infoq', 'infoQ', '#00a0e9', 'infoq.jp', 'macromill', 'インフォキュー|infoQ by GMO', 1),
    x('research-panel', 'Research Panel', '#e95513', 'research-panel.jp', 'macromill', 'リサーチパネル', 1),
    x('fancrew', 'Fancrew', '#e95513', 'fancrew.jp', 'hapitas', 'ファンくる'),
    x('rakuten-rebates', 'Rakuten Rebates', '#bf0000', 'rebates.jp', 'hapitas', '楽天リーベイツ|Rakuten Rebates', 1),
    x('kumapon', 'Kumapon', '#f39800', 'kumapon.jp', 'rakuten-rebates', 'くまポン'),
    x('dot-money', '.money', '#e60012', 'd-money.jp', 'pex', 'ドットマネー', 1),
    x('pex', 'PeX', '#0068b7', 'pex.jp', 'dot-money', 'PeXポイント', 1),
    x('gpoint', 'G Point', '#e60012', 'gpoint.co.jp', 'pex', 'Gポイント', 1),
    x('jre-point', 'JRE POINT', '#00833e', 'jrepoint.jp', 'd-point', 'JRE POINT|JREポイント', 1),
    x('d-point', 'd POINT', '#cc0033', 'dpoint.docomo.ne.jp', 'jre-point', 'dポイントクラブ|dポイントカード', 1),
    x('shufoo', 'Shufoo!', '#e60012', 'shufoo.net', 'tokubai', 'シュフー チラシ|Shufoo'),
    x('tokubai', 'Tokubai', '#e95513', 'tokubai.co.jp', 'shufoo', 'トクバイ')
  ]);

  // ---- advertising ---------------------------------------------------------

  R.add('adtech', [
    x('dentsu', 'Dentsu', '#1a1a1a', 'dentsu.co.jp dentsu.com', 'hakuhodo', '電通グループ|電通デジタル|株式会社電通'),
    x('hakuhodo', 'Hakuhodo', '#1a1a1a', 'hakuhodo.co.jp', 'dentsu', '博報堂'),
    x('adk', 'ADK', '#e60012', 'adk.jp', 'hakuhodo', 'ADKマーケティング|ADKホールディングス', 1),
    x('cyberagent', 'CyberAgent', '#82be28', 'cyberagent.co.jp', 'dentsu', 'サイバーエージェント'),
    x('septeni', 'Septeni', '#e60012', 'septeni.co.jp', 'cyberagent', 'セプテーニ'),
    x('opt', 'OPT', '#1a1a1a', 'opt.ne.jp', 'septeni', '株式会社オプト|オプト 広告', 1),
    x('gmo-nikko', 'GMO NIKKO', '#005bac', 'koukoku.jp', 'septeni', 'GMO NIKKO', 1),
    x('adways', 'Adways', '#e60012', 'adways.net', 'septeni', 'アドウェイズ'),
    x('anagrams', 'Anagrams', '#1a1a1a', 'anagrams.jp', 'septeni', 'アナグラム株式会社', 1),
    x('jeki', 'JR East Marketing & Communications', '#00833e', 'jeki.co.jp', 'dentsu', 'ジェイアール東日本企画', 1),
    x('carta', 'CARTA HOLDINGS', '#1a1a1a', 'cartaholdings.co.jp', 'cyberagent', 'カルタホールディングス', 1),
    x('lycbiz', 'LINE Yahoo for Business', '#06c755', 'lycbiz.com', 'dentsu', 'LINE広告|Yahoo!広告|LINEヤフー for Business', 1),
    x('geniee', 'GENIEE', '#e60012', 'geniee.co.jp', 'microad'),
    x('microad', 'MicroAd', '#e60012', 'microad.co.jp', 'geniee', 'マイクロアド|UNIVERSE Ads'),
    x('freakout', 'FreakOut', '#1a1a1a', 'fout.co.jp', 'microad', 'フリークアウト', 1),
    x('supership', 'Supership', '#0068b7', 'supership.jp', 'freakout', 'スーパーシップ'),
    x('novasell', 'Novasell', '#1a1a1a', 'novasell.com', 'telecy', 'ノバセル'),
    x('telecy', 'Telecy', '#1a1a1a', 'telecy.tv', 'novasell', 'テレシー'),
    x('fancs', 'FAN Communications', '#e60012', 'fancs.com', 'valuecommerce', 'ファンコミュニケーションズ|A8.net|エーハチネット'),
    x('valuecommerce', 'ValueCommerce', '#0068b7', 'valuecommerce.ne.jp', 'fancs', 'バリューコマース'),
    x('afb', 'afb', '#e60012', 'afi-b.com', 'fancs', 'アフィb|アフィビー', 1),
    x('accesstrade', 'AccessTrade', '#0068b7', 'accesstrade.ne.jp interspace.ne.jp', 'fancs', 'アクセストレード|インタースペース'),
    x('rentracks', 'Rentracks', '#e60012', 'rentracks.co.jp', 'afb', 'レントラックス'),
    x('prtimes', 'PR TIMES', '#294c7a', 'prtimes.jp', 'atpress'),
    x('atpress', '@Press', '#e60012', 'atpress.ne.jp', 'prtimes', '@Press|アットプレス', 1),
    x('valuepress', 'ValuePress!', '#00a0e9', 'value-press.com', 'prtimes', 'バリュープレス'),
    x('kyodo-prwire', 'Kyodo News PR Wire', '#003f8e', 'kyodonewsprwire.jp', 'prtimes', '共同通信PRワイヤー'),
    x('mieruca', 'MIERUCA', '#00a0e9', 'mieru-ca.com', 'keywordmap', 'ミエルカ'),
    x('keywordmap', 'Keywordmap', '#1a1a1a', 'keywordmap.jp', 'mieruca', 'キーワードマップ'),
    x('plan-b', 'PLAN-B', '#e60012', 'plan-b.co.jp', 'willgate', 'SEARCH WRITE|PLAN-B', 1),
    x('willgate', 'Willgate', '#00a0e9', 'willgate.co.jp', 'plan-b', 'ウィルゲート'),
    x('shirofune', 'Shirofune', '#1a1a1a', 'shirofune.com', 'ad-ebis', 'シロフネ'),
    x('squad-beyond', 'Squad beyond', '#1a1a1a', 'squadbeyond.com', 'shirofune'),
    x('ad-ebis', 'AD EBiS', '#0068b7', 'ebis.ne.jp', 'shirofune', 'アドエビス'),
    x('ptengine', 'Ptengine', '#00b4a0', 'ptengine.jp', 'sitest'),
    x('sitest', 'SiTest', '#e60012', 'sitest.jp', 'ptengine'),
    x('kaizen-platform', 'Kaizen Platform', '#1a1a1a', 'kaizenplatform.com', 'ptengine', 'カイゼンプラットフォーム', 1),
    x('richka', 'RICHKA', '#1a1a1a', 'richka.co', 'video-brain'),
    x('video-brain', 'Video BRAIN', '#e60012', 'video-b.com', 'richka', 'ビデオブレイン', 1),
    x('uuum', 'UUUM', '#00a0e9', 'uuum.co.jp uuum.jp', 'toridori'),
    x('toridori', 'toridori', '#e95580', 'toridori.co.jp', 'uuum')
  ]);

  // ---- medicines and online clinics ----------------------------------------

  R.add('health', [
    x('yuskin', 'Yuskin', '#f08300', 'yuskin.co.jp', '', 'ユースキン'),
    x('zenyaku', 'Zenyaku Kogyo', '#e60012', 'zenyaku.co.jp', '', '全薬工業|ジキニン|アルージェ'),
    x('kinkan', 'Kinkan', '#f5a200', 'kinkan.co.jp', '', '金冠堂|キンカン 虫さされ|キンカン かゆみ', 1),
    x('taisho-pharma', 'Taisho Pharmaceutical', '#e60012', 'taisho-direct.jp', '', 'パブロン|ナロンエース|ヴイックス|クラリチンEX|プリザエース|リアップX5|リアップリジェンヌ|リアップ 発毛'),
    x('alinamin', 'Alinamin', '#e60012', 'alinamin.jp alinamin-kenko.jp', '', 'アリナミン|ベンザブロック'),
    x('daiichi-sankyo-hc', 'Daiichi Sankyo Healthcare', '#0068b7', 'daiichisankyo-hc.co.jp', '', '第一三共ヘルスケア|ロキソニン|ルルアタック|ガスター10|トランシーノ|新ルル'),
    x('kowa', 'Kowa', '#0068b7', 'kowa.co.jp', '', 'キューピーコーワ|バンテリン|キャベジン|ウナコーワ|コルゲンコーワ|興和株式会社', 1),
    x('hisamitsu', 'Hisamitsu', '#00a040', 'hisamitsu.co.jp', '', '久光製薬|サロンパス|フェイタス|アレグラFX'),
    x('sato-pharma', 'Sato Pharmaceutical', '#f39800', 'sato-seiyaku.co.jp', '', 'サトウ製薬|佐藤製薬|ユンケル|ストナリニ'),
    x('zeria', 'Zeria', '#0068b7', 'zeria.co.jp', '', 'ゼリア新薬|ヘパリーゼ|コンドロイチンZS'),
    x('tsumura', 'Tsumura', '#8b0000', 'tsumura.co.jp', '', 'ツムラ漢方|ツムラの'),
    x('ohta-isan', 'Ohta Isan', '#00693e', 'ohta-isan.co.jp', '', '太田胃散'),
    x('ryukakusan', 'Ryukakusan', '#003f8e', 'ryukakusan.co.jp', '', '龍角散'),
    x('eisai', 'Eisai', '#e60012', 'eisai.co.jp chocola.com', '', 'チョコラBB|エーザイ|セルベール|ナボリン'),
    x('shionogi-hc', 'Shionogi Healthcare', '#0068b7', 'shionogi-hc.co.jp', '', 'シオノギヘルスケア|セデス・ハイ|新セデス錠|ポポンS'),
    x('wakamoto', 'Wakamoto', '#f39800', 'wakamoto-pharm.co.jp', '', '強力わかもと|わかもと製薬'),
    x('biofermin', 'Biofermin', '#0068b7', 'biofermin.co.jp', '', 'ビオフェルミン'),
    x('yomeishu', 'Yomeishu', '#8b0000', 'yomeishu.co.jp', '', '養命酒'),
    x('seirogan', 'Seirogan', '#f39800', 'seirogan.co.jp', '', '正露丸|大幸薬品'),
    x('kyushin', 'Kyushin', '#8b0000', 'kyushin.co.jp', '', '救心製薬|救心錠剤|救心カプセル'),
    x('arax', 'Arax', '#e60012', 'arax.co.jp', '', 'ノーシンピュア|株式会社アラクス|頭痛にノーシン', 1),
    x('ikeda-mohando', 'Ikeda Mohando', '#00a0e9', 'ikedamohando.co.jp', '', '池田模範堂|液体ムヒ|ムヒアルファ|ムヒパッチ'),
    x('santen', 'Santen', '#0068b7', 'santen.co.jp santen.com', '', '参天製薬|サンテFX|ソフトサンティア|サンテメディカル'),
    x('borraginol', 'Borraginol', '#f8b500', 'borraginol.com', '', 'ボラギノール'),
    x('asada-ame', 'Asada Ame', '#003f8e', 'asadaame.co.jp', '', '浅田飴'),
    x('sokuyaku', 'SOKUYAKU', '#00a0e9', 'sokuyaku.jp', '', 'ソクヤク'),
    x('smaluna', 'Smaluna', '#e95580', 'smaluna.com', '', 'スマルナ'),
    x('mederi', 'mederi', '#e95580', 'mederi.jp', '', 'メデリピル'),
    x('luna-luna', 'Luna Luna', '#e95580', 'lnln.jp', '', 'ルナルナ', 1),
    x('fast-doctor', 'Fast DOCTOR', '#00a0e9', 'fastdoctor.jp', '', 'ファストドクター', 1),
    x('call-doctor', 'Call Doctor', '#f39800', 'calldoctor.jp', '', 'コールドクター|みてねコールドクター', 1),
    x('ubie', 'Ubie', '#3d7fe5', 'ubie.app ubiehealth.com', '', 'ユビー 症状検索|症状検索エンジン「ユビー」|ユビーAI'),
    x('askdoctors', 'AskDoctors', '#00a0e9', 'askdoctors.jp', '', 'アスクドクターズ'),
    x('oops', 'Oops', '#1a1a1a', 'oops-jp.com', '', 'Oops（ウープス）|Oops HAIR|Oops LOVE|Oops WOMB', 1),
    x('epark', 'EPARK', '#e60012', 'epark.jp', '', 'EPARKくすりの窓口|EPARK歯科|EPARKリラク'),
    x('medical-note', 'Medical Note', '#00a0e9', 'medicalnote.jp', '', 'メディカルノート', 1),
    x('mrso', 'MRSO', '#00a0e9', 'mrso.jp', '', '人間ドックのマーソ|MRSO（マーソ）'),
    x('genequest', 'Genequest', '#00a0e9', 'genequest.jp', '', 'ジーンクエスト'),
    x('genelife', 'GeneLife', '#e95580', 'genelife.jp', '', 'ジーンライフ')
  ]);

  // ---- legal services ------------------------------------------------------

  R.add('legal', [
    x('vbest', 'Verybest Law Offices', '#00693e', 'vbest.jp', '', 'ベリーベスト法律事務所|ベリーベスト'),
    x('alg', 'ALG & Associates', '#003f8e', 'avance-lg.com', '', '弁護士法人ALG|ALG&Associates', 1),
    x('bengo4', 'Bengo4.com', '#f39800', 'bengo4.com', '', '弁護士ドットコム'),
    x('hibiki-law', 'Hibiki Law Office', '#003f8e', 'hibiki-law.or.jp', '', '弁護士法人・響|弁護士法人響'),
    x('hatano', 'Hatano Legal Office', '#00693e', 'hikari-hatano.com', '', 'はたの法務事務所'),
    x('sugiyama', 'Sugiyama Office', '#003f8e', 'sugiyama-kabaraikin.com', '', '杉山事務所'),
    x('thank-law', 'Thank Law Office', '#0068b7', 'thank-law.jp', '', 'サンク総合法律事務所'),
    x('gladiator', 'Gladiator Law Office', '#8b0000', 'gladiator.jp', '', 'グラディアトル法律事務所', 1),
    x('daylight-law', 'Daylight Law Firm', '#f39800', 'daylight-law.jp', '', 'デイライト法律事務所'),
    x('protect-stance', 'Protect Stance', '#003f8e', 'protectstance.com', '', 'プロテクトスタンス'),
    x('green-shihoshoshi', 'Green Judicial Scrivener', '#00a040', 'green-osaka.com', '', 'グリーン司法書士法人'),
    x('avance-houmu', 'Avance Legal Office', '#0068b7', 'avance-jud.jp', '', 'アヴァンス法務事務所')
  ]);

  // ---- tobacco and vapes ---------------------------------------------------

  R.add('tobacco', [
    x('dr-stick', 'Dr.Stick', '#1a1a1a', 'dr-stick.shop', '', 'ドクタースティック'),
    x('jt', 'JT', '#00a040', 'jti.co.jp clubjt.jp', '', '日本たばこ産業|CLUB JT|JTのたばこ', 1),
    x('ploom', 'Ploom', '#1a1a1a', 'ploom.jp', '', 'プルーム・エックス|Ploom X|プルーム・オーラ|Ploom AURA|プルーム'),
    x('dr-vape', 'DR.VAPE', '#1a1a1a', 'drvape.jp', '', 'ドクターベイプ'),
    x('nicoless', 'NICOLESS', '#00a040', 'nicoless.jp', '', 'ニコレス')
  ]);

  // ---- more names and sites for brands the earlier files define ------------

  R.alias('kirin', 'キリンビバレッジ|キリン 生茶|キリンレモン|淡麗グリーンラベル|のどごし生|スプリングバレー|本搾り|麒麟特製|晴れ風|ホームタップ|iMUSE');
  R.alias('asahi', 'クリアアサヒ|アサヒ ザ・リッチ|マルエフ|ドライゼロ|アサヒスタイルフリー|贅沢搾り|アサヒ生ビール黒生');
  R.alias('sapporo', '麦とホップ|サッポロクラシック|サッポロ生ビール|濃いめのレモンサワー|男梅サワー');
  R.alias('suntory', 'ストロングゼロ|こだわり酒場|翠ジンソーダ|デカビタ|グリーンダカラ|ザ・プレミアム・モルツ|金麦ザ・ラガー');
  R.alias('yona-yona', 'インドの青鬼|水曜日のネコ|僕ビール君ビール');
  R.alias('calpis', 'ウィルキンソン|アサヒ十六茶|ドデカミン|ワンダ モーニングショット');
  R.alias('ito-en', '健康ミネラルむぎ茶|1日分の野菜|充実野菜');
  R.alias('pocari', 'エクエル|ボディメンテ|ソイジョイ|SOYJOY|ファイブミニ|オロナイン');
  R.alias('yakult', 'ヤクルト1000|Y1000|ミルミル|タフマン');
  R.alias('takara', 'タカラ焼酎ハイボール|澪 スパークリング|宝焼酎');
  R.alias('nikka', '余市 ウイスキー|宮城峡');
  R.alias('dr-pepper', 'ドクターペッパー');
  R.alias('mountain-dew', 'マウンテンデュー');
  R.alias('gatorade', 'ゲータレード');
  R.alias('canada-dry', 'カナダドライ');
  R.alias('schweppes', 'シュウェップス');
  R.alias('san-pellegrino', 'サンペレグリノ');
  R.alias('budweiser', 'バドワイザー');
  R.alias('carlsberg', 'カールスバーグ');
  R.alias('guinness', 'ギネスビール|ギネス ドラフト');
  R.alias('corona', 'コロナ エキストラ|コロナビール');
  R.alias('stella', 'ステラ・アルトワ|ステラアルトワ');
  R.alias('jameson', 'ジェムソン');
  R.alias('remy-martin', 'レミーマルタン');
  R.alias('captain-morgan', 'キャプテンモルガン');
  R.alias('baileys', 'ベイリーズ');
  R.alias('aperol', 'アペロール');
  R.alias('grey-goose', 'グレイグース');
  R.alias('mcdonalds', 'ハッピーセット|マックフルーリー|チキンマックナゲット|月見バーガー|てりやきマックバーガー|サムライマック|マックデリバリー');
  R.alias('burger-king', 'ワッパー');
  R.alias('mos-burger', 'モスライスバーガー|モスの菜摘');
  R.alias('lotteria', 'ゼッテリア|絶品チーズバーガー');
  R.alias('wendys', 'ウェンディーズ|ファーストキッチン');
  R.dom('wendys', 'wendys-firstkitchen.co.jp');
  R.alias('taco-bell', 'タコベル');
  R.alias('popeyes', 'ポパイズ');
  R.alias('five-guys', 'ファイブガイズ');
  R.alias('skylark', 'しゃぶ葉|ステーキガスト|から好し|むさしの森珈琲|ガストの宅配|すかいらーくグループ');
  R.alias('matsuya', '松のや|マイカリー食堂');
  R.alias('kura-sushi', 'ビッくらポン');
  R.alias('mister-donut', 'ポン・デ・リング|ポンデリング|misdo');
  R.alias('starbucks', 'フラペチーノ');
  R.alias('doutor', 'エクセルシオール');
  R.alias('komeda', 'シロノワール');
  R.alias('keurig', 'キューリグ');
  R.alias('lavazza', 'ラバッツァ');
  R.alias('costa', 'コスタコーヒー');
  R.alias('seven-eleven', 'セブンプレミアム|セブンカフェ');
  R.dom('seven-eleven', '7premium.jp');
  R.alias('familymart', 'ファミチキ|ファミマル');
  R.dom('familymart', 'famima.com');
  R.alias('lawson', 'からあげクン|ウチカフェ|Uchi Café');
  R.alias('aeon', 'マックスバリュ|まいばすけっと|トップバリュ|ダイエー');
  R.dom('aeon', 'topvalu.net aeonmall.com daiei.co.jp');
  R.alias('ito-yokado', 'ヨーカドー|ヨークフーズ');
  R.alias('seiyu', 'みなさまのお墨付き|楽天西友');
  R.alias('life-super', 'ライフコーポレーション');
  R.alias('nissin', 'チキンラーメン|日清焼そば|日清ラ王|完全メシ|カレーメシ|日清シスコ|ごろグラ|シスコーン');
  R.dom('nissin', 'cupnoodle.jp donbei.jp');
  R.alias('maruchan', '緑のたぬき|マルちゃん正麺|麺づくり');
  R.alias('calbee', 'フルグラ|じゃがビー|Jagabee|ピザポテト|サッポロポテト|堅あげポテト');
  R.alias('koikeya', 'コイケヤ|カラムーチョ|ポリンキー|ドンタコス|プライドポテト');
  R.alias('meiji', '明治R-1|R-1ヨーグルト|明治おいしい牛乳|チョコレート効果|明治プロビオ|明治ほほえみ|アミノコラーゲン');
  R.alias('glico', 'パピコ|ジャイアントコーン|アーモンド効果|アイスの実|ジャイアントカプリコ|アイクレオ|パワープロダクション');
  R.alias('lotte', 'ガーナミルク|ガーナチョコ|クーリッシュ|パイの実|ロッテ キシリトール|乳酸菌ショコラ');
  R.alias('morinaga', 'チョコボール|inゼリー|チョコモナカジャンボ|森永ビスケット|森永ココア|ムーンライトクッキー|おいしいコラーゲンドリンク');
  R.alias('bourbon-jp', 'アルフォート|ルマンド|ブランチュール|フェットチーネグミ');
  R.alias('ajinomoto', 'ほんだし|アミノバイタル|鍋キューブ|丸鶏がらスープ|クノール カップスープ');
  R.alias('kagome', '野菜生活|野菜一日これ一本|つぶより野菜');
  R.alias('house-foods', 'ジャワカレー|ウコンの力|とんがりコーン|フルーチェ|北海道シチュー|こくまろカレー|ネルノダ|メガシャキ');
  R.dom('house-foods', 'housefoods-group.com');
  R.alias('sb-foods', 'とろけるカレー|ディナーカレー|赤缶カレー粉');
  R.alias('yamazaki', 'ロイヤルブレッド|ダブルソフト|薄皮つぶあんぱん|春のパンまつり|まるごとバナナ');
  R.alias('kikkoman', 'しぼりたて生しょうゆ|キッコーマン豆乳');
  R.alias('hersheys', 'ハーシー チョコレート|ハーシーズ');
  R.alias('mars', 'スニッカーズ|エムアンドエムズ');
  R.alias('doritos', 'ドリトス');
  R.alias('cheetos', 'チートス');
  R.alias('matsukiyo', 'ココカラファイン|マツキヨココカラ');
  R.alias('donki', '驚安の殿堂|majica');
  R.alias('daiso', 'スタンダードプロダクツ|THREEPPY');
  R.alias('yahoo-auctions', 'Yahoo!フリマ|PayPayフリマ|ヤフーフリマ|Yahoo!オークション');
  R.alias('rakuten', '楽天スーパーSALE|楽天お買い物マラソン|Rakuten Ichiba');
  R.alias('ebay', 'イーベイ');
  R.alias('nitori', 'Nクール|Nウォーム|Nスリープ|お、ねだん以上');
  R.alias('dcm', 'DCMオンライン|ケーヨーデイツー|DCMブランド');
  R.dom('dcm', 'dcm-ekurashi.com');
  R.alias('lixil', 'INAX|サティス トイレ|リシェル キッチン');
  R.alias('toto', 'ネオレスト|TOTO ウォシュレット|TOTO サザナ');
  R.alias('yamada-denki', 'ヤマダウェブコム|ヤマダホールディングス|YAMADA web.com');
  R.dom('yamada-denki', 'yamada-denkiweb.com');
  R.alias('joshin', '上新電機|Joshin web');
  R.alias('sony', 'ウォークマン|WH-1000XM|WF-1000XM|サイバーショット|ハンディカム|LinkBuds|INZONE');
  R.alias('panasonic', 'ナノケア|4Kビエラ|VIERA|ディーガ|ラムダッシュ|レッツノート|エオリア|ドルツ|ナノイー|テクニクス|ストラーダ');
  R.alias('sharp', 'プラズマクラスター|ヘルシオ|ホットクック');
  R.alias('hitachi', 'ビートウォッシュ|白くまくん|日立の家電');
  R.alias('toshiba', '石窯ドーム|東芝ライフスタイル');
  R.alias('canon', 'Canon EOS|PIXUS|ピクサス');
  R.alias('fujifilm', 'アスタリフト|フジフイルム|メタバリア');
  R.alias('epson', 'エコタンク|カラリオ');
  R.alias('brother-print', 'ブラザー工業|プリビオ');
  R.alias('iris-ohyama', 'アイリスプラザ');
  R.alias('anker', 'Soundcore|Anker Nano|Anker PowerCore');
  R.alias('irobot', 'アイロボット|ブラーバ');
  R.alias('shark', 'シャーク 掃除機|EVOPOWER|エヴォパワー');
  R.alias('lg', 'LGエレクトロニクス|LG 有機EL');
  R.alias('gopro', 'ゴープロ');
  R.alias('dji', 'DJI Osmo|DJI Mavic|DJI Mini');
  R.alias('bose', 'QuietComfort');
  R.alias('belkin', 'ベルキン');
  R.alias('apple', 'アイフォーン|アップルウォッチ|エアポッズ|アイパッド|マックブック');
  R.alias('samsung', 'サムスン|Galaxy Z Flip|Galaxy Watch|Galaxy Buds');
  R.alias('google-pixel', 'グーグルピクセル|Pixel 9a|Pixel 10 Pro');
  R.alias('dospara', 'raytrek|THIRDWAVE|サードウェーブ');
  R.alias('mouse-computer', 'DAIV|NEXTGEAR|マウス ノートPC');
  R.alias('pc-koubou', 'LEVEL∞|ユニットコム|iiyama PC');
  R.alias('fmv', 'LIFEBOOK|FMV Note|らくらくパソコン');
  R.alias('nec-lavie', 'NECパーソナルコンピュータ');
  R.alias('dell', 'Inspiron|デル・テクノロジーズ|Dell Technologies');
  R.alias('hp', '日本HP|ヒューレット・パッカード|HP Directplus');
  R.alias('asus', 'エイスース|ROG Ally|Vivobook');
  R.alias('acer', 'Acer Swift|Acer Nitro|日本エイサー');
  R.alias('msi', 'エムエスアイ|MSI ノートPC');
  R.alias('amd', 'AMD Ryzen');
  R.alias('razer', 'Razer Blade|Razer DeathAdder');
  R.alias('uniqlo', 'ヒートテック|エアリズム|ウルトラライトダウン|感動ジャケット');
  R.alias('shimamura', 'アベイル');
  R.alias('aoyama', 'THE SUIT COMPANY|ザ・スーツカンパニー|スーツスクエア');
  R.alias('aoki', 'ORIHICA|オリヒカ|AOKI スーツ|パジャマスーツ|紳士服のAOKI');
  R.alias('wacoal', 'CW-X|サルート');
  R.alias('casio', 'Gショック|ジーショック|BABY-G|オシアナス|プロトレック');
  R.alias('seiko', 'プロスペックス|プレザージュ|アストロン|セイコーセレクション');
  R.dom('seiko', 'grand-seiko.com');
  R.alias('citizen', 'アテッサ|クロスシー|プロマスター|エコ・ドライブ|ザ・シチズン');
  R.alias('omega', 'オメガ スピードマスター|オメガ シーマスター|オメガ 時計');
  R.alias('pandora-jewelry', 'パンドラ ジュエリー');
  R.alias('banana-republic', 'バナナ・リパブリック|バナナリパブリック|バナリパ');
  R.alias('american-eagle', 'アメリカンイーグル');
  R.alias('hollister', 'ホリスター');
  R.alias('forever-21', 'フォーエバー21');
  R.alias('victorias-secret', 'ヴィクトリアズ・シークレット|ヴィクトリアシークレット');
  R.alias('asics', 'ゲルカヤノ|GEL-KAYANO|メタスピード|アシックスウォーキング|NOVABLAST');
  R.alias('mizuno', 'ウエーブライダー|ミズノプロ|ブレスサーモ');
  R.alias('north-face', 'ゴールドウイン|Goldwin');
  R.alias('alpen', 'ゴルフ5|GOLF5|Alpen TOKYO');
  R.alias('xebio', 'スーパースポーツゼビオ|ヴィクトリアゴルフ|エルブレス');
  R.alias('reebok', 'リーボック');
  R.alias('lululemon', 'ルルレモン');
  R.alias('allbirds', 'オールバーズ');
  R.alias('vans', 'ヴァンズ');
  R.alias('columbia', 'コロンビア スポーツウェア|Columbia スポーツウェア');
  R.alias('on-running', 'クラウドモンスター|Cloudsurfer|オン ランニング');
  R.alias('shiseido', 'アネッサ|アルティミューン|dプログラム|ベネフィーク|プリオール|アクアレーベル|マジョリカ マジョルカ|ザ・コラーゲン');
  R.alias('kose', 'エスプリーク|ONE BY KOSE|クリアターン|ソフティモ|ジュレーム|ビオリス|ネイルホリック');
  R.dom('kose', 'decorte.com');
  R.alias('kanebo', 'KATE TOKYO|リップモンスター|suisai|スイサイ|アリィー|コフレドール|フリープラス|ミラノコレクション');
  R.dom('kanebo', 'nomorerules.net');
  R.alias('kao', 'メリーズ|アタックZERO|アタック抗菌EX|キュキュット|マジックリン|クイックルワイパー|めぐりズム|リセッシュ|ロリエ|ヘルシア|ニャンとも清潔トイレ');
  R.alias('lion', 'NANOX|ナノックス|キレイキレイ|ルックプラス|ソフラン|システマ ハブラシ|デントヘルス|チャーミーマジカ|バファリン');
  R.alias('rohto', 'オバジ|デオコ|DEOCO|スキンアクア|メンソレータム|ロートV|ロートジー');
  R.alias('pola', 'ポーラ化粧品|ホワイトショット|POLA B.A');
  R.alias('fancl', 'マイルドクレンジングオイル|カロリミット|内脂サポート');
  R.alias('dhc', 'ディーエイチシー');
  R.alias('botanist', 'YOLU|ヨル ナイトリペア|SALONIA|サロニア');
  R.alias('suntory-wellness', 'オメガエイド|セサミンEX|VARON|ヴァロン');
  R.alias('kai', '関孫六|KAI RAZOR|貝印カミソリ');
  R.alias('sephora', 'セフォラ');
  R.alias('cerave', 'セラヴィ');
  R.alias('cetaphil', 'セタフィル');
  R.alias('neutrogena', 'ニュートロジーナ');
  R.alias('colgate', 'コルゲート');
  R.alias('fenty', 'フェンティ ビューティ');
  R.alias('charlotte-tilbury', 'シャーロット ティルブリー');
  R.alias('centrum', 'セントラム');
  R.alias('fitbit', 'フィットビット');
  R.alias('oura', 'オーラリング');
  R.alias('toyota', 'ハリアー|ランドクルーザー|ランクル|シエンタ|ヴォクシー|カローラ|ルーミー|ヴェルファイア|ハイエース|RAV4|bZ4X|GR86');
  R.dom('toyota', 'gazoo.com');
  R.alias('honda', 'ヴェゼル|ステップワゴン|N-WGN|ZR-V|WR-V|Honda SENSING');
  R.alias('nissan', 'ニッサン|エクストレイル|e-POWER|フェアレディZ|プロパイロット');
  R.alias('subaru', 'フォレスター|レヴォーグ|インプレッサ|クロストレック|レイバック|アイサイト');
  R.alias('mazda', 'CX-5|CX-60|CX-80|MAZDA3|MX-30|CX-30');
  R.alias('suzuki', 'スイフト|ソリオ|ワゴンR|クロスビー|エブリイ|フロンクス');
  R.alias('daihatsu', 'ムーヴ キャンバス|ミライース|ハイゼット');
  R.alias('mitsubishi-motors', 'アウトランダー|eKクロス|トライトン|エクリプス クロス|パジェロ');
  R.alias('bridgestone', 'ブリザック|BLIZZAK|REGNO|レグノ|ポテンザ|エコピア');
  R.alias('goo-net', 'グー買取');
  R.alias('chevrolet', 'シボレー');
  R.dom('chevrolet', 'chevroletjapan.com');
  R.dom('cadillac', 'cadillacjapan.com');
  R.dom('jaguar', 'jaguar.co.jp');
  R.alias('jeep', 'ジープ ラングラー|ジープ コンパス|ジープ アベンジャー');
  R.alias('mini', 'ミニクーパー|MINI クロスオーバー');
  R.alias('byd', 'BYD ドルフィン|BYD シール|BYD ATTO 3|ビーワイディー');
  R.alias('polestar', 'ポールスター');
  R.alias('goodyear', 'グッドイヤー');
  R.alias('nintendo', 'ゼルダの伝説|スーパーマリオ|Nintendo Switch 2|スイッチ2|星のカービィ|ピクミン|ファイアーエムブレム|大乱闘スマッシュブラザーズ|スマブラ|ニンテンドーeショップ|マイニンテンドー');
  R.alias('playstation', 'PS Plus|PlayStation Plus|PS VR2|PlayStation Portal');
  R.alias('xbox', 'エックスボックス|Xbox Game Pass');
  R.alias('meta-quest', 'メタクエスト');
  R.alias('geo', 'ゲオモバイル|ゲオアプリ|ゲオ公式');
  R.alias('final-fantasy', 'FF7|FINAL FANTASY VII|スクエニ|ロマンシング サガ|ロマサガ|ニーア オートマタ|オクトパストラベラー|キングダム ハーツ|FFBE');
  R.dom('final-fantasy', 'finalfantasyxiv.com');
  R.alias('dqwalk', 'ドラクエ|DQウォーク|ドラゴンクエストタクト');
  R.alias('monster-hunter', 'バイオハザード|ストリートファイター6|スト6|ロックマン|逆転裁判|Resident Evil|Street Fighter');
  R.alias('konami-games', '遊戯王|遊☆戯☆王|メタルギア|METAL GEAR|桃太郎電鉄|パワフルプロ野球|ウイニングイレブン');
  R.alias('sega', 'ソニック・ザ・ヘッジホッグ|ぷよぷよ|ぷよクエ|PSO2|サクラ大戦');
  R.alias('bandai-namco', 'ドッカンバトル|バウンティラッシュ|太鼓の達人|パックマン|テイルズ オブ|エースコンバット|ドラゴンボール レジェンズ');
  R.alias('pokemon', 'ポケモンセンター|ポケモンカード|ポケカ|ポケポケ|Pokémon TCG Pocket');
  R.dom('pokemon', 'pokemoncenter-online.com pokemon-card.com');
  R.alias('cygames', 'プリコネ|シャドバ|Granblue Fantasy');
  R.dom('cygames', 'granbluefantasy.jp granbluefantasy.com priconne-redive.jp shadowverse.jp');
  R.alias('monster-strike', 'XFLAG|コトダマン');
  R.alias('pazudora', 'ガンホー|ニンジャラ');
  R.dom('pazudora', 'gungho.jp gungho.co.jp');
  R.alias('fgo', 'フェイト・グランドオーダー|ツイステッドワンダーランド|ツイステ|Aniplex|アニプレックス');
  R.alias('dmm-games', '刀剣乱舞|艦これ|艦隊これくしょん');
  R.alias('candy-crush', 'キャンディークラッシュ');
  R.alias('royal-match', 'ロイヤルマッチ');
  R.alias('raid', 'レイド シャドウレジェンド|レイド: Shadow Legends');
  R.alias('monopoly-go', 'モノポリーGO');
  R.alias('coin-master', 'コインマスター');
  R.alias('township', 'タウンシップ|ガーデンスケイプ|ホームスケイプ');
  R.alias('hero-wars', 'ヒーローウォーズ');
  R.alias('roblox', 'ロブロックス');
  R.alias('fortnite', 'フォートナイト');
  R.alias('call-of-duty', 'コール オブ デューティ|コールオブデューティ');
  R.alias('ea', 'エーペックスレジェンズ|エレクトロニック・アーツ');
  R.alias('league', 'リーグ・オブ・レジェンド|ヴァロラント');
  R.alias('wow', 'ディアブロ IV|オーバーウォッチ');
  R.alias('ubisoft', 'アサシン クリード|ユービーアイソフト');
  R.alias('pubg', 'PUBGモバイル');
  R.alias('kanebo', 'リサージ');
  R.dom('kanebo', 'lissage.jp');
  R.alias('smbc', 'Oliveアカウント|Oliveフレキシブルペイ');
  R.alias('mufg', 'バンクイック|三菱UFJダイレクト');
  R.alias('resona', '埼玉りそな銀行|りそなグループアプリ');
  R.dom('resona', 'saitamaresona.co.jp');
  R.alias('yucho', 'ゆうちょPay|ゆうちょ通帳アプリ');
  R.alias('saison', 'クレディセゾン|セゾンパール');
  R.alias('aeon-card', 'AEON Pay|イオンペイ');
  R.dom('visa', 'visa.co.jp');
  R.dom('mastercard', 'mastercard.co.jp');
  R.dom('amex', 'americanexpress.co.jp');
  R.alias('au-kabucom', '三菱UFJ eスマート証券|eスマート証券');
  R.alias('smbc-nikko', '日興フロッギー');
  R.alias('oanda', 'オアンダ');
  R.alias('ibkr', 'インタラクティブ・ブローカーズ');
  R.alias('tradingview', 'トレーディングビュー');
  R.alias('bybit', 'バイビット');
  R.alias('acom', 'ACマスターカード');
  R.alias('paypal', 'ペイパル');
  R.alias('revolut', 'レボリュート');
  R.alias('merpay', 'メルカード|メルペイスマート払い|メルペイスマートマネー');
  R.alias('nuro', 'NUROモバイル');
  R.alias('rakuten-mobile', '楽天ひかり');
  R.alias('jr-central', 'エクスプレス予約');
  R.alias('trip-com', 'トリップドットコム');
  R.dom('expedia', 'expedia.co.jp');
  R.dom('tripadvisor', 'tripadvisor.jp');
  R.dom('trivago', 'trivago.jp');
  R.dom('airbnb', 'airbnb.jp');
  R.alias('hotels-com', 'ホテルズドットコム');
  R.alias('zipair', 'ジップエア');
  R.alias('klm', 'KLMオランダ航空');
  R.alias('united', 'ユナイテッド航空');
  R.alias('delta', 'デルタ航空');
  R.alias('american', 'アメリカン航空');
  R.alias('british-airways', 'ブリティッシュ・エアウェイズ');
  R.alias('budget-rental', 'バジェットレンタカー');
  R.dom('budget-rental', 'budgetrentacar.co.jp');
  R.dom('mitsui-fudosan', 'rehouse.co.jp');
  R.dom('sumitomo-fudosan', 'stepon.co.jp');
  R.alias('sekisui-house', 'シャーメゾン');
  R.alias('en-tenshoku', 'エン派遣|ミドルの転職|エン エージェント');
  R.alias('recruit-agent', 'リクルートダイレクトスカウト');
  R.alias('wantedly', 'ウォンテッドリー');
  R.alias('linkedin', 'リンクトイン');
  R.dom('indeed', 'indeed.jp');
  R.alias('toshin', '東進衛星予備校|東進オンライン学校');
  R.alias('udemy', 'ユーデミー');
  R.alias('ibj', 'ブライダルネット|PARTY☆PARTY|IBJマッチング');
  R.dom('ibj', 'bridalnet.co.jp partyparty.jp');
  R.alias('hulu', 'フールー');
  R.dom('hulu', 'hulu.jp');
  R.alias('wowow', 'ワウワウ|WOWOWオンデマンド');
  R.dom('tsutaya', 'discas.net');
  R.dom('dazn', 'dazn.co.jp');
  R.alias('rakuraku', 'メールディーラー|配配メール|楽楽販売');
  R.dom('rakuraku', 'rakurakumeisai.jp maildealer.jp hai2mail.jp');
  R.dom('sansan', '8card.net');
  R.alias('airregi', 'Airリザーブ|Airシフト|Airウェイト');
  R.alias('kintone', 'Garoon|サイボウズ Office');
  R.alias('docusign', 'ドキュサイン');
  R.alias('backlog', 'ヌーラボ');
  R.alias('shopify', 'ショッピファイ');
  R.alias('wordpress', 'ワードプレス');
  R.dom('trend-micro', 'trendmicro.co.jp');
  R.alias('perplexity', 'パープレキシティ');
  R.alias('tipness', 'ファストジム24|FASTGYM24');
  R.dom('tipness', 'fastgym24.jp');
  R.alias('keirin', 'ガールズケイリン|KEIRINグランプリ');
  R.alias('jra', '即PAT');

  // Sites that only answer with "www." in front.
  R.www('aqua-clara hakkaisan mercian kakuyasu saint-marc pronto ogawa-coffee kalita nakau cocos jolly-pasta bronco-billy');
  R.www('ippudo jojoen hotto-motto hokka-hokka-tei origin-bento summit-store yaoko tokyu-store inageya okuwa beisia trial-super');
  R.www('fujiya yamazaki-biscuits kanro imuraya akagi ishiya letao morozoff chateraise cozy-corner sanyo-foods myojo-foods');
  R.www('nichirei-foods maruha-nichiro nipponham itoham prima-ham marudai mizkan marukome hanamaruki yamaki ninben momoya');
  R.www('hagoromo pasco otsuka-foods asahi-group-foods sugi-pharmacy sundrug cosmos-drug kusuri-aoki create-sd kirindo kokumin takashimaya');
  R.www('daimaru-matsuzakaya kintetsu-dept tokyu-dept odakyu-dept keio-dept marui lumine premium-outlets seria can-do cecile cataloghouse');
  R.www('hardoff treasure-factory daikokuya shimachu joyful-honda nafco royal-hc hikoki karimoku actus receno itoki');
  R.www('takara-standard ykk-ap rinnai iwatani yamazen daikin zojirushi twinbird maxell omron kojima-denki fcnt');
  R.www('kyocera elecom buffalo io-data eizo frontier-pc urban-research onward sanyo-shokai yohji-yamamoto moonstar gunze');
  R.www('charle narumiya star-jewelry the-kiss tsutsumi ginza-tanaka descente dod-camp wild-1 sports-authority himaraya murasaki-sports');
  R.www('golf-partner fine-today rishiri milbon naris noevir menard attenir ci-labo perfect-one domohorn-wrinkle decencia');
  R.www('haba canmake ettusais koji-honpo rmk suqqu earth-corp kincho st-corp kobayashi asahi-kasei duskin');
  R.www('bathclin pigeon combi unicharm richell san-x kotobukiya bornelund mitsubishi-pencil pentel sakura-craypas king-jim');
  R.www('nichiban kaunet tanomail itoya nippon-pet-food coo-riku megane-super aigan kaneko-optical eyecity seed-contact yamada-bee-farm');
  R.www('kenkoukazoku morishita-jintan orihiro nippi-collagen isuzu hino yamaha-motor kawasaki-motors yokohama-tire toyo-tires fujicorporation taiyakan');
  R.www('soft99 alpine carseven rabbit-kaitori cosmo-oil cycle-base-asahi daiwa-cycle spike-chunsoft oenon big-boy plaza-style sangetsu');
  R.www('dainichi naturelab kato-models shizen-shokken sellca daiwa-next-bank smtb smbc-trust tokyo-star-bank orix-bank suruga-bank shizuoka-bank');
  R.www('yokohama-bank chiba-bank fukuoka-bank nishi-nippon-city hokuyo-bank joyo-bank gunma-bank hiroshima-bank kyoto-bank kansai-mirai 77-bank iyo-bank');
  R.www('ja-bank aruhi view-card pocket-card jal-card uc-card mi-card tokyu-card jfr-card seven-card nexus-card au-pay-card');
  R.www('sbi-fx jfx central-tanshi-fx money-partners gaitame-online money-square fx-broadnet okasan mizuho-sec tokai-tokyo iwai-cosmo sbi-neotrade');
  R.www('tsumiki connect-sec nihon-zaitaku bitpoint aioi mitsui-direct sompo-direct kyoei-kasai nisshin-fire ja-kyosai kokumin-kyosai kenmin-kyosai');
  R.www('taiyo-life daido-life fukoku-life asahi-life sony-life anshin-life msa-life himawari-life hanasaku-life nanairo-life gibraltar-life sbi-life');
  R.www('taiju-life au-sonpo insweb hoken-minaoshi fpc direct-one saison-fundex quicpay cotra sbi-remit gmo-pg sb-payment');
  R.www('paygent gmo-atobarai macromill jre-point commufa pikara jcom itscom libmo tepco kepco chuden');
  R.www('tohoku-epco kyuden energia yonden hepco rikuden okiden tokyo-gas osaka-gas toho-gas saibu-gas hokkaido-gas');
  R.www('keiyo-gas nichigas cd-energy tokyu-power mitsui-garden imperial-hotel hotel-monterey keio-plaza rihga-royal hankyu-hanshin-hotels ooedo-onsen hawaiians');
  R.www('nippon-travel knt yomiuri-ryoko willer jr-west jr-kyushu jr-hokkaido jr-shikoku tobu seibu keio tokyu');
  R.www('keikyu keisei tokyo-metro kintetsu nankai keihan meitetsu nishitetsu fujiq nagashima tokyo-dome-city seibuen');
  R.www('suzuka-circuit kaiyukan kidzania solaseed fda ibex ots-rentacar eki-rentacar daikyo cosmos-initia kintetsu-re pitat-house');
  R.www('housemate jutaku-johokan home4u misawa-home mitsui-home hinokiya sakai arisan hello-storage kase-storage storage-oh yamato');
  R.www('sagawa seino fukutsu nippon-express csp pasona recruit-staffing pharma-staff aeon-eikaiwa shane ryugaku-journal digital-hollywood');
  R.www('human-academy winschool internet-academy meiko-gijuku kawaijuku sundai yozemi shuei nichinoken yotsuya-otsuka rinkai ichishin');
  R.www('o-hara caricare nichii cyber-univ tou ouj kyoto-art teikyo kindai waseda keio-univ meiji-univ');
  R.www('hosei chuo-univ ritsumeikan doshisha kansai-univ kwansei aoyama-gakuin rikkyo sophia tokai-univ senshu kanagawa-univ');
  R.www('neec renaissance-hs anniversaire best-bridal petit-wedding zwei takano-yuri taisho-pharma daiichi-sankyo-hc kowa zeria tsumura');
  R.www('ryukakusan eisai shionogi-hc wakamoto yomeishu seirogan arax santen borraginol hikari-tv skyperfectv jsports');
  R.www('bandai-channel video-market nhk-ondemand dam sunday-webry cnplayguide united-cinemas shiki infomart ohken office-station motivation-cloud');
  R.www('desknets intra-mart wingarc vcube ovice nri-secure lanscope assetview ffri cscloud dentsu hakuhodo');
  R.www('adk cyberagent opt jeki fancs accesstrade plan-b kinkos onemile nar-keiba tck nankan-keiba');
  R.www('keibabook dynam');

  // ---- more ad copy that gives a category away ---------------------------------

  R.kw('soda', ['!ウォーターサーバー', '天然水', '炭酸水']);
  R.kw('beer', ['!クラフトビール', '!ビールサーバー']);
  R.kw('fastfood', ['食べ放題', 'ランチメニュー', 'お持ち帰り']);
  R.kw('shopping', ['出張買取', '高価買取', 'ドラッグストア', '百貨店']);
  R.kw('home', ['!ホームセンター', 'システムキッチン', '電動工具']);
  R.kw('phones', ['!中古スマホ', 'simフリー']);
  R.kw('fashion', ['!ランドセル', '!オーダースーツ', '結婚指輪', '婚約指輪']);
  R.kw('sportswear', ['ゴルフ用品', 'キャンプ用品', '!釣り具']);
  R.kw('beauty', ['!クレンジングバーム', '!育毛剤', '白髪染め', '!オールインワンゲル']);
  R.kw('toys', ['ぬいぐるみ', '!トレーディングカード']);
  R.kw('pets', ['!ペットシーツ', '猫トイレ']);
  R.kw('eyewear', ['!カラコン', '遠近両用']);
  R.kw('cars', ['!車買取', '!カーリース', '!スタッドレスタイヤ', '!ドライブレコーダー']);
  R.kw('fuel', ['ハイオク', 'レギュラーガソリン']);
  R.kw('fitness', ['!電動アシスト自転車', 'クロスバイク']);
  R.kw('games', ['!オンラインクレーンゲーム']);
})(typeof globalThis !== 'undefined' ? globalThis : this);
