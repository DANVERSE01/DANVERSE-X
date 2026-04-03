export interface CaseStudy {
  after: string
  broken: string
  challenge: string
  client: string
  decision: string
  deliverables: readonly string[]
  engagementContext: string
  focus: string
  image: string
  note: string
  proofPoints: readonly string[]
  slug: string
  summary: string
  tags: readonly string[]
  title: string
  built: string
}

export const FEATURED_CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "jacob-bugatti",
    title: "The Watch the World Wasn't Ready For",
    client: "Jacob & Co x Bugatti",
    image: "/images/showcase/jacob-bugatti.jpg",
    summary:
      "A luxury launch built to hold speed, obsession, and product authority without letting spectacle swallow the watch.",
    challenge: "Translate mechanical intensity into a social-first campaign system that still feels expensive and controlled.",
    focus: "Macro detail, contrast discipline, and a hook structure that lets the product carry authority before copy ever does.",
    deliverables: ["Portrait launch master", "Thumb-stop opening hooks", "Premium finish system", "Still-frame campaign covers"],
    tags: ["Luxury", "Social Film", "Macro Direction"],
    note: "The campaign worked because the product stayed in control of the frame instead of fighting with the edit.",
    broken:
      "The raw material had spectacle, but the social-first version risked turning precision into noise and the watch into a prop.",
    decision:
      "Strip the copy back, lead with mechanical obsession, and let macro detail prove rarity before the campaign asks for attention.",
    built:
      "A launch master, opening-hook variants, still covers, and a premium finish system the team could use across paid and launch rollout.",
    after:
      "The client left with one approved visual standard that could move from launch post to paid cut to internal review without reopening direction.",
    proofPoints: [
      "Launch master approved as the reference cut for rollout",
      "Macro detail rules carried into still covers and paid cutdowns",
      "Opening-hook variants delivered in one usable pack",
      "Luxury finish standard held across every exported format",
    ],
    engagementContext:
      "Luxury launch campaign for a product where the first frame had to sell precision, speed, and rarity at the same time.",
  },
  {
    slug: "missha-time-revolution",
    title: "Velocity & Vitality",
    client: "MISSHA (Time Revolution)",
    image: "/images/showcase/missha-time-revolution.jpg",
    summary:
      "Beauty motion built to stay fast on mobile while keeping texture, polish, and product clarity intact through every cut.",
    challenge: "Create a beauty campaign that moves quickly on mobile while preserving polish, texture, and product clarity.",
    focus: "Texture-led framing, controlled color rhythm, and vertical-first pacing tuned for launch sequences and paid social.",
    deliverables: ["Vertical hero cut", "Beauty motion variants", "Format-adapted exports", "Launch-ready product stills"],
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    note: "Every motion choice had to increase perceived value, not just speed up the reel.",
    broken:
      "The brand needed velocity for mobile launch formats, but fast edits were stripping away the product texture that made the offer convincing.",
    decision:
      "Build around texture, color control, and vertical pacing so the campaign could move quickly without losing finish or clarity.",
    built:
      "A hero vertical cut, multiple beauty motion variants, product stills, and export-ready versions for the rollout stack.",
    after:
      "The launch team had one motion language for reels, cutdowns, and still support assets instead of rebuilding the look for every format.",
    proofPoints: [
      "Vertical hero cut established the reference pace for the campaign",
      "Product texture held across fast motion transitions",
      "Format-ready exports shipped with the hero and cutdowns together",
      "Still support assets matched the motion finish instead of drifting off-system",
    ],
    engagementContext:
      "Beauty launch where speed mattered, but the product still had to read as premium and tactile on small screens.",
  },
  {
    slug: "modern-skincare",
    title: "The Digital Aesthetic",
    client: "Modern Skincare",
    image: "/images/showcase/modern-skincare.jpg",
    summary:
      "A social-first campaign system built to scale one visual standard across launch reels, covers, and rollout assets without quality drift.",
    challenge: "Build a repeatable visual system for social launch moments without losing coherence across multiple outputs.",
    focus: "Hook-first structure, platform-aware pacing, and a frame language that can scale from one hero asset into a rollout pack.",
    deliverables: ["Launch reel", "Story-sized cutdowns", "Cover frame system", "Rollout-ready output pack"],
    tags: ["Skincare", "Launch System", "Platform Design"],
    note: "The advantage came from system control: one line of direction that could keep shipping without degradation.",
    broken:
      "The brand needed more than one hero asset, but every extra format risked pushing the launch away from a consistent premium standard.",
    decision:
      "Lock a hook-first frame language, then build the rollout pack around repeatable cover rules, pacing discipline, and platform-aware crops.",
    built:
      "A launch reel, story cutdowns, cover frame rules, and a reusable output pack ready for repeated social release.",
    after:
      "The team gained a rollout system that could expand into new launch moments without redoing the visual language every time.",
    proofPoints: [
      "Launch reel became the reference point for later rollout assets",
      "Cover frame rules shipped with the motion pack",
      "Story cutdowns matched the same hook and finish standard",
      "The system could be reused without rebuilding the direction from zero",
    ],
    engagementContext:
      "Social-first skincare launch that needed scalable rollout control instead of one good-looking hero asset and a weak follow-through.",
  },
] as const
