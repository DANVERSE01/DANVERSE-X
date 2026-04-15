"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const EASE_IN = [0.22, 1, 0.36, 1] as const
const EASE_OUT = [0.76, 0, 0.24, 1] as const

const PAGE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_IN },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={PAGE_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
