import { ensureGsapPlugins, gsap, Flip } from "@/lib/gsap-config"

interface FlipMotionOptions {
  duration?: number
  ease?: string
  onComplete?: () => void
}

function getFitVars(target: HTMLElement, source: HTMLElement) {
  return Flip.fit(target, source, {
    absolute: true,
    scale: true,
    getVars: true,
  } as never) as gsap.TweenVars
}

export function flipOpen(
  target: HTMLElement,
  source: HTMLElement,
  { duration = 0.8, ease = "power3.inOut", onComplete }: FlipMotionOptions = {},
) {
  ensureGsapPlugins()

  const fitVars = getFitVars(target, source)

  return gsap.fromTo(
    target,
    {
      ...fitVars,
      borderRadius: 28,
    },
    {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration,
      ease,
      borderRadius: 28,
      onComplete,
    },
  )
}

export function flipClose(
  target: HTMLElement,
  source: HTMLElement,
  { duration = 0.65, ease = "power3.inOut", onComplete }: FlipMotionOptions = {},
) {
  ensureGsapPlugins()

  const fitVars = getFitVars(target, source)

  return gsap.to(target, {
    ...fitVars,
    duration,
    ease,
    onComplete,
  })
}
