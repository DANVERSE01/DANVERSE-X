"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const EASE = [0.76, 0, 0.24, 1] as const

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-shell"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE, delay: 0.32 },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: { duration: 0.28, ease: EASE },
        }}
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          className="route-curtain"
          aria-hidden="true"
          initial={{ scaleY: 1, transformOrigin: "bottom center" }}
          animate={{
            scaleY: 0,
            transformOrigin: "bottom center",
            transition: { duration: 0.85, ease: EASE, delay: 0.08 },
          }}
          exit={{
            scaleY: 1,
            transformOrigin: "top center",
            transition: { duration: 0.5, ease: EASE },
          }}
        >
          <span />
        </motion.div>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
