"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { registerGSAP, gsap } from "@/lib/gsap"

export function PageTransition() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const curtainRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  // Initial page-load reveal
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (prefersReducedMotion) return

    window.__DANVERSE_LENIS__?.stop()
    registerGSAP()
    setActive(true)

    gsap.set(curtain, { clipPath: "inset(0 0 0% 0)" })

    gsap.to(curtain, {
      clipPath: "inset(100% 0 0% 0)",
      duration: 0.7,
      ease: "expo.inOut",
      delay: 0.05,
      onComplete: () => {
        setActive(false)
        window.__DANVERSE_LENIS__?.start()
      },
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Route-change transitions
  useEffect(() => {
    const curtain = curtainRef.current
    const logo = logoRef.current
    if (!curtain || !logo) return
    if (prevPath.current === pathname) return

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

    prevPath.current = pathname

    if (prefersReducedMotion) {
      window.scrollTo(0, 0)
      return
    }

    window.__DANVERSE_LENIS__?.stop()
    registerGSAP()

    const tl = gsap.timeline({
      onStart: () => setActive(true),
      onComplete: () => {
        setActive(false)
        window.__DANVERSE_LENIS__?.start()
      },
    })

    // In 600ms — curtain wipes up from bottom
    tl.set(curtain, { clipPath: "inset(0 0 100% 0)" })
    tl.set(logo, { opacity: 0 })
    tl.to(curtain, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.inOut" })

    // Logo fades in during hold
    tl.to(logo, { opacity: 1, duration: 0.2, ease: "power2.out" }, ">-0.1")

    // Hold 200ms + reset scroll
    tl.add(() => window.scrollTo(0, 0), "+=0.2")

    // Logo fades out
    tl.to(logo, { opacity: 0, duration: 0.15, ease: "power2.in" })

    // Out 500ms — curtain wipes upward
    tl.to(curtain, { clipPath: "inset(100% 0 0% 0)", duration: 0.5, ease: "expo.inOut" })

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9998 }}
      data-active={active}
    >
      <div
        ref={curtainRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #06070a 0%, #0a0e16 56%, #0e0912 100%)",
          clipPath: "inset(100% 0 0% 0)",
        }}
      >
        {/* DANVERSE logo — visible during hold */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "0.24em",
              color: "rgba(224,231,91,0.92)",
              textTransform: "uppercase",
            }}
          >
            DANVERSE
          </span>
        </div>

        {/* Subtle brand accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(224,231,91,0.35), transparent)",
          }}
        />
      </div>
    </div>
  )
}
