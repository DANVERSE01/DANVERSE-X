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
let rafId: number | null = null
let LenisConstructor: (typeof import("lenis"))["default"] | null = null

async function ensureLenis() {
  if (!LenisConstructor) {
    const lenisModule = await import("lenis")
    LenisConstructor = lenisModule.default
  }

  if (!lenisInstance && LenisConstructor) {
    lenisInstance = new LenisConstructor({ lerp: 0.08, smoothWheel: true })
    window.__DANVERSE_LENIS__ = lenisInstance
  }

  if (rafId === null) {
    const loop = (time: number) => {
      lenisInstance?.raf(time)
      rafId = window.requestAnimationFrame(loop)
    }

    rafId = window.requestAnimationFrame(loop)
  }

  document.documentElement.dataset.lenis = "true"
}

function teardownLenis() {
  if (consumerCount > 0) {
    return
  }

  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
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
