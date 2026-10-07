import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const backendRes = await fetch(`${req.nextUrl.origin}/api/upload-cv/`, {
    method: 'POST',
    body: formData,
  })

  const data = await backendRes.json()
  return NextResponse.json(data)
}