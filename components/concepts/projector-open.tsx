"use client"
import { useEffect, useRef, useState } from "react"

const ACCENT_CORAL = "var(--color-accent-coral)"
const SURFACE_BASE = "var(--color-surface-base)"
const TEXT_PRIMARY = "var(--color-text-primary)"

export function ProjectorOpen() {
  const [enhancedCursor, setEnhancedCursor] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
    const syncCursorMode = () => setEnhancedCursor(!media.matches)
    syncCursorMode()
    media.addEventListener?.("change", syncCursorMode)
    return () => media.removeEventListener?.("change", syncCursorMode)
  }, [])

  useEffect(() => {
    if (!enhancedCursor) return

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
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
      dot.classList.add("cursor-dot-expanded")
      ring.classList.add("cursor-ring-expanded")
    }
    const shrink = () => {
      dot.classList.remove("cursor-dot-expanded")
      ring.classList.remove("cursor-ring-expanded")
    }
    const els = Array.from(document.querySelectorAll("a,button"))
    els.forEach((el) => {
      el.addEventListener("mouseenter", expand)
      el.addEventListener("mouseleave", shrink)
    })
    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      els.forEach((el) => {
        el.removeEventListener("mouseenter", expand)
        el.removeEventListener("mouseleave", shrink)
      })
    }
  }, [enhancedCursor])

  return (
    <>
      {enhancedCursor ? <div ref={dotRef} className="cursor-dot" /> : null}
      {enhancedCursor ? <div ref={ringRef} className="cursor-ring" /> : null}
      <section
        style={{
          minHeight: "100svh",
          background: SURFACE_BASE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(2rem,7vw,4rem) clamp(1.5rem,6vw,4rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            background: "rgba(255,255,255,0.04)",
            height: 0,
            boxShadow: "0 0 60px 30px rgba(255,255,255,0.015)",
            animation: "beamGrow 1.8s ease-out 0.2s forwards",
          }}
        />
        <p
          style={{
            fontFamily: "Courier Prime,monospace",
            fontSize: "clamp(0.7rem,1.5vw,0.8rem)",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0)",
            animation: "fadeIn 0.8s ease 1.4s forwards",
            margin: "0 0 clamp(1rem,3vw,1.75rem)",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          danverse.ai · creative concepts · 2026
        </p>
        <h1
          style={{
            fontFamily: "Bebas Neue,Arial Black,sans-serif",
            fontSize: "clamp(4rem,14vw,10rem)",
            lineHeight: 0.85,
            letterSpacing: "0.06em",
            textAlign: "center",
            opacity: 0,
            position: "relative",
            zIndex: 1,
            animation: "projFlare 1.4s ease 1.8s forwards",
            color: TEXT_PRIMARY,
            margin: 0,
          }}
        >
          WE BUILD
          <br />
          <span style={{ color: ACCENT_CORAL }}>CINEMA.</span>
          <br />
          NOT ADS.
        </h1>
        <p
          style={{
            fontFamily: "Courier Prime,monospace",
            fontSize: "clamp(0.7rem,1.5vw,0.8rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0)",
            animation: "fadeIn 0.8s ease 3s forwards",
            margin: "clamp(0.875rem,2.5vw,1.5rem) 0 0",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          The craft behind every conversion
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "clamp(1rem,4vw,2rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(0.375rem,1.5vw,0.5rem)",
            color: "rgba(255,255,255,0)",
            animation: "fadeIn 0.8s ease 3.4s forwards",
          }}
        >
          <span
            style={{
              fontSize: "clamp(0.65rem,1.2vw,0.75rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "Courier Prime,monospace",
            }}
          >
            scroll to enter
          </span>
          <div
            style={{
              width: "1px",
              height: "clamp(1.5rem,6vw,2rem)",
              background: "rgba(255,255,255,0.15)",
              animation: "tickPulse 2s ease-in-out 3.6s infinite",
            }}
          />
        </div>
      </section>
    </>
  )
}
