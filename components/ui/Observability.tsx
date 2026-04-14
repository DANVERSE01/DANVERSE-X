"use client"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export function Observability() {
  if (typeof window === "undefined") return null

  const isLocalHost = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
  if (isLocalHost) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
