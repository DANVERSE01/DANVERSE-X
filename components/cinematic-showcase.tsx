"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

import styles from "@/styles/showcase.module.css"

const WORKS = [
  {
    id: "1164910690",
    index: "01",
    title: "Social Campaign",
    category: "SOCIAL / AD",
    desc: "High-conversion vertical content engineered for paid social. Pacing optimized for thumb-stop.",
    ratio: "9:16",
    accent: "var(--color-accent-coral)",
  },
  {
    id: "1178056977",
    index: "02",
    title: "Cinematic Brand Film",
    category: "BRAND / FILM",
    desc: "Full cinematic treatment. Visual language locked before a single frame is produced.",
    ratio: "16:9",
    accent: "var(--color-brand-secondary)",
  },
  {
    id: "1174570425",
    index: "03",
    title: "Tech Reveal",
    category: "PRODUCT / REVEAL",
    desc: "Precision-timed product reveal. Every cut timed to impact. Every frame intentional.",
    ratio: "16:9",
    accent: "var(--color-accent-coral)",
  },
  {
    id: "1173977023",
    index: "04",
    title: "Visual Identity",
    category: "IDENTITY / MOTION",
    desc: "Motion identity system built to scale. Consistent across every touchpoint and format.",
    ratio: "21:9",
    accent: "var(--color-brand-secondary)",
  },
] as const

export function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const activeWork = WORKS[activeIdx]

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setHasEntered(true)
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      obs.observe(sectionRef.current)
    }

    return () => obs.disconnect()
  }, [])

  const goTo = (idx: number) => {
    if (idx === activeIdx || isTransitioning) return

    setIsTransitioning(true)
    window.setTimeout(() => {
      setActiveIdx(idx)
      setIsTransitioning(false)
    }, 400)
  }

  return (
    <section ref={sectionRef} className={styles.stage} aria-labelledby="production-showcase-heading">
      <div className={styles.mediaShell}>
        <div className={`${styles.mediaWrapper} ${isTransitioning ? styles.mediaTransitioning : ""}`}>
          <iframe
            key={activeWork.id}
            title={`${activeWork.title} background video`}
            src={`https://player.vimeo.com/video/${activeWork.id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className={styles.gradientOverlay} />
      </div>

      <div className={`${styles.contentLayer} ${hasEntered ? styles.contentEntered : ""}`}>
        <h2 id="production-showcase-heading" className={styles.sectionHeading}>
          Production Showcase
        </h2>

        <div className={styles.workInfoRow}>
          <div className={styles.workCopy} aria-live="polite" aria-atomic="true">
            <p className={styles.categoryLabel}>{activeWork.category}</p>
            <h3 className={styles.workTitle}>{activeWork.title}</h3>
          </div>

          <button
            type="button"
            className={`${styles.ctaButton} ${isCtaHovered ? styles.ctaButtonHovered : ""}`}
            onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")}
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
          >
            Start Your Project
          </button>
        </div>

        <div className={styles.workGrid}>
          {WORKS.map((work, idx) => (
            <button
              key={work.id}
              type="button"
              onClick={() => goTo(idx)}
              className={`${styles.workThumb} ${activeIdx === idx ? styles.active : ""}`}
              aria-pressed={activeIdx === idx}
              aria-label={`View ${work.title}`}
              style={{ "--work-accent": work.accent } as CSSProperties}
            >
              <div className={styles.indicatorBar} />
              <p className={styles.thumbCategory}>{work.category}</p>
              <p className={styles.thumbTitle}>{work.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
