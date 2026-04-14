"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger)

const CAPABILITIES = [
  { id: "brand", title: "Brand Identity", desc: "Visual languages that travel across cultures and borders.", span: "2x2", featured: false },
  { id: "motion", title: "Motion Design", desc: "Frame-by-frame cinematic craft for digital and broadcast.", span: "1x2", featured: false },
  { id: "webgl", title: "WebGL & 3D", desc: "Interactive 3D experiences built with Three.js and R3F.", span: "1x1", featured: true },
  { id: "ai", title: "AI Creative", desc: "Generative systems that scale without losing craft.", span: "1x1", featured: false },
  { id: "strategy", title: "Creative Strategy", desc: "Research-led direction from brief to launch system.", span: "2x1", featured: false },
  { id: "social", title: "Social Content", desc: "Platform-native content built for GCC and global audiences.", span: "1x1", featured: false },
  { id: "design", title: "Digital Design", desc: "UI/UX systems where aesthetics and function are one.", span: "1x1", featured: false },
]

// CSS-animated icosahedron wireframe — replaces R3F Canvas, no extra WebGL context
function CSSIcosahedron() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "clamp(120px, 14vw, 200px)",
          height: "clamp(120px, 14vw, 200px)",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "danverse-rotate-3d 8s linear infinite",
        }}
      >
        {/* Wireframe using overlapping rhombs */}
        {[0, 60, 120].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              inset: "10%",
              border: "1px solid rgba(200,255,0,0.35)",
              borderRadius: "2px",
              transform: `rotate(${deg}deg) scaleY(0.55)`,
            }}
          />
        ))}
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: "5%",
            border: "1px solid rgba(200,255,0,0.12)",
            borderRadius: "50%",
          }}
        />
        {/* Inner dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "6px",
            height: "6px",
            background: "#c8ff00",
            borderRadius: "50%",
          }}
        />
      </div>
      <style>{`
        @keyframes danverse-rotate-3d {
          from { transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg); }
          to   { transform: rotateX(10deg) rotateY(360deg) rotateZ(15deg); }
        }
      `}</style>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

function CapabilityCard({ cap }: { cap: (typeof CAPABILITIES)[0] }) {
  const gridCol = cap.span.startsWith("2") ? "span 2" : "span 1"
  const gridRow = cap.span.endsWith("2") ? "span 2" : "span 1"

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(200,255,0,0.2)",
        boxShadow: "0 0 48px rgba(200,255,0,0.12), 0 0 96px rgba(200,255,0,0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        gridColumn: gridCol,
        gridRow: gridRow,
        background: "rgba(200,255,0,0.03)",
        border: "1px solid rgba(200,255,0,0.08)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: cap.featured ? "flex-end" : "space-between",
        minHeight: "200px",
      }}
    >
      {cap.featured && <CSSIcosahedron />}

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.5625rem",
            color: "#c8ff00",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {cap.id.toUpperCase()}
        </p>

        <h3
          style={{
            fontFamily: "'Clash Display', var(--font-display, sans-serif)",
            fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)",
            fontWeight: 700,
            color: "rgba(244,244,240,1)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 0.75rem",
          }}
        >
          {cap.title}
        </h3>

        <p
          style={{
            fontSize: "clamp(0.8125rem, 1.3vw, 0.9375rem)",
            color: "rgba(244,244,240,0.35)",
            lineHeight: 1.75,
            maxWidth: "24rem",
          }}
        >
          {cap.desc}
        </p>
      </div>
    </motion.div>
  )
}

export function CapabilitiesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Velocity skew
  const { scrollY } = useScroll()
  const velY = useVelocity(scrollY)
  const rawSkew = useTransform(velY, [-2500, 0, 2500], [-2.5, 0, 2.5])
  const skewX = useSpring(rawSkew, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const h = headlineRef.current
    if (!h) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const split = new SplitText(h, { type: "chars", mask: "chars" })
    const trigger = ScrollTrigger.create({
      trigger: h,
      start: "top 78%",
      onEnter() {
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 0.95,
          stagger: { amount: 0.45 },
          ease: "power4.out",
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [])

  return (
    <section
      id="tx-03"
      ref={sectionRef}
      style={{
        background: "#050507",
        padding: "clamp(6rem, 12vw, 14rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div style={{ skewX, transformOrigin: "center" }}>
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.6875rem",
                color: "#c8ff00",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "1.5rem",
                  height: "1px",
                  background: "#c8ff00",
                  display: "inline-block",
                }}
              />
              Capabilities — 03
            </span>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: "'Clash Display', var(--font-display, sans-serif)",
                fontSize: "clamp(3rem, 6vw, 7rem)",
                fontWeight: 800,
                color: "rgba(244,244,240,1)",
                letterSpacing: "-0.055em",
                lineHeight: 0.92,
                margin: "0.75rem 0 0",
              }}
            >
              What we do
            </h2>
          </div>

          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(200,255,0,0.06)",
            }}
          >
            {CAPABILITIES.map((cap) => (
              <CapabilityCard key={cap.id} cap={cap} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

