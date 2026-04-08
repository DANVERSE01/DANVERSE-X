"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { SHOWCASE_WORKS, type ShowcaseWork } from "@/lib/showcase-works"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const headingRef = useGsapEnter<HTMLDivElement>({
    preset: "blur-rise",
    stagger: 0.14,
    childSelector: "[data-gsap-item]",
    start: "top 88%",
  })

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || typeof window === "undefined") return

    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    registerGSAP()

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
    if (cards.length === 0) return

    const getCardWidth = () => cards[0]?.offsetWidth ?? 0
    const GAP = 24

    const getTotalScroll = () => (cards.length - 1) * (getCardWidth() + GAP)

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getTotalScroll() + window.innerWidth * 0.2}`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (cards.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power2.inOut",
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const totalScroll = getTotalScroll()
        const x = -(self.progress * totalScroll)
        gsap.set(track, { x, force3D: true })

        const activeFloat = self.progress * (cards.length - 1)
        const nextActive = Math.round(activeFloat)
        setActiveIndex(nextActive)

        cards.forEach((card, i) => {
          const dist = Math.abs(i - activeFloat)
          const scale = 1 - Math.min(dist, 1) * 0.08
          gsap.set(card, { scale, force3D: true })
        })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      aria-label="Selected work"
      className="section-shell relative overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Heading row */}
      <div ref={headingRef} className="content-shell relative z-10 pb-8 pt-12 sm:pb-10 sm:pt-16">
        <div className="mx-auto grid max-w-[1120px] items-end gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div data-gsap-item>
            <p className="section-label">Selected Work</p>
            <TextReveal
              as="h2"
              type="chars"
              preset="clip-up"
              stagger={0.02}
              className="section-heading mt-4 max-w-[14ch] text-white"
            >
              The cuts that decide the campaign.
            </TextReveal>
          </div>
          <p data-gsap-item className="pb-1 text-sm text-white/42">
            Scroll to explore{" "}
            <span className="text-[var(--color-electric-blue)]">{SHOWCASE_WORKS.length} works</span>
          </p>
        </div>
      </div>

      {/* Horizontal scroll track — GSAP on desktop, CSS on mobile */}
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 1120px) / 2 + 1.5rem))",
            paddingRight: "max(1.5rem, calc((100vw - 1120px) / 2 + 1.5rem))",
          }}
        >
          {SHOWCASE_WORKS.map((work, i) => (
            <ShowcaseCard
              key={work.slug}
              work={work}
              isActive={i === activeIndex}
              cardRef={(el) => {
                cardRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile dot indicators */}
      <div className="content-shell mt-6 flex justify-center gap-2 lg:hidden">
        {SHOWCASE_WORKS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "24px" : "6px",
              background:
                i === activeIndex
                  ? "var(--color-electric-blue)"
                  : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      <div className="pb-12 sm:pb-16" />
    </section>
  )
}

function ShowcaseCard({
  work,
  isActive,
  cardRef,
}: {
  work: ShowcaseWork
  isActive: boolean
  cardRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={cardRef}
      data-cursor-label="View Case"
      data-cursor-hover
      className="group relative flex-shrink-0 overflow-hidden rounded-[2rem] border transition-[border-color,box-shadow] duration-500"
      style={{
        width: "clamp(72vw, 60vw, 760px)",
        borderColor: isActive
          ? "rgba(224,231,91,0.35)"
          : "rgba(255,255,255,0.1)",
        boxShadow: isActive
          ? "0 0 48px rgba(224,231,91,0.1)"
          : "none",
      }}
      aria-label={`${work.title} — ${work.category}`}
    >
      {/* Poster image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={work.poster}
          alt={`${work.title} — ${work.category} campaign`}
          fill
          sizes="(max-width: 768px) 85vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
          priority={isActive}
        />

        {/* Gradient overlay — always present, deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Hover glow ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 2px rgba(224,231,91,0.4), 0 0 60px rgba(224,231,91,0.08)",
          }}
        />
      </div>

      {/* Info overlay — slides from bottom on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-electric-blue)]">
          {work.category}
        </p>
        <h3 className="mt-2 max-w-[16ch] text-[clamp(1.1rem,2.8vw,1.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
          {work.title}
        </h3>
        <p className="mt-1 text-sm text-white/55">{work.client}</p>
        <p className="mt-3 line-clamp-2 max-w-[36ch] text-[0.85rem] leading-6 text-white/68">
          {work.desc}
        </p>
      </div>
    </div>
  )
}
