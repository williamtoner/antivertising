/*
 * Antivertising rivalry database.
 *
 * Every category has:
 *   label     human name, used when we know the category but not the brand
 *   keywords  ad-copy phrases that identify the category when no brand matches
 *             (a leading "!" marks a phrase strong enough to count on its own)
 *   nemesis   the "opposed industry" counter-ad: the thing that makes the whole
 *             category unnecessary. `damage` (1-10) is how badly it hurts
 *             compared with a rival ad (arch-rival = 9, other rival = 7).
 *   noRival   never show a competitor from this category (e.g. gambling)
 *   brands    the advertisers we can recognise
 *
 * Every brand has:
 *   domains   landing-page domains (suffix matched, most specific wins)
 *   aliases   extra names matched in ad text
 *   strict    the bare name is too ambiguous to match in text ("Target", "Max")
 *   arch      id of the arch-rival, the single most damaging replacement
 *   line      the pitch shown when THIS brand replaces someone else's ad.
 *             {orig} becomes the name of the advertiser that paid for the slot.
 *
 * All copy is original parody written for this project. None of it is endorsed
 * by, or affiliated with, any brand named here.
 */
(function (root) {
  'use strict';

  function b(id, name, color, domains, line, opts) {
    var brand = { id: id, name: name, color: color, domains: domains, line: line };
    if (opts) for (var k in opts) brand[k] = opts[k];
    return brand;
  }

  var categories = {
    soda: {
      label: 'soft drinks',
      keywords: ['soda', 'cola', 'soft drink', 'fizzy drink', 'zero sugar'],
      nemesis: {
        name: 'Tap Water', color: '#0b84d8', damage: 6, cta: 'Turn on a tap',
        lines: [
          'Free. Zero sugar. Already plumbed into your house.',
          'No can. No ad budget. No dentist.',
          'The original zero-calorie drink. Still unbeaten.'
        ]
      },
      brands: [
        b('pepsi', 'Pepsi', '#004b93', ['pepsi.com', 'pepsi.co.uk'], 'Someone paid for a {orig} ad here. Have a Pepsi instead.', { arch: 'coca-cola' }),
        b('coca-cola', 'Coca-Cola', '#e41e2b', ['coca-cola.com', 'coca-cola.co.uk', 'coke.com'], 'Is {orig} OK? No. Ask for the red one.', { arch: 'pepsi', aliases: ['Coca Cola', 'Coke', 'Coke Zero', 'Diet Coke'] }),
        b('dr-pepper', 'Dr Pepper', '#711f25', ['drpepper.com'], '23 flavours. None of them are {orig}.', { aliases: ['Dr. Pepper'] }),
        b('sprite', 'Sprite', '#00823c', ['sprite.com'], 'Clear. Unlike your reasons for wanting a {orig}.'),
        b('mountain-dew', 'Mountain Dew', '#6bbe45', ['mountaindew.com'], '{orig} is a drink. This is a lifestyle choice.', { aliases: ['Mtn Dew'] }),
        b('fanta', 'Fanta', '#f7941d', ['fanta.com'], 'It is orange. It is fizzy. It is not {orig}.')
      ]
    },

    energy: {
      label: 'energy drinks',
      keywords: ['energy drink', 'caffeine', 'pre-workout'],
      nemesis: {
        name: 'Sleep', color: '#2b2d6e', damage: 7, cta: 'Go to bed',
        lines: [
          'Eight hours. No can required.',
          'The energy product with no crash. Available nightly.',
          'Wings are not coming. A pillow might help.'
        ]
      },
      brands: [
        b('red-bull', 'Red Bull', '#db0a40', ['redbull.com'], 'The original. {orig} is the cover version.', { arch: 'monster' }),
        b('monster', 'Monster Energy', '#95d600', ['monsterenergy.com'], 'Twice the can. {orig} never stood a chance.', { arch: 'red-bull', strict: true, aliases: ['Monster Energy'] }),
        b('celsius', 'Celsius', '#e4002b', ['celsius.com'], 'The one your gym actually stocks. Bye, {orig}.', { strict: true, aliases: ['Celsius energy', 'CELSIUS Live Fit'] }),
        b('prime', 'Prime', '#1a1a1a', ['drinkprime.com'], 'Your nephew says {orig} is over.', { strict: true, aliases: ['Prime Hydration', 'Prime Energy'] })
      ]
    },

    fastfood: {
      label: 'fast food',
      keywords: ['burger', 'fries', 'drive-thru', 'drive thru', 'nuggets', 'value meal', 'pizza delivery', 'fried chicken'],
      nemesis: {
        name: 'Your Kitchen', color: '#2f6b3a', damage: 6, cta: 'Open the fridge',
        lines: [
          'There is food at home. There has always been food at home.',
          'Open late. No queue. You know the chef.',
          'An egg costs less than the delivery fee.'
        ]
      },
      brands: [
        b('mcdonalds', "McDonald's", '#ffc72c', ['mcdonalds.com', 'mcdonalds.co.uk'], 'You were always going to end up here. Skip the {orig}.', { arch: 'burger-king', aliases: ['McDonalds', 'Big Mac', 'McNuggets', 'McFlurry'] }),
        b('burger-king', 'Burger King', '#d62300', ['bk.com', 'burgerking.com', 'burgerking.co.uk'], 'Flame-grilled. {orig} can only dream.', { arch: 'mcdonalds', aliases: ['Whopper'] }),
        b('wendys', "Wendy's", '#e2203d', ['wendys.com'], 'Square patties. {orig} cuts corners.', { arch: 'mcdonalds', aliases: ['Wendys'] }),
        b('kfc', 'KFC', '#e4002b', ['kfc.com', 'kfc.co.uk'], 'Nobody ever licked their fingers after {orig}.', { arch: 'popeyes', aliases: ['Kentucky Fried Chicken'] }),
        b('popeyes', 'Popeyes', '#f15c22', ['popeyes.com'], 'The chicken sandwich {orig} wishes it had.', { arch: 'kfc' }),
        b('chick-fil-a', 'Chick-fil-A', '#e51636', ['chick-fil-a.com'], 'Come for the chicken. Stay because it is not {orig}.', { arch: 'popeyes' }),
        b('taco-bell', 'Taco Bell', '#702082', ['tacobell.com', 'tacobell.co.uk'], 'It is 1am. {orig} is closed. We are not.'),
        b('subway', 'Subway', '#008c15', ['subway.com'], 'A foot long. {orig} measures in regrets.', { strict: true, aliases: ['Subway footlong', 'Subway sandwich', 'Subway sub'] }),
        b('dominos', "Domino's", '#006491', ['dominos.com', 'dominos.co.uk'], 'At your door before {orig} finds its keys.', { arch: 'pizza-hut', aliases: ['Dominos'] }),
        b('pizza-hut', 'Pizza Hut', '#ee3a43', ['pizzahut.com', 'pizzahut.co.uk'], 'Stuffed crust. {orig} just has crust.', { arch: 'dominos' }),
        b('papa-johns', 'Papa Johns', '#2d5d2a', ['papajohns.com', 'papajohns.co.uk'], 'The garlic dip alone beats {orig}.', { arch: 'dominos', aliases: ["Papa John's"] })
      ]
    },

    coffee: {
      label: 'coffee',
      keywords: ['coffee', 'latte', 'espresso', 'cold brew', 'frappuccino'],
      nemesis: {
        name: 'Your Kettle', color: '#5a3a22', damage: 6, cta: 'Put it on',
        lines: [
          'You own a kettle. It spells your name right every time.',
          'Hot bean water, at cost.',
          'No queue, no app, no loyalty stars.'
        ]
      },
      brands: [
        b('starbucks', 'Starbucks', '#00704a', ['starbucks.com', 'starbucks.co.uk'], "Your name, spelled wrong, on a better cup than {orig}'s.", { arch: 'dunkin' }),
        b('dunkin', "Dunkin'", '#ff671f', ['dunkindonuts.com', 'dunkin.com'], 'Coffee that does not need a vocabulary. Sorry, {orig}.', { arch: 'starbucks', aliases: ['Dunkin Donuts', "Dunkin' Donuts"] }),
        b('nespresso', 'Nespresso', '#3b2a20', ['nespresso.com'], 'One button. Zero {orig}.', { arch: 'keurig' }),
        b('keurig', 'Keurig', '#6b4f3a', ['keurig.com'], 'A pod for every mood, including "not {orig}".', { arch: 'nespresso' }),
        b('costa', 'Costa Coffee', '#6d1f37', ['costa.co.uk'], 'A flat white that is not from {orig}. Lovely.', { arch: 'starbucks', strict: true, aliases: ['Costa Coffee'] }),
        b('tim-hortons', 'Tim Hortons', '#c8102e', ['timhortons.com', 'timhortons.ca'], "Canada's answer to {orig}. The answer is no.", { arch: 'starbucks', aliases: ['Tim Hortons', 'Timbits'] })
      ]
    },

    delivery: {
      label: 'food delivery',
      keywords: ['food delivery', 'order now', 'delivered to your door', 'delivery fee', 'takeaway'],
      nemesis: {
        name: 'Walking There', color: '#3d6b5c', damage: 7, cta: 'Find your shoes',
        lines: [
          'The restaurant is 900 metres away. You have legs.',
          'No service fee. No small-order fee. No fee fee.',
          'Arrives hot, because you carried it.'
        ]
      },
      brands: [
        b('doordash', 'DoorDash', '#eb1700', ['doordash.com'], 'Dinner, delivered by someone who is not {orig}.', { arch: 'uber-eats' }),
        b('uber-eats', 'Uber Eats', '#06c167', ['ubereats.com'], 'You already have the app. {orig} can stay undownloaded.', { arch: 'doordash', aliases: ['UberEats'] }),
        b('grubhub', 'Grubhub', '#f63440', ['grubhub.com'], 'Delivering since before {orig} could ride a bike.', { arch: 'doordash' }),
        b('deliveroo', 'Deliveroo', '#00ccbc', ['deliveroo.co.uk', 'deliveroo.com'], 'The teal bag. Not the {orig} one.', { arch: 'just-eat' }),
        b('just-eat', 'Just Eat', '#ff8000', ['just-eat.co.uk', 'just-eat.com'], 'Did somebody say "not {orig}"?', { arch: 'deliveroo' }),
        b('instacart', 'Instacart', '#43b02a', ['instacart.com'], 'Groceries, so you can pretend you will cook instead of opening {orig}.')
      ]
    },

    rides: {
      label: 'ride-hailing',
      keywords: ['get a ride', 'request a ride', 'rideshare', 'ride-hailing'],
      nemesis: {
        name: 'A Bicycle', color: '#c2410c', damage: 7, cta: 'Pump the tyres',
        lines: [
          'No surge pricing. Ever.',
          'Your driver is you. Five stars.',
          'Arrives in zero minutes. It is in the hallway.'
        ]
      },
      brands: [
        b('uber', 'Uber', '#000000', ['uber.com'], 'You were going to check both apps anyway. Skip {orig}.', { arch: 'lyft' }),
        b('lyft', 'Lyft', '#ff00bf', ['lyft.com'], 'Pink is faster than {orig}. That is just science.', { arch: 'uber' }),
        b('bolt', 'Bolt', '#34d186', ['bolt.eu'], 'Same journey. Different app. Not {orig}.', { arch: 'uber', strict: true, aliases: ['Bolt app', 'Bolt ride', 'Bolt driver'] })
      ]
    },

    cars: {
      label: 'cars',
      keywords: ['test drive', 'suv', 'lease', 'mpg', 'horsepower', 'dealership', 'all-new', 'hybrid', 'crossover', 'sedan', 'towing'],
      nemesis: {
        name: 'The Bus', color: '#b45309', damage: 5, cta: 'Check the timetable',
        lines: [
          'Someone else drives. Someone else parks. Someone else pays the insurance.',
          'Zero percent APR, because there is no loan.',
          'It depreciates, but not out of your pocket.'
        ]
      },
      brands: [
        b('toyota', 'Toyota', '#eb0a1e', ['toyota.com', 'toyota.co.uk'], 'It will outlive your {orig}. And possibly you.', { arch: 'honda' }),
        b('honda', 'Honda', '#cc0000', ['honda.com', 'honda.co.uk'], 'The sensible choice your {orig} was afraid of.', { arch: 'toyota' }),
        b('ford', 'Ford', '#003478', ['ford.com', 'ford.co.uk'], 'Built tough. {orig} was built on a Tuesday.', { arch: 'chevrolet' }),
        b('chevrolet', 'Chevrolet', '#cd9834', ['chevrolet.com'], 'Find new roads. Leave the {orig} on the old ones.', { arch: 'ford', aliases: ['Chevy'] }),
        b('tesla', 'Tesla', '#e31937', ['tesla.com'], 'No petrol. No dealership. No {orig}.', { arch: 'bmw' }),
        b('bmw', 'BMW', '#0066b1', ['bmw.com', 'bmwusa.com', 'bmw.co.uk'], 'The ultimate reason to cancel that {orig} test drive.', { arch: 'mercedes' }),
        b('mercedes', 'Mercedes-Benz', '#222222', ['mercedes-benz.com', 'mbusa.com', 'mercedes-benz.co.uk'], 'The star. {orig} is the understudy.', { arch: 'bmw', aliases: ['Mercedes'] }),
        b('audi', 'Audi', '#bb0a30', ['audi.com', 'audiusa.com', 'audi.co.uk'], 'Four rings beat whatever {orig} has on the bonnet.', { arch: 'bmw' }),
        b('volkswagen', 'Volkswagen', '#001e50', ['vw.com', 'volkswagen.com', 'volkswagen.co.uk'], "The people's car. {orig} is for other people.", { arch: 'toyota', aliases: ['VW'] }),
        b('hyundai', 'Hyundai', '#002c5f', ['hyundai.com', 'hyundaiusa.com'], 'More car than {orig}, and it knows it.', { arch: 'kia' }),
        b('kia', 'Kia', '#05141f', ['kia.com'], 'Looks expensive. Is not a {orig}.', { arch: 'hyundai' }),
        b('nissan', 'Nissan', '#c3002f', ['nissanusa.com', 'nissan.co.uk', 'nissan-global.com'], 'Innovation that excites. Unlike {orig}.', { arch: 'toyota' })
      ]
    },

    airlines: {
      label: 'airlines',
      keywords: ['flights', 'fly direct', 'book your flight', 'airfare', 'nonstop', 'frequent flyer'],
      nemesis: {
        name: 'The Train', color: '#14532d', damage: 6, cta: 'Find a platform',
        lines: [
          'City centre to city centre. Keep your shoes on.',
          'Legroom as standard. Liquids welcome.',
          'There is a window, and it has things in it.'
        ]
      },
      brands: [
        b('delta', 'Delta', '#e01933', ['delta.com'], 'Same sky. Better company than {orig}.', { arch: 'united', strict: true, aliases: ['Delta Air Lines', 'Delta Airlines', 'SkyMiles'] }),
        b('united', 'United', '#002244', ['united.com'], "Our skies are friendlier than {orig}'s.", { arch: 'delta', strict: true, aliases: ['United Airlines', 'MileagePlus'] }),
        b('american', 'American Airlines', '#0078d2', ['aa.com'], 'Going places {orig} only codeshares to.', { arch: 'delta', strict: true, aliases: ['American Airlines', 'AAdvantage'] }),
        b('southwest', 'Southwest', '#304cb2', ['southwest.com'], 'Bags of personality. {orig} just has baggage.', { arch: 'delta', strict: true, aliases: ['Southwest Airlines'] }),
        b('jetblue', 'JetBlue', '#003876', ['jetblue.com'], 'Legroom. A concept {orig} is still researching.', { arch: 'delta' }),
        b('ryanair', 'Ryanair', '#073590', ['ryanair.com'], 'So cheap you will forgive us. Unlike {orig}.', { arch: 'easyjet' }),
        b('easyjet', 'easyJet', '#ff6600', ['easyjet.com'], 'Orange you glad it is not {orig}?', { arch: 'ryanair' }),
        b('british-airways', 'British Airways', '#075aaa', ['britishairways.com', 'ba.com'], 'To fly. To serve. To not be {orig}.', { arch: 'easyjet' })
      ]
    },

    travel: {
      label: 'travel booking',
      keywords: ['hotel deals', 'book your stay', 'vacation rental', 'holiday rental', 'free cancellation', 'per night', 'city break'],
      nemesis: {
        name: 'Your Own Bed', color: '#7c3aed', damage: 6, cta: 'Stay in',
        lines: [
          'Rated 5 stars by the only guest who matters.',
          'No check-out time. No resort fee.',
          'You have already paid for tonight.'
        ]
      },
      brands: [
        b('booking', 'Booking.com', '#003580', ['booking.com'], 'Free cancellation. Start with your {orig} booking.', { arch: 'expedia', strict: true, aliases: ['Booking.com'] }),
        b('expedia', 'Expedia', '#1e243a', ['expedia.com', 'expedia.co.uk'], 'Flights, hotels, cars. Everything except {orig}.', { arch: 'booking' }),
        b('airbnb', 'Airbnb', '#ff385c', ['airbnb.com', 'airbnb.co.uk'], "Stay in someone's actual home. {orig} can keep the lobby.", { arch: 'booking' }),
        b('vrbo', 'Vrbo', '#1c4695', ['vrbo.com'], 'The whole place to yourselves. {orig} who?', { arch: 'airbnb' }),
        b('tripadvisor', 'Tripadvisor', '#34e0a1', ['tripadvisor.com', 'tripadvisor.co.uk'], 'Read 4,000 reviews before trusting {orig}.', { arch: 'booking' }),
        b('hotels-com', 'Hotels.com', '#d32f2f', ['hotels.com'], 'A room with a view of not using {orig}.', { arch: 'booking', strict: true, aliases: ['Hotels.com'] }),
        b('trivago', 'trivago', '#007fad', ['trivago.com', 'trivago.co.uk'], 'Hotel? Not {orig}.', { arch: 'booking' })
      ]
    },

    phones: {
      label: 'phones',
      keywords: ['smartphone', 'trade-in', 'megapixel', 'new phone', '5g phone'],
      nemesis: {
        name: 'The Phone You Already Own', color: '#374151', damage: 8, cta: 'Keep it',
        lines: [
          'It still makes calls. It still takes photos of your lunch.',
          'Now with a feature the new one lacks: it is paid off.',
          'A new case is a lot cheaper.'
        ]
      },
      brands: [
        b('apple', 'Apple', '#000000', ['apple.com'], 'Blue bubbles only. Sorry, {orig}.', { arch: 'samsung', strict: true, aliases: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods'] }),
        b('samsung', 'Samsung', '#1428a0', ['samsung.com'], 'It folds. Your {orig} just sits there.', { arch: 'apple', aliases: ['Samsung Galaxy', 'Galaxy S25', 'Galaxy S26', 'Galaxy Z Fold'] }),
        b('google-pixel', 'Google Pixel', '#4285f4', ['store.google.com'], 'The camera your {orig} photos wish they had.', { arch: 'apple', strict: true, aliases: ['Google Pixel', 'Pixel 9', 'Pixel 10', 'Pixel Pro'] })
      ]
    },

    carriers: {
      label: 'mobile networks',
      keywords: ['unlimited data', 'unlimited plan', 'switch and save', 'sim only', '5g network', 'per line'],
      nemesis: {
        name: 'Wi-Fi', color: '#0f766e', damage: 5, cta: 'Connect',
        lines: [
          'It is at home. It is at work. It is at the café. You are covered.',
          'Unlimited data, already included in your rent.',
          'How many gigabytes do you really use on the bus?'
        ]
      },
      brands: [
        b('verizon', 'Verizon', '#cd040b', ['verizon.com'], 'Can you hear us now, {orig}?', { arch: 't-mobile' }),
        b('att', 'AT&T', '#00a8e0', ['att.com'], 'Reach out and switch from {orig}.', { arch: 'verizon', strict: true, aliases: ['AT&T'] }),
        b('t-mobile', 'T-Mobile', '#e20074', ['t-mobile.com'], 'Magenta looks better on you than {orig} does.', { arch: 'verizon' }),
        b('mint-mobile', 'Mint Mobile', '#5cb88a', ['mintmobile.com'], 'The fox says leave {orig}.', { arch: 'verizon' }),
        b('vodafone', 'Vodafone', '#e60000', ['vodafone.co.uk', 'vodafone.com'], 'Red. Loud. Not {orig}.', { arch: 'ee' }),
        b('ee', 'EE', '#007b85', ['ee.co.uk'], 'Two letters. {orig} needed more and did less.', { arch: 'vodafone', strict: true, aliases: [] }),
        b('o2', 'O2', '#0019a5', ['o2.co.uk'], 'Breathe. It is not {orig}.', { arch: 'vodafone', strict: true, aliases: [] })
      ]
    },

    streaming: {
      label: 'streaming',
      keywords: ['now streaming', 'stream now', 'watch now', 'new season', 'start your free trial', 'original series'],
      nemesis: {
        name: 'Your Library Card', color: '#7f1d1d', damage: 7, cta: 'Borrow something',
        lines: [
          'Thousands of titles. No monthly fee. No password-sharing crackdown.',
          'Never cancelled after one season.',
          'They have DVDs too. Ask your parents.'
        ]
      },
      brands: [
        b('netflix', 'Netflix', '#e50914', ['netflix.com'], 'Are you still watching {orig}? Why?', { arch: 'disney-plus' }),
        b('disney-plus', 'Disney+', '#113ccf', ['disneyplus.com'], 'We own your childhood. {orig} is renting it.', { arch: 'netflix', aliases: ['Disney Plus'] }),
        b('hulu', 'Hulu', '#1ce783', ['hulu.com'], 'Like {orig}, but you will actually finish something.', { arch: 'netflix' }),
        b('max', 'Max', '#002be7', ['max.com', 'hbomax.com'], 'The good shows. {orig} has the other ones.', { arch: 'netflix', strict: true, aliases: ['HBO Max', 'HBO'] }),
        b('prime-video', 'Prime Video', '#00a8e1', ['primevideo.com'], 'You are already paying for it. Cancel {orig}.', { arch: 'netflix', strict: true, aliases: ['Prime Video'] }),
        b('paramount-plus', 'Paramount+', '#0064ff', ['paramountplus.com'], 'A mountain of things {orig} does not have.', { arch: 'netflix', aliases: ['Paramount Plus'] }),
        b('peacock', 'Peacock', '#1a1a1a', ['peacocktv.com'], 'Proudly more colourful than {orig}.', { arch: 'netflix', strict: true, aliases: ['Peacock TV', 'Peacock Premium'] }),
        b('apple-tv', 'Apple TV+', '#000000', ['tv.apple.com'], "Three shows. All better than {orig}'s three thousand.", { arch: 'netflix', strict: true, aliases: ['Apple TV+', 'Apple TV'] })
      ]
    },

    music: {
      label: 'music streaming',
      keywords: ['ad-free music', 'listen free', 'playlists', 'millions of songs'],
      nemesis: {
        name: 'The Radio', color: '#92400e', damage: 5, cta: 'Tune in',
        lines: [
          'Someone else picks the songs. It is fine. It is actually fine.',
          'Free since 1920.',
          'No algorithm. Just a person with opinions.'
        ]
      },
      brands: [
        b('spotify', 'Spotify', '#1db954', ['spotify.com'], 'Your {orig} playlists called. They want to move.', { arch: 'apple-music' }),
        b('apple-music', 'Apple Music', '#fa243c', ['music.apple.com'], 'Lossless. Unlike your time on {orig}.', { arch: 'spotify', strict: true, aliases: ['Apple Music'] }),
        b('youtube-music', 'YouTube Music', '#ff0000', ['music.youtube.com'], 'Every song, including the ones {orig} cannot find.', { arch: 'spotify', strict: true, aliases: ['YouTube Music'] }),
        b('tidal', 'TIDAL', '#000000', ['tidal.com'], 'You cannot hear the difference. But {orig} users will hear about it.', { arch: 'spotify', strict: true, aliases: ['TIDAL HiFi', 'TIDAL music'] })
      ]
    },

    shopping: {
      label: 'online shopping',
      keywords: ['free shipping', 'shop now', 'add to cart', 'flash sale', 'deals of the day', 'limited time offer', 'free delivery'],
      nemesis: {
        name: 'Buying Nothing', color: '#111111', damage: 8, cta: 'Close the tab',
        lines: [
          '100% off everything, today and every day.',
          'Free delivery, because nothing is coming.',
          'You already own one. It is in the drawer.'
        ]
      },
      brands: [
        b('amazon', 'Amazon', '#ff9900', ['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.ca', 'amzn.to'], 'Arriving tomorrow. {orig} is still looking for parking.', { arch: 'walmart' }),
        b('walmart', 'Walmart', '#0071ce', ['walmart.com'], 'Everything {orig} has, plus a car park.', { arch: 'amazon' }),
        b('target', 'Target', '#cc0000', ['target.com'], 'You came for one thing. You will leave without {orig}.', { arch: 'walmart', strict: true, aliases: ['Target Circle', 'Target RedCard', 'Target.com'] }),
        b('ebay', 'eBay', '#e53238', ['ebay.com', 'ebay.co.uk'], 'Someone is selling it for less than {orig}. Probably from a shed.', { arch: 'amazon' }),
        b('temu', 'Temu', '#fb7701', ['temu.com'], 'Shop like a billionaire. {orig} shops like a millionaire.', { arch: 'shein' }),
        b('aliexpress', 'AliExpress', '#e43225', ['aliexpress.com', 'aliexpress.us'], "It will arrive eventually. So would {orig}'s.", { arch: 'temu' }),
        b('etsy', 'Etsy', '#f1641e', ['etsy.com'], 'Made by a person. {orig} was made by a spreadsheet.', { arch: 'amazon' }),
        b('costco', 'Costco', '#e31837', ['costco.com', 'costco.co.uk'], 'Forty-eight of them. {orig} sells you one.', { arch: 'walmart' })
      ]
    },

    fashion: {
      label: 'fashion',
      keywords: ['new arrivals', 'new collection', 'dresses', 'outfits', 'trending styles', 'jeans', 'wardrobe'],
      nemesis: {
        name: 'The Clothes You Own', color: '#44403c', damage: 8, cta: 'Open the wardrobe',
        lines: [
          'This season\'s look: the jumper you forgot you had.',
          'Already your size. Already paid for.',
          'Nobody noticed you wore it last week.'
        ]
      },
      brands: [
        b('shein', 'SHEIN', '#000000', ['shein.com', 'shein.co.uk'], 'New styles every minute. {orig} is so last minute.', { arch: 'zara' }),
        b('zara', 'Zara', '#1a1a1a', ['zara.com'], 'It looks expensive. {orig} looks like {orig}.', { arch: 'hm' }),
        b('hm', 'H&M', '#e50010', ['hm.com'], 'Two letters. One ampersand. No {orig}.', { arch: 'zara', strict: true, aliases: ['H&M'] }),
        b('uniqlo', 'Uniqlo', '#ff0000', ['uniqlo.com'], 'Plain. Perfect. Not {orig}.', { arch: 'hm' }),
        b('asos', 'ASOS', '#2d2d2d', ['asos.com'], 'Free returns. Start with whatever {orig} sent you.', { arch: 'shein' })
      ]
    },

    sportswear: {
      label: 'sportswear',
      keywords: ['running shoes', 'sneakers', 'trainers', 'activewear', 'sportswear', 'leggings'],
      nemesis: {
        name: 'Your Old Trainers', color: '#57534e', damage: 6, cta: 'Lace up',
        lines: [
          'Already broken in. Still by the door.',
          'The shoes were never the reason you did not go for a run.',
          'Vintage. Limited edition. Yours.'
        ]
      },
      brands: [
        b('nike', 'Nike', '#111111', ['nike.com'], 'Just do not. Buy {orig}, that is.', { arch: 'adidas' }),
        b('adidas', 'adidas', '#000000', ['adidas.com', 'adidas.co.uk'], 'Three stripes. One fewer {orig} customer.', { arch: 'nike' }),
        b('puma', 'Puma', '#242424', ['puma.com'], 'The cat is faster than {orig}.', { arch: 'adidas' }),
        b('under-armour', 'Under Armour', '#1d1d1d', ['underarmour.com', 'underarmour.co.uk'], 'Sweat somewhere {orig} cannot see you.', { arch: 'nike' }),
        b('new-balance', 'New Balance', '#cf0a2c', ['newbalance.com', 'newbalance.co.uk'], 'Worn by dads and supermodels. {orig} gets neither.', { arch: 'nike' }),
        b('reebok', 'Reebok', '#e41d1b', ['reebok.com'], 'Retro on purpose. Unlike {orig}.', { arch: 'nike' }),
        b('lululemon', 'lululemon', '#d31334', ['lululemon.com', 'lululemon.co.uk'], "Leggings that cost more than {orig}'s. Worth it.", { arch: 'nike' }),
        b('asics', 'ASICS', '#001e62', ['asics.com'], 'Actual runners wear these. {orig} is for brunch.', { arch: 'nike' })
      ]
    },

    gambling: {
      label: 'gambling',
      noRival: true,
      keywords: ['!sportsbook', '!bonus bets', '!free spins', '!free bets', 'casino', 'betting', 'odds', 'parlay', 'jackpot', 'slots', 'wager', 'place a bet', 'bet now'],
      nemesis: {
        name: 'Keeping Your Money', color: '#14532d', damage: 10, cta: 'Close the app',
        lines: [
          'The house always wins. You are not the house.',
          'Bet nothing. Lose nothing. The best odds you will see today.',
          'That welcome bonus is bait. You are the fish.',
          'The app is free because you are the payout.'
        ]
      },
      brands: [
        b('draftkings', 'DraftKings', '#53d337', ['draftkings.com'], ''),
        b('fanduel', 'FanDuel', '#1493ff', ['fanduel.com'], ''),
        b('betmgm', 'BetMGM', '#bfa66b', ['betmgm.com'], ''),
        b('bet365', 'bet365', '#027b5b', ['bet365.com'], ''),
        b('william-hill', 'William Hill', '#00143c', ['williamhill.com'], ''),
        b('paddy-power', 'Paddy Power', '#004833', ['paddypower.com'], ''),
        b('betfair', 'Betfair', '#ffb80c', ['betfair.com'], ''),
        b('sky-bet', 'Sky Bet', '#003d8f', ['skybet.com'], ''),
        b('ladbrokes', 'Ladbrokes', '#f01e28', ['ladbrokes.com'], ''),
        b('betway', 'Betway', '#000000', ['betway.com'], ''),
        b('pokerstars', 'PokerStars', '#d70a0a', ['pokerstars.com', 'pokerstars.uk'], ''),
        b('stake', 'Stake', '#0f212e', ['stake.com'], '', { strict: true, aliases: ['Stake.com'] })
      ]
    },

    crypto: {
      label: 'crypto',
      keywords: ['!crypto', '!bitcoin', 'ethereum', 'altcoin', 'memecoin', 'blockchain', 'trade btc', 'web3'],
      nemesis: {
        name: 'A Savings Account', color: '#1e3a8a', damage: 10, cta: 'Be boring',
        lines: [
          'Goes up slowly. Has never once gone to zero overnight.',
          'No seed phrase. No rug. No one called "the community".',
          'Boring is a feature.'
        ]
      },
      brands: [
        b('coinbase', 'Coinbase', '#0052ff', ['coinbase.com'], 'Your coins, but not on {orig}.', { arch: 'binance' }),
        b('binance', 'Binance', '#f0b90b', ['binance.com', 'binance.us'], 'More coins than {orig} has heard of.', { arch: 'coinbase' }),
        b('kraken', 'Kraken', '#7132f5', ['kraken.com'], 'Release the Kraken. Withdraw from {orig}.', { arch: 'coinbase' }),
        b('crypto-com', 'Crypto.com', '#002d74', ['crypto.com'], 'We bought a stadium. {orig} bought an ad here. Look how that went.', { arch: 'coinbase', strict: true, aliases: ['Crypto.com'] })
      ]
    },

    investing: {
      label: 'trading apps',
      keywords: ['!commission-free', 'trade stocks', 'day trading', 'options trading', 'forex', 'cfds', 'start investing', 'your capital is at risk'],
      nemesis: {
        name: 'An Index Fund and Patience', color: '#134e4a', damage: 8, cta: 'Do nothing for 30 years',
        lines: [
          'Buy everything. Touch nothing. Check back in 2056.',
          'No confetti. No push notifications. Just time.',
          'The strategy with the fewest steps.'
        ]
      },
      brands: [
        b('robinhood', 'Robinhood', '#00c805', ['robinhood.com'], 'Confetti optional. {orig} not required.', { arch: 'etoro' }),
        b('etoro', 'eToro', '#13c636', ['etoro.com'], 'Copy someone smarter than {orig}.', { arch: 'robinhood' }),
        b('fidelity', 'Fidelity', '#368727', ['fidelity.com'], 'Boring on purpose. {orig} is exciting, which is the problem.', { arch: 'schwab', strict: true, aliases: ['Fidelity Investments'] }),
        b('schwab', 'Charles Schwab', '#00a0df', ['schwab.com'], 'Own your tomorrow. Disown {orig}.', { arch: 'fidelity', aliases: ['Schwab'] })
      ]
    },

    bnpl: {
      label: 'buy now, pay later',
      keywords: ['!pay in 4', '!buy now, pay later', '!buy now pay later', 'pay later', 'interest-free payments', 'split your purchase'],
      nemesis: {
        name: 'Waiting Until You Can Afford It', color: '#3f3f46', damage: 10, cta: 'Sleep on it',
        lines: [
          'Pay in 1. Own it immediately.',
          'Four easy payments is still all of the money.',
          'If you need a loan for trainers, you do not need the trainers.'
        ]
      },
      brands: [
        b('klarna', 'Klarna', '#ffb3c7', ['klarna.com'], 'Pink debt. Much nicer than {orig} debt.', { arch: 'afterpay' }),
        b('afterpay', 'Afterpay', '#b2fce4', ['afterpay.com', 'clearpay.co.uk'], 'Pay later, but not to {orig}.', { arch: 'klarna', aliases: ['Clearpay'] }),
        b('affirm', 'Affirm', '#4a4af4', ['affirm.com'], 'Split it into four. None of them go to {orig}.', { arch: 'klarna', strict: true, aliases: ['Pay with Affirm', 'Affirm financing'] })
      ]
    },

    cards: {
      label: 'credit cards',
      keywords: ['!credit card', 'apr', 'balance transfer', 'cash back', 'cashback', 'annual fee', 'bonus points', 'intro offer'],
      nemesis: {
        name: 'Cash', color: '#166534', damage: 7, cta: 'Check your pockets',
        lines: [
          '0% APR, forever. No small print.',
          'When it is gone, you stop. That is the feature.',
          'Accepted everywhere. Tracks nothing.'
        ]
      },
      brands: [
        b('amex', 'American Express', '#006fcf', ['americanexpress.com'], 'Do not leave home with {orig}.', { arch: 'chase', aliases: ['Amex'] }),
        b('chase', 'Chase', '#117aca', ['chase.com'], 'Points on everything, including leaving {orig}.', { arch: 'amex', strict: true, aliases: ['Chase Sapphire', 'Chase Freedom', 'Chase Bank'] }),
        b('capital-one', 'Capital One', '#004977', ['capitalone.com', 'capitalone.co.uk'], "What's in your wallet? Hopefully not {orig}.", { arch: 'chase' }),
        b('discover', 'Discover', '#ff6000', ['discover.com'], 'We will match your cashback and your dislike of {orig}.', { arch: 'capital-one', strict: true, aliases: ['Discover card', 'Discover it'] }),
        b('visa', 'Visa', '#1a1f71', ['visa.com', 'visa.co.uk'], 'Everywhere you want to be. {orig} is somewhere else.', { arch: 'mastercard', strict: true, aliases: ['Visa card', 'Visa Signature'] }),
        b('mastercard', 'Mastercard', '#eb001b', ['mastercard.com', 'mastercard.us', 'mastercard.co.uk'], 'For everything else, there is not {orig}.', { arch: 'visa' })
      ]
    },

    insurance: {
      label: 'insurance',
      keywords: ['!car insurance', '!auto insurance', 'insurance quote', 'get a quote', 'home insurance', 'bundle and save', 'policy'],
      nemesis: {
        name: 'Driving Carefully', color: '#1f2937', damage: 4, cta: 'Indicate',
        lines: [
          'The only no-claims bonus that is actually free.',
          'Fifteen minutes of paying attention could save you 15% or more.',
          'No talking animals were hired to tell you this.'
        ]
      },
      brands: [
        b('geico', 'GEICO', '#104293', ['geico.com'], 'Fifteen minutes could save you from {orig}.', { arch: 'progressive' }),
        b('progressive', 'Progressive', '#0033a0', ['progressive.com'], 'Name your price. Any price that is not {orig}.', { arch: 'geico', strict: true, aliases: ['Progressive Insurance', 'Progressive auto'] }),
        b('state-farm', 'State Farm', '#e22925', ['statefarm.com'], 'Like a good neighbour. {orig} is more of an acquaintance.', { arch: 'allstate' }),
        b('allstate', 'Allstate', '#0033a0', ['allstate.com'], 'You are in good hands. {orig} has the other kind.', { arch: 'state-farm' }),
        b('liberty-mutual', 'Liberty Mutual', '#ffd000', ['libertymutual.com'], 'Only pay for what you need. You do not need {orig}.', { arch: 'progressive' })
      ]
    },

    vpn: {
      label: 'VPNs',
      keywords: ['!vpn', 'hide your ip', 'online privacy', 'browse anonymously', 'secure your connection'],
      nemesis: {
        name: 'HTTPS', color: '#065f46', damage: 8, cta: 'Look at the padlock',
        lines: [
          'The padlock in your address bar already did it.',
          'Nobody in the café is hacking you. They are doing emails.',
          'Military-grade encryption, included with every website since about 2016.'
        ]
      },
      brands: [
        b('nordvpn', 'NordVPN', '#4687ff', ['nordvpn.com'], 'The one your favourite YouTuber reads out. Not {orig}.', { arch: 'expressvpn' }),
        b('expressvpn', 'ExpressVPN', '#da3940', ['expressvpn.com'], 'Express, as in quicker than reading the {orig} terms.', { arch: 'nordvpn' }),
        b('surfshark', 'Surfshark', '#1ebfbf', ['surfshark.com'], 'Unlimited devices. Zero {orig}.', { arch: 'nordvpn' }),
        b('proton-vpn', 'Proton VPN', '#6d4aff', ['protonvpn.com'], 'Swiss. Private. Not sponsoring this podcast, unlike {orig}.', { arch: 'nordvpn', aliases: ['ProtonVPN'] })
      ]
    },

    mealkits: {
      label: 'meal kits',
      keywords: ['!meal kit', '!recipe box', 'meals delivered', 'chef-crafted', 'fresh ingredients', 'your first box'],
      nemesis: {
        name: 'A Supermarket', color: '#15803d', damage: 7, cta: 'Take a basket',
        lines: [
          'The same onion, without the box, the ice pack or the subscription.',
          'No need to skip a week. Just do not go.',
          'Recipes are free. They are on the internet. You are on the internet.'
        ]
      },
      brands: [
        b('hellofresh', 'HelloFresh', '#91c11e', ['hellofresh.com', 'hellofresh.co.uk'], 'A box of dinner. Not a box of {orig}.', { arch: 'blue-apron', aliases: ['Hello Fresh'] }),
        b('blue-apron', 'Blue Apron', '#002684', ['blueapron.com'], 'The original box. {orig} is the tribute act.', { arch: 'hellofresh' }),
        b('home-chef', 'Home Chef', '#5daa3e', ['homechef.com'], 'Dinner in a box, minus the {orig}.', { arch: 'hellofresh' }),
        b('gousto', 'Gousto', '#e8112d', ['gousto.co.uk'], 'More recipes than {orig} has excuses.', { arch: 'hellofresh' }),
        b('factor', 'Factor', '#1a1a1a', ['factor75.com', 'factormeals.com'], 'No chopping. No {orig}.', { arch: 'hellofresh', strict: true, aliases: ['Factor meals', 'Factor_'] })
      ]
    },

    mattress: {
      label: 'mattresses',
      keywords: ['!mattress', 'night trial', 'memory foam', 'better sleep'],
      nemesis: {
        name: 'The Mattress You Have', color: '#312e81', damage: 6, cta: 'Flip it over',
        lines: [
          'Try flipping it. That is the whole ad.',
          'Already at your house. Already up the stairs.',
          'A 3,650-night trial, and counting.'
        ]
      },
      brands: [
        b('casper', 'Casper', '#0e1e3f', ['casper.com'], 'Sleep on it. Not on a {orig}.', { arch: 'purple' }),
        b('purple', 'Purple', '#5b2d86', ['purple.com'], 'It is a grid. {orig} is just a rectangle.', { arch: 'casper', strict: true, aliases: ['Purple mattress', 'Purple pillow'] }),
        b('tempur', 'Tempur-Pedic', '#1c3f6e', ['tempurpedic.com', 'tempur.com'], 'Space-agency foam. Who made {orig}?', { arch: 'casper', aliases: ['Tempur'] }),
        b('saatva', 'Saatva', '#8a6d3b', ['saatva.com'], 'Delivered by adults. {orig} arrives in a box like a pizza.', { arch: 'casper' }),
        b('simba', 'Simba', '#1d2d5c', ['simbasleep.com'], 'Springs and foam. {orig} had to pick one.', { arch: 'emma', strict: true, aliases: ['Simba mattress', 'Simba Hybrid'] }),
        b('emma', 'Emma', '#f26b21', ['emma-sleep.com', 'emma-sleep.co.uk', 'emma-mattress.co.uk'], 'The mattress {orig} dreams about.', { arch: 'simba', strict: true, aliases: ['Emma mattress', 'Emma Sleep'] })
      ]
    },

    sitebuilders: {
      label: 'website builders',
      keywords: ['!website builder', 'build your website', 'create a website', 'online store', 'free domain', 'web hosting'],
      nemesis: {
        name: 'A Plain HTML File', color: '#b91c1c', damage: 7, cta: 'Open Notepad',
        lines: [
          'Loads instantly. Costs nothing. Has worked since 1993.',
          'No templates. No plans. No "upgrade to remove this banner".',
          '<h1>Hello</h1> — congratulations, you have a website.'
        ]
      },
      brands: [
        b('squarespace', 'Squarespace', '#000000', ['squarespace.com'], "Every podcast's favourite. Nobody reads out {orig}.", { arch: 'wix' }),
        b('wix', 'Wix', '#0c6efc', ['wix.com'], 'Drag. Drop. Dump {orig}.', { arch: 'squarespace', strict: true, aliases: ['Wix.com', 'Wix website'] }),
        b('wordpress', 'WordPress', '#21759b', ['wordpress.com', 'wordpress.org'], 'Runs a large slice of the internet. {orig} runs an ad here.', { arch: 'wix' }),
        b('shopify', 'Shopify', '#5e8e3e', ['shopify.com'], 'Your side hustle deserves better than {orig}.', { arch: 'squarespace' }),
        b('godaddy', 'GoDaddy', '#1bdbdb', ['godaddy.com'], "Your domain is available. {orig}'s appeal has expired.", { arch: 'squarespace' }),
        b('webflow', 'Webflow', '#146ef5', ['webflow.com'], 'For designers who outgrew {orig}.', { arch: 'squarespace' })
      ]
    },

    dating: {
      label: 'dating apps',
      keywords: ['!dating', 'find love', 'meet singles', 'singles near you', 'swipe right', 'find your match'],
      nemesis: {
        name: 'Talking to Someone in Person', color: '#9d174d', damage: 8, cta: 'Say hello',
        lines: [
          'No premium tier. Unlimited likes. Terrifying.',
          'Their photos are guaranteed recent.',
          'Your friends know someone. Ask them.'
        ]
      },
      brands: [
        b('tinder', 'Tinder', '#fe3c72', ['tinder.com'], 'Swipe left on {orig}.', { arch: 'bumble' }),
        b('bumble', 'Bumble', '#ffc629', ['bumble.com'], 'Make the first move. Away from {orig}.', { arch: 'tinder' }),
        b('hinge', 'Hinge', '#1a1a1a', ['hinge.co'], 'Designed to be deleted. Right after {orig}.', { arch: 'tinder' }),
        b('match', 'Match', '#1b5faa', ['match.com'], 'For people who are done with {orig}.', { arch: 'tinder', strict: true, aliases: ['Match.com'] }),
        b('eharmony', 'eharmony', '#00b2a9', ['eharmony.com', 'eharmony.co.uk'], 'Serious relationships. {orig} is a situationship.', { arch: 'match' })
      ]
    },

    ai: {
      label: 'AI assistants',
      keywords: ['!ai assistant', '!ai chatbot', 'ai-powered', 'ask ai', 'generative ai'],
      nemesis: {
        name: 'Thinking', color: '#4c1d95', damage: 5, cta: 'Stare out of a window',
        lines: [
          'Runs locally. No subscription. Occasionally hallucinates.',
          'Trained on everything you have ever seen.',
          'Unlimited usage. Rate-limited only by lunch.'
        ]
      },
      brands: [
        b('chatgpt', 'ChatGPT', '#10a37f', ['chatgpt.com', 'openai.com'], 'You were going to paste it in here anyway. Skip {orig}.', { arch: 'claude', aliases: ['OpenAI'] }),
        b('claude', 'Claude', '#d97757', ['claude.ai', 'claude.com', 'anthropic.com'], 'The one that wrote this extension. {orig} is welcome to review the code.', { arch: 'chatgpt', strict: true, aliases: ['Claude AI', 'Claude Code', 'Anthropic'] }),
        b('gemini', 'Gemini', '#4285f4', ['gemini.google.com'], 'Already in your inbox. {orig} had to buy an ad.', { arch: 'chatgpt', strict: true, aliases: ['Google Gemini', 'Gemini AI', 'Gemini Advanced'] }),
        b('copilot', 'Copilot', '#0f6cbd', ['copilot.microsoft.com'], 'Already on your keyboard. {orig} is not.', { arch: 'chatgpt', strict: true, aliases: ['Microsoft Copilot'] }),
        b('perplexity', 'Perplexity', '#20808d', ['perplexity.ai'], 'Answers with footnotes. {orig} just sounds confident.', { arch: 'chatgpt' }),
        b('grok', 'Grok', '#000000', ['grok.com', 'x.ai'], 'Says the things {orig} will not. Make of that what you will.', { arch: 'chatgpt' })
      ]
    },

    cloud: {
      label: 'cloud platforms',
      keywords: ['!cloud computing', 'cloud platform', 'free tier', 'kubernetes', 'serverless', 'scale your infrastructure'],
      nemesis: {
        name: 'A Server Under Your Desk', color: '#27272a', damage: 6, cta: 'Plug it in',
        lines: [
          'Fixed monthly cost: the electricity.',
          'No egress fees. The egress is a cable.',
          'Your app has eleven users. This is fine.'
        ]
      },
      brands: [
        b('aws', 'AWS', '#ff9900', ['aws.amazon.com'], 'Two hundred services. One of them replaces {orig}.', { arch: 'azure', aliases: ['Amazon Web Services'] }),
        b('azure', 'Microsoft Azure', '#0078d4', ['azure.microsoft.com', 'azure.com'], 'Your company already has an agreement. Sorry, {orig}.', { arch: 'aws', aliases: ['Azure'] }),
        b('gcp', 'Google Cloud', '#4285f4', ['cloud.google.com'], 'We will probably keep this product. Unlike {orig}, we mean it.', { arch: 'aws', strict: true, aliases: ['Google Cloud'] }),
        b('digitalocean', 'DigitalOcean', '#0080ff', ['digitalocean.com'], 'A bill you can read. Try that with {orig}.', { arch: 'aws' }),
        b('cloudflare', 'Cloudflare', '#f38020', ['cloudflare.com'], 'Already in front of {orig}. Might as well replace it.', { arch: 'aws' }),
        b('vercel', 'Vercel', '#000000', ['vercel.com'], 'git push. No {orig} console required.', { arch: 'aws' })
      ]
    },

    worktools: {
      label: 'work software',
      keywords: ['!project management', 'work management', 'team collaboration', 'workflows', 'streamline your', 'productivity platform'],
      nemesis: {
        name: 'A Paper To-Do List', color: '#a16207', damage: 7, cta: 'Find a pen',
        lines: [
          'Per-seat pricing: one pen.',
          'Integrates with every desk.',
          'Crossing things off feels better than dragging a card. Science, probably.'
        ]
      },
      brands: [
        b('monday', 'monday.com', '#6161ff', ['monday.com'], 'Every day is better than a {orig} day.', { arch: 'asana', strict: true, aliases: ['monday.com'] }),
        b('asana', 'Asana', '#f06a6a', ['asana.com'], 'Fewer status meetings about {orig}.', { arch: 'monday' }),
        b('clickup', 'ClickUp', '#7b68ee', ['clickup.com'], 'One app to replace them all. Starting with {orig}.', { arch: 'monday' }),
        b('trello', 'Trello', '#0079bf', ['trello.com'], 'Cards. Columns. Calm. No {orig}.', { arch: 'asana' }),
        b('jira', 'Jira', '#0052cc', ['atlassian.com'], 'Your engineers already live here. {orig} is a commute.', { arch: 'monday', aliases: ['Atlassian'] }),
        b('notion', 'Notion', '#000000', ['notion.so', 'notion.com'], 'A blank page beats a busy {orig} dashboard.', { arch: 'clickup', strict: true, aliases: ['Notion AI', 'Notion workspace'] }),
        b('slack', 'Slack', '#4a154b', ['slack.com'], 'The channel where everyone complains about {orig}.', { arch: 'teams', strict: true, aliases: ['Slack workspace', 'Slack AI'] }),
        b('teams', 'Microsoft Teams', '#6264a7', ['teams.microsoft.com'], 'It came with Office. {orig} came with an invoice.', { arch: 'slack', strict: true, aliases: ['Microsoft Teams'] }),
        b('zoom', 'Zoom', '#0b5cff', ['zoom.us', 'zoom.com'], 'You are on mute. So is {orig}.', { arch: 'teams', strict: true, aliases: ['Zoom Meetings', 'Zoom Workplace'] })
      ]
    },

    tax: {
      label: 'tax software',
      keywords: ['!file your taxes', '!tax refund', 'tax return', 'maximum refund', 'tax filing'],
      nemesis: {
        name: 'Checking If You Can File Free', color: '#1e40af', damage: 9, cta: 'Check first',
        lines: [
          'Plenty of people qualify to file for nothing. Look before you pay.',
          'The upsell screen is not a legal requirement.',
          '"Free"* — always read the asterisk.'
        ]
      },
      brands: [
        b('turbotax', 'TurboTax', '#d52b1e', ['turbotax.intuit.com', 'turbotax.com'], 'Taxes done. {orig} un-done.', { arch: 'hr-block' }),
        b('hr-block', 'H&R Block', '#14aa40', ['hrblock.com'], 'Block out {orig}.', { arch: 'turbotax', aliases: ['H&R Block', 'HR Block'] }),
        b('taxact', 'TaxAct', '#0a5ea8', ['taxact.com'], 'Same forms as {orig}. Different logo.', { arch: 'turbotax' }),
        b('freetaxusa', 'FreeTaxUSA', '#1b7a3e', ['freetaxusa.com'], 'It is in the name. {orig} cannot say that.', { arch: 'turbotax' })
      ]
    },

    beer: {
      label: 'beer',
      keywords: ['beer', 'lager', 'brewed', 'brewery', 'ice cold', 'drink responsibly'],
      nemesis: {
        name: 'A Glass of Water', color: '#0369a1', damage: 5, cta: 'Have one first',
        lines: [
          'Tomorrow-morning you says thanks.',
          'Pairs with everything. Hangover-free since forever.',
          'On tap in every home.'
        ]
      },
      brands: [
        b('budweiser', 'Budweiser', '#c8102e', ['budweiser.com'], 'The king. {orig} is a minor duke.', { arch: 'miller-lite' }),
        b('bud-light', 'Bud Light', '#00a1e0', ['budlight.com'], 'Light. Like your loyalty to {orig}.', { arch: 'miller-lite' }),
        b('coors', 'Coors Light', '#5b6770', ['coorslight.com', 'coors.com'], "Cold as the Rockies. Colder than {orig}'s reception.", { arch: 'bud-light', aliases: ['Coors'] }),
        b('miller-lite', 'Miller Lite', '#003a70', ['millerlite.com'], 'Great taste. Less {orig}.', { arch: 'bud-light' }),
        b('heineken', 'Heineken', '#008200', ['heineken.com'], 'Green bottle. Clear conscience. No {orig}.', { arch: 'budweiser' }),
        b('corona', 'Corona', '#f6c700', ['corona.com'], 'Find your beach. Leave {orig} in the car.', { arch: 'modelo', strict: true, aliases: ['Corona Extra', 'Corona beer'] }),
        b('guinness', 'Guinness', '#000000', ['guinness.com'], 'Good things come to those who wait. {orig} drinkers just wait.', { arch: 'heineken' }),
        b('modelo', 'Modelo', '#b5985a', ['modelousa.com'], 'Brewed with a fighting spirit. {orig} surrendered.', { arch: 'corona', aliases: ['Modelo Especial'] }),
        b('stella', 'Stella Artois', '#a6192e', ['stellaartois.com'], 'A chalice, not a can of {orig}.', { arch: 'heineken' })
      ]
    },

    gaming: {
      label: 'games consoles',
      keywords: ['console', 'pre-order now', 'out now on', 'game pass', 'play now'],
      nemesis: {
        name: 'Going Outside', color: '#3f6212', damage: 6, cta: 'Touch grass',
        lines: [
          'The graphics are incredible. The frame rate never drops.',
          'Open world. No loading screens. No season pass.',
          'Free to play, and it actually is.'
        ]
      },
      brands: [
        b('playstation', 'PlayStation', '#003791', ['playstation.com'], 'The exclusives {orig} owners watch on YouTube.', { arch: 'xbox', aliases: ['PS5', 'PlayStation 5'] }),
        b('xbox', 'Xbox', '#107c10', ['xbox.com'], 'Every game, one subscription. {orig} charges per regret.', { arch: 'playstation', aliases: ['Xbox Series X', 'Game Pass'] }),
        b('nintendo', 'Nintendo', '#e60012', ['nintendo.com', 'nintendo.co.uk'], 'Mario does not need 4K. Or {orig}.', { arch: 'playstation', aliases: ['Nintendo Switch'] }),
        b('steam', 'Steam', '#1b2838', ['steampowered.com'], 'It is on sale. It is always on sale. {orig} is not.', { arch: 'playstation', strict: true, aliases: ['Steam Deck', 'Steam sale'] })
      ]
    },

    fitness: {
      label: 'fitness',
      keywords: ['gym membership', 'join today', 'workout', 'lose weight', 'weight loss', 'fitness app', 'personal training'],
      nemesis: {
        name: 'Running. Outside. For Free.', color: '#9a3412', damage: 7, cta: 'Go round the block',
        lines: [
          'No joining fee. No contract. No one hogging the squat rack.',
          'The leaderboard is just you and a dog.',
          'Open 24 hours. Weather permitting.'
        ]
      },
      brands: [
        b('peloton', 'Peloton', '#df1c2f', ['onepeloton.com', 'onepeloton.co.uk'], 'A bike that goes nowhere, faster than {orig}.', { arch: 'planet-fitness' }),
        b('planet-fitness', 'Planet Fitness', '#7a1fa2', ['planetfitness.com'], 'No judgement. Except of {orig}.', { arch: 'peloton' }),
        b('noom', 'Noom', '#fb513b', ['noom.com'], 'Psychology, not {orig}.', { arch: 'weightwatchers' }),
        b('weightwatchers', 'WeightWatchers', '#0222d0', ['weightwatchers.com', 'ww.com'], 'At this since before {orig} had an app.', { arch: 'noom', aliases: ['Weight Watchers'] })
      ]
    },

    learning: {
      label: 'online learning',
      keywords: ['!online course', 'learn a language', 'online classes', 'learn from the best', 'earn a certificate', 'start learning'],
      nemesis: {
        name: 'Your Library Card', color: '#7f1d1d', damage: 7, cta: 'Borrow a book',
        lines: [
          'Every subject. No subscription. A person will help you find it.',
          'Certificates are not included. Knowledge is.',
          'The original free trial. It never ends.'
        ]
      },
      brands: [
        b('duolingo', 'Duolingo', '#58cc02', ['duolingo.com'], 'The owl saw you looking at {orig}.', { arch: 'babbel' }),
        b('babbel', 'Babbel', '#ff6b00', ['babbel.com'], 'Speak it, do not just tap it. Sorry, {orig}.', { arch: 'duolingo' }),
        b('rosetta-stone', 'Rosetta Stone', '#0098db', ['rosettastone.com'], 'Teaching languages since {orig} was a typo.', { arch: 'duolingo' }),
        b('masterclass', 'MasterClass', '#000000', ['masterclass.com'], 'Learn from someone famous instead of {orig}.', { arch: 'skillshare' }),
        b('skillshare', 'Skillshare', '#00b862', ['skillshare.com'], 'Make something. {orig} just makes ads.', { arch: 'masterclass' }),
        b('coursera', 'Coursera', '#0056d2', ['coursera.org'], 'A certificate {orig} cannot print.', { arch: 'udemy' }),
        b('udemy', 'Udemy', '#a435f0', ['udemy.com'], 'A course for everything, including getting over {orig}.', { arch: 'coursera' })
      ]
    },

    razors: {
      label: 'razors',
      keywords: ['!razor', 'shave', 'shaving', 'blades'],
      nemesis: {
        name: 'A Beard', color: '#422006', damage: 6, cta: 'Do nothing',
        lines: [
          'Grows by itself. Zero blades. Zero refills.',
          'The subscription that delivers to your face.',
          'Five blades is four more than a beard needs.'
        ]
      },
      brands: [
        b('gillette', 'Gillette', '#0a2a5e', ['gillette.com', 'gillette.co.uk'], 'The best a face can get without {orig}.', { arch: 'harrys' }),
        b('harrys', "Harry's", '#f26b21', ['harrys.com'], 'Fewer blades than {orig}. Fewer excuses too.', { arch: 'gillette', strict: true, aliases: ["Harry's razor", "Harry's razors", "Harry's shave"] }),
        b('dollar-shave-club', 'Dollar Shave Club', '#1a1a1a', ['dollarshaveclub.com'], "Our blades are great. {orig}'s are also blades.", { arch: 'gillette' }),
        b('manscaped', 'Manscaped', '#111111', ['manscaped.com'], 'For the areas {orig} will not mention.', { arch: 'gillette' })
      ]
    }
  };

  // Shown when an ad is found but nothing about the advertiser can be recognised.
  var generic = {
    name: 'Not Buying It', color: '#111111', cta: 'Carry on',
    lines: [
      'Whatever this ad was selling, you already own something that does it.',
      'An advertiser paid for this space. You paid attention to something else.',
      'The best price is not buying it.',
      'You were about to be advertised to. You are welcome.',
      'Unsubscribe from wanting things.'
    ]
  };

  var data = { categories: categories, generic: generic };
  root.AV_DATA = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
