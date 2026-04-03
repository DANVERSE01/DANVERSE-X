"use client"

import * as Sentry from "@sentry/nextjs"
import { useReportWebVitals } from "next/web-vitals"
import { trackWebVital } from "@/lib/analytics"

const TRACKED_WEB_VITALS = new Set(["CLS", "FCP", "INP", "LCP", "TTFB"])

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

    trackWebVital(payload)

    Sentry.captureMessage(`Web Vital: ${metric.name}`, {
      extra: payload,
      level: metric.rating === "poor" ? "warning" : "info",
      tags: {
        metric: metric.name,
        navigationType: metric.navigationType ?? "unknown",
        rating: metric.rating ?? "unknown",
      },
    })
  })

  return null
}
