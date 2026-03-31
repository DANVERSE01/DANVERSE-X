"use client"

import { useRef, useState } from "react"
import LazyVideo from "@/components/lazy-video"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const CLIPS = [
  {
    cat: "BRAND",
    title: "Luxury Motion",
    fmt: "4K - 60FPS",
    src: "https://player.vimeo.com/external/517090081.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "21/9",
    span: "md:col-span-2",
  },
  {
    cat: "SAAS",
    title: "Tech Reveal",
    fmt: "9:16 - Social",
    src: "https://player.vimeo.com/external/494252666.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "9/16",
    span: "md:row-span-2",
  },
  {
    cat: "AD",
    title: "Product Macro",
    fmt: "3D - VFX",
    src: "https://player.vimeo.com/external/371433846.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "1/1",
    span: "",
  },
  {
    cat: "FILM",
    title: "Dynamic Flow",
    fmt: "Color Graded",
    src: "https://player.vimeo.com/external/459389137.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "9/16",
    span: "md:row-span-2",
  },
  {
    cat: "B2B",
    title: "Elite Systems",
    fmt: "Animation",
    src: "https://player.vimeo.com/external/517090025.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "16/9",
    span: "md:col-span-2",
  },
  {
    cat: "AI",
    title: "Vision 2026",
    fmt: "Generative Art",
    src: "https://player.vimeo.com/external/517090064.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "1/1",
    span: "",
  },
  {
    cat: "IDENTITY",
    title: "Brand Core",
    fmt: "Logo - Motion",
    src: "https://player.vimeo.com/external/517090048.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "1/1",
    span: "",
  },
  {
    cat: "UI/UX",
    title: "Future Sprints",
    fmt: "Interactive",
    src: "https://player.vimeo.com/external/517090012.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "16/9",
    span: "md:col-span-2",
  },
  {
    cat: "EDU",
    title: "Master Class",
    fmt: "Long Form",
    src: "https://player.vimeo.com/external/517090036.hd.mp4?s=2286079774393963493963493963493963493963&profile_id=175",
    ratio: "9/16",
    span: "md:row-span-2",
  },
]

function CinematicCard({ clip }: { clip: (typeof CLIPS)[0] }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-zinc-950 ${clip.span}`}
      style={{ aspectRatio: clip.ratio }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <LazyVideo
          src={clip.src}
          autoplay
          muted
          loop
          playsInline
          className={`h-full w-full object-cover transition-transform duration-[1.5s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? "scale-110 brightness-110 saturate-110" : "scale-100 brightness-50 grayscale-[0.35]"
          }`}
        />
      </div>

      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${hovered ? "opacity-45" : "opacity-72"}`}
        style={{
          background: "linear-gradient(to top, rgba(5,7,11,0.98) 0%, rgba(5,7,11,0.12) 58%, rgba(10,18,48,0.3) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6">
        <div
          className={`transition-all duration-700 delay-100 ${
            hovered ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <span
            style={{ fontFamily: "'Courier Prime', monospace" }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-acid-lime)]"
          >
            {clip.cat}
          </span>
        </div>

        <div className="transform transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
          <h3
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
            className={`leading-[0.85] text-white transition-all duration-700 ${
              hovered ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl"
            }`}
          >
            {clip.title}
          </h3>
          <div
            className={`mt-4 flex items-center gap-4 transition-all duration-700 delay-200 ${
              hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span
              style={{ fontFamily: "'Courier Prime', monospace" }}
              className="text-[9px] uppercase tracking-widest text-white/40"
            >
              {clip.fmt}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[rgba(49,93,255,0.8)] via-[rgba(255,47,146,0.55)] to-transparent" />
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-30 border transition-colors duration-700 ${
          hovered ? "border-[rgba(255,47,146,0.28)]" : "border-white/5"
        }`}
      />
    </div>
  )
}

export function ReelSection() {
  return (
    <section className="border-t border-white/5 bg-gradient-to-b from-black/60 to-black/40">
      <div className="flex flex-col items-end justify-between gap-12 px-[clamp(24px,6vw,80px)] py-20 md:flex-row">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--color-electric-blue)] shadow-[0_0_20px_rgba(49,93,255,0.5)]" />
            <p
              style={{ fontFamily: "'Courier Prime', monospace" }}
              className="text-[10px] font-bold uppercase tracking-[0.6em] text-[var(--color-hot-pink)]"
            >
              CONCEPT 06 / THE WORK
            </p>
          </div>
          <h2
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            className="text-[clamp(48px,8vw,120px)] uppercase leading-[0.82] tracking-tighter text-white"
          >
            Production
            <br />
            <span className="bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink)] to-[var(--color-acid-lime)] bg-clip-text text-transparent">
              2024-2026
            </span>
          </h2>
        </div>
        <div className="hidden text-right md:block">
          <p
            style={{ fontFamily: "'Courier Prime', monospace" }}
            className="text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/30"
          >
            A curated collection of
            <br />
            high-fidelity visual systems.
            <br />
            <span className="text-[var(--color-hot-pink)]/70">Engineered for global impact.</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 border-y border-white/5 md:grid-cols-3 lg:grid-cols-4">
        {CLIPS.map((clip, index) => (
          <CinematicCard key={index} clip={clip} />
        ))}
      </div>

      <div className="flex flex-col items-center px-[clamp(24px,6vw,80px)] py-32 text-center">
        <div className="mb-12 h-24 w-[1px] bg-gradient-to-b from-[var(--color-electric-blue)] via-[var(--color-hot-pink)] to-transparent" />
        <button
          onClick={() => fireCTAAndOpenWhatsApp("concept-06-reel")}
          className="group cta-secondary relative overflow-hidden border px-12 py-6 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(49,93,255,0.04),rgba(255,47,146,0.02))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span
            style={{ fontFamily: "'Courier Prime', monospace" }}
            className="relative text-xs font-bold uppercase tracking-[0.8em] text-white transition-colors duration-500 group-hover:text-[var(--color-acid-lime)]"
          >
            Initialize Project
          </span>
        </button>
        <p
          style={{ fontFamily: "'Courier Prime', monospace" }}
          className="mt-12 text-[9px] uppercase tracking-[0.4em] text-white/10"
        >
          DANVERSE · Engineering Cinematic Excellence
        </p>
      </div>
    </section>
  )
}
