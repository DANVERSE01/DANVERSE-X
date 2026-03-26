"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { gsap } from "@/lib/gsap-config"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  disabled?: boolean
}

export function Magnetic({
  children,
  className,
  strength = 18,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current

    if (!element || reduceMotion || disabled) {
      return
    }

    const desktopQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)")

    if (!desktopQuery.matches) {
      return
    }

    const handleMove = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect()
      const x = event.clientX - (bounds.left + bounds.width / 2)
      const y = event.clientY - (bounds.top + bounds.height / 2)

      gsap.to(element, {
        x: (x / bounds.width) * strength,
        y: (y / bounds.height) * strength,
        duration: 0.35,
        ease: "power2.out",
      })
    }

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      })
    }

    element.addEventListener("mousemove", handleMove)
    element.addEventListener("mouseleave", handleLeave)

    return () => {
      element.removeEventListener("mousemove", handleMove)
      element.removeEventListener("mouseleave", handleLeave)
    }
  }, [disabled, reduceMotion, strength])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
