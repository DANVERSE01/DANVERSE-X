/**
 * GSAP singleton — import this everywhere instead of `gsap` directly.
 * Ensures plugins are registered once and the Lenis ticker is wired.
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

let registered = false

export function registerGSAP() {
  if (registered || typeof window === "undefined") return
  registered = true

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  // Defaults that match the site aesthetic
  gsap.defaults({ ease: "power3.out" })

  ScrollTrigger.defaults({
    toggleActions: "play none none none",
  })

  // Integrate with Lenis smooth scroll
  wireLenis()
}

function wireLenis() {
  // Poll until Lenis attaches to window (it's lazy-loaded)
  const MAX_ATTEMPTS = 20
  let attempts = 0

  const check = () => {
    const lenis = window.__DANVERSE_LENIS__

    if (lenis) {
      lenis.on("scroll", () => ScrollTrigger.update())
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      return
    }

    attempts++
    if (attempts < MAX_ATTEMPTS) {
      window.setTimeout(check, 200)
    }
  }

  // Give Lenis time to initialise first
  window.setTimeout(check, 400)
}

export { gsap, ScrollTrigger }
