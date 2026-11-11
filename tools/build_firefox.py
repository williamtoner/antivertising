#!/usr/bin/env python3
"""Build the Firefox add-on (default: dist/antivertising-firefox-<version>.zip).

Firefox runs the same code as Chrome. Only the manifest differs:
  - the background code is an event page, not a service worker;
  - Chrome-only keys go, and Firefox's own settings (the add-on's ID, the
    oldest Firefox it runs on, where to look for updates) come in.

    python3 tools/build_firefox.py [output-file]

The result is unsigned. Release Firefox only loads it as a temporary add-on
(about:debugging); Mozilla has to sign it before it installs for good. See
the "Firefox" section of the README.
"""
import json
import sys
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


def firefox_manifest():
    manifest = json.loads((EXT / "manifest.json").read_text())
    for chrome_only in ("key", "minimum_chrome_version"):
        manifest.pop(chrome_only, None)
    manifest["background"] = {"scripts": [manifest["background"]["service_worker"]]}
    # Firefox lets people withhold site access from an add-on. Asking for it
    # by name puts it in the install prompt, so it is granted from the start.
    manifest["host_permissions"] = ["http://*/*", "https://*/*"]
    manifest["browser_specific_settings"] = {
        "gecko": {
            "id": ADDON_ID,
            "strict_min_version": MIN_FIREFOX,
            "update_url": UPDATE_URL,
            # Mozilla asks every add-on to declare what it sends anywhere. Nothing.
            "data_collection_permissions": {"required": ["none"]},
        }
    }
    return manifest


def version():
    return json.loads((EXT / "manifest.json").read_text())["version"]


def build(out):
    out.parent.mkdir(parents=True, exist_ok=True)
    # Unlike the Chrome zip, the manifest sits at the top level: that is what Firefox expects.
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("manifest.json", json.dumps(firefox_manifest(), indent=2) + "\n")
        for path in sorted(EXT.rglob("*")):
            if path.is_file() and path.name not in (".DS_Store", "manifest.json"):
                zf.write(path, path.relative_to(EXT).as_posix())
    return out


def main():
    default = ROOT / "dist" / ("antivertising-firefox-%s.zip" % version())
    out = build(Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else default)
    print("firefox add-on built: %s" % out)


if __name__ == "__main__":
    main()
