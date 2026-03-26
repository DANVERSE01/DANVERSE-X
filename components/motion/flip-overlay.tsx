"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import { flipClose, flipOpen } from "@/lib/motion/flip"

interface FLIPOverlayProps {
  originId: string
  children: (controls: { close: () => void }) => React.ReactNode
  onClosed: () => void
}

export function FLIPOverlay({
  originId,
  children,
  onClosed,
}: FLIPOverlayProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const reduceMotion = useReducedMotion()

  const close = useCallback(() => {
    if (isClosing) {
      return
    }

    const panel = panelRef.current
    const backdrop = backdropRef.current
    const origin = document.querySelector<HTMLElement>(`[data-project-card="${originId}"]`)

    setIsClosing(true)
    gsap.to(backdrop, {
      autoAlpha: 0,
      duration: 0.24,
      ease: "power2.out",
    })

    if (!panel || !origin) {
      onClosed()
      return
    }

    if (reduceMotion) {
      gsap.to(panel, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: onClosed,
      })
      return
    }

    flipClose(panel, origin, {
      onComplete: onClosed,
    })
  }, [isClosing, onClosed, originId, reduceMotion])

  useEffect(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    const origin = document.querySelector<HTMLElement>(`[data-project-card="${originId}"]`)
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    gsap.set(backdrop, { autoAlpha: 0 })
    gsap.to(backdrop, {
      autoAlpha: 1,
      duration: 0.28,
      ease: "power2.out",
    })

    if (reduceMotion && panel) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
        },
      )
    } else if (panel && origin) {
      flipOpen(panel, origin)
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [originId, reduceMotion])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[120] bg-[rgb(4_7_12_/_0.72)] backdrop-blur-2xl"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close()
        }
      }}
    >
      <div className="fixed inset-0 z-[121] flex items-center justify-center p-4 md:p-8">
        <div
          ref={panelRef}
          className="pointer-events-auto relative flex h-[min(92svh,920px)] w-full max-w-6xl overflow-hidden rounded-[28px] powder-panel"
        >
          {children({ close })}
        </div>
      </div>
    </div>
  )
}
