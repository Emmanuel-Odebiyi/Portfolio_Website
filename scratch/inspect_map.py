from PIL import Image

img = Image.open("c:/Users/HP/Documents/Portfolio_Website/34068.jpg")
print(f"Image Size: {img.size}")
# Sample some pixels along the borders to find background color
print(f"Top-Left Pixel: {img.getpixel((10, 10))}")
print(f"Bottom-Left Pixel: {img.getpixel((10, img.height - 10))}")
