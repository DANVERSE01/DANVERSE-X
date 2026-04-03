"use client"

// import Image from "next/image"
import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"
import { ArrowRight } from "lucide-react"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Desire on Screen",
    eyebrow: "Luxury / Macro",
    sub: "Luxury product launches staged so the object holds authority before the copy starts selling.",
    videoSrc: "/videos/premium.mp4",
    posterSrc: "/images/hero/1178894778.jpg",
  },
  {
    title: "Speed That Looks Expensive",
    eyebrow: "Beauty / Velocity",
    sub: "High-speed beauty direction that keeps texture, clarity, and premium control intact on mobile.",
    videoSrc: "/videos/speed.mp4",
    posterSrc: "/images/hero/1178894721.jpg",
  },
  {
    title: "Scroll Stopped. Attention Held.",
    eyebrow: "Social / Vertical",
    sub: "Vertical-first assets built to win the thumb, hold attention, and ship as a usable rollout system.",
    videoSrc: "/videos/social-ready.mp4",
    posterSrc: "/images/hero/1178894835.jpg",
  },
]

const HERO_HEADLINE = ["DIRECTION", "THAT", "LANDS"]
const HERO_SIGNAL_CHIPS = ["Cinematic Ads", "Brand Systems", "Launch Pages", "Content Rollouts"] as const

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero introduction"
      className="section-shell relative min-h-screen flex flex-col justify-center pt-32 overflow-hidden"
    >
      {/* Cinematic Background Architecture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,0,255,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="content-shell relative z-10">
        {/* Signal Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {HERO_SIGNAL_CHIPS.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="accent-chip"
            >
              {chip}
            </motion.span>
          ))}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_var(--color-secondary)]" />
            Open for select launches
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-12">
          {HERO_HEADLINE.map((word, i) => (
            <motion.h1
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`text-gradient block ${i === 2 ? "text-primary" : ""}`}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Subheadline & Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-white/60 leading-relaxed mb-10"
          >
            Director-led strategy and production for brands where the first frame decides whether the message gets heard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <HoverLift>
              <a
                href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary group"
              >
                Start the 4-Point Brief
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </HoverLift>
            
            <HoverLift>
              <a 
                href={resolveCtaHref(GENERAL_DISCOVERY_CTA)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Request the 15-Minute Call
              </a>
            </HoverLift>
          </motion.div>
        </div>

        {/* Media Showcase Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HERO_MEDIA.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
              className={index === 1 ? "md:-translate-y-8" : ""}
            >
              <HeroMediaCard index={index} featured={index === 1} {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
