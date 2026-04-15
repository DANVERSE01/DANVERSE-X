"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CAPABILITIES = [
  { id: "brand", title: "Brand Identity", desc: "Complete visual identity systems — from mark to guidelines to rollout.", span: "2x2", featured: false },
  { id: "motion", title: "Motion Design", desc: "Frame-by-frame motion for campaigns, socials, and broadcast.", span: "1x2", featured: false },
  { id: "webgl", title: "WebGL & 3D", desc: "Real-time 3D and CGI for web, product, and immersive experiences.", span: "1x1", featured: true },
  { id: "ai", title: "AI Creative", desc: "AI-augmented creative workflows. Faster output, same craft standard.", span: "1x1", featured: false },
  { id: "strategy", title: "Creative Strategy", desc: "Research-led direction from brief to final delivery.", span: "2x1", featured: false },
  { id: "social", title: "Social Content", desc: "Platform-native content tuned for each channel and the Gulf market.", span: "1x1", featured: false },
  { id: "design", title: "Digital Design", desc: "UI and product design where form serves function — always.", span: "1x1", featured: false },
]

// Mini Three.js scene for the featured capability card
function MiniScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * 0.3
    meshRef.current.rotation.y = clock.elapsedTime * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#c8ff00" wireframe opacity={0.6} transparent />
    </mesh>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
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

// Video background for the featured capability card (desktop only)
function FeaturedVideo() {
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
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src="/videos/capabilities-reel.mp4"
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.15,
          filter: "saturate(0)",
        }}
      />
    </div>
  )
}

function CapabilityCard({
  cap,
}: {
  cap: (typeof CAPABILITIES)[0]
}) {
  const gridCol = cap.span.startsWith("2") ? "span 2" : "span 1"
  const gridRow = cap.span.endsWith("2") ? "span 2" : "span 1"

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(200,255,0,0.1), 0 0 80px rgba(200,255,0,0.04)" }}
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
      {cap.featured && (
        <>
          <FeaturedVideo />
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Canvas
              role="img"
              aria-label="3D wireframe icosahedron animation"
              camera={{ position: [0, 0, 3] }}
              gl={{ antialias: false, powerPreference: "default" }}
              dpr={1}
              style={{ background: "transparent" }}
            >
              <MiniScene />
            </Canvas>
          </div>
        </>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "#c8ff00",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {cap.id.toUpperCase()}
        </p>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.03em",
            margin: "0 0 0.75rem",
          }}
        >
          {cap.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(240,240,240,0.4)",
            lineHeight: 1.7,
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
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      style={{
        background: "#050507",
        padding: "clamp(6rem, 12vw, 14rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "#c8ff00",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Capabilities — 03
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.05em",
              margin: "0.5rem 0 0",
            }}
          >
            Capabilities
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(200,255,0,0.08)",
          }}
        >
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.id} cap={cap} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
