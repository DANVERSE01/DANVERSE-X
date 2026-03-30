"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { createWhatsAppUrl } from "@/lib/env"
import LazyVideo from "./lazy-video"
import { DanverseLogo } from "./danverse-logo"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          {/* Logo - Centered with consistent spacing */}
          <div className="relative mb-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-18%] top-[-8%] h-[90%] rounded-full"
              style={{
                background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,245,0,0.04) 0%, transparent 70%)",
              }}
            />
            <DanverseLogo size="hero" className="relative z-10" />
          </div>

          {/* Headline */}
          <h1
            className="text-center text-white"
            style={{
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.96,
            }}
          >
            <span className="block">WE DON'T MAKE ADS.</span>
            <span className="block text-[var(--color-lime)]">WE BUILD BRAND WEAPONS.</span>
            <span className="block">POWERED BY AI.</span>
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="cta-coral rounded-full px-8 py-3 font-medium text-white transition-all hover:scale-105"
            >
              <a href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                Chat With Us
              </a>
            </Button>
          </div>

          {/* Phone Cards Grid */}
          <div className="mt-12 w-full">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto">
              {phoneData.map((p, i) => {
                const visibility =
                  i <= 1 ? "block" : i === 2 ? "hidden sm:block" : i === 3 ? "hidden lg:block" : "hidden xl:block"

                return (
                  <div key={i} className={visibility}>
                    <PhoneCard title={p.title} sub={p.sub} videoSrc={p.videoSrc} posterSrc={p.posterSrc} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "Feature",
  sub = "Description here",
  videoSrc,
  posterSrc,
}: {
  title?: string
  sub?: string
  videoSrc?: string
  posterSrc?: string
}) {
  return (
    <div className="relative rounded-[24px] glass-border bg-black/40 p-1.5">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
        <PhoneCardVideo
          title={title}
          sub={sub}
          src={videoSrc ?? defaultPhoneCardMedia.videoSrc}
          poster={posterSrc ?? defaultPhoneCardMedia.posterSrc}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-xl font-bold text-white mb-1">{title}</div>
          <p className="body-copy text-xs">{sub}</p>
          <div className="mt-2 inline-flex items-center rounded-full border border-[rgba(245,245,0,0.16)] bg-[rgba(245,245,0,0.08)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-lime)]">
            DANVERSE
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneCardVideo({ title, sub, src, poster }: { title: string; sub: string; src: string; poster: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const syncPlayback = () => {
      const prefersReducedMotion = mediaQuery.matches
      setShouldAutoplay(!prefersReducedMotion)

      if (prefersReducedMotion) {
        containerRef.current?.querySelector("video")?.pause()
      }
    }

    syncPlayback()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPlayback)
      return () => mediaQuery.removeEventListener("change", syncPlayback)
    }

    mediaQuery.addListener(syncPlayback)
    return () => mediaQuery.removeListener(syncPlayback)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false)
      },
      {
        rootMargin: "120px 0px",
        threshold: 0.35,
      }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <LazyVideo
        src={src}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        autoplay={shouldAutoplay && isInView}
        loop={true}
        muted={true}
        playsInline={true}
        aria-label={`${title} - ${sub}`}
        data-hero-background="true"
      />
    </div>
  )
}

const defaultPhoneCardMedia = {
  videoSrc:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4",
  posterSrc: "/images/hero-posters/default-card.webp",
}

const phoneData = [
  {
    title: "Conversions",
    sub: "Turn clicks into paying customers.",
    tone: "results",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20new%20chapter%20in%20the%20story%20of%20success.__Introducing%20the%20new%20TAG%20Heuer%20Carrera%20Day-Date%20collection%2C%20reimagined%20with%20bold%20colors%2C%20refined%20finishes%2C%20and%20upgraded%20functionality%20to%20keep%20you%20focused%20on%20your%20goals.%20__Six%20-nDNoRQyFaZ8oaaoty4XaQz8W8E5bqA.mp4",
    posterSrc: "/images/hero-posters/conversions-card.webp",
  },
  {
    title: "Speed",
    sub: "Launch in days, not weeks.",
    tone: "speed",
    posterSrc: defaultPhoneCardMedia.posterSrc,
  },
  {
    title: "Social-Ready",
    sub: "Made for IG, TikTok, and Meta.",
    tone: "social",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
    posterSrc: "/images/hero-posters/social-ready-card.webp",
  },
  {
    title: "Standout",
    sub: "Be the product no one scrolls past.",
    tone: "standout",
    posterSrc: defaultPhoneCardMedia.posterSrc,
  },
  {
    title: "Premium",
    sub: "Look like the market leader.",
    tone: "premium",
    posterSrc: defaultPhoneCardMedia.posterSrc,
  },
]
