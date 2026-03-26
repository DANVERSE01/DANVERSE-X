"use client"

import type { ElementType } from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { ScrollTrigger } from "@/lib/gsap-config"
import { animateSplitIn } from "@/lib/motion/split"

interface SplitRevealProps {
  as?: ElementType
  text: string
  className?: string
  unit?: "chars" | "words" | "lines"
  delay?: number
}

export function SplitReveal({
  as: Component = "p",
  text,
  className,
  unit = "words",
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduceMotion) {
      return
    }

    const { animation, revert } = animateSplitIn(ref.current, {
      unit,
      delay,
      stagger: unit === "chars" ? 0.018 : 0.05,
    })

    animation.pause(0)

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 84%",
      once: true,
      onEnter: () => animation.play(),
    })

    return () => {
      trigger.kill()
      animation.kill()
      revert()
    }
  }, [delay, reduceMotion, text, unit])

  return (
    <Component ref={ref as never} className={className}>
      {text}
    </Component>
  )
}
