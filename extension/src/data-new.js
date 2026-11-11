/*
 * The long list, part two: whole categories data.js does not have, each with
 * its own nemesis. Same one-row-per-brand format as data-more.js:
 *   x(id, name, colour, 'domain domain', archRivalId, 'alias|alias', strict)
 *
 * Categories marked noRival never show a competitor, only the nemesis:
 * lenders and cosmetic clinics get the same treatment as gambling.
 */
(function (root) {
  'use strict';

  var data = root.AV_DATA || require('./data.js');
  var R = data.rows;
  var x = R.x;

  R.cat('electronics', {
    label: 'electronics',
    keywords: ['!家電', '4k tv', 'oled tv', 'ポイント還元', 'noise cancelling', 'ワイヤレスイヤホン', 'ロボット掃除機', 'home appliances', 'open-box'],
    nemesis: {
      name: 'Fixing the Old One', color: '#3f3f46', damage: 7, cta: 'Find a screwdriver',
      lines: [
        'It needs a new battery, not a replacement.',
        'The old one still turns on. That is most of the job.',
        'A repair costs less than the extended warranty.'
      ]
    }
  }, [
    x('best-buy', 'Best Buy', '#0046be', 'bestbuy.com', 'amazon'),
    x('newegg', 'Newegg', '#f7941d', 'newegg.com', 'best-buy'),
    x('bh-photo', 'B&H Photo', '#be1e2d', 'bhphotovideo.com', 'best-buy', 'B&H Photo', 1),
    x('micro-center', 'Micro Center', '#d71920', 'microcenter.com', 'newegg'),
    x('yodobashi', 'Yodobashi Camera', '#d7000f', 'yodobashi.com', 'bic-camera', 'ヨドバシ|Yodobashi'),
    x('bic-camera', 'Bic Camera', '#e60012', 'biccamera.com', 'yodobashi', 'ビックカメラ|BicCamera'),
    x('yamada-denki', 'Yamada Denki', '#e60012', 'yamada-denki.jp', 'yodobashi', 'ヤマダ電機|ヤマダデンキ'),
    x('joshin', 'Joshin', '#e60012', 'joshin.co.jp joshinweb.jp', 'yamada-denki', 'ジョーシン'),
    x('edion', 'EDION', '#e95513', 'edion.com edion.co.jp', 'yamada-denki', 'エディオン'),
    x('ks-denki', "K's Denki", '#e60012', 'ksdenki.com ksdenki.co.jp', 'yamada-denki', 'ケーズデンキ'),
    x('nojima', 'Nojima', '#0068b7', 'nojima.co.jp', 'ks-denki', 'ノジマ'),
    x('kakaku', 'Kakaku.com', '#0f4c9c', 'kakaku.com', 'yodobashi', '価格.com|価格コム', 1),
    x('sony', 'Sony', '#1a1a1a', 'sony.com sony.jp sony.co.jp', 'panasonic', 'ソニー|BRAVIA|ブラビア'),
    x('panasonic', 'Panasonic', '#0041c0', 'panasonic.com panasonic.jp', 'sony', 'パナソニック'),
    x('lg', 'LG', '#a50034', 'lg.com', 'samsung', 'LG OLED|LG Electronics', 1),
    x('sharp', 'Sharp', '#e60012', 'jp.sharp sharp.co.jp sharpusa.com', 'panasonic', 'シャープ|AQUOS', 1),
    x('hitachi', 'Hitachi', '#e60027', 'hitachi.co.jp hitachi.com', 'panasonic', '日立'),
    x('toshiba', 'Toshiba', '#e60012', 'toshiba.co.jp toshiba.com toshiba-lifestyle.com', 'hitachi', '東芝|REGZA|レグザ'),
    x('dyson', 'Dyson', '#4a2a6b', 'dyson.com dyson.co.jp', 'shark', 'ダイソン'),
    x('shark', 'Shark', '#0d3b66', 'sharkclean.com sharkninja.com sharkninja.co.jp', 'dyson', 'Shark vacuum|SharkNinja', 1),
    x('irobot', 'iRobot', '#6cb33f', 'irobot.com irobot-jp.com', 'dyson', 'Roomba|ルンバ'),
    x('balmuda', 'BALMUDA', '#1a1a1a', 'balmuda.com', 'dyson', 'バルミューダ'),
    x('iris-ohyama', 'Iris Ohyama', '#e60012', 'irisohyama.co.jp irisplaza.co.jp', 'panasonic', 'アイリスオーヤマ'),
    x('canon', 'Canon', '#cc0000', 'canon.com canon.jp usa.canon.com', 'nikon', 'キヤノン'),
    x('nikon', 'Nikon', '#c9a800', 'nikon.com nikon-image.com nikonusa.com', 'canon', 'ニコン'),
    x('fujifilm', 'Fujifilm', '#e4002b', 'fujifilm.com fujifilm-x.com', 'canon', '富士フイルム|チェキ|instax'),
    x('gopro', 'GoPro', '#00a7e1', 'gopro.com', 'dji'),
    x('dji', 'DJI', '#1a1a1a', 'dji.com', 'gopro'),
    x('bose', 'Bose', '#1a1a1a', 'bose.com bose.co.jp', 'sony'),
    x('jbl', 'JBL', '#ff3300', 'jbl.com', 'bose'),
    x('sonos', 'Sonos', '#1a1a1a', 'sonos.com', 'bose'),
    x('anker', 'Anker', '#00a0e9', 'anker.com ankerjapan.com', 'belkin', 'アンカー・ジャパン|Anker Japan'),
    x('belkin', 'Belkin', '#00a94f', 'belkin.com', 'anker')
  ]);

  R.cat('computers', {
    label: 'computers',
    keywords: ['laptop', 'gaming pc', 'desktop pc', '!ノートパソコン', '!ゲーミングpc', 'intel core', 'ryzen', 'rtx'],
    nemesis: {
      name: 'The Laptop You Already Have', color: '#334155', damage: 7, cta: 'Close some tabs',
      lines: [
        'It is slow because of the 61 open tabs.',
        'Still runs a browser. That is the whole job now.',
        'A clean-out is free. A new one is not.'
      ]
    }
  }, [
    x('dell', 'Dell', '#007db8', 'dell.com', 'hp', 'Alienware|XPS 13'),
    x('hp', 'HP', '#0096d6', 'hp.com', 'dell', 'HP Spectre|HP Pavilion|HP OMEN|HP Envy', 1),
    x('lenovo', 'Lenovo', '#e2231a', 'lenovo.com', 'dell', 'ThinkPad|レノボ'),
    x('asus', 'ASUS', '#1a1a1a', 'asus.com', 'acer', 'ROG Zephyrus|Zenbook'),
    x('acer', 'Acer', '#83b81a', 'acer.com', 'asus'),
    x('msi', 'MSI', '#ed1c24', 'msi.com', 'asus', 'MSI Gaming', 1),
    x('microsoft', 'Microsoft', '#0067b8', 'microsoft.com surface.com', 'apple', 'Windows 11|Microsoft 365|Surface Pro|Surface Laptop|マイクロソフト'),
    x('mouse-computer', 'Mouse Computer', '#e60012', 'mouse-jp.co.jp', 'dospara', 'マウスコンピューター|G-Tune'),
    x('dospara', 'Dospara', '#f39800', 'dospara.co.jp', 'mouse-computer', 'ドスパラ|GALLERIA'),
    x('pc-koubou', 'PC Koubou', '#0068b7', 'pc-koubou.jp', 'dospara', 'パソコン工房'),
    x('fmv', 'Fujitsu FMV', '#cc0000', 'fmworld.net fujitsu.com', 'nec-lavie', '富士通|Fujitsu', 1),
    x('nec-lavie', 'NEC LAVIE', '#1414a0', 'nec-lavie.jp nec.com', 'fmv', 'LAVIE|NEC Direct', 1),
    x('vaio', 'VAIO', '#5a3e9b', 'vaio.com', 'lenovo'),
    x('intel', 'Intel', '#0068b5', 'intel.com intel.co.jp', 'amd', 'Intel Core|Intel Xeon|インテル', 1),
    x('amd', 'AMD', '#ed1c24', 'amd.com', 'intel', 'Radeon'),
    x('nvidia', 'NVIDIA', '#5a8f00', 'nvidia.com', 'amd', 'GeForce RTX|GeForce NOW|エヌビディア'),
    x('logitech', 'Logitech', '#0092c8', 'logitech.com logicool.co.jp', 'razer', 'Logicool|ロジクール'),
    x('razer', 'Razer', '#2a9d1c', 'razer.com', 'logitech'),
    x('epson', 'Epson', '#003399', 'epson.com epson.jp', 'brother-print', 'エプソン'),
    x('brother-print', 'Brother', '#0d2ea0', 'brother.com brother.co.jp brother-usa.com', 'epson', 'Brother printer|ブラザー プリンター', 1)
  ]);

  R.cat('home', {
    label: 'furniture and home',
    keywords: ['sofa', 'furniture', 'home decor', '!家具', 'インテリア', '収納', 'ソファ', 'home improvement', 'patio', 'リフォーム'],
    nemesis: {
      name: 'The Furniture You Have', color: '#78350f', damage: 6, cta: 'Move the sofa',
      lines: [
        'Rearranging is free and counts as redecorating.',
        'It was fine yesterday. It is fine today.',
        'No flat-pack. No leftover screws.'
      ]
    }
  }, [
    x('ikea', 'IKEA', '#0058a3', 'ikea.com', 'nitori', 'イケア'),
    x('nitori', 'Nitori', '#009944', 'nitori-net.jp nitori.co.jp', 'ikea', 'ニトリ'),
    x('muji', 'MUJI', '#7f0019', 'muji.com muji.net', 'nitori', '無印良品'),
    x('francfranc', 'Francfranc', '#1a1a1a', 'francfranc.com', 'muji', 'フランフラン'),
    x('cainz', 'Cainz', '#008542', 'cainz.com', 'komeri', 'カインズ'),
    x('komeri', 'Komeri', '#e60012', 'komeri.com', 'cainz', 'コメリ'),
    x('dcm', 'DCM', '#e50012', 'dcm-hc.co.jp', 'cainz', 'DCMホーマック|DCMカーマ', 1),
    x('loft-jp', 'Loft', '#c9a800', 'loft.co.jp', 'hands', 'ロフト', 1),
    x('hands', 'Hands', '#00913a', 'hands.net', 'loft-jp', '東急ハンズ', 1),
    x('lixil', 'LIXIL', '#f58220', 'lixil.co.jp lixil.com', 'toto', 'リクシル'),
    x('toto', 'TOTO', '#00338d', 'toto.com jp.toto.com', 'lixil', 'ウォシュレット', 1),
    x('wayfair', 'Wayfair', '#7f187f', 'wayfair.com', 'ikea'),
    x('home-depot', 'The Home Depot', '#f96302', 'homedepot.com', 'lowes', 'Home Depot'),
    x('lowes', "Lowe's", '#004990', 'lowes.com', 'home-depot', 'Lowes'),
    x('ace-hardware', 'Ace Hardware', '#d40029', 'acehardware.com', 'home-depot'),
    x('ashley', 'Ashley', '#f47b20', 'ashleyfurniture.com', 'wayfair', 'Ashley Furniture|Ashley HomeStore', 1),
    x('west-elm', 'West Elm', '#333333', 'westelm.com', 'crate-barrel'),
    x('crate-barrel', 'Crate & Barrel', '#1a1a1a', 'crateandbarrel.com', 'west-elm', 'Crate and Barrel'),
    x('pottery-barn', 'Pottery Barn', '#3b3b3b', 'potterybarn.com', 'west-elm'),
    x('rh', 'RH', '#555555', 'rh.com', 'west-elm', 'Restoration Hardware', 1),
    x('lovesac', 'Lovesac', '#00a3ad', 'lovesac.com', 'ashley'),
    x('article', 'Article', '#f15a22', 'article.com', 'west-elm', 'Article furniture', 1),
    x('bed-bath', 'Bed Bath & Beyond', '#2d2a8c', 'bedbathandbeyond.com', 'wayfair', 'Bed Bath and Beyond')
  ]);

  R.cat('realestate', {
    label: 'property',
    keywords: ['homes for sale', 'apartments for rent', 'mortgage rates', 'real estate', '!新築マンション', '!賃貸', '不動産', '物件', '分譲', 'モデルルーム', '注文住宅', 'open house'],
    nemesis: {
      name: 'Staying Put', color: '#365314', damage: 6, cta: 'Unpack that last box',
      lines: [
        'You already know where the light switches are.',
        'Moving costs more than the thing you are moving away from.',
        'Your landlord, at least, is a known quantity.'
      ]
    }
  }, [
    x('zillow', 'Zillow', '#006aff', 'zillow.com', 'redfin'),
    x('redfin', 'Redfin', '#a02021', 'redfin.com', 'zillow'),
    x('realtor', 'Realtor.com', '#d92228', 'realtor.com', 'zillow', 'Realtor.com', 1),
    x('apartments-com', 'Apartments.com', '#4f8a1f', 'apartments.com', 'zillow', 'Apartments.com', 1),
    x('trulia', 'Trulia', '#00adbb', 'trulia.com', 'zillow'),
    x('opendoor', 'Opendoor', '#1c85e8', 'opendoor.com', 'zillow'),
    x('rocket-mortgage', 'Rocket Mortgage', '#c8102e', 'rocketmortgage.com rocket.com', 'zillow'),
    x('suumo', 'SUUMO', '#5a9a1f', 'suumo.jp', 'homes', 'スーモ'),
    x('homes', "LIFULL HOME'S", '#ed6103', 'homes.co.jp', 'suumo', "ライフルホームズ|LIFULL HOME'S|ホームズくん", 1),
    x('athome', 'at home', '#e60012', 'athome.co.jp', 'suumo', 'アットホーム', 1),
    x('chintai', 'CHINTAI', '#00a0e9', 'chintai.net', 'suumo'),
    x('apamanshop', 'Apamanshop', '#e60012', 'apamanshop.com', 'able', 'アパマンショップ'),
    x('able', 'Able', '#e60012', 'able.co.jp', 'apamanshop', 'お部屋探しはエイブル|エイブル 賃貸', 1),
    x('daito', 'Daito Trust', '#005bac', 'kentaku.co.jp', 'able', '大東建託|いい部屋ネット'),
    x('leopalace', 'Leopalace21', '#005bac', 'leopalace21.com', 'daito', 'レオパレス'),
    x('sekisui-house', 'Sekisui House', '#005bac', 'sekisuihouse.co.jp', 'daiwa-house', '積水ハウス'),
    x('daiwa-house', 'Daiwa House', '#c8102e', 'daiwahouse.co.jp', 'sekisui-house', '大和ハウス|ダイワハウス'),
    x('mitsui-fudosan', 'Mitsui Fudosan', '#00428e', 'mitsuifudosan.co.jp 31sumai.com', 'sumitomo-fudosan', '三井不動産|三井のリハウス'),
    x('sumitomo-fudosan', 'Sumitomo Realty', '#00693e', 'sumitomo-rd.co.jp', 'mitsui-fudosan', '住友不動産'),
    x('open-house', 'Open House', '#00a0e9', 'openhouse-group.com', 'suumo', 'オープンハウス', 1)
  ]);

  R.cat('jobs', {
    label: 'job sites',
    keywords: ['hiring now', 'job search', '!求人', '!転職', 'アルバイト', 'バイト探し', '年収アップ', 'find your next job', 'remote jobs', '正社員'],
    nemesis: {
      name: 'Asking for a Raise', color: '#7c2d12', damage: 6, cta: 'Book the meeting',
      lines: [
        'Same desk, more money. Worth one awkward conversation.',
        'You have not asked. They have not offered. Funny how that works.',
        'The fastest job search has one step.'
      ]
    }
  }, [
    x('indeed', 'Indeed', '#2164f3', 'indeed.com', 'ziprecruiter', 'Indeed.com|インディード', 1),
    x('linkedin', 'LinkedIn', '#0a66c2', 'business.linkedin.com learning.linkedin.com', 'indeed', 'LinkedIn Premium|LinkedIn Jobs|LinkedIn Learning', 1),
    x('ziprecruiter', 'ZipRecruiter', '#2a8a3c', 'ziprecruiter.com', 'indeed'),
    x('glassdoor', 'Glassdoor', '#0caa41', 'glassdoor.com', 'indeed'),
    x('monster-jobs', 'Monster', '#6e46ae', 'monster.com', 'indeed', 'Monster.com|Monster jobs', 1),
    x('upwork', 'Upwork', '#14a800', 'upwork.com', 'fiverr'),
    x('fiverr', 'Fiverr', '#1dbf73', 'fiverr.com', 'upwork'),
    x('rikunabi', 'Rikunabi', '#0063b1', 'rikunabi.com', 'mynavi', 'リクナビ'),
    x('mynavi', 'Mynavi', '#00a0e9', 'mynavi.jp', 'rikunabi', 'マイナビ'),
    x('doda', 'doda', '#0b5ed7', 'doda.jp', 'recruit-agent', 'デューダ'),
    x('recruit-agent', 'Recruit Agent', '#0f1f5c', 'r-agent.com', 'doda', 'リクルートエージェント'),
    x('bizreach', 'BizReach', '#0a2a5e', 'bizreach.jp', 'doda', 'ビズリーチ'),
    x('en-tenshoku', 'en Tenshoku', '#e6002d', 'en-japan.com', 'doda', 'エン転職', 1),
    x('townwork', 'TownWork', '#f39800', 'townwork.net', 'baitoru', 'タウンワーク'),
    x('baitoru', 'Baitoru', '#ff6600', 'baitoru.com', 'townwork', 'バイトル'),
    x('timee', 'Timee', '#c9a800', 'timee.co.jp', 'baitoru', 'タイミー'),
    x('wantedly', 'Wantedly', '#1a9bb5', 'wantedly.com', 'bizreach'),
    x('levtech', 'Levtech', '#0060a8', 'levtech.jp', 'bizreach', 'レバテック'),
    x('openwork', 'OpenWork', '#0e7ac4', 'openwork.jp', 'glassdoor', 'オープンワーク')
  ]);

  R.cat('beauty', {
    label: 'cosmetics',
    keywords: ['skincare', 'serum', 'moisturizer', 'moisturiser', 'anti-aging', 'foundation', 'mascara', 'lipstick', '!スキンケア', '!化粧水', '!美容液', 'コスメ', 'ファンデーション', '毛穴', 'エイジングケア', 'シャンプー'],
    nemesis: {
      name: 'Soap and Water', color: '#0e7490', damage: 6, cta: 'Wash your face',
      lines: [
        'Two ingredients. One of them is free.',
        'Your skin was doing this job before the 12-step routine.',
        'Dermatologists keep saying sunscreen and sleep. Nobody listens.'
      ]
    }
  }, [
    x('shiseido', 'Shiseido', '#d4002a', 'shiseido.co.jp shiseido.com', 'kose', '資生堂|エリクシール|マキアージュ|クレ・ド・ポー'),
    x('kose', 'KOSÉ', '#00205b', 'kose.co.jp', 'shiseido', 'コーセー|雪肌精|KOSE|コスメデコルテ'),
    x('kao', 'Kao', '#00a040', 'kao.com kao.co.jp', 'shiseido', '花王|ビオレ|キュレル|ソフィーナ', 1),
    x('kanebo', 'Kanebo', '#1a1a1a', 'kanebo-cosmetics.jp kanebo.com', 'shiseido', 'カネボウ|ルナソル'),
    x('pola', 'POLA', '#1a1a1a', 'pola.co.jp', 'shiseido', 'リンクルショット|POLA', 1),
    x('sk-ii', 'SK-II', '#b5121b', 'sk-ii.com sk-ii.jp', 'shiseido', 'SK2|エスケーツー'),
    x('fancl', 'FANCL', '#00479d', 'fancl.co.jp fancl.com', 'dhc', 'ファンケル'),
    x('dhc', 'DHC', '#0068b7', 'dhc.co.jp', 'fancl'),
    x('orbis', 'ORBIS', '#00a0de', 'orbis.co.jp', 'fancl', 'オルビス'),
    x('rohto', 'Rohto', '#00a0e9', 'rohto.co.jp', 'kao', 'ロート製薬|肌ラボ|メラノCC|Hada Labo'),
    x('lion', 'Lion', '#00a651', 'lion.co.jp', 'kao', 'ライオン株式会社|クリニカ', 1),
    x('innisfree', 'innisfree', '#2f6b3a', 'innisfree.com innisfree.jp', 'shiseido', 'イニスフリー'),
    x('cosme', '@cosme', '#e4007f', 'cosme.net cosme.com', 'sephora', 'アットコスメ|@cosme', 1),
    x('botanist', 'BOTANIST', '#3d5a3d', 'botanistofficial.com', 'pantene', 'ボタニスト|BOTANIST shampoo', 1),
    x('sephora', 'Sephora', '#1a1a1a', 'sephora.com', 'ulta'),
    x('ulta', 'Ulta Beauty', '#f26b21', 'ulta.com', 'sephora', 'Ulta'),
    x('loreal', "L'Oréal", '#1a1a1a', 'loreal.com lorealparis.com loreal-paris.jp lorealparisusa.com', 'estee-lauder', "L'Oreal|ロレアル"),
    x('estee-lauder', 'Estée Lauder', '#041e42', 'esteelauder.com esteelauder.jp', 'loreal', 'Estee Lauder|エスティローダー'),
    x('clinique', 'Clinique', '#4a9c6d', 'clinique.com clinique.jp', 'estee-lauder', 'クリニーク'),
    x('lancome', 'Lancôme', '#1a1a1a', 'lancome.com lancome-usa.com lancome.jp', 'estee-lauder', 'Lancome|ランコム'),
    x('maybelline', 'Maybelline', '#1a1a1a', 'maybelline.com maybelline.co.jp', 'loreal', 'メイベリン'),
    x('mac-cosmetics', 'MAC Cosmetics', '#1a1a1a', 'maccosmetics.com maccosmetics.jp', 'maybelline', 'MAC Cosmetics', 1),
    x('olay', 'Olay', '#1a1a1a', 'olay.com', 'neutrogena'),
    x('neutrogena', 'Neutrogena', '#00539b', 'neutrogena.com', 'olay'),
    x('cerave', 'CeraVe', '#005eb8', 'cerave.com', 'cetaphil'),
    x('cetaphil', 'Cetaphil', '#00a3e0', 'cetaphil.com', 'cerave'),
    x('glossier', 'Glossier', '#c98a94', 'glossier.com', 'sephora', 'Glossier.com|Glossier Boy Brow|Glossier You', 1),
    x('fenty', 'Fenty Beauty', '#a8775f', 'fentybeauty.com', 'rare-beauty', 'Fenty'),
    x('rare-beauty', 'Rare Beauty', '#b56576', 'rarebeauty.com', 'fenty'),
    x('charlotte-tilbury', 'Charlotte Tilbury', '#6b1f2a', 'charlottetilbury.com', 'fenty'),
    x('dove', 'Dove', '#00407a', 'dove.com', 'olay', 'Dove soap|Dove body wash', 1),
    x('nivea', 'NIVEA', '#0a2b8c', 'nivea.com nivea.co.jp', 'dove', 'ニベア'),
    x('lush', 'Lush', '#1a1a1a', 'lush.com', 'the-body-shop', 'Lush Cosmetics', 1),
    x('the-body-shop', 'The Body Shop', '#004236', 'thebodyshop.com the-body-shop.co.jp', 'lush', 'ボディショップ'),
    x('pantene', 'Pantene', '#b8901f', 'pantene.com pantene.jp', 'dove', 'パンテーン'),
    x('head-shoulders', 'Head & Shoulders', '#00539b', 'headandshoulders.com', 'pantene', 'Head and Shoulders'),
    x('old-spice', 'Old Spice', '#c8102e', 'oldspice.com', 'dove'),
    x('colgate', 'Colgate', '#d81e05', 'colgate.com', 'crest'),
    x('crest', 'Crest', '#005ba9', 'crest.com', 'colgate', 'Crest toothpaste|Crest Whitestrips|Crest 3D', 1),
    x('oral-b', 'Oral-B', '#002d72', 'oralb.com', 'philips', 'Oral B|オーラルB'),
    x('philips', 'Philips', '#0b5ed7', 'philips.com philips.co.jp', 'oral-b', 'Sonicare|ソニッケアー|フィリップス|Norelco')
  ]);

  R.cat('supplements', {
    label: 'supplements',
    keywords: ['!サプリ', 'サプリメント', '!青汁', 'プロテイン', 'supplement', 'vitamins', 'probiotic', 'collagen', 'greens powder', 'コラーゲン', '乳酸菌', '定期コース', '初回限定'],
    nemesis: {
      name: 'A Vegetable', color: '#3f6212', damage: 8, cta: 'Eat one',
      lines: [
        'Contains everything on that label, plus fibre.',
        'Clinically proven since the dawn of agriculture.',
        'No subscription. It is in the fridge drawer.'
      ]
    }
  }, [
    x('ag1', 'AG1', '#0c3b2e', 'drinkag1.com athleticgreens.com', 'huel', 'Athletic Greens'),
    x('huel', 'Huel', '#1a1a1a', 'huel.com', 'ag1'),
    x('ritual', 'Ritual', '#b8960f', 'ritual.com', 'ag1', 'Ritual vitamins|Ritual multivitamin', 1),
    x('myprotein', 'Myprotein', '#001a70', 'myprotein.com myprotein.jp', 'optimum-nutrition', 'マイプロテイン'),
    x('optimum-nutrition', 'Optimum Nutrition', '#1a1a1a', 'optimumnutrition.com', 'myprotein', 'Gold Standard Whey'),
    x('nature-made', 'Nature Made', '#c9a100', 'naturemade.com naturemade.jp', 'centrum', 'ネイチャーメイド'),
    x('centrum', 'Centrum', '#0057b8', 'centrum.com', 'nature-made'),
    x('gnc', 'GNC', '#e31837', 'gnc.com', 'vitamin-shoppe'),
    x('vitamin-shoppe', 'Vitamin Shoppe', '#e41e26', 'vitaminshoppe.com', 'gnc'),
    x('iherb', 'iHerb', '#458500', 'iherb.com', 'gnc', 'アイハーブ'),
    x('liquid-iv', 'Liquid I.V.', '#00a3e0', 'liquid-iv.com', 'ag1', 'Liquid IV'),
    x('olly', 'OLLY', '#5b2d86', 'olly.com', 'ritual', 'OLLY vitamins|OLLY gummies', 1),
    x('suntory-wellness', 'Suntory Wellness', '#00a0e9', 'suntory-kenko.com', 'fancl', 'サントリーウエルネス|セサミン|ロコモア'),
    x('yakult', 'Yakult', '#e60012', 'yakult.co.jp yakult.com', 'suntory-wellness', 'ヤクルト'),
    x('yazuya', 'Yazuya', '#8b5a2b', 'yazuya.com', 'suntory-wellness', 'やずや'),
    x('kyusai', "Q'SAI", '#00913a', 'kyusai.co.jp', 'yazuya', 'キューサイ')
  ]);

  R.cat('clinics', {
    label: 'cosmetic clinics',
    noRival: true,
    keywords: ['!脱毛', '!美容クリニック', '!美容外科', '!二重整形', '!aga治療', '!薄毛', '医療脱毛', '全身脱毛', '無料カウンセリング', '!hair removal', '!hair loss', '!botox', '!cosmetic surgery', '!glp-1', '!semaglutide', '!ed treatment', 'weight loss injection'],
    nemesis: {
      name: 'Being Fine As You Are', color: '#831843', damage: 9, cta: 'Carry on as you were',
      lines: [
        'Nobody noticed the thing you are worried about.',
        'The free consultation is where the selling happens.',
        'You looked fine before this ad told you otherwise.'
      ]
    }
  }, [
    x('sbc', 'Shonan Beauty Clinic', '#e4007f', 's-b-c.net', '', '湘南美容|SBC湘南'),
    x('shinagawa', 'Shinagawa Beauty Clinic', '#0068b7', 'shinagawa.com', '', '品川美容外科|品川スキンクリニック', 1),
    x('tcb', 'TCB', '#00a0e9', 'aoki-tsuyoshi.com', '', 'TCB東京中央美容外科|東京中央美容外科', 1),
    x('rize', 'Rize Clinic', '#c8102e', 'rizeclinic.com', '', 'リゼクリニック'),
    x('musee', 'Musée Platinum', '#b8a165', 'musee-pla.com', '', 'ミュゼプラチナム'),
    x('kireimo', 'Kireimo', '#e4007f', 'kireimo.jp', '', 'キレイモ'),
    x('mens-clear', "Men's Clear", '#0068b7', 'mens-clear.com', '', 'メンズクリア'),
    x('gorilla', 'Gorilla Clinic', '#f39800', 'gorilla.clinic', '', 'ゴリラクリニック'),
    x('aga-skin', 'AGA Skin Clinic', '#0068b7', 'agaskin.net', '', 'AGAスキンクリニック'),
    x('dmm-clinic', 'DMM Online Clinic', '#1a1a1a', 'clinic.dmm.com', '', 'DMMオンラインクリニック', 1),
    x('clinic-for', 'Clinic For', '#00a99d', 'clinicfor.life', '', 'クリニックフォア', 1),
    x('regina', 'Regina Clinic', '#b8860b', 'reginaclinic.jp', '', 'レジーナクリニック'),
    x('frey-a', 'Frey-A Clinic', '#e4007f', 'frey-a.jp', '', 'フレイアクリニック'),
    x('emina', 'Eminal Clinic', '#e4007f', 'eminal-clinic.jp', '', 'エミナルクリニック'),
    x('hims', 'Hims', '#3a3a3a', 'hims.com forhims.com', '', 'Hims & Hers|forhims'),
    x('hers', 'Hers', '#b56576', 'forhers.com', '', 'forhers', 1),
    x('keeps', 'Keeps', '#1c3f94', 'keeps.com', '', 'Keeps hair', 1),
    x('ro', 'Ro', '#1a1a1a', 'ro.co', '', 'Ro Body|Roman health', 1),
    x('ideal-image', 'Ideal Image', '#00a3ad', 'idealimage.com', ''),
    x('laseraway', 'LaserAway', '#e31c79', 'laseraway.com', ''),
    x('bosley', 'Bosley', '#00539b', 'bosley.com', '')
  ]);

  R.cat('games', {
    label: 'video games',
    keywords: ['!事前登録', '!ガチャ', '無料ダウンロード', 'download now', 'play free', 'free to play', 'play for free', '新作ゲーム', 'リセマラ', 'in-app purchases', 'スマホゲーム', 'ゲームアプリ'],
    nemesis: {
      name: 'A Deck of Cards', color: '#7f1d1d', damage: 7, cta: 'Shuffle',
      lines: [
        'Fifty-two cards. No loot boxes. No daily login.',
        'Multiplayer works without servers.',
        'Paid for once, in 1998.'
      ]
    }
  }, [
    x('genshin', 'Genshin Impact', '#3d4f7c', 'genshin.hoyoverse.com hoyoverse.com', 'honkai', '原神'),
    x('honkai', 'Honkai: Star Rail', '#1f2a44', 'hsr.hoyoverse.com', 'genshin', '崩壊：スターレイル|崩壊スターレイル|Honkai Star Rail'),
    x('zzz', 'Zenless Zone Zero', '#c9a100', 'zenless.hoyoverse.com', 'genshin', 'ゼンレスゾーンゼロ|ゼンゼロ'),
    x('uma-musume', 'Uma Musume', '#f15b9c', 'umamusume.jp umamusume.com', 'monster-strike', 'ウマ娘'),
    x('monster-strike', 'Monster Strike', '#e60012', 'monster-strike.com', 'pazudora', 'モンスターストライク|モンスト'),
    x('pazudora', 'Puzzle & Dragons', '#f7941d', 'pad.gungho.jp', 'monster-strike', 'パズル&ドラゴンズ|パズドラ|Puzzle and Dragons'),
    x('fgo', 'Fate/Grand Order', '#1b3a6b', 'fate-go.jp fate-go.us', 'uma-musume', 'FGO|Fate Grand Order'),
    x('blue-archive', 'Blue Archive', '#1da1f2', 'bluearchive.jp bluearchive.nexon.com', 'nikke', 'ブルーアーカイブ|ブルアカ'),
    x('nikke', 'NIKKE', '#e60012', 'nikke-jp.com nikke-en.com', 'blue-archive', '勝利の女神|メガニケ'),
    x('cygames', 'Cygames', '#1a1a1a', 'cygames.co.jp', 'dmm-games', 'サイゲームス|グランブルーファンタジー|グラブル|プリンセスコネクト|Shadowverse|シャドウバース'),
    x('dmm-games', 'DMM GAMES', '#1a1a1a', 'games.dmm.com', 'cygames', 'DMM GAMES', 1),
    x('dqwalk', 'Dragon Quest Walk', '#0068b7', 'dragonquest.jp', 'pokemon-go', 'ドラゴンクエストウォーク|ドラクエウォーク|ドラゴンクエスト|Dragon Quest'),
    x('pokemon-go', 'Pokémon GO', '#ef5350', 'pokemongolive.com', 'dqwalk', 'Pokemon GO|ポケモンGO'),
    x('pokemon', 'Pokémon', '#c9a100', 'pokemon.com pokemon.co.jp', 'final-fantasy', 'Pokemon|ポケモン|ポケットモンスター'),
    x('final-fantasy', 'Final Fantasy', '#1a1a1a', 'finalfantasy.com square-enix.com', 'dqwalk', 'ファイナルファンタジー|FF14|FFXIV|Square Enix|スクウェア・エニックス'),
    x('monster-hunter', 'Monster Hunter', '#8a6d3b', 'monsterhunter.com capcom.com capcom.co.jp', 'final-fantasy', 'モンスターハンター|モンハン|Capcom|カプコン'),
    x('konami-games', 'eFootball', '#003da5', 'konami.com', 'ea', 'イーフットボール|プロ野球スピリッツ|プロスピ|パワプロ|KONAMI'),
    x('sega', 'SEGA', '#0089cf', 'sega.com sega.jp', 'nintendo', 'セガ|プロジェクトセカイ|プロセカ|龍が如く'),
    x('bandai-namco', 'Bandai Namco', '#f5a200', 'bandainamcoent.co.jp bandainamcoent.com', 'sega', 'バンダイナムコ|アイドルマスター|鉄拳|TEKKEN|ELDEN RING|エルデンリング'),
    x('candy-crush', 'Candy Crush', '#f15a24', 'king.com candycrushsaga.com', 'royal-match', 'Candy Crush Saga'),
    x('royal-match', 'Royal Match', '#2a5bd7', 'royalmatch.com dreamgames.com', 'candy-crush'),
    x('clash-of-clans', 'Clash of Clans', '#d49a00', 'supercell.com clashofclans.com', 'raid', 'Clash Royale|Brawl Stars|クラッシュ・オブ・クラン|クラクラ|ブロスタ'),
    x('raid', 'RAID: Shadow Legends', '#b8860b', 'raidshadowlegends.com plarium.com', 'clash-of-clans', 'Raid Shadow Legends'),
    x('whiteout', 'Whiteout Survival', '#3aa0d8', 'whiteoutsurvival.com centurygames.com', 'last-war', 'ホワイトアウト・サバイバル|ホワサバ'),
    x('last-war', 'Last War: Survival', '#c0392b', 'lastwar.com', 'whiteout', 'Last War|ラストウォー'),
    x('monopoly-go', 'Monopoly GO!', '#e4002b', 'monopolygo.com scopely.com', 'coin-master', 'Monopoly GO'),
    x('coin-master', 'Coin Master', '#f7941d', 'coinmaster.com moonactive.com', 'monopoly-go'),
    x('township', 'Township', '#4caf50', 'playrix.com', 'royal-match', 'Gardenscapes|Homescapes|Fishdom', 1),
    x('evony', 'Evony', '#8a6d3b', 'evony.com', 'raid'),
    x('hero-wars', 'Hero Wars', '#7b3fe4', 'hero-wars.com', 'raid'),
    x('roblox', 'Roblox', '#e2231a', 'roblox.com', 'fortnite'),
    x('fortnite', 'Fortnite', '#7b3fe4', 'fortnite.com epicgames.com', 'roblox', 'Epic Games'),
    x('minecraft', 'Minecraft', '#3c8527', 'minecraft.net', 'roblox', 'マインクラフト|マイクラ'),
    x('call-of-duty', 'Call of Duty', '#1a1a1a', 'callofduty.com activision.com', 'ea', 'Warzone'),
    x('ea', 'EA Sports', '#1a1a1a', 'ea.com', 'call-of-duty', 'EA SPORTS FC|Madden NFL|Apex Legends|Electronic Arts', 1),
    x('league', 'League of Legends', '#a67c1f', 'leagueoflegends.com riotgames.com', 'fortnite', 'VALORANT|Riot Games'),
    x('wow', 'World of Warcraft', '#d49a00', 'worldofwarcraft.com blizzard.com battle.net', 'final-fantasy', 'Diablo IV|Overwatch 2|Blizzard Entertainment'),
    x('ubisoft', 'Ubisoft', '#0070ff', 'ubisoft.com', 'ea', "Assassin's Creed"),
    x('pubg', 'PUBG', '#d49a00', 'pubg.com pubgmobile.com', 'fortnite', 'PUBG MOBILE')
  ]);

  R.cat('reading', {
    label: 'e-books and manga',
    keywords: ['!漫画', '!マンガ', 'コミック', '無料で読める', '!試し読み', '!電子書籍', '待てば無料', 'audiobook', 'ebook', '!読み放題', '全巻'],
    nemesis: {
      name: 'Your Library Card', color: '#7f1d1d', damage: 7, cta: 'Borrow it',
      lines: [
        'Every volume, free, and nobody raises the price next year.',
        'The wait-until-free model, perfected a century ago.',
        'They will even order it in for you.'
      ]
    }
  }, [
    x('piccoma', 'Piccoma', '#c9a800', 'piccoma.com', 'line-manga', 'ピッコマ'),
    x('line-manga', 'LINE Manga', '#06c755', 'manga.line.me', 'piccoma', 'LINEマンガ|LINE Manga', 1),
    x('mecha-comic', 'Mecha Comic', '#e60012', 'mechacomic.jp', 'cmoa', 'めちゃコミック|めちゃコミ'),
    x('cmoa', "Comic C'moa", '#f39800', 'cmoa.jp', 'mecha-comic', 'コミックシーモア|シーモア'),
    x('ebookjapan', 'ebookjapan', '#e60012', 'ebookjapan.yahoo.co.jp', 'cmoa', 'イーブックジャパン'),
    x('renta', 'Renta!', '#e60012', 'renta.papy.co.jp', 'cmoa', 'Renta!', 1),
    x('manga-oukoku', 'Manga Oukoku', '#f39800', 'comic.k-manga.jp', 'mecha-comic', 'まんが王国'),
    x('booklive', 'BookLive', '#e60012', 'booklive.jp', 'cmoa', 'ブックライブ'),
    x('dmm-books', 'DMM Books', '#1a1a1a', 'book.dmm.com', 'cmoa', 'DMMブックス', 1),
    x('bookwalker', 'BOOK WALKER', '#1a73e8', 'bookwalker.jp', 'cmoa', 'BOOK☆WALKER|ブックウォーカー'),
    x('jump-plus', 'Shonen Jump+', '#e60012', 'shonenjumpplus.com', 'magapoke', '少年ジャンプ+|ジャンプ+'),
    x('magapoke', 'Magazine Pocket', '#00a0e9', 'pocket.shonenmagazine.com', 'jump-plus', 'マガポケ|マガジンポケット'),
    x('honto', 'honto', '#00a0e9', 'honto.jp', 'kobo'),
    x('kinokuniya', 'Kinokuniya', '#003b83', 'kinokuniya.co.jp', 'honto', '紀伊國屋書店'),
    x('tsutaya', 'TSUTAYA', '#0068b7', 'tsutaya.tsite.jp', 'kindle', 'ツタヤ|蔦屋書店'),
    x('kindle', 'Kindle', '#ff9900', 'kindle.com', 'kobo', 'Kindle Unlimited|キンドル'),
    x('kobo', 'Rakuten Kobo', '#bf0000', 'kobo.com books.rakuten.co.jp', 'kindle', '楽天Kobo|楽天ブックス|Kobo'),
    x('audible', 'Audible', '#f8991c', 'audible.com audible.co.jp', 'audiobook-jp', 'Audible.com|Audible membership|Audible audiobook|オーディブル', 1),
    x('audiobook-jp', 'audiobook.jp', '#00a0e9', 'audiobook.jp', 'audible', 'audiobook.jp', 1),
    x('scribd', 'Scribd', '#1e7b85', 'scribd.com everand.com', 'audible', 'Everand'),
    x('webtoon', 'WEBTOON', '#00a84f', 'webtoons.com', 'piccoma'),
    x('barnes-noble', 'Barnes & Noble', '#2a5934', 'barnesandnoble.com', 'kindle', 'Barnes and Noble'),
    x('blinkist', 'Blinkist', '#1fa866', 'blinkist.com', 'audible')
  ]);

  R.cat('tickets', {
    label: 'ticket sellers',
    keywords: ['tickets on sale', 'get tickets', '!チケット発売', '先行抽選', 'live tour', 'presale'],
    nemesis: {
      name: 'Staying In With the Album', color: '#581c87', damage: 5, cta: 'Press play',
      lines: [
        'No service fee. No convenience fee. No facility fee.',
        'The best seat in the house is your sofa.',
        'Nobody holds a phone up in front of you.'
      ]
    }
  }, [
    x('ticketmaster', 'Ticketmaster', '#026cdf', 'ticketmaster.com', 'stubhub'),
    x('stubhub', 'StubHub', '#3f1d74', 'stubhub.com', 'ticketmaster'),
    x('seatgeek', 'SeatGeek', '#ff5b49', 'seatgeek.com', 'ticketmaster'),
    x('vivid-seats', 'Vivid Seats', '#d6006f', 'vividseats.com', 'stubhub'),
    x('ticket-pia', 'Ticket Pia', '#0068b7', 'pia.jp', 'eplus', 'チケットぴあ'),
    x('eplus', 'e+', '#e4007f', 'eplus.jp', 'ticket-pia', 'イープラス', 1),
    x('lawson-ticket', 'Lawson Ticket', '#0068b7', 'l-tike.com', 'eplus', 'ローソンチケット|ローチケ')
  ]);

  R.cat('grocery', {
    label: 'supermarkets',
    keywords: ['weekly ad', 'grocery', 'groceries', 'supermarket', '!ネットスーパー', '特売', 'チラシ', 'fresh produce', 'コンビニ'],
    nemesis: {
      name: 'A Shopping List', color: '#166534', damage: 5, cta: 'Write it down first',
      lines: [
        'Buy what is on it. Leave when it is done.',
        'Immune to end-of-aisle displays.',
        'Every offer you skip is 100% off.'
      ]
    }
  }, [
    x('kroger', 'Kroger', '#084999', 'kroger.com', 'albertsons'),
    x('albertsons', 'Albertsons', '#00539b', 'albertsons.com', 'kroger'),
    x('safeway', 'Safeway', '#e8002a', 'safeway.com', 'kroger'),
    x('aldi', 'ALDI', '#00005f', 'aldi.us aldi.com aldi.co.uk', 'lidl'),
    x('lidl', 'Lidl', '#0050aa', 'lidl.com lidl.co.uk lidl.de', 'aldi'),
    x('whole-foods', 'Whole Foods', '#00674b', 'wholefoodsmarket.com', 'trader-joes', 'Whole Foods Market'),
    x('trader-joes', "Trader Joe's", '#d21242', 'traderjoes.com', 'whole-foods', 'Trader Joes'),
    x('publix', 'Publix', '#3a8a1e', 'publix.com', 'kroger'),
    x('heb', 'H-E-B', '#e1251b', 'heb.com', 'kroger', 'HEB'),
    x('wegmans', 'Wegmans', '#1a1a1a', 'wegmans.com', 'whole-foods'),
    x('meijer', 'Meijer', '#e31837', 'meijer.com', 'kroger'),
    x('tesco', 'Tesco', '#00539f', 'tesco.com', 'sainsburys'),
    x('sainsburys', "Sainsbury's", '#f06c00', 'sainsburys.co.uk', 'tesco', 'Sainsburys'),
    x('aeon', 'AEON', '#b60081', 'aeon.com aeon.jp aeonnetshop.com aeonretail.jp', 'ito-yokado', 'イオンモール|イオンネットスーパー|イオンスタイル|イオンのお買物', 1),
    x('ito-yokado', 'Ito-Yokado', '#e60012', 'itoyokado.co.jp iy-net.jp', 'aeon', 'イトーヨーカドー|イトーヨーカ堂'),
    x('seiyu', 'Seiyu', '#e60012', 'seiyu.co.jp', 'aeon', '西友'),
    x('life-super', 'Life', '#00913a', 'lifecorp.jp', 'seiyu', 'ライフネットスーパー|スーパーライフ', 1),
    x('gyomu', 'Gyomu Super', '#00913a', 'gyomusuper.jp', 'seiyu', '業務スーパー'),
    x('seijo-ishii', 'Seijo Ishii', '#7b1e3a', 'seijoishii.co.jp seijoishii.com', 'aeon', '成城石井'),
    x('kaldi', 'KALDI', '#0a3d91', 'kaldi.co.jp', 'seijo-ishii', 'カルディ'),
    x('coop-deli', 'Co-op Deli', '#e60012', 'coopdeli.jp', 'pal-system', 'コープデリ|おうちコープ'),
    x('pal-system', 'Pal System', '#e60012', 'pal-system.co.jp', 'coop-deli', 'パルシステム'),
    x('seven-eleven', '7-Eleven', '#f58220', '7-eleven.com sej.co.jp 7eleven.com', 'familymart', 'セブン-イレブン|セブンイレブン|Seven-Eleven'),
    x('familymart', 'FamilyMart', '#00a041', 'family.co.jp', 'lawson', 'ファミリーマート|ファミマ'),
    x('lawson', 'Lawson', '#0068b7', 'lawson.co.jp', 'familymart', 'ローソン'),
    x('ministop', 'Ministop', '#0033a0', 'ministop.co.jp', 'lawson', 'ミニストップ')
  ]);

  R.cat('snacks', {
    label: 'snack foods',
    keywords: ['snack', 'chips', 'chocolate', '!お菓子', '新発売', 'ポテトチップス', 'カップ麺', 'ice cream', 'candy', 'チョコレート', 'アイスクリーム'],
    nemesis: {
      name: 'A Piece of Fruit', color: '#b45309', damage: 5, cta: 'Peel one',
      lines: [
        'Crunchy or sweet. Comes in its own packaging.',
        'No mascot. No limited-edition flavour. Still sells out.',
        'One ingredient.'
      ]
    }
  }, [
    x('nissin', 'Nissin', '#e60012', 'nissin.com nissinfoods.com', 'maruchan', '日清食品|カップヌードル|Cup Noodles|どん兵衛'),
    x('maruchan', 'Maruchan', '#e60012', 'maruchan.co.jp maruchan.com', 'nissin', 'マルちゃん|東洋水産|赤いきつね'),
    x('calbee', 'Calbee', '#e60012', 'calbee.co.jp calbee.com', 'koikeya', 'カルビー|じゃがりこ|かっぱえびせん'),
    x('koikeya', 'Koikeya', '#e60012', 'koikeya.co.jp', 'calbee', '湖池屋'),
    x('meiji', 'Meiji', '#e60012', 'meiji.co.jp meiji.com', 'glico', '株式会社明治|ザバス|SAVAS|きのこの山|たけのこの里|明治ブルガリア', 1),
    x('glico', 'Glico', '#e60012', 'glico.com glico.co.jp', 'meiji', 'グリコ|ポッキー|Pocky|プリッツ'),
    x('lotte', 'Lotte', '#e60012', 'lotte.co.jp', 'meiji', 'ロッテ|コアラのマーチ|雪見だいふく'),
    x('morinaga', 'Morinaga', '#e60012', 'morinaga.co.jp', 'meiji', '森永製菓|ハイチュウ|Hi-Chew'),
    x('bourbon-jp', 'Bourbon', '#e60012', 'bourbon.co.jp', 'lotte', 'ブルボン', 1),
    x('ajinomoto', 'Ajinomoto', '#e60012', 'ajinomoto.co.jp ajinomoto.com', 'kikkoman', '味の素|クックドゥ|Cook Do'),
    x('kikkoman', 'Kikkoman', '#f39800', 'kikkoman.co.jp kikkoman.com kikkomanusa.com', 'ajinomoto', 'キッコーマン'),
    x('kewpie', 'Kewpie', '#e60012', 'kewpie.co.jp kewpie.com', 'ajinomoto', 'キユーピー|キューピーマヨネーズ'),
    x('kagome', 'Kagome', '#e60012', 'kagome.co.jp', 'kikkoman', 'カゴメ'),
    x('house-foods', 'House Foods', '#e60012', 'housefoods.jp', 'sb-foods', 'ハウス食品|バーモントカレー'),
    x('sb-foods', 'S&B Foods', '#e60012', 'sbfoods.co.jp', 'house-foods', 'エスビー食品|ゴールデンカレー'),
    x('yamazaki', 'Yamazaki Baking', '#e60012', 'yamazakipan.co.jp', 'meiji', 'ヤマザキパン|山崎製パン|ランチパック', 1),
    x('nestle', 'Nestlé', '#63513d', 'nestle.com nestle.co.jp nestle.jp', 'hersheys', 'Nestle|ネスレ|KitKat|キットカット|Kit Kat'),
    x('hersheys', "Hershey's", '#3b2314', 'hersheys.com hersheyland.com', 'mars', "Hersheys|Reese's|Reeses"),
    x('mars', 'Mars', '#e4002b', 'mars.com mms.com snickers.com', 'hersheys', "M&M's|Snickers|Skittles|Twix", 1),
    x('oreo', 'OREO', '#0057b8', 'oreo.com', 'hersheys', 'オレオ'),
    x('doritos', 'Doritos', '#e4002b', 'doritos.com', 'pringles'),
    x('lays', "Lay's", '#c9a100', 'lays.com', 'pringles', "Lay's", 1),
    x('pringles', 'Pringles', '#e4002b', 'pringles.com', 'lays', 'プリングルズ'),
    x('cheetos', 'Cheetos', '#f58220', 'cheetos.com', 'doritos'),
    x('kelloggs', "Kellogg's", '#e4002b', 'kelloggs.com kelloggs.jp', 'general-mills', 'Kelloggs|ケロッグ|Frosted Flakes|Pop-Tarts'),
    x('general-mills', 'General Mills', '#00539b', 'generalmills.com cheerios.com', 'kelloggs', 'Cheerios|Lucky Charms'),
    x('heinz', 'Heinz', '#c8102e', 'heinz.com kraftheinz.com', 'hellmanns', 'Kraft Heinz|ハインツ'),
    x('hellmanns', "Hellmann's", '#00539b', 'hellmanns.com', 'heinz', 'Hellmanns'),
    x('campbells', "Campbell's", '#e4002b', 'campbells.com', 'heinz', 'Campbells soup'),
    x('haagen-dazs', 'Häagen-Dazs', '#7b1e3a', 'haagen-dazs.com haagen-dazs.co.jp', 'ben-jerrys', 'Haagen-Dazs|ハーゲンダッツ'),
    x('ben-jerrys', "Ben & Jerry's", '#00a3e0', 'benjerry.com benjerry.jp', 'haagen-dazs', "Ben and Jerry's")
  ]);

  R.cat('spirits', {
    label: 'spirits',
    keywords: ['whiskey', 'whisky', 'vodka', 'tequila', 'bourbon', 'cocktail', '!ウイスキー', '!ハイボール', '!チューハイ', '!焼酎', '!日本酒', 'please drink responsibly'],
    nemesis: {
      name: 'Tomorrow Morning', color: '#1e3a8a', damage: 6, cta: 'Meet it clear-headed',
      lines: [
        'It arrives either way. You choose what state you are in.',
        'Smooth finish. No headache notes.',
        'Aged eight hours, in a bed.'
      ]
    }
  }, [
    x('jack-daniels', "Jack Daniel's", '#1a1a1a', 'jackdaniels.com', 'jim-beam', 'Jack Daniels|ジャックダニエル'),
    x('jim-beam', 'Jim Beam', '#c8102e', 'jimbeam.com', 'jack-daniels', 'ジムビーム'),
    x('makers-mark', "Maker's Mark", '#a6192e', 'makersmark.com', 'jack-daniels', 'Makers Mark|メーカーズマーク'),
    x('crown-royal', 'Crown Royal', '#4b2e83', 'crownroyal.com', 'jack-daniels'),
    x('fireball', 'Fireball', '#e4002b', 'fireballwhisky.com', 'jack-daniels', 'Fireball Whisky', 1),
    x('johnnie-walker', 'Johnnie Walker', '#d49a00', 'johnniewalker.com', 'chivas', 'ジョニーウォーカー'),
    x('chivas', 'Chivas Regal', '#7b1e3a', 'chivas.com', 'johnnie-walker', 'シーバスリーガル'),
    x('jameson', 'Jameson', '#00693e', 'jamesonwhiskey.com', 'johnnie-walker'),
    x('nikka', 'Nikka Whisky', '#1a1a1a', 'nikka.com', 'johnnie-walker', 'ニッカウヰスキー|ニッカウイスキー|ブラックニッカ|竹鶴'),
    x('smirnoff', 'Smirnoff', '#e4002b', 'smirnoff.com', 'absolut', 'スミノフ'),
    x('absolut', 'Absolut', '#003b83', 'absolut.com', 'smirnoff'),
    x('titos', "Tito's", '#b87333', 'titosvodka.com', 'smirnoff', "Titos|Tito's Handmade"),
    x('grey-goose', 'Grey Goose', '#003b83', 'greygoose.com', 'absolut'),
    x('bacardi', 'Bacardí', '#e4002b', 'bacardi.com', 'captain-morgan', 'Bacardi|バカルディ'),
    x('captain-morgan', 'Captain Morgan', '#c8102e', 'captainmorgan.com', 'bacardi'),
    x('hennessy', 'Hennessy', '#7b1e3a', 'hennessy.com', 'remy-martin', 'ヘネシー'),
    x('remy-martin', 'Rémy Martin', '#a6192e', 'remymartin.com', 'hennessy', 'Remy Martin'),
    x('patron', 'Patrón', '#6b8e23', 'patrontequila.com', 'don-julio', 'Patron tequila|Patrón', 1),
    x('don-julio', 'Don Julio', '#1a1a1a', 'donjulio.com', 'patron'),
    x('casamigos', 'Casamigos', '#b87333', 'casamigos.com', 'patron'),
    x('jose-cuervo', 'Jose Cuervo', '#c9a100', 'cuervo.com', 'patron'),
    x('aperol', 'Aperol', '#f15a22', 'aperol.com', 'campari'),
    x('campari', 'Campari', '#e4002b', 'campari.com', 'aperol', 'カンパリ'),
    x('baileys', 'Baileys', '#3b2314', 'baileys.com', 'jameson'),
    x('moet', 'Moët & Chandon', '#1a1a1a', 'moet.com', 'veuve', 'Moet & Chandon|モエ・エ・シャンドン'),
    x('veuve', 'Veuve Clicquot', '#f7a600', 'veuveclicquot.com', 'moet', 'ヴーヴ・クリコ'),
    x('takara', 'Takara Shuzo', '#e60012', 'takarashuzo.co.jp', 'gekkeikan', '宝酒造|タカラcanチューハイ|松竹梅|焼酎ハイボール'),
    x('gekkeikan', 'Gekkeikan', '#003b83', 'gekkeikan.co.jp gekkeikan.com', 'takara', '月桂冠'),
    x('dassai', 'Dassai', '#1a1a1a', 'asahishuzo.ne.jp dassai.com', 'gekkeikan', '獺祭')
  ]);

  R.cat('carrental', {
    label: 'car rental',
    keywords: ['!car rental', '!rent a car', '!レンタカー', '!rental car', '!カーシェア'],
    nemesis: {
      name: 'A Day Pass', color: '#0f766e', damage: 6, cta: 'Tap in',
      lines: [
        'Unlimited rides. No fuel policy. No walk-around inspection.',
        'Nobody at the counter offers you the upgrade.',
        'Return it by getting off.'
      ]
    }
  }, [
    x('hertz', 'Hertz', '#c9a100', 'hertz.com', 'avis', 'Hertz car|Hertz rental|Hertz Rent', 1),
    x('avis', 'Avis', '#d4002a', 'avis.com', 'hertz', 'Avis car|Avis rental|Avis Rent', 1),
    x('enterprise', 'Enterprise', '#00693e', 'enterprise.com', 'hertz', 'Enterprise Rent-A-Car|Enterprise car rental', 1),
    x('budget-rental', 'Budget', '#f15a22', 'budget.com', 'avis', 'Budget Rent a Car|Budget car rental', 1),
    x('sixt', 'Sixt', '#ff5f00', 'sixt.com', 'hertz'),
    x('turo', 'Turo', '#593cfb', 'turo.com', 'hertz'),
    x('zipcar', 'Zipcar', '#58a618', 'zipcar.com', 'turo'),
    x('times-car', 'Times Car', '#c9a100', 'timescar.jp', 'toyota-rentacar', 'タイムズカー|タイムズカーシェア|タイムズカーレンタル'),
    x('toyota-rentacar', 'Toyota Rent a Car', '#eb0a1e', 'rent.toyota.co.jp', 'times-car', 'トヨタレンタカー|Toyota Rent a Car', 1),
    x('nippon-rentacar', 'Nippon Rent-A-Car', '#e60012', 'nrgroup-global.com nipponrentacar.co.jp', 'toyota-rentacar', 'ニッポンレンタカー'),
    x('orix-rentacar', 'ORIX Rent a Car', '#003b83', 'car.orix.co.jp', 'toyota-rentacar', 'オリックスレンタカー', 1)
  ]);

  R.cat('eyewear', {
    label: 'glasses',
    keywords: ['!eyeglasses', '!メガネ', '!眼鏡', '!prescription glasses', 'contact lenses', '!コンタクトレンズ', 'sunglasses'],
    nemesis: {
      name: 'Squinting', color: '#44403c', damage: 3, cta: 'Lean closer',
      lines: [
        'Free. Hands-free. Makes you look thoughtful.',
        'Your current pair works. You are reading this.',
        'Sit nearer the screen. Sorted.'
      ]
    }
  }, [
    x('warby-parker', 'Warby Parker', '#00a2e1', 'warbyparker.com', 'zenni'),
    x('zenni', 'Zenni', '#00a3ad', 'zennioptical.com', 'warby-parker', 'Zenni Optical'),
    x('lenscrafters', 'LensCrafters', '#003b83', 'lenscrafters.com', 'warby-parker'),
    x('1800contacts', '1-800 Contacts', '#0072ce', '1800contacts.com', 'warby-parker', '1800 Contacts'),
    x('specsavers', 'Specsavers', '#00693e', 'specsavers.co.uk specsavers.com', 'warby-parker'),
    x('ray-ban', 'Ray-Ban', '#e4002b', 'ray-ban.com', 'oakley', 'RayBan|レイバン'),
    x('oakley', 'Oakley', '#1a1a1a', 'oakley.com', 'ray-ban', 'オークリー'),
    x('jins', 'JINS', '#1a1a1a', 'jins.com', 'zoff', 'ジンズ'),
    x('zoff', 'Zoff', '#0068b7', 'zoff.co.jp zoff.com', 'jins'),
    x('megane-ichiba', 'Megane Ichiba', '#003b83', 'meganeichiba.jp', 'jins', '眼鏡市場'),
    x('owndays', 'OWNDAYS', '#1a1a1a', 'owndays.com', 'jins', 'オンデーズ'),
    x('paris-miki', 'Paris Miki', '#003b83', 'paris-miki.co.jp', 'megane-ichiba', 'パリミキ'),
    x('acuvue', 'ACUVUE', '#00a3e0', 'acuvue.com acuvue.jnj.co.jp', 'menicon', 'アキュビュー'),
    x('menicon', 'Menicon', '#00a0e9', 'menicon.co.jp', 'acuvue', 'メニコン|メルスプラン')
  ]);

  R.cat('pets', {
    label: 'pet supplies',
    keywords: ['dog food', 'cat food', 'pet food', '!キャットフード', '!ドッグフード', '!ペットフード', '!ペット保険', 'for your pet', 'puppy', 'kitten'],
    nemesis: {
      name: 'A Stick', color: '#713f12', damage: 4, cta: 'Throw it',
      lines: [
        'The original dog toy. Still undefeated.',
        'Grain-free. Subscription-free. Found on the ground.',
        'Your cat prefers the box anyway.'
      ]
    }
  }, [
    x('chewy', 'Chewy', '#1c49c2', 'chewy.com', 'petco', 'Chewy.com|Chewy pharmacy|Chewy Autoship', 1),
    x('petco', 'Petco', '#001952', 'petco.com', 'petsmart'),
    x('petsmart', 'PetSmart', '#e4002b', 'petsmart.com', 'petco'),
    x('purina', 'Purina', '#e4002b', 'purina.com purina.jp', 'royal-canin', 'ピュリナ|Pro Plan|Fancy Feast|モンプチ'),
    x('royal-canin', 'Royal Canin', '#e4002b', 'royalcanin.com', 'purina', 'ロイヤルカナン'),
    x('hills', "Hill's", '#00539b', 'hillspet.com hills.co.jp', 'royal-canin', "Hill's Science Diet|Science Diet|サイエンス・ダイエット", 1),
    x('blue-buffalo', 'Blue Buffalo', '#00539b', 'bluebuffalo.com', 'purina'),
    x('farmers-dog', "The Farmer's Dog", '#f15a22', 'thefarmersdog.com', 'chewy', "Farmer's Dog|Farmers Dog"),
    x('pedigree', 'Pedigree', '#c9a100', 'pedigree.com pedigree.jp', 'purina', 'Pedigree dog food|ペディグリー', 1),
    x('sheba', 'Sheba', '#7b1e3a', 'sheba.com sheba.jp', 'purina', 'Sheba cat', 1),
    x('ciao', 'INABA Ciao', '#e60012', 'inaba-petfood.co.jp inabafoods.com', 'purina', 'いなばペットフード|ちゅ〜る|ちゅーる|CIAO Churu', 1),
    x('barkbox', 'BarkBox', '#00a3e0', 'barkbox.com', 'chewy'),
    x('rover', 'Rover', '#00a35c', 'rover.com', 'chewy', 'Rover.com|Rover sitter', 1),
    x('anicom', 'Anicom', '#00a0e9', 'anicom-sompo.co.jp', 'ipet', 'アニコム損保|アニコム'),
    x('ipet', 'ipet', '#e4007f', 'ipet-ins.com', 'anicom', 'アイペット損保', 1)
  ]);

  R.cat('security', {
    label: 'security software',
    keywords: ['!antivirus', '!ウイルス対策', 'malware', 'identity theft', '!password manager', 'パスワード管理', '!セキュリティソフト', 'virus protection'],
    nemesis: {
      name: 'Installing the Updates', color: '#075985', damage: 7, cta: 'Click "Restart now"',
      lines: [
        'Your computer came with one. It is already running.',
        'The patch you keep postponing does most of the work.',
        'No pop-ups warning you about threats so you buy more of it.'
      ]
    }
  }, [
    x('norton', 'Norton', '#c9a100', 'norton.com', 'mcafee', 'ノートン|Norton 360|LifeLock'),
    x('mcafee', 'McAfee', '#c01818', 'mcafee.com', 'norton', 'マカフィー'),
    x('kaspersky', 'Kaspersky', '#006d5c', 'kaspersky.com kaspersky.co.jp', 'eset', 'カスペルスキー'),
    x('eset', 'ESET', '#0096a1', 'eset.com', 'kaspersky', 'イーセット'),
    x('trend-micro', 'Trend Micro', '#d71920', 'trendmicro.com', 'norton', 'トレンドマイクロ|ウイルスバスター'),
    x('sourcenext', 'Sourcenext', '#e60012', 'sourcenext.com', 'trend-micro', 'ソースネクスト|ZEROウイルスセキュリティ|ポケトーク'),
    x('bitdefender', 'Bitdefender', '#ed1c24', 'bitdefender.com', 'norton'),
    x('malwarebytes', 'Malwarebytes', '#0d3ecc', 'malwarebytes.com', 'norton'),
    x('avast', 'Avast', '#ff7800', 'avast.com avg.com', 'norton', 'AVG AntiVirus'),
    x('1password', '1Password', '#0572ec', '1password.com', 'lastpass'),
    x('lastpass', 'LastPass', '#d32d27', 'lastpass.com', '1password'),
    x('dashlane', 'Dashlane', '#0e353d', 'dashlane.com', '1password'),
    x('bitwarden', 'Bitwarden', '#175ddc', 'bitwarden.com', '1password'),
    x('aura', 'Aura', '#6a0dad', 'aura.com', 'norton', 'Aura identity', 1),
    x('incogni', 'Incogni', '#1a1a1a', 'incogni.com', 'deleteme'),
    x('deleteme', 'DeleteMe', '#0d3ecc', 'joindeleteme.com', 'incogni')
  ]);

  R.cat('bizsoftware', {
    label: 'business software',
    keywords: ['!crm', '!saas', '!book a demo', '!request a demo', '請求書', '!経費精算', '!勤怠管理', '資料請求', '!資料ダウンロード', '導入事例', '業務効率化', 'dx推進', 'accounting software', 'payroll', 'ホワイトペーパー', 'enterprise-grade', 'ウェビナー', 'webinar', '導入実績', '法人向け'],
    nemesis: {
      name: 'A Spreadsheet', color: '#166534', damage: 7, cta: 'Add a tab',
      lines: [
        'Already installed. Already understood by Finance.',
        'No per-seat pricing. No onboarding call. No customer success manager.',
        'Every one of these products exports to it anyway.'
      ]
    }
  }, [
    x('salesforce', 'Salesforce', '#00a1e0', 'salesforce.com', 'hubspot', 'セールスフォース'),
    x('hubspot', 'HubSpot', '#ff7a59', 'hubspot.com hubspot.jp', 'salesforce', 'ハブスポット'),
    x('zoho', 'Zoho', '#e42527', 'zoho.com', 'hubspot'),
    x('sap', 'SAP', '#008fd3', 'sap.com', 'oracle', 'SAP S/4HANA|SAP Concur', 1),
    x('oracle', 'Oracle', '#c74634', 'oracle.com', 'sap', 'Oracle Cloud|Oracle Database|NetSuite|オラクル', 1),
    x('workday', 'Workday', '#0875e1', 'workday.com', 'sap', 'Workday HCM|Workday Adaptive|Workday Rising', 1),
    x('servicenow', 'ServiceNow', '#293e40', 'servicenow.com', 'salesforce'),
    x('ibm', 'IBM', '#0f62fe', 'ibm.com', 'oracle', 'watsonx'),
    x('cisco', 'Cisco', '#049fd9', 'cisco.com', 'ibm', 'Webex|シスコ'),
    x('quickbooks', 'QuickBooks', '#2ca01c', 'quickbooks.intuit.com quickbooks.com', 'xero', 'Intuit QuickBooks'),
    x('xero', 'Xero', '#13b5ea', 'xero.com', 'quickbooks'),
    x('freshbooks', 'FreshBooks', '#0075dd', 'freshbooks.com', 'quickbooks'),
    x('freee', 'freee', '#2864f0', 'freee.co.jp', 'money-forward', 'フリー会計|freee会計|freee人事労務'),
    x('money-forward', 'Money Forward', '#f7941d', 'moneyforward.com', 'freee', 'マネーフォワード|マネフォ'),
    x('yayoi', 'Yayoi', '#003b83', 'yayoi-kk.co.jp', 'freee', '弥生会計|やよいの青色申告', 1),
    x('obc', 'OBC', '#e60012', 'obc.co.jp', 'yayoi', '勘定奉行|奉行クラウド', 1),
    x('sansan', 'Sansan', '#004e98', 'sansan.com', 'salesforce', 'Bill One|Eight名刺'),
    x('smarthr', 'SmartHR', '#00a3aa', 'smarthr.jp', 'freee', 'スマートHR'),
    x('king-of-time', 'KING OF TIME', '#00a0e9', 'kingoftime.jp', 'smarthr', 'キングオブタイム'),
    x('jobcan', 'Jobcan', '#0068b7', 'jobcan.ne.jp', 'king-of-time', 'ジョブカン'),
    x('rakuraku', 'Rakuraku Seisan', '#f39800', 'rakurakuseisan.jp rakus.co.jp', 'money-forward', '楽楽精算|楽楽明細|ラクス'),
    x('kintone', 'kintone', '#d49a00', 'kintone.cybozu.co.jp kintone.com cybozu.co.jp', 'salesforce', 'キントーン|サイボウズ|Cybozu'),
    x('skysea', 'SKYSEA Client View', '#0068b7', 'skyseaclientview.net', 'kintone', 'SKYSEA'),
    x('cloudsign', 'CloudSign', '#0068b7', 'cloudsign.jp', 'docusign', 'クラウドサイン'),
    x('airregi', 'Airレジ', '#00a0e9', 'airregi.jp', 'square', 'Airレジ|エアレジ|Airペイ|エアペイ', 1),
    x('zendesk', 'Zendesk', '#03363d', 'zendesk.com zendesk.co.jp', 'intercom'),
    x('intercom', 'Intercom', '#286efa', 'intercom.com', 'zendesk', 'Intercom Fin', 1),
    x('mailchimp', 'Mailchimp', '#c9a100', 'mailchimp.com', 'klaviyo'),
    x('klaviyo', 'Klaviyo', '#1a1a1a', 'klaviyo.com', 'mailchimp'),
    x('semrush', 'Semrush', '#ff642d', 'semrush.com', 'ahrefs'),
    x('ahrefs', 'Ahrefs', '#ff8800', 'ahrefs.com', 'semrush'),
    x('docusign', 'Docusign', '#4c00ff', 'docusign.com', 'adobe'),
    x('adobe', 'Adobe', '#fa0f00', 'adobe.com', 'canva', 'アドビ|Photoshop|Acrobat|Creative Cloud|Adobe Firefly'),
    x('canva', 'Canva', '#00a3aa', 'canva.com', 'adobe'),
    x('figma', 'Figma', '#a259ff', 'figma.com', 'adobe'),
    x('grammarly', 'Grammarly', '#15a37e', 'grammarly.com', 'chatgpt'),
    x('gusto-hr', 'Gusto', '#f45d48', 'gusto.com', 'adp', 'Gusto payroll', 1),
    x('rippling', 'Rippling', '#502d3c', 'rippling.com', 'gusto-hr', 'Rippling HR|Rippling payroll', 1),
    x('adp', 'ADP', '#d0271d', 'adp.com', 'paychex'),
    x('paychex', 'Paychex', '#004b8d', 'paychex.com', 'adp'),
    x('deel', 'Deel', '#15357a', 'deel.com', 'rippling', 'Deel payroll|Deel HR', 1),
    x('expensify', 'Expensify', '#03a85f', 'expensify.com', 'ramp'),
    x('ramp', 'Ramp', '#a8b000', 'ramp.com', 'brex', 'Ramp card|Ramp.com', 1),
    x('brex', 'Brex', '#f46a35', 'brex.com', 'ramp'),
    x('stripe', 'Stripe', '#635bff', 'stripe.com', 'square', 'Stripe payments|Stripe Billing', 1),
    x('square', 'Square', '#1a1a1a', 'squareup.com square.site', 'stripe', 'Square POS|Square Terminal|スクエア決済', 1),
    x('twilio', 'Twilio', '#f22f46', 'twilio.com', 'stripe'),
    x('datadog', 'Datadog', '#632ca6', 'datadoghq.com', 'new-relic'),
    x('new-relic', 'New Relic', '#00ac69', 'newrelic.com', 'datadog'),
    x('snowflake', 'Snowflake', '#1a9bc9', 'snowflake.com', 'databricks', 'Snowflake Data Cloud|Snowflake AI|Snowflake Cortex', 1),
    x('databricks', 'Databricks', '#ff3621', 'databricks.com', 'snowflake'),
    x('mongodb', 'MongoDB', '#00684a', 'mongodb.com', 'snowflake'),
    x('okta', 'Okta', '#00297a', 'okta.com', 'cisco'),
    x('crowdstrike', 'CrowdStrike', '#e01f3d', 'crowdstrike.com', 'palo-alto'),
    x('palo-alto', 'Palo Alto Networks', '#fa582d', 'paloaltonetworks.com', 'crowdstrike'),
    x('github', 'GitHub', '#24292f', 'github.com', 'gitlab', 'GitHub Copilot'),
    x('gitlab', 'GitLab', '#fc6d26', 'gitlab.com', 'github'),
    x('jetbrains', 'JetBrains', '#1a1a1a', 'jetbrains.com', 'github', 'IntelliJ IDEA|PyCharm')
  ]);

  R.cat('banks', {
    label: 'banks',
    keywords: ['!checking account', '!savings account', 'open an account', '!high-yield', '!ネット銀行', '!定期預金', '!住宅ローン', '普通預金', '金利', 'mortgage', 'fdic', '口座開設'],
    nemesis: {
      name: 'The Account You Already Have', color: '#1e3a5f', damage: 5, cta: 'Leave it there',
      lines: [
        'Switching for a bonus is a part-time job with a bad hourly rate.',
        'Your money does not care what colour the app is.',
        'Same money. Fewer forms.'
      ]
    }
  }, [
    x('bank-of-america', 'Bank of America', '#e31837', 'bankofamerica.com', 'chase', 'BofA'),
    x('wells-fargo', 'Wells Fargo', '#d71e28', 'wellsfargo.com', 'bank-of-america'),
    x('us-bank', 'U.S. Bank', '#0c2074', 'usbank.com', 'wells-fargo', 'US Bank|U.S. Bank', 1),
    x('pnc', 'PNC', '#f58025', 'pnc.com', 'wells-fargo', 'PNC Bank', 1),
    x('td-bank', 'TD Bank', '#2a8a3c', 'td.com tdbank.com', 'bank-of-america', 'TD Bank', 1),
    x('truist', 'Truist', '#2e1a47', 'truist.com', 'wells-fargo'),
    x('usaa', 'USAA', '#003a63', 'usaa.com', 'navy-federal'),
    x('navy-federal', 'Navy Federal', '#003b6f', 'navyfederal.org', 'usaa', 'Navy Federal Credit Union'),
    x('ally', 'Ally', '#650360', 'ally.com', 'sofi', 'Ally Bank|Ally Invest', 1),
    x('sofi', 'SoFi', '#00a2c7', 'sofi.com', 'ally'),
    x('chime', 'Chime', '#17a65a', 'chime.com', 'sofi', 'Chime bank|Chime app', 1),
    x('varo', 'Varo', '#00a39a', 'varomoney.com', 'chime', 'Varo Bank', 1),
    x('current', 'Current', '#1a1a1a', 'current.com', 'chime', 'Current app|Current bank', 1),
    x('mufg', 'MUFG Bank', '#e60000', 'bk.mufg.jp mufg.jp', 'smbc', '三菱UFJ銀行|三菱UFJ'),
    x('smbc', 'SMBC', '#00693e', 'smbc.co.jp', 'mufg', '三井住友銀行', 1),
    x('mizuho', 'Mizuho', '#0f3a8d', 'mizuhobank.co.jp mizuho-fg.co.jp', 'mufg', 'みずほ銀行'),
    x('resona', 'Resona', '#00693e', 'resonabank.co.jp resona-gr.co.jp', 'mizuho', 'りそな銀行'),
    x('yucho', 'Japan Post Bank', '#00693e', 'jp-bank.japanpost.jp', 'mufg', 'ゆうちょ銀行'),
    x('rakuten-bank', 'Rakuten Bank', '#bf0000', 'rakuten-bank.co.jp', 'sbi-net-bank', '楽天銀行'),
    x('sbi-net-bank', 'SBI Sumishin Net Bank', '#0068b7', 'netbk.co.jp', 'rakuten-bank', '住信SBIネット銀行'),
    x('sony-bank', 'Sony Bank', '#1a1a1a', 'sonybank.jp moneykit.net', 'sbi-net-bank', 'ソニー銀行'),
    x('paypay-bank', 'PayPay Bank', '#ff0033', 'paypay-bank.co.jp', 'rakuten-bank', 'PayPay銀行', 1),
    x('au-jibun', 'au Jibun Bank', '#eb5505', 'jibunbank.co.jp', 'rakuten-bank', 'auじぶん銀行', 1),
    x('seven-bank', 'Seven Bank', '#00693e', 'sevenbank.co.jp', 'yucho', 'セブン銀行'),
    x('aeon-bank', 'AEON Bank', '#b60081', 'aeonbank.co.jp', 'rakuten-bank', 'イオン銀行'),
    x('shinsei', 'SBI Shinsei Bank', '#0068b7', 'sbishinseibank.co.jp', 'sony-bank', 'SBI新生銀行|新生銀行'),
    x('minna-bank', 'Minna Bank', '#1a1a1a', 'minna-no-ginko.com', 'sbi-net-bank', 'みんなの銀行'),
    x('hsbc', 'HSBC', '#db0011', 'hsbc.com hsbc.co.uk', 'barclays'),
    x('barclays', 'Barclays', '#00aeef', 'barclays.co.uk barclays.com', 'hsbc'),
    x('lloyds', 'Lloyds', '#006a4d', 'lloydsbank.com', 'barclays', 'Lloyds Bank', 1),
    x('natwest', 'NatWest', '#42145f', 'natwest.com', 'lloyds'),
    x('santander', 'Santander', '#ec0000', 'santander.com santander.co.uk santanderbank.com', 'hsbc'),
    x('monzo', 'Monzo', '#ff4f40', 'monzo.com', 'revolut'),
    x('revolut', 'Revolut', '#1a1a1a', 'revolut.com', 'monzo'),
    x('wise', 'Wise', '#5a9a2a', 'wise.com', 'revolut', 'Wise transfer|Wise account|Wise.com', 1),
    x('western-union', 'Western Union', '#c9a800', 'westernunion.com', 'wise'),
    x('remitly', 'Remitly', '#2d6cdf', 'remitly.com', 'wise')
  ]);

  R.cat('loans', {
    label: 'loans',
    noRival: true,
    keywords: ['!カードローン', '!キャッシング', '!即日融資', '!お借入', '!消費者金融', '!personal loan', '!payday', '!debt consolidation', '!cash advance', '!債務整理', '!過払い金', '!title loan', '!debt relief', 'low monthly payments', 'refinance', '借り換え'],
    nemesis: {
      name: 'Not Borrowing It', color: '#3f3f46', damage: 10, cta: 'Wait a month',
      lines: [
        'The cheapest loan is the one you never take out.',
        '"Decision in 30 minutes" is not the advantage they think it is.',
        'Interest is the price of impatience. Patience is free.',
        'If the ad is this friendly, read the rate twice.'
      ]
    }
  }, [
    x('acom', 'Acom', '#e60012', 'acom.co.jp', '', 'アコム'),
    x('promise', 'Promise', '#003b83', 'promise.co.jp', '', 'プロミス', 1),
    x('aiful', 'Aiful', '#e60012', 'aiful.co.jp', '', 'アイフル'),
    x('mobit', 'SMBC Mobit', '#00693e', 'mobit.ne.jp', '', 'SMBCモビット|モビット'),
    x('lake', 'Lake', '#0068b7', 'lakealsa.com', '', 'レイクALSA|レイクアルサ', 1),
    x('adire', 'Adire Law Office', '#e60012', 'adire.jp', '', 'アディーレ法律事務所'),
    x('lendingtree', 'LendingTree', '#08c177', 'lendingtree.com', ''),
    x('upstart', 'Upstart', '#00b1ac', 'upstart.com', '', 'Upstart loan|Upstart.com', 1),
    x('lendingclub', 'LendingClub', '#e23a22', 'lendingclub.com', ''),
    x('onemain', 'OneMain Financial', '#003b83', 'onemainfinancial.com', '', 'OneMain'),
    x('dave', 'Dave', '#00a35c', 'dave.com', '', 'Dave app', 1),
    x('earnin', 'EarnIn', '#1a1a1a', 'earnin.com', ''),
    x('brigit', 'Brigit', '#00a37a', 'hellobrigit.com', ''),
    x('moneylion', 'MoneyLion', '#00a3ad', 'moneylion.com', ''),
    x('advance-america', 'Advance America', '#003b83', 'advanceamerica.net', ''),
    x('national-debt-relief', 'National Debt Relief', '#003b83', 'nationaldebtrelief.com', ''),
    x('freedom-debt', 'Freedom Debt Relief', '#00539b', 'freedomdebtrelief.com', ''),
    x('loandepot', 'loanDepot', '#5b2d86', 'loandepot.com', ''),
    x('sallie-mae', 'Sallie Mae', '#00539b', 'salliemae.com', '')
  ]);

  R.cat('payments', {
    label: 'payment apps',
    keywords: ['!スマホ決済', '!コード決済', '!qr決済', 'send money', 'tap to pay', 'キャッシュレス', 'チャージ', 'contactless'],
    nemesis: {
      name: 'Exact Change', color: '#52525b', damage: 5, cta: 'Check the jar',
      lines: [
        'Works with a flat battery.',
        'No app update required before you can buy a sandwich.',
        'The reward programme is: you know what you spent.'
      ]
    }
  }, [
    x('paypay', 'PayPay', '#ff0033', 'paypay.ne.jp', 'rakuten-pay', 'ペイペイ'),
    x('rakuten-pay', 'Rakuten Pay', '#bf0000', 'pay.rakuten.co.jp', 'paypay', '楽天ペイ'),
    x('d-barai', 'd Barai', '#cc0033', 'dpayment.docomo.ne.jp service.smt.docomo.ne.jp', 'paypay', 'd払い', 1),
    x('au-pay', 'au PAY', '#eb5505', 'aupay.wallet.auone.jp wallet.auone.jp', 'paypay', 'au PAY', 1),
    x('line-pay', 'LINE Pay', '#06c755', 'pay.line.me', 'paypay', 'LINE Pay', 1),
    x('kyash', 'Kyash', '#0099db', 'kyash.co', 'paypay'),
    x('suica', 'Suica', '#008803', 'mobilesuica.com', 'pasmo', 'モバイルSuica'),
    x('pasmo', 'PASMO', '#e4007f', 'pasmo.co.jp', 'suica', 'モバイルPASMO'),
    x('nanaco', 'nanaco', '#f39800', 'nanaco-net.jp', 'waon', 'ナナコ'),
    x('waon', 'WAON', '#b60081', 'waon.net', 'nanaco'),
    x('ponta', 'Ponta', '#f39800', 'ponta.jp', 'v-point', 'Pontaポイント'),
    x('v-point', 'V Point', '#003b83', 'tsite.jp vpoint.jp', 'ponta', 'Vポイント|Tポイント', 1),
    x('paypal', 'PayPal', '#003087', 'paypal.com', 'venmo'),
    x('venmo', 'Venmo', '#008cff', 'venmo.com', 'cash-app'),
    x('cash-app', 'Cash App', '#00a82a', 'cash.app', 'venmo'),
    x('zelle', 'Zelle', '#6d1ed4', 'zellepay.com', 'venmo'),
    x('apple-pay', 'Apple Pay', '#1a1a1a', 'wallet.apple.com', 'google-pay', 'Apple Pay', 1),
    x('google-pay', 'Google Pay', '#4285f4', 'pay.google.com', 'apple-pay', 'Google Pay|Google Wallet', 1),
    x('amazon-pay', 'Amazon Pay', '#ff9900', 'pay.amazon.com pay.amazon.co.jp', 'paypal', 'Amazon Pay', 1),
    x('shop-pay', 'Shop Pay', '#5a31f4', 'shop.app', 'paypal', 'Shop Pay', 1)
  ]);

  R.cat('furusato', {
    label: 'hometown tax sites',
    keywords: ['!ふるさと納税', '返礼品', '控除上限'],
    nemesis: {
      name: 'Just Paying Your Taxes', color: '#475569', damage: 3, cta: 'Do nothing',
      lines: [
        'No catalogue. No year-end rush. No freezer full of crab.',
        'The return gift is roads.',
        'One-stop, in the sense that you stop.'
      ]
    }
  }, [
    x('satofull', 'Satofull', '#e60012', 'satofull.jp', 'furusato-choice', 'さとふる'),
    x('furusato-choice', 'Furusato Choice', '#f39800', 'furusato-tax.jp', 'satofull', 'ふるさとチョイス'),
    x('furunavi', 'Furunavi', '#e60012', 'furunavi.jp', 'satofull', 'ふるなび'),
    x('furusato-premium', 'Furusato Premium', '#b8860b', '26p.jp', 'furunavi', 'ふるさとプレミアム'),
    x('mynavi-furusato', 'Mynavi Furusato Nozei', '#00a0e9', 'furusato.mynavi.jp', 'satofull', 'マイナビふるさと納税', 1),
    x('rakuten-furusato', 'Rakuten Furusato Nozei', '#bf0000', 'furusato.rakuten.co.jp', 'satofull', '楽天ふるさと納税', 1)
  ]);
})(typeof globalThis !== 'undefined' ? globalThis : this);
