"use client"

import React, { useRef, useEffect, useState } from "react"

interface ShowreelItem {
  id: string
  title: string
  category: string
  meta: string
  src: string
  span?: string
}

const SHOWREEL_DATA: ShowreelItem[] = [
  { id: "1", title: "Luxury Motion", category: "BRAND", meta: "4K · 60FPS", src: "/videos/fallback.webm", span: "md:col-span-2 md:row-span-2" },
  { id: "2", title: "Tech Reveal", category: "SaaS", meta: "9:16 · SOCIAL", src: "/videos/fallback.webm" },
  { id: "3", title: "Product Macro", category: "AD", meta: "3D · VFX", src: "/videos/fallback.webm" },
  { id: "4", title: "Dynamic Flow", category: "FILM", meta: "COLOR · GRADED", src: "/videos/fallback.webm" },
  { id: "5", title: "Elite Systems", category: "B2B", meta: "ANIMATION", src: "/videos/fallback.webm", span: "md:col-span-2" },
  { id: "6", title: "Vision 2026", category: "AI", meta: "GEN · ART", src: "/videos/fallback.webm" },
  { id: "7", title: "Brand Core", category: "IDENTITY", meta: "LOGO · MOTION", src: "/videos/fallback.webm" },
  { id: "8", title: "Future Sprints", category: "UI/UX", meta: "INTERACTIVE", src: "/videos/fallback.webm" },
  { id: "9", title: "Master Class", category: "EDU", meta: "STORYTELLING", src: "/videos/fallback.webm" },
]

const VideoTile = ({ item }: { item: ShowreelItem }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafId = useRef<number | null>(null)
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMove = (e: React.PointerEvent) => {
    if (!containerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xc = rect.width / 2
      const yc = rect.height / 2
      
      const rx = (-(y - yc) / yc) * 10
      const ry = ((x - xc) / xc) * 10

      containerRef.current!.style.setProperty("--rx", `${rx}deg`)
      containerRef.current!.style.setProperty("--ry", `${ry}deg`)
      containerRef.current!.style.setProperty("--mx", `${(x / rect.width) * 100}%`)
      containerRef.current!.style.setProperty("--my", `${(y / rect.height) * 100}%`)
    })
  }

  const handleLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    containerRef.current?.style.setProperty("--rx", "0deg")
    containerRef.current?.style.setProperty("--ry", "0deg")
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-out hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] ${item.span || ""}`}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Performance Optimization: Only play video when in viewport */}
      {isIntersecting ? (
        <video
          ref={videoRef}
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100 z-20 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.1)_0%,transparent_50%)]" />

      {/* Content */}
      <div className="relative z-30 flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">{item.category}</span>
          <span className="font-mono text-[9px] text-white/30">{item.meta}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter text-white uppercase leading-none">{item.title}</h3>
          <div className="h-[1px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </div>
  )
}

export function PricingExamplesStrip() {
  return (
    <div className="w-full space-y-24 py-20">
      {/* High-Impact Typography Header */}
      <header className="text-center space-y-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-black tracking-[0.6em] text-red-500 uppercase">System Protocol</span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
        <h2 className="text-7xl md:text-9xl font-black tracking-[-0.07em] text-white uppercase leading-[0.8]">
          <span className="block animate-pulse-slow">Cinematic</span>
          <span className="block text-red-600">Showreel</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg font-medium text-white/30 tracking-tight">
          Engineered for performance. Optimized for impact. 9+ cinematic benchmarks built for the next generation of brands.
        </p>
      </header>

      {/* Advanced Bento Grid with 9+ Items */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3">
        {SHOWREEL_DATA.map((item) => (
          <VideoTile key={item.id} item={item} />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow { animation: none; }
          div { transform: none !important; }
        }
      `}</style>
    </div>
  )
}
