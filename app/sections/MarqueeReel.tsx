"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion"

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

function Row({ rtl = false, baseVelocity = 30 }: { rtl?: boolean; baseVelocity?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const speedFactor = useTransform(velocity, [-3000, 0, 3000], [3, 1, 3])
  const smoothSpeed = useSpring(speedFactor, { damping: 50, stiffness: 400 })
  const x = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return
    const halfWidth = containerRef.current.scrollWidth / 2
    if (halfWidth <= 0) return

    if (!initialized.current) {
      if (!rtl) x.set(-halfWidth)
      initialized.current = true
    }

    const speed = smoothSpeed.get()
    const baseRate = halfWidth / (baseVelocity * 1000)
    const move = baseRate * delta * speed

    let newX = x.get()
    if (rtl) {
      newX -= move
      if (newX <= -halfWidth) newX += halfWidth
    } else {
      newX += move
      if (newX >= 0) newX -= halfWidth
    }
    x.set(newX)
  })

  const items = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
        userSelect: "none",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        ref={containerRef}
        style={{
          display: "flex",
          gap: "0",
          willChange: "transform",
          x,
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
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
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

export function MarqueeReel() {
  return (
    <section
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
      <Row baseVelocity={30} />
      <Row rtl baseVelocity={25} />
    </section>
  )
}
