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
      // Max rotation 10deg
      const rx = -(dy / yc) * 10
      const ry = (dx / xc) * 10

      cardRef.current?.style.setProperty("--rx", `${rx}deg`)
      cardRef.current?.style.setProperty("--ry", `${ry}deg`)
      cardRef.current?.style.setProperty("--mx", `${x}px`)
      cardRef.current?.style.setProperty("--my", `${y}px`)
    })
  }

  const handlePointerLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
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
      className={`group relative flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        item.isHero ? "md:col-span-2 aspect-[16/9] md:aspect-auto" : "aspect-[9/16] md:aspect-auto"
      }`}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Specular Sweep Highlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-30 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.15)_0%,transparent_50%)]" />

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-10" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col justify-between h-full p-6 md:p-8">
        {/* Top Meta */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">
              {item.category}
            </span>
            <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
              {item.meta}
            </p>
          </div>
          <span className="font-mono text-[10px] text-white/60 bg-white/5 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
            {item.timecode}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className={`font-bold tracking-tight text-white group-hover:text-red-400 transition-colors duration-300 ${
              item.isHero ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
            }`}>
              {item.label}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              {item.description}
            </p>
          </div>

          {/* Magnetic CTA feel */}
          <div className="pt-2">
            <button className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white group/btn transition-all duration-300">
              <span className="relative overflow-hidden py-1">
                View Examples
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500 transform translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500" />
              </span>
              <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
    <div className="w-full space-y-16">
      {/* Kinetic Typography Header */}
      <header className="text-center space-y-6 max-w-4xl mx-auto px-4" aria-labelledby="pricing-heading">
        <div className="inline-flex items-center gap-3">
          <div className="h-[1px] w-8 bg-red-500/50" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold">
            Creative Operating System
          </span>
          <div className="h-[1px] w-8 bg-red-500/50" />
        </div>
        
        <div className="space-y-4">
          <h2 id="pricing-heading" className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            <span className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent animate-shimmer">
              Cinematic
            </span>
            <span className="block text-red-500">Excellence</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto font-light leading-relaxed">
            High-fidelity cinematic examples engineered for maximum brand impact.
          </p>
        </div>
      </header>

      {/* Film-strip Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
        {/* HERO tile (spans 2 columns) */}
        <Tile item={EXAMPLES[0]} />
        
        {/* Secondary tiles stacked in the right column */}
        <div className="flex flex-col gap-6 lg:gap-8 h-full">
          <Tile item={EXAMPLES[1]} />
          <Tile item={EXAMPLES[2]} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { opacity: 0.8; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.2); }
          100% { opacity: 0.8; filter: brightness(1); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
