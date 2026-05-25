from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Let's sample a vertical column at x = w // 2 (center of the image)
# and print out every 100th pixel color to find the top and bottom land boundaries.
print(f"Sampling center column at x = {w // 2}:")
for y in range(0, h, 100):
    p = img.getpixel((w // 2, y))
    print(f"Row {y:4d}: RGB {p}")
