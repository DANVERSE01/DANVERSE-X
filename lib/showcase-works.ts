export type ShowcaseWork = {
  slug: string
  title: string
  category: string
  client: string
  role: string
  desc: string
  videoSrc: string
  poster: string
  fit?: "contain" | "cover"
  objectPosition?: string
  backgroundColor?: string
}

export const SHOWCASE_WORKS: readonly ShowcaseWork[] = [
  {
    slug: "new-year-reel",
    title: "New Year Reel",
    category: "Personal Film",
    client: "Self-Initiated",
    role: "Direction, VFX & AI Storycraft",
    desc: "A director-led mood piece built to prove atmosphere can still feel premium, deliberate, and commercially sharp.",
    videoSrc: "/videos/standout.mp4",
    poster: "/images/showcase/new-year-reel.jpg",
    fit: "contain",
    objectPosition: "center center",
    backgroundColor: "#07090d",
  },
  {
    slug: "jacob-bugatti",
    title: "The Watch the World Wasn't Ready For",
    category: "Luxury Social",
    client: "Jacob & Co x Bugatti",
    role: "Campaign Direction & Visual Finish",
    desc: "A high-contrast watch campaign where velocity, obsession, and spectacle are framed with more restraint than noise.",
    videoSrc: "/videos/conversions.mp4",
    poster: "/images/showcase/jacob-bugatti.jpg",
    fit: "contain",
    objectPosition: "center center",
    backgroundColor: "#08090d",
  },
  {
    slug: "tag-heuer-carrera",
    title: "The Art of Precision",
    category: "Luxury Watch",
    client: "TAG Heuer (Carrera Series)",
    role: "Creative Direction & Visual Strategy",
    desc: "Mechanical detail staged as desire, with macro finish and product weight doing as much selling as the story itself.",
    videoSrc: "/videos/premium.mp4",
    poster: "/images/showcase/tag-heuer-carrera.jpg",
    fit: "contain",
    objectPosition: "center center",
    backgroundColor: "#06080b",
  },
  {
    slug: "missha-time-revolution",
    title: "Velocity & Vitality",
    category: "Beauty Motion",
    client: "MISSHA (Time Revolution)",
    role: "Creative Direction & Motion Branding",
    desc: "Beauty motion that feels fast without becoming cheap, turning color, texture, and clarity into perceived value.",
    videoSrc: "/videos/speed.mp4",
    poster: "/images/showcase/missha-time-revolution.jpg",
    fit: "contain",
    objectPosition: "center center",
    backgroundColor: "#081018",
  },
  {
    slug: "modern-skincare",
    title: "The Digital Aesthetic",
    category: "Vertical Campaign",
    client: "Modern Skincare",
    role: "Creative Direction & Social-First Content Strategy",
    desc: "A vertical-first campaign system designed to win attention quickly while still preserving brand control and finish.",
    videoSrc: "/videos/social-ready.mp4",
    poster: "/images/showcase/modern-skincare.jpg",
    fit: "contain",
    objectPosition: "center center",
    backgroundColor: "#09070d",
  },
] as const
