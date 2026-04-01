"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export function HoverLift({ className, transition, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4, scale: 1.014 }}
      whileTap={reduced ? undefined : { scale: 0.992 }}
      transition={transition ?? { type: "spring", stiffness: 280, damping: 22 }}
      style={{ willChange: reduced ? "auto" : "transform" }}
      className={cn(className)}
      {...props}
    />
  )
}
