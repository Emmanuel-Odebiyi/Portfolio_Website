from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Let's sample rows from top and bottom to see where color changes
# Background padding is light blue/grey, e.g., (210, 235, 240)
# We can average pixel values across a row or check for high contrast changes

print("Top rows audit (every 50th row):")
for y in range(0, 1000, 50):
    row_pixels = [img.getpixel((x, y)) for x in range(0, w, w // 10)]
    print(f"Row {y:4d}: {row_pixels[0]} {row_pixels[5]} {row_pixels[-1]}")

print("\nBottom rows audit (every 50th row from bottom):")
for y in range(h - 1000, h, 50):
    row_pixels = [img.getpixel((x, y)) for x in range(0, w, w // 10)]
    print(f"Row {y:4d}: {row_pixels[0]} {row_pixels[5]} {row_pixels[-1]}")
