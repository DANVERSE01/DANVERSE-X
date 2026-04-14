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
}

export const works: WorkItem[] = [
  {
    slug: "tag-heuer-carrera",
    title: "The Art of Precision",
    year: null,
    date: null,
    category: "Luxury Watch",
    hook: "Mechanical detail staged as desire before any claim enters the frame.",
    solution: "Macro framing and restrained contrast keep precision in command instead of letting the edit do the selling.",
    tags: ["Luxury", "Watch", "Precision"],
    cover: "/images/work/tag-heuer-carrera/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
  },
  {
    slug: "missha-time-revolution",
    title: "Velocity & Vitality",
    year: null,
    date: null,
    category: "Beauty Motion",
    hook: "Beauty motion built to stay fast on mobile without flattening texture.",
    solution: "Vertical rhythm, color discipline, and texture-preserving transitions hold the premium read at mobile speed.",
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    cover: "/images/work/missha-time-revolution/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
  },
  {
    slug: "modern-skincare",
    title: "The Digital Aesthetic",
    year: null,
    date: null,
    category: "Vertical Campaign",
    hook: "A product-first social cut designed to win attention before the first swipe.",
    solution: "One locked vertical frame language carries the reel, cover logic, and rollout system without aesthetic drift.",
    tags: ["Skincare", "Launch System", "Platform Design"],
    cover: "/images/work/modern-skincare/cover.jpg",
    gallery: [],
    featured: true,
    video: null,
    results: null,
  },
]
