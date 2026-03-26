import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let pluginsRegistered = false

export function ensureGsapPlugins() {
  if (pluginsRegistered || typeof window === "undefined") {
    return gsap
  }

  gsap.registerPlugin(ScrollTrigger, Flip)
  pluginsRegistered = true

  return gsap
}

ensureGsapPlugins()

export { gsap, ScrollTrigger, Flip }
