"use client"

import type { ReactNode } from "react"
import { createElement, useEffect, useRef } from "react"
import { SplitText, gsap, registerGSAP } from "@/lib/gsap"
import { emitter } from "@/lib/events"
import { stagger } from "@/lib/motion"
import { useDanverseStore } from "@/lib/store"

type RevealTag = "h1" | "h2" | "h3" | "p" | "span"

export function TextReveal({
  as = "span",
  children,
  className = "",
  split = "chars",
  waitForPreloader = false,
}: {
  as?: RevealTag
  children: ReactNode
  className?: string
  split?: "chars" | "words"
  waitForPreloader?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    registerGSAP()

    const splitText = new SplitText(element, { type: split })
    const targets = split === "words" ? splitText.words : splitText.chars
    let animation: gsap.core.Tween | null = null
    let played = false

    gsap.set(targets, {
      yPercent: 110,
      opacity: 0,
      willChange: "transform, opacity",
    })

    const play = () => {
      if (played) return
      played = true

      animation = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        ease: "appear",
        stagger: stagger.tight,
        duration: 1.1,
        delay: waitForPreloader ? 0.08 : 0.1,
      })
    }

    if (waitForPreloader && !useDanverseStore.getState().preloaderDone) {
      emitter.on("preloader-done", play)
    } else {
      requestAnimationFrame(play)
    }

    return () => {
      emitter.off("preloader-done", play)
      animation?.kill()
      splitText.revert()
    }
  }, [split, waitForPreloader])

  return createElement(as, { ref, className }, children)
}
