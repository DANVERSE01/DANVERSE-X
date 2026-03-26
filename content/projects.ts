export type ProjectMediaType = "video" | "image"

export interface Project {
  id: string
  title: string
  category: string
  cover: string
  beats: string[]
  outcome?: string
  ctaLabel?: string
  hook: string
  mediaType: ProjectMediaType
}

export const projects: Project[] = [
  {
    id: "kinetic-launch",
    title: "Kinetic Launch",
    category: "Cinematic Ads",
    cover: "/videos/conversions.mp4",
    mediaType: "video",
    hook: "A velocity-first launch film tuned for scroll-stop retention.",
    outcome: "Lifted the product story into a 15-second performance narrative.",
    ctaLabel: "Build a launch film",
    beats: [
      "Cold open on texture and sound design before the product appears.",
      "Momentum shift into proof frames, interface moments, and product close-ups.",
      "Final lockup lands on a conversion-focused CTA with a branded afterglow.",
    ],
  },
  {
    id: "social-velocity",
    title: "Social Velocity",
    category: "Performance Content System",
    cover: "/videos/social-ready.mp4",
    mediaType: "video",
    hook: "A modular content engine built for paid social, retargeting, and remarketing.",
    outcome: "Turned one production cycle into a repeatable reel and ad system.",
    ctaLabel: "Design my content system",
    beats: [
      "Map hero claim, pain point, and proof into reusable narrative beats.",
      "Cut variants for hooks, testimonials, and direct-response endings.",
      "Package the system for weekly deployment without rebuilding from zero.",
    ],
  },
  {
    id: "midnight-interface",
    title: "Midnight Interface",
    category: "Landing Experience",
    cover: "/images/intuitive-1.webp",
    mediaType: "image",
    hook: "A polished launch page where motion, copy, and UI behave like one system.",
    outcome: "Compressed strategy, visual identity, and conversion UI into one scene.",
    ctaLabel: "Shape my landing page",
    beats: [
      "Lead with a tension-building hero that makes the offer legible instantly.",
      "Introduce proof panels and interface layers with editorial pacing.",
      "Resolve the journey into an offer stack with one clear action.",
    ],
  },
  {
    id: "brand-memory",
    title: "Brand Memory",
    category: "Identity System",
    cover: "/images/top-rated-2.webp",
    mediaType: "image",
    hook: "A visual world designed to feel premium before a word is spoken.",
    outcome: "Built an identity language that carries through film, web, and social.",
    ctaLabel: "Define my brand world",
    beats: [
      "Establish signature materials, contrast, and motion language.",
      "Apply the system across hero stills, campaign surfaces, and sales pages.",
      "Leave the team with a brand kit that scales without aesthetic drift.",
    ],
  },
]
