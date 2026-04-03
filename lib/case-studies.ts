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
      "A luxury launch where precision had to read as rarity on fast-moving social platforms without sacrificing finish quality.",
    challenge: "Luxury product photography contains mechanical density, but compressing that into platform-native formats risks losing product authority and perceived value.",
    focus: "Macro framing, opening-frame authority, and pacing that lets the engineering detail carry trust before copy or claims ever appear.",
    deliverables: ["Hero launch cut", "Opening-hook variants", "Product stills system", "Format-adapted exports (portrait, square, reels)"],
    tags: ["Luxury", "Social Film", "Macro Direction"],
    note: "The campaign worked because the product stayed in control of the frame instead of fighting with the edit.",
    broken:
      "Raw mechanical footage has depth, but translating that into 3-second social hooks without flattening the texture is the bottleneck.",
    decision:
      "Build the hero cut around macro framing and edge contrast so mechanical authority reads immediately before any paid optimization can weaken it.",
    built:
      "A locked hero cut with macro detail rules, opening-hook variants optimized for scroll-stopping, still covers that don't need supporting copy, and export-ready versions for paid rollout.",
    after:
      "The reference direction held across all rollout: one macro-led aesthetic moved from hero launch to paid cutdowns to internal reviews without creative drift or reopening.",
    proofPoints: [
      "Reference cut approved for launch and paid rollout without revision",
      "Macro detail rules applied across stills, cutdowns, and paid derivatives",
      "All opening-hook variants shipped as one finished pack",
      "Export system allowed paid-social deployment the same day as hero launch",
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
    challenge: "Mobile beauty content needs fast motion to hold attention, but acceleration can erode product texture—the key selling point for luxury skincare.",
    focus: "Vertical-first composition, color control, and motion rhythm that preserves texture perception while optimizing for mobile engagement speeds.",
    deliverables: ["Vertical hero reel", "Mobile motion variants", "Product detail stills", "Multi-format export system"],
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    note: "Every motion choice had to increase perceived value, not just speed up the reel.",
    broken:
      "Mobile algorithms reward aggressive pacing and short clips, but beauty products require visible texture and detailed finish to justify premium pricing.",
    decision:
      "Anchor the motion around color transitions and micro-details first, then pace the cuts to work with platform dynamics—not against product perception.",
    built:
      "A reference vertical cut with locked motion rhythm, texture-preservation rules, motion variants for different launch phases, and stills that reinforce product detail.",
    after:
      "The launch could repeat across reels, cutdowns, and still campaigns without reinventing the motion language or losing finish quality.",
    proofPoints: [
      "Reference vertical cut locked and approved for all mobile variants",
      "Texture detail rules ported into motion transitions and still stills",
      "Mobile motion variants shipped as one coordinated pack",
      "System reusable for subsequent product launches without creative redesign",
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
      "A social launch system built around repeatable rules so one direction could scale across reels, covers, and rollout assets instead of degrading with repetition.",
    challenge: "Social launches need multiple formats and variations, but every new cut risked pushing the aesthetic away from the original premium standard.",
    focus: "Hook-first framing, repeatable cover logic, and platform-specific crops that all branch from one locked reference direction.",
    deliverables: ["Launch reel", "Platform-specific cutdowns", "Social cover system", "Repeatable ruleset for growth"],
    tags: ["Skincare", "Launch System", "Platform Design"],
    note: "The advantage came from system control: one line of direction that could keep shipping without degradation.",
    broken:
      "Multiple social formats and launch moments require flexibility, but each new variation risked drifting off the original aesthetic instead of strengthening it.",
    decision:
      "Lock a frame language and cover rules, then make the system strict: the same direction applied across every platform variant without reimagining.",
    built:
      "A reference reel with locked motion logic, repeatable cover frame rules, platform-specific crop variations, and guidelines for future launch moments.",
    after:
      "The system became the asset: one direction shipped into reels, stories, feed covers, and paid without requiring new creative each time.",
    proofPoints: [
      "Reference reel approved as the standard for all variations",
      "Cover frame rules applied consistently across platform variants",
      "System deployed across initial launch and multiple subsequent releases",
      "Internal teams extended the system without external creative direction",
    ],
    engagementContext:
      "Social-first skincare launch that needed scalable rollout control instead of one good-looking hero asset and a weak follow-through.",
  },
] as const
