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
    <div ref={wrapperRef} className="preloader" role="status" aria-live="polite" aria-label="Loading DANVERSE">
      <div ref={curtainRef} className="preloader__curtain" />
      <div className="preloader__inner">
        <span className="preloader__eyebrow">DANVERSE</span>
        <div className="preloader__counter-mask">
          <span ref={counterRef} className="preloader__counter">000</span>
        </div>
        <span className="preloader__label">Assembling</span>
      </div>
    </div>
  )
}
