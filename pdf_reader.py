from pypdf import PdfReader 
import io

def extract_text_from_pdf(pdf_byters:bytes) -> str:
    reader = PdfReader(io.BytesIO(pdf_byters))
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text