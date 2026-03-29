"use client"

import { useState, useRef, useEffect } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const WORKS = [
  {
    id: "1164910690",
    index: "01",
    title: "Social Campaign",
    category: "SOCIAL · AD",
    desc: "High-conversion vertical content engineered for paid social. Pacing optimized for thumb-stop.",
    ratio: "9:16",
    accent: "#e63c2f",
  },
  {
    id: "1178056977",
    index: "02",
    title: "Cinematic Brand Film",
    category: "BRAND · FILM",
    desc: "Full cinematic treatment. Visual language locked before a single frame is produced.",
    ratio: "16:9",
    accent: "#ff6030",
  },
  {
    id: "1174570425",
    index: "03",
    title: "Tech Reveal",
    category: "PRODUCT · REVEAL",
    desc: "Precision-timed product reveal. Every cut timed to impact. Every frame intentional.",
    ratio: "16:9",
    accent: "#e63c2f",
  },
  {
    id: "1173977023",
    index: "04",
    title: "Visual Identity",
    category: "IDENTITY · MOTION",
    desc: "Motion identity system built to scale. Consistent across every touchpoint and format.",
    ratio: "21:9",
    accent: "#ff6030",
  },
]

export function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHasEntered(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const goTo = (idx: number) => {
    if (idx === activeIdx || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIdx(idx)
      setIsTransitioning(false)
    }, 400)
  }

  const active = WORKS[activeIdx]

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          padding: "80px 48px 0",
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translateY(0)" : "translateY(32px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 48, height: "1.5px", background: "#e63c2f" }} />
          <span style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 9,
            letterSpacing: "0.6em",
            color: "#e63c2f",
            textTransform: "uppercase",
          }}>
            Selected Works · 2024–2026
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              color: "#fff",
              margin: 0,
            }}>
              Production
            </h2>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              background: "linear-gradient(90deg, #e63c2f 0%, #ff7040 50%, #e63c2f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}>
              Showcase
            </h2>
          </div>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            lineHeight: 1.9,
            textTransform: "uppercase",
            maxWidth: 340,
          }}>
            Four works.<br />
            Each one a complete visual system.<br />
            Built for brands that demand cinema.
          </p>
        </div>
      </div>

      {/* Main Video Stage */}
      <div style={{ marginTop: 48, position: "relative" }}>
        {/* Giant Video */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "#050505",
            overflow: "hidden",
            opacity: isTransitioning ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <iframe
            key={active.id}
            src={`https://player.vimeo.com/video/${active.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
            }}
            allow="autoplay; fullscreen"
          />

          {/* Gradient overlays */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.95) 100%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {/* Work info overlay */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(24px, 4vw, 56px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
          }}>
            <div>
              <div style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 9,
                letterSpacing: "0.5em",
                color: active.accent,
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                {active.category} · {active.index}
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                lineHeight: 0.85,
                color: "#fff",
                margin: "0 0 16px",
                letterSpacing: "0.01em",
              }}>
                {active.title}
              </h3>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.06em",
                maxWidth: 400,
                lineHeight: 1.7,
                textTransform: "uppercase",
              }}>
                {active.desc}
              </p>
            </div>

            {/* Work counter */}
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(64px, 8vw, 120px)",
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
              }}>
                {active.index}
              </div>
              <div style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 8,
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.15)",
                textTransform: "uppercase",
              }}>
                {active.ratio} · Danverse
              </div>
            </div>
          </div>

          {/* Top bar */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${active.accent}, transparent)`,
            transition: "background 0.6s ease",
          }} />
        </div>

        {/* Work Selector — Horizontal List */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => goTo(i)}
              style={{
                background: i === activeIdx ? "rgba(230,60,47,0.06)" : "transparent",
                border: "none",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: "none",
                padding: "28px 24px",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                transition: "background 0.4s",
              }}
              aria-label={`View ${w.title}`}
            >
              {/* Active indicator */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: i === activeIdx ? w.accent : "transparent",
                boxShadow: i === activeIdx ? `0 0 20px ${w.accent}60` : "none",
                transition: "all 0.4s",
              }} />

              <div style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 8,
                letterSpacing: "0.45em",
                color: i === activeIdx ? w.accent : "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
                marginBottom: 8,
                transition: "color 0.3s",
              }}>
                {w.index}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(14px, 2vw, 22px)",
                color: i === activeIdx ? "#fff" : "rgba(255,255,255,0.4)",
                letterSpacing: "0.03em",
                lineHeight: 1,
                marginBottom: 6,
                transition: "color 0.3s",
              }}>
                {w.title}
              </div>
              <div style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 7,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.15)",
                textTransform: "uppercase",
              }}>
                {w.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnails Row — click to jump */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        padding: "2px",
        background: "#0a0a0a",
      }}>
        {WORKS.map((w, i) => (
          <div
            key={w.id}
            onClick={() => goTo(i)}
            style={{
              position: "relative",
              aspectRatio: "16/9",
              overflow: "hidden",
              cursor: "pointer",
              background: "#050505",
              opacity: i === activeIdx ? 1 : 0.4,
              transition: "opacity 0.4s, transform 0.4s",
              transform: i === activeIdx ? "scale(1)" : "scale(0.98)",
            }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${w.id}?autoplay=1&muted=1&loop=1&background=1&quality=auto`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
              allow="autoplay; fullscreen"
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: i === activeIdx
                ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)"
                : "rgba(0,0,0,0.5)",
              transition: "background 0.4s",
            }} />
            {i === activeIdx && (
              <div style={{
                position: "absolute",
                inset: 0,
                border: `2px solid ${w.accent}`,
              }} />
            )}
            <div style={{
              position: "absolute",
              bottom: 8,
              left: 10,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 11,
              color: "#fff",
              letterSpacing: "0.06em",
            }}>
              {w.title}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{
        padding: "60px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        flexWrap: "wrap",
        gap: 32,
      }}>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            color: "rgba(255,255,255,0.05)",
            lineHeight: 1,
          }}>
            DANVERSE
          </div>
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 9,
            letterSpacing: "0.45em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            marginTop: 4,
          }}>
            Engineering Cinematic Excellence Since 2024
          </div>
        </div>

        <button
          type="button"
          onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: "0.5em",
            color: "#fff",
            background: "transparent",
            border: "1px solid rgba(230,60,47,0.5)",
            padding: "18px 52px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = "#e63c2f"
            el.style.borderColor = "#e63c2f"
            el.style.boxShadow = "0 0 60px rgba(230,60,47,0.4)"
            el.style.letterSpacing = "0.6em"
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = "transparent"
            el.style.borderColor = "rgba(230,60,47,0.5)"
            el.style.boxShadow = "none"
            el.style.letterSpacing = "0.5em"
          }}
        >
          Start Your Project
        </button>
      </div>
    </section>
  )
}
