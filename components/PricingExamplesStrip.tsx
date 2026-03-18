"use client"

import React, { useRef, useEffect, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const GRID = [
  { id:"1174583531", cat:"FILM",     title:"Cinematic Open",  meta:"21:9",  col:"md:col-span-3", aspect:"aspect-[21/9]",  delay:0   },
  { id:"1174570414", cat:"SOCIAL",   title:"Vertical Story",  meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:60  },
  { id:"1174570412", cat:"BRAND",    title:"Brand Motion",    meta:"16:9",  col:"md:col-span-2", aspect:"aspect-video",   delay:120 },
  { id:"1174570411", cat:"AD",       title:"Performance Ad",  meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:180 },
  { id:"1174570425", cat:"SAAS",     title:"Tech Reveal",     meta:"16:9",  col:"md:col-span-1", aspect:"aspect-video",   delay:240 },
  { id:"1174570410", cat:"FILM",     title:"Wide Format",     meta:"21:9",  col:"md:col-span-4", aspect:"aspect-[21/9]",  delay:80  },
  { id:"1164910761", cat:"BRAND",    title:"Brand Story",     meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:140 },
  { id:"1164910689", cat:"B2B",      title:"Corporate Film",  meta:"16:9",  col:"md:col-span-2", aspect:"aspect-video",   delay:200 },
  { id:"1164910758", cat:"SOCIAL",   title:"Story Campaign",  meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:260 },
  { id:"1164910681", cat:"PRODUCT",  title:"Product Macro",   meta:"1:1",   col:"md:col-span-1", aspect:"aspect-square",  delay:100 },
  { id:"1164910756", cat:"FILM",     title:"Epic Wide",       meta:"21:9",  col:"md:col-span-2", aspect:"aspect-[21/9]",  delay:160 },
  { id:"1164910690", cat:"AD",       title:"Social Ad",       meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:220 },
  { id:"1164910687", cat:"IDENTITY", title:"Brand Identity",  meta:"16:9",  col:"md:col-span-4", aspect:"aspect-video",   delay:300 },
]

function Tile({ item }: { item: typeof GRID[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          setTimeout(() => setEntered(true), item.delay)
        }
      },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [item.delay])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#080808] cursor-pointer ${item.col} ${item.aspect}`}
      style={{
        borderRight: "0.5px solid rgba(255,255,255,0.04)",
        borderBottom: "0.5px solid rgba(255,255,255,0.04)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            border: "none",
            filter: hovered ? "grayscale(0) brightness(0.9)" : "grayscale(1) brightness(0.4)",
            transform: hovered ? "scale(1.07)" : "scale(1.02)",
            transition: "filter 1s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow="autoplay; fullscreen"
        />
      )}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 45%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)",
          transition: "background 0.8s ease",
        }}
      />
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3 md:p-5">
        <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "7px", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700, color: hovered ? "#e63c2f" : "rgba(255,255,255,0.2)", transition: "color 0.4s ease" }}>
          {item.cat}
        </span>
        <div style={{ height: "1px", width: hovered ? "32px" : "10px", background: hovered ? "#e63c2f" : "rgba(255,255,255,0.1)", transition: "width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease" }} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-5"
        style={{ transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <h3 style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(13px, 2.2vw, 38px)", letterSpacing: "0.04em", lineHeight: 0.88, color: "#fff", margin: 0 }}>
          {item.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px", opacity: hovered ? 1 : 0, transition: "opacity 0.5s ease 0.12s" }}>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "6px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#e63c2f" }}>{item.meta}</span>
          <div style={{ height: "1px", flex: 1, background: "rgba(230,60,47,0.2)" }} />
        </div>
      </div>
      <div className="absolute inset-0 z-30 pointer-events-none" style={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(230,60,47,0.45)" : "none", transition: "box-shadow 0.4s ease" }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.025 }} />
    </div>
  )
}

export function PricingExamplesStrip() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerIn, setHeaderIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderIn(true) }, { threshold: 0.15 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="w-full bg-black overflow-hidden">
      <header ref={headerRef} style={{ padding: "clamp(60px,8vw,120px) clamp(24px,6vw,80px) clamp(40px,5vw,72px)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div className="flex items-center gap-3 mb-4" style={{ opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ height: "1px", width: "28px", background: "#e63c2f" }} />
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#e63c2f", fontWeight: 700 }}>Production 2024–2026</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(52px, 9vw, 128px)", lineHeight: 0.85, letterSpacing: "-0.02em", color: "#fff", margin: 0, opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
              Cinematic<br />
              <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent" }}>Showreel</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "0.08em", lineHeight: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", maxWidth: "300px", margin: 0, opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            A curated collection of high-fidelity visual systems. Engineered for brands that demand global impact.
          </p>
        </div>
      </header>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4" style={{ borderTop: "0.5px solid rgba(255,255,255,0.04)" }}>
        {GRID.map((item) => <Tile key={item.id} item={item} />)}
      </div>

      <footer style={{ padding: "clamp(60px,8vw,100px) 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, #e63c2f, transparent)" }} />
          <button type="button" onClick={() => fireCTAAndOpenWhatsApp("showreel-cta")} className="group" style={{ background: "none", border: "none", cursor: "pointer", position: "relative", overflow: "hidden", height: "16px", padding: 0 }}>
            <span className="block group-hover:-translate-y-full" style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.75em", textTransform: "uppercase", color: "#fff", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>Initialize Project</span>
            <span className="absolute inset-0 group-hover:translate-y-0" style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.75em", textTransform: "uppercase", color: "#e63c2f", transform: "translateY(100%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>Initialize Project</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
