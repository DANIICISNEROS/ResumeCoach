from fastapi import FastAPI, UploadFile, File
from pdf_reader import extract_text_from_pdf

app = FastAPI(title="My FastAPI Application")

@app.get("/")
async def home():
    return {"message": "IA Resume Coach done!"}

@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)
    return {"filename": file.filename, "text_preview": text[:500]}