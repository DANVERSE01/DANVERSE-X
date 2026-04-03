"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

type Scene = {
  id: string
  label: string
  eyebrow: string
  status: string
  accent: string
  secondary: string
  wash: string
}

const HOME_SCENES: readonly Scene[] = [
  {
    id: "hero",
    label: "Opening Frame",
    eyebrow: "Hero",
    status: "Atmosphere locked",
    accent: "106 129 255",
    secondary: "198 235 104",
    wash: "18 24 40",
  },
  {
    id: "trust",
    label: "Trust Layer",
    eyebrow: "Proof",
    status: "Credibility surfaced",
    accent: "198 235 104",
    secondary: "157 176 255",
    wash: "14 18 24",
  },
  {
    id: "features",
    label: "Studio Standard",
    eyebrow: "Craft",
    status: "Quality threshold visible",
    accent: "157 176 255",
    secondary: "216 154 183",
    wash: "15 18 27",
  },
  {
    id: "industries",
    label: "Capability Reel",
    eyebrow: "Breadth",
    status: "Range under control",
    accent: "216 154 183",
    secondary: "106 129 255",
    wash: "22 16 24",
  },
  {
    id: "case-files",
    label: "Case Files",
    eyebrow: "Evidence",
    status: "Receipts on deck",
    accent: "198 235 104",
    secondary: "216 154 183",
    wash: "16 14 20",
  },
  {
    id: "showcase",
    label: "Showcase Stage",
    eyebrow: "Playback",
    status: "Playback in focus",
    accent: "106 129 255",
    secondary: "198 235 104",
    wash: "10 14 20",
  },
  {
    id: "process",
    label: "Operating Model",
    eyebrow: "Method",
    status: "Delivery logic exposed",
    accent: "255 47 146",
    secondary: "106 129 255",
    wash: "18 12 22",
  },
  {
    id: "brief-planner",
    label: "Brief Qualifier",
    eyebrow: "Convert",
    status: "Signal captured",
    accent: "198 235 104",
    secondary: "106 129 255",
    wash: "12 18 20",
  },
  {
    id: "contact",
    label: "Final Contact",
    eyebrow: "Close",
    status: "Momentum ready",
    accent: "198 235 104",
    secondary: "216 154 183",
    wash: "12 12 16",
  },
] as const

const CURSOR_EXPAND_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  ".hover-lift",
  ".cta-primary",
  ".cta-secondary",
  ".accent-chip",
  ".nav-link",
].join(", ")

const MAGNETIC_SELECTOR = [".cta-primary", ".cta-secondary", ".accent-chip", ".nav-link"].join(", ")

const TILT_SELECTOR = [".hover-lift", ".brand-card", ".statement-panel", ".process-banner"].join(", ")

export function CinematicStage() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)
  const [activeScene, setActiveScene] = useState(HOME_SCENES[0]?.id ?? "hero")
  const [showPrelude, setShowPrelude] = useState(false)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  const scenes = useMemo(() => (pathname === "/" ? HOME_SCENES : []), [pathname])
  const currentScene = useMemo(
    () => scenes.find((scene) => scene.id === activeScene) ?? scenes[0] ?? HOME_SCENES[0],
    [activeScene, scenes]
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
    const connection = navigator as Navigator & {
      connection?: {
        saveData?: boolean
      }
    }

    const sync = () => {
      setEnabled(!media.matches && connection.connection?.saveData !== true)
    }

    sync()
    media.addEventListener?.("change", sync)
    return () => media.removeEventListener?.("change", sync)
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) {
      return
    }

    document.body.dataset.cinematic = "true"

    let mouseX = window.innerWidth * 0.5
    let mouseY = window.innerHeight * 0.5
    let ringX = mouseX
    let ringY = mouseY
    let rafId = 0

    const setCursorVars = (x: number, y: number) => {
      document.documentElement.style.setProperty("--cursor-x", `${x}px`)
      document.documentElement.style.setProperty("--cursor-y", `${y}px`)
    }

    const onPointerMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      setCursorVars(mouseX, mouseY)
    }

    const animate = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      rafId = window.requestAnimationFrame(animate)
    }

    const expandCursor = () => {
      dot.classList.add("cursor-dot-expanded")
      ring.classList.add("cursor-ring-expanded")
    }

    const shrinkCursor = () => {
      dot.classList.remove("cursor-dot-expanded")
      ring.classList.remove("cursor-ring-expanded")
    }

    const interactiveElements = Array.from(document.querySelectorAll<HTMLElement>(CURSOR_EXPAND_SELECTOR))
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", expandCursor)
      element.addEventListener("mouseleave", shrinkCursor)
    })

    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR))
    const onMagneticMove = (event: Event) => {
      const pointerEvent = event as MouseEvent
      const element = event.currentTarget as HTMLElement
      const rect = element.getBoundingClientRect()
      const offsetX = pointerEvent.clientX - rect.left - rect.width / 2
      const offsetY = pointerEvent.clientY - rect.top - rect.height / 2
      const strength = Number(element.dataset.magneticStrength ?? 0.12)

      element.style.setProperty("--magnetic-x", `${offsetX * strength}px`)
      element.style.setProperty("--magnetic-y", `${offsetY * strength}px`)
    }

    const resetMagnetic = (event: Event) => {
      const element = event.currentTarget as HTMLElement
      element.style.setProperty("--magnetic-x", "0px")
      element.style.setProperty("--magnetic-y", "0px")
    }

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", onMagneticMove)
      element.addEventListener("mouseleave", resetMagnetic)
    })

    const tiltElements = Array.from(document.querySelectorAll<HTMLElement>(TILT_SELECTOR)).filter(
      (element) => !element.parentElement?.closest(TILT_SELECTOR)
    )
    const onTiltMove = (event: Event) => {
      const pointerEvent = event as MouseEvent
      const element = event.currentTarget as HTMLElement
      const rect = element.getBoundingClientRect()
      const ratioX = (pointerEvent.clientX - rect.left) / rect.width - 0.5
      const ratioY = (pointerEvent.clientY - rect.top) / rect.height - 0.5
      const tiltStrength = Number(element.dataset.tiltStrength ?? 7.5)

      element.style.setProperty("--tilt-rotate-x", `${ratioY * -tiltStrength}deg`)
      element.style.setProperty("--tilt-rotate-y", `${ratioX * tiltStrength}deg`)
      element.style.setProperty("--hover-shift-x", `${ratioX * 8}px`)
      element.style.setProperty("--hover-shift-y", `${ratioY * 8}px`)
      element.style.setProperty("--glow-x", `${(ratioX + 0.5) * 100}%`)
      element.style.setProperty("--glow-y", `${(ratioY + 0.5) * 100}%`)
      element.style.setProperty("--surface-glow-opacity", "1")
    }

    const resetTilt = (event: Event) => {
      const element = event.currentTarget as HTMLElement
      element.style.setProperty("--tilt-rotate-x", "0deg")
      element.style.setProperty("--tilt-rotate-y", "0deg")
      element.style.setProperty("--hover-shift-x", "0px")
      element.style.setProperty("--hover-shift-y", "0px")
      element.style.setProperty("--surface-glow-opacity", "0")
    }

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", onTiltMove)
      element.addEventListener("mouseleave", resetTilt)
    })

    const hero = document.getElementById("hero")
    const onHeroMove = (event: Event) => {
      if (!hero) {
        return
      }

      const pointerEvent = event as MouseEvent
      const rect = hero.getBoundingClientRect()
      const ratioX = (pointerEvent.clientX - rect.left) / rect.width - 0.5
      const ratioY = (pointerEvent.clientY - rect.top) / rect.height - 0.5

      hero.style.setProperty("--hero-parallax-x", `${ratioX * 36}px`)
      hero.style.setProperty("--hero-parallax-y", `${ratioY * 28}px`)
    }

    const resetHero = () => {
      hero?.style.setProperty("--hero-parallax-x", "0px")
      hero?.style.setProperty("--hero-parallax-y", "0px")
    }

    hero?.addEventListener("mousemove", onHeroMove)
    hero?.addEventListener("mouseleave", resetHero)

    document.addEventListener("mousemove", onPointerMove)
    setCursorVars(mouseX, mouseY)
    rafId = window.requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onPointerMove)
      window.cancelAnimationFrame(rafId)
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", expandCursor)
        element.removeEventListener("mouseleave", shrinkCursor)
      })
      magneticElements.forEach((element) => {
        element.removeEventListener("mousemove", onMagneticMove)
        element.removeEventListener("mouseleave", resetMagnetic)
      })
      tiltElements.forEach((element) => {
        element.removeEventListener("mousemove", onTiltMove)
        element.removeEventListener("mouseleave", resetTilt)
      })
      hero?.removeEventListener("mousemove", onHeroMove)
      hero?.removeEventListener("mouseleave", resetHero)
      document.body.removeAttribute("data-cinematic")
      document.documentElement.style.removeProperty("--cursor-x")
      document.documentElement.style.removeProperty("--cursor-y")
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || pathname !== "/") {
      setShowPrelude(false)
      return
    }

    const hasSeenPrelude = window.sessionStorage.getItem("danverse:cinematic-prelude:v1") === "1"
    if (hasSeenPrelude) {
      return
    }

    window.sessionStorage.setItem("danverse:cinematic-prelude:v1", "1")
    setShowPrelude(true)

    const hideTimer = window.setTimeout(() => setShowPrelude(false), 2300)
    return () => window.clearTimeout(hideTimer)
  }, [enabled, pathname])

  useEffect(() => {
    if (!enabled || pathname !== "/" || scenes.length === 0) {
      return
    }

    const sectionMap = scenes
      .map((scene) => ({ ...scene, element: document.getElementById(scene.id) }))
      .filter((scene): scene is Scene & { element: HTMLElement } => Boolean(scene.element))

    if (sectionMap.length === 0) {
      return
    }

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const nextScene = Array.from(ratios.entries()).sort((left, right) => right[1] - left[1])[0]?.[0]
        if (nextScene) {
          setActiveScene(nextScene)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-12% 0px -42% 0px",
      }
    )

    sectionMap.forEach((scene) => {
      ratios.set(scene.id, 0)
      observer.observe(scene.element)
    })

    return () => {
      observer.disconnect()
    }
  }, [enabled, pathname, scenes])

  useEffect(() => {
    if (!enabled || !currentScene) {
      return
    }

    document.body.dataset.activeScene = currentScene.id
    document.documentElement.style.setProperty("--scene-accent-rgb", currentScene.accent)
    document.documentElement.style.setProperty("--scene-secondary-rgb", currentScene.secondary)
    document.documentElement.style.setProperty("--scene-wash-rgb", currentScene.wash)

    return () => {
      document.body.removeAttribute("data-active-scene")
      document.documentElement.style.removeProperty("--scene-accent-rgb")
      document.documentElement.style.removeProperty("--scene-secondary-rgb")
      document.documentElement.style.removeProperty("--scene-wash-rgb")
    }
  }, [currentScene, enabled])

  if (!enabled) {
    return null
  }

  return (
    <>
      <div className="scene-wash" aria-hidden="true" />
      <div className="cinematic-spotlight" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {pathname === "/" ? <StagePrelude show={showPrelude} onSkip={() => setShowPrelude(false)} /> : null}
    </>
  )
}


function StagePrelude({ onSkip, show }: { onSkip: () => void; show: boolean }) {
  if (!show) {
    return null
  }

  return (
    <div className="stage-prelude" role="presentation">
      <div className="stage-prelude__grain" />
      <div className="stage-prelude__beam" />
      <div className="stage-prelude__copy">
        <p className="stage-prelude__eyebrow">DANVERSE 2026</p>
        <div className="stage-prelude__mark">
          <span className="stage-prelude__line" />
          <span className="stage-prelude__title">Visual Advantage</span>
          <span className="stage-prelude__line" />
        </div>
        <p className="stage-prelude__note">Scroll slowly. Each section is cut like a scene.</p>
      </div>
      <button type="button" className="stage-prelude__skip" onClick={onSkip} aria-label="Skip cinematic intro">
        Skip Intro
      </button>
    </div>
  )
}

