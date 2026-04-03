"use client"

import { useEffect, useRef, useState } from "react"
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
  const mediaViewportStyle = {
    backgroundColor: activeWork.backgroundColor ?? "#05070b",
    backgroundImage: `url(${activeWork.poster})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }

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
    revealTimeoutRef.current = window.setTimeout(() => setIsMediaReady(true), 120)
  }

  return (
    <section id="showcase" aria-label="Selected work" className={styles.stage}>
      <div className="section-shell">
        <div ref={revealRef} className={`${styles.contentShell} ${styles.contentLayer}`}>
          <div className={styles.headingRow} data-reveal-item>
            <div className={styles.headingCopy}>
              <p className="section-label">Selected Work</p>
              <h2 id="production-showcase-heading" className={styles.sectionHeading}>
                A focused stage for the cuts that set the tone fastest.
              </h2>
              <p className={styles.headingText}>
                One active frame, two arrows, cleaner switching, and a portrait-first viewer that respects the source
                instead of cropping it into noise.
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
              <div className={styles.mediaViewport}>
                <div className={styles.mediaBackdrop} style={mediaViewportStyle} />
                <div className={styles.mediaStage} data-aspect={activeWork.aspect}>
                  <div key={activeWork.slug} className={`${styles.mediaFigure} ${styles.mediaFigureEnter}`} data-aspect={activeWork.aspect}>
                    <LazyVideo
                      src={activeWork.videoSrc}
                      poster={activeWork.poster}
                      autoplay
                      loop
                      muted
                      playsInline
                      eager={activeIndex === 0}
                      rootMargin={activeIndex <= 1 ? "80px" : "260px"}
                      background={activeWork.backgroundColor ?? "#05070b"}
                      onReady={handleMediaReady}
                      className={`${styles.mediaVideo} ${
                        activeWork.fit === "cover" ? styles.mediaVideoCover : styles.mediaVideoContain
                      }`}
                      aria-label={`${activeWork.title} campaign preview`}
                      style={{ objectPosition: activeWork.objectPosition ?? "center center" }}
                    />
                  </div>
                </div>

                <div
                  className={`${styles.loadingCurtain} ${isMediaReady ? styles.loadingCurtainHidden : ""}`}
                  aria-hidden="true"
                >
                  <div className={styles.loadingContent}>
                    <span className={styles.loadingEyebrow}>Portrait-first campaign viewer</span>
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

            <article className={styles.summaryCard} aria-live="polite" aria-atomic="true" data-reveal-item>
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
                <span className={styles.summaryFact}>
                  <span className={styles.summaryFactLabel}>Format</span>
                  <span className={styles.summaryFactValue}>{activeWork.aspect}</span>
                </span>
              </div>

              <p className={styles.summaryText}>{activeWork.desc}</p>

              <div className={styles.summaryTags}>
                <span className={styles.summaryTag}>Arrow-Driven Stage</span>
                <span className={styles.summaryTag}>Local Playback</span>
                <span className={styles.summaryTag}>Final Masters Ready</span>
              </div>

              <div className={styles.noteCard}>
                <p className={styles.noteEyebrow}>Viewer logic</p>
                <p className={styles.noteText}>
                  The active project preloads first, the next swaps cleanly by arrows, and the stage now respects
                  portrait media instead of forcing a universal crop.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
