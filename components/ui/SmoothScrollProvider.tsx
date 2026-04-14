"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap, registerGSAP } from "@/lib/gsap"

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    registerGSAP()

    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Expose on window for GSAP singleton
    ;(window as Window & { __DANVERSE_LENIS__?: Lenis }).__DANVERSE_LENIS__ = lenisInstance

    lenisInstance.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => {
      lenisInstance?.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenisInstance?.destroy()
      lenisInstance = null
      delete (window as Window & { __DANVERSE_LENIS__?: Lenis }).__DANVERSE_LENIS__
    }
  }, [])

  return null
}
