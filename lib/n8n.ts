/**
 * DANVERSE n8n Webhook Client
 *
 * Browser-side only. All fetch calls go from the browser directly to n8n.
 * No Next.js API routes used — compatible with static export (output: 'export').
 *
 * Usage in a client component:
 *   import { triggerClientIntake } from '@/lib/n8n'
 *   await triggerClientIntake({ name: 'Ahmed', service: 'Cinematic Ads' })
 */

// ─── Config ────────────────────────────────────────────────────────────────
// Replace with your actual n8n webhook base URL after Oracle VPS setup.
// Format: https://n8n.danverse.ai
const N8N_BASE = process.env.NEXT_PUBLIC_N8N_BASE_URL ?? "https://n8n.danverse.ai"

function webhookUrl(path: string) {
  return `${N8N_BASE}/webhook/${path}`
}

// ─── Types ──────────────────────────────────────────────────────────────────
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

export interface N8nResponse {
  ok: boolean
  status: number
  data?: unknown
  error?: string
}

// ─── Core fetch ─────────────────────────────────────────────────────────────
async function postWebhook(path: string, payload: Record<string, unknown>): Promise<N8nResponse> {
  try {
    const res = await fetch(webhookUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        _meta: {
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : "",
        },
      }),
    })
    const data = res.ok ? await res.json().catch(() => null) : null
    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return { ok: false, status: 0, error: String(err) }
  }
}

// ─── Workflow 1 — Client Intake ─────────────────────────────────────────────
/**
 * Fires when a visitor clicks "Book a Call" or any primary CTA.
 * n8n workflow: "DANVERSE - Client Intake"
 * Triggers WhatsApp welcome message to the visitor's number (if provided)
 * and sends a qualified brief to the owner's WhatsApp.
 */
export async function triggerClientIntake(payload: ClientIntakePayload): Promise<N8nResponse> {
  return postWebhook("client-intake", payload)
}

// ─── Workflow 2 — AI Content Pipeline ───────────────────────────────────────
/**
 * Submits a content brief for AI processing.
 * Returns: hooks, script, captions, CTAs — delivered via WhatsApp/Google Doc.
 */
export async function triggerContentPipeline(payload: ContentBriefPayload): Promise<N8nResponse> {
  return postWebhook("content-pipeline", payload)
}

// ─── Workflow 3 — Lead Capture ───────────────────────────────────────────────
/**
 * Facebook/Instagram lead form webhook proxy.
 * Fires on any inbound lead to route it to WhatsApp within 5 minutes.
 */
export async function triggerLeadCapture(payload: Record<string, unknown>): Promise<N8nResponse> {
  return postWebhook("lead-capture", payload)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
/**
 * Quick fire-and-forget for CTA buttons.
 * Opens WhatsApp AND pings n8n concurrently — no await needed at call site.
 */
export function fireCTAAndOpenWhatsApp(source: string, waMessage = "") {
  const waNumber = "201207346648"
  const waUrl = waMessage
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
    : `https://wa.me/${waNumber}`

  // Ping n8n (non-blocking)
  triggerClientIntake({ source }).catch(() => null)

  // Open WhatsApp
  window.open(waUrl, "_blank", "noopener,noreferrer")
}

// ─── Order Intake ─────────────────────────────────────────────────────────────
export interface OrderIntakePayload extends Record<string, unknown> {
  source: string
  packageName: string
  packagePrice: string
  addOns?: string[]
  total?: string
  currency?: string
}

/**
 * Fires when a user completes the checkout flow.
 * Posts structured order data to the n8n `order` webhook non-blocking.
 */
export async function triggerOrderIntake(payload: OrderIntakePayload): Promise<void> {
  try {
    await fetch(`${N8N_BASE}/webhook/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        page: typeof window !== "undefined" ? window.location.pathname : "/checkout",
      }),
    })
  } catch {
    // non-blocking — never interrupt checkout UX
  }
}
