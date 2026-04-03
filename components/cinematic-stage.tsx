"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

type Scene = {
  id: string
  label: string
  eyebrow: string
}

const HOME_SCENES: readonly Scene[] = [
  { id: "hero", label: "Opening Frame", eyebrow: "Hero" },
  { id: "trust", label: "Trust Layer", eyebrow: "Proof" },
  { id: "features", label: "Studio Standard", eyebrow: "Craft" },
  { id: "industries", label: "Capability Reel", eyebrow: "Breadth" },
  { id: "case-files", label: "Case Files", eyebrow: "Evidence" },
  { id: "showcase", label: "Showcase Stage", eyebrow: "Playback" },
  { id: "process", label: "Operating Model", eyebrow: "Method" },
  { id: "brief-planner", label: "Brief Qualifier", eyebrow: "Convert" },
  { id: "contact", label: "Final Contact", eyebrow: "Close" },
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  const scenes = useMemo(() => (pathname === "/" ? HOME_SCENES : []), [pathname])

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
    const updateScrollProgress = () => {
      const scrollRoot = document.documentElement
      const scrollableHeight = Math.max(scrollRoot.scrollHeight - window.innerHeight, 1)
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollableHeight)))
    }

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

    updateScrollProgress()
    window.addEventListener("scroll", updateScrollProgress, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateScrollProgress)
    }
  }, [enabled, pathname, scenes])

  if (!enabled) {
    return null
  }

  return (
    <>
      <div className="cinematic-spotlight" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      {pathname === "/" && scenes.length > 0 ? (
        <SceneRail activeScene={activeScene} progress={scrollProgress} scenes={scenes} />
      ) : null}
    </>
  )
}

function SceneRail({
  activeScene,
  progress,
  scenes,
}: {
  activeScene: string
  progress: number
  scenes: readonly Scene[]
}) {
  return (
    <nav className="scene-rail" aria-label="Narrative scene rail">
      <div className="scene-rail__eyebrow">Narrative Flow</div>
      <div className="scene-rail__track" aria-hidden="true">
        <span className="scene-rail__progress" style={{ transform: `scaleY(${Math.max(progress, 0.04)})` }} />
      </div>
      <div className="scene-rail__list">
        {scenes.map((scene, index) => {
          const isActive = scene.id === activeScene

          return (
            <button
              key={scene.id}
              type="button"
              className="scene-rail__item"
              data-active={isActive}
              onClick={() => document.getElementById(scene.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              <span className="scene-rail__count">{String(index + 1).padStart(2, "0")}</span>
              <span className="scene-rail__meta">
                <span className="scene-rail__kicker">{scene.eyebrow}</span>
                <span className="scene-rail__label">{scene.label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
