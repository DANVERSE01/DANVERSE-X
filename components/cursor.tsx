"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let frameId = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`
      }
      frameId = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      followerRef.current?.classList.add("scale-[2.5]", "border-[var(--color-accent)]", "bg-[rgba(255,69,0,0.1)]")
    }

    const onMouseLeaveLink = () => {
      followerRef.current?.classList.remove("scale-[2.5]", "border-[var(--color-accent)]", "bg-[rgba(255,69,0,0.1)]")
    }

    const interactiveElements = document.querySelectorAll("a, button")

    document.addEventListener("mousemove", onMouseMove)
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink)
      el.addEventListener("mouseleave", onMouseLeaveLink)
    })

    animate()

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink)
        el.removeEventListener("mouseleave", onMouseLeaveLink)
      })
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference pointer-events-none transition-none"
        style={{ willChange: "transform" }}
      />
      <div
        ref={followerRef}
        className="fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-white/30 mix-blend-difference pointer-events-none transition-transform duration-100"
        style={{ willChange: "transform" }}
      />
    </>
  )
}
