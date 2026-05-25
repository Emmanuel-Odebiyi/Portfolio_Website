from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Background color at the corners is very close to (210, 235, 240)
# Let's define a function to check if a pixel is background.
# The background is a smooth vertical gradient from (210, 235, 240) at the top
# to (193, 227, 229) at the bottom.
# So background pixels will have R, G, B values very close to each other (greyish/light blue)
# and their values will be highly uniform.
# In contrast, landmasses and map lines have vivid colors.

def is_background(p):
    r, g, b = p[:3]
    # Check if color is light blue/grey padding
    # Padding has high R, G, B (> 190) and low saturation (difference between max and min is small)
    if r > 185 and g > 215 and b > 220:
        if abs(r - 190) < 30 and abs(g - 225) < 20 and abs(b - 235) < 15:
            return True
        if abs(r - 210) < 25 and abs(g - 235) < 20 and abs(b - 240) < 20:
            return True
    return False

# Scan from top down to find first non-background pixel
top_edge = 0
for y in range(h):
    has_land = False
    for x in range(0, w, 10):
        p = img.getpixel((x, y))
        if not is_background(p):
            has_land = True
            break
    if has_land:
        top_edge = y
        break

# Scan from bottom up to find last non-background pixel
bottom_edge = h
for y in range(h - 1, -1, -1):
    has_land = False
    for x in range(0, w, 10):
        p = img.getpixel((x, y))
        if not is_background(p):
            has_land = True
            break
    if has_land:
        bottom_edge = y
        break

print(f"Detected top edge: {top_edge}")
print(f"Detected bottom edge: {bottom_edge}")
