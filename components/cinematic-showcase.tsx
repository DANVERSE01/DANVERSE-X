"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const WORKS = [
  {
    id: "1164910690",
    index: "01",
    title: "Social Campaign",
    category: "SOCIAL / AD",
    desc: "High-conversion vertical content engineered for paid social. Pacing optimized for thumb-stop.",
    ratio: "9:16",
    accent: "#e63c2f",
  },
  {
    id: "1178056977",
    index: "02",
    title: "Cinematic Brand Film",
    category: "BRAND / FILM",
    desc: "Full cinematic treatment. Visual language locked before a single frame is produced.",
    ratio: "16:9",
    accent: "#ff6030",
  },
  {
    id: "1174570425",
    index: "03",
    title: "Tech Reveal",
    category: "PRODUCT / REVEAL",
    desc: "Precision-timed product reveal. Every cut timed to impact. Every frame intentional.",
    ratio: "16:9",
    accent: "#e63c2f",
  },
  {
    id: "1173977023",
    index: "04",
    title: "Visual Identity",
    category: "IDENTITY / MOTION",
    desc: "Motion identity system built to scale. Consistent across every touchpoint and format.",
    ratio: "21:9",
    accent: "#ff6030",
  },
]

type StageSize = {
  width: number
  height: number
}

function getRatioValue(ratio: string) {
  const [width = "16", height = "9"] = ratio.split("/")
  const parsedWidth = Number(width)
  const parsedHeight = Number(height)

  if (!Number.isFinite(parsedWidth) || !Number.isFinite(parsedHeight) || parsedHeight === 0) {
    return 16 / 9
  }

  return parsedWidth / parsedHeight
}

function getCoverEmbedStyle(ratio: string, stageSize: StageSize): CSSProperties {
  if (!stageSize.width || !stageSize.height) {
    return {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: "none",
      pointerEvents: "none",
    }
  }

  const videoRatio = getRatioValue(ratio)
  const stageRatio = stageSize.width / stageSize.height
  const overscan = 1.08

  let frameWidth = stageSize.width
  let frameHeight = stageSize.height

  if (stageRatio > videoRatio) {
    frameHeight = stageSize.width / videoRatio
  } else {
    frameWidth = stageSize.height * videoRatio
  }

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${Math.ceil(frameWidth * overscan)}px`,
    height: `${Math.ceil(frameHeight * overscan)}px`,
    border: "none",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  }
}

export function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setHasEntered(true)
    }, { threshold: 0.15 })

    if (sectionRef.current) {
      obs.observe(sectionRef.current)
    }

    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setStageSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    resizeObserver.observe(stage)

    return () => resizeObserver.disconnect()
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
  const sectionPadding = "clamp(20px, 4vw, 48px)"
  const stageHeight = "clamp(720px, 94vh, 1080px)"
  const coverEmbedStyle = getCoverEmbedStyle(active.ratio.replace(":", "/"), stageSize)

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050507",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        isolation: "isolate",
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: "relative",
          minHeight: stageHeight,
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "linear-gradient(180deg, rgba(5,5,7,0.96) 0%, rgba(5,5,7,0.82) 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(230,60,47,0.28) 0%, rgba(230,60,47,0) 38%), linear-gradient(180deg, rgba(5,5,7,0.18) 0%, rgba(5,5,7,0.42) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.4s ease",
              willChange: "opacity",
            }}
          >
            <iframe
              key={active.id}
              src={`https://player.vimeo.com/video/${active.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
              style={coverEmbedStyle}
              allow="autoplay; fullscreen"
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,7,0.72) 0%, rgba(5,5,7,0.16) 20%, rgba(5,5,7,0) 34%, rgba(5,5,7,0.28) 66%, rgba(5,5,7,0.94) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.48) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, ${active.accent}, transparent)`,
              transition: "background 0.6s ease",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: `clamp(40px, 7vw, 80px) ${sectionPadding} 0`,
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? "translateY(0)" : "translateY(32px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 48, height: "1.5px", background: "#e63c2f" }} />
            <span
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 9,
                letterSpacing: "0.6em",
                color: "#e63c2f",
                textTransform: "uppercase",
              }}
            >
              Selected Works / 2024-2026
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(56px, 8vw, 112px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Production
              </h2>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(56px, 8vw, 112px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.01em",
                  background: "linear-gradient(90deg, #e63c2f 0%, #ff7040 50%, #e63c2f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                Showcase
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.08em",
                lineHeight: 1.9,
                textTransform: "uppercase",
                maxWidth: 340,
                margin: 0,
              }}
            >
              Four works.
              <br />
              Each one a complete visual system.
              <br />
              Built for brands that demand cinema.
            </p>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: `clamp(120px, 22vh, 240px) ${sectionPadding} clamp(24px, 4vw, 56px)`,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 540 }}>
              <div
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: 9,
                  letterSpacing: "0.5em",
                  color: active.accent,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {active.category} / {active.index}
              </div>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(40px, 6vw, 80px)",
                  lineHeight: 0.85,
                  color: "#fff",
                  margin: "0 0 16px",
                  letterSpacing: "0.01em",
                }}
              >
                {active.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.58)",
                  letterSpacing: "0.06em",
                  maxWidth: 400,
                  lineHeight: 1.7,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {active.desc}
              </p>
            </div>

            <div style={{ textAlign: "right", minWidth: 120 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(64px, 8vw, 120px)",
                  color: "rgba(255,255,255,0.07)",
                  lineHeight: 1,
                }}
              >
                {active.index}
              </div>
              <div
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: 8,
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                }}
              >
                {active.ratio} / Danverse
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(5,5,7,0.1) 0%, rgba(5,5,7,0.46) 100%)",
            backdropFilter: "blur(20px) saturate(140%)",
          }}
        >
          {WORKS.map((work, idx) => (
            <button
              key={work.id}
              type="button"
              onClick={() => goTo(idx)}
              style={{
                background: idx === activeIdx ? "rgba(230,60,47,0.08)" : "transparent",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "28px 24px",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                transition: "background 0.4s",
              }}
              aria-label={`View ${work.title}`}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: idx === activeIdx ? work.accent : "transparent",
                  boxShadow: idx === activeIdx ? `0 0 20px ${work.accent}60` : "none",
                  transition: "all 0.4s",
                }}
              />
              <div
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: 8,
                  letterSpacing: "0.45em",
                  color: idx === activeIdx ? work.accent : "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  transition: "color 0.3s",
                }}
              >
                {work.index}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(14px, 2vw, 22px)",
                  color: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                  marginBottom: 6,
                  transition: "color 0.3s",
                }}
              >
                {work.title}
              </div>
              <div
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: 7,
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.15)",
                  textTransform: "uppercase",
                }}
              >
                {work.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
          gap: 2,
          padding: "2px",
          background: "rgba(5,5,7,0.9)",
          backdropFilter: "blur(14px) saturate(130%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {WORKS.map((work, idx) => (
          <button
            key={work.id}
            type="button"
            onClick={() => goTo(idx)}
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              cursor: "pointer",
              background: "rgba(5,5,7,0.28)",
              opacity: idx === activeIdx ? 1 : 0.45,
              transition: "opacity 0.4s, transform 0.4s",
              transform: idx === activeIdx ? "scale(1)" : "scale(0.985)",
              border: "none",
              padding: 0,
            }}
            aria-label={`Preview ${work.title}`}
          >
            <iframe
              src={`https://player.vimeo.com/video/${work.id}?autoplay=1&muted=1&loop=1&background=1&quality=auto`}
              style={getCoverEmbedStyle(work.ratio.replace(":", "/"), { width: 320, height: 180 })}
              allow="autoplay; fullscreen"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  idx === activeIdx
                    ? "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.08) 100%)"
                    : "rgba(0,0,0,0.5)",
                transition: "background 0.4s",
              }}
            />
            {idx === activeIdx && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: `2px solid ${work.accent}`,
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 10,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 11,
                color: "#fff",
                letterSpacing: "0.06em",
              }}
            >
              {work.title}
            </div>
          </button>
        ))}
      </div>

      <div
        style={{
          padding: "clamp(40px, 6vw, 60px) clamp(20px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
            }}
          >
            DANVERSE
          </div>
          <div
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 9,
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
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
            padding: "18px clamp(28px, 5vw, 52px)",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
          }}
          onMouseEnter={(event) => {
            const element = event.currentTarget
            element.style.background = "#e63c2f"
            element.style.borderColor = "#e63c2f"
            element.style.boxShadow = "0 0 60px rgba(230,60,47,0.4)"
            element.style.letterSpacing = "0.6em"
          }}
          onMouseLeave={(event) => {
            const element = event.currentTarget
            element.style.background = "transparent"
            element.style.borderColor = "rgba(230,60,47,0.5)"
            element.style.boxShadow = "none"
            element.style.letterSpacing = "0.5em"
          }}
        >
          Start Your Project
        </button>
      </div>
    </section>
  )
}
