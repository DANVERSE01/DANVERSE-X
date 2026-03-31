"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DanverseLogo } from "@/components/danverse-logo"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { createWhatsAppUrl } from "@/lib/env"

const HERO_MEDIA: HeroMediaItem[] = [
  {
    title: "Precision Converts",
    sub: "Luxury detail engineered to drive desire.",
    vimeoId: "1178894835",
  },
  {
    title: "Velocity Performs",
    sub: "Fast-beauty creative built to signal speed and efficacy.",
    vimeoId: "1178894778",
  },
  {
    title: "Social Demand",
    sub: "Vertical-first assets designed to stop scroll and scale attention.",
    vimeoId: "1178894721",
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
        <div className="mx-auto flex max-w-[1120px] flex-col items-center py-10 text-center sm:py-14">
          <motion.div className="relative mb-5" {...reveal(0.04, 18)}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-22%] top-[-8%] h-[96%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 84% 58% at 50% 0%, rgba(61,111,255,0.26) 0%, rgba(255,47,146,0.2) 34%, rgba(217,255,38,0.12) 58%, transparent 78%)",
              }}
            />
            <DanverseLogo size="hero" className="relative" />
          </motion.div>

          <motion.p
            className="section-label mb-5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] text-white/86 shadow-[0_0_28px_rgba(73,107,255,0.08)]"
            {...reveal(0.12, 18)}
          >
            Director-Led Creative Systems
          </motion.p>

          <motion.h1 className="mx-auto max-w-[10.5ch] text-center text-white" {...reveal(0.18, 26)}>
            <span className="block">We Engineer</span>
            <span className="block">Brand Authority.</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-[rgba(184,204,255,0.96)] to-[var(--color-hot-pink-strong)] bg-clip-text text-transparent">
              Frame by Frame.
            </span>
          </motion.h1>

          <motion.p className="body-copy mx-auto mt-6 max-w-[45rem] text-base leading-8 sm:text-lg" {...reveal(0.28, 24)}>
            Built for brands that need control, consistency, and cinematic presence.
            <br className="hidden sm:block" />
            Every asset aligned. Every frame intentional.
          </motion.p>

          <motion.div className="mt-9 flex flex-col items-center gap-4" {...reveal(0.36, 20)}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <HoverLift>
                <Button asChild size="lg" className="cta-primary rounded-full px-8 py-3 font-medium text-white">
                  <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Work With Us
                  </a>
                </Button>
              </HoverLift>
              <HoverLift>
                <Button asChild variant="outline" size="lg" className="cta-secondary rounded-full px-8 py-3 text-white">
                  <a href="#showcase">Explore Projects</a>
                </Button>
              </HoverLift>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {["Visual Systems", "Cinematic Execution", "Brand Control"].map((item) => (
                <motion.span
                  key={item}
                  className="accent-chip px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.48, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-14 w-full" {...reveal(0.46, 18)}>
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
