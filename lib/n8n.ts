import { createWhatsAppUrl } from "@/lib/public-env"
import { pushAnalyticsEvent, trackCtaIntent } from "@/lib/analytics"

export interface ClientIntakePayload extends Record<string, unknown> {
  name?: string
  service?: string
  budget?: string
  message?: string
  source?: string
}

export interface ContentBriefPayload extends Record<string, unknown> {
  brand: string
  brief: string
  tone?: string
  platforms?: string[]
}

export interface OrderIntakePayload extends Record<string, unknown> {
  source: string
  packageName: string
  packagePrice: string
  addOns?: string[]
  total?: string
  currency?: string
}

export interface N8nResponse {
  ok: boolean
  status: number
  data?: unknown
  error?: string
}

export interface N8nWebhookResult {
  ok: boolean
}

interface SessionAttribution {
  source: string
  medium: string
  campaign?: string
  content?: string
  term?: string
  referrer?: string
  landingPage?: string
  landingUrl?: string
  updatedAt: string
}

const ATTRIBUTION_SESSION_KEY = "danverse:attribution:v1"

function getSessionStorage() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function readStoredAttribution(): SessionAttribution | null {
  const storage = getSessionStorage()

  if (!storage) {
    return null
  }

  try {
    const rawValue = storage.getItem(ATTRIBUTION_SESSION_KEY)
    return rawValue ? (JSON.parse(rawValue) as SessionAttribution) : null
  } catch {
    return null
  }
}

function writeStoredAttribution(attribution: SessionAttribution) {
  const storage = getSessionStorage()

  if (!storage) {
    return
  }

  try {
    storage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(attribution))
  } catch {
    // Ignore storage failures so lead capture never blocks the UI.
  }
}

function parseReferrerHost(referrer: string) {
  if (!referrer) {
    return undefined
  }

  try {
    return new URL(referrer).hostname.replace(/^www\./, "") || undefined
  } catch {
    return undefined
  }
}

function buildCurrentAttribution(): Partial<SessionAttribution> {
  if (typeof window === "undefined") {
    return {}
  }

  const searchParams = new URLSearchParams(window.location.search)
  const referrer = typeof document !== "undefined" ? document.referrer : ""
  const referralSource = parseReferrerHost(referrer)

  return {
    source: searchParams.get("utm_source")?.trim() || referralSource,
    medium: searchParams.get("utm_medium")?.trim() || (referralSource ? "referral" : undefined),
    campaign: searchParams.get("utm_campaign")?.trim() || undefined,
    content: searchParams.get("utm_content")?.trim() || undefined,
    term: searchParams.get("utm_term")?.trim() || undefined,
    referrer: referrer || undefined,
    landingPage: window.location.pathname,
    landingUrl: window.location.href,
  }
}

export function persistAttributionFromLocation() {
  if (typeof window === "undefined") {
    return null
  }

  const storedAttribution = readStoredAttribution()
  const currentAttribution = buildCurrentAttribution()

  const attribution: SessionAttribution = {
    source: currentAttribution.source ?? storedAttribution?.source ?? "direct",
    medium:
      currentAttribution.medium ?? storedAttribution?.medium ?? (currentAttribution.referrer ? "referral" : "direct"),
    campaign: currentAttribution.campaign ?? storedAttribution?.campaign,
    content: currentAttribution.content ?? storedAttribution?.content,
    term: currentAttribution.term ?? storedAttribution?.term,
    referrer: storedAttribution?.referrer ?? currentAttribution.referrer,
    landingPage: storedAttribution?.landingPage ?? currentAttribution.landingPage,
    landingUrl: storedAttribution?.landingUrl ?? currentAttribution.landingUrl,
    updatedAt: new Date().toISOString(),
  }

  writeStoredAttribution(attribution)
  return attribution
}

function withMeta(payload: Record<string, unknown>) {
  return {
    ...payload,
    _meta: {
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
      attribution: persistAttributionFromLocation(),
    },
  }
}

export async function postToN8nWebhook(payload: unknown, init?: Omit<RequestInit, "body" | "method">) {
  const headers = new Headers(init?.headers)

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const body = typeof payload === "string" ? payload : JSON.stringify(payload)
  const response = await fetch("/api/webhook", {
    ...init,
    method: "POST",
    headers,
    body,
  })

  const result = (await response.json()) as N8nWebhookResult

  if (!response.ok || !result.ok) {
    throw new Error("Failed to send webhook request")
  }

  return result
}

async function sendWorkflowEvent(
  workflow: string,
  payload: Record<string, unknown>,
  init?: Omit<RequestInit, "body" | "method">
): Promise<N8nResponse> {
  try {
    const result = await postToN8nWebhook(withMeta({ workflow, payload }), init)
    return { ok: true, status: 200, data: result }
  } catch (error) {
    return { ok: false, status: 0, error: String(error) }
  }
}

export async function triggerClientIntake(payload: ClientIntakePayload): Promise<N8nResponse> {
  return sendWorkflowEvent("client-intake", payload)
}

export async function triggerContentPipeline(payload: ContentBriefPayload): Promise<N8nResponse> {
  return sendWorkflowEvent("content-pipeline", payload)
}

export async function triggerLeadCapture(payload: Record<string, unknown>): Promise<N8nResponse> {
  return sendWorkflowEvent("lead-capture", payload)
}

export async function triggerEngagementEvent(
  payload: Record<string, unknown>,
  init?: Omit<RequestInit, "body" | "method">
): Promise<N8nResponse> {
  return sendWorkflowEvent("engagement", payload, init)
}

export function sendEngagementEventBeacon(payload: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return
  }

  pushAnalyticsEvent("engagement_event", payload)

  const envelope = withMeta({ workflow: "engagement", payload })

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const body = new Blob([JSON.stringify(envelope)], { type: "application/json" })

    if (navigator.sendBeacon("/api/webhook", body)) {
      return
    }
  }

  postToN8nWebhook(envelope, { keepalive: true }).catch(() => null)
}

export function fireCTAAndOpenWhatsApp(source: string, waMessage = "") {
  trackCtaIntent(source)
  triggerClientIntake({ source }).catch(() => null)
  window.open(createWhatsAppUrl(waMessage), "_blank", "noopener,noreferrer")
}

export async function triggerOrderIntake(payload: OrderIntakePayload): Promise<void> {
  await sendWorkflowEvent("order", payload)
}
