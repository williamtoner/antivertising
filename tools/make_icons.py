#!/usr/bin/env python3
"""Regenerate the extension icons: the word AD, mirrored, on hazard yellow.

    python3 tools/make_icons.py        (needs Pillow)
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

OUT = Path(__file__).resolve().parent.parent / "extension" / "icons"
YELLOW = (255, 214, 10, 255)
INK = (17, 17, 17, 255)
FONTS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
]


def font(size):
    for path in FONTS:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    raise SystemExit("No bold TrueType font found; add one to FONTS.")


def master(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=size // 6, fill=YELLOW)

    f = font(int(size * 0.5))
    box = draw.textbbox((0, 0), "AD", font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), "AD", font=f, fill=INK)
    return ImageOps.mirror(img)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    big = master()
    for size in (16, 32, 48, 128):
        big.resize((size, size), Image.LANCZOS).save(OUT / f"icon{size}.png")
        print("wrote", OUT / f"icon{size}.png")


if __name__ == "__main__":
    main()
