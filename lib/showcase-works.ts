export type ShowcaseWork = {
  embed: string
  title: string
  category: string
  client: string
  role: string
  desc: string
  poster?: string | null
  backgroundColor?: string
}

export const SHOWCASE_WORKS: readonly ShowcaseWork[] = [
  {
    embed: "https://player.vimeo.com/video/1174583531",
    title: "New Year Reel",
    category: "Personal / Film",
    client: "Self-Initiated",
    role: "Direction, VFX & AI Storycraft",
    desc: "A personal cinematic film built entirely from AI \u2014 no crew, no location, no compromise on atmosphere",
    poster: null,
    backgroundColor: "#080a10",
  },
  {
    embed: "https://player.vimeo.com/video/1164910690",
    title: "The Watch the World Wasn't Ready For",
    category: "Social / Ad",
    client: "Jacob & Co x Bugatti",
    role: "Campaign Direction & Visual Finish",
    desc: "Where Bugatti's engineering meets Jacob's obsession with the impossible",
  },
  {
    embed: "https://player.vimeo.com/video/1178056977",
    title: "Identity Built From the First Bite",
    category: "Brand / Film",
    client: "Poke Monster",
    role: "Brand Film Direction",
    desc: "A brand film that makes a poke bowl feel like a destination worth traveling to",
  },
  {
    embed: "https://player.vimeo.com/video/1174570425",
    title: "Built in 3 Days. Felt Like Months of Work",
    category: "Product / Reveal",
    client: "Alhama",
    role: "AI Film Direction & Launch Build",
    desc: "Brief: a logo. Deadline: 72 hours. Result: a film worthy of the stage in Sharjah",
  },
  {
    embed: "https://player.vimeo.com/video/1173977023",
    title: "The Film That Sells the Agency",
    category: "Identity / Motion",
    client: "Wizzora",
    role: "Creative Direction & Campaign Motion",
    desc: "One film. Five brands. Built to travel across markets and multiply",
  },
  {
    embed: "https://player.vimeo.com/video/1178894778",
    title: "The Art of Precision",
    category: "Luxury / Watch",
    client: "TAG Heuer (Carrera Series)",
    role: "Creative Direction & Visual Strategy",
    desc: "Mechanical poetry \u2014 where engineering becomes desire and macro detail does the selling",
  },
  {
    embed: "https://player.vimeo.com/video/1178894721",
    title: "Velocity & Vitality",
    category: "Beauty / Motion",
    client: "MISSHA (Time Revolution)",
    role: "Creative Direction & Motion Branding",
    desc: "Speed you can see. Efficacy you can feel. Premium you can't ignore",
  },
  {
    embed: "https://player.vimeo.com/video/1178894835",
    title: "The Digital Aesthetic",
    category: "Social / Vertical",
    client: "Modern Skincare (Social-Ready Campaign)",
    role: "Creative Direction & Social-First Content Strategy",
    desc: "Thumb-stopping wasn't the goal \u2014 it was the baseline",
  },
] as const
