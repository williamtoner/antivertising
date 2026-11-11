#!/usr/bin/env python3
"""Build the website into a folder (default: dist/site).

The site reuses the extension's own engine, card renderer and font, so the
demo on the page is the real thing, and it carries fresh copies of the
extension for the download buttons.

    python3 tools/build_site.py [output-folder] [--signed antivertising.xpi]

--signed is the Firefox add-on after Mozilla has signed it. With it, the
Firefox instructions become a one-click "Add to Firefox" button and the
update feed announces that version. Without it, the page explains how to
load the unsigned build temporarily.
"""
import argparse
import hashlib
import json
import shutil
import zipfile
from pathlib import Path

import build_firefox

ROOT = Path(__file__).resolve().parent.parent
ENGINE = ["data.js", "data-more.js", "data-new.js", "engine.js", "card.js"]
# Where the signed add-on is fetched from when Firefox updates it.
XPI_URL = "https://williamtoner.github.io/antivertising/antivertising.xpi"


def signed_version(xpi):
    """The version of a signed add-on, after checking that it is ours and signed."""
    with zipfile.ZipFile(xpi) as zf:
        names = zf.namelist()
        manifest = json.loads(zf.read("manifest.json"))
    if not any(name.startswith("META-INF/") and name.endswith(".rsa") for name in names):
        raise SystemExit("%s is not signed: Firefox would refuse to install it" % xpi)
    gecko = manifest.get("browser_specific_settings", {}).get("gecko", {})
    if gecko.get("id") != build_firefox.ADDON_ID:
        raise SystemExit("%s is a different add-on (%s)" % (xpi, gecko.get("id")))
    return manifest["version"]


def update_feed(xpi):
    """What installed copies of the Firefox add-on read to find a newer version."""
    updates = []
    if xpi:
        updates.append({
            "version": signed_version(xpi),
            "update_link": XPI_URL,
            "update_hash": "sha256:" + hashlib.sha256(xpi.read_bytes()).hexdigest(),
            "applications": {"gecko": {"strict_min_version": build_firefox.MIN_FIREFOX}},
        })
    return {"addons": {build_firefox.ADDON_ID: {"updates": updates}}}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("out", nargs="?", default=str(ROOT / "dist" / "site"))
    parser.add_argument("--signed", help="the Firefox add-on as signed by Mozilla (.xpi)")
    args = parser.parse_args()
    out = Path(args.out).resolve()
    signed = Path(args.signed).resolve() if args.signed else None
    feed = update_feed(signed)  # first, because it refuses a file that is not signed

    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(ROOT / "site", out)

    av = out / "av"
    av.mkdir()
    for name in ENGINE:
        shutil.copy(ROOT / "extension" / "src" / name, av / name)
    shutil.copy(ROOT / "extension" / "fonts" / "archivo.woff2", av / "archivo.woff2")
    shutil.copy(ROOT / "extension" / "icons" / "icon128.png", out / "icon.png")

    # The fake newspaper, for checking an install.
    shutil.copytree(ROOT / "demo", out / "test")

    # Chrome: one top-level folder, so unzipping gives "antivertising/" with the manifest directly inside.
    ext = ROOT / "extension"
    with zipfile.ZipFile(out / "antivertising.zip", "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(ext.rglob("*")):
            if path.is_file() and path.name != ".DS_Store":
                zf.write(path, Path("antivertising") / path.relative_to(ext))

    # Firefox: the unsigned build always, the signed one when there is one.
    build_firefox.build(out / "antivertising-firefox.zip")
    (out / "firefox").mkdir()
    (out / "firefox" / "updates.json").write_text(json.dumps(feed, indent=2) + "\n")
    if signed:
        shutil.copy(signed, out / "antivertising.xpi")
        page = out / "index.html"
        html = page.read_text()
        if 'data-xpi="no"' not in html:
            raise SystemExit("site/index.html has lost its data-xpi marker")
        page.write_text(html.replace('data-xpi="no"', 'data-xpi="yes"', 1))

    # GitHub Pages: serve files as they are.
    (out / ".nojekyll").write_text("")
    print("site built in %s (%s)" % (out, "signed Firefox add-on %s" % signed_version(signed) if signed else "no signed Firefox add-on"))


if __name__ == "__main__":
    main()
