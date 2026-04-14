"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/CustomEase"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

let registered = false
let smoother: ScrollSmoother | null = null

export function registerGSAP() {
  if (registered || typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase, DrawSVGPlugin)

  CustomEase.create("appear", "M0,0 C0.16,1,0.3,1,1,1")
  CustomEase.create("cinematic", "M0,0 C0.76,0,0.24,1,1,1")
  CustomEase.create("spring", "M0,0 C0.34,1.56,0.64,1,1,1")
  CustomEase.create("depart", "M0,0 C0.55,0,1,0.45,1,1")

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    start: "top 82%",
  })

  registered = true
}

export function initScrollSmoother() {
  if (typeof window === "undefined") return null
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null

  registerGSAP()

  if (smoother) return smoother

  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.4,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
  })

  return smoother
}

export function killScrollSmoother() {
  smoother?.kill()
  smoother = null
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText }
