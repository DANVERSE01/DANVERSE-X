"use client"

import type { CSSProperties, ReactNode } from "react"
import { useEffect, useState } from "react"
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

  const [disable, setDisable] = useState(false)

  useEffect(() => {
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarseMq = window.matchMedia("(pointer: coarse)")
    const update = () => setDisable(reducedMq.matches || coarseMq.matches)
    update()
    reducedMq.addEventListener("change", update)
    coarseMq.addEventListener("change", update)
    return () => {
      reducedMq.removeEventListener("change", update)
      coarseMq.removeEventListener("change", update)
    }
  }, [])

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disable) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (disable) {
    if (href) {
      return (
        <a href={href} className={className} style={style} data-cursor="magnetic">
          {children}
        </a>
      )
    }
    return (
      <button type="button" onClick={onClick} className={className} style={style} data-cursor="magnetic">
        {children}
      </button>
    )
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
      type="button"
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
