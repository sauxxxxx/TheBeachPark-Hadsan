from pathlib import Path

from PIL import Image


SOURCE_DIR = Path(__file__).resolve().parents[1] / "src" / "assets" / "images" / "generated"


def optimize_png(path: Path) -> None:
    target = path.with_suffix(".webp")
    with Image.open(path) as image:
        image.save(target, "WEBP", quality=84, method=6)
    if not target.exists() or target.stat().st_size == 0:
        raise RuntimeError(f"Optimization failed for {path.name}")
    path.unlink()


def main() -> None:
    for path in sorted(SOURCE_DIR.glob("*.png")):
        optimize_png(path)
        print(f"optimized {path.name}")


if __name__ == "__main__":
    main()
