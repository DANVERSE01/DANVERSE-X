"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export function HoverLift({ className, transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={transition ?? { type: "spring", stiffness: 300, damping: 20 }}
      className={cn(className)}
      {...props}
    />
  )
}
