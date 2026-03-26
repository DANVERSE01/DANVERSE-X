"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { WaCtaButton } from "@/components/wa-cta-button"
import { MaskReveal } from "@/components/motion/mask-reveal"
import { PinScene } from "@/components/motion/pin-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { gsap } from "@/lib/gsap-config"

const HeroScene = dynamic(() => import("@/components/webgl/HeroScene"), {
  ssr: false,
  loading: () => null,
})

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
  const reduceMotion = useReducedMotion()
  const [desktopMotion, setDesktopMotion] = useState(false)
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-18%" },
        transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
      }

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

    if (!section || reduceMotion || !desktopMotion) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-copy]",
        { y: 0 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        "[data-hero-meta]",
        { y: 0 },
        {
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    }, section)

    return () => {
      context.revert()
    }
  }, [desktopMotion, reduceMotion])

  const enableScene = desktopMotion && !reduceMotion

  return (
    <PinScene className="relative" end="+=104%" disabled={!desktopMotion}>
      <section
        ref={sectionRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:px-16"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgb(238_243_248_/_0.08),transparent_18%),radial-gradient(circle_at_74%_18%,rgb(47_99_186_/_0.18),transparent_24%),radial-gradient(circle_at_82%_58%,rgb(62_43_45_/_0.14),transparent_22%),linear-gradient(145deg,rgb(22_42_83)_0%,rgb(10_19_37)_52%,rgb(4_7_12)_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.16] mix-blend-screen"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.34'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
            }}
          />
          <div className="absolute inset-x-0 top-[14%] h-px bg-[linear-gradient(90deg,transparent,rgb(238_243_248_/_0.18),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgb(4_7_12_/_0.64))]" />
          {enableScene ? <HeroScene enabled={enableScene} triggerRef={sectionRef} /> : null}
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl">
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:items-end">
            <div data-hero-copy className="space-y-8 lg:max-w-[46rem]">
            <MaskReveal className="max-w-max">
              <p className="section-label text-[10px] text-[var(--color-pearl)]">Specimen 02 / Interactive Hero</p>
            </MaskReveal>

            <motion.div className="space-y-4" {...fadeUp}>
              <SplitReveal
                as="h2"
                text="Cryogenic matter."
                unit="words"
                className="block max-w-[8ch] font-[family-name:var(--font-space-grotesk)] text-5xl font-medium leading-[0.88] tracking-[-0.065em] text-[var(--color-ice)] md:text-7xl xl:text-[6.6rem]"
              />
              <SplitReveal
                as="p"
                text="Built to arrest attention before the first scroll."
                unit="words"
                delay={0.08}
                className="max-w-[18ch] font-[family-name:var(--font-space-grotesk)] text-3xl font-medium leading-[0.96] tracking-[-0.05em] text-[rgb(199_211_224_/_0.92)] md:text-5xl xl:text-[4.15rem]"
              />
            </motion.div>

            <motion.div {...fadeUp} transition={reduceMotion ? undefined : { duration: 0.74, delay: 0.08, ease: [0.215, 0.61, 0.355, 1] }}>
              <MaskReveal delay={0.08}>
              <p className="max-w-[34rem] text-base leading-7 text-[rgb(160_163_177_/_0.88)] md:text-lg">
                DANVERSE blends cinematic direction, lacquered interfaces, and conversion sequencing into one
                controlled release system calibrated for premium launch moments.
              </p>
              </MaskReveal>
            </motion.div>

            <motion.div {...fadeUp} transition={reduceMotion ? undefined : { duration: 0.74, delay: 0.12, ease: [0.215, 0.61, 0.355, 1] }}>
              <MaskReveal delay={0.12}>
              <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.32em] text-[var(--color-pearl)]">
                {["Three.js specimen", "Scroll-synced camera", "Pearl lacquer finish"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgb(199_211_224_/_0.18)] bg-[rgb(10_19_37_/_0.46)] px-4 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>
              </MaskReveal>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-4 pt-2" {...fadeUp} transition={reduceMotion ? undefined : { duration: 0.74, delay: 0.16, ease: [0.215, 0.61, 0.355, 1] }}>
              <WaCtaButton source="home-hero-scene" label="Open the brief" className="command-cta rounded-full px-7" />
              <Link
                href="#work-rail"
                data-cursor="interactive"
                className="inline-flex items-center gap-3 rounded-full border border-[rgb(199_211_224_/_0.16)] bg-[rgb(10_19_37_/_0.34)] px-5 py-3 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-pearl)] transition-colors hover:border-[rgb(47_99_186_/_0.4)] hover:bg-[rgb(10_19_37_/_0.5)]"
              >
                Review selected work
              </Link>
            </motion.div>
            </div>

            <motion.div className="lg:pb-6" {...fadeUp} transition={reduceMotion ? undefined : { duration: 0.76, delay: 0.22, ease: [0.215, 0.61, 0.355, 1] }}>
              <MaskReveal delay={0.14}>
              <div
                data-hero-meta
                className="max-w-max rounded-[26px] border border-[rgb(199_211_224_/_0.12)] bg-[linear-gradient(145deg,rgb(10_19_37_/_0.68),rgb(22_42_83_/_0.54),rgb(62_43_45_/_0.18))] px-5 py-4"
              >
                <p className="text-[10px] uppercase tracking-[0.32em] text-[rgb(160_163_177_/_0.68)]">
                  Cinematic 3D Hero
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[rgb(218_221_229_/_0.82)]">
                  Organic WebGL form, scroll-synced camera drift, cryogenic lacquer palette.
                </p>
              </div>
              </MaskReveal>
            </motion.div>
          </div>
        </div>
      </section>
    </PinScene>
  )
}
