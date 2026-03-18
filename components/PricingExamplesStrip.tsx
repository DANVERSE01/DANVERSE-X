"use client"

import React, { useRef, useEffect, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const GRID = [
  { id:"1174583531", cat:"FILM",     title:"Cinematic Open",  meta:"21:9 · Cinemascope",  span:"md:col-span-3", aspect:"aspect-[21/9]" },
  { id:"1174570414", cat:"SOCIAL",   title:"Vertical Story",  meta:"9:16 · Social First", span:"md:col-span-1", aspect:"aspect-[9/16]" },
  { id:"1174570412", cat:"BRAND",    title:"Brand Motion",    meta:"4K · Widescreen",     span:"md:col-span-2 md:row-span-2", aspect:"aspect-video" },
  { id:"1174570411", cat:"AD",       title:"Performance Ad",  meta:"9:16 · Conversion",   span:"md:col-span-1", aspect:"aspect-[9/16]" },
  { id:"1174570425", cat:"SAAS",     title:"Tech Reveal",     meta:"16:9 · Product",      span:"md:col-span-1", aspect:"aspect-video" },
  { id:"1174570410", cat:"FILM",     title:"Wide Format",     meta:"21:9 · Anamorphic",   span:"md:col-span-4", aspect:"aspect-[21/9]" },
  { id:"1164910761", cat:"BRAND",    title:"Brand Story",     meta:"9:16 · Vertical",     span:"md:col-span-1", aspect:"aspect-[9/16]" },
  { id:"1164910689", cat:"B2B",      title:"Corporate Film",  meta:"16:9 · B2B",          span:"md:col-span-2", aspect:"aspect-video" },
  { id:"1164910758", cat:"SOCIAL",   title:"Story Campaign",  meta:"9:16 · Story",        span:"md:col-span-1", aspect:"aspect-[9/16]" },
  { id:"1164910681", cat:"PRODUCT",  title:"Product Macro",   meta:"60FPS · Detail",      span:"md:col-span-1", aspect:"aspect-square" },
  { id:"1164910756", cat:"FILM",     title:"Epic Wide",       meta:"21:9 · Cinematic",    span:"md:col-span-2", aspect:"aspect-[21/9]" },
  { id:"1164910690", cat:"AD",       title:"Social Ad",       meta:"9:16 · Performance",  span:"md:col-span-1", aspect:"aspect-[9/16]" },
  { id:"1164910687", cat:"IDENTITY", title:"Brand Identity",  meta:"Motion · Logo",       span:"md:col-span-4", aspect:"aspect-video" },
]

function Tile({ item }: { item: typeof GRID[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden bg-[#050505] border-[0.5px] border-white/5 cursor-pointer ${item.span} ${item.aspect}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            border: "none",
            filter: hovered ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.5)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "filter 0.9s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow="autoplay; fullscreen"
        />
      )}
      <div className="absolute inset-0 z-10" style={{ background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)", transition: "background 0.7s ease" }} />
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6">
        <span className="text-[8px] font-bold tracking-[0.4em] uppercase" style={{ color: hovered ? "#e63c2f" : "rgba(255,255,255,0.3)", transition: "color 0.4s", fontFamily: "'Courier Prime', monospace" }}>{item.cat}</span>
        <div className="h-px" style={{ width: hovered ? "40px" : "16px", background: hovered ? "#e63c2f" : "rgba(255,255,255,0.15)", transition: "width 0.5s ease, background 0.4s" }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6" style={{ transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
        <h3 className="font-black uppercase leading-none text-white" style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(18px, 3vw, 48px)", letterSpacing: "0.03em" }}>{item.title}</h3>
        <div className="flex items-center gap-3 mt-2" style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
          <span className="text-[7px] tracking-[0.3em] uppercase font-mono" style={{ color: "#e63c2f", fontFamily: "'Courier Prime', monospace" }}>{item.meta}</span>
          <div className="h-px flex-1" style={{ background: "rgba(230,60,47,0.3)" }} />
        </div>
      </div>
      <div className="absolute inset-0 z-30 pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.03 }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(230,60,47,0.4)" : "inset 0 0 0 1px transparent", transition: "box-shadow 0.4s ease" }} />
    </div>
  )
}

export function PricingExamplesStrip() {
  return (
    <div className="w-full bg-black overflow-hidden" style={{ paddingTop: "clamp(60px,8vw,120px)" }}>
      <header className="px-6 md:px-12 mb-16 md:mb-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "#e63c2f" }} />
              <span className="text-[9px] font-bold tracking-[0.5em] uppercase" style={{ color: "#e63c2f", fontFamily: "'Courier Prime', monospace" }}>Production 2024–2026</span>
            </div>
            <h2 className="text-white uppercase leading-[0.85]" style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(52px, 9vw, 120px)", letterSpacing: "-0.02em" }}>
              Cinematic<br />
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>Showreel</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed" style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            A curated collection of high-fidelity visual systems. Engineered for brands that demand global impact and creative excellence.
          </p>
        </div>
      </header>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/5">
        {GRID.map((item) => <Tile key={item.id} item={item} />)}
      </div>

      <footer className="text-center" style={{ padding: "clamp(60px,8vw,120px) 24px" }}>
        <div className="inline-flex flex-col items-center gap-8">
          <div className="w-px" style={{ height: "80px", background: "linear-gradient(to bottom, #e63c2f, transparent)" }} />
          <button type="button" onClick={() => fireCTAAndOpenWhatsApp("showreel-cta")} className="group relative overflow-hidden" style={{ height: "20px" }}>
            <span className="block font-black uppercase" style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "0.8em", color: "#fff", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>Initialize Project</span>
            <span className="absolute inset-0 font-black uppercase" style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "0.8em", color: "#e63c2f", transform: "translateY(100%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>Initialize Project</span>
          </button>
        </div>
        <style jsx>{`
          button:hover span:first-child { transform: translateY(-100%) }
          button:hover span:last-child  { transform: translateY(0) }
        `}</style>
      </footer>
    </div>
  )
}
