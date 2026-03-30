"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { createWhatsAppUrl } from "@/lib/env"
import { DanverseLogo, DanverseWordmark } from "./danverse-logo"
import LazyVideo from "./lazy-video"

const DEFAULT_POSTER = "/images/hero-posters/default-card.webp"

const SERVICE_CARDS = [
  {
    title: "Conversions",
    description: "Narratives cut for action, retention, and purchase intent.",
    tag: "Conversion System",
    videoSrc: "/videos/conversions.mp4",
    posterSrc: "/images/hero-posters/conversions-card.webp",
  },
  {
    title: "Speed",
    description: "A locked process that keeps launches moving without chaos.",
    tag: "Fast Turnaround",
    videoSrc: "/videos/speed.mp4",
    posterSrc: DEFAULT_POSTER,
  },
  {
    title: "Social-Ready",
    description: "Built for vertical platforms, paid media, and thumb-stop momentum.",
    tag: "9:16 Native",
    videoSrc: "/videos/social-ready.mp4",
    posterSrc: "/images/hero-posters/social-ready-card.webp",
  },
  {
    title: "Standout",
    description: "Lighting, motion, and framing that create instant visual authority.",
    tag: "Premium Finish",
    videoSrc: "/videos/standout.mp4",
    posterSrc: DEFAULT_POSTER,
  },
  {
    title: "Premium",
    description: "Launch assets that make the brand feel bigger on first contact.",
    tag: "Brand Elevation",
    videoSrc: "/videos/premium.mp4",
    posterSrc: DEFAULT_POSTER,
  },
] as const

export function Hero() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="section-shell relative overflow-hidden pt-10 sm:pt-16" data-analytics-section="Hero">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_60%,rgba(201,168,76,0.07)_0%,transparent_60%),radial-gradient(ellipse_60%_40%_at_70%_30%,rgba(79,195,247,0.05)_0%,transparent_55%),radial-gradient(ellipse_100%_80%_at_50%_50%,rgba(108,92,231,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            className={`transition-all duration-1000 ${isReady ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="hero-logo-wrapper mx-auto flex w-fit flex-col items-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(201,168,76,0.22)] bg-[rgba(255,255,255,0.02)] shadow-[0_0_60px_rgba(201,168,76,0.08)] backdrop-blur-xl sm:h-32 sm:w-32">
                <DanverseLogo size="sm" className="scale-[1.12]" />
              </div>
              <DanverseWordmark size="lg" className="mt-6 text-[1.5rem] sm:text-[1.9rem]" />
              <span className="mt-3 text-[0.72rem] uppercase tracking-[0.32em] text-[var(--platinum-muted)]">
                Obsidian Gold Studio
              </span>
              <span className="mt-5 h-px w-10 bg-[var(--gold-primary)]" />
            </div>
          </div>

          <h1
            className={`mt-10 max-w-5xl text-balance font-black leading-none text-[clamp(3.4rem,9vw,6.9rem)] text-[var(--platinum)] transition-all duration-1000 delay-100 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Launch visuals that feel
            <span className="headline-accent block">cinematic on first contact.</span>
          </h1>

          <p
            className={`mt-6 max-w-2xl text-pretty text-[1rem] leading-8 text-[var(--platinum-muted)] sm:text-[1.125rem] transition-all duration-1000 delay-200 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            DANVERSE builds high-conversion campaign films, premium brand systems, and motion-led web experiences for
            brands that need to own the frame without sacrificing performance.
          </p>

          <div
            className={`mt-10 flex flex-col items-center gap-4 sm:flex-row transition-all duration-1000 delay-300 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a href={createWhatsAppUrl("I want to start a DANVERSE project.")} className="btn-primary" data-hover>
              Start Your Project
            </a>
            <a href="#work" className="btn-secondary" data-hover>
              View Showcase
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="service-cards-wrapper -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {SERVICE_CARDS.map((card, index) => (
              <article
                key={card.title}
                className="service-card group relative aspect-[3/4] w-[260px] flex-none overflow-hidden rounded-[20px] border border-[var(--bg-border)] bg-[var(--gradient-card)] shadow-[0_30px_80px_rgba(0,0,0,0.28)] transition-all duration-500 [transition-timing-function:var(--ease-cinematic)] hover:-translate-y-1.5 hover:border-[var(--gold-primary)] lg:w-auto"
                style={{ transitionDelay: `${index * 60}ms` }}
                data-hover
              >
                <LazyVideo
                  src={card.videoSrc}
                  poster={card.posterSrc}
                  autoplay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-cinematic)] group-hover:scale-105"
                  aria-label={`${card.title} showcase`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,7,0.92)_0%,rgba(5,5,7,0.22)_48%,transparent_72%)]" />

                <div className="service-card-overlay relative flex h-full flex-col justify-end p-6">
                  <span className="card-tag mb-4 inline-flex w-fit items-center rounded-full border border-[rgba(201,168,76,0.35)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--gold-primary)]">
                    {card.tag}
                  </span>
                  <h3 className="service-card-title text-[1.45rem] font-bold text-[var(--platinum)]">{card.title}</h3>
                  <p className="service-card-desc mt-2 text-sm leading-6 text-[var(--platinum-muted)]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
