"use client"

import { useState, useRef } from "react"
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
      className={`relative overflow-hidden bg-zinc-900 group ${clip.span}`}
      style={{ aspectRatio: clip.ratio }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Layer */}
      <div className="absolute inset-0 z-0">
        <LazyVideo
          src={clip.src}
          autoplay
          muted
          loop
          playsInline
          className={`h-full w-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) ${
            hovered ? "scale-110 brightness-110" : "scale-100 brightness-50 grayscale-[0.5]"
          }`}
        />
      </div>

      {/* Overlay Gradients */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${hovered ? "opacity-40" : "opacity-70"}`}
        style={{
          background: "linear-gradient(to top, #000 0%, transparent 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
        <div
          className={`transition-all duration-700 delay-100 ${
            hovered ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <span
            style={{ fontFamily: "'Courier Prime', monospace" }}
            className="text-[10px] tracking-[0.4em] text-red-500 uppercase font-bold"
          >
            {clip.cat}
          </span>
        </div>

        <div className="transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)">
          <h3
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
            className={`text-white leading-[0.85] transition-all duration-700 ${
              hovered ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl"
            }`}
          >
            {clip.title}
          </h3>
          <div
            className={`mt-4 flex items-center gap-4 transition-all duration-700 delay-200 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              style={{ fontFamily: "'Courier Prime', monospace" }}
              className="text-[9px] tracking-widest text-white/40 uppercase"
            >
              {clip.fmt}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Interactive Border */}
      <div
        className={`absolute inset-0 z-30 border transition-colors duration-700 pointer-events-none ${
          hovered ? "border-red-500/30" : "border-white/5"
        }`}
      />
    </div>
  )
}

export function ReelSection() {
  return (
    <section className="bg-gradient-to-b from-black/60 to-black/40 border-t border-white/5">
      {/* Header Section */}
      <div className="px-[clamp(24px,6vw,80px)] py-20 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <p
              style={{ fontFamily: "'Courier Prime', monospace" }}
              className="text-[10px] tracking-[0.6em] text-red-500 uppercase font-bold"
            >
              CONCEPT 06 / THE WORK
            </p>
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-[clamp(2.5rem,6vw,6rem)] leading-none uppercase text-white md:text-[clamp(3.5rem,8vw,7.5rem)]"
          >
            Production
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">2024–2026</span>
          </h2>
        </div>
        <div className="text-right hidden md:block">
          <p
            style={{ fontFamily: "'Courier Prime', monospace" }}
            className="text-[11px] tracking-[0.2em] text-white/30 uppercase leading-relaxed"
          >
            A curated collection of
            <br />
            high-fidelity visual systems.
            <br />
            <span className="text-red-500/50">Engineered for global impact.</span>
          </p>
        </div>
      </div>

      {/* Masonry Cinema Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 border-y border-white/5">
        {CLIPS.map((clip, i) => (
          <CinematicCard key={i} clip={clip} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="px-[clamp(24px,6vw,80px)] py-32 flex flex-col items-center text-center">
        <div className="w-[1px] h-24 bg-gradient-to-b from-red-500 to-transparent mb-12" />
        <button
          type="button"
          onClick={() => fireCTAAndOpenWhatsApp("concept-06-reel")}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-black font-semibold tracking-widest uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[var(--color-accent-2)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] active:scale-95"
        >
          <span
            style={{ fontFamily: "var(--font-condensed)" }}
            className="relative text-sm tracking-[0.4em] uppercase font-semibold"
          >
            Initialize Project
          </span>
        </button>
        <p
          style={{ fontFamily: "'Courier Prime', monospace" }}
          className="mt-12 text-[9px] tracking-[0.4em] text-white/10 uppercase"
        >
          DANVERSE · Engineering Cinematic Excellence
        </p>
      </div>
    </section>
  )
}
