#!/usr/bin/env python3
"""End-to-end check: load the unpacked extension into Chromium, open the demo
page, and assert every fake ad turned into the right counter-ad.

    pip install playwright && playwright install chromium
    python3 test/e2e.py [--shots DIR]

Set AV_CHROMIUM to use a specific Chromium binary.
"""
import argparse
import os
import sys
import tempfile
from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeout
from playwright.sync_api import sync_playwright

import slowads

ROOT = Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
DEMO = ROOT / "demo"

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


def swaps(page):
    return page.evaluate(
        """() => Array.from(document.querySelectorAll('[data-antivertising]')).map(h => ({
            original: h.getAttribute('data-av-original'),
            counter: h.getAttribute('data-av-counter'),
            width: h.offsetWidth, height: h.offsetHeight,
        }))"""
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--shots", help="directory to save screenshots in")
    args = parser.parse_args()

    server = slowads.serve(DEMO)
    url = "http://localhost:%d/index.html" % server.server_address[1]
    failures = []

    with sync_playwright() as p, tempfile.TemporaryDirectory() as profile:
        launch = dict(
            headless=True,
            viewport={"width": 1100, "height": 900},
            args=["--disable-extensions-except=%s" % EXT, "--load-extension=%s" % EXT],
        )
        if os.environ.get("AV_CHROMIUM"):
            launch["executable_path"] = os.environ["AV_CHROMIUM"]
        else:
            launch["channel"] = "chromium"
        ctx = p.chromium.launch_persistent_context(profile, **launch)

        worker = ctx.service_workers[0] if ctx.service_workers else ctx.wait_for_event("serviceworker", timeout=15000)
        ext_id = worker.url.split("/")[2]

        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(url)

        # Recognised advertisers are swapped at once; the generic heckle
        # waits until the ad has stopped telling us things.
        page.wait_for_function(
            "n => document.querySelectorAll('[data-antivertising]').length >= n", arg=len(EXPECTED), timeout=20000
        )
        page.wait_for_timeout(600)
        got = {s["original"]: s for s in swaps(page)}

        for original, counter in EXPECTED.items():
            label = original or "(unidentified)"
            if original not in got:
                failures.append("%s: not replaced" % label)
            elif got[original]["counter"] != counter:
                failures.append("%s: expected %s, got %s" % (label, counter, got[original]["counter"]))
        for original in got:
            if original not in EXPECTED:
                failures.append("unexpected swap of %r -> %s" % (original, got[original]["counter"]))

        # Ordinary content must be untouched.
        if not page.evaluate("document.getElementById('plain-embed').offsetWidth > 0"):
            failures.append("the non-ad iframe was hidden")
        if page.evaluate("document.querySelectorAll('main p a').length") != 2:
            failures.append("article links were disturbed")

        # Each card takes exactly the space of the ad it replaced.
        pepsi = got.get("Pepsi")
        if pepsi and (pepsi["width"], pepsi["height"]) != (728, 90):
            failures.append("Pepsi card is %sx%s, expected 728x90" % (pepsi["width"], pepsi["height"]))

        if args.shots:
            Path(args.shots).mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(Path(args.shots) / "demo.png"), full_page=True)

        # The corner flag brings the original ad back.
        before = len(swaps(page))
        box = page.locator("[data-av-original='Pepsi']").bounding_box()
        page.mouse.click(box["x"] + box["width"] - 12, box["y"] + 6)
        page.wait_for_timeout(200)
        if len(swaps(page)) != before - 1:
            failures.append("clicking the corner flag did not restore the ad")
        if not page.evaluate("document.querySelector('ins.adsbygoogle').offsetWidth > 0"):
            failures.append("the original Pepsi ad did not come back")

        # Scorekeeping reached storage.
        popup = ctx.new_page()
        popup.set_viewport_size({"width": 320, "height": 560})
        popup.goto("chrome-extension://%s/popup/popup.html" % ext_id)
        popup.wait_for_function("document.getElementById('total').textContent !== '0'", timeout=5000)
        total = popup.inner_text("#total")
        if total != str(len(EXPECTED)):
            failures.append("popup shows %s swaps, expected %d" % (total, len(EXPECTED)))
        if args.shots:
            popup.wait_for_timeout(300)  # let the switch finish sliding
            popup.screenshot(path=str(Path(args.shots) / "popup.png"), full_page=True)

        # Every swap is in the ad log, with what the ad was and what replaced it.
        log = popup.evaluate(
            """async () => {
                const { logMeta } = await chrome.storage.local.get('logMeta');
                if (!logMeta) return [];
                const keys = [];
                for (let i = logMeta.first; i <= logMeta.last; i++) keys.push('log:' + i);
                const stored = await chrome.storage.local.get(keys);
                return keys.flatMap(k => stored[k] || []);
            }"""
        )
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
        if "%d ads logged" % len(EXPECTED) not in popup.inner_text("#log-count"):
            failures.append("popup log count reads %r" % popup.inner_text("#log-count"))
        with popup.expect_download(timeout=5000) as download:
            popup.click("#log-export")
        if not download.value.suggested_filename.startswith("antivertising-log-"):
            failures.append("export saved as %r" % download.value.suggested_filename)

        # Ads that arrive late are swapped as they arrive, not on a timer.
        slow = ctx.new_page()
        slow.goto(slowads.url(server))
        try:
            slow.wait_for_function(slowads.DONE, timeout=slowads.PATIENCE)
        except PlaywrightTimeout:
            pass  # judge() says which ones are missing
        failures.extend(slowads.judge(slow.evaluate("T")))
        slow.close()

        # Switching off restores every ad on the open page, live.
        popup.click("label.switch")
        page.bring_to_front()
        page.wait_for_function("document.querySelectorAll('[data-antivertising]').length === 0", timeout=5000)

        if errors:
            failures.append("page errors: %s" % errors)
        ctx.close()

    server.shutdown()
    if failures:
        print("FAILED")
        for f in failures:
            print("  -", f)
        return 1
    print("ok: %d ads swapped as expected, %d late ads swapped as they arrived, undo, off-switch and ad log work" % (len(EXPECTED), len(slowads.SLOTS)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
