"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ShowcaseWork } from "@/lib/showcase-works"
import styles from "@/styles/showcase.module.css"

type ShowcaseControlRailProps = {
  activeIndex: number
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  works: readonly ShowcaseWork[]
}

export function ShowcaseControlRail({ activeIndex, onNext, onPrev, onSelect, works }: ShowcaseControlRailProps) {
  const activeWork = works[activeIndex]
  const current = String(activeIndex + 1).padStart(2, "0")
  const total = String(works.length).padStart(2, "0")

  return (
    <div className={styles.controlRail} role="toolbar" aria-label="Showcase controls">
      <button type="button" className={styles.railButton} onClick={onPrev} aria-label="Show previous project">
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className={styles.railCenter}>
        <div className={styles.railHeader}>
          <div className={styles.railMeta}>
            <p className={styles.railCounter}>
              {current}/{total}
            </p>
            <span className={styles.railMetaDot} />
          </div>
          <p className={styles.railLabel}>{activeWork.title}</p>
        </div>

        <div className={styles.progressRail} aria-label="Showcase project rail">
          {works.map((work, index) => {
            const isActive = activeIndex === index

            return (
              <button
                key={work.embed}
                type="button"
                className={styles.progressButton}
                aria-pressed={isActive}
                aria-label={`View ${work.title}`}
                onClick={() => onSelect(index)}
              >
                <span className={`${styles.progressTrack} ${isActive ? styles.progressTrackActive : ""}`} />
              </button>
            )
          })}
        </div>
      </div>

      <button type="button" className={styles.railButton} onClick={onNext} aria-label="Show next project">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
