"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import LazyVideo from "@/components/lazy-video"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const CLIPS = [
  { cat: "BRAND",    title: "Luxury Motion",   fmt: "4K - 60FPS - Color Graded",   src: "/videos/conversions.mp4",  bg: "#060606" },
  { cat: "SAAS",     title: "Tech Reveal",      fmt: "9:16 - Social First",          src: "/videos/speed.mp4",        bg: "#000" },
  { cat: "AD",       title: "Product Macro",    fmt: "3D - VFX - 60FPS",             src: "/videos/social-ready.mp4", bg: "#060606" },
  { cat: "FILM",     title: "Dynamic Flow",     fmt: "Cinematic - Color Graded",     src: "/videos/standout.mp4",     bg: "#000" },
  { cat: "B2B",      title: "Elite Systems",    fmt: "Motion - Brand Animation",     src: "/videos/premium.mp4",      bg: "#060606" },
  { cat: "AI",       title: "Vision 2026",      fmt: "Generative - Art Direction",   src: "/videos/conversions.mp4",  bg: "#000" },
  { cat: "IDENTITY", title: "Brand Core",       fmt: "Logo - Motion - Identity",     src: "/videos/speed.mp4",        bg: "#060606" },
  { cat: "UIUX",     title: "Future Sprints",   fmt: "Interactive - Product",        src: "/videos/social-ready.mp4", bg: "#000" },
  { cat: "EDU",      title: "Master Class",     fmt: "Storytelling - Long Form",     src: "/videos/standout.mp4",     bg: "#060606" },
]

export function ReelSection() {
  const [active, setActive] = useState(0)
  const [shouldReduce, setShouldReduce] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => { setShouldReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches) }, [])

  const startAuto = useCallback(() => {
    if (shouldReduce) return
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setActive(p => (p + 1) % CLIPS.length), 2500)
  }, [shouldReduce])

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = null
  }, [])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  const clip = CLIPS[active]

  return (
    <section style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      <div style={{ padding: "60px clamp(24px,6vw,80px) 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "6px", textTransform: "uppercase", color: "#e63c2f", marginBottom: "12px" }}>CONCEPT 06 / THE WORK</p>
          <h2 style={{ fontFamily: "Bebas Neue, Arial Black, sans-serif", fontSize: "clamp(36px,6vw,64px)", lineHeight: 0.88, color: "#fff" }}>
            Production<br />2024-2026.
          </h2>
        </div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", textAlign: "right", lineHeight: 2 }}>
          9 projects<br />Click to browse<br />
          <span style={{ color: "#e63c2f" }}>All formats</span>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ height: "clamp(16px,3vw,40px)", background: "#000", display: "flex", alignItems: "center", padding: "0 clamp(24px,6vw,80px)" }}>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>{String(active + 1).padStart(2, "0")} / 09</span>
        </div>
        <div style={{ position: "relative", width: "100%", aspectRatio: "2.35/1", overflow: "hidden", background: clip.bg, transition: "background 0.5s ease" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <LazyVideo src={clip.src} autoplay muted loop playsInline className="h-full w-full object-cover" />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px,4vw,48px)", zIndex: 2 }}>
            <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#e63c2f", marginBottom: "6px" }}>{clip.cat}</p>
            <h3 style={{ fontFamily: "Bebas Neue, Arial Black, sans-serif", fontSize: "clamp(32px,6vw,72px)", color: "#fff", letterSpacing: "2px", lineHeight: 0.9 }}>{clip.title}</h3>
            <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}>{clip.fmt}</p>
          </div>
        </div>
        <div style={{ height: "2px", background: "rgba(255,255,255,0.08)" }}>
          <div style={{ height: "100%", background: "#e63c2f", width: `${((active + 1) / CLIPS.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ height: "clamp(16px,3vw,40px)", background: "#000", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 clamp(24px,6vw,80px)" }}>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>DANVERSE - PRODUCTION 2026</span>
        </div>
        <div style={{ display: "flex", gap: "2px", padding: "0 clamp(24px,6vw,80px)", paddingBottom: "48px", overflowX: "auto", scrollbarWidth: "none" }}>
          {CLIPS.map((c, i) => (
            <button key={i} onClick={() => { stopAuto(); setActive(i) }} style={{ flexShrink: 0, width: "clamp(80px,8vw,120px)", background: "none", border: "none", cursor: "pointer", padding: 0, opacity: i === active ? 1 : 0.3, transition: "opacity 0.3s" }}>
              <div style={{ width: "100%", aspectRatio: "16/9", background: c.bg }} />
              <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "4px", textAlign: "left" }}>{c.cat}</p>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 clamp(24px,6vw,80px)", paddingBottom: "80px" }}>
        <button onClick={() => fireCTAAndOpenWhatsApp("concept-06-reel")} style={{ display: "inline-flex", alignItems: "center", gap: "16px", background: "#e63c2f", color: "#fff", padding: "18px 52px", border: "none", cursor: "pointer", fontFamily: "Courier Prime, monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase" }}>
          Start Your Project
        </button>
        <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "16px" }}>danverse.ai - danverseai@outlook.com</p>
      </div>
    </section>
  )
}
