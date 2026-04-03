import { buildDiscoveryCallMessage, buildFourPointBriefMessage, type CtaDefinition } from "@/lib/cta"

export const GENERAL_BRIEF_CTA: CtaDefinition = {
  channel: "whatsapp",
  durationLabel: "Under 3 minutes",
  label: "Start the 4-Point Brief on WhatsApp",
  prefillMessage: buildFourPointBriefMessage({
    offerPrompt: "What are you selling, launching, or trying to move right now?",
    audiencePrompt: "Who needs to care first?",
    bottleneckPrompt: "What is slowing response today: hook, trust, clarity, or rollout?",
    deadlinePrompt: "When does this need to move?",
  }),
  source: "global-brief",
  whatHappensText:
    "WhatsApp opens with four prompts: offer, audience, bottleneck, and deadline. The first reply comes back with the strongest next move.",
}

export const GENERAL_DISCOVERY_CTA: CtaDefinition = {
  channel: "whatsapp",
  durationLabel: "15 minutes",
  label: "Request the 15-Minute Discovery Call",
  prefillMessage: buildDiscoveryCallMessage(
    "We need to review the offer, the audience, the bottleneck, and the best next move before production starts."
  ),
  source: "global-discovery",
  whatHappensText:
    "WhatsApp opens with a discovery call request. The first reply confirms the agenda, the best slot, and what to prepare before the call.",
}
