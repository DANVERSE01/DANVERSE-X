"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import LazyVideo from "./lazy-video"

const WORKS = [
  {
    id: "social-campaign",
    index: "01",
    tabName: "Social Campaign",
    tabType: "Social · Ad",
    client: "JACOB&CO × BUGATTI",
    title: "High-Conversion Vertical Content",
    description: "Engineered for paid social. Pacing optimized for thumb-stop and launch-day performance.",
    src: "https://player.vimeo.com/external/494252666.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    poster: "/images/hero-posters/social-ready-card.webp",
    portrait: true,
  },
  {
    id: "brand-film",
    index: "02",
    tabName: "Cinematic Brand Film",
    tabType: "Brand · Film",
    client: "DANVERSE STUDIO / LUXURY",
    title: "Atmosphere First. Story Locked.",
    description: "Full cinematic treatment with a clear visual language before the first frame leaves production.",
    src: "https://player.vimeo.com/external/517090081.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    poster: "/images/top-rated-2.webp",
    portrait: false,
  },
  {
    id: "tech-reveal",
    index: "03",
    tabName: "Tech Reveal",
    tabType: "Product · Reveal",
    client: "FUTURE DEVICE // LAUNCH",
    title: "Precision Timing for Product Impact",
    description: "Every cut engineered around timing, material detail, and a premium reveal cadence.",
    src: "https://player.vimeo.com/external/371433846.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    poster: "/images/intuitive-1.webp",
    portrait: false,
  },
  {
    id: "visual-identity",
    index: "04",
    tabName: "Visual Identity",
    tabType: "Identity · Motion",
    client: "BRAND CORE SYSTEM",
    title: "Motion Identity That Scales",
    description: "A flexible motion system for launch moments, evergreen content, and consistent brand recall.",
    src: "https://player.vimeo.com/external/517090048.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    poster: "/images/top-rated-1.webp",
    portrait: false,
  },
] as const

export function CinematicShowcase() {
  const [activeId, setActiveId] = useState<(typeof WORKS)[number]["id"]>(WORKS[0].id)
  const activeWork = WORKS.find((work) => work.id === activeId) ?? WORKS[0]

  return (
    <section id="work" className="section-shell bg-[rgba(5,5,7,0.72)]" data-analytics-section="Showcase">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll" data-reveal>
          <span className="section-tag">Selected Works · 2024-2026</span>
          <h2 className="mt-7 text-balance text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9]">
            Production
            <span className="headline-accent block">Showcase</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--platinum-muted)] sm:text-lg">
            Four works. Each one a complete visual system built for brands that expect cinema, not commodity content.
          </p>
        </div>

        <div className="reveal-on-scroll mt-12 overflow-x-auto border-y border-[var(--bg-border)] [scrollbar-width:none]" data-reveal>
          <div className="showcase-tabs flex min-w-[880px] md:min-w-0">
            {WORKS.map((work) => {
              const isActive = work.id === activeWork.id

              return (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => setActiveId(work.id)}
                  className={`showcase-tab group relative flex min-w-[220px] flex-1 flex-col gap-2 border-r border-[var(--bg-border)] px-6 py-5 text-left transition-colors duration-300 ${
                    isActive ? "bg-[var(--gold-glow)]" : "bg-transparent hover:bg-white/5"
                  }`}
                  data-hover
                >
                  <span
                    className={`text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
                      isActive ? "text-[var(--gold-primary)]" : "text-[var(--platinum-muted)]"
                    }`}
                  >
                    {work.index}
                  </span>
                  <span className="text-[0.98rem] font-semibold text-[var(--platinum)]">{work.tabName}</span>
                  <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--platinum-muted)]">
                    {work.tabType}
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--gold-primary)] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="reveal-on-scroll mt-6 overflow-hidden rounded-[28px] border border-[var(--bg-border)] bg-[var(--bg-void)] shadow-[0_32px_120px_rgba(0,0,0,0.35)]" data-reveal>
          <div className="showcase-panel group relative aspect-[16/9] min-h-[420px] overflow-hidden md:min-h-[560px]" data-hover>
            <div className="panel-video-wrapper absolute inset-0 bg-[var(--bg-void)]">
              <LazyVideo
                key={activeWork.id}
                src={activeWork.src}
                poster={activeWork.poster}
                autoplay
                loop
                muted
                playsInline
                className={`absolute inset-0 h-full w-full transition-transform duration-700 [transition-timing-function:var(--ease-cinematic)] group-hover:scale-[1.02] ${
                  activeWork.portrait ? "object-contain" : "object-cover"
                }`}
                aria-label={activeWork.title}
              />
            </div>

            <div className="panel-gradient-overlay absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,7,0.92)_0%,rgba(5,5,7,0.35)_34%,transparent_62%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,7,0.65)_0%,transparent_46%,transparent_100%)]" />

            <div className="play-btn absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--gold-primary)] bg-[rgba(201,168,76,0.14)] opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[var(--gold-primary)]" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="panel-info absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-10 px-6 pb-8 pt-20 sm:px-10 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pb-14">
              <div className="max-w-2xl">
                <div className="panel-client text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[var(--gold-primary)]">
                  {activeWork.client}
                </div>
                <h3 className="panel-title mt-4 max-w-2xl text-balance text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.04] text-[var(--platinum)]">
                  {activeWork.title}
                </h3>
                <p className="panel-desc mt-4 max-w-xl text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
                  {activeWork.description}
                </p>
              </div>

              <div className="text-left lg:text-right">
                <div className="text-[clamp(3.5rem,6vw,6rem)] font-black leading-none text-white/6">{activeWork.index}</div>
                <div className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--platinum-muted)]">
                  {activeWork.tabType} · DANVERSE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-on-scroll mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--bg-border)] pt-8 sm:flex-row sm:items-center" data-reveal>
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[var(--gold-primary)]">Cinematic delivery system</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
              Poster-backed playback, lazy loading, and direct video rendering keep the showcase fast, stable, and
              ready for every screen size.
            </p>
          </div>

          <button type="button" onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")} className="btn-secondary" data-hover>
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
