"use client"
import { useEffect, useRef } from "react"

export function ProjectorOpen() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener("mousemove", onMove)

    let raf: number
    const animate = () => {
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const expand = () => {
      dot.style.width = "14px"; dot.style.height = "14px"
      ring.style.width = "52px"; ring.style.height = "52px"
      ring.style.borderColor = "#e63c2f"
    }
    const shrink = () => {
      dot.style.width = "6px"; dot.style.height = "6px"
      ring.style.width = "36px"; ring.style.height = "36px"
      ring.style.borderColor = "rgba(230,60,47,0.35)"
    }
    const interactive = Array.from(document.querySelectorAll("a, button"))
    interactive.forEach(el => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink) })

    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      interactive.forEach(el => { el.removeEventListener("mouseenter", expand); el.removeEventListener("mouseleave", shrink) })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <section style={{ height: "100vh", background: "#060606", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", background: "rgba(255,255,255,0.04)", height: 0, boxShadow: "0 0 60px 30px rgba(255,255,255,0.015)", animation: "beamGrow 1.8s ease-out 0.2s forwards" }} />
        <style jsx>{`
          @keyframes beamGrow { to { height: 100vh } }
          @keyframes fadeIn { to { color: rgba(255,255,255,0.2) } }
        `}</style>
        <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "8px", textTransform: "uppercase", color: "rgba(255,255,255,0)", animation: "fadeIn 0.8s ease 1.4s forwards", marginBottom: "28px", position: "relative", zIndex: 1 }}>
          danverse.ai · creative concepts · 2026
        </p>
        <h1 style={{ fontFamily: "Bebas Neue, Arial Black, sans-serif", fontSize: "clamp(64px, 14vw, 160px)", lineHeight: 0.85, letterSpacing: "4px", textAlign: "center", opacity: 0, position: "relative", zIndex: 1, animation: "projFlare 1.4s ease 1.8s forwards", color: "#fff" }}>
          WE BUILD<br />
          <span style={{ color: "#e63c2f" }}>CINEMA.</span><br />
          NOT ADS.
        </h1>
        <p style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "rgba(255,255,255,0)", animation: "fadeIn 0.8s ease 3s forwards", marginTop: "24px", position: "relative", zIndex: 1 }}>
          The craft behind every conversion
        </p>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0)", animation: "fadeIn 0.8s ease 3.4s forwards" }}>
          <span style={{ fontSize: "8px", letterSpacing: "5px", textTransform: "uppercase", fontFamily: "Courier Prime, monospace" }}>scroll to enter</span>
          <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.15)", animation: "tickPulse 2s ease-in-out 3.6s infinite" }} />
        </div>
      </section>
    </>
  )
}
