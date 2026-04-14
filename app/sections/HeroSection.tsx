"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion"
import { MagneticButton } from "@/app/components/MagneticButton"

gsap.registerPlugin(SplitText, ScrollTrigger)

const HeroWebGL = dynamic(() => import("./HeroWebGL"), { ssr: false, loading: () => null })

// ─── Video Background (desktop only, plays when visible) ─────────────────────
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoRef}
        src="/videos/showreel-hero.mp4"
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.15,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}

// ─── CSS Fallback for low-tier GPUs ──────────────────────────────────────────
function LowTierBg() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,255,0,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  )
}

// ─── Hero Text with GSAP SplitText ───────────────────────────────────────────
function HeroText() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h1 = h1Ref.current
    const sub = subRef.current
    if (!h1 || !sub) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const split = new SplitText(h1, { type: "chars,words", linesClass: "split-line" })
    gsap.set(split.chars, { yPercent: 105, opacity: 0 })
    gsap.set([sub, labelRef.current, ctaRef.current], { opacity: 0, y: 16 })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.02,
      ease: "power4.out",
    })
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
      .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")

    return () => {
      tl.kill()
      split.revert()
    }
  }, [])

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        padding: "0 clamp(1.5rem, 6vw, 6rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
        paddingBottom: "clamp(4rem, 10vh, 8rem)",
      }}
    >
      <div ref={labelRef} style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            color: "#c8ff00",
            textTransform: "uppercase",
          }}
        >
          Creative Director · Alexandria → GCC
        </span>
      </div>

      <h1
        ref={h1Ref}
        style={{
          fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
          fontSize: "clamp(4.5rem, 12vw, 14rem)",
          fontWeight: 800,
          lineHeight: 0.88,
          letterSpacing: "-0.05em",
          color: "#f0f0f0",
          margin: 0,
          overflow: "hidden",
        }}
      >
        Brand&nbsp;Direction.
        <br />
        <span style={{ color: "#c8ff00" }}>Motion&nbsp;Craft.</span>
        <br />
        Visual Authority.
      </h1>

      <p
        ref={subRef}
        style={{
          marginTop: "2rem",
          fontFamily: "var(--font-body, 'Inter', sans-serif)",
          fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
          color: "rgba(240,240,240,0.5)",
          maxWidth: "36rem",
          lineHeight: 1.7,
          letterSpacing: "-0.01em",
        }}
      >
        Visual direction from Alexandria to the Gulf. Every frame intentional.
      </p>

      <div
        ref={ctaRef}
        style={{
          marginTop: "3rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <MagneticButton
          className="hero-cta-primary"
          style={{
            padding: "0.875rem 2.25rem",
            background: "#c8ff00",
            color: "#050507",
            fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            border: "none",
            borderRadius: 0,
            cursor: "none",
            position: "relative",
          }}
        >
          Get in Touch
        </MagneticButton>

        <MagneticButton
          className="hero-cta-secondary"
          style={{
            padding: "0.875rem 2.25rem",
            background: "transparent",
            color: "#f0f0f0",
            fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
            fontWeight: 600,
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            border: "1px solid rgba(200,255,0,0.08)",
            borderRadius: 0,
            cursor: "none",
          }}
        >
          See the Work ↓
        </MagneticButton>
      </div>
    </div>
  )
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export function HeroSection() {
  const [gpuTier, setGpuTier] = useState<number>(2)
  const [glReady, setGlReady] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)

  const skewY = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4])
  const springSkew = useSpring(skewY, { stiffness: 100, damping: 30, mass: 0.5 })

  useEffect(() => {
    let cancelled = false
    async function detectTier() {
      try {
        const { getGPUTier } = await import("detect-gpu")
        const result = await getGPUTier()
        if (!cancelled) {
          setGpuTier(result.tier)
          setGlReady(true)
        }
      } catch {
        if (!cancelled) {
          setGpuTier(2)
          setGlReady(true)
        }
      }
    }
    detectTier()
    return () => {
      cancelled = true
    }
  }, [])

  const showGL = glReady && gpuTier >= 2

  return (
    <motion.section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        background: "#050507",
        overflow: "hidden",
        skewY: springSkew,
      }}
    >
      {/* WebGL Background */}
      {showGL ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <HeroWebGL gpuTier={gpuTier} />
        </div>
      ) : (
        <LowTierBg />
      )}

      {/* Video underlay — desktop only */}
      <HeroVideo />

      {/* Cinematic vignette — darker edges for focus */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(5,5,7,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade — editorial dissolve into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          zIndex: 3,
          background:
            "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top atmospheric lime wash */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          zIndex: 3,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.02), transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <HeroText />

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(1.5rem, 6vw, 6rem)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(240,240,240,0.25)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Scroll
      </div>
    </motion.section>
  )
}
