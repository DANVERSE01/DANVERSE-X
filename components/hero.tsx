"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { HeroMediaCard, type HeroMediaItem } from "@/components/hero-media-card"
import { HoverLift } from "@/components/hover-lift"
import { TextReveal } from "@/components/text-reveal"
import { resolveCtaHref } from "@/lib/cta"
import { GENERAL_BRIEF_CTA, GENERAL_DISCOVERY_CTA } from "@/lib/site-ctas"
import { registerGSAP, gsap } from "@/lib/gsap"

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

const HERO_SIGNAL_CHIPS = ["Cinematic Ads", "Brand Systems", "Launch Pages", "Content Rollouts"] as const

export function Hero() {
  const archRef      = useRef<HTMLDivElement>(null)
  const leftCardRef  = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const chipsRef     = useRef<HTMLDivElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const mediaRef     = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)

  // Mouse-driven parallax on hero light architecture
  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let rafId = 0
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      tx = (clientX / window.innerWidth  - 0.5) * 28
      ty = (clientY / window.innerHeight - 0.5) * 16
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      section.style.setProperty("--hero-parallax-x", `${cx}px`)
      section.style.setProperty("--hero-parallax-y", `${cy}px`)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  // GSAP entrance timeline — fires once on mount (above fold, no ScrollTrigger needed)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    registerGSAP()

    const els = {
      arch:       archRef.current,
      leftCard:   leftCardRef.current,
      rightCard:  rightCardRef.current,
      sub:        subRef.current,
      chips:      chipsRef.current,
      ctas:       ctasRef.current,
      media:      mediaRef.current,
    }

    // Set all invisible before timeline runs
    gsap.set([els.arch, els.leftCard, els.rightCard, els.sub, els.chips, els.ctas, els.media], {
      opacity: 0,
    })
    if (els.arch)      gsap.set(els.arch,      { y: 20, filter: "blur(8px)" })
    if (els.leftCard)  gsap.set(els.leftCard,  { x: -24, filter: "blur(6px)" })
    if (els.rightCard) gsap.set(els.rightCard, { x:  24, filter: "blur(6px)" })
    if (els.sub)       gsap.set(els.sub,       { y: 18, filter: "blur(4px)" })
    if (els.chips)     gsap.set(els.chips,     { y: 14, filter: "blur(4px)" })
    if (els.ctas)      gsap.set(els.ctas,      { y: 22, filter: "blur(6px)" })
    if (els.media)     gsap.set(els.media,     { y: 36, opacity: 0, filter: "blur(10px)" })

    const tl = gsap.timeline({ delay: 0.12 })

    // Light architecture fades in first
    tl.to(els.arch, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" })

    // Side cards slide in from edges simultaneously
    tl.to(
      [els.leftCard, els.rightCard],
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      "-=0.7"
    )

    // Sub-copy rises up
    tl.to(els.sub, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, "-=0.5")

    // Chips stagger in
    if (els.chips) {
      const chipEls = Array.from(els.chips.querySelectorAll<HTMLElement>("[data-chip]"))
      gsap.set(chipEls, { opacity: 0, y: 10, scale: 0.94 })
      tl.to(chipEls, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.6)" }, "-=0.4")
    }

    // CTAs rise up
    tl.to(els.ctas, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, "-=0.35")

    // Media cards stagger up last — premium stagger
    if (els.media) {
      const cards = Array.from(els.media.querySelectorAll<HTMLElement>("[data-media-card]"))
      gsap.set(cards, { opacity: 0, y: 40, filter: "blur(10px)" })
      tl.to(
        cards,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, stagger: 0.14, ease: "power4.out" },
        "-=0.5"
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero introduction"
      className="section-shell relative overflow-x-hidden pt-3 sm:pt-6"
    >
      {/* Light architecture backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="content-shell relative h-[560px] sm:h-[760px] lg:h-[840px]">
          <div ref={archRef} className="hero-light-architecture absolute inset-0">
            <div className="hero-light-grid" />
            <div className="hero-light-frame" />
            <div className="hero-light-beam" />
            <div className="hero-light-beam hero-light-beam--secondary" />
            <div className="hero-light-scan" />
            <div className="absolute inset-x-[18%] top-[34%] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
            <div className="absolute inset-x-[24%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[18%] top-[24%] h-[30%] w-px bg-gradient-to-b from-transparent via-[rgba(224,231,91,0.28)] to-transparent" />
            <div className="absolute right-[18%] top-[30%] h-[28%] w-px bg-gradient-to-b from-transparent via-[rgba(0,166,166,0.22)] to-transparent" />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(6,8,14,0.02) 0%, rgba(6,8,14,0.12) 34%, rgba(6,8,14,0.28) 66%, transparent 84%)",
            }}
          />
        </div>
      </div>

      <div className="content-shell relative z-[2]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center py-8 text-center sm:py-14 lg:py-16">

          {/* Three-column: side info cards + centered headline */}
          <div className="grid w-full max-w-[1140px] items-end gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)]">

            {/* Left info card */}
            <div
              ref={leftCardRef}
              className="hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
            >
              <p className="section-label text-[var(--color-acid-lime)]">Who We Are</p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Director-led cinematic studio. Strategy locked. Production controlled. One package: approved concept to market-ready assets.
              </p>
            </div>

            {/* Headline — TextReveal for cinematic char-by-char entrance */}
            <div className="relative mx-auto flex w-full max-w-full justify-center px-1">
              <TextReveal
                as="h1"
                type="words"
                preset="clip-up"
                stagger={0.08}
                trigger="immediate"
                className="relative z-10 mx-auto w-full max-w-[11ch] break-normal text-center text-[clamp(2.5rem,10vw,4.8rem)] font-bold leading-[0.88] tracking-[-0.06em] text-white sm:max-w-[10ch] sm:text-[clamp(3.4rem,7.8vw,5.8rem)] lg:max-w-[10.8ch] lg:text-[clamp(4.9rem,6.6vw,7rem)]"
              >
                Cinematic Ads. Brand Systems. Global.
              </TextReveal>
            </div>

            {/* Right info card */}
            <div
              ref={rightCardRef}
              className="hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 text-left backdrop-blur-xl lg:block"
            >
              <p className="section-label text-[var(--color-electric-blue-strong)]">For Brands</p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Luxury. Beauty. Consumer. Tech. Brands where the first frame decides if the message gets heard.
              </p>
            </div>
          </div>

          {/* Sub-copy */}
          <p
            ref={subRef}
            className="mx-auto mt-5 max-w-[42ch] text-[clamp(1rem,4vw,1.16rem)] leading-[1.7] text-white/74 sm:mt-7 sm:max-w-[48ch]"
          >
            Strategic direction locked. Creative supervised. All deliverables approved by the director. Ready to launch.
          </p>

          {/* Signal chips */}
          <div ref={chipsRef} className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5">
            {HERO_SIGNAL_CHIPS.map((chip) => (
              <div
                key={chip}
                data-chip
                className="accent-chip px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/78"
              >
                {chip}
              </div>
            ))}
            <div
              data-chip
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/66 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_14px_rgba(239,120,106,0.45)]" />
              Open for select launches
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctasRef} className="mt-8 flex w-full max-w-[19rem] flex-col items-center gap-4 sm:mt-9 sm:max-w-none">
            <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:flex-row sm:justify-center">
              <HoverLift>
                <Button
                  asChild
                  size="lg"
                  className="cta-primary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                >
                  <a
                    href={resolveCtaHref(GENERAL_BRIEF_CTA)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Start the 4-point brief on WhatsApp"
                  >
                    Start the 4-Point Brief
                  </a>
                </Button>
              </HoverLift>

              <HoverLift>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cta-secondary w-full rounded-full px-8 py-3 font-semibold tracking-[-0.02em] text-white sm:w-auto"
                >
                  <a href={resolveCtaHref(GENERAL_DISCOVERY_CTA)} target="_blank" rel="noopener noreferrer">
                    Request the 15-Minute Call
                  </a>
                </Button>
              </HoverLift>
            </div>

            <p className="max-w-[38rem] text-sm leading-7 text-white/56">
              Brief on WhatsApp: offer, audience, bottleneck, timeline. Next reply: the strategic direction forward.
            </p>
          </div>

          {/* Media cards */}
          <div ref={mediaRef} className="mt-10 w-full sm:mt-14">
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr_0.9fr] lg:items-end lg:gap-6">
              {HERO_MEDIA.map((item, index) => (
                <div
                  key={item.title}
                  data-media-card
                  className={`h-full ${
                    index === 1 ? "lg:-translate-y-6" : index === 0 ? "lg:translate-y-4" : "lg:translate-y-8"
                  }`}
                >
                  <HeroMediaCard index={index} featured={index === 1} {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
