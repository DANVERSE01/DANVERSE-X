"use client"

import type React from "react"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { ScrollTrigger } from "@/lib/gsap-config"
import { syncScrollTriggerWithLenis } from "@/lib/motion/scroll"

interface LenisProviderProps {
  children: React.ReactNode
}

function bindMediaQuery(mediaQuery: MediaQueryList, listener: () => void) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }

  mediaQuery.addListener(listener)
  return () => mediaQuery.removeListener(listener)
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const desktopQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)")
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    let lenis: Lenis | null = null
    let destroySync: (() => void) | null = null

    const cleanupLenis = () => {
      destroySync?.()
      destroySync = null

      if (lenis) {
        lenis.destroy()
        lenis = null
      }
    }

    const syncLenis = () => {
      cleanupLenis()

      const shouldEnable =
        desktopQuery.matches &&
        !coarsePointerQuery.matches &&
        !reducedMotionQuery.matches &&
        window.innerWidth >= 768

      if (!shouldEnable) {
        return
      }

      lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 0.92,
      })

      destroySync = syncScrollTriggerWithLenis(lenis)
      window.setTimeout(() => ScrollTrigger.refresh(), 0)
    }

    syncLenis()

    const unbindDesktop = bindMediaQuery(desktopQuery, syncLenis)
    const unbindCoarse = bindMediaQuery(coarsePointerQuery, syncLenis)
    const unbindReducedMotion = bindMediaQuery(reducedMotionQuery, syncLenis)
    window.addEventListener("resize", syncLenis)

    return () => {
      unbindDesktop()
      unbindCoarse()
      unbindReducedMotion()
      window.removeEventListener("resize", syncLenis)
      cleanupLenis()
    }
  }, [])

  return <>{children}</>
}
