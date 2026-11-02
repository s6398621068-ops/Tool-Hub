from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pypdf import PdfWriter
from io import BytesIO
from pathlib import Path

# Create FastAPI application
app = FastAPI(title="ToolHub API")

# Get project folder location
BASE_DIR = Path(__file__).resolve().parent

# Get server folder location
SERVER_DIR = BASE_DIR / "servers"

# Serve HTML, CSS and JavaScript files
app.mount(
    "/assets",
    StaticFiles(directory=SERVER_DIR),
    name="assets"
)

# Home page
@app.get("/")
def home():
    return FileResponse(SERVER_DIR / "b1.html")


# Test API
@app.get("/api")
def test_api():
    return {
        "message": "ToolHub Backend is working!",
        "status": "success"
    }
# Word Counter Page
@app.get("/word-counter")
def word_counter():
    return FileResponse(SERVER_DIR / "word.html")

# Calculator Page
@app.get("/calculator")
def calculator():
    return FileResponse(SERVER_DIR / "calculator.html")

# Text Case Converter Page
@app.get("/converter")
def converter():
    return FileResponse(SERVER_DIR / "converter.html")

# Image Compressor Page
@app.get("/image-compressor")
def image_compressor():
    return FileResponse(SERVER_DIR / "image.html")

# PDF Merger Page
@app.get("/pdf-merger")
def pdf_merger():
    return FileResponse(SERVER_DIR / "pdf.html")

# Password Generator Page
@app.get("/password-generator")
def password_generator():
    return FileResponse(SERVER_DIR / "password.html")

# PDF Merger API
@app.post("/merge-pdf")
async def merge_pdf(files: list[UploadFile] = File(...)):

    if len(files) < 2:
        raise HTTPException(
            status_code=400,
            detail="Please upload at least two PDF files."
        )

    writer = PdfWriter()

    try:
        for file in files:

            if file.content_type != "application/pdf":
                raise HTTPException(
                    status_code=400,
                    detail="Only PDF files are allowed."
                )

            contents = await file.read()

            pdf_file = BytesIO(contents)

            writer.append(pdf_file)

        output = BytesIO()

        writer.write(output)

        output.seek(0)

        return StreamingResponse(
            output,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=merged.pdf"
            }
        )

    finally:
        writer.close()
        for file in files:
            await file.close()