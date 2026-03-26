"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { ScrollTrigger } from "@/lib/gsap-config"

interface PinSceneProps {
  children: React.ReactNode
  className?: string
  end?: string
  scrub?: boolean | number
  onProgress?: (progress: number) => void
  disabled?: boolean
}

export function PinScene({
  children,
  className,
  end = "+=140%",
  scrub = true,
  onProgress,
  disabled = false,
}: PinSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduceMotion || disabled) {
      onProgress?.(0)
      return
    }

    const desktopQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)")

    if (!desktopQuery.matches) {
      onProgress?.(0)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end,
      pin: true,
      scrub,
      onUpdate: ({ progress }) => onProgress?.(progress),
    })

    return () => {
      trigger.kill()
    }
  }, [disabled, end, onProgress, reduceMotion, scrub])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
