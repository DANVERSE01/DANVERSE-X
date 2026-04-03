"use client"

import { useReportWebVitals } from "next/web-vitals"
import { trackWebVital } from "@/lib/analytics"
import { publicEnv } from "@/lib/public-env"

const TRACKED_WEB_VITALS = new Set(["CLS", "FCP", "INP", "LCP", "TTFB"])
const WEB_VITALS_ENDPOINT = "/api/vitals"

type ReportWebVitalMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0]

function reportWebVital(payload: Pick<ReportWebVitalMetric, "id" | "name" | "value" | "delta" | "rating" | "navigationType">) {
  if (typeof window === "undefined") {
    return
  }

  if (publicEnv.NEXT_PUBLIC_ENABLE_SERVER_TELEMETRY !== "true") {
    return
  }

  const body = JSON.stringify(payload)

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const beaconPayload = new Blob([body], { type: "application/json" })

    if (navigator.sendBeacon(WEB_VITALS_ENDPOINT, beaconPayload)) {
      return
    }
  }

  fetch(WEB_VITALS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => null)
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!TRACKED_WEB_VITALS.has(metric.name)) {
      return
    }

    const payload = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
    } satisfies Pick<ReportWebVitalMetric, "id" | "name" | "value" | "delta" | "rating" | "navigationType">

    trackWebVital(payload)
    reportWebVital(payload)
  })

  return null
}
