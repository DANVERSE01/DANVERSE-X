import * as Sentry from "@sentry/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

const webVitalSchema = z.object({
  id: z.string(),
  name: z.enum(["CLS", "FCP", "INP", "LCP", "TTFB"]),
  value: z.number(),
  delta: z.number().optional(),
  rating: z.enum(["good", "needs-improvement", "poor"]).optional(),
  navigationType: z.string().optional(),
})

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  const parsedPayload = webVitalSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return NextResponse.json({ ok: false, error: "Invalid web vitals payload" }, { status: 400 })
  }

  const metric = parsedPayload.data

  if (process.env.NODE_ENV !== "production") {
    console.info("[web-vitals]", metric)
    return NextResponse.json({ ok: true }, { status: 202 })
  }

  Sentry.captureMessage(`Web Vital: ${metric.name}`, {
    level: "info",
    tags: {
      metric: metric.name,
      rating: metric.rating ?? "unknown",
    },
    extra: metric,
  })

  return NextResponse.json({ ok: true }, { status: 202 })
}
