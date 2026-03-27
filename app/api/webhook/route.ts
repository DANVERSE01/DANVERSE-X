import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  const secret = process.env.N8N_SECRET

  if (!webhookUrl || !secret) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    const body = await request.text()
    const contentType = request.headers.get("content-type") || "application/json"

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "X-Secret": secret,
      },
      body,
      cache: "no-store",
    })

    return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
