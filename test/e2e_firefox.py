#!/usr/bin/env python3
"""End-to-end check in Firefox: install the add-on built by
tools/build_firefox.py, open the demo page, and assert every fake ad turned
into the right counter-ad. The Firefox twin of test/e2e.py.

    pip install selenium          (plus Firefox and geckodriver)
    python3 test/e2e_firefox.py [--shots DIR]

Set AV_FIREFOX and AV_GECKODRIVER to use specific binaries.
"""
import argparse
import functools
import http.server
import json
import os
import sys
import tempfile
import threading
import time
import uuid
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service

ROOT = Path(__file__).resolve().parent.parent
DEMO = ROOT / "demo"
sys.path.insert(0, str(ROOT / "tools"))
import build_firefox  # noqa: E402

# data-av-original -> data-av-counter, one per ad slot on the demo page
EXPECTED = {
    "Pepsi": "coca-cola",
    "McDonald's": "burger-king",
    "DraftKings": "nemesis:gambling",
    "Coinbase": "nemesis:crypto",
    "Netflix": "disney-plus",
    "Nike": "adidas",
    "NordVPN": "expressvpn",
    "cars": "nemesis:cars",
    "zorblax.example": "generic",
}

SWAPS = """return Array.from(document.querySelectorAll('[data-antivertising]')).map(h => ({
    original: h.getAttribute('data-av-original'),
    counter: h.getAttribute('data-av-counter'),
    width: h.offsetWidth, height: h.offsetHeight,
}))"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = functools.partial(Quiet, directory=str(DEMO))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def wait_for(driver, script, timeout=20.0):
    end = time.time() + timeout
    while time.time() < end:
        if driver.execute_script(script):
            return True
        time.sleep(0.2)
    return False


def open_extension_page(driver, url):
    """Open one of the add-on's own pages in a new tab. WebDriver refuses to
    navigate to them, so ask the browser itself to."""
    before = set(driver.window_handles)
    with driver.context(driver.CONTEXT_CHROME):
        driver.execute_script("gBrowser.selectedTab = gBrowser.addTrustedTab(arguments[0]);", url)
    end = time.time() + 5
    while time.time() < end:
        opened = [h for h in driver.window_handles if h not in before]
        if opened:
            driver.switch_to.window(opened[0])
            return
        time.sleep(0.1)
    raise RuntimeError("could not open %s" % url)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--shots", help="directory to save screenshots in")
    args = parser.parse_args()

    server = serve()
    url = "http://localhost:%d/index.html" % server.server_address[1]
    failures = []

    with tempfile.TemporaryDirectory() as tmp:
        xpi = build_firefox.build(Path(tmp) / "antivertising.xpi")
        downloads = Path(tmp) / "downloads"
        downloads.mkdir()

        # Firefox gives each add-on a random internal address. Fix ours, so
        # the popup can be opened as a page.
        internal = str(uuid.uuid4())
        options = Options()
        options.add_argument("-headless")
        options.add_argument("--width=1100")
        options.add_argument("--height=900")
        if os.environ.get("AV_FIREFOX"):
            options.binary_location = os.environ["AV_FIREFOX"]
        options.set_preference("extensions.webextensions.uuids", json.dumps({build_firefox.ADDON_ID: internal}))
        options.set_preference("browser.download.folderList", 2)
        options.set_preference("browser.download.dir", str(downloads))
        options.set_preference("browser.download.useDownloadDir", True)
        service_args = ["--allow-system-access"]  # for open_extension_page
        if os.environ.get("AV_GECKODRIVER"):
            service = Service(executable_path=os.environ["AV_GECKODRIVER"], service_args=service_args)
        else:
            service = Service(service_args=service_args)

        driver = webdriver.Firefox(options=options, service=service)
        try:
            driver.install_addon(str(xpi), temporary=True)  # unsigned, so temporary
            driver.get(url)

            # Recognised advertisers are swapped within a second or two; the
            # generic heckle deliberately waits about five.
            wait_for(driver, "return document.querySelectorAll('[data-antivertising]').length >= %d" % len(EXPECTED))
            time.sleep(0.6)
            got = {s["original"]: s for s in driver.execute_script(SWAPS)}

            for original, counter in EXPECTED.items():
                if original not in got:
                    failures.append("%s: not replaced" % original)
                elif got[original]["counter"] != counter:
                    failures.append("%s: expected %s, got %s" % (original, counter, got[original]["counter"]))
            for original in got:
                if original not in EXPECTED:
                    failures.append("unexpected swap of %r -> %s" % (original, got[original]["counter"]))

            # Ordinary content must be untouched.
            if not driver.execute_script("return document.getElementById('plain-embed').offsetWidth > 0"):
                failures.append("the non-ad iframe was hidden")
            if driver.execute_script("return document.querySelectorAll('main p a').length") != 2:
                failures.append("article links were disturbed")

            # Each card takes exactly the space of the ad it replaced.
            pepsi = got.get("Pepsi")
            if pepsi and (pepsi["width"], pepsi["height"]) != (728, 90):
                failures.append("Pepsi card is %sx%s, expected 728x90" % (pepsi["width"], pepsi["height"]))

            # The cards are set in the typeface that ships with the add-on.
            if not driver.execute_script("return document.fonts.check('900 20px \"AV Archivo\"')"):
                failures.append("the card typeface did not load")

            if args.shots:
                Path(args.shots).mkdir(parents=True, exist_ok=True)
                driver.get_full_page_screenshot_as_file(str(Path(args.shots) / "demo-firefox.png"))

            # "Show original" on the strip brings the ad back.
            before = len(driver.execute_script(SWAPS))
            card = driver.find_element("css selector", "[data-av-original='Pepsi']")
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'})", card)
            ActionChains(driver).move_to_element_with_offset(card, card.size["width"] / 2 - 12, -card.size["height"] / 2 + 6).pause(0.3).click().perform()
            time.sleep(0.3)
            if len(driver.execute_script(SWAPS)) != before - 1:
                failures.append("clicking Show original did not restore the ad")
            if not driver.execute_script("return document.querySelector('ins.adsbygoogle').offsetWidth > 0"):
                failures.append("the original Pepsi ad did not come back")

            # Scorekeeping reached storage.
            page_tab = driver.current_window_handle
            open_extension_page(driver, "moz-extension://%s/popup/popup.html" % internal)
            if not wait_for(driver, "return document.getElementById('total').textContent !== '0'", 5):
                failures.append("the popup never showed a score")
            total = driver.find_element("id", "total").text
            if total != str(len(EXPECTED)):
                failures.append("popup shows %s swaps, expected %d" % (total, len(EXPECTED)))
            if args.shots:
                time.sleep(0.3)
                driver.save_screenshot(str(Path(args.shots) / "popup-firefox.png"))

            # Every swap is in the ad log, with what the ad was and what replaced it.
            log = driver.execute_async_script(
                """const done = arguments[arguments.length - 1];
                (async () => {
                    const { logMeta } = await browser.storage.local.get('logMeta');
                    if (!logMeta) return [];
                    const keys = [];
                    for (let i = logMeta.first; i <= logMeta.last; i++) keys.push('log:' + i);
                    const stored = await browser.storage.local.get(keys);
                    return keys.flatMap(k => stored[k] || []);
                })().then(done, () => done(null));"""
            )
            if log is None:
                failures.append("could not read the ad log")
                log = []
            if len(log) != len(EXPECTED):
                failures.append("ad log has %d entries, expected %d" % (len(log), len(EXPECTED)))
            pepsi_row = next((e for e in log if e.get("brand") == "pepsi"), None)
            if not pepsi_row:
                failures.append("ad log has no Pepsi entry")
            else:
                for field, want in (("counter", "coca-cola"), ("kind", "rival"), ("size", "728x90"), ("page", "localhost")):
                    if pepsi_row.get(field) != want:
                        failures.append("Pepsi log entry has %s=%r, expected %r" % (field, pepsi_row.get(field), want))
            unknown = next((e for e in log if e.get("kind") == "generic"), None)
            if not unknown or unknown.get("landing") != "zorblax.example":
                failures.append("ad log did not record the unknown advertiser's landing site")

            # Export saves the log as a file.
            driver.find_element("id", "log-export").click()
            end = time.time() + 5
            saved = []
            while time.time() < end and not saved:
                saved = [p for p in downloads.glob("antivertising-log-*.json") if p.stat().st_size > 0]
                time.sleep(0.2)
            if not saved:
                failures.append("export did not save a file")
            elif json.loads(saved[0].read_text()).get("count") != len(EXPECTED):
                failures.append("exported file has the wrong number of entries")

            # Share score opens the picture page.
            tabs_before = set(driver.window_handles)
            driver.find_element("id", "share-score").click()
            time.sleep(1.0)
            opened = [h for h in driver.window_handles if h not in tabs_before]
            if not opened:
                failures.append("Share score did not open a tab")
            else:
                popup_tab = driver.current_window_handle
                driver.switch_to.window(opened[0])
                wait_for(driver, "return !!document.querySelector('canvas') && document.fonts.status === 'loaded'", 5)
                time.sleep(0.5)
                if "share/share.html" not in driver.current_url:
                    failures.append("Share score opened %s" % driver.current_url)
                if args.shots:
                    driver.save_screenshot(str(Path(args.shots) / "share-firefox.png"))
                driver.close()
                driver.switch_to.window(popup_tab)

            # Switching off restores every ad on the open page, live.
            driver.find_element("css selector", "label.switch").click()
            driver.switch_to.window(page_tab)
            if not wait_for(driver, "return document.querySelectorAll('[data-antivertising]').length === 0", 5):
                failures.append("switching off did not restore the ads")
        finally:
            driver.quit()

    server.shutdown()
    if failures:
        print("FAILED")
        for f in failures:
            print("  -", f)
        return 1
    print("ok (Firefox): %d ads swapped as expected, undo, off-switch, ad log and share page work" % len(EXPECTED))
    return 0


if __name__ == "__main__":
    sys.exit(main())
