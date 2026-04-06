"use client"

import { useEffect, useRef } from "react"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"

interface UseParallaxOptions {
  speed?: number
}

export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.1 } = options
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === "undefined") return

    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (coarse) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    registerGSAP()

    const distance = window.innerHeight * speed * 2

    const st = ScrollTrigger.create({
      trigger: el,
      scrub: true,
      onUpdate: (self) => {
        const y = (self.progress - 0.5) * distance * 2
        gsap.set(el, { y, force3D: true })
      },
    })

    return () => {
      st.kill()
      gsap.set(el, { clearProps: "transform" })
    }
  }, [speed])

  return ref
}
