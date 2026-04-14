import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, message } = (await req.json()) as {
      name?: string
      email?: string
      projectType?: string
      message?: string
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!resend) {
      return NextResponse.json({ error: "Transmission endpoint is not configured." }, { status: 503 })
    }

    await resend.emails.send({
      from: "DANVERSE Contact <no-reply@danverse.studio>",
      to: ["studio@danverse.ai"],
      replyTo: email,
      subject: `[TX-NEW] ${projectType || "Project"} from ${name}`,
      html: `
        <h2>New Transmission from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    await resend.emails.send({
      from: "DANVERSE <no-reply@danverse.studio>",
      to: [email],
      subject: "Transmission received · DANVERSE",
      html: `
        <p>Hi ${name},</p>
        <p>Your signal has been received.</p>
        <p>— DANVERSE Studio</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
