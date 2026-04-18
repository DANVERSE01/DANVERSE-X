"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function GSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    function tick(time: number) {
      if (!lenis) return
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(tick)
      lenis.off("scroll", ScrollTrigger.update)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{ lerp: 0.065, duration: 1.45, wheelMultiplier: 0.9, syncTouch: false, touchMultiplier: 1.35 }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  )
}
