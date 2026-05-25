from PIL import Image

img_path = r"c:\Users\HP\Documents\Portfolio_Website\Maproom-World-Map-1-2.webp"
img = Image.open(img_path)
width, height = img.size
pixels = img.load()

# Let's inspect the RGB colors of row 120 (middle height of the map)
print("Column inspection at row 120:")
for x in range(0, width, 5):
    r, g, b = pixels[x, 120][:3]
    print(f"Col {x}: RGB({r}, {g}, {b})")
