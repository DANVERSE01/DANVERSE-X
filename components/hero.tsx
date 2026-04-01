"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Desire on Screen",
    sub: "Crafted to make luxury feel inevitable",
    vimeoId: "1178894778",
    posterSrc: "/images/hero/1178894778.jpg",
  },
  {
    title: "Speed That Looks Expensive",
    sub: "High-speed creative that never looks rushed",
    vimeoId: "1178894721",
    posterSrc: "/images/hero/1178894721.jpg",
  },
  {
    title: "Scroll Stopped. Attention Held.",
    sub: "Built for the feed. Engineered to convert",
    vimeoId: "1178894835",
    posterSrc: "/images/hero/1178894835.jpg",
  },
]

const HERO_HEADLINE_LINES: ReadonlyArray<{ text: string; accent?: string }> = [
  { text: "We Build the" },
  { text: "Visual Language" },
  { text: "Your Brand Competes", accent: "With" },
]

const HERO_EASE = [0.16, 1, 0.3, 1] as const
const HERO_LINE_DELAYS = [0.08, 0.18, 0.28] as const

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const reveal = (delay: number, y = 20, duration = 0.5) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: HERO_EASE },
        }

  const revealLine = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
          transition: { duration: 0.7, delay, ease: HERO_EASE },
        }

  return (
    <section aria-label="Hero introduction" className="section-shell overflow-hidden pt-4 sm:pt-6">
      <div className="content-shell">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center py-10 text-center sm:py-14 lg:py-16">
          <motion.div className="mb-6 inline-flex items-center gap-3 sm:mb-7" {...reveal(0, 18)}>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent via-white/42 to-white/8" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
              Cinematic Systems. Commercial Results.
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent via-white/42 to-white/8" />
          </motion.div>

          <h1 className="mx-auto max-w-full text-center text-[clamp(3.6rem,7.8vw,6.8rem)] font-extrabold leading-[0.88] tracking-[-0.06em] text-white">
            {HERO_HEADLINE_LINES.map((line, index) => (
              <motion.span
                key={line.text}
                className="block"
                style={{ willChange: "clip-path, opacity" }}
                {...revealLine(HERO_LINE_DELAYS[index] ?? HERO_LINE_DELAYS[HERO_LINE_DELAYS.length - 1])}
              >
                {line.text}{" "}
                {line.accent ? (
                  <span className="bg-gradient-to-r from-[var(--color-electric-blue-strong)] to-[var(--color-hot-pink-strong)] bg-clip-text text-transparent">
                    {line.accent}
                  </span>
                ) : null}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-7 max-w-[42ch] text-[clamp(1rem,1.4vw,1.12rem)] leading-[1.65] text-white/65"
            {...reveal(0.42, 20)}
          >
            Every frame deliberate. Every asset launch-ready
          </motion.p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <motion.div {...reveal(0.52, 16)}>
                <HoverLift>
                  <Button asChild size="lg" className="cta-primary rounded-full px-8 py-3 font-medium text-white">
                    <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Start the Brief
                    </a>
                  </Button>
                </HoverLift>
              </motion.div>

              <motion.div {...reveal(0.6, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cta-secondary rounded-full px-8 py-3 text-white"
                  >
                    <a href="#showcase">See the Work</a>
                  </Button>
                </HoverLift>
              </motion.div>
            </div>
          </div>

          <div className="mt-14 w-full">
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <motion.div key={item.title} className="h-full" {...reveal(0.62 + index * 0.1, 24)}>
                  <HeroMediaCard index={index} {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
