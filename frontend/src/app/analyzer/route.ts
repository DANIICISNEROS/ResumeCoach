import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  // Le pegamos a tu backend FastAPI local
  const backendRes = await fetch('http://127.0.0.1:8000/upload-cv/', {
    method: 'POST',
    body: formData,
  })

  const data = await backendRes.json()
  return NextResponse.json(data)
}