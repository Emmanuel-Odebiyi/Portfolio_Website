from PIL import Image

img_path = r"c:\Users\HP\Documents\Portfolio_Website\Maproom-World-Map-1-2.webp"
img = Image.open(img_path)
width, height = img.size

# Load pixel data
pixels = img.load()

# Find rows and columns that are not pure white (RGB is not all >= 254)
non_white_rows = []
non_white_cols = []

for y in range(height):
    row_is_white = True
    for x in range(width):
        r, g, b = pixels[x, y][:3]
        if r < 254 or g < 254 or b < 254:
            row_is_white = False
            break
    if not row_is_white:
        non_white_rows.append(y)

for x in range(width):
    col_is_white = True
    for y in range(height):
        r, g, b = pixels[x, y][:3]
        if r < 254 or g < 254 or b < 254:
            col_is_white = False
            break
    if not col_is_white:
        non_white_cols.append(x)

if non_white_rows and non_white_cols:
    # Add a tiny 2px padding to avoid clipping map borders
    top = max(0, non_white_rows[0] - 2)
    bottom = min(height, non_white_rows[-1] + 2)
    left = max(0, non_white_cols[0] - 2)
    right = min(width, non_white_cols[-1] + 2)
    
    print(f"Pure Python Detected Map Boundaries: Left={left}, Top={top}, Right={right}, Bottom={bottom}")
    
    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((2048, 1024), Image.Resampling.LANCZOS)
    flipped = resized.transpose(Image.FLIP_LEFT_RIGHT)
    
    # Save the texture as political texture to overwrite
    flipped.save(r"public\world-map-political.jpg", "JPEG", quality=95)
    print("Successfully processed and saved world-map-political.jpg in pure Python!")
else:
    print("Could not detect, saving default resized texture.")
    img.resize((2048, 1024), Image.Resampling.LANCZOS).transpose(Image.FLIP_LEFT_RIGHT).save(r"public\world-map-political.jpg", "JPEG", quality=95)
