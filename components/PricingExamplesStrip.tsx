"use client"

import React, { useRef, useEffect, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const VIDEOS = [
  { id:"1174583531", cat:"FILM",     title:"Cinematic Open",  ratio:"21/9",  delay:0   },
  { id:"1174570414", cat:"SOCIAL",   title:"Vertical Story",  ratio:"9/16",  delay:40  },
  { id:"1174570425", cat:"SAAS",     title:"Tech Reveal",     ratio:"16/9",  delay:80  },
  { id:"1174570410", cat:"FILM",     title:"Wide Format",     ratio:"21/9",  delay:120 },
  { id:"1164910761", cat:"BRAND",    title:"Brand Story",     ratio:"9/16",  delay:160 },
  { id:"1164910689", cat:"B2B",      title:"Corporate Film",  ratio:"16/9",  delay:200 },
  { id:"1164910758", cat:"SOCIAL",   title:"Story Campaign",  ratio:"9/16",  delay:240 },
  { id:"1164910681", cat:"PRODUCT",  title:"Product Macro",   ratio:"1/1",   delay:280 },
  { id:"1164910756", cat:"FILM",     title:"Epic Wide",       ratio:"21/9",  delay:320 },
  { id:"1164910690", cat:"AD",       title:"Social Ad",       ratio:"9/16",  delay:360 },
  { id:"1164910687", cat:"IDENTITY", title:"Brand Identity",  ratio:"16/9",  delay:400 },
]

function CinematicTile({ item, index, onHover }: { item: typeof VIDEOS[0]; index: number; onHover: (id: string | null) => void }) {
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
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [item.delay])

  const handleHover = (isHovered: boolean) => {
    setHovered(isHovered)
    onHover(isHovered ? item.id : null)
  }

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-black group"
      style={{
        aspectRatio: item.ratio,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms`,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Video Background */}
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          className="absolute inset-0 w-full h-full"
          style={{
            border: "none",
            filter: hovered ? "grayscale(0) brightness(1.15) saturate(1.3)" : "grayscale(0.6) brightness(0.6) saturate(0.8)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
          }}
          allow="autoplay; fullscreen"
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(230,60,47,0.1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.95) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.15) 100%)",
          transition: "background 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 z-20 h-[1px]"
        style={{
          background: hovered
            ? "linear-gradient(90deg, #e63c2f 0%, rgba(230,60,47,0.3) 100%)"
            : "rgba(230,60,47,0.1)",
          boxShadow: hovered ? "0 0 20px rgba(230,60,47,0.5)" : "none",
          transition: "all 0.8s ease",
        }}
      />

      {/* Category Badge */}
      <div
        className="absolute top-4 left-4 z-20"
        style={{
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? "translateY(0)" : "translateY(-8px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "7px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: hovered ? "#e63c2f" : "rgba(255,255,255,0.2)",
            textShadow: hovered ? "0 0 12px rgba(230,60,47,0.4)" : "none",
            transition: "all 0.6s ease",
          }}
        >
          {item.cat}
        </span>
      </div>

      {/* Title - Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: "clamp(12px, 2vw, 32px)",
            letterSpacing: "0.05em",
            lineHeight: 0.95,
            color: "#fff",
            margin: 0,
            fontWeight: 900,
            textShadow: hovered ? "0 8px 20px rgba(230,60,47,0.3)" : "0 4px 10px rgba(0,0,0,0.5)",
            transition: "text-shadow 0.6s ease",
          }}
        >
          {item.title}
        </h3>

        {/* Ratio Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "6px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-6px)",
            transition: "all 0.5s ease 0.1s",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "6px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e63c2f",
              fontWeight: 700,
            }}
          >
            {item.ratio}
          </span>
          <div
            style={{
              height: "1px",
              flex: 1,
              background: "linear-gradient(to right, rgba(230,60,47,0.5), transparent)",
            }}
          />
        </div>
      </div>

      {/* Glow Border */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(230,60,47,0.6), 0 0 30px rgba(230,60,47,0.25)"
            : "inset 0 0 0 1px rgba(255,255,255,0.05)",
          transition: "box-shadow 0.6s ease",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          opacity: hovered ? 0.05 : 0.02,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  )
}

export function PricingExamplesStrip() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerIn, setHeaderIn] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setHeaderIn(true)
    }, { threshold: 0.2 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="w-full bg-black overflow-hidden">
      {/* Header */}
      <header
        ref={headerRef}
        style={{
          padding: "clamp(80px,10vw,140px) clamp(24px,6vw,80px) clamp(60px,7vw,100px)",
          background: "linear-gradient(to bottom, rgba(230,60,47,0.03) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12"
          style={{
            borderBottom: "1px solid rgba(230,60,47,0.12)",
          }}
        >
          <div className="flex-1">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div
                style={{
                  height: "2px",
                  width: "50px",
                  background: "linear-gradient(90deg, #e63c2f, transparent)",
                  boxShadow: "0 0 20px rgba(230,60,47,0.4)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.6em",
                  textTransform: "uppercase",
                  color: "#e63c2f",
                  fontWeight: 700,
                }}
              >
                Cinematic Showcase
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: "clamp(56px, 11vw, 140px)",
                lineHeight: 0.85,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: 0,
                fontWeight: 900,
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
                textShadow: "0 12px 40px rgba(230,60,47,0.15)",
              }}
            >
              Production<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #e63c2f 0%, #ff6b5a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                2024–2026
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              maxWidth: "340px",
              margin: 0,
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            A curated collection of high-fidelity visual systems. Engineered for brands that demand global impact and cinematic excellence.
          </p>
        </div>
      </header>

      {/* Masonry Grid - Zero Gaps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "0",
          width: "100%",
          background: "linear-gradient(to bottom, rgba(230,60,47,0.02) 0%, rgba(0,0,0,0) 100%)",
          borderTop: "1px solid rgba(230,60,47,0.1)",
        }}
      >
        {VIDEOS.map((item, index) => (
          <CinematicTile
            key={item.id}
            item={item}
            index={index}
            onHover={setHoveredId}
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: "clamp(80px,10vw,120px) clamp(24px,6vw,80px)",
          background: "linear-gradient(to top, rgba(230,60,47,0.03) 0%, rgba(0,0,0,0) 100%)",
          borderTop: "1px solid rgba(230,60,47,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Decorative Line */}
        <div
          style={{
            width: "2px",
            height: "80px",
            background: "linear-gradient(to bottom, #e63c2f, transparent)",
            boxShadow: "0 0 20px rgba(230,60,47,0.3)",
          }}
        />

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => fireCTAAndOpenWhatsApp("showreel-cta")}
          style={{
            background: "none",
            border: "1px solid rgba(230,60,47,0.5)",
            cursor: "pointer",
            padding: "22px 64px",
            overflow: "hidden",
            borderRadius: "2px",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.8em",
            textTransform: "uppercase",
            color: "#fff",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#e63c2f"
            e.currentTarget.style.boxShadow = "0 0 40px rgba(230,60,47,0.6), inset 0 0 20px rgba(230,60,47,0.1)"
            e.currentTarget.style.background = "rgba(230,60,47,0.08)"
            e.currentTarget.style.color = "#e63c2f"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(230,60,47,0.5)"
            e.currentTarget.style.boxShadow = "none"
            e.currentTarget.style.background = "none"
            e.currentTarget.style.color = "#fff"
          }}
        >
          Initialize Project
        </button>

        {/* Footer Text */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>DANVERSE · CREATIVE STUDIO</p>
          <p style={{ margin: 0 }}>Engineering Cinematic Excellence Since 2024</p>
        </div>
      </footer>
    </div>
  )
}
