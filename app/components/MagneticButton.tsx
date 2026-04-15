"use client"

import type { CSSProperties, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  href?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
  strength = 0.4,
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (href) {
    return (
      <motion.a
        href={href}
        style={{ x: springX, y: springY, display: "inline-block", ...style }}
        whileTap={{ scale: 0.97 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        data-cursor="magnetic"
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      style={{ x: springX, y: springY, ...style }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={className}
      data-cursor="magnetic"
    >
      {children}
    </motion.button>
  )
}
