"use client"

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function HoverLift({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("hover-lift", className)} {...props} />
  )
}
