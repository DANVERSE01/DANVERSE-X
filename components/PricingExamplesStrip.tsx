"use client"

import React, { useRef, useEffect } from "react"

interface ExampleTile {
  id: string
  label: string
  meta: string
  category: string
  timecode: string
  description: string
  src: string
  isHero?: boolean
}

const EXAMPLES: ExampleTile[] = [
  {
    id: "beauty-launch",
    label: "Beauty Launch Film",
    category: "LAUNCH FILM",
    timecode: "00:14",
    meta: "9:16 · Paid Social · 4K Master",
    description: "High-end product cinematography with fluid transitions and macro details.",
    src: "/videos/fallback.webm",
    isHero: true,
  },
  {
    id: "tech-reveal",
    label: "Tech Product Reveal",
    category: "PRODUCT REVEAL",
    timecode: "00:22",
    meta: "9:16 · Brand Content · 4K Master",
    description: "Precise 3D technical animations highlighting complex internal systems.",
    src: "/videos/fallback.webm",
  },
  {
    id: "luxury-brand",
    label: "Luxury Brand System",
    category: "BRAND SYSTEM",
    timecode: "00:32",
    meta: "9:16 · Campaign · 4K Master",
    description: "Cohesive visual language and cinematic storytelling for premium brands.",
    src: "/videos/fallback.webm",
  },
]

const Tile = ({ item }: { item: ExampleTile }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  // Feature A: REAL Pointer-based Tilt using rAF and CSS Variables
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xc = rect.width / 2
      const yc = rect.height / 2
      const dx = x - xc
      const dy = y - yc
      
      // Feature A: RotateX/RotateY calculation
      const rx = -(dy / yc) * 12 // Increased for more visible 3D feel
      const ry = (dx / xc) * 12

      cardRef.current?.style.setProperty("--rx", `${rx}deg`)
      cardRef.current?.style.setProperty("--ry", `${ry}deg`)
      cardRef.current?.style.setProperty("--mx", `${(x / rect.width) * 100}%`)
      cardRef.current?.style.setProperty("--my", `${(y / rect.height) * 100}%`)
    })
  }

  const handlePointerLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    // Feature A: Smooth spring back via CSS transition
    cardRef.current?.style.setProperty("--rx", "0deg")
    cardRef.current?.style.setProperty("--ry", "0deg")
  }

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative flex flex-col bg-[#050505] border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:border-white/25 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] ${
        item.isHero ? "md:col-span-2 aspect-[16/9] md:aspect-auto" : "aspect-[9/16] md:aspect-auto"
      }`}
      style={{
        transform: "perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Feature C: Thin Scanline/Noise Layer (CSS only) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-40 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZEADjIwMDIyMjIwMDEwMDEwMDEwMDEwMDEwMDEwMDEwMDEwMDF8BAO/07/5XfP+EAAAAAElFTkSuQmCC')] bg-repeat" />
      
      {/* Feature B: Specular Light Sweep (REAL Pseudo-element) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-30 overflow-hidden">
        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Feature E: Video Treatment (REAL Cinematic) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
        {/* Feature E: Cinematic Vignette + Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 z-10" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col justify-between h-full p-8 md:p-10">
        {/* Top Meta */}
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <span className="text-[11px] font-black tracking-[0.4em] text-red-500 uppercase leading-none block">
              {item.category}
            </span>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
              {item.meta}
            </p>
          </div>
          {/* Feature D: Timecode Label */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="font-mono text-[11px] font-bold text-white/80 bg-white/5 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-md">
              {item.timecode}
            </span>
            {/* Feature D: Timecode Progress Bar */}
            <div className="w-12 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 animate-progress-loop" />
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            {/* Feature F: Tightened Tracking + Hierarchy */}
            <h3 className={`font-black tracking-tighter text-white group-hover:text-red-400 transition-colors duration-500 uppercase leading-[0.9] ${
              item.isHero ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
            }`}>
              {item.label}
            </h3>
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-md font-medium">
              {item.description}
            </p>
          </div>

          {/* CTA with subtle lift */}
          <div className="pt-2">
            <button className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase text-white group/btn transition-all duration-500 hover:text-red-400">
              <span className="relative overflow-hidden py-1.5">
                View Showcase
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-in-out" />
              </span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PricingExamplesStrip() {
  return (
    <div className="w-full space-y-20">
      {/* Kinetic Typography Header */}
      <header className="text-center space-y-8 max-w-5xl mx-auto px-4" aria-labelledby="pricing-heading">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.5em] text-red-500 font-black">
            System Intelligence
          </span>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
        
        <div className="space-y-6">
          {/* Feature C: Headline Shimmer (REAL Gradient Animation) */}
          <h2 id="pricing-heading" className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[ -0.05em] text-white uppercase leading-[0.85]">
            <span className="block bg-[linear-gradient(110deg,#fff,45%,#666,55%,#fff)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
              Cinematic
            </span>
            <span className="block text-red-500">Protocol</span>
          </h2>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
            Advanced creative engineering. Redefining high-fidelity brand systems through cinematic precision.
          </p>
        </div>
      </header>

      {/* Feature F: Film-strip Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[1400px] mx-auto px-4">
        {/* HERO tile (spans 2 columns) */}
        <Tile item={EXAMPLES[0]} />
        
        {/* Secondary tiles stacked in the right column */}
        <div className="flex flex-col gap-8 lg:gap-10 h-full">
          <Tile item={EXAMPLES[1]} />
          <Tile item={EXAMPLES[2]} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes progress-loop {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 5s linear infinite;
        }
        .animate-progress-loop {
          animation: progress-loop 3s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer, .animate-progress-loop {
            animation: none;
          }
          article {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
