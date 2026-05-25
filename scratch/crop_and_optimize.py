from PIL import Image

# Open the original high-resolution poster
img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
w, h = img.size

# Crop parameters derived from the exact mathematical center (Equator at Row 2000)
# and a 2:1 aspect ratio (width = 6500, height = 3250)
left = 0
top = 222
right = 6500
bottom = 3472

cropped_img = img.crop((left, top, right, bottom))
print(f"Cropped Image Size: {cropped_img.size}")

# Resize to high-performance web-standard 2048 x 1024 resolution (2:1 aspect ratio)
optimized_img = cropped_img.resize((2048, 1024), Image.Resampling.LANCZOS)

# Horizontally flip the image to perfectly cancel out Three.js spherical UV wrapping mirror
flipped_img = optimized_img.transpose(Image.FLIP_LEFT_RIGHT)
print(f"Optimized & Flipped Image Size: {flipped_img.size}")

# Save directly as the public political map texture
flipped_img.save("c:/Users/HP/Documents/Portfolio_Website/public/world-map-political.jpg", "JPEG", quality=85)
print("Saved optimized flipped texture successfully!")
