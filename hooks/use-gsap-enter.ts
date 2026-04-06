"use client"

import { useEffect, useRef } from "react"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"

export type EntrancePreset =
  | "fade-up"       // classic upward fade
  | "clip-left"     // clip-path reveal from left
  | "clip-bottom"   // clip-path reveal from bottom
  | "stagger-up"    // children stagger up
  | "scale-in"      // scale from 0.88 + fade
  | "slide-left"    // translate from right
  | "blur-rise"     // blur + rise

interface UseGsapEnterOptions {
  preset?: EntrancePreset
  delay?: number
  stagger?: number
  childSelector?: string
  start?: string
  once?: boolean
  scrub?: boolean | number
}

/**
 * Attach GSAP ScrollTrigger entrance animation to a container element.
 * Returns a ref to attach to the section/container.
 */
export function useGsapEnter<T extends HTMLElement>({
  preset = "fade-up",
  delay = 0,
  stagger = 0.1,
  childSelector,
  start = "top 82%",
  once = true,
  scrub = false,
}: UseGsapEnterOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === "undefined") return

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    registerGSAP()

    const targets = childSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(childSelector))
      : [el]

    if (targets.length === 0) return

    let tween: gsap.core.Tween | gsap.core.Timeline

    const baseOptions: gsap.TweenVars = {
      delay,
      stagger,
      duration: 1.0,
      ease: "power4.out",
      clearProps: "all",
    }

    switch (preset) {
      case "clip-left":
        tween = gsap.fromTo(
          targets,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, ...baseOptions, ease: "expo.out" }
        )
        break

      case "clip-bottom":
        tween = gsap.fromTo(
          targets,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", ...baseOptions, duration: 1.1, ease: "expo.out" }
        )
        break

      case "scale-in":
        tween = gsap.fromTo(
          targets,
          { scale: 0.86, opacity: 0, transformOrigin: "bottom center" },
          { scale: 1, opacity: 1, ...baseOptions, ease: "back.out(1.4)" }
        )
        break

      case "slide-left":
        tween = gsap.fromTo(
          targets,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, ...baseOptions }
        )
        break

      case "blur-rise":
        tween = gsap.fromTo(
          targets,
          { y: 50, opacity: 0, filter: "blur(14px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", ...baseOptions }
        )
        break

      case "stagger-up":
        tween = gsap.fromTo(
          targets,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ...baseOptions, stagger: stagger * 1.2 }
        )
        break

      default: // fade-up
        tween = gsap.fromTo(
          targets,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ...baseOptions }
        )
    }

    tween.pause()

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      scrub: scrub || false,
      onEnter: () => tween.play(),
      once,
    })

    return () => {
      tween.kill()
      st.kill()
    }
  }, [preset, delay, stagger, childSelector, start, once, scrub])

  return ref
}
