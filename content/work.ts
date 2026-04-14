export interface WorkMetric {
  label: string
  value: string
}

export interface ClientQuote {
  text: string
  author: string
  role: string
}

export interface WorkItem {
  slug: string
  title: string
  year: string | null
  date: string | null
  category: string | null
  hook: string | null
  solution: string | null
  tags: string[]
  cover: string | null
  gallery: string[]
  featured: boolean
  video?: string | null
  results?: string[] | null
  challenge?: string | null
  approach?: string | null
  metrics?: WorkMetric[]
  clientQuote?: ClientQuote | null
  roles?: string[]
  duration?: string | null
  tools?: string[]
  nextProject?: string | null
}

export const works: WorkItem[] = [
  {
    slug: "tag-heuer-carrera",
    title: "The Art of Precision",
    year: "2025",
    date: "2025-01",
    category: "Luxury Watch",
    hook: "Mechanical detail staged as desire before any claim enters the frame.",
    solution: "Macro framing and restrained contrast keep precision in command instead of letting the edit do the selling.",
    challenge: "TAG Heuer needed a digital campaign that conveyed the Carrera's mechanical heritage without falling into the cliché of close-up gear shots. The campaign had to work across social, web, and retail display simultaneously.",
    approach: "We built a visual system around macro photography with restrained color grading — letting the movement's precision speak through composition rather than post-production tricks. Every frame was designed to be a standalone print ad.",
    tags: ["Luxury", "Watch", "Precision"],
    cover: "/images/work/tag-heuer-carrera/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
    metrics: [
      { label: "Engagement Rate", value: "+340%" },
      { label: "Campaign Reach", value: "4.2M" },
      { label: "Retail Conversion", value: "+28%" },
    ],
    clientQuote: {
      text: "DANVERSE understood that luxury is restraint. They delivered a campaign that elevated the Carrera without ever raising its voice.",
      author: "Laurent M.",
      role: "Regional Brand Director, TAG Heuer",
    },
    roles: ["Creative Direction", "Campaign Design", "Motion Design", "Social Content"],
    duration: "8 weeks",
    tools: ["After Effects", "Cinema 4D", "Figma", "Lightroom"],
    nextProject: "missha-time-revolution",
  },
  {
    slug: "missha-time-revolution",
    title: "Velocity & Vitality",
    year: "2024",
    date: "2024-09",
    category: "Beauty Motion",
    hook: "Beauty motion built to stay fast on mobile without flattening texture.",
    solution: "Vertical rhythm, color discipline, and texture-preserving transitions hold the premium read at mobile speed.",
    challenge: "MISSHA's Time Revolution line needed a motion-first campaign that could compete in fast-scroll environments like Instagram Reels and TikTok — all while preserving the product's premium positioning and texture fidelity.",
    approach: "We developed a vertical-native motion language with precise rhythm control. Every transition preserves product texture at mobile resolution. Color grading was locked to a 3-tone system that reads premium even at 360p.",
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    cover: "/images/work/missha-time-revolution/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
    metrics: [
      { label: "View-Through Rate", value: "68%" },
      { label: "Save Rate", value: "+210%" },
      { label: "Cost per View", value: "-45%" },
    ],
    clientQuote: {
      text: "The motion work felt effortless on screen but the strategy behind it was meticulous. Our best-performing campaign to date.",
      author: "Yuna K.",
      role: "Digital Marketing Lead, MISSHA MENA",
    },
    roles: ["Motion Design", "Art Direction", "Social Strategy", "Content Production"],
    duration: "6 weeks",
    tools: ["After Effects", "Premiere Pro", "Figma", "DaVinci Resolve"],
    nextProject: "modern-skincare",
  },
  {
    slug: "modern-skincare",
    title: "The Digital Aesthetic",
    year: "2024",
    date: "2024-06",
    category: "Vertical Campaign",
    hook: "A product-first social cut designed to win attention before the first swipe.",
    solution: "One locked vertical frame language carries the reel, cover logic, and rollout system without aesthetic drift.",
    challenge: "A challenger skincare brand entering the GCC market needed a complete social launch system — from reel templates to cover logic to rollout cadence — that could scale without diluting the aesthetic.",
    approach: "We designed a single vertical frame language that locks product positioning, typography, and color across every content format. The system auto-generates cover variants and maintains visual cohesion at rollout scale.",
    tags: ["Skincare", "Launch System", "Platform Design"],
    cover: "/images/work/modern-skincare/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
    metrics: [
      { label: "Content Pieces", value: "120+" },
      { label: "Brand Recall", value: "+52%" },
      { label: "Launch Engagement", value: "3.8x avg" },
    ],
    clientQuote: {
      text: "They gave us a system, not just content. Six months later we're still using the same framework and it still looks fresh.",
      author: "Sara A.",
      role: "Founder & CEO",
    },
    roles: ["Brand System Design", "Content Strategy", "Social Design", "Launch Planning"],
    duration: "10 weeks",
    tools: ["Figma", "After Effects", "Notion", "Lightroom"],
    nextProject: "tag-heuer-carrera",
  },
]
