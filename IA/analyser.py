# IA work, functions with instructions to Gemini API

import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3.5-flash-lite')

def analyze_resume(text: str):
    prompt = f"""
    you are a tech recruiter expert. Analyze this CV:
    ---
    {text[:8000]}
    ---
    Provide the analysis in JSON format, Respond ONLY with valid JSON. Do NOT wrap it in ```json:
    1. score (0-100)
    2. strengths (3 bullets)
    3. weaknesses (3 bullets)
    4. concrete_improvements (3 bullets)
    """

    for i in range(3):
        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            if "429" in str(e):
                time.sleep(12)
            else:
                return f"Error: {str(e)}"
    
    return "Error: Cuota excedida, espera 1 min"