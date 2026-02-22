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
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.01 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden bg-black border-[0.5px] border-white/5 transition-all duration-700 ease-out hover:z-10 hover:border-white/20 ${item.span || ""} ${
        item.aspect === "portrait" ? "aspect-[9/16]" : item.aspect === "square" ? "aspect-square" : "aspect-video"
      }`}
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
          className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 bg-[#050505]" />
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-10" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
      
      {/* Content Layer */}
      <div className="relative z-20 flex h-full flex-col justify-between p-5 md:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase mix-blend-difference">{item.category}</span>
          <div className="h-[1px] w-4 bg-white/20" />
        </div>
        
        <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <h3 className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none">
            {item.title}
          </h3>
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            <span className="text-[8px] font-mono text-red-600 tracking-widest uppercase">{item.meta}</span>
            <div className="h-[1px] flex-1 bg-red-600/30" />
          </div>
        </div>
      </div>

      {/* Film Grain / Noise Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
    </div>
  )
}

export function PricingExamplesStrip() {
  return (
    <div className="w-full bg-black py-24 md:py-40 overflow-hidden">
      {/* High-End Typography Header */}
      <header className="relative mb-20 md:mb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-red-600" />
                <span className="text-[10px] font-bold tracking-[0.5em] text-red-600 uppercase">Production 2026</span>
              </div>
              <h2 className="text-5xl md:text-[7vw] font-black tracking-[-0.05em] text-white uppercase leading-[0.9]">
                Cinematic<br/>
                <span className="text-transparent stroke-text">Showreel</span>
              </h2>
            </div>
            
            <div className="max-w-md">
              <p className="text-sm md:text-lg font-medium text-white/40 leading-relaxed uppercase tracking-tight">
                A curated collection of high-fidelity visual systems. Engineered for brands that demand global impact and creative excellence.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Gapless Cinematic Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/5">
        {SHOWREEL_DATA.map((item) => (
          <VideoTile key={item.id} item={item} />
        ))}
      </div>

      {/* Minimalist Footer CTA */}
      <footer className="mt-24 md:mt-40 px-6 text-center">
        <div className="inline-flex flex-col items-center gap-8">
          <div className="h-20 w-[1px] bg-gradient-to-b from-red-600 to-transparent" />
          <button className="group relative overflow-hidden">
            <span className="block text-[10px] font-black tracking-[0.8em] text-white uppercase transition-transform duration-500 group-hover:-translate-y-full">
              Initialize Project
            </span>
            <span className="absolute inset-0 text-[10px] font-black tracking-[0.8em] text-red-600 uppercase translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              Initialize Project
            </span>
          </button>
        </div>
      </footer>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (max-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  )
}
