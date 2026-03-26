import type Lenis from "@studio-freight/lenis"
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap-config"

export function syncScrollTriggerWithLenis(lenis: Lenis) {
  ensureGsapPlugins()

  const handleScroll = () => ScrollTrigger.update()
  const tick = (time: number) => lenis.raf(time * 1000)

  lenis.on("scroll", handleScroll)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    ;(lenis as { off?: (event: string, callback: () => void) => void }).off?.("scroll", handleScroll)
  }
}
