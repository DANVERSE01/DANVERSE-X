declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

interface AnalyticsPayload extends Record<string, unknown> {
  event?: string
}

interface WebVitalPayload {
  delta?: number
  id: string
  name: string
  navigationType?: string
  rating?: string
  value: number
}

export function pushAnalyticsEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event,
    ...payload,
  })
}

export function trackCtaIntent(source: string, destination = "whatsapp") {
  pushAnalyticsEvent("cta_click", {
    destination,
    source,
  })
}

export function trackPwaEvent(event: string, payload: AnalyticsPayload = {}) {
  pushAnalyticsEvent(event, payload)
}

export function trackWebVital(metric: WebVitalPayload) {
  pushAnalyticsEvent("web_vital", {
    metric_delta: metric.delta ? Number(metric.delta.toFixed(2)) : undefined,
    metric_id: metric.id,
    metric_name: metric.name,
    metric_navigation_type: metric.navigationType,
    metric_rating: metric.rating ?? "unknown",
    metric_value: Number(metric.value.toFixed(2)),
  })
}
