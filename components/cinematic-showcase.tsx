"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HoverLift } from "@/components/hover-lift"
import { ShowcaseControlRail } from "@/components/showcase-control-rail"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SHOWCASE_WORKS } from "@/lib/showcase-works"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import styles from "@/styles/showcase.module.css"

export function CinematicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const revealRef = useScrollReveal<HTMLDivElement>()
  const activeWork = SHOWCASE_WORKS[activeIndex]
  const activeNumber = String(activeIndex + 1).padStart(2, "0")
  const mediaViewportStyle =
    activeWork.poster || activeWork.backgroundColor
      ? {
          backgroundColor: activeWork.backgroundColor ?? "#080a10",
          backgroundImage: activeWork.poster ? `url(${activeWork.poster})` : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }
      : undefined

  const handleChange = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index)
  }
  const handlePrev = () => setActiveIndex((current) => (current - 1 + SHOWCASE_WORKS.length) % SHOWCASE_WORKS.length)
  const handleNext = () => setActiveIndex((current) => (current + 1) % SHOWCASE_WORKS.length)

  return (
    <section id="showcase" aria-label="Selected work" className={styles.stage}>
      <div className="section-shell bg-[#080a10]">
        <div ref={revealRef} className={`${styles.contentShell} ${styles.contentLayer}`}>
          <div className={styles.headingRow}>
            <div className={styles.headingCopy}>
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

          <div className={styles.viewerShell}>
            <div className={styles.mediaPanel}>
              <div className={styles.viewerGlow} aria-hidden="true" />
              <div className={styles.mediaViewport} style={mediaViewportStyle}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWork.embed}
                    initial={{ opacity: 0.18, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.12, scale: 0.985 }}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.mediaMotion}
                  >
                    <iframe
                      title={`${activeWork.title} presentation reel`}
                      src={`${activeWork.embed}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&dnt=1`}
                      allow="autoplay; fullscreen; picture-in-picture"
                      className={styles.mediaFrame}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className={styles.mediaShade} />
                <ShowcaseControlRail
                  activeIndex={activeIndex}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onSelect={handleChange}
                  works={SHOWCASE_WORKS}
                />
              </div>
            </div>

            <div className={styles.detailsGrid} aria-live="polite" aria-atomic="true">
              <article className={styles.summaryCard}>
                <div className={styles.summaryTopline}>
                  <span className={styles.summaryProject}>Project</span>
                  <span className={styles.summaryIndex}>{activeNumber}</span>
                  <span className={styles.summarySeparator}>&bull;</span>
                  <span className={styles.summaryCategory}>{activeWork.category}</span>
                </div>
                <h3 className={styles.summaryTitle}>{activeWork.title}</h3>
                <div className={styles.summaryFacts}>
                  <span className={styles.summaryFact}>
                    <span className={styles.summaryFactLabel}>Client</span>
                    <span className={styles.summaryFactValue}>{activeWork.client}</span>
                  </span>
                  <span className={styles.summaryFactsDot} />
                  <span className={styles.summaryFact}>
                    <span className={styles.summaryFactLabel}>Role</span>
                    <span className={styles.summaryFactValue}>{activeWork.role}</span>
                  </span>
                </div>
                <p className={styles.summaryText}>{activeWork.desc}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
