"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export function HoverLift({ className, transition, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -3, scale: 1.01 }}
      whileTap={reduced ? undefined : { scale: 0.996 }}
      transition={transition ?? { type: "spring", stiffness: 320, damping: 24 }}
      style={{ willChange: reduced ? "auto" : "transform" }}
      className={cn(className)}
      {...props}
    />
  )
}
