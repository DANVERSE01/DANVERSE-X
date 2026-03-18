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
