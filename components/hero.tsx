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

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const reveal = (delay: number, y = 28) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section aria-label="Hero introduction" className="section-shell overflow-hidden pt-4 sm:pt-6">
      <div className="content-shell">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center py-10 text-center sm:py-14 lg:py-16">
          <motion.p
            className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-[rgba(8,12,20,0.48)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/72 backdrop-blur-xl"
            {...reveal(0.04, 18)}
          >
            Cinematic Systems. Commercial Results.
          </motion.p>

          <motion.h1
            className="mx-auto max-w-[14ch] text-center text-[clamp(3.8rem,8.2vw,6.9rem)] leading-[0.87] tracking-[-0.065em] text-white"
            {...reveal(0.12, 24)}
          >
            We Build the Visual Language Your Brand Competes With
          </motion.h1>

          <motion.p
            className="body-copy mx-auto mt-7 max-w-[44rem] text-[clamp(1.02rem,1.45vw,1.16rem)] leading-[1.7] text-white/72"
            {...reveal(0.24, 22)}
          >
            Every frame deliberate. Every asset launch-ready.
          </motion.p>

          <motion.div className="mt-9 flex flex-col items-center gap-4" {...reveal(0.32, 18)}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <HoverLift>
                <Button asChild size="lg" className="cta-primary rounded-full px-8 py-3 font-medium text-white">
                  <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Start the Brief
                  </a>
                </Button>
              </HoverLift>
              <HoverLift>
                <Button asChild variant="outline" size="lg" className="cta-secondary rounded-full px-8 py-3 text-white">
                  <a href="#showcase">See the Work</a>
                </Button>
              </HoverLift>
            </div>
          </motion.div>

          <motion.div className="mt-14 w-full" {...reveal(0.42, 16)}>
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <HeroMediaCard key={item.title} index={index} {...item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
