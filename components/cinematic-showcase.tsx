"use client"

import { useEffect, useRef, useState } from "react"

const VIDEOS = [
  {
    id: "1164910690",
    title: "Social Campaign",
    label: "HIGH-CONVERSION VERTICAL CONTENT",
    type: "9:16 · VERTICAL",
    index: "01",
  },
  {
    id: "1178056977",
    title: "Brand Cinema",
    label: "CINEMATIC BRAND IDENTITY",
    type: "16:9 · CINEMATIC",
    index: "02",
  },
  {
    id: "1174570425",
    title: "Visual Identity",
    label: "LUXURY · MOTION",
    type: "16:9 · DANVERSE",
    index: "03",
  },
  {
    id: "1184992068",
    title: "Product Story",
    label: "PRODUCT · NARRATIVE",
    type: "16:9 · DANVERSE",
    index: "04",
  },
]

export default function CinematicShowcase() {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setLoaded(false)
  }, [active])

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-32">
      <div className="reveal mb-16 flex items-end justify-between px-8 md:px-16">
        <div>
          <p
            style={{ fontFamily: "var(--font-condensed)" }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent)]"
          >
            Selected Work
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-[clamp(3rem,8vw,8rem)] leading-none uppercase text-white"
          >
            Our
            <br />
            <span className="text-stroke">Showreel</span>
          </h2>
        </div>
        <p
          style={{ fontFamily: "var(--font-condensed)" }}
          className="hidden text-sm tracking-widest text-white/40 md:block"
        >
          {String(active + 1).padStart(2, "0")} / {String(VIDEOS.length).padStart(2, "0")}
        </p>
      </div>

      <div
        className="reveal relative mx-8 mb-8 overflow-hidden bg-black md:mx-16"
        style={{
          aspectRatio: VIDEOS[active].type.includes("9:16") ? "9/16" : "16/9",
          maxHeight: "80vh",
          margin: "0 4rem 2rem",
        }}
      >
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]">
            <div className="h-12 w-12 animate-spin rounded-full border border-white/20 border-t-[var(--color-accent)]" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIDEOS[active].id}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          onLoad={() => setLoaded(true)}
          title={VIDEOS[active].title}
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-8">
          <p
            style={{ fontFamily: "var(--font-condensed)" }}
            className="mb-2 text-xs tracking-[0.3em] text-[var(--color-accent)]"
          >
            {VIDEOS[active].label}
          </p>
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="text-[clamp(2.5rem,6vw,6rem)] leading-none uppercase text-white"
          >
            {VIDEOS[active].title}
          </h3>
          <p style={{ fontFamily: "var(--font-condensed)" }} className="mt-1 text-xs tracking-widest text-white/40">
            {VIDEOS[active].type}
          </p>
        </div>
        <div className="absolute right-4 top-4 z-20">
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[5rem] leading-none text-white/5">
            {VIDEOS[active].index}
          </span>
        </div>
      </div>

      <div className="reveal flex gap-4 overflow-x-auto px-8 pb-2 md:px-16">
        {VIDEOS.map((video, index) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-28 w-48 flex-shrink-0 overflow-hidden transition-all duration-500 ${
              index === active
                ? "scale-100 opacity-100 ring-2 ring-[var(--color-accent)]"
                : "scale-95 opacity-40 hover:scale-100 hover:opacity-70"
            }`}
          >
            <img
              src={`https://vumbnail.com/${video.id}.jpg`}
              alt={video.title}
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === active ? "bg-[var(--color-accent)]/20" : "bg-black/40"
              }`}
            />
            <div className="absolute bottom-2 left-2">
              <p
                style={{ fontFamily: "var(--font-condensed)" }}
                className="text-xs uppercase tracking-widest text-white"
              >
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
