#!/usr/bin/env python3
"""Build the Firefox add-on (default: dist/antivertising-firefox-<version>.zip).

Firefox runs the same code as Chrome. Only the manifest differs:
  - the background code is an event page, not a service worker, and lists
    the scripts that Chrome's worker loads for itself;
  - Chrome-only keys go, and Firefox's own settings (the add-on's ID, the
    oldest Firefox it runs on, where to look for updates) come in.

    python3 tools/build_firefox.py [--listed] [output-file]

The result is unsigned. Release Firefox only loads it as a temporary add-on
(about:debugging); Mozilla has to sign it before it installs for good. See
the "Firefox" section of the README.

There are two builds, because Mozilla hands the add-on out two ways:
  - the default one is for the copy on our own website, which finds its
    updates in our update feed;
  - --listed is for Mozilla's catalogue (addons.mozilla.org), which does the
    updating itself and refuses an add-on that names its own feed.
"""
import argparse
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"

ADDON_ID = "antivertising@williamtoner.net"
# 142 is the first version, on desktop and Android, with every manifest key we use.
MIN_FIREFOX = "142.0"
# Signed copies installed from the website look here for new versions. The
# github.io address follows the site wherever it moves.
UPDATE_URL = "https://williamtoner.github.io/antivertising/firefox/updates.json"


def version(listed=False):
    """The add-on's version number.

    Mozilla accepts each number once, whichever way the add-on is handed out,
    and the website copy has already used the plain one. So the catalogue copy
    of the same code is that number with ".1" on the end: 0.3.0 becomes 0.3.0.1.
    """
    number = json.loads((EXT / "manifest.json").read_text())["version"]
    return number + ".1" if listed else number


def background_scripts(worker):
    """Chrome's worker pulls in the brand list and engine with importScripts().
    Firefox's background page cannot, so it is given the same files, in the
    same order, ahead of the worker itself."""
    source = (EXT / worker).read_text()
    call = re.search(r"importScripts\((.*?)\);", source, re.S)
    if not call:
        raise SystemExit("%s no longer calls importScripts()" % worker)
    folder = Path(worker).parent
    return [(folder / name).as_posix() for name in re.findall(r"'([^']+)'", call.group(1))] + [worker]


def firefox_manifest(listed=False):
    manifest = json.loads((EXT / "manifest.json").read_text())
    for chrome_only in ("key", "minimum_chrome_version"):
        manifest.pop(chrome_only, None)
    manifest["version"] = version(listed)
    manifest["background"] = {"scripts": background_scripts(manifest["background"]["service_worker"])}
    # Firefox lets people withhold site access from an add-on. Asking for it
    # by name puts it in the install prompt, so it is granted from the start.
    manifest["host_permissions"] = ["http://*/*", "https://*/*"]
    gecko = {
        "id": ADDON_ID,
        "strict_min_version": MIN_FIREFOX,
        # Mozilla asks every add-on to declare what it sends anywhere. Nothing.
        "data_collection_permissions": {"required": ["none"]},
    }
    if not listed:
        gecko["update_url"] = UPDATE_URL
    manifest["browser_specific_settings"] = {"gecko": gecko}
    return manifest


def build(out, listed=False):
    out.parent.mkdir(parents=True, exist_ok=True)
    # Unlike the Chrome zip, the manifest sits at the top level: that is what Firefox expects.
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("manifest.json", json.dumps(firefox_manifest(listed), indent=2) + "\n")
        for path in sorted(EXT.rglob("*")):
            if path.is_file() and path.name not in (".DS_Store", "manifest.json"):
                zf.write(path, path.relative_to(EXT).as_posix())
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("out", nargs="?")
    parser.add_argument("--listed", action="store_true", help="build the copy for Mozilla's catalogue")
    args = parser.parse_args()
    name = "antivertising-firefox-%s%s.zip" % ("listed-" if args.listed else "", version(args.listed))
    out = build(Path(args.out).resolve() if args.out else ROOT / "dist" / name, args.listed)
    print("firefox add-on built: %s" % out)


if __name__ == "__main__":
    main()
