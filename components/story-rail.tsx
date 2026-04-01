"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const CHAPTERS = [
  { id: "hero", number: "01", label: "Intro" },
  { id: "features", number: "02", label: "Standards" },
  { id: "industries", number: "03", label: "Scope" },
  { id: "showcase", number: "04", label: "Work" },
  { id: "process", number: "05", label: "Method" },
  { id: "contact", number: "06", label: "Contact" },
] as const

export function StoryRail() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sections = CHAPTERS.map((chapter) => document.getElementById(chapter.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveId(visible.target.id)
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      const root = document.documentElement
      const scrollableHeight = Math.max(root.scrollHeight - window.innerHeight, 1)
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollableHeight)))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const activeIndex = useMemo(() => CHAPTERS.findIndex((chapter) => chapter.id === activeId), [activeId])

  const handleJump = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    const lenis = (window as Window & {
      __DANVERSE_LENIS__?: { scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void }
    }).__DANVERSE_LENIS__

    if (lenis) {
      lenis.scrollTo(target, { offset: -100 })
      return
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-[90] hidden -translate-y-1/2 xl:block">
      <motion.aside
        initial={reduced ? undefined : { opacity: 0, x: 18 }}
        animate={reduced ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(160deg,rgba(8,12,21,0.88),rgba(9,13,22,0.58))] px-3 py-4 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/38">Story Rail</p>
            <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">
              Home Flow
            </p>
          </div>
          <div className="relative h-10 w-10 rounded-full border border-white/8 bg-white/[0.03]">
            <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
              <circle cx="20" cy="20" r="15" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="url(#story-rail-gradient)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={94.2}
                strokeDashoffset={94.2 - progress * 94.2}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="story-rail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#315dff" />
                  <stop offset="55%" stopColor="#ff2f92" />
                  <stop offset="100%" stopColor="#d9ff26" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-semibold tracking-[0.02em] text-white/72">
              {String(Math.round(progress * 100)).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="relative pl-4">
          <div className="pointer-events-none absolute bottom-2 left-[0.44rem] top-2 w-px bg-white/8" />
          <motion.div
            className="pointer-events-none absolute left-[0.08rem] top-2 w-[0.72rem] rounded-full bg-gradient-to-b from-[var(--color-electric-blue)] via-[var(--color-hot-pink)] to-[var(--color-acid-lime)]"
            animate={
              reduced
                ? { height: `${(activeIndex + 1) * 2.75}rem` }
                : { height: `${(activeIndex + 1) * 2.75}rem` }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-2">
            {CHAPTERS.map((chapter) => {
              const isActive = chapter.id === activeId

              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleJump(chapter.id)}
                  className={`group relative flex min-w-[8.5rem] items-center gap-3 rounded-xl px-2 py-2 text-left transition-all duration-300 ${
                    isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${
                      isActive ? "text-[var(--color-acid-lime)]" : "text-white/34"
                    }`}
                  >
                    {chapter.number}
                  </span>
                  <span
                    className={`text-[0.78rem] font-semibold tracking-[-0.02em] ${
                      isActive ? "text-white" : "text-white/66 group-hover:text-white/86"
                    }`}
                  >
                    {chapter.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.aside>
    </div>
  )
}
