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
"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const CLIPS = [
  { id:"1174583531", ratio:"21/9",  cat:"FILM",     title:"Cinematic Open",    fmt:"CINEMASCOPE · COLOR GRADED" },
  { id:"1174570412", ratio:"16/9",  cat:"BRAND",    title:"Brand Motion",      fmt:"4K · WIDESCREEN" },
  { id:"1174570414", ratio:"9/16",  cat:"SOCIAL",   title:"Vertical Story",    fmt:"9:16 · SOCIAL FIRST" },
  { id:"1174570411", ratio:"9/16",  cat:"AD",       title:"Performance Ad",    fmt:"9:16 · CONVERSION" },
  { id:"1174570425", ratio:"16/9",  cat:"SAAS",     title:"Tech Reveal",       fmt:"16:9 · PRODUCT" },
  { id:"1174570410", ratio:"21/9",  cat:"FILM",     title:"Wide Format",       fmt:"21:9 · ANAMORPHIC" },
  { id:"1164910761", ratio:"9/16",  cat:"BRAND",    title:"Brand Story",       fmt:"9:16 · VERTICAL" },
  { id:"1164910689", ratio:"16/9",  cat:"B2B",      title:"Corporate Film",    fmt:"16:9 · B2B" },
  { id:"1164910681", ratio:"16/9",  cat:"PRODUCT",  title:"Product Macro",     fmt:"16:9 · 60FPS" },
  { id:"1164910758", ratio:"9/16",  cat:"SOCIAL",   title:"Story Campaign",    fmt:"9:16 · STORY" },
  { id:"1164910756", ratio:"21/9",  cat:"FILM",     title:"Epic Wide",         fmt:"21:9 · CINEMATIC" },
  { id:"1164910687", ratio:"16/9",  cat:"IDENTITY", title:"Brand Identity",    fmt:"16:9 · MOTION" },
  { id:"1164910690", ratio:"9/16",  cat:"AD",       title:"Social Ad",         fmt:"9:16 · PERFORMANCE" },
] as const

type Clip = typeof CLIPS[number]

function formatLabel(ratio: string) {
  if (ratio === "9/16") return "9:16 · VERTICAL"
  if (ratio === "21/9") return "21:9 · CINEMASCOPE"
  return "16:9 · WIDESCREEN"
}

function VimeoFrame({ clip }: { clip: Clip }) {
  const isVertical = clip.ratio === "9/16"
  return (
    <div style={{ position:"relative", width:"100%", display:"flex", justifyContent:"center", background:"#050505", padding: isVertical ? "clamp(24px,4vw,60px) 0" : "0" }}>
      <div style={{ position:"relative", width: isVertical ? "min(360px, 60vw)" : "100%", aspectRatio: clip.ratio, overflow:"hidden", background:"#000" }}>
        <iframe
          key={clip.id}
          src={`https://player.vimeo.com/video/${clip.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none", pointerEvents:"none" }}
          allow="autoplay; fullscreen"
        />
        {!isVertical && (
          <>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)", zIndex:1 }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"clamp(20px,4vw,48px)", zIndex:2 }}>
              <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"5px", textTransform:"uppercase", color:"#e63c2f", marginBottom:"6px" }}>{clip.cat}</p>
              <h3 style={{ fontFamily:"Bebas Neue,Arial Black,sans-serif", fontSize:"clamp(28px,5vw,68px)", color:"#fff", letterSpacing:"2px", lineHeight:0.88, margin:0 }}>{clip.title}</h3>
              <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginTop:"8px" }}>{clip.fmt}</p>
            </div>
          </>
        )}
      </div>
      {isVertical && (
        <div style={{ position:"absolute", bottom:"clamp(8px,2vw,24px)", left:"50%", transform:"translateX(-50%)", textAlign:"center", zIndex:2, pointerEvents:"none" }}>
          <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"8px", letterSpacing:"4px", textTransform:"uppercase", color:"#e63c2f", margin:0 }}>{clip.cat}</p>
          <h3 style={{ fontFamily:"Bebas Neue,Arial Black,sans-serif", fontSize:"clamp(22px,4vw,40px)", color:"#fff", letterSpacing:"2px", lineHeight:0.9, margin:"4px 0 0", whiteSpace:"nowrap" }}>{clip.title}</h3>
        </div>
      )}
    </div>
  )
}

export function PricingExamplesStrip() {
  const [active, setActive] = useState(0)
  const [reduce, setReduce] = useState(false)
  const auto = useRef<ReturnType<typeof setInterval>|null>(null)

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion:reduce)").matches) }, [])

  const start = useCallback(() => {
    if (reduce) return
    if (auto.current) clearInterval(auto.current)
    auto.current = setInterval(() => setActive(p => (p + 1) % CLIPS.length), 4500)
  }, [reduce])

  const stop = useCallback(() => {
    if (auto.current) { clearInterval(auto.current); auto.current = null }
  }, [])

  useEffect(() => { start(); return stop }, [start, stop])

  const clip = CLIPS[active]

  return (
    <section style={{ background:"#000", borderTop:"1px solid rgba(255,255,255,0.04)" }} onMouseEnter={stop} onMouseLeave={start}>
      <div style={{ padding:"60px clamp(24px,6vw,80px) 40px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"24px", flexWrap:"wrap" }}>
        <div>
          <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"6px", textTransform:"uppercase", color:"#e63c2f", marginBottom:"12px" }}>CONCEPT 06 / THE WORK</p>
          <h2 style={{ fontFamily:"Bebas Neue,Arial Black,sans-serif", fontSize:"clamp(36px,6vw,64px)", lineHeight:0.88, color:"#fff", margin:0 }}>Production<br/>2024-2026.</h2>
        </div>
        <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", textAlign:"right", lineHeight:2 }}>
          {CLIPS.length} projects<br/>Click to browse<br/><span style={{ color:"#e63c2f" }}>All formats</span>
        </div>
      </div>
      <div style={{ height:"36px", background:"#060606", borderTop:"1px solid rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(24px,6vw,80px)" }}>
        <span style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"4px", textTransform:"uppercase", color:"rgba(255,255,255,0.2)" }}>{String(active+1).padStart(2,"0")} / {String(CLIPS.length).padStart(2,"0")}</span>
        <span style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"4px", textTransform:"uppercase", color:"#e63c2f" }}>{formatLabel(clip.ratio)}</span>
      </div>
      <VimeoFrame clip={clip} />
      <div style={{ height:"2px", background:"rgba(255,255,255,0.06)" }}>
        <div style={{ height:"100%", background:"#e63c2f", width:`${((active+1)/CLIPS.length)*100}%`, transition:"width 0.5s ease" }} />
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"3px", padding:"16px clamp(24px,6vw,80px) 20px", overflowX:"auto", scrollbarWidth:"none", background:"#050505", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
        {CLIPS.map((c,i) => {
          const isActive = i === active
          const tw = c.ratio==="9/16" ? "clamp(30px,3vw,46px)" : c.ratio==="21/9" ? "clamp(80px,9vw,120px)" : "clamp(56px,6.5vw,86px)"
          return (
            <button key={i} onClick={() => { stop(); setActive(i) }} style={{ flexShrink:0, width:tw, background:"none", border:"none", cursor:"pointer", padding:0, opacity: isActive?1:0.3, transition:"opacity 0.3s, transform 0.2s", transform: isActive?"translateY(-2px)":"none" }}>
              <div style={{ width:"100%", aspectRatio:c.ratio, background: isActive?"#e63c2f":"#181818", border:`1px solid ${isActive?"#e63c2f":"rgba(255,255,255,0.05)"}`, transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {isActive && <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#fff" }} />}
              </div>
              <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"6px", letterSpacing:"1px", textTransform:"uppercase", color: isActive?"#e63c2f":"rgba(255,255,255,0.2)", marginTop:"3px", textAlign:"left", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.cat}</p>
            </button>
          )
        })}
      </div>
      <div style={{ height:"36px", background:"#000", display:"flex", alignItems:"center", justifyContent:"flex-end", padding:"0 clamp(24px,6vw,80px)" }}>
        <span style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"4px", textTransform:"uppercase", color:"rgba(255,255,255,0.12)" }}>DANVERSE · PRODUCTION 2026</span>
      </div>
      <div style={{ padding:"48px clamp(24px,6vw,80px) 80px" }}>
        <button onClick={() => fireCTAAndOpenWhatsApp("concept-06-reel")} style={{ display:"inline-flex", alignItems:"center", gap:"16px", background:"#e63c2f", color:"#fff", padding:"18px 52px", border:"none", cursor:"pointer", fontFamily:"Courier Prime,monospace", fontSize:"12px", fontWeight:700, letterSpacing:"5px", textTransform:"uppercase" }}>
          Start Your Project
        </button>
        <p style={{ fontFamily:"Courier Prime,monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginTop:"16px" }}>danverse.ai · danverseai@outlook.com</p>
      </div>
    </section>
  )
}
