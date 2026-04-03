export interface CaseStudy {
  challenge: string
  client: string
  deliverables: readonly string[]
  focus: string
  image: string
  note: string
  slug: string
  summary: string
  tags: readonly string[]
  title: string
}

export const FEATURED_CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "jacob-bugatti",
    title: "The Watch the World Wasn't Ready For",
    client: "Jacob & Co x Bugatti",
    image: "/images/showcase/jacob-bugatti.jpg",
    summary:
      "Luxury storytelling built around speed, spectacle, and product obsession without turning the frame into noise.",
    challenge: "Translate mechanical intensity into a social-first campaign system that still feels expensive and controlled.",
    focus: "Macro detail, contrast discipline, and a hook structure that lets the product carry authority before copy ever does.",
    deliverables: ["Portrait launch master", "Thumb-stop opening hooks", "Premium finish system", "Still-frame campaign covers"],
    tags: ["Luxury", "Social Film", "Macro Direction"],
    note: "The important shift was not more motion. It was more restraint around the moments that already held desire.",
  },
  {
    slug: "missha-time-revolution",
    title: "Velocity & Vitality",
    client: "MISSHA (Time Revolution)",
    image: "/images/showcase/missha-time-revolution.jpg",
    summary:
      "Beauty motion built to feel energetic, tactile, and premium at the same time across fast-moving formats.",
    challenge: "Create a beauty campaign that moves quickly on mobile while preserving polish, texture, and product clarity.",
    focus: "Texture-led framing, controlled color rhythm, and vertical-first pacing tuned for launch sequences and paid social.",
    deliverables: ["Vertical hero cut", "Beauty motion variants", "Format-adapted exports", "Launch-ready product stills"],
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    note: "Every transition had one job: increase perceived value, not simply increase speed.",
  },
  {
    slug: "modern-skincare",
    title: "The Digital Aesthetic",
    client: "Modern Skincare",
    image: "/images/showcase/modern-skincare.jpg",
    summary:
      "A vertical campaign system designed to feel native to the scroll while still carrying premium brand discipline.",
    challenge: "Build a repeatable visual system for social launch moments without losing coherence across multiple outputs.",
    focus: "Hook-first structure, platform-aware pacing, and a frame language that can scale from one hero asset into a rollout pack.",
    deliverables: ["Launch reel", "Story-sized cutdowns", "Cover frame system", "Rollout-ready output pack"],
    tags: ["Skincare", "Launch System", "Platform Design"],
    note: "The win was systemization: one visual standard that could scale across formats without a quality drop.",
  },
] as const
