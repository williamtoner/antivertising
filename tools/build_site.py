#!/usr/bin/env python3
"""Build the website into a folder (default: dist/site).

The site reuses the extension's own engine, card renderer and font, so the
demo on the page is the real thing, and it carries a fresh zip of the
extension for the download button.

    python3 tools/build_site.py [output-folder]
"""
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "dist" / "site"
ENGINE = ["data.js", "data-more.js", "data-new.js", "engine.js", "card.js"]


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(ROOT / "site", OUT)

    av = OUT / "av"
    av.mkdir()
    for name in ENGINE:
        shutil.copy(ROOT / "extension" / "src" / name, av / name)
    shutil.copy(ROOT / "extension" / "fonts" / "archivo.woff2", av / "archivo.woff2")
    shutil.copy(ROOT / "extension" / "icons" / "icon128.png", OUT / "icon.png")

    # The fake newspaper, for checking an install.
    shutil.copytree(ROOT / "demo", OUT / "test")

    # One top-level folder, so unzipping gives "antivertising/" with the manifest directly inside.
    ext = ROOT / "extension"
    with zipfile.ZipFile(OUT / "antivertising.zip", "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(ext.rglob("*")):
            if path.is_file() and path.name != ".DS_Store":
                zf.write(path, Path("antivertising") / path.relative_to(ext))

    # GitHub Pages: serve files as they are.
    (OUT / ".nojekyll").write_text("")
    print("site built in %s" % OUT)


if __name__ == "__main__":
    main()
