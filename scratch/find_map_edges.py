from PIL import Image

img_path = r"c:\Users\HP\Documents\Portfolio_Website\Maproom-World-Map-1-2.webp"
img = Image.open(img_path)
width, height = img.size
pixels = img.load()

# Let's inspect the RGB colors of the central vertical line (x = width // 2)
# to see where headers and footers are
print("Row inspection at middle column (X = 233):")
for y in range(0, height, 5):
    r, g, b = pixels[width // 2, y][:3]
    print(f"Row {y}: RGB({r}, {g}, {b})")
