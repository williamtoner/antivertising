# Antivertising

An ad "blocker" that doesn't block. It replaces each ad with the one its advertiser would least like you to see.

A Pepsi ad becomes a Coke ad. A sportsbook ad becomes an ad for keeping your money. An ad for a car nobody named becomes an ad for the bus.

![The demo page after Antivertising has been at it](docs/demo.png)

## Try it

1. Open `chrome://extensions`, switch on **Developer mode**, click **Load unpacked** and pick the `extension/` folder. (Works in Chrome, Edge, Brave and other Chromium browsers; not Firefox yet.)
2. Start the demo page, which is a fake newspaper full of fake ads:

   ```bash
   python3 -m http.server 8377 --bind 127.0.0.1 --directory demo
   ```

3. Open <http://localhost:8377/>. Each slot is labelled with what it should turn into.

Then browse normally. The toolbar badge counts swaps on the current page, and the popup keeps score.

## How it decides

For every ad slot it finds, the extension:

1. **Works out who paid.** It reads the ad's link targets (including landing pages buried inside click-tracker URLs like `...doubleclick.net/click?adurl=https%3A%2F%2Fpepsi.com`) and its visible text, and matches them against the brand database. A distinctive brand is recognised on any country's domain (`ikea.com`, `ikea.jp`), and names are matched in Japanese as well as English. If no brand matches, ad copy can still give away the category ("lease", "test drive", "SUV" is a car ad).
2. **Picks the most damaging replacement.** Every option has a damage score from 1 to 10:
   - the **arch-rival** scores 9 (the sale goes straight to the competitor they fear most)
   - any **other rival** in the category scores 7
   - the category's **nemesis**, the thing that makes the whole industry unnecessary, has its own score: tap water is a 6 against soft drinks, a savings account is a 10 against crypto.

   *Max damage* mode takes the highest score. *Rival* and *Nemesis* modes force one or the other.
3. **Swaps it in**, at exactly the size and position of the original.

Ads it finds but can't identify get a generic anti-consumption heckle after about five seconds (this can be switched off). If it can at least read where the ad leads, the heckle names the site: "Whatever bonprix.nl is selling, you already own something that does it."

Slots that only link back to the site you are on are the publisher promoting itself, not paid ads, and are left alone.

The damage scores are editorial judgement, not measurement. Nobody has run the study.

### House rules

- **Gambling ads never become other gambling ads**, in any mode. They always get the nemesis. The same goes for lenders and cosmetic clinics.
- Every card carries a corner flag saying what it replaced. Hover it for the disclaimer, click it to get the original ad back.
- Nothing leaves your browser. There is no server, no analytics, no affiliate links. Rival cards link to the rival's ordinary homepage. The ad log (below) is a file you save yourself.
- The counter-ads are original parody written for this project. They are not real ads, and no brand named here has endorsed, paid for, or been consulted about any of it.

## The ad log

Every swap is recorded in the browser: the site it happened on (hostname only), the ad's size, where it led, the other sites and the first 400 characters of text found in it, what it was matched to, and what replaced it. **Export** in the popup saves the lot as `antivertising-log-<date>.json`; **Clear** empties it; the checkbox above switches logging off. The log holds the most recent 20,000 ads.

It exists so the brand list can be grown from evidence: the entries with `"kind": "generic"` are exactly the advertisers the extension failed to recognise.

## Adding brands

There are about 1,500 brands across 59 categories, weighted towards the United States and Japan. The 220 in [extension/src/data.js](extension/src/data.js) each have a hand-written pitch and look like this:

```js
b('pepsi', 'Pepsi', '#004b93', ['pepsi.com', 'pepsi.co.uk'],
  'Someone paid for a {orig} ad here. Have a Pepsi instead.',
  { arch: 'coca-cola' })
```

That is: id, display name, card colour, landing domains, the pitch used when this brand replaces someone else (`{orig}` becomes the victim's name), and options. `strict: true` stops an ambiguous name like "Target" or "Max" from matching in ad text or on other countries' domains; `aliases` adds unambiguous ones.

The rest are one row each in [data-more.js](extension/src/data-more.js) (more brands for existing categories) and [data-new.js](extension/src/data-new.js) (new categories), and share a set of stock pitches:

```js
x('yoshinoya', 'Yoshinoya', '#f39800', 'yoshinoya.com yoshinoyaamerica.com', 'sukiya', '吉野家')
```

That is: id, name, colour, domains, arch-rival, aliases, and an optional final `1` for strict. Japanese aliases match as substrings, so avoid short katakana that occurs inside ordinary words.

Run the tests after editing. They check the database for duplicate domains and names, missing arch-rivals and brands that could be replaced by themselves.

## Tests

```bash
node test/engine.test.js
```

covers advertiser identification and counter-ad selection, with no dependencies.

```bash
python3 test/e2e.py
```

loads the extension into headless Chromium, opens the demo page and checks every slot. It needs `pip install playwright && playwright install chromium`.

To see what the extension makes of ads on a real page, open the service worker console from `chrome://extensions` and run `chrome.storage.local.set({ debug: true })`. Every look at every slot is then logged to the page's console: its size, the links and text found, and what they matched.

## How it works inside

| File | Job |
| --- | --- |
| `src/data.js` | The rivalry database and all the copy. |
| `src/data-more.js`, `src/data-new.js` | The long list: one row per brand. |
| `src/engine.js` | `identify()` and `pickCounter()`. Pure functions, no DOM. |
| `src/content.js` | Top frame only. Finds slots, asks who the advertiser is, swaps. |
| `src/collector.js` | Every frame. Reports its own links and text when asked. |
| `src/background.js` | Relays between frames, keeps score and the ad log. |
| `src/card.js` | Draws the counter-ad in a closed shadow root. |

The awkward part is that real ads live inside cross-origin iframes, often several deep, which the page cannot read, and no API tells a content script which Chrome frame belongs to which `<iframe>` element. So each frame under the top one makes up a one-off token and posts it to its parent, which can see which element the message came from. To read an ad, the top frame gives that token to the background worker, which asks every frame in the tab whose it is; the owner's answer reveals the frame id, and the worker then asks that frame and every frame nested inside it what the ad links to. Those answers travel over the extension's private message channel, never through the page.

The handshake runs child-to-parent because ad scripts build their frames with `document.open()`, which removes every DOM event listener inside the frame. A listener waiting there for a token from the parent is silently deleted; the first version worked that way and got nothing back from most real ads.

## Known limits

- **Slot detection is conservative.** It recognises the containers the big networks use (AdSense, Google Ad Manager, Amazon, Taboola, Outbrain and common exchange iframes). It does not guess at `.ad` class names, because a false positive would eat real page content. Sites with home-grown ad markup are missed.
- **No video ads.** YouTube pre-rolls and the like are untouched.
- **Identification needs something to read.** A large share of real display ads are a picture whose click goes through an opaque redirect (`doubleclick.net/pcs/click?xai=...`), with no text and no stated destination. Those give no clues and get the generic heckle; only reading the image itself would identify them.
- **The long tail is long.** The list is about 1,500 names, mostly American and Japanese. Local shops and small campaigns are not in it. Check the exported ad log to see who is being missed.
- **The fixed `key` in the manifest** keeps the extension's ID, and therefore its score and log, the same wherever the folder is loaded from. Remove it before submitting to the Chrome Web Store.
- The original ad still loads before it is replaced, so its advertiser may still be billed for the impression. Arguably a feature.
