"use client"

import React, { useRef, useEffect, useState } from "react"

interface ShowreelItem {
  id: string
  title: string
  category: string
  meta: string
  src: string
  aspect: "landscape" | "portrait" | "square"
  span?: string
}

const SHOWREEL_DATA: ShowreelItem[] = [
  { id: "1", title: "Luxury Motion", category: "BRAND", meta: "4K · 60FPS", src: "/videos/fallback.webm", aspect: "landscape", span: "md:col-span-2 md:row-span-2" },
  { id: "2", title: "Tech Reveal", category: "SaaS", meta: "9:16 · SOCIAL", src: "/videos/fallback.webm", aspect: "portrait" },
  { id: "3", title: "Product Macro", category: "AD", meta: "3D · VFX", src: "/videos/fallback.webm", aspect: "square" },
  { id: "4", title: "Dynamic Flow", category: "FILM", meta: "COLOR · GRADED", src: "/videos/fallback.webm", aspect: "portrait" },
  { id: "5", title: "Elite Systems", category: "B2B", meta: "ANIMATION", src: "/videos/fallback.webm", aspect: "landscape", span: "md:col-span-2" },
  { id: "6", title: "Vision 2026", category: "AI", meta: "GEN · ART", src: "/videos/fallback.webm", aspect: "portrait" },
  { id: "7", title: "Brand Core", category: "IDENTITY", meta: "LOGO · MOTION", src: "/videos/fallback.webm", aspect: "square" },
  { id: "8", title: "Future Sprints", category: "UI/UX", meta: "INTERACTIVE", src: "/videos/fallback.webm", aspect: "landscape" },
  { id: "9", title: "Master Class", category: "EDU", meta: "STORYTELLING", src: "/videos/fallback.webm", aspect: "portrait" },
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
      
      const rx = (-(y - yc) / yc) * 15
      const ry = ((x - xc) / xc) * 15

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
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/30 hover:shadow-[0_0_100px_rgba(255,255,255,0.05)] ${item.span || ""} ${
        item.aspect === "portrait" ? "aspect-[9/16]" : item.aspect === "square" ? "aspect-square" : "aspect-video"
      }`}
      style={{
        transform: "perspective(1500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Cinematic Video Layer */}
      {isIntersecting ? (
        <video
          ref={videoRef}
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-90"
        />
      ) : (
        <div className="absolute inset-0 bg-black/80" />
      )}

      {/* Deep Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
      
      {/* Interactive Light Highlight */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-20 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.15)_0%,transparent_60%)]" />

      {/* Overlapping Kinetic Typography */}
      <div className="relative z-30 flex h-full flex-col justify-between p-8 md:p-10">
        <div className="flex items-center justify-between mix-blend-difference">
          <span className="text-[11px] font-black tracking-[0.5em] text-red-500 uppercase leading-none">{item.category}</span>
          <span className="font-mono text-[10px] text-white/40 tracking-widest">{item.meta}</span>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-3xl md:text-5xl font-black tracking-[-0.08em] text-white uppercase leading-[0.8] transition-all duration-700 group-hover:text-red-500 group-hover:tracking-[-0.05em]">
            {item.title.split(' ').map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="block transform transition-transform duration-700 group-hover:translate-y-0 translate-y-[100%]">
                  {word}
                </span>
              </span>
            ))}
            <span className="block mt-2 h-[2px] w-0 bg-red-500 transition-all duration-1000 ease-out group-hover:w-full" />
          </h3>
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
            Creative Direction Locked
          </p>
        </div>
      </div>

      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-40 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZEADjIwMDIyMjIwMDEwMDEwMDEwMDEwMDEwMDEwMDEwMDEwMDF8BAO/07/5XfP+EAAAAAElFTkSuQmCC')] bg-repeat" />
    </div>
  )
}

export function PricingExamplesStrip() {
  return (
    <div className="w-full space-y-32 py-32 bg-black">
      {/* World-Class Kinetic Header */}
      <header className="relative text-center space-y-10 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
          <h2 className="text-[20vw] font-black tracking-tighter text-white uppercase leading-none select-none">
            DANVERSE
          </h2>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[12px] font-black tracking-[0.8em] text-red-600 uppercase">Engineered for Impact</span>
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </div>
          
          <h2 className="text-8xl md:text-[12rem] font-black tracking-[-0.1em] text-white uppercase leading-[0.75]">
            <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent animate-shimmer">
              Cinematic
            </span>
            <span className="block text-red-700 filter drop-shadow-[0_0_30px_rgba(185,28,28,0.3)]">
              Showreel
            </span>
          </h2>
          
          <p className="mx-auto max-w-3xl text-xl md:text-2xl font-bold text-white/20 tracking-tighter leading-tight uppercase">
            A system of high-fidelity creative benchmarks. <br/>
            <span className="text-white/40">9+ production-ready outputs locked for 2026.</span>
          </p>
        </div>
      </header>

      {/* Advanced Dynamic Grid */}
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-4 auto-rows-auto">
        {SHOWREEL_DATA.map((item) => (
          <VideoTile key={item.id} item={item} />
        ))}
      </div>

      {/* Bottom CTA Section */}
      <footer className="text-center py-20">
        <button className="group relative px-12 py-6 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-red-600">
          <div className="absolute inset-0 bg-red-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
          <span className="relative z-10 text-[12px] font-black tracking-[0.5em] text-white uppercase group-hover:text-white transition-colors duration-500">
            Initialize Project
          </span>
        </button>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .animate-shimmer {
          background-image: linear-gradient(110deg, #fff 45%, #444 50%, #fff 55%);
          background-size: 200% 100%;
          animation: shimmer 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer { animation: none; }
          div { transform: none !important; }
        }
      `}</style>
    </div>
  )
}
