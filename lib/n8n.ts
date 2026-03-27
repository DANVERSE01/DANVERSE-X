import { createWhatsAppUrl } from "@/lib/env"

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

function withMeta(payload: Record<string, unknown>) {
  return {
    ...payload,
    _meta: {
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
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

async function sendWorkflowEvent(workflow: string, payload: Record<string, unknown>): Promise<N8nResponse> {
  try {
    const result = await postToN8nWebhook(withMeta({ workflow, payload }))
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

export function fireCTAAndOpenWhatsApp(source: string, waMessage = "") {
  triggerClientIntake({ source }).catch(() => null)
  window.open(createWhatsAppUrl(waMessage), "_blank", "noopener,noreferrer")
}

export async function triggerOrderIntake(payload: OrderIntakePayload): Promise<void> {
  await sendWorkflowEvent("order", payload)
}
