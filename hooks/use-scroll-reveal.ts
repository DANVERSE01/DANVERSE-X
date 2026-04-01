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
  duration = 1.05,
  once = true,
  x = 0,
  y = 48,
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

    const targets = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-item]"))
    const revealTargets = targets.length ? targets : [element]
    const context = gsap.context(() => {
      gsap.set(revealTargets, {
        opacity: 0,
        x,
        y,
        scale: 0.985,
        rotateX: 10,
        filter: "blur(10px)",
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
        willChange: "transform, opacity, filter",
      })

      gsap.to(revealTargets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        delay,
        duration,
        ease: "expo.out",
        stagger: targets.length > 1 ? 0.12 : 0,
        clearProps: "willChange",
        scrollTrigger: {
          trigger: element,
          once,
          start: "top 88%",
        },
      })
    }, element)

    return () => {
      context.revert()
    }
  }, [delay, duration, once, x, y])

  return ref
}
