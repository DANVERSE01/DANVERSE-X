"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LazyVideo from "@/components/lazy-video"
import { HoverLift } from "@/components/hover-lift"
import { ShowcaseControlRail } from "@/components/showcase-control-rail"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SHOWCASE_WORKS } from "@/lib/showcase-works"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"
import styles from "@/styles/showcase.module.css"

export function CinematicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMediaReady, setIsMediaReady] = useState(false)
  const revealTimeoutRef = useRef<number | null>(null)
  const revealRef = useScrollReveal<HTMLDivElement>()
  const activeWork = SHOWCASE_WORKS[activeIndex]
  const activeNumber = String(activeIndex + 1).padStart(2, "0")
  const mediaViewportStyle =
    activeWork.poster || activeWork.backgroundColor
      ? {
          backgroundColor: activeWork.backgroundColor ?? "#05070b",
          backgroundImage: activeWork.poster ? `url(${activeWork.poster})` : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }
      : undefined

  useEffect(() => {
    setIsMediaReady(false)

    return () => {
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current)
    }
  }, [activeWork.videoSrc])

  const handleChange = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index)
  }

  const handlePrev = () => setActiveIndex((current) => (current - 1 + SHOWCASE_WORKS.length) % SHOWCASE_WORKS.length)
  const handleNext = () => setActiveIndex((current) => (current + 1) % SHOWCASE_WORKS.length)

  const handleMediaReady = () => {
    if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current)
    revealTimeoutRef.current = window.setTimeout(() => setIsMediaReady(true), 180)
  }

  return (
    <section id="showcase" aria-label="Selected work" className={styles.stage}>
      <div className="section-shell">
        <div ref={revealRef} className={`${styles.contentShell} ${styles.contentLayer}`}>
          <div className={styles.headingRow} data-reveal-item>
            <div className={styles.headingCopy}>
              <p className="section-label">Selected Work / Curated Five</p>
              <h2 id="production-showcase-heading" className={styles.sectionHeading}>
                A quieter stage for the cuts that carry the standard.
              </h2>
              <p className={styles.headingText}>
                Five strongest works only. Local playback first. Cleaner narrative, faster feel, no third-party stage
                friction.
              </p>
            </div>

            <HoverLift>
              <button type="button" className={styles.ctaButton} onClick={() => fireCTAAndOpenWhatsApp("showcase-cta")}>
                Book the Reel Build
              </button>
            </HoverLift>
          </div>

          <div className={styles.viewerShell}>
            <div className={styles.mediaPanel} data-reveal-item>
              <div className={styles.viewerGlow} aria-hidden="true" />
              <div className={styles.mediaViewport} style={{ backgroundColor: activeWork.backgroundColor ?? "#05070b" }}>
                <div className={styles.mediaBackdrop} style={mediaViewportStyle} />
                <div className={styles.mediaCrop}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWork.videoSrc}
                      initial={{ opacity: 0.18, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.12, scale: 0.985 }}
                      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                      className={styles.mediaMotion}
                    >
                      <LazyVideo
                        src={activeWork.videoSrc}
                        poster={activeWork.poster ?? undefined}
                        autoplay
                        loop
                        muted
                        playsInline
                        eager={activeIndex === 0}
                        rootMargin={activeIndex === 0 ? "0px" : "260px"}
                        background={activeWork.backgroundColor ?? "#05070b"}
                        onReady={handleMediaReady}
                        className={styles.mediaVideo}
                        aria-label={`${activeWork.title} campaign preview`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div
                  className={`${styles.loadingCurtain} ${isMediaReady ? styles.loadingCurtainHidden : ""}`}
                  aria-hidden="true"
                >
                  <div className={styles.loadingContent}>
                    <span className={styles.loadingEyebrow}>Local-first campaign viewer</span>
                    <span className={styles.loadingTitle}>{activeWork.title}</span>
                  </div>
                </div>

                <div className={styles.mediaMask} />
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

            <div className={styles.detailsGrid} aria-live="polite" aria-atomic="true" data-reveal-item>
              <article className={styles.summaryCard}>
                <div className={styles.summaryTopline}>
                  <span className={styles.summaryProject}>Selected</span>
                  <span className={styles.summaryIndex}>{activeNumber}</span>
                  <span className={styles.summarySeparator}>&bull;</span>
                  <span className={styles.summaryCategory}>{activeWork.category}</span>
                </div>
                <h3 className={styles.summaryTitle}>{activeWork.title}</h3>
                <p className={styles.summaryLead}>{activeWork.client}</p>
                <div className={styles.summaryFacts}>
                  <span className={styles.summaryFact}>
                    <span className={styles.summaryFactLabel}>Role</span>
                    <span className={styles.summaryFactValue}>{activeWork.role}</span>
                  </span>
                </div>
                <p className={styles.summaryText}>{activeWork.desc}</p>
                <div className={styles.summaryTags}>
                  <span className={styles.summaryTag}>Local Preview</span>
                  <span className={styles.summaryTag}>Curated Edit</span>
                  <span className={styles.summaryTag}>Launch Ready</span>
                </div>
              </article>

              <article className={styles.rosterCard}>
                <p className={styles.rosterEyebrow}>Curated Five</p>
                <p className={styles.rosterIntro}>
                  A tighter homepage reel focused on the work that defines the standard fastest.
                </p>
                <div className={styles.rosterList}>
                  {SHOWCASE_WORKS.map((work, index) => {
                    const isActive = index === activeIndex

                    return (
                      <button
                        key={`${work.client}-${work.title}`}
                        type="button"
                        onClick={() => handleChange(index)}
                        className={`${styles.rosterButton} ${isActive ? styles.rosterButtonActive : ""}`}
                        aria-pressed={isActive}
                      >
                        <span className={styles.rosterIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.rosterBody}>
                          <span className={styles.rosterTitle}>{work.title}</span>
                          <span className={styles.rosterClient}>{work.client}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
