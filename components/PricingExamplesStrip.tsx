"use client"

import React, { useRef, useEffect, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const GRID = [
  { id:"1174583531", cat:"FILM",     title:"Cinematic Open",  meta:"21:9",  col:"md:col-span-3", row:"",                  aspect:"aspect-[21/9]",  delay:0   },
  { id:"1174570414", cat:"SOCIAL",   title:"Vertical Story",  meta:"9:16",  col:"md:col-span-1", row:"md:row-span-2",      aspect:"aspect-[9/16]",  delay:80  },
  { id:"1174570412", cat:"BRAND",    title:"Brand Motion",    meta:"16:9",  col:"md:col-span-2", row:"md:row-span-2",      aspect:"aspect-video",   delay:160 },
  { id:"1174570411", cat:"AD",       title:"Performance Ad",  meta:"9:16",  col:"md:col-span-1", row:"",                  aspect:"aspect-[9/16]",  delay:240 },
  { id:"1174570425", cat:"SAAS",     title:"Tech Reveal",     meta:"16:9",  col:"md:col-span-1", row:"",                  aspect:"aspect-video",   delay:320 },
  { id:"1174570410", cat:"FILM",     title:"Wide Format",     meta:"21:9",  col:"md:col-span-4", row:"",                  aspect:"aspect-[21/9]",  delay:120 },
  { id:"1164910761", cat:"BRAND",    title:"Brand Story",     meta:"9:16",  col:"md:col-span-1", row:"md:row-span-2",     aspect:"aspect-[9/16]",  delay:200 },
  { id:"1164910689", cat:"B2B",      title:"Corporate Film",  meta:"16:9",  col:"md:col-span-2", row:"",                  aspect:"aspect-video",   delay:280 },
  { id:"1164910758", cat:"SOCIAL",   title:"Story Campaign",  meta:"9:16",  col:"md:col-span-1", row:"md:row-span-2",     aspect:"aspect-[9/16]",  delay:360 },
  { id:"1164910681", cat:"PRODUCT",  title:"Product Macro",   meta:"1:1",   col:"md:col-span-2", row:"",                  aspect:"aspect-square",  delay:100 },
  { id:"1164910756", cat:"FILM",     title:"Epic Wide",       meta:"21:9",  col:"md:col-span-2", row:"",                  aspect:"aspect-[21/9]",  delay:220 },
  { id:"1164910690", cat:"AD",       title:"Social Ad",       meta:"9:16",  col:"md:col-span-1", row:"",                  aspect:"aspect-[9/16]",  delay:300 },
  { id:"1164910687", cat:"IDENTITY", title:"Brand Identity",  meta:"16:9",  col:"md:col-span-3", row:"",                  aspect:"aspect-video",   delay:400 },
]

function Tile({ item }: { item: typeof GRID[0] }) {
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
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [item.delay])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#080808] cursor-pointer ${item.col} ${item.row} ${item.aspect}`}
      style={{
        borderRight: "0.5px solid rgba(255,255,255,0.04)",
        borderBottom: "0.5px solid rgba(255,255,255,0.04)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Vimeo — lazy */}
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            border: "none",
            filter: hovered ? "grayscale(0) brightness(0.9)" : "grayscale(1) brightness(0.45)",
            transform: hovered ? "scale(1.08)" : "scale(1.02)",
            transition: "filter 1s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          allow="autoplay; fullscreen"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)",
          transition: "background 0.8s ease",
        }}
      />

      {/* Top — category */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3 md:p-5">
        <span
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "7px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: hovered ? "#e63c2f" : "rgba(255,255,255,0.25)",
            transition: "color 0.4s ease",
          }}
        >
          {item.cat}
        </span>
        <div
          style={{
            height: "1px",
            width: hovered ? "32px" : "12px",
            background: hovered ? "#e63c2f" : "rgba(255,255,255,0.12)",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
          }}
        />
      </div>

      {/* Bottom — title + meta */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-5"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(5px)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: "clamp(14px, 2.5vw, 40px)",
            letterSpacing: "0.04em",
            lineHeight: 0.88,
            color: "#fff",
            margin: 0,
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "6px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease 0.15s",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "6px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e63c2f",
            }}
          >
            {item.meta}
          </span>
          <div style={{ height: "1px", flex: 1, background: "rgba(230,60,47,0.25)" }} />
        </div>
      </div>

      {/* Red border on hover */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          boxShadow: hovered ? "inset 0 0 0 1px rgba(230,60,47,0.5)" : "none",
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          opacity: 0.025,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}

export function PricingExamplesStrip() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerIn, setHeaderIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderIn(true) }, { threshold: 0.2 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="w-full bg-black overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="px-6 md:px-12 max-w-[1600px] mx-auto"
        style={{ padding: "clamp(60px,8vw,120px) clamp(24px,6vw,80px) clamp(40px,5vw,80px)" }}
      >
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-4"
              style={{
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div style={{ height: "1px", width: "32px", background: "#e63c2f" }} />
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#e63c2f", fontWeight: 700 }}>
                Production 2024–2026
              </span>
            </div>

            {/* Big headline */}
            <div style={{ overflow: "hidden" }}>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: "clamp(52px, 9vw, 128px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: 0,
                  opacity: headerIn ? 1 : 0,
                  transform: headerIn ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Cinematic<br />
                <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}>
                  Showreel
                </span>
              </h2>
            </div>
          </div>

          {/* Right descriptor */}
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              lineHeight: 2,
              color: "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
              maxWidth: "320px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            A curated collection of high-fidelity visual systems.
            Engineered for brands that demand global impact.
          </p>
        </div>
      </header>

      {/* ── Cinematic grid — ALL 13 tiles visible ──────────────────────── */}
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.04)" }}
      >
        {GRID.map((item) => (
          <Tile key={item.id} item={item} />
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <footer style={{ padding: "clamp(60px,8vw,100px) 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
          <div style={{ width: "1px", height: "64px", background: "linear-gradient(to bottom, #e63c2f, transparent)" }} />
          <button
            type="button"
            onClick={() => fireCTAAndOpenWhatsApp("showreel-cta")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              height: "18px",
              padding: 0,
            }}
            className="group"
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Courier Prime', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.8em",
                textTransform: "uppercase",
                color: "#fff",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
              className="group-hover:-translate-y-full"
            >
              Initialize Project
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Courier Prime', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.8em",
                textTransform: "uppercase",
                color: "#e63c2f",
                transform: "translateY(100%)",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
              className="group-hover:translate-y-0"
            >
              Initialize Project
            </span>
          </button>
        </div>
      </footer>

    </div>
  )
}
