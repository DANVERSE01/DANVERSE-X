"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const EASE_IN = [0.22, 1, 0.36, 1] as const
const EASE_OUT = [0.76, 0, 0.24, 1] as const

const PAGE_VARIANTS = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_IN },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(6px)",
    transition: { duration: 0.38, ease: EASE_OUT },
  },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-shell"
        variants={PAGE_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          className="route-curtain"
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.72, ease: EASE_OUT }}
        >
          <span />
        </motion.div>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
