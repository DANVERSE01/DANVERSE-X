"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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

const HERO_HEADLINE_LINES: ReadonlyArray<{ text: string; accent?: string }> = [{ text: "We Build Visual Advantage" }]

const HERO_EASE = [0.16, 1, 0.3, 1] as const
const HERO_LINE_DELAYS = [0.08, 0.18, 0.28] as const

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)
  const logoDriftRef = useRef<HTMLDivElement | null>(null)
  const logoBaseRef = useRef<HTMLDivElement | null>(null)
  const logoGlowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const logoDrift = logoDriftRef.current
    const logoBase = logoBaseRef.current
    const logoGlow = logoGlowRef.current

    if (!hero || !logoDrift || !logoBase || !logoGlow || prefersReducedMotion) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(logoDrift, {
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      })
      gsap.set([logoBase, logoGlow], {
        transformOrigin: "50% 50%",
        willChange: "transform, opacity, filter",
      })

      const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      })

      parallaxTimeline
        .to(
          logoDrift,
          {
            y: () => window.innerHeight * 0.075,
            scale: 1.028,
            ease: "none",
          },
          0
        )
        .to(
          logoBase,
          {
            y: () => window.innerHeight * 0.032,
            scale: 1.014,
            opacity: 0.24,
            ease: "none",
          },
          0
        )
        .to(
          logoGlow,
          {
            y: () => window.innerHeight * 0.11,
            scale: 1.05,
            opacity: 0.1,
            filter: "blur(18px) saturate(1.04) brightness(0.98)",
            ease: "none",
          },
          0
        )
    }, hero)

    return () => {
      context.revert()
    }
  }, [prefersReducedMotion])

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
    <section
      ref={heroRef}
      aria-label="Hero introduction"
      className="section-shell relative overflow-x-hidden pt-3 sm:pt-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="content-shell relative h-[500px] sm:h-[720px] lg:h-[780px]">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(88vw,460px)] w-[min(88vw,460px)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(82vw,820px)] sm:w-[min(82vw,820px)] lg:h-[min(64vw,920px)] lg:w-[min(64vw,920px)]"
            style={{ transformStyle: "preserve-3d" }}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.94, y: 22 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 0.95, delay: 0.16, ease: HERO_EASE },
                })}
          >
            <div ref={logoDriftRef} className="relative h-full w-full">
              <div
                ref={logoGlowRef}
                className="absolute inset-0 scale-[1.015] opacity-[0.05] sm:opacity-[0.07] lg:opacity-[0.08]"
                style={{
                  filter: "blur(16px) saturate(1.02) brightness(0.98)",
                }}
              >
                <Image
                  src="/images/hero/hero-backdrop-logo.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 126vw, (max-width: 1024px) 104vw, 82vw"
                  className="object-contain"
                />
              </div>

              <div
                ref={logoBaseRef}
                className="absolute inset-0 opacity-[0.18] sm:opacity-[0.2] lg:opacity-[0.22]"
                style={{
                  filter:
                    "saturate(1.05) contrast(1.06) brightness(0.96) drop-shadow(0 14px 36px rgba(5, 8, 16, 0.18))",
                }}
              >
                <Image
                  src="/images/hero/hero-backdrop-logo.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 126vw, (max-width: 1024px) 104vw, 82vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 44%, rgba(6, 8, 14, 0.04) 0%, rgba(6, 8, 14, 0.12) 36%, rgba(6, 8, 14, 0.22) 62%, transparent 82%)",
            }}
          />
        </div>
      </div>

      <div className="content-shell relative z-[2]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center py-8 text-center sm:py-14 lg:py-16">
          <motion.div className="mb-4 inline-flex items-center gap-2 sm:mb-7 sm:gap-3" {...reveal(0, 18)}>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent via-white/42 to-white/8" />
            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/60 sm:text-[10px] sm:tracking-[0.28em]">
              Cinematic Systems. Commercial Results.
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent via-white/42 to-white/8" />
          </motion.div>

          <div className="relative mx-auto flex w-full max-w-full justify-center px-1">
            <h1 className="relative z-10 mx-auto w-full max-w-full text-center text-[clamp(2.05rem,9.6vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.055em] text-white [overflow-wrap:anywhere] sm:text-[clamp(3.3rem,8vw,5.8rem)] sm:leading-[0.9] sm:tracking-[-0.06em] lg:text-[clamp(4.8rem,6.2vw,6.8rem)]">
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
          </div>

          <motion.p
            className="mx-auto mt-5 max-w-[32ch] text-[clamp(0.96rem,4.2vw,1.12rem)] leading-[1.6] text-white/65 sm:mt-7 sm:max-w-[42ch] sm:leading-[1.65]"
            {...reveal(0.42, 20)}
          >
            Every frame deliberate. Every asset launch-ready
          </motion.p>

          <div className="mt-8 flex w-full max-w-[18rem] flex-col items-center gap-4 sm:mt-9 sm:max-w-none">
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <motion.div className="w-full sm:w-auto" {...reveal(0.52, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    size="lg"
                    className="cta-primary w-full rounded-full px-8 py-3 font-medium text-white sm:w-auto"
                  >
                    <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Start the Brief
                    </a>
                  </Button>
                </HoverLift>
              </motion.div>

              <motion.div className="w-full sm:w-auto" {...reveal(0.6, 16)}>
                <HoverLift>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cta-secondary w-full rounded-full px-8 py-3 text-white sm:w-auto"
                  >
                    <a href="#showcase">See the Work</a>
                  </Button>
                </HoverLift>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 w-full sm:mt-14">
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
