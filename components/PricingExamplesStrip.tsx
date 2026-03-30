"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import showcaseStyles from "./showcase.module.css"

const VIDEOS = [
  {
    id: "1174583531",
    cat: "FILM",
    label: "01",
    title: "Cinematic Open",
    ratio: "21/9",
    fmt: "21:9 · ULTRAWIDE",
    delay: 0,
  },
  {
    id: "1174570414",
    cat: "SOCIAL",
    label: "02",
    title: "Vertical Story",
    ratio: "9/16",
    fmt: "9:16 · PORTRAIT",
    delay: 40,
  },
  {
    id: "1174570425",
    cat: "SAAS",
    label: "03",
    title: "Tech Reveal",
    ratio: "16/9",
    fmt: "16:9 · WIDESCREEN",
    delay: 80,
  },
  {
    id: "1174570410",
    cat: "FILM",
    label: "04",
    title: "Wide Format",
    ratio: "21/9",
    fmt: "21:9 · CINEMATIC",
    delay: 120,
  },
  {
    id: "1164910761",
    cat: "BRAND",
    label: "05",
    title: "Brand Story",
    ratio: "9/16",
    fmt: "9:16 · PORTRAIT",
    delay: 160,
  },
  {
    id: "1164910689",
    cat: "B2B",
    label: "06",
    title: "Corporate Film",
    ratio: "16/9",
    fmt: "16:9 · WIDESCREEN",
    delay: 200,
  },
  {
    id: "1164910758",
    cat: "SOCIAL",
    label: "07",
    title: "Story Campaign",
    ratio: "9/16",
    fmt: "9:16 · PORTRAIT",
    delay: 240,
  },
  {
    id: "1164910681",
    cat: "PRODUCT",
    label: "08",
    title: "Product Macro",
    ratio: "1/1",
    fmt: "1:1 · SQUARE",
    delay: 280,
  },
  {
    id: "1164910756",
    cat: "FILM",
    label: "09",
    title: "Epic Wide",
    ratio: "21/9",
    fmt: "21:9 · ULTRAWIDE",
    delay: 320,
  },
  { id: "1164910690", cat: "AD", label: "10", title: "Social Ad", ratio: "9/16", fmt: "9:16 · PORTRAIT", delay: 360 },
  {
    id: "1164910687",
    cat: "IDENTITY",
    label: "11",
    title: "Brand Identity",
    ratio: "16/9",
    fmt: "16:9 · WIDESCREEN",
    delay: 400,
  },
]

const TICKER_WORDS = VIDEOS.map((v) => v.title).concat(["DANVERSE · 2026"])

const SURFACE_BASE = "var(--color-surface-base)"
const SURFACE_RAISED = "var(--color-surface-raised)"
const TEXT_PRIMARY = "var(--color-text-primary)"
const TEXT_SECONDARY = "var(--color-text-secondary)"
const TEXT_MUTED = "var(--color-text-muted)"
const ACCENT_CORAL = "var(--color-accent-coral)"
const VIMEO_QUERY = "autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto&playsinline=1"
const VIMEO_ALLOW = "autoplay; fullscreen; picture-in-picture"

function ReelTile({ item }: { item: (typeof VIDEOS)[0] }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const widthMap: Record<string, string> = {
    "21/9": "clamp(16rem,44vw,29.25rem)",
    "9/16": "clamp(6.25rem,18vw,7rem)",
    "16/9": "clamp(12rem,36vw,13.875rem)",
    "1/1": "clamp(11rem,30vw,12.5rem)",
  }
  const titleSizeMap: Record<string, string> = {
    "21/9": "clamp(1rem,2vw,1.375rem)",
    "16/9": "clamp(0.9rem,1.6vw,1rem)",
    "9/16": "clamp(0.85rem,1.4vw,0.95rem)",
    "1/1": "clamp(0.9rem,1.6vw,1rem)",
  }
  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={`${item.title} preview, ${item.fmt}`}
      style={{
        flexShrink: 0,
        width: widthMap[item.ratio] ?? "clamp(11rem,30vw,12.5rem)",
        height: "clamp(11rem,30vw,12.5rem)",
        position: "relative",
        overflow: "hidden",
        background: SURFACE_RAISED,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(clamp(0.375rem,1vw,0.5rem))",
        transition: `opacity 0.6s ease ${item.delay * 0.5}ms, transform 0.6s ease ${item.delay * 0.5}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: hovered
            ? "brightness(1) saturate(1.3) grayscale(0)"
            : "brightness(0.5) grayscale(0.35) saturate(0.7)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          background: `linear-gradient(135deg, hsl(${VIDEOS.indexOf(item) * 33}, 60%, 8%), ${SURFACE_BASE})`,
        }}
      />
      {visible && (
        <iframe
          title={`${item.title} reel preview`}
          src={`https://player.vimeo.com/video/${item.id}?${VIMEO_QUERY}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: "none",
            filter: hovered
              ? "brightness(1) saturate(1.3) grayscale(0)"
              : "brightness(0.5) grayscale(0.35) saturate(0.7)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow={VIMEO_ALLOW}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.05) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(0.09375rem,0.3vw,0.125rem)",
          background: hovered ? ACCENT_CORAL : "rgba(239,120,106,0.09)",
          boxShadow: hovered ? "0 0 16px rgba(239,120,106,0.5)" : "none",
          transition: "all 0.35s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "clamp(0.5rem,1.8vw,0.625rem)",
          left: "clamp(0.5rem,1.8vw,0.625rem)",
          fontFamily: "'Courier Prime',monospace",
          fontSize: "clamp(0.6rem,1vw,0.7rem)",
          letterSpacing: "0.35em",
          color: hovered ? ACCENT_CORAL : TEXT_SECONDARY,
          textTransform: "uppercase",
          transition: "color 0.35s",
        }}
      >
        {item.cat} · {item.label}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(0.5rem,1.8vw,0.625rem)",
          left: "clamp(0.5rem,1.8vw,0.625rem)",
          right: "clamp(0.5rem,1.8vw,0.625rem)",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: titleSizeMap[item.ratio] ?? "clamp(0.9rem,1.6vw,1rem)",
          letterSpacing: "0.04em",
          color: TEXT_PRIMARY,
          opacity: hovered ? 1 : 0.75,
          transform: hovered ? "translateY(0)" : "translateY(clamp(0.125rem,0.8vw,0.25rem))",
          transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(0.5rem,1.8vw,0.625rem)",
          right: "clamp(0.5rem,1.8vw,0.625rem)",
          fontFamily: "'Courier Prime',monospace",
          fontSize: "clamp(0.6rem,1vw,0.7rem)",
          color: TEXT_MUTED,
          letterSpacing: "0.2em",
        }}
      >
        {item.ratio.replace("/", "∶")}
      </div>
    </div>
  )
}

function SplitTile({
  item,
  onHover,
  onLeave,
}: {
  item: (typeof VIDEOS)[0]
  onHover: (v: (typeof VIDEOS)[0]) => void
  onLeave: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={`${item.title} preview, ${item.fmt}`}
      style={{
        position: "relative",
        aspectRatio: "1/1",
        overflow: "hidden",
        background: SURFACE_BASE,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.5s ease ${item.delay * 0.4}ms`,
      }}
      onMouseEnter={() => {
        setHovered(true)
        onHover(item)
      }}
      onMouseLeave={() => {
        setHovered(false)
        onLeave()
      }}
      onFocus={() => {
        setHovered(true)
        onHover(item)
      }}
      onBlur={() => {
        setHovered(false)
        onLeave()
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: hovered ? "brightness(0.85) saturate(1.2)" : "brightness(0.45) grayscale(0.3)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          background: `linear-gradient(135deg, hsl(${VIDEOS.indexOf(item) * 33}, 60%, 8%), ${SURFACE_BASE})`,
        }}
      />
      {visible && (
        <iframe
          title={`${item.title} split preview`}
          src={`https://player.vimeo.com/video/${item.id}?${VIMEO_QUERY}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: "none",
            filter: hovered ? "brightness(0.85) saturate(1.2)" : "brightness(0.45) grayscale(0.3)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow={VIMEO_ALLOW}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,transparent 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered ? ACCENT_CORAL : "rgba(239,120,106,0.07)",
          transition: "background 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "clamp(0.375rem,1.4vw,0.5rem)",
          left: "clamp(0.375rem,1.4vw,0.5rem)",
          fontFamily: "'Courier Prime',monospace",
          fontSize: "clamp(0.55rem,0.9vw,0.65rem)",
          letterSpacing: "0.3em",
          color: TEXT_SECONDARY,
          textTransform: "uppercase",
        }}
      >
        {item.cat}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(0.125rem,0.8vw,0.25rem)",
          right: "clamp(0.25rem,1vw,0.375rem)",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(2rem,8vw,2.75rem)",
          color: hovered ? "rgba(239,120,106,0.2)" : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          transition: "color 0.35s",
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "clamp(0.375rem,1.4vw,0.5rem)",
          left: "clamp(0.375rem,1.4vw,0.5rem)",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(0.8rem,1.4vw,1rem)",
          color: TEXT_PRIMARY,
          letterSpacing: "0.04em",
        }}
      >
        {item.title}
      </div>
    </div>
  )
}

function SlateRow({ item, idx }: { item: (typeof VIDEOS)[0]; idx: number }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!hovered) {
      setShowVideo(false)
      return
    }

    const timeoutId = window.setTimeout(() => setShowVideo(true), 200)
    return () => window.clearTimeout(timeoutId)
  }, [hovered])
  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={`${item.title} slate preview, ${item.fmt}`}
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(2.75rem,8vw,4rem) minmax(0,1fr) clamp(5.5rem,18vw,10rem)",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: hovered ? "rgba(255,255,255,0.018)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(clamp(-1rem,-2vw,-0.5rem))",
        transitionProperty: "background,opacity,transform",
        transitionDuration: "0.4s,0.5s,0.5s",
        transitionDelay: `0s,${idx * 40}ms,${idx * 40}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: hovered ? 0 : "100%",
          height: "1px",
          background: ACCENT_CORAL,
          transition: "right 0.65s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          padding: "0 0 0 clamp(0.75rem,3vw,1.75rem)",
          fontFamily: "'Courier Prime',monospace",
          fontSize: "clamp(0.7rem,1.3vw,0.8rem)",
          letterSpacing: "0.2em",
          color: hovered ? ACCENT_CORAL : TEXT_MUTED,
          transition: "color 0.3s",
        }}
      >
        {item.label}
      </div>
      <div style={{ padding: "clamp(0.875rem,2.5vw,1.125rem) clamp(0.75rem,2vw,1.25rem)" }}>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1.125rem,2.2vw,2rem)",
            letterSpacing: hovered ? "0.07em" : "0.03em",
            color: TEXT_PRIMARY,
            lineHeight: 0.92,
            transition: "letter-spacing 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime',monospace",
            fontSize: "clamp(0.65rem,1vw,0.75rem)",
            letterSpacing: "0.35em",
            color: hovered ? "rgba(239,120,106,0.65)" : TEXT_SECONDARY,
            textTransform: "uppercase",
            marginTop: "clamp(0.125rem,0.6vw,0.1875rem)",
            transition: "color 0.3s",
          }}
        >
          {item.cat} · {item.fmt}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "clamp(0.5rem,1.5vw,0.75rem)",
          padding: "0 clamp(0.75rem,2vw,1.25rem)",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          height: "100%",
        }}
      >
        <div
          style={{
            width: hovered ? "clamp(4.5rem,12vw,5.375rem)" : 0,
            height: "clamp(2.5rem,6vw,3rem)",
            overflow: "hidden",
            borderRadius: "clamp(0.125rem,0.5vw,0.1875rem)",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "clamp(4.5rem,12vw,5.375rem)",
              height: "clamp(2.5rem,6vw,3rem)",
              position: "relative",
              borderRadius: "clamp(0.125rem,0.5vw,0.1875rem)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, hsl(${VIDEOS.indexOf(item) * 33}, 60%, 8%), ${SURFACE_BASE})`,
              }}
            />
            {showVideo && (
              <iframe
                title={`${item.title} slate preview`}
                src={`https://player.vimeo.com/video/${item.id}?${VIMEO_QUERY}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  pointerEvents: "none",
                }}
                allow={VIMEO_ALLOW}
              />
            )}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime',monospace",
            fontSize: "clamp(0.65rem,1vw,0.75rem)",
            letterSpacing: "0.25em",
            color: TEXT_MUTED,
            whiteSpace: "nowrap",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s 0.05s",
          }}
        >
          {item.ratio.replace("/", "∶")}
        </div>
      </div>
    </div>
  )
}

export function PricingExamplesStrip() {
  const reelRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null)
  const [headerIn, setHeaderIn] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderIn(true)
      },
      { threshold: 0.2 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!reelRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - reelRef.current.offsetLeft)
    setScrollLeft(reelRef.current.scrollLeft)
  }, [])
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !reelRef.current) return
      e.preventDefault()
      const x = e.pageX - reelRef.current.offsetLeft
      reelRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5
    },
    [isDragging, startX, scrollLeft]
  )
  const stopDrag = useCallback(() => setIsDragging(false), [])
  const tickerWords = [...TICKER_WORDS, ...TICKER_WORDS]
  return (
    <div style={{ background: SURFACE_BASE, color: TEXT_PRIMARY, overflow: "hidden" }}>
      <div className={showcaseStyles.tickerBar}>
        <div style={{ display: "inline-flex", animation: "danverse-tick 22s linear infinite" }}>
          {tickerWords.map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.7rem,1.2vw,0.8rem)",
                letterSpacing: "0.4em",
                color: "#fff",
                padding: "0 clamp(1rem,3vw,1.75rem)",
                borderRight: "1px solid rgba(255,255,255,0.25)",
                textTransform: "uppercase",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes danverse-tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      <div
        ref={headerRef}
        style={{
          padding: "clamp(2rem,6vw,3.5rem) clamp(1rem,4vw,2rem) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "clamp(-1.5rem,-3vw,-0.5rem)",
            right: "clamp(-1rem,-2vw,-0.25rem)",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(7rem,22vw,17.5rem)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.03em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          11
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.5rem,1.5vw,0.75rem)",
            marginBottom: "clamp(0.875rem,2.5vw,1.25rem)",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(clamp(0.75rem,2vw,1.25rem))",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              width: "clamp(1.5rem,5vw,2.25rem)",
              height: "clamp(0.09375rem,0.3vw,0.125rem)",
              background: ACCENT_CORAL,
            }}
          />
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.7rem,1.4vw,0.8rem)",
              letterSpacing: "0.55em",
              color: ACCENT_CORAL,
              textTransform: "uppercase",
            }}
          >
            Cinematic Showcase
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,7vw,6rem)",
            lineHeight: 0.8,
            letterSpacing: "-0.01em",
            color: TEXT_PRIMARY,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(clamp(1rem,4vw,2.5rem))",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Production
        </div>
        <div
          className={showcaseStyles.yearGradient}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,7vw,6rem)",
            lineHeight: 0.8,
            letterSpacing: "-0.01em",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(clamp(1rem,4vw,2.5rem))",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          2024–2026
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "clamp(1rem,3vw,1.5rem)",
            padding: "clamp(1rem,3vw,1.5rem) 0 0",
            marginTop: "clamp(0.875rem,2.5vw,1.25rem)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            opacity: headerIn ? 1 : 0,
            transition: "opacity 0.9s ease 0.3s",
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "clamp(0.8rem,1.5vw,0.9rem)",
              fontWeight: 300,
              color: TEXT_MUTED,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1.9,
              maxWidth: "min(100%,21.25rem)",
            }}
          >
            A curated collection of high-fidelity visual systems.
            <br />
            Engineered for brands that demand
            <br />
            global impact and cinematic excellence.
          </div>
          <div style={{ textAlign: "right", marginLeft: "auto" }}>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2.25rem,6vw,3.25rem)",
                color: "rgba(239,120,106,0.15)",
                lineHeight: 1,
              }}
            >
              11
            </div>
            <div
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.65rem,1vw,0.75rem)",
                color: TEXT_MUTED,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Works · Danverse
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 2 }}>
        <div
          style={{
            padding: "clamp(0.875rem,2vw,1rem) clamp(1rem,4vw,2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(0.5rem,2vw,1rem)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.65rem,1vw,0.75rem)",
              letterSpacing: "0.45em",
              color: TEXT_SECONDARY,
              textTransform: "uppercase",
            }}
          >
            — Film Reel · Drag to explore
          </div>
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.65rem,1vw,0.75rem)",
              letterSpacing: "0.3em",
              color: TEXT_MUTED,
              textTransform: "uppercase",
            }}
          >
            21:9 · 9:16 · 16:9 · 1:1
          </div>
        </div>
        <div className={showcaseStyles.filmStrip}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={showcaseStyles.filmStripHole} />
          ))}
        </div>
        <div
          ref={reelRef}
          style={{
            display: "flex",
            gap: "clamp(0.125rem,0.6vw,0.25rem)",
            overflowX: "auto",
            scrollbarWidth: "none",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {VIDEOS.map((v) => (
            <ReelTile key={v.id} item={v} />
          ))}
        </div>
        <div className={showcaseStyles.filmStrip}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={showcaseStyles.filmStripHole} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18rem),1fr))",
          gap: 0,
          borderTop: "2px solid rgba(255,255,255,0.04)",
          marginTop: 2,
        }}
      >
        <div
          style={{
            padding: "clamp(1.5rem,4vw,2rem) clamp(1rem,3vw,1.75rem)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.012)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.65rem,1vw,0.75rem)",
                letterSpacing: "0.45em",
                color: TEXT_SECONDARY,
                textTransform: "uppercase",
                marginBottom: "clamp(0.875rem,2.5vw,1.25rem)",
              }}
            >
              — Browse Works
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(4rem,14vw,7.5rem)",
                color: "rgba(255,255,255,0.03)",
                lineHeight: 0.85,
                marginBottom: "clamp(-0.75rem,-2vw,-0.25rem)",
              }}
            >
              11
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,2.5rem)",
                color: TEXT_PRIMARY,
                lineHeight: 0.88,
              }}
            >
              Production
            </div>
            <div
              className={showcaseStyles.yearGradient}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,2.5rem)",
                lineHeight: 0.88,
                marginBottom: "clamp(1rem,3vw,1.5rem)",
              }}
            >
              2024–2026
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "clamp(0.875rem,2.5vw,1rem)" }}>
            <div
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.65rem,1vw,0.75rem)",
                letterSpacing: "0.3em",
                color: ACCENT_CORAL,
                marginBottom: "clamp(0.25rem,1vw,0.375rem)",
              }}
            >
              {activeVideo ? `WORK ${activeVideo.label}` : "HOVER ANY WORK"}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.5rem,4vw,1.75rem)",
                color: TEXT_PRIMARY,
                lineHeight: 0.95,
                transition: "all 0.4s",
              }}
            >
              {activeVideo ? activeVideo.title : "— — —"}
            </div>
            <div
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.6rem,0.95vw,0.7rem)",
                letterSpacing: "0.35em",
                color: TEXT_SECONDARY,
                textTransform: "uppercase",
                marginTop: "clamp(0.125rem,0.8vw,0.25rem)",
                transition: "all 0.4s",
              }}
            >
              {activeVideo ? `${activeVideo.cat} · ${activeVideo.label}` : "CINEMATIC SHOWCASE"}
            </div>
            <div
              style={{
                fontFamily: "'Courier Prime',monospace",
                fontSize: "clamp(0.6rem,0.95vw,0.7rem)",
                letterSpacing: "0.2em",
                color: activeVideo ? ACCENT_CORAL : TEXT_MUTED,
                marginTop: "clamp(0.125rem,0.6vw,0.1875rem)",
              }}
            >
              {activeVideo ? activeVideo.fmt : "11 WORKS · DANVERSE"}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,8rem),1fr))",
            gap: "clamp(0.125rem,0.6vw,0.25rem)",
            background: SURFACE_RAISED,
            alignContent: "start",
          }}
        >
          {VIDEOS.map((v) => (
            <SplitTile key={v.id} item={v} onHover={setActiveVideo} onLeave={() => setActiveVideo(null)} />
          ))}
        </div>
      </div>
      <div style={{ borderTop: "2px solid rgba(255,255,255,0.04)", marginTop: 2 }}>
        <div
          style={{
            padding: "clamp(1rem,3vw,1.25rem) clamp(1rem,4vw,2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(0.5rem,2vw,1rem)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.65rem,1vw,0.75rem)",
              letterSpacing: "0.45em",
              color: TEXT_SECONDARY,
              textTransform: "uppercase",
            }}
          >
            — Director&apos;s Slate · Full Index
          </div>
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.65rem,1vw,0.75rem)",
              letterSpacing: "0.3em",
              color: TEXT_MUTED,
              textTransform: "uppercase",
            }}
          >
            11 Works · 2024–2026
          </div>
        </div>
        {VIDEOS.map((v, i) => (
          <SlateRow key={v.id} item={v} idx={i} />
        ))}
      </div>
      <div
        style={{
          padding: "clamp(1.75rem,5vw,2.75rem) clamp(1rem,4vw,2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "clamp(1rem,3vw,1.5rem)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(2.25rem,6vw,3.25rem)",
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.01em",
          }}
        >
          DANVERSE
        </div>
        <div>
          <button
            type="button"
            onClick={() => fireCTAAndOpenWhatsApp("showreel-cta")}
            className={showcaseStyles.showreelCtaButton}
          >
            INITIALIZE PROJECT
          </button>
          <div
            style={{
              fontFamily: "'Courier Prime',monospace",
              fontSize: "clamp(0.65rem,1vw,0.75rem)",
              letterSpacing: "0.3em",
              color: TEXT_MUTED,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            One conversation. Direction locked. Work starts within 48h.
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime',monospace",
            fontSize: "clamp(0.65rem,1vw,0.75rem)",
            color: TEXT_MUTED,
            letterSpacing: "0.25em",
            textAlign: "right",
            lineHeight: 2,
            textTransform: "uppercase",
          }}
        >
          ENGINEERING
          <br />
          CINEMATIC EXCELLENCE
          <br />
          SINCE 2024
        </div>
      </div>
    </div>
  )
}
