"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

declare global {
  interface Window {
    __DANVERSE_LENIS__?: Lenis
  }
}

let lenisInstance: Lenis | null = null
let rafCallback: ((time: number) => void) | null = null
let consumerCount = 0

gsap.registerPlugin(ScrollTrigger)

function ensureLenis() {
  if (!lenisInstance) {
    lenisInstance = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisInstance.on("scroll", ScrollTrigger.update)
    window.__DANVERSE_LENIS__ = lenisInstance
  }

  if (!rafCallback) {
    rafCallback = (time) => {
      lenisInstance?.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)
  }

  document.documentElement.dataset.lenis = "true"
  return lenisInstance
}

function teardownLenis() {
  if (consumerCount > 0) {
    return
  }

  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
    rafCallback = null
  }

  lenisInstance?.destroy()
  lenisInstance = null
  delete window.__DANVERSE_LENIS__
  document.documentElement.removeAttribute("data-lenis")
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    consumerCount += 1
    ensureLenis()
    ScrollTrigger.refresh()

    return () => {
      consumerCount -= 1
      teardownLenis()
    }
  }, [])

  return children
}
