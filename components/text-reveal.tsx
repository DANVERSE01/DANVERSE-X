"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap"
import { splitText } from "@/lib/split-text"

interface TextRevealProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  type?: "words" | "chars"
  /** Animation preset */
  preset?: "slide-up" | "blur-in" | "clip-up" | "scramble"
  delay?: number
  stagger?: number
  trigger?: "scroll" | "immediate"
  className?: string
}

export function TextReveal({
  children,
  as: Tag = "div",
  type = "words",
  preset = "clip-up",
  delay = 0,
  stagger = 0.045,
  trigger = "scroll",
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    registerGSAP()

    const { chars, words } = splitText(el, type)
    const targets = type === "chars" ? chars : words

    if (targets.length === 0) return

    let fromVars: gsap.TweenVars
    let toVars: gsap.TweenVars = { stagger, delay, duration: 0.88, ease: "power4.out", clearProps: "all" }

    switch (preset) {
      case "slide-up":
        fromVars = { yPercent: 105, opacity: 0 }
        break
      case "blur-in":
        fromVars = { opacity: 0, filter: "blur(12px)", y: 14 }
        toVars = { ...toVars, ease: "power3.out" }
        break
      case "clip-up":
        // Each word wrapped in overflow:hidden — inner span translates up
        targets.forEach((t) => {
          const parent = t.parentElement
          if (parent) {
            parent.style.overflow = "hidden"
            parent.style.display = "inline-block"
          }
        })
        fromVars = { yPercent: 110 }
        toVars = { ...toVars, ease: "expo.out", duration: 1.0 }
        break
      case "scramble":
        fromVars = { opacity: 0, x: -8, skewX: -4 }
        toVars = { ...toVars, ease: "power3.out" }
        break
      default:
        fromVars = { yPercent: 105, opacity: 0 }
    }

    const tween = gsap.fromTo(targets, fromVars, toVars)

    let scrollTrigger: ScrollTrigger | undefined

    if (trigger === "scroll") {
      tween.pause()
      scrollTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => tween.play(),
        once: true,
      })
    }

    return () => {
      tween.kill()
      scrollTrigger?.kill()
    }
  }, [type, preset, delay, stagger, trigger])

  // @ts-expect-error — dynamic tag
  return <Tag ref={ref} className={className}>{children}</Tag>
}
