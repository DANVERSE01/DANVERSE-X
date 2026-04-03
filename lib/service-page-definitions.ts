import { buildDiscoveryCallMessage, buildFourPointBriefMessage, type CtaDefinition } from "@/lib/cta"

interface ServiceHeroDefinition {
  eyebrow: string
  intro: string
  kicker: string
  title: string
  chips: readonly string[]
}

interface ServiceProofCard {
  label: string
  title: string
  description: string
}

interface ServiceProofDefinition {
  heading: string
  intro: string
  cards: readonly ServiceProofCard[]
}

interface ServiceOperatingStep {
  label: string
  title: string
  description: string
}

interface ServiceOperatingModelDefinition {
  heading: string
  intro: string
  steps: readonly ServiceOperatingStep[]
}

interface ServiceArchiveReference {
  href: string
  label: string
}

export interface ServicePageDefinition {
  archiveReference: ServiceArchiveReference
  buyer: string
  cta: {
    primary: CtaDefinition
    secondary: CtaDefinition
  }
  hero: ServiceHeroDefinition
  operatingModel: ServiceOperatingModelDefinition
  proofSection: ServiceProofDefinition
  slug: "cinematic-ads" | "branding" | "websites"
}

export const SERVICE_PAGE_DEFINITIONS: Record<ServicePageDefinition["slug"], ServicePageDefinition> = {
  "cinematic-ads": {
    slug: "cinematic-ads",
    buyer: "Performance marketer",
    hero: {
      eyebrow: "Paid Social Direction",
      kicker: "Hook logic, opening-frame proof, and rollout control for teams that need performance pressure handled fast.",
      title: "Paid-social creative that earns the stop before the offer has to explain itself.",
      intro:
        "For the performance team that needs the first three seconds, the proof structure, and the output pack locked before spend goes live.",
      chips: ["3-second hook logic", "Paid-social rollout pack", "Vertical and cutdown delivery"],
    },
    proofSection: {
      heading: "What gets locked before the first paid asset ships",
      intro:
        "The work starts by deciding what has to win immediately: the opening frame, the audience pressure, the proof sequence, and the export mix.",
      cards: [
        {
          label: "Opening Frame",
          title: "The first stop is designed on purpose.",
          description:
            "The opening frame has one job: stop the thumb and hold authority long enough for the offer to matter.",
        },
        {
          label: "Offer Pressure",
          title: "The offer enters only after the frame has earned attention.",
          description:
            "Proof, pacing, and copy are sequenced so the edit sells the offer instead of rushing into claims.",
        },
        {
          label: "Rollout",
          title: "One direction becomes a usable campaign pack.",
          description:
            "Hook variants, cutdowns, still covers, and ratio-ready exports ship together so buying media is not blocked by creative drift.",
        },
      ],
    },
    operatingModel: {
      heading: "Campaign operating sequence",
      intro:
        "Performance creative is treated like a launch system, not a single edit. Every stage exists to reduce wasted spend and weak handoffs.",
      steps: [
        {
          label: "01",
          title: "Hook audit",
          description:
            "Offer, audience, pressure point, and the first three-second stop are locked before production expands.",
        },
        {
          label: "02",
          title: "Frame build",
          description:
            "The hero cut is built around proof order, pacing, and product authority so every later variation stays on-system.",
        },
        {
          label: "03",
          title: "Paid rollout",
          description:
            "Cutdowns, covers, and export variants ship as one launch-ready pack for paid and organic deployment.",
        },
      ],
    },
    archiveReference: {
      href: "/work#jacob-bugatti",
      label: "See the paid-social case file",
    },
    cta: {
      primary: {
        channel: "whatsapp",
        durationLabel: "Under 3 minutes",
        label: "Start the 4-Point Ads Brief on WhatsApp",
        prefillMessage: buildFourPointBriefMessage({
          offerPrompt: "What is the offer or campaign this creative needs to sell?",
          audiencePrompt: "Who needs to stop and care in the first three seconds?",
          bottleneckPrompt: "What is failing right now: hook rate, retention, CTR, or volume?",
          deadlinePrompt: "When do the first paid-social assets need to be live?",
        }),
        source: "cinematic-ads-primary",
        whatHappensText:
          "Opens WhatsApp with four prompts: offer, audience, bottleneck, and deadline. The first reply comes back with the opening-frame recommendation.",
      },
      secondary: {
        channel: "whatsapp",
        durationLabel: "15 minutes",
        label: "Request the 15-Minute Ads Discovery Call",
        prefillMessage: buildDiscoveryCallMessage(
          "We need to review the offer, audience pressure, bottleneck, and the first paid-social recommendation."
        ),
        source: "cinematic-ads-secondary",
        whatHappensText:
          "Opens WhatsApp with a discovery call request. The first reply confirms the agenda, the slot, and what to prepare before the call.",
      },
    },
  },
  branding: {
    slug: "branding",
    buyer: "Founder",
    hero: {
      eyebrow: "Identity System Direction",
      kicker: "Positioning pressure, identity authority, and rollout control for founders who need the brand to read clearly before they speak.",
      title: "Identity systems that make the company read as established before the first deck slide lands.",
      intro:
        "For the founder who needs the mark, type system, motion grammar, and rollout rules locked tightly enough to survive growth, delegation, and launch pressure.",
      chips: ["Positioning pressure", "Type and motion grammar", "Rollout-ready identity rules"],
    },
    proofSection: {
      heading: "What the identity has to protect after launch",
      intro:
        "The system is built to hold on the homepage, in the sales deck, inside product visuals, on launch assets, and across rushed internal handoffs.",
      cards: [
        {
          label: "Authority",
          title: "The mark has to carry trust immediately.",
          description:
            "The identity is judged on whether it raises perceived value before a founder has to over-explain the company.",
        },
        {
          label: "Control",
          title: "Typography, color, and motion must stay on-model.",
          description:
            "The visual system is defined tightly enough that new assets can be produced later without diluting the brand.",
        },
        {
          label: "Rollout",
          title: "The handoff has to keep working after the studio leaves.",
          description:
            "Guidelines, assets, and usage rules ship together so internal teams can keep the identity sharp under pressure.",
        },
      ],
    },
    operatingModel: {
      heading: "Identity lock, not one-off logo delivery",
      intro:
        "The work moves from market pressure into visual authority, then into a rollout system that keeps the brand coherent when the team starts moving fast.",
      steps: [
        {
          label: "01",
          title: "Positioning pressure",
          description:
            "Category tension, audience trust gap, and the exact business role of the identity are defined before visual exploration starts.",
        },
        {
          label: "02",
          title: "System build",
          description:
            "The chosen direction expands into mark rules, type pairings, motion logic, and the first surfaces the brand has to control.",
        },
        {
          label: "03",
          title: "Rollout handoff",
          description:
            "Core assets, usage logic, and operational guidance ship together so the system survives launch speed and delegation.",
        },
      ],
    },
    archiveReference: {
      href: "/work#modern-skincare",
      label: "See the identity-led case file",
    },
    cta: {
      primary: {
        channel: "whatsapp",
        durationLabel: "Under 3 minutes",
        label: "Start the 4-Point Brand Brief on WhatsApp",
        prefillMessage: buildFourPointBriefMessage({
          offerPrompt: "What is the company, product, or offer this identity has to carry?",
          audiencePrompt: "Who needs to trust this brand faster than they do now?",
          bottleneckPrompt: "What feels broken today: clarity, premium perception, or system consistency?",
          deadlinePrompt: "When does the new identity need to start shipping into the market?",
        }),
        source: "branding-primary",
        whatHappensText:
          "Opens WhatsApp with four prompts: offer, audience, bottleneck, and deadline. The first reply comes back with the strongest identity direction to lock first.",
      },
      secondary: {
        channel: "whatsapp",
        durationLabel: "15 minutes",
        label: "Request the 15-Minute Brand Discovery Call",
        prefillMessage: buildDiscoveryCallMessage(
          "We need to review the company, the audience trust gap, the brand bottleneck, and the identity scope."
        ),
        source: "branding-secondary",
        whatHappensText:
          "Opens WhatsApp with a brand discovery call request. The first reply confirms the agenda, the slot, and what to send before the call.",
      },
    },
  },
  websites: {
    slug: "websites",
    buyer: "Conversion-focused business",
    hero: {
      eyebrow: "Conversion Architecture",
      kicker: "Traffic fit, proof order, objection handling, and action flow for teams that need the page to do commercial work immediately.",
      title: "Launch pages that tell the buyer what to believe, when to trust, and where to act.",
      intro:
        "For the business that needs the page sequence to close the gap between traffic, proof, and action instead of relying on a pretty interface alone.",
      chips: ["Traffic-to-action logic", "Proof sequencing", "Launch-ready handoff"],
    },
    proofSection: {
      heading: "What each page section has to do commercially",
      intro:
        "Every section needs a job: capture intent, build belief, answer friction, and move the buyer to one clear action without waste.",
      cards: [
        {
          label: "Entry",
          title: "The hero has to match the traffic source.",
          description:
            "The first screen is built around the promise, the buyer context, and the next belief needed to keep the scroll moving.",
        },
        {
          label: "Proof",
          title: "Objections are answered in the order they appear.",
          description:
            "Proof blocks, results, and trust signals are placed where doubt would otherwise kill the action.",
        },
        {
          label: "Action",
          title: "The CTA arrives with the right amount of clarity.",
          description:
            "Each action point tells the buyer what happens next, how long it takes, and why this is the right moment to move.",
        },
      ],
    },
    operatingModel: {
      heading: "Launch sequence from traffic to handoff",
      intro:
        "The page is mapped from entry source to final action so the funnel stays disciplined instead of breaking into disconnected sections.",
      steps: [
        {
          label: "01",
          title: "Message architecture",
          description:
            "Traffic source, audience intent, offer tension, and page goal are locked before layout decisions start.",
        },
        {
          label: "02",
          title: "Belief sequence",
          description:
            "The page is structured so every section answers the next commercial question the buyer will ask.",
        },
        {
          label: "03",
          title: "Launch handoff",
          description:
            "The launch ships with the live page, the CTA logic, and the assets the team needs to keep the funnel moving after release.",
        },
      ],
    },
    archiveReference: {
      href: "/work",
      label: "See the launch-ready work archive",
    },
    cta: {
      primary: {
        channel: "whatsapp",
        durationLabel: "Under 3 minutes",
        label: "Start the 4-Point Website Brief on WhatsApp",
        prefillMessage: buildFourPointBriefMessage({
          offerPrompt: "What does this page need to sell, book, or qualify?",
          audiencePrompt: "Who is the buyer arriving on the page and from where?",
          bottleneckPrompt: "What is not converting today: message clarity, proof timing, or action flow?",
          deadlinePrompt: "When does this page need to launch or relaunch?",
        }),
        source: "websites-primary",
        whatHappensText:
          "Opens WhatsApp with four prompts: offer, audience, bottleneck, and deadline. The first reply comes back with the strongest conversion architecture to fix first.",
      },
      secondary: {
        channel: "whatsapp",
        durationLabel: "15 minutes",
        label: "Request the 15-Minute Website Discovery Call",
        prefillMessage: buildDiscoveryCallMessage(
          "We need to review the traffic source, the page goal, the user objections, and the conversion architecture."
        ),
        source: "websites-secondary",
        whatHappensText:
          "Opens WhatsApp with a website discovery call request. The first reply confirms the agenda, the slot, and what to prepare before the call.",
      },
    },
  },
}
