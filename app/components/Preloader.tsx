"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("preloader-done")) {
      setVisible(false)
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    const counter = counterRef.current
    if (!counter) return

    const obj = { val: 0 }

    const split = new SplitText(counter, { type: "chars" })
    gsap.set(split.chars, { yPercent: 100, opacity: 0 })

    const tl = gsap.timeline({
      onComplete() {
        const curtain = curtainRef.current
        if (!curtain) return
        gsap.to(curtain, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete() {
            document.body.style.overflow = ""
            sessionStorage.setItem("preloader-done", "1")
            setVisible(false)
          },
        })
      },
    })

    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate() {
        if (counter) counter.textContent = String(Math.round(obj.val)).padStart(3, "0")
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
          overwrite: "auto",
        })
      },
    })

    return () => {
      tl.kill()
      split.revert()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "#06070a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      <div
        ref={curtainRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#06070a",
          transformOrigin: "bottom center",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            letterSpacing: "0.2em",
            color: "rgba(224,231,91,0.7)",
            textTransform: "uppercase",
          }}
        >
          DANVERSE
        </span>

        <div style={{ overflow: "hidden", lineHeight: 1 }}>
          <span
            ref={counterRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "8rem",
              fontWeight: 800,
              color: "#E0E75B",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              display: "block",
            }}
          >
            000
          </span>
        </div>

        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            letterSpacing: "0.25em",
            color: "rgba(244,238,229,0.35)",
            textTransform: "uppercase",
          }}
        >
          Loading
        </span>
      </div>
    </div>
  )
}
