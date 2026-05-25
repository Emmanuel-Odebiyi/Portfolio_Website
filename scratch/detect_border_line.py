from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Let's look for horizontal lines by checking rows in the bottom part (from y = 3000 to 4500)
# We can check if a row is very dark (like a black border) or has a highly constant color.
# Let's print out rows that have high contrast or are solid lines.

print("Scanning for border lines...")
for y in range(3000, 4500):
    # Check if this row is a solid border line.
    # We look for a line where many pixels are identical and dark,
    # or a line that separates the blue ocean from the bottom padding.
    row_pixels = [img.getpixel((x, y)) for x in range(0, w, 50)]
    
    # Check standard deviation or unique colors
    # Let's count how many pixels are dark (R < 100, G < 100, B < 100)
    dark_count = sum(1 for p in row_pixels if p[0] < 100 and p[1] < 100 and p[2] < 100)
    
    # If a row has a lot of dark pixels across the entire width, it's a border!
    if dark_count > len(row_pixels) * 0.8:
        print(f"Solid dark row at y = {y} (dark pixels: {dark_count}/{len(row_pixels)})")
