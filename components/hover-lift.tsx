"use client"

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { useMagnetic } from "@/hooks/use-magnetic"

interface HoverLiftProps extends HTMLAttributes<HTMLDivElement> {
  strength?: number
  radius?: number
}

/**
 * Magnetic wrapper — element follows cursor with spring physics on desktop.
 * On touch devices it falls back to the pure-CSS .hover-lift effect.
 */
export function HoverLift({ className, strength = 16, radius = 56, ...props }: HoverLiftProps) {
  const magnetRef = useMagnetic<HTMLDivElement>({ strength, radius })

  return (
    <div
      ref={magnetRef}
      className={cn("hover-lift", className)}
      {...props}
    />
  )
}
