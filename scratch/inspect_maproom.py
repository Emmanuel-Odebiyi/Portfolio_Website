from PIL import Image

img_path = r"c:\Users\HP\Documents\Portfolio_Website\Maproom-World-Map-1-2.webp"
try:
    img = Image.open(img_path)
    print(f"Image Size: {img.size}")
    print(f"Image Format: {img.format}")
    print(f"Image Mode: {img.mode}")
except Exception as e:
    print(f"Error opening image: {e}")
