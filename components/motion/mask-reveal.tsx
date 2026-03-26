"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { createMaskReveal } from "@/lib/motion/reveal"

interface MaskRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  once = true,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduceMotion) {
      return
    }

    const animation = createMaskReveal(ref.current, {
      trigger: ref.current,
      delay,
      once,
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [delay, once, reduceMotion])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
