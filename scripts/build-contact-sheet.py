from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "src" / "assets" / "images" / "generated"
OUTPUT = ROOT / "tmp" / "generated-assets-contact-sheet.webp"
CELL_SIZE = (360, 245)
COLUMNS = 4


def main() -> None:
    paths = sorted(SOURCE_DIR.glob("*.webp"))
    rows = (len(paths) + COLUMNS - 1) // COLUMNS
    sheet = Image.new("RGB", (CELL_SIZE[0] * COLUMNS, CELL_SIZE[1] * rows), "#f8f3e9")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for index, path in enumerate(paths):
        x = (index % COLUMNS) * CELL_SIZE[0]
        y = (index // COLUMNS) * CELL_SIZE[1]
        with Image.open(path) as source:
            source.thumbnail((CELL_SIZE[0] - 16, CELL_SIZE[1] - 42))
            image_x = x + (CELL_SIZE[0] - source.width) // 2
            sheet.paste(source.convert("RGB"), (image_x, y + 8))
        draw.text((x + 10, y + CELL_SIZE[1] - 25), path.name, fill="#082e4f", font=font)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUTPUT, "WEBP", quality=88, method=6)
    print(OUTPUT)


if __name__ == "__main__":
    main()
