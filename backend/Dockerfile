# 1. Use an official lightweight Python image
FROM python:3.14.2-slim

# 2. Install System Dependencies (The crucial step!)
# We update Linux and install Tesseract from the OS package manager
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the app code
COPY . .

# 6. Command to run the app
# Note: We use port 10000 to match Render's default expectation
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]
```
