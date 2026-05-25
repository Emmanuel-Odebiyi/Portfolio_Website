from PIL import Image

img_path = r"c:\Users\HP\Documents\Portfolio_Website\Maproom-World-Map-1-2.webp"
img = Image.open(img_path)
width, height = img.size

# Perfect crop boundaries derived from diagnostic scanning
left = 0
top = 9
right = width
bottom = 252

cropped = img.crop((left, top, right, bottom))
print(f"Original Size: {img.size}")
print(f"Perfect Cropped Size: {cropped.size} (Aspect Ratio: {cropped.width / cropped.height:.3f})")

# Resize to standard 2048x1024 texture for high performance WebGL wrapping
resized = cropped.resize((2048, 1024), Image.Resampling.LANCZOS)

# Flip horizontally to match the Three.js sphere coordinate system mapping
flipped = resized.transpose(Image.FLIP_LEFT_RIGHT)

# Overwrite the active political texture
flipped.save(r"public\world-map-political.jpg", "JPEG", quality=95)
print("Successfully cropped, flipped, and saved world-map-political.jpg!")
