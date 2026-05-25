from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Let's define a function to check if a pixel is the ocean/background padding color.
# The background color is a light blue, e.g., (229, 246, 254) or (232, 246, 255)
# Land has a wide variety of colors. We can detect background by checking if
# the pixel is close to the vertical gradient of the background.
# Since the background gradient has R > 190, G > 225, B > 235:
def is_bg(p):
    r, g, b = p[:3]
    return r >= 190 and g >= 225 and b >= 235

# Let's find the first row (from y=0 to y=2000) that has land (non-background)
top_y = 0
for y in range(h):
    has_land = False
    for x in range(0, w, 5): # check every 5th pixel for speed
        if not is_bg(img.getpixel((x, y))):
            has_land = True
            break
    if has_land:
        top_y = y
        break

# Let's find the bottom of Antarctica (from y=3000 going up)
# We know Antarctica is around y=2900. Let's find the first row from y=3000 going up
# that has land (Antarctica).
bottom_y = h
for y in range(3200, 2000, -1):
    has_land = False
    for x in range(0, w, 5):
        if not is_bg(img.getpixel((x, y))):
            has_land = True
            break
    if has_land:
        bottom_y = y
        break

print(f"Exact top row of map: {top_y}")
print(f"Exact bottom row of map (Antarctica): {bottom_y}")
