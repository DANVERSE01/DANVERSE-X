"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { featuredWorks, type WorkItem } from "@/lib/work"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

function WorkCard({
  work,
  index,
  onClick,
}: {
  work: WorkItem
  index: number
  onClick: () => void
}) {
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotX = useSpring(tiltX, { stiffness: 150, damping: 20 })
  const rotY = useSpring(tiltY, { stiffness: 150, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(-py * 6)
    tiltY.set(px * 6)
  }

  const onLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.div
      data-cursor="text"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        width: "80vw",
        maxWidth: "900px",
        flexShrink: 0,
        cursor: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          background: "rgba(200,255,0,0.03)",
          border: "1px solid rgba(200,255,0,0.08)",
          overflow: "hidden",
        }}
      >
        {work.cover ? (
          <Image
            src={work.cover}
            alt={work.title}
            fill
            style={{ objectFit: "cover", viewTransitionName: `work-img-${work.slug}` } as React.CSSProperties}
            priority={index === 0}
            sizes="80vw"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, rgba(200,255,0,${0.04 + index * 0.02}) 0%, #050507 70%)`,
            }}
          />
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,5,7,0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "2rem",
          }}
        >
          <p style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-mono)" }}>
            {work.category}
          </p>
          <p style={{ color: "#f0f0f0", fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.6 }}>
            {work.hook}
          </p>
        </motion.div>
      </div>

      <div
        style={{
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "#c8ff00",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            {String(index + 1).padStart(2, "0")} — {work.category}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            {work.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "40%" }}>
          {work.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.25rem 0.75rem",
                border: "1px solid rgba(200,255,0,0.12)",
                fontSize: "0.625rem",
                color: "rgba(240,240,240,0.4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CaseStudyOverlay({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 280, damping: 32 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "#050507",
        padding: "clamp(2rem, 5vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#c8ff00", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Case Study
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.05em",
              margin: "0.5rem 0 0",
            }}
          >
            {work.title}
          </h2>
        </div>

        <button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "rgba(240,240,240,0.4)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "0.75rem 1.25rem",
            border: "1px solid rgba(200,255,0,0.08)",
            background: "transparent",
            cursor: "none",
          }}
          data-cursor="magnetic"
        >
          Close ✕
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", flex: 1 }}>
        <div>
          <p style={{ fontSize: "0.6875rem", color: "#c8ff00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>Challenge</p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "#f0f0f0", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
            {work.hook ?? "Cinematic brand experience designed for modern markets."}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", color: "#c8ff00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>Approach</p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(240,240,240,0.7)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
            {work.solution ?? "Visual systems built for precision and longevity."}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function WorkShowcase() {
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const totalWidth = track.scrollWidth - window.innerWidth

    const trigger = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    return () => {
      trigger.kill()
      ScrollTrigger.getAll().filter((t) => t.trigger === section).forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          background: "#050507",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#c8ff00", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Selected Work — 02
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 800,
                color: "#f0f0f0",
                letterSpacing: "-0.05em",
                margin: "0.5rem 0 0",
              }}
            >
              Projects
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "rgba(240,240,240,0.25)", letterSpacing: "0.1em" }}>
            Scroll →
          </span>
        </div>

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "clamp(2rem, 4vw, 4rem)",
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
            paddingBottom: "clamp(3rem, 6vw, 6rem)",
          }}
        >
          {featuredWorks.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} onClick={() => setActiveWork(work)} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeWork && (
          <CaseStudyOverlay work={activeWork} onClose={() => setActiveWork(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
