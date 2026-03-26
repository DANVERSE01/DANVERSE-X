import { ensureGsapPlugins, gsap } from "@/lib/gsap-config"

interface RevealOptions {
  trigger?: Element | string | null
  start?: string
  end?: string
  duration?: number
  delay?: number
  yPercent?: number
  once?: boolean
  scrub?: boolean | number
  ease?: string
}

export function createMaskReveal(
  target: gsap.TweenTarget,
  {
    trigger,
    start = "top 82%",
    end = "bottom 30%",
    duration = 0.9,
    delay = 0,
    yPercent = 12,
    once = true,
    scrub = false,
    ease = "power3.out",
  }: RevealOptions = {},
) {
  ensureGsapPlugins()

  return gsap.fromTo(
    target,
    {
      autoAlpha: 0,
      yPercent,
      clipPath: "inset(0 0 100% 0 round 18px)",
      willChange: "transform, opacity, clip-path",
    },
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0 round 18px)",
      duration,
      delay,
      ease,
      clearProps: "willChange",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            end,
            once,
            scrub,
          }
        : undefined,
    },
  )
}
