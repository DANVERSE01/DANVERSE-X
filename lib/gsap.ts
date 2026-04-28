"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/CustomEase"

let registered = false

export function registerGSAP() {
  if (registered || typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

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

export { gsap, ScrollTrigger, SplitText }
