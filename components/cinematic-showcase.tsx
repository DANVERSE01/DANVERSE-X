"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import LazyVideo from "@/components/lazy-video"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"
import { SHOWCASE_WORKS, type ShowcaseWork } from "@/lib/showcase-works"

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const headingRef = useGsapEnter<HTMLDivElement>({
    preset: "fade-up",
    stagger: 0.14,
    childSelector: "[data-gsap-item]",
    start: "top 88%",
  })

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || typeof window === "undefined") return

    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null)
    if (cards.length === 0) return

    const desktopQuery = window.matchMedia("(min-width: 1024px)")
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let trigger: ScrollTrigger | null = null
    let lastActive = 0

    const clearDesktopState = () => {
      trigger?.kill()
      trigger = null
      gsap.set(track, { clearProps: "transform" })
      cards.forEach((card) => gsap.set(card, { clearProps: "transform,opacity" }))
      lastActive = 0
      setActiveIndex(0)
    }

    const setupDesktopScroll = () => {
      clearDesktopState()
      if (!desktopQuery.matches || prefersReducedMotion.matches) return

      registerGSAP()

      const getCardWidth = () => cards[0]?.offsetWidth ?? 0
      const getGap = () => {
        const styles = window.getComputedStyle(track)
        return Number.parseFloat(styles.columnGap || styles.gap || "0")
      }
      const getTotalScroll = () => Math.max(0, (cards.length - 1) * (getCardWidth() + getGap()))

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getTotalScroll() + window.innerWidth * 0.18}`,
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
          if (nextActive !== lastActive) {
            lastActive = nextActive
            setActiveIndex(nextActive)
          }

          cards.forEach((card, index) => {
            const distance = Math.abs(index - activeFloat)
            gsap.set(card, {
              y: Math.min(distance, 1) * 20,
              opacity: 1 - Math.min(distance, 1) * 0.22,
              force3D: true,
            })
          })
        },
      })
    }

    setupDesktopScroll()
    desktopQuery.addEventListener?.("change", setupDesktopScroll)
    prefersReducedMotion.addEventListener?.("change", setupDesktopScroll)

    return () => {
      desktopQuery.removeEventListener?.("change", setupDesktopScroll)
      prefersReducedMotion.removeEventListener?.("change", setupDesktopScroll)
      clearDesktopState()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      aria-label="Selected work"
      className="section-shell relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div ref={headingRef} className="content-shell relative z-10 pb-8 pt-[var(--section-block)]">
        <div className="mx-auto grid max-w-[1240px] items-end gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div data-gsap-item>
            <p className="section-label">Selected work</p>
            <TextReveal
              as="h2"
              type="chars"
              preset="clip-up"
              stagger={0.02}
              className="section-heading mt-4 max-w-[12ch] text-white"
            >
              The work that holds the room.
            </TextReveal>
          </div>
          <p data-gsap-item className="max-w-[28ch] pb-1 text-sm leading-7 text-white/42">
            <span className="lg:hidden">Swipe through the frames.</span>
            <span className="hidden lg:inline">Scroll through the frames.</span>
          </p>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max snap-x snap-mandatory gap-5 lg:gap-8 lg:snap-none lg:will-change-transform"
          style={{
            paddingLeft: "max(1rem, calc((100vw - 1280px) / 2))",
            paddingRight: "max(1rem, calc((100vw - 1280px) / 2))",
          }}
        >
          {SHOWCASE_WORKS.map((work, index) => (
            <ShowcaseCard
              key={work.slug}
              index={index}
              work={work}
              isActive={index === activeIndex}
              cardRef={(element) => {
                cardRefs.current[index] = element
              }}
            />
          ))}
        </div>
      </div>

      <div className="pb-[calc(var(--section-block)-1rem)]" />
    </section>
  )
}

function ShowcaseCard({
  index,
  work,
  isActive,
  cardRef,
}: {
  index: number
  work: ShowcaseWork
  isActive: boolean
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const [videoReady, setVideoReady] = useState(false)
  const objectFitClass = work.fit === "contain" ? "object-contain" : "object-cover"

  return (
    <div
      ref={cardRef}
      data-cursor-label="View Case"
      data-cursor-hover
      className={`group relative flex-shrink-0 snap-center overflow-hidden rounded-[1.35rem] border transition-[border-color,box-shadow,opacity] duration-500 ${
        isActive
          ? "border-white/18 shadow-[0_26px_72px_rgba(0,0,0,0.34)] lg:opacity-100"
          : "border-white/10 shadow-[0_18px_54px_rgba(0,0,0,0.22)] lg:opacity-75"
      }`}
      style={{ width: "clamp(24rem, 90vw, 86rem)" }}
      aria-label={`${work.title} - ${work.category}`}
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "16 / 9",
          backgroundColor: work.backgroundColor,
        }}
      >
        <Image
          src={work.poster}
          alt=""
          aria-hidden="true"
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 90vw, 1376px"
          className={`${objectFitClass} transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.02] ${
            videoReady ? "scale-[1.03] opacity-0" : "opacity-100"
          }`}
          style={{ objectPosition: work.objectPosition }}
        />
        <LazyVideo
          src={work.videoSrc}
          poster={work.poster}
          autoplay
          loop
          muted
          playsInline
          eager={index === 0}
          rootMargin="420px 0px"
          background={work.backgroundColor ?? "#070709"}
          aria-label={`${work.title} showcase reel`}
          onReady={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full ${objectFitClass} transition-all duration-700 ease-out group-hover:scale-[1.02] ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: work.objectPosition }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.04)_0%,rgba(7,7,9,0)_28%,rgba(7,7,9,0.26)_62%,rgba(7,7,9,0.84)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#070709] via-[#070709]/20 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-6 sm:top-6">
          <span className="section-label text-white/34">{String(index + 1).padStart(2, "0")}</span>
          <div className="h-px w-8 bg-white/18" />
          <span className="section-label text-white/44">{work.category}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
          <div className="max-w-[34rem]">
            <h3 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[0.94] tracking-[-0.045em] text-white">
              {work.title}
            </h3>
            <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-white/42 sm:text-[0.78rem]">
              {work.client} / {work.role}
            </p>
            <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-7 text-white/64 sm:text-[1.02rem] sm:leading-8">
              {work.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
