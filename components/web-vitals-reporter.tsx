"use client"

import { useReportWebVitals } from "next/web-vitals"

const TRACKED_WEB_VITALS = new Set(["CLS", "FID", "LCP", "TTFB"])

type ReportWebVitalMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0]

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

    const body = JSON.stringify(payload)

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", new Blob([body], { type: "application/json" }))
      return
    }

    void fetch("/api/vitals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    })
  })

  return null
}
