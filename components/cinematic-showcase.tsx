"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HoverLift } from "@/components/hover-lift"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import styles from "@/styles/showcase.module.css"

const WORKS = [
  {
    embed: "https://player.vimeo.com/video/1174583531",
    title: "New Year's Reel - Personal Cinematic Film",
    category: "Personal / Film",
    desc: "A personal cinematic project with action beats, large-scale effects, and AI-led visual storytelling.",
  },
  {
    embed: "https://player.vimeo.com/video/1164910690",
    title: "Jacob & Co x Bugatti - Luxury Watch Campaign",
    category: "Social / Ad",
    desc: "A high-end social campaign built around one of the world's most exclusive watch collaborations.",
  },
  {
    embed: "https://player.vimeo.com/video/1178056977",
    title: "Poke Monster - Samurai Sushi Brand Film",
    category: "Brand / Film",
    desc: "A cinematic identity film for a Japanese-inspired restaurant built to feel premium from frame one.",
  },
  {
    embed: "https://player.vimeo.com/video/1174570425",
    title: "Alhama - UAE Exhibition Identity Film",
    category: "Product / Reveal",
    desc: "A full AI-generated brand film produced in three days for a major exhibition launch in Sharjah.",
  },
  {
    embed: "https://player.vimeo.com/video/1173977023",
    title: "Wizzora - Cinematic Agency Brand Film",
    category: "Identity / Motion",
    desc: "A cinematic agency film built to scale into a wider multi-brand campaign with millions of views.",
  },
] as const

export function CinematicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const revealRef = useScrollReveal<HTMLDivElement>()
  const activeWork = WORKS[activeIndex]

  const handleChange = (index: number) => {
    if (index === activeIndex || isTransitioning) {
      return
    }

    setIsTransitioning(true)
    window.setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 220)
  }

  return (
    <section id="showcase" aria-label="Selected work" className={styles.stage}>
      <div className={styles.mediaShell}>
        <div className={`${styles.mediaWrapper} ${isTransitioning ? styles.mediaTransitioning : ""}`}>
          <iframe
            key={activeWork.embed}
            title={`${activeWork.title} presentation reel`}
            src={`${activeWork.embed}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0`}
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
        <div className={styles.gradientOverlay} />
      </div>

      <div className="section-shell">
        <div ref={revealRef} className={`${styles.contentShell} ${styles.contentLayer}`}>
          <div className={styles.headingRow}>
            <div>
              <p className="section-label">Selected Work</p>
              <h2 id="production-showcase-heading" className={styles.sectionHeading}>
                Campaigns built to feel expensive in motion.
              </h2>
            </div>

            <HoverLift>
              <button type="button" className={styles.ctaButton} onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")}>
                Start Your Project
              </button>
            </HoverLift>
          </div>

          <article className={styles.workFeature} aria-live="polite" aria-atomic="true">
            <p className={styles.categoryLabel}>{activeWork.category}</p>
            <h3 className={styles.workTitle}>{activeWork.title}</h3>
            <p className={styles.workDescription}>{activeWork.desc}</p>
          </article>

          <div className={styles.workGrid}>
            {WORKS.map((work, index) => (
              <motion.button
                key={work.embed}
                type="button"
                onClick={() => handleChange(index)}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${styles.workThumb} ${activeIndex === index ? styles.active : ""}`}
                aria-pressed={activeIndex === index}
                aria-label={`View ${work.title}`}
              >
                <div className={styles.indicatorBar} />
                <p className={styles.thumbCategory}>{work.category}</p>
                <p className={styles.thumbTitle}>{work.title}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
