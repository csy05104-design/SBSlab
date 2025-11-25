from PIL import Image, ImageFilter
import os

def optimize_profile_picture():
    input_path = 'profile.jpg'
    output_path = 'profile_optimized.jpg'
    
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Calculate target dimensions for a square crop
            width, height = img.size
            new_size = min(width, height)
            
            left = (width - new_size) / 2
            top = (height - new_size) / 2
            right = (width + new_size) / 2
            bottom = (height + new_size) / 2
            
            # Crop to square
            img = img.crop((left, top, right, bottom))
            
            # Resize to 400x400 (retina ready for 150px display)
            img = img.resize((400, 400), Image.Resampling.LANCZOS)
            
            # Apply slight sharpening
            img = img.filter(ImageFilter.SHARPEN)
            
            # Save
            img.save(output_path, quality=95)
            print(f"Successfully optimized image to {output_path}")
            
    except Exception as e:
        print(f"Error optimizing image: {e}")

if __name__ == "__main__":
    optimize_profile_picture()
