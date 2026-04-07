"use client"

import { useEffect, useRef } from "react"

/**
 * CinematicStage — Three.js constellation that composites above the plasma
 * background. ~1 400 star-particles with brand-color tints, gentle drift, and
 * mouse parallax. Loaded lazily after user interaction (ProgressiveEnhancements).
 *
 * Performance notes:
 *  - WebGLRenderer alpha:true → composites over existing plasma without obscuring it
 *  - DPR capped at 1.5
 *  - All objects disposed on unmount
 *  - Dynamic import keeps Three.js out of the initial JS bundle
 */
export function CinematicStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    let rafId = 0
    let cleanupFn: (() => void) | null = null

    import("three").then((THREE) => {
      if (!canvasRef.current) return // unmounted while loading

      // ── Renderer ──────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)

      // ── Scene / Camera ─────────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 1000)
      camera.position.z = 6

      // ── Particle geometry ──────────────────────────────────────────────
      const COUNT = 1_400
      const positions = new Float32Array(COUNT * 3)
      const sizes     = new Float32Array(COUNT)
      const randoms   = new Float32Array(COUNT)

      for (let i = 0; i < COUNT; i++) {
        const theta  = Math.random() * Math.PI * 2
        const phi    = Math.acos(2 * Math.random() - 1)
        const radius = 2.8 + Math.random() * 5.2

        positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.48
        positions[i * 3 + 2] = radius * Math.cos(phi)

        sizes[i]   = 0.35 + Math.random() * 1.6
        randoms[i] = Math.random()
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geo.setAttribute("aSize",    new THREE.Float32BufferAttribute(sizes, 1))
      geo.setAttribute("aRandom",  new THREE.Float32BufferAttribute(randoms, 1))

      // ── Shader ────────────────────────────────────────────────────────
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
        uniforms: {
          uTime:   { value: 0 },
          uColor1: { value: new THREE.Color("#e0e75b") }, // citrus-lime
          uColor2: { value: new THREE.Color("#00a6a6") }, // aqua-teal
          uColor3: { value: new THREE.Color("#ef786a") }, // coral
          uColor4: { value: new THREE.Color("#c48bb4") }, // lavender
        },
        vertexShader: /* glsl */ `
          attribute float aSize;
          attribute float aRandom;
          uniform   float uTime;
          varying   float vRand;
          varying   float vAlpha;

          void main() {
            vRand  = aRandom;
            vec3 p = position;
            float phase = aRandom * 6.2831;
            p.y += sin(uTime * 0.26 + phase) * 0.055;
            p.x += cos(uTime * 0.19 + phase) * 0.038;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position  = projectionMatrix * mv;
            gl_PointSize = aSize * (300.0 / -mv.z);

            // fade particles near camera edge
            vAlpha = smoothstep(0.0, 2.5, -mv.z) * 0.62;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3  uColor1;
          uniform vec3  uColor2;
          uniform vec3  uColor3;
          uniform vec3  uColor4;
          varying float vRand;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float alpha = smoothstep(1.0, 0.1, d) * vAlpha;

            vec3 col = vRand < 0.28 ? uColor1
                     : vRand < 0.52 ? uColor2
                     : vRand < 0.76 ? uColor3
                     : uColor4;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      })

      const points = new THREE.Points(geo, mat)
      scene.add(points)

      // ── Resize ────────────────────────────────────────────────────────
      const resize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener("resize", resize, { passive: true })

      // ── Mouse parallax ────────────────────────────────────────────────
      let targetX = 0
      let targetY = 0
      let currentX = 0
      let currentY = 0
      const onMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 0.55
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.35
      }
      window.addEventListener("mousemove", onMouse, { passive: true })

      // ── Animate ───────────────────────────────────────────────────────
      const t0 = performance.now()
      const tick = () => {
        rafId = requestAnimationFrame(tick)
        const t = (performance.now() - t0) * 0.001
        mat.uniforms.uTime.value = t

        // Lerp mouse parallax
        currentX += (targetX - currentX) * 0.04
        currentY += (targetY - currentY) * 0.04

        points.rotation.y = t * 0.016 + currentX * 0.14
        points.rotation.x = currentY * 0.09

        renderer.render(scene, camera)
      }
      tick()

      cleanupFn = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener("resize", resize)
        window.removeEventListener("mousemove", onMouse)
        geo.dispose()
        mat.dispose()
        renderer.dispose()
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      cleanupFn?.()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 2 }}
    />
  )
}
