"use client"

import { useEffect } from "react"

const HEADER_OFFSET = 104

export function SiteEffects() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      revealTargets.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      }
    )

    revealTargets.forEach((element) => revealObserver.observe(element))

    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null

      if (!anchor) {
        return
      }

      const href = anchor.getAttribute("href")

      if (!href || href === "#") {
        return
      }

      const section = document.querySelector<HTMLElement>(href)

      if (!section) {
        return
      }

      event.preventDefault()

      const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"

      window.history.replaceState(null, "", href)
      window.scrollTo({ top, behavior })
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      return
    }

    const section = document.querySelector<HTMLElement>(window.location.hash)

    if (!section) {
      return
    }

    const syncHashPosition = () => {
      const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
      window.scrollTo({ top, behavior: "auto" })
    }

    const frame = window.requestAnimationFrame(syncHashPosition)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    if (!supportsCustomCursor) {
      return
    }

    const body = document.body
    const cursor = document.querySelector<HTMLElement>(".custom-cursor")
    const ring = document.querySelector<HTMLElement>(".custom-cursor-ring")

    if (!cursor || !ring) {
      return
    }

    body.classList.add("has-custom-cursor")

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let frame = 0

    const updateCursor = (event: PointerEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      cursor.style.opacity = "1"
      ring.style.opacity = "1"
    }

    const animateRing = () => {
      ringX += (mouseX - ringX - 18) * 0.16
      ringY += (mouseY - ringY - 18) * 0.16
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = window.requestAnimationFrame(animateRing)
    }

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null
      body.classList.toggle("cursor-hover", Boolean(target?.closest("a, button, [data-hover]")))
    }

    const handlePointerOut = (event: Event) => {
      const relatedTarget = (event as MouseEvent).relatedTarget as HTMLElement | null

      if (!relatedTarget?.closest("a, button, [data-hover]")) {
        body.classList.remove("cursor-hover")
      }
    }

    const handlePointerLeave = () => {
      cursor.style.opacity = "0"
      ring.style.opacity = "0"
      body.classList.remove("cursor-hover")
    }

    document.addEventListener("pointermove", updateCursor)
    document.addEventListener("mouseover", handlePointerOver)
    document.addEventListener("mouseout", handlePointerOut)
    document.addEventListener("mouseleave", handlePointerLeave)
    frame = window.requestAnimationFrame(animateRing)

    return () => {
      body.classList.remove("has-custom-cursor", "cursor-hover")
      document.removeEventListener("pointermove", updateCursor)
      document.removeEventListener("mouseover", handlePointerOver)
      document.removeEventListener("mouseout", handlePointerOut)
      document.removeEventListener("mouseleave", handlePointerLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div className="custom-cursor" aria-hidden="true" />
      <div className="custom-cursor-ring" aria-hidden="true" />
    </>
  )
}
