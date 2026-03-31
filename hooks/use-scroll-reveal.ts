"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ScrollRevealOptions {
  delay?: number
  duration?: number
  once?: boolean
  x?: number
  y?: number
}

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  duration = 0.9,
  once = true,
  x = 0,
  y = 40,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, x: 0, y: 0 })
      return
    }

    const animation = gsap.fromTo(
      element,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        delay,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          once,
          start: "top 85%",
        },
      }
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [delay, duration, once, x, y])

  return ref
}
