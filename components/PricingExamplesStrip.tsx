"use client"

import React, { useRef, useEffect, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const GRID = [
  { id:"1174583531", cat:"FILM",     title:"Cinematic Open",  meta:"21:9",  col:"md:col-span-3", aspect:"aspect-[21/9]",  delay:0   },
  { id:"1174570414", cat:"SOCIAL",   title:"Vertical Story",  meta:"9:16",  col:"md:col-span-1", aspect:"aspect-[9/16]",  delay:60  },
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#0a0a0a] cursor-pointer group ${item.col} ${item.aspect}`}
      style={{
        borderRight: "0.5px solid rgba(255,255,255,0.04)",
        borderBottom: "0.5px solid rgba(255,255,255,0.04)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Video Layer */}
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            border: "none",
            filter: hovered ? "grayscale(0) brightness(1.1) saturate(1.2)" : "grayscale(0.8) brightness(0.5) saturate(0.7)",
            transform: hovered ? "scale(1.1)" : "scale(1.03)",
            transition: "filter 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow="autoplay; fullscreen"
        />
      )}

      {/* Gradient Overlay - Dynamic */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(230,60,47,0.15) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.95) 100%)`
            : "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 100%)",
          transition: hovered ? "none" : "background 0.8s ease",
        }}
      />

      {/* Accent Line - Top */}
      <div
        className="absolute top-0 left-0 right-0 z-20 h-[2px]"
        style={{
          background: hovered
            ? "linear-gradient(to right, #e63c2f 0%, rgba(230,60,47,0.5) 50%, transparent 100%)"
            : "linear-gradient(to right, rgba(230,60,47,0.2) 0%, transparent 100%)",
          transition: "background 0.6s ease",
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Category Label - Top Left */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6">
        <span
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "8px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: hovered ? "#e63c2f" : "rgba(255,255,255,0.15)",
            transition: "color 0.4s ease",
          }}
        >
          {item.cat}
        </span>
        <div
          style={{
            height: "1px",
            width: hovered ? "40px" : "12px",
            background: hovered ? "#e63c2f" : "rgba(255,255,255,0.08)",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
            boxShadow: hovered ? "0 0 12px rgba(230,60,47,0.4)" : "none",
          }}
        />
      </div>

      {/* Content - Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: "clamp(14px, 2.5vw, 42px)",
            letterSpacing: "0.05em",
            lineHeight: 0.9,
            color: "#fff",
            margin: 0,
            fontWeight: 900,
            textShadow: hovered ? "0 8px 24px rgba(230,60,47,0.3)" : "0 4px 12px rgba(0,0,0,0.5)",
            transition: "text-shadow 0.6s ease",
          }}
        >
          {item.title}
        </h3>

        {/* Meta Info - Appears on Hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "7px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e63c2f",
              fontWeight: 700,
            }}
          >
            {item.meta}
          </span>
          <div
            style={{
              height: "1px",
              flex: 1,
              background: "linear-gradient(to right, rgba(230,60,47,0.4), transparent)",
            }}
          />
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(230,60,47,0.5), 0 0 40px rgba(230,60,47,0.2)"
            : "inset 0 0 0 1px rgba(255,255,255,0.05)",
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          opacity: hovered ? 0.04 : 0.02,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  )
}

export function PricingExamplesStrip() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerIn, setHeaderIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderIn(true)
      },
      { threshold: 0.15 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="w-full bg-black overflow-hidden">
      {/* Header Section */}
      <header
        ref={headerRef}
        style={{
          padding: "clamp(80px,10vw,140px) clamp(24px,6vw,80px) clamp(60px,7vw,100px)",
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(230,60,47,0.02) 100%)",
        }}
      >
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12"
          style={{
            borderBottom: "1px solid rgba(230,60,47,0.15)",
          }}
        >
          {/* Left Section - Title */}
          <div className="flex-1">
            {/* Accent Line with Label */}
            <div
              className="flex items-center gap-4 mb-6"
              style={{
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div
                style={{
                  height: "2px",
                  width: "40px",
                  background: "linear-gradient(to right, #e63c2f, transparent)",
                  boxShadow: "0 0 16px rgba(230,60,47,0.4)",
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
                  textShadow: "0 0 12px rgba(230,60,47,0.3)",
                }}
              >
                Cinematic Showcase
              </span>
            </div>

            {/* Main Title */}
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
                textShadow: "0 12px 40px rgba(230,60,47,0.2)",
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

          {/* Right Section - Description */}
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              maxWidth: "320px",
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

      {/* Grid Section */}
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
        style={{
          borderTop: "1px solid rgba(230,60,47,0.1)",
          background: "linear-gradient(to bottom, rgba(230,60,47,0.02) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        {GRID.map((item) => (
          <Tile key={item.id} item={item} />
        ))}
      </div>

      {/* Footer Section */}
      <footer
        style={{
          padding: "clamp(80px,10vw,120px) clamp(24px,6vw,80px)",
          background: "linear-gradient(to top, rgba(230,60,47,0.03) 0%, rgba(0,0,0,0) 100%)",
          borderTop: "1px solid rgba(230,60,47,0.1)",
        }}
      >
        <div
          style={{
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
            className="group relative"
            style={{
              background: "none",
              border: "1px solid rgba(230,60,47,0.5)",
              cursor: "pointer",
              padding: "20px 60px",
              overflow: "hidden",
              borderRadius: "2px",
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e63c2f"
              e.currentTarget.style.boxShadow = "0 0 30px rgba(230,60,47,0.5), inset 0 0 20px rgba(230,60,47,0.1)"
              e.currentTarget.style.background = "rgba(230,60,47,0.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(230,60,47,0.5)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "none"
            }}
          >
            <span
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.8em",
                textTransform: "uppercase",
                color: "#fff",
                display: "block",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
              className="group-hover:text-[#e63c2f]"
            >
              Initialize Project
            </span>
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
        </div>
      </footer>
    </div>
  )
}
