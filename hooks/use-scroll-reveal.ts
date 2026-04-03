"use client"

import { useLayoutEffect, useRef } from "react"

interface ScrollRevealOptions {
  delay?: number
  once?: boolean
  x?: number
  y?: number
}

export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  once = true,
  x = 0,
  y = 48,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const targets = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-item]"))
    const revealTargets = targets.length ? targets : [element]
    const cleanupTimers = new Set<number>()

    revealTargets.forEach((target, index) => {
      target.dataset.revealReady = "true"
      target.dataset.revealVisible = prefersReducedMotion ? "true" : "false"
      target.style.setProperty("--reveal-delay", `${delay + index * 0.08}s`)
      target.style.setProperty("--reveal-x", `${x}px`)
      target.style.setProperty("--reveal-y", `${y}px`)
    })

    if (prefersReducedMotion) {
      return () => {
        cleanupTimers.forEach((timer) => window.clearTimeout(timer))
      }
    }

    const setVisibleState = (visible: boolean) => {
      revealTargets.forEach((target, index) => {
        const timer = window.setTimeout(() => {
          target.dataset.revealVisible = visible ? "true" : "false"
        }, index * 60)

        cleanupTimers.add(timer)
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleState(true)
          if (once) {
            observer.disconnect()
          }
          return
        }

        if (!once) {
          setVisibleState(false)
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cleanupTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [delay, once, x, y])

  return ref
}
