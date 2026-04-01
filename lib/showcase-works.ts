export type ShowcaseWork = {
  title: string
  category: string
  client: string
  role: string
  desc: string
  videoSrc: string
  poster?: string | null
  embed?: string
  backgroundColor?: string
}

export const SHOWCASE_WORKS: readonly ShowcaseWork[] = [
  {
    title: "New Year Reel",
    category: "Personal / Film",
    client: "Self-Initiated",
    role: "Direction, VFX & AI Storycraft",
    desc: "A director-led personal film shaped as a mood piece, designed to prove atmosphere can be built without compromise.",
    videoSrc: "/videos/standout.mp4",
    embed: "https://player.vimeo.com/video/1174583531",
    poster: null,
    backgroundColor: "#08090d",
  },
  {
    title: "The Watch the World Wasn't Ready For",
    category: "Social / Ad",
    client: "Jacob & Co x Bugatti",
    role: "Campaign Direction & Visual Finish",
    desc: "A high-contrast luxury campaign frame where mechanical obsession, velocity, and spectacle all arrive in one cut.",
    videoSrc: "/videos/conversions.mp4",
    embed: "https://player.vimeo.com/video/1164910690",
    poster: null,
    backgroundColor: "#090a0f",
  },
  {
    title: "The Art of Precision",
    category: "Luxury / Watch",
    client: "TAG Heuer (Carrera Series)",
    role: "Creative Direction & Visual Strategy",
    desc: "Mechanical poetry where macro detail becomes desire and the finish does as much selling as the story itself.",
    videoSrc: "/videos/premium.mp4",
    embed: "https://player.vimeo.com/video/1178894778",
    poster: "/images/hero/1178894778.jpg",
    backgroundColor: "#07080b",
  },
  {
    title: "Velocity & Vitality",
    category: "Beauty / Motion",
    client: "MISSHA (Time Revolution)",
    role: "Creative Direction & Motion Branding",
    desc: "Beauty direction that feels fast without becoming cheap, turning efficacy, color, and texture into perceived value.",
    videoSrc: "/videos/speed.mp4",
    embed: "https://player.vimeo.com/video/1178894721",
    poster: "/images/hero/1178894721.jpg",
    backgroundColor: "#091019",
  },
  {
    title: "The Digital Aesthetic",
    category: "Social / Vertical",
    client: "Modern Skincare (Social-Ready Campaign)",
    role: "Creative Direction & Social-First Content Strategy",
    desc: "A vertical-first campaign system built to stop the thumb, preserve brand tone, and still feel expensive in motion.",
    videoSrc: "/videos/social-ready.mp4",
    embed: "https://player.vimeo.com/video/1178894835",
    poster: "/images/hero/1178894835.jpg",
    backgroundColor: "#09070e",
  },
] as const
