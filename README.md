# Antivertising

An ad "blocker" that doesn't block. It replaces each ad with the one its advertiser would least like you to see.

A Pepsi ad becomes a Coke ad. A sportsbook ad becomes an ad for keeping your money. An ad for a car nobody named becomes an ad for the bus.

**Website, live demo and download: <https://williamtoner.net/antivertising/>**

![The demo page after Antivertising has been at it](docs/demo.png)

Every card carries a black strip saying who paid for the space. Hover it for **Show original** (puts the real ad back) and **Share** (draws a picture of the swap for you to post).

## Try it

1. Open `chrome://extensions`, switch on **Developer mode**, click **Load unpacked** and pick the `extension/` folder. (Works in Chrome, Edge, Brave and other Chromium browsers. For Firefox see [below](#firefox).)
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

## Firefox

Firefox runs the same code. Only the manifest differs, and `tools/build_firefox.py` writes the Firefox one from `extension/manifest.json`, so there is nothing to keep in step by hand:

```bash
python3 tools/build_firefox.py
```

That leaves `dist/antivertising-firefox-<version>.zip`. To try it, open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on…** and pick the zip. It needs Firefox 142 or later, on a computer.

Release Firefox drops a temporary add-on when it quits, and only installs for good an add-on that Mozilla has signed. Signing does not mean listing it on addons.mozilla.org: Mozilla also signs add-ons that are handed out elsewhere, after automatic checks. The site workflow does this by itself whenever the version in `extension/manifest.json` goes up:

1. it sends the build to Mozilla and waits for the signed `.xpi`;
2. it attaches that to a GitHub release named after the version;
3. it rebuilds the site with an **Add to Firefox** button and an update feed (`firefox/updates.json`), which installed copies check, so they update themselves.

For that it needs a Mozilla API key in two repository secrets, `AMO_JWT_ISSUER` and `AMO_JWT_SECRET`, both from <https://addons.mozilla.org/developers/addon/api/key/>. Without them the step is skipped and the site explains the temporary route instead.

Mozilla signs each version number once. If a run sends a version and then fails before making the release, download the signed file from the [developer hub](https://addons.mozilla.org/developers/addons) and attach it to a release called `v<version>` by hand, or raise the version and push again.

### Mozilla's catalogue

The add-on can also go in Mozilla's public catalogue, addons.mozilla.org, where people find it by searching and Mozilla does the updating. That is a second build, because the catalogue refuses an add-on that names its own update feed:

```bash
python3 tools/build_firefox.py --listed
```

It is the same code with no update feed and with `.1` on the end of the version (`0.3.0` becomes `0.3.0.1`), because Mozilla takes each version number once and the website copy has used the plain one.

Sending it is a workflow you start by hand: **Actions → Firefox catalogue → Run workflow** (`.github/workflows/listing.yml`). It sends the version if Mozilla does not have it yet, and makes the catalogue page match `listing/`: the text and reviewer notes in `listing/firefox.json`, and the screenshots named in `listing/screenshots.json`. Mozilla may review a version before or after it appears, and can turn it down. The website copy does not depend on any of this.

## The website

`site/` is the public page. It loads the extension's own engine, card renderer and typeface, so the demo on it is the real thing, not a mock-up. Build it, with fresh copies of the extension for the download buttons, into `dist/site`:

```bash
python3 tools/build_site.py
```

Pushing to `main` builds and publishes it through GitHub Pages (`.github/workflows/site.yml`).

## Tests

```bash
node test/engine.test.js
```

covers advertiser identification and counter-ad selection, with no dependencies.

```bash
python3 test/e2e.py
```

loads the extension into headless Chromium, opens the demo page and checks every slot. It needs `pip install playwright && playwright install chromium`.

```bash
python3 test/e2e_firefox.py
```

does the same in headless Firefox with the Firefox build. It needs `pip install selenium`, Firefox and [geckodriver](https://github.com/mozilla/geckodriver/releases).

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

The awkward part is that real ads live inside cross-origin iframes, often several deep, which the page cannot read, and no API tells a content script which browser frame belongs to which `<iframe>` element. So each frame under the top one makes up a one-off token and posts it to its parent, which can see which element the message came from. To read an ad, the top frame gives that token to the background worker, which asks every frame in the tab whose it is; the owner's answer reveals the frame id, and the worker then asks that frame and every frame nested inside it what the ad links to. Those answers travel over the extension's private message channel, never through the page.

The handshake runs child-to-parent because ad scripts build their frames with `document.open()`, which removes every DOM event listener inside the frame. A listener waiting there for a token from the parent is silently deleted; the first version worked that way and got nothing back from most real ads.

## Known limits

- **Slot detection is conservative.** It recognises the containers the big networks use (AdSense, Google Ad Manager, Amazon, Taboola, Outbrain and common exchange iframes). It does not guess at `.ad` class names, because a false positive would eat real page content. Sites with home-grown ad markup are missed.
- **No video ads.** YouTube pre-rolls and the like are untouched.
- **Identification needs something to read.** A large share of real display ads are a picture whose click goes through an opaque redirect (`doubleclick.net/pcs/click?xai=...`), with no text and no stated destination. Those give no clues and get the generic heckle; only reading the image itself would identify them.
- **The long tail is long.** The list is about 1,500 names, mostly American and Japanese. Local shops and small campaigns are not in it. Check the exported ad log to see who is being missed.
- **The fixed `key` in the manifest** keeps the extension's ID, and therefore its score and log, the same wherever the folder is loaded from. Remove it before submitting to the Chrome Web Store. (The Firefox build drops it and uses a named ID instead.)
- **Not on phones.** Firefox for Android only installs add-ons listed on Mozilla's site.
- The original ad still loads before it is replaced, so its advertiser may still be billed for the impression. Arguably a feature.

## Licence

MIT; see [LICENSE](LICENSE). The typeface on the cards is [Archivo](https://github.com/Omnibus-Type/Archivo) under the SIL Open Font License. Brand names belong to their owners and are used only to say whose ad was replaced and who its competitors are. No brand is affiliated with this project or pays for placement.
