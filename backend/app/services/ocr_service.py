import io
import re

import pytesseract
from PIL import Image, ImageOps


def extract_kwh_from_image(image_bytes: bytes) -> float | None:
    """
    1. Converts bytes to Image
    2. Optimzes image for reading (Converts to grayscale)
    3. Uses Tesseract OCR to get text from image
    4. Uses regex to find '...kwh'
    """
    try:
        # 1. Open Image from memory (bytes)
        image = Image.open(io.BytesIO(image_bytes))
        # 2. Pre-processing (Make it easier for AI to read)
        # Scale image x2 times
        image = image.resize((image.width * 2, image.height * 2))
        # Convert to grayscale
        image = ImageOps.grayscale(image)
        # Auto contrast
        image = ImageOps.autocontrast(image)

        # image.save('preprocessed_image.png')

        # 3. Extract Text
        #  text_content will be a big string of everything on the page
        text_content = pytesseract.image_to_string(image, config="--psm 6")

        # Debugging: Print what the AI actually sees

        # print("--- OCR EXTRACTED TEXT ---")
        # print(text_content)
        # print("----------------------------")

        # 4. Regex Magic (The "AI" logic)
        # We look for a number (int or float) followed by "kWh"
        # Example it matches: "145.50 kWh", "1200 kWh", "1,200.00 kWh"
        pattern = r"(\d[,\d]*\.?\d*)\s*kWh"
        match = re.search(pattern, text_content, re.IGNORECASE)

        if match:
            # Get the number part, remove commas (1,000 -> 1000)
            number_str = match.group(1).replace(",", "")
            return float(number_str)

        return None

    except Exception as e:
        print(f"OCR Error:{e}")
        return None
