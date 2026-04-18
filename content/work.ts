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
    slug: "kova-cosmetics",
    title: "No Soft Launch",
    year: "2026",
    date: "2026-03",
    category: "Beauty Campaign",
    hook: "Launch campaign for a mascara that refused to whisper.",
    solution: "Product-first visuals. Social-native formats. Premium feel at every touchpoint, conversion focus at every frame.",
    challenge: "KOVA needed a launch that would cut through the saturated beauty market without diluting the premium positioning they'd spent years building.",
    approach: "We built a cohesive visual system around bold makeup looks and product close-ups. Every asset was designed for social-first consumption with platform-native aspect ratios and scroll-stopping pacing.",
    tags: ["Beauty", "Product Launch", "Social Campaign"],
    cover: "/images/work/kova-cosmetics/cover.webp",
    gallery: [
      "/images/work/kova-cosmetics/hero-shot.webp",
      "/images/work/kova-cosmetics/model-lifestyle.webp",
      "/images/work/kova-cosmetics/lash-macro.webp",
      "/images/work/kova-cosmetics/duo-showcase.webp",
      "/images/work/kova-cosmetics/brow-application.webp",
      "/images/work/kova-cosmetics/application-closeup.webp",
    ],
    featured: true,
    video: "/videos/optimized/kova-social.mp4",
    results: ["+180% engagement rate", "2.4M campaign reach", "+95% brand recall"],
    metrics: [
      { label: "Engagement Rate", value: "+180%" },
      { label: "Campaign Reach", value: "2.4M" },
      { label: "Brand Recall", value: "+95%" },
    ],
    clientQuote: {
      text: "DANVERSE delivered a campaign that felt luxurious yet accessible. The results exceeded every KPI we set.",
      author: "Sarah M.",
      role: "Marketing Director, KOVA Cosmetics",
    },
    roles: ["Creative Direction", "Campaign Design", "Social Content", "Motion Design"],
    duration: "6 weeks",
    tools: ["After Effects", "Photoshop", "Figma", "Cinema 4D"],
    nextProject: "tag-heuer-carrera",
  },
  {
    slug: "shelby-alexandria",
    title: "Alexandria Dreams",
    year: "2026",
    date: "2026-02",
    category: "Automotive CGI",
    hook: "Widebody Shelby GT350 rendered against Alexandria's Stanley Bridge. The internet noticed.",
    solution: "Photorealistic CGI. American muscle at golden hour on the Mediterranean. The collision created its own audience.",
    challenge: "Create a viral-worthy concept series placing a classic American muscle car in an unexpected Egyptian setting — appealing to both car enthusiasts and luxury lifestyle audiences.",
    approach: "Studio-lit garage renders composited with sunset shots at Stanley Bridge, Alexandria. The widebody kit pushed heritage styling into modern aggressive territory. The location honored the Alexandria-to-GCC positioning.",
    tags: ["Automotive", "CGI", "Event Visualization", "Concept Art"],
    cover: "/images/work/shelby-alexandria/cover.webp",
    gallery: [
      "/images/work/shelby-alexandria/garage-front.webp",
      "/images/work/shelby-alexandria/garage-detail.webp",
      "/images/work/shelby-alexandria/bridge-sunset-1.webp",
      "/images/work/shelby-alexandria/bridge-sunset-2.webp",
      "/images/work/shelby-alexandria/bridge-sunset-3.webp",
      "/images/work/shelby-alexandria/bridge-crowd.webp",
      "/images/work/shelby-alexandria/stanley-golden.webp",
    ],
    featured: true,
    video: null,
    results: ["12M+ organic impressions", "Featured in Top Gear Arabia", "Client acquisition from UAE"],
    metrics: [
      { label: "Organic Impressions", value: "12M+" },
      { label: "Media Features", value: "8" },
      { label: "Client Inquiries", value: "+340%" },
    ],
    clientQuote: {
      text: "The Shelby series put our CGI capabilities on the map. The Alexandria setting was genius — it resonated with the GCC audience in ways we hadn't anticipated.",
      author: "Ahmed K.",
      role: "Founder, DANVERSE",
    },
    roles: ["3D Modeling", "CGI Rendering", "Art Direction", "Compositing"],
    duration: "4 weeks",
    tools: ["Blender", "Octane Render", "Photoshop", "DaVinci Resolve"],
    nextProject: "missha-time-revolution",
  },
  {
    slug: "tag-heuer-carrera",
    title: "Precision, Framed",
    year: "2025",
    date: "2025-01",
    category: "Luxury Watch",
    hook: "Mechanical detail staged as desire before any claim enters the frame.",
    solution: "Macro framing and restrained contrast keep precision in command — the movement speaks through composition, not post-production.",
    challenge: "TAG Heuer needed a digital campaign that conveyed the Carrera's mechanical heritage without falling into the cliché of close-up gear shots that every watchmaker runs.",
    approach: "A visual system built on macro photography with restrained color grading. The movement's precision speaks through composition rather than post-production effects.",
    tags: ["Luxury", "Watch", "Precision"],
    cover: null,
    gallery: [],
    featured: true,
    video: null,
    results: ["+340% engagement rate", "4.2M campaign reach", "+28% retail conversion"],
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
    title: "Speed Without Sacrifice",
    year: "2024",
    date: "2024-09",
    category: "Beauty Motion",
    hook: "Mobile-first motion campaign. Fast enough for the feed, premium enough for the brand.",
    solution: "Vertical rhythm, color discipline, and texture-preserving transitions hold the premium read at mobile scroll speed.",
    challenge: "MISSHA's Time Revolution line needed a motion-first campaign that could compete in fast-scroll environments without flattening the premium positioning.",
    approach: "A vertical-native motion language with precise rhythm control. Every transition preserves product texture at mobile resolution — no frame wasted.",
    tags: ["Beauty", "Motion Branding", "Vertical Campaign"],
    cover: "/images/work/missha-time-revolution/cover.webp",
    gallery: [],
    featured: true,
    video: null,
    results: ["68% view-through rate", "+210% save rate", "-45% cost per view"],
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
    title: "One System, Every Screen",
    year: "2024",
    date: "2024-06",
    category: "Vertical Campaign",
    hook: "Product-first content system. One visual language, every platform.",
    solution: "A locked vertical frame language carries the reel, cover, and rollout — no aesthetic drift across channels.",
    challenge: "Launch a new skincare line in a crowded market with limited budget but maximum impact requirements across every platform.",
    approach: "A modular content system where every asset remixes across platforms while the brand stays locked. Consistency without repetition.",
    tags: ["Skincare", "Launch System", "Platform Design"],
    cover: null,
    gallery: [],
    featured: true,
    video: null,
    results: ["+156% follower growth", "3.8M impressions", "92% positive sentiment"],
    metrics: [
      { label: "Follower Growth", value: "+156%" },
      { label: "Impressions", value: "3.8M" },
      { label: "Positive Sentiment", value: "92%" },
    ],
    roles: ["Brand Strategy", "Visual Design", "Content Production", "Social Management"],
    duration: "10 weeks",
    tools: ["Figma", "After Effects", "Lightroom", "Premiere Pro"],
    nextProject: "kova-cosmetics",
  },
]
