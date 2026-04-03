import { createWhatsAppUrl } from "@/lib/public-env"

export type CtaChannel = "whatsapp" | "route" | "email"

export interface CtaDefinition {
  channel: CtaChannel
  durationLabel: string
  href?: string
  label: string
  prefillMessage?: string
  source: string
  whatHappensText: string
}

interface BriefMessageInput {
  audiencePrompt: string
  bottleneckPrompt: string
  deadlinePrompt: string
  offerPrompt: string
}

export function buildFourPointBriefMessage({
  audiencePrompt,
  bottleneckPrompt,
  deadlinePrompt,
  offerPrompt,
}: BriefMessageInput) {
  return [
    "Hi DANVERSE,",
    "",
    "I want to start the 4-point brief.",
    `Offer: ${offerPrompt}`,
    `Audience: ${audiencePrompt}`,
    `Bottleneck: ${bottleneckPrompt}`,
    `Deadline: ${deadlinePrompt}`,
    "",
    "Send the first recommendation and the strongest next step.",
  ].join("\n")
}

export function buildDiscoveryCallMessage(context: string) {
  return [
    "Hi DANVERSE,",
    "",
    "I want the 15-minute discovery call.",
    `Context: ${context}`,
    "Please confirm the agenda, the best time, and what you need from me before the call.",
  ].join("\n")
}

export function resolveCtaHref(definition: CtaDefinition) {
  if (definition.channel === "whatsapp") {
    return createWhatsAppUrl(definition.prefillMessage)
  }

  return definition.href ?? "/"
}
