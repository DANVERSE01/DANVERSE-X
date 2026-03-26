"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import LazyVideo from "@/components/lazy-video"
import { WaCtaButton } from "@/components/wa-cta-button"
import { MaskReveal } from "@/components/motion/mask-reveal"
import { ParallaxLayer } from "@/components/motion/parallax-layer"
import { PinScene } from "@/components/motion/pin-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { useCursorState } from "@/components/motion/cursor-state"
import { gsap, ScrollTrigger } from "@/lib/gsap-config"

function bindMediaQuery(mediaQuery: MediaQueryList, listener: () => void) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }

  mediaQuery.addListener(listener)
  return () => mediaQuery.removeListener(listener)
}

export default function Act1HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const centerCardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { setCursorLabel, clearCursorLabel } = useCursorState()
  const [desktopMotion, setDesktopMotion] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const syncDesktopMotion = () => {
      setDesktopMotion(desktopQuery.matches && !reducedMotionQuery.matches && window.innerWidth >= 768)
    }

    syncDesktopMotion()

    const unbindDesktop = bindMediaQuery(desktopQuery, syncDesktopMotion)
    const unbindReducedMotion = bindMediaQuery(reducedMotionQuery, syncDesktopMotion)
    window.addEventListener("resize", syncDesktopMotion)

    return () => {
      unbindDesktop()
      unbindReducedMotion()
      window.removeEventListener("resize", syncDesktopMotion)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const centerCard = centerCardRef.current

    if (!section || !video || !centerCard || reduceMotion || !desktopMotion) {
      return
    }

    const context = gsap.context(() => {
      const pulse = gsap.to(centerCard, {
        boxShadow: "0 0 0 1px rgb(199 38 76 / 28%), 0 32px 96px rgb(199 38 76 / 24%)",
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      gsap.fromTo(
        "[data-hero-copy]",
        { yPercent: 0 },
        {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      )

      ;[
        { selector: "[data-hero-left]", y: -70, x: -10 },
        { selector: "[data-hero-center]", y: -24, x: 0 },
        { selector: "[data-hero-right]", y: -84, x: 12 },
      ].forEach(({ selector, y, x }) => {
        gsap.fromTo(
          selector,
          { y: 0, x: 0 },
          {
            y,
            x,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: ({ progress }) => {
          video.playbackRate = gsap.utils.interpolate(0.78, 1.34, progress)
        },
      })

      video.play().catch(() => null)

      return () => {
        pulse.kill()
      }
    }, section)

    return () => {
      context.revert()
      video.playbackRate = 1
    }
  }, [desktopMotion, reduceMotion])

  return (
    <PinScene className="relative" end="+=132%" disabled={!desktopMotion}>
      <section
        ref={sectionRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-20 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgb(47_99_186_/_0.28),transparent_24%),radial-gradient(circle_at_68%_54%,rgb(199_38_76_/_0.18),transparent_18%),radial-gradient(circle_at_24%_32%,rgb(22_42_83_/_0.22),transparent_32%),linear-gradient(180deg,rgb(238_243_248_/_0.52),rgb(232_239_245_/_0.14))]" />
          <div className="absolute left-[18%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(22_42_83_/_0.82),transparent_68%)] blur-3xl" />
          <div className="absolute right-[12%] top-[22%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(47_99_186_/_0.48),transparent_72%)] blur-3xl" />
          <div className="absolute bottom-[12%] left-[46%] h-56 w-[2px] rotate-12 bg-[linear-gradient(180deg,transparent,rgb(199_38_76_/_0.7),transparent)]" />
          <div className="absolute right-[18%] top-[18%] h-44 w-[2px] -rotate-12 bg-[linear-gradient(180deg,transparent,rgb(228_93_134_/_0.6),transparent)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(360px,1fr)] lg:items-center">
          <div data-hero-copy className="space-y-7">
            <MaskReveal className="max-w-max">
              <p className="section-label text-[11px]">Act 01 / Hero Scene</p>
            </MaskReveal>

            <SplitReveal
              as="h2"
              text="A 2026 creative studio should feel like entering the film before the pitch."
              unit="words"
              className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-[0.94] tracking-[-0.05em] text-[var(--color-base)] md:text-6xl xl:text-[5.9rem]"
            />

            <MaskReveal delay={0.08}>
              <p className="max-w-2xl text-base leading-7 text-[rgb(10_19_37_/_0.72)] md:text-lg">
                DANVERSE builds launch films, premium landing pages, and creative operating systems that move
                like a single authored scene instead of isolated deliverables.
              </p>
            </MaskReveal>

            <div className="flex flex-wrap items-center gap-4">
              <WaCtaButton
                source="home-hero-scene"
                label="Book the studio"
                className="rounded-full border border-[rgb(47_99_186_/_0.28)] bg-[var(--color-cobalt)] px-7 text-[var(--color-ice)] hover:bg-[var(--color-crimson)]"
              />
              <Link
                href="#work-rail"
                data-cursor="interactive"
                className="inline-flex items-center gap-3 rounded-full border border-[rgb(22_42_83_/_0.12)] bg-[rgb(255_255_255_/_0.4)] px-5 py-3 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-midnight)] transition-colors hover:border-[rgb(199_38_76_/_0.24)] hover:text-[var(--color-crimson)]"
              >
                Explore the rail
              </Link>
            </div>
          </div>

          <div className="relative h-[34rem] sm:h-[40rem] lg:h-[46rem]">
            <ParallaxLayer className="absolute left-0 top-12 z-10 w-[38%] lg:top-16" speed={desktopMotion ? 44 : 0}>
              <div
                data-hero-left
                className="chrome-border overflow-hidden rounded-[24px] bg-[rgb(255_255_255_/_0.38)] p-3 shadow-[0_16px_40px_rgb(10_19_37_/_0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                  <Image
                    src="/images/intuitive-2.webp"
                    alt="DANVERSE floating interface concept"
                    fill
                    sizes="(min-width: 1024px) 16vw, 34vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer className="absolute left-[22%] top-0 z-20 w-[58%] lg:left-[18%]" speed={desktopMotion ? 18 : 0}>
              <div
                ref={centerCardRef}
                data-hero-center
                className="overflow-hidden rounded-[34px] border border-[rgb(199_211_224_/_0.16)] bg-[rgb(4_7_12_/_0.78)] p-3 shadow-[0_28px_90px_rgb(10_19_37_/_0.18)]"
                onMouseEnter={() => setCursorLabel("Scrub film")}
                onMouseLeave={clearCursorLabel}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--color-base)]">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/videos/conversions.mp4"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="DANVERSE hero film reel"
                    data-cursor="interactive"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_14%,rgb(4_7_12_/_0.3)_56%,rgb(4_7_12_/_0.88)_100%)]" />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full border border-[rgb(199_211_224_/_0.1)] bg-[rgb(4_7_12_/_0.52)] px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ice)] backdrop-blur-xl">
                    <span>Scroll-linked playback</span>
                    <span className="text-[var(--color-rose)]">Live</span>
                  </div>
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer className="absolute bottom-0 right-0 z-10 w-[34%]" speed={desktopMotion ? 56 : 0}>
              <div
                data-hero-right
                className="chrome-border overflow-hidden rounded-[24px] bg-[rgb(255_255_255_/_0.36)] p-3 shadow-[0_16px_40px_rgb(10_19_37_/_0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[var(--color-base)]">
                  <LazyVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/videos/standout.mp4"
                    autoplay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgb(4_7_12_/_0.64)_100%)]" />
                </div>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </section>
    </PinScene>
  )
}
