export type ShowcaseWork = {
  embed: string
  title: string
  category: string
  client: string
  role: string
  desc: string
}

export const SHOWCASE_WORKS: readonly ShowcaseWork[] = [
  {
    embed: "https://player.vimeo.com/video/1174583531",
    title: "New Year's Reel - Personal Cinematic Film",
    category: "Personal / Film",
    client: "Self-Initiated",
    role: "Direction, VFX & AI Storycraft",
    desc: "A personal cinematic project with action beats, large-scale effects, and AI-led visual storytelling.",
  },
  {
    embed: "https://player.vimeo.com/video/1164910690",
    title: "Jacob & Co x Bugatti - Luxury Watch Campaign",
    category: "Social / Ad",
    client: "Jacob & Co x Bugatti",
    role: "Campaign Direction & Visual Finish",
    desc: "A high-end social campaign built around one of the world's most exclusive watch collaborations.",
  },
  {
    embed: "https://player.vimeo.com/video/1178056977",
    title: "Poke Monster - Samurai Sushi Brand Film",
    category: "Brand / Film",
    client: "Poke Monster",
    role: "Brand Film Direction",
    desc: "A cinematic identity film for a Japanese-inspired restaurant built to feel premium from frame one.",
  },
  {
    embed: "https://player.vimeo.com/video/1174570425",
    title: "Alhama - UAE Exhibition Identity Film",
    category: "Product / Reveal",
    client: "Alhama",
    role: "AI Film Direction & Launch Build",
    desc: "A full AI-generated brand film produced in three days for a major exhibition launch in Sharjah.",
  },
  {
    embed: "https://player.vimeo.com/video/1173977023",
    title: "Wizzora - Cinematic Agency Brand Film",
    category: "Identity / Motion",
    client: "Wizzora",
    role: "Creative Direction & Campaign Motion",
    desc: "A cinematic agency film built to scale into a wider multi-brand campaign with millions of views.",
  },
  {
    embed: "https://player.vimeo.com/video/1178894778",
    title: "The Art of Precision",
    category: "Luxury / Watch",
    client: "TAG Heuer (Carrera Series)",
    role: "Creative Direction & Visual Strategy",
    desc: "A high-end commercial piece focused on the intersection of luxury and technical mastery. The visual narrative leans into macro detail, rhythm, and mechanical precision to turn product engineering into emotional desire.",
  },
  {
    embed: "https://player.vimeo.com/video/1178894721",
    title: "Velocity & Vitality",
    category: "Beauty / Motion",
    client: "MISSHA (Time Revolution)",
    role: "Creative Direction & Motion Branding",
    desc: "A fast-beauty campaign built around the idea of visible speed. High-energy transitions and clean, elevated framing translate rapid efficacy into a premium, science-led visual language.",
  },
  {
    embed: "https://player.vimeo.com/video/1178894835",
    title: "The Digital Aesthetic",
    category: "Social / Vertical",
    client: "Modern Skincare (Social-Ready Campaign)",
    role: "Creative Direction & Social-First Content Strategy",
    desc: "A vertical-first social campaign designed for today's fastest platforms. Bold contrast, precise pacing, and attention-led composition keep the work thumb-stopping without losing premium polish.",
  },
] as const
