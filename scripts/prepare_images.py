"""
Prepares the real photographic assets for web delivery.

Put the ORIGINAL files in `assets-src/` (this folder is not served):

    assets-src/profile.png          -> public/profile.png
    assets-src/certificates/*.jpg   -> public/certificates/*.jpg

The only edits performed are the ones that are safe for a factual document or
a real person's photograph: EXIF-orientation correction, trimming the empty
margins around a cut-out, downscale, and compression. Nothing is retouched,
recoloured, generated, or otherwise altered — the person's appearance and a
certificate's wording, numbers, dates, logos and signatures are never touched.

Note: anything placed in `assets-src/certificates/` is written straight to the
published `public/certificates/`. Unredacted originals belong in
`assets-src/originals/`, which this script does not read.

Run:  python3 scripts/prepare_images.py
Needs: pip install pillow
"""

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
PUBLIC = ROOT / "public"

PROFILE_WIDTH = 360         # portrait for the About column; never upscaled
CERT_MAX_WIDTH = 1600       # readable in the lightbox without being huge
JPEG_QUALITY = 82


def _load(path: Path, keep_alpha: bool = False) -> Image.Image:
    """Open an image and apply its EXIF rotation so it is upright."""
    img = ImageOps.exif_transpose(Image.open(path))
    return img.convert("RGBA" if keep_alpha else "RGB")


def _save(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if img.mode == "RGBA":
        # Keep the cut-out transparent so the portrait sits on the card's own
        # background in either theme. JPEG cannot store alpha.
        img.save(dest, "PNG", optimize=True)
    else:
        img.save(dest, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    print(f"  {dest.relative_to(ROOT)}  ({dest.stat().st_size // 1024} KB, {img.width}x{img.height})")


def _portrait_trim(img: Image.Image) -> Image.Image:
    """
    Trim the empty margins around a background-removed cut-out and scale it,
    keeping the portrait's natural proportions.

    The subject is only trimmed to its own bounds — never squared off, never
    re-framed, and the alpha channel is kept.
    """
    if img.mode == "RGBA":
        box = img.getchannel("A").getbbox()
        if box:
            img = img.crop(box)

    # Never upscale: enlarging past the source adds bytes, not detail.
    width = min(PROFILE_WIDTH, img.width)
    if width == img.width:
        return img
    height = round(img.height * width / img.width)
    return img.resize((width, height), Image.LANCZOS)


def prepare_profile() -> None:
    """Accepts profile.png (transparent cut-out) or profile.jpg."""
    png, jpg = SRC / "profile.png", SRC / "profile.jpg"
    src = png if png.exists() else jpg
    if not src.exists():
        print(f"- profile: skipped, no {png.relative_to(ROOT)} or {jpg.relative_to(ROOT)}")
        return

    print("- profile:")
    img = _load(src, keep_alpha=src.suffix.lower() == ".png")
    img = _portrait_trim(img)
    _save(img, PUBLIC / ("profile.png" if img.mode == "RGBA" else "profile.jpg"))


def prepare_certificates() -> None:
    src_dir = SRC / "certificates"
    if not src_dir.is_dir():
        print(f"- certificates: skipped, no {src_dir.relative_to(ROOT)}/")
        return

    originals = sorted(
        p for p in src_dir.iterdir()
        if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    if not originals:
        print("- certificates: skipped, folder is empty")
        return

    print("- certificates:")
    for path in originals:
        img = _load(path)
        if img.width > CERT_MAX_WIDTH:
            height = round(img.height * CERT_MAX_WIDTH / img.width)
            img = img.resize((CERT_MAX_WIDTH, height), Image.LANCZOS)
        _save(img, PUBLIC / "certificates" / f"{path.stem}.jpg")


if __name__ == "__main__":
    print(f"Reading originals from {SRC.relative_to(ROOT)}/\n")
    prepare_profile()
    prepare_certificates()
    print(
        "\nFilenames must match src/data/site.ts (photo) and the `image.src` "
        "paths in src/data/experience.ts."
    )
