"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const ITEMS = [
  "Brand Identity",
  "Motion Design",
  "Visual Systems",
  "Campaign Direction",
  "Social Content",
  "3D & CGI",
  "Creative Strategy",
  "Digital Products",
]

function Row({ rtl = false, baseVelocity = 60, rowOpacity = 1 }: { rtl?: boolean; baseVelocity?: number; rowOpacity?: number }) {
  const items = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
        userSelect: "none",
        opacity: rowOpacity,
        mixBlendMode: "overlay" as const,
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "0",
          willChange: "transform",
        }}
        animate={{ x: rtl ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: baseVelocity,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.25rem",
              padding: "0 1.5rem",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: i % 3 === 1 ? "#c8ff00" : "rgba(240,240,240,0.4)",
              textTransform: "uppercase",
            }}
          >
            {item}
            <span style={{ color: "#c8ff00", fontSize: "0.5rem", opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Full-width brand film ───────────────────────────────────────────────────
function VideoReel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const video = videoRef.current
    if (!video) return
    if (entries[0].isIntersecting) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "21 / 9",
        overflow: "hidden",
        background: "#050507",
      }}
    >
      <video
        ref={videoRef}
        src="/videos/brand-film.mp4"
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {/* Top + bottom cinematic letterbox fades */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(5,5,7,0.6) 0%, transparent 18%, transparent 82%, rgba(5,5,7,0.6) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "#f4f4f0",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            textShadow: "0 2px 24px rgba(0,0,0,0.6)",
          }}
        >
          Cinematic by Design
        </span>
      </div>
    </div>
  )
}

export function MarqueeReel() {
  return (
    <section
      aria-hidden="true"
      style={{
        padding: "clamp(2rem, 4vw, 3rem) 0",
        background: "#050507",
        borderTop: "1px solid rgba(200,255,0,0.08)",
        borderBottom: "1px solid rgba(200,255,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Row baseVelocity={40} rowOpacity={0.4} />
      <Row rtl baseVelocity={60} rowOpacity={1} />
      <Row baseVelocity={50} rowOpacity={0.7} />
      <VideoReel />
    </section>
  )
}
