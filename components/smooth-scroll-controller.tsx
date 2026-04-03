"use client"

import type Lenis from "lenis"
import { useEffect } from "react"

declare global {
  interface Window {
    __DANVERSE_LENIS__?: Lenis
  }
}

let consumerCount = 0
let lenisInstance: Lenis | null = null
let rafCallback: ((time: number) => void) | null = null
let gsapInstance: (typeof import("gsap"))["gsap"] | null = null
let scrollTriggerPlugin: (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"] | null = null
let LenisConstructor: (typeof import("lenis"))["default"] | null = null

async function ensureLenis() {
  if (!LenisConstructor || !gsapInstance || !scrollTriggerPlugin) {
    const [lenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])

    LenisConstructor = lenisModule.default
    gsapInstance = gsapModule.gsap
    scrollTriggerPlugin = scrollTriggerModule.ScrollTrigger
    gsapInstance.registerPlugin(scrollTriggerPlugin)
  }

  if (!lenisInstance && LenisConstructor && scrollTriggerPlugin) {
    lenisInstance = new LenisConstructor({ lerp: 0.08, smoothWheel: true })
    lenisInstance.on("scroll", () => scrollTriggerPlugin?.update())
    window.__DANVERSE_LENIS__ = lenisInstance
  }

  if (!rafCallback && lenisInstance && gsapInstance) {
    rafCallback = (time) => {
      lenisInstance?.raf(time * 1000)
    }

    gsapInstance.ticker.add(rafCallback)
    gsapInstance.ticker.lagSmoothing(0)
  }

  document.documentElement.dataset.lenis = "true"
  scrollTriggerPlugin?.refresh()
}

function teardownLenis() {
  if (consumerCount > 0) {
    return
  }

  if (rafCallback && gsapInstance) {
    gsapInstance.ticker.remove(rafCallback)
    rafCallback = null
  }

  lenisInstance?.destroy()
  lenisInstance = null
  delete window.__DANVERSE_LENIS__
  document.documentElement.removeAttribute("data-lenis")
}

export function SmoothScrollController() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const connection = navigator as Navigator & {
      connection?: {
        saveData?: boolean
      }
    }
    const saveData = connection.connection?.saveData === true

    if (prefersReducedMotion || saveData) {
      return
    }

    consumerCount += 1

    void ensureLenis().catch(() => {
      consumerCount = Math.max(consumerCount - 1, 0)
    })

    return () => {
      consumerCount = Math.max(consumerCount - 1, 0)
      teardownLenis()
    }
  }, [])

  return null
}
