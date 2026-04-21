"use client"

import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

export interface PresetOptions {
  trigger?: Element | null
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
  ease?: string
  duration?: number
  stagger?: number
  delay?: number
  y?: number
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches
}

export function killTriggersFor(scope: Element) {
  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger === scope || (t.trigger instanceof Element && scope.contains(t.trigger))) {
      t.kill()
    }
  })
}

export function clipUp(target: Element, opts: PresetOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, opacity: 1 })
    return
  }
  registerGSAP()
  const trigger = opts.trigger ?? target
  gsap.set(target, { clipPath: "inset(0% 0% 100% 0%)", yPercent: 8, opacity: 0 })
  return gsap.to(target, {
    clipPath: "inset(0% 0% 0% 0%)",
    yPercent: 0,
    opacity: 1,
    duration: opts.duration ?? 1.1,
    ease: opts.ease ?? "cinematic",
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger,
      start: opts.start ?? "top 82%",
      end: opts.end,
      scrub: opts.scrub,
      once: opts.once ?? false,
    },
  })
}

export function maskReveal(target: Element, opts: PresetOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 })
    return
  }
  registerGSAP()
  const trigger = opts.trigger ?? target
  gsap.set(target, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 })
  return gsap.to(target, {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    duration: opts.duration ?? 1.3,
    ease: opts.ease ?? "cinematic",
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger,
      start: opts.start ?? "top 80%",
      end: opts.end,
      scrub: opts.scrub,
      once: opts.once ?? false,
    },
  })
}

export function splitScramble(target: HTMLElement, opts: PresetOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1 })
    return null
  }
  registerGSAP()
  const split = new SplitText(target, { type: "lines,words", linesClass: "split-line" })
  const trigger = opts.trigger ?? target
  gsap.set(split.words, { yPercent: 120, opacity: 0 })
  const tween = gsap.to(split.words, {
    yPercent: 0,
    opacity: 1,
    duration: opts.duration ?? 0.9,
    ease: opts.ease ?? "appear",
    stagger: opts.stagger ?? 0.025,
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger,
      start: opts.start ?? "top 82%",
      once: opts.once ?? true,
    },
  })
  return { tween, split }
}

export function staggerStack(targets: ArrayLike<Element>, opts: PresetOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { y: 0, opacity: 1 })
    return
  }
  registerGSAP()
  const y = opts.y ?? 48
  const trigger = opts.trigger ?? (targets[0] ?? null)
  gsap.set(targets, { y, opacity: 0 })
  return gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: opts.duration ?? 0.95,
    ease: opts.ease ?? "appear",
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    scrollTrigger: trigger
      ? {
          trigger,
          start: opts.start ?? "top 82%",
          once: opts.once ?? false,
        }
      : undefined,
  })
}

export function pinnedScrub(
  trigger: Element,
  onProgress: (progress: number) => void,
  opts: { start?: string; end?: string; pin?: boolean | Element } = {}
) {
  if (prefersReducedMotion()) {
    onProgress(1)
    return null
  }
  registerGSAP()
  return ScrollTrigger.create({
    trigger,
    start: opts.start ?? "top top",
    end: opts.end ?? "+=100%",
    pin: opts.pin ?? false,
    scrub: 1,
    onUpdate: (self) => onProgress(self.progress),
  })
}
