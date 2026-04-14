"use client"

import { useEffect, useRef, useState } from "react"
import {
  BufferGeometry,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  Scene,
  Vector2,
} from "three"
import { PointsNodeMaterial, WebGPURenderer } from "three/webgpu"
import {
  color,
  distance,
  float,
  hash,
  mix,
  positionLocal,
  sin,
  smoothstep,
  step,
  time,
  uniform,
  vec2,
  vec3,
} from "three/tsl"
import { gsap } from "@/lib/gsap"
import { emitter } from "@/lib/events"
import { useDanverseStore, type DeviceTier } from "@/lib/store"
import { createRenderer } from "@/lib/webgpu"

const GRID_SIZE: Record<Exclude<DeviceTier, "tier1">, number> = {
  tier2: 174,
  tier3: 245,
}

export function HeroTransmission({ tier }: { tier: Exclude<DeviceTier, "tier1"> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const setRendererReady = useDanverseStore((state) => state.setRendererReady)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: WebGPURenderer | null = null
    let scene: Scene | null = null
    let camera: PerspectiveCamera | null = null
    let points: Points | null = null
    let geometry: BufferGeometry | null = null
    let material: PointsNodeMaterial | null = null

    const cursorUniform = uniform(new Vector2(999, 999))
    const activationUniform = uniform(0)
    const burstUniform = uniform(1)

    let mounted = true

    const init = async () => {
      renderer = await createRenderer(canvas)
      if (!mounted || !renderer) return

      const backend = renderer.backend as { isWebGLBackend?: boolean }

      if (backend.isWebGLBackend) {
        renderer.dispose()
        setFallback(true)
        setRendererReady()
        emitter.emit("gpu-ready")
        return
      }

      scene = new Scene()
      camera = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.set(0, 2.2, 13)

      const grid = GRID_SIZE[tier]
      const spacing = 0.11
      const positions = new Float32Array(grid * grid * 3)

      let offset = 0

      for (let x = 0; x < grid; x += 1) {
        for (let z = 0; z < grid; z += 1) {
          positions[offset] = (x - grid / 2) * spacing
          positions[offset + 1] = 0
          positions[offset + 2] = (z - grid / 2) * spacing
          offset += 3
        }
      }

      geometry = new BufferGeometry()
      geometry.setAttribute("position", new Float32BufferAttribute(positions, 3))

      material = new PointsNodeMaterial()
      material.transparent = true
      material.depthWrite = false

      const localXZ = vec2(positionLocal.x, positionLocal.z)
      const wave = sin(positionLocal.x.mul(1.45).add(positionLocal.z.mul(0.95)).add(time.mul(1.45))).mul(0.35)
      const cursorDistance = distance(localXZ, cursorUniform)
      const repelStrength = float(1).sub(smoothstep(float(0.25), float(2.6), cursorDistance)).mul(0.8)
      const repelDirection = localXZ.sub(cursorUniform).normalize().mul(repelStrength)
      const centerDistance = distance(localXZ, vec2(float(0), float(0)))
      const burstFalloff = float(1).sub(smoothstep(float(0.2), float(12), centerDistance))
      const burstDirection = vec3(positionLocal.x, float(0), positionLocal.z).normalize()
      const burst = burstDirection.mul(burstUniform).mul(3.2).mul(burstFalloff)
      const flicker = step(float(0.995), hash(localXZ.add(time.mul(0.15))))

      material.positionNode = positionLocal.add(
        burst.add(
          vec3(
            repelDirection.x.mul(activationUniform),
            wave.mul(activationUniform),
            repelDirection.y.mul(activationUniform)
          )
        )
      )
      material.colorNode = mix(color("#f2f0e8"), color("#deff00"), flicker)
      material.opacityNode = float(0.5)

      points = new Points(geometry, material)
      scene.add(points)

      const handleResize = () => {
        if (!renderer || !camera) return
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      const handlePointer = (event: PointerEvent) => {
        const normalizedX = event.clientX / window.innerWidth
        const normalizedY = event.clientY / window.innerHeight

        cursorUniform.value.set((normalizedX - 0.5) * 12, (0.5 - normalizedY) * 8)
      }

      handleResize()
      window.addEventListener("resize", handleResize)
      window.addEventListener("pointermove", handlePointer)

      const intro = gsap.timeline()
      intro
        .set(points.scale, { x: 0.72, y: 0.72, z: 0.72 })
        .to(activationUniform, { value: 1, duration: 1.6, ease: "power3.out" }, 0)
        .to(burstUniform, { value: 0, duration: 1.4, ease: "power3.out" }, 0)
        .to(points.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.95, ease: "power3.out" }, 0)
        .to(points.scale, { x: 1, y: 1, z: 1, duration: 1.1, ease: "power3.out" }, 0.95)
        .to(camera.position, { z: 11.8, duration: 1.8, ease: "power2.out" }, 0)

      renderer.setAnimationLoop(() => {
        if (!renderer || !scene || !camera) return
        renderer.render(scene, camera)
      })

      setRendererReady()
      emitter.emit("gpu-ready")

      return () => {
        intro.kill()
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("pointermove", handlePointer)
      }
    }

    let cleanup: (() => void) | void

    void init().then((destroy) => {
      cleanup = destroy
    })

    return () => {
      mounted = false
      cleanup?.()
      renderer?.setAnimationLoop(null)
      geometry?.dispose()
      material?.dispose()
      renderer?.dispose()
      scene?.clear()
      points = null
      geometry = null
      material = null
      renderer = null
    }
  }, [setRendererReady, tier])

  if (fallback) {
    return <div className="hero-fallback" aria-hidden="true" />
  }

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
