"use client"

import { useEffect, useRef, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

import styles from "@/styles/showcase.module.css"

const WORKS = [
  {
    embed: "https://player.vimeo.com/video/1174583531",
    title: "New Year's Reel - Personal Cinematic Film",
    category: "PERSONAL / FILM",
    desc: "A personal cinematic project. Action sequences, explosions, and visual storytelling - produced entirely with AI.",
  },
  {
    embed: "https://player.vimeo.com/video/1164910690",
    title: "Jacob & Co x Bugatti - Luxury Watch Campaign",
    category: "SOCIAL / AD",
    desc: "A high-end social ad for one of the world's most exclusive watch collaborations.",
  },
  {
    embed: "https://player.vimeo.com/video/1178056977",
    title: "Poke Monster - Samurai Sushi Brand Film",
    category: "BRAND / FILM",
    desc: "Cinematic brand identity film for a Japanese-inspired restaurant in Canada.",
  },
  {
    embed: "https://player.vimeo.com/video/1174570425",
    title: "Alhama - UAE Exhibition Identity Film",
    category: "PRODUCT / REVEAL",
    desc: "A full AI-generated brand film produced in 3 days for a major exhibition in Sharjah.",
  },
  {
    embed: "https://player.vimeo.com/video/1173977023",
    title: "Wizzora - Cinematic Agency Brand Film",
    category: "IDENTITY / MOTION",
    desc: "A cinematic brand film for a Gulf marketing agency - multi-brand campaign with millions of views.",
  },
] as const

export function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
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
    }, 300)
  }

  return (
    <section id="showcase" ref={sectionRef} className={styles.stage} aria-labelledby="production-showcase-heading">
      <div className={styles.mediaShell}>
        <div className={`${styles.mediaWrapper} ${isTransitioning ? styles.mediaTransitioning : ""}`}>
          <iframe
            key={activeWork.embed}
            title={`${activeWork.title} background video`}
            src={`${activeWork.embed}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className={styles.gradientOverlay} />
      </div>

      <div className={`${styles.contentLayer} ${hasEntered ? styles.contentEntered : ""}`}>
        <h2 id="production-showcase-heading" className={styles.sectionHeading}>
          Selected Work
        </h2>

        <div className={styles.workInfoRow}>
          <div className={styles.workCopy} aria-live="polite" aria-atomic="true">
            <p className={styles.categoryLabel}>{activeWork.category}</p>
            <h3 className={styles.workTitle}>{activeWork.title}</h3>
            <p className={styles.workDescription}>{activeWork.desc}</p>
          </div>

          <button type="button" className={styles.ctaButton} onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")}>
            Start Your Project
          </button>
        </div>

        <div className={styles.workGrid}>
          {WORKS.map((work, idx) => (
            <button
              key={work.embed}
              type="button"
              onClick={() => goTo(idx)}
              className={`${styles.workThumb} ${activeIdx === idx ? styles.active : ""}`}
              aria-pressed={activeIdx === idx}
              aria-label={`View ${work.title}`}
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
