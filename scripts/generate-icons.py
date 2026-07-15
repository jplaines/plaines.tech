from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
FONT = "/System/Library/Fonts/SFNSMono.ttf"


def build_icon(size: int, destination: Path) -> None:
    scale = 4
    canvas_size = size * scale
    image = Image.new("RGB", (canvas_size, canvas_size), "#101311")
    draw = ImageDraw.Draw(image)

    inset = round(canvas_size * 0.075)
    radius = round(canvas_size * 0.18)
    draw.rounded_rectangle(
        (inset, inset, canvas_size - inset, canvas_size - inset),
        radius=radius,
        fill="#141816",
        outline="#3c4640",
        width=max(4, round(canvas_size * 0.018)),
    )

    font = ImageFont.truetype(FONT, round(canvas_size * 0.34))
    text = "JP"
    bounds = draw.textbbox((0, 0), text, font=font)
    text_width = bounds[2] - bounds[0]
    text_height = bounds[3] - bounds[1]
    text_x = (canvas_size - text_width) / 2
    text_y = (canvas_size - text_height) / 2 - bounds[1]
    draw.text((text_x, text_y), text, font=font, fill="#f1f3ee")

    dot_radius = max(5, round(canvas_size * 0.038))
    dot_x = canvas_size - inset - dot_radius * 1.65
    dot_y = inset + dot_radius * 1.65
    draw.ellipse(
        (
            dot_x - dot_radius,
            dot_y - dot_radius,
            dot_x + dot_radius,
            dot_y + dot_radius,
        ),
        fill="#a6e8ff",
    )

    image.resize((size, size), Image.Resampling.LANCZOS).save(destination)


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    build_icon(64, PUBLIC / "favicon.png")
    build_icon(180, PUBLIC / "apple-touch-icon.png")
    build_icon(512, PUBLIC / "icon-512.png")
