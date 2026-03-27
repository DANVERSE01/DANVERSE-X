"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { persistAttributionFromLocation, sendEngagementEventBeacon } from "@/lib/n8n"

const MILESTONES = [25, 50, 75, 100] as const
const AGGREGATE_SESSION_KEY = "danverse:scroll-analytics:v1"
const SENT_SESSION_KEY = "danverse:scroll-analytics:sent:v1"

interface ScrollAggregate {
  startedAt: string
  maxScrollDepth: number
  pagesVisited: string[]
  sectionDurationsMs: Record<string, number>
  milestones: number[]
}

function readAggregate(): ScrollAggregate {
  if (typeof window === "undefined") {
    return {
      startedAt: new Date().toISOString(),
      maxScrollDepth: 0,
      pagesVisited: [],
      sectionDurationsMs: {},
      milestones: [],
    }
  }

  try {
    const stored = window.sessionStorage.getItem(AGGREGATE_SESSION_KEY)

    if (stored) {
      return JSON.parse(stored) as ScrollAggregate
    }
  } catch {
    // Ignore malformed session data and reset analytics state.
  }

  return {
    startedAt: new Date().toISOString(),
    maxScrollDepth: 0,
    pagesVisited: [],
    sectionDurationsMs: {},
    milestones: [],
  }
}

function writeAggregate(aggregate: ScrollAggregate) {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.sessionStorage.setItem(AGGREGATE_SESSION_KEY, JSON.stringify(aggregate))
  } catch {
    // Ignore storage failures so tracking never blocks rendering.
  }
}

function getSectionLabel(section: Element, index: number) {
  const heading = section.querySelector("h1, h2, h3, h4, h5, h6")?.textContent?.trim()
  const explicitLabel = section.getAttribute("data-analytics-section")?.trim()
  const ariaLabel = section.getAttribute("aria-label")?.trim()
  const id = section.getAttribute("id")?.trim()

  return explicitLabel || ariaLabel || heading || id || `section-${index + 1}`
}

function getTopSection(sectionDurationsMs: Record<string, number>) {
  return Object.entries(sectionDurationsMs).sort((left, right) => right[1] - left[1])[0]?.[0] ?? null
}

export function ScrollTracker() {
  const pathname = usePathname()

  useEffect(() => {
    persistAttributionFromLocation()

    if (typeof window === "undefined") {
      return
    }

    if (window.sessionStorage.getItem(SENT_SESSION_KEY)) {
      return
    }

    const sections = Array.from(document.querySelectorAll("main section"))
    const ratios = new Map<string, number>()
    const sectionLookup = new Map<Element, string>()
    const sectionDurations = new Map<string, number>()
    const milestonesReached = new Set<number>()

    let merged = false
    let finalized = false
    let maxScrollDepth = 0
    let activeSection = sections[0] ? getSectionLabel(sections[0], 0) : null
    let activeSectionStartedAt = performance.now()

    const commitActiveSection = (now = performance.now()) => {
      if (!activeSection) {
        return
      }

      const elapsed = Math.max(0, now - activeSectionStartedAt)
      sectionDurations.set(activeSection, (sectionDurations.get(activeSection) ?? 0) + elapsed)
      activeSectionStartedAt = now
    }

    const mergeCurrentPage = () => {
      if (merged) {
        return readAggregate()
      }

      merged = true
      commitActiveSection()

      const aggregate = readAggregate()
      aggregate.maxScrollDepth = Math.max(aggregate.maxScrollDepth, maxScrollDepth)
      aggregate.pagesVisited = Array.from(new Set([...aggregate.pagesVisited, pathname]))
      aggregate.milestones = Array.from(new Set([...aggregate.milestones, ...milestonesReached])).sort((a, b) => a - b)

      for (const [label, duration] of sectionDurations.entries()) {
        aggregate.sectionDurationsMs[label] = (aggregate.sectionDurationsMs[label] ?? 0) + Math.round(duration)
      }

      writeAggregate(aggregate)
      return aggregate
    }

    const finalizeSession = () => {
      if (finalized || window.sessionStorage.getItem(SENT_SESSION_KEY)) {
        return
      }

      finalized = true
      const aggregate = mergeCurrentPage()

      sendEngagementEventBeacon({
        event: "scroll-engagement",
        path: pathname,
        pagesVisited: aggregate.pagesVisited,
        scrollMilestones: aggregate.milestones,
        maxScrollDepth: aggregate.maxScrollDepth,
        topSection: getTopSection(aggregate.sectionDurationsMs),
        sectionDurationsMs: aggregate.sectionDurationsMs,
        sessionStartedAt: aggregate.startedAt,
        sessionDurationMs: Date.now() - Date.parse(aggregate.startedAt),
      })

      window.sessionStorage.setItem(SENT_SESSION_KEY, "1")
      window.sessionStorage.removeItem(AGGREGATE_SESSION_KEY)
    }

    const updateScrollDepth = () => {
      const scrollRoot = document.documentElement
      const scrollableHeight = Math.max(scrollRoot.scrollHeight - window.innerHeight, 0)
      const rawProgress = scrollableHeight === 0 ? 100 : Math.round((window.scrollY / scrollableHeight) * 100)
      const scrollDepth = Math.min(100, Math.max(0, rawProgress))

      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth)

      for (const milestone of MILESTONES) {
        if (scrollDepth >= milestone) {
          milestonesReached.add(milestone)
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const label = sectionLookup.get(entry.target)

          if (!label) {
            continue
          }

          ratios.set(label, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        const nextSection =
          Array.from(ratios.entries()).sort((left, right) => right[1] - left[1])[0]?.[0] ?? activeSection

        if (nextSection && nextSection !== activeSection) {
          commitActiveSection()
          activeSection = nextSection
          activeSectionStartedAt = performance.now()
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    )

    sections.forEach((section, index) => {
      const label = getSectionLabel(section, index)
      sectionLookup.set(section, label)
      ratios.set(label, 0)
      observer.observe(section)
    })

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        finalizeSession()
      }
    }

    updateScrollDepth()

    window.addEventListener("scroll", updateScrollDepth, { passive: true })
    window.addEventListener("pagehide", finalizeSession)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("scroll", updateScrollDepth)
      window.removeEventListener("pagehide", finalizeSession)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()

      if (!finalized) {
        mergeCurrentPage()
      }
    }
  }, [pathname])

  return null
}
