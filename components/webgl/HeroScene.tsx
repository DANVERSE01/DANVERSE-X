"use client"

import type { MutableRefObject, RefObject } from "react"
import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ScrollTrigger } from "@/lib/gsap-config"

interface HeroSceneProps {
  enabled: boolean
  triggerRef: RefObject<HTMLElement>
}

function FloatingSpecimen({
  enabled,
  pointerRef,
  progressRef,
}: {
  enabled: boolean
  pointerRef: MutableRefObject<{ x: number; y: number }>
  progressRef: MutableRefObject<number>
}) {
  const frameRef = useRef(0)
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhysicalMaterial>>(null)
  const shellRef = useRef<THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhysicalMaterial>>(null)

  const { basePositions, coreGeometry, shellGeometry } = useMemo(() => {
    const core = new THREE.IcosahedronGeometry(1.22, 3)
    const shell = core.clone()
    ;(core.attributes.position as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage)
    ;(shell.attributes.position as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage)

    return {
      coreGeometry: core,
      shellGeometry: shell,
      basePositions: Float32Array.from(core.attributes.position.array as ArrayLike<number>),
    }
  }, [])

  useEffect(() => {
    return () => {
      coreGeometry.dispose()
      shellGeometry.dispose()
    }
  }, [coreGeometry, shellGeometry])

  useFrame((state) => {
    const group = groupRef.current
    const core = coreRef.current
    const shell = shellRef.current

    if (!group || !core || !shell) {
      return
    }

    const progress = progressRef.current
    const pointer = pointerRef.current
    const time = state.clock.getElapsedTime()

    group.position.x = THREE.MathUtils.lerp(group.position.x, 0.92 + pointer.x * 0.16 - progress * 0.34, 0.05)
    group.position.y = THREE.MathUtils.lerp(group.position.y, pointer.y * 0.1 - progress * 0.1, 0.05)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0.32 + progress * 0.34 + pointer.y * 0.05, 0.045)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, time * 0.14 + progress * 0.72 + pointer.x * 0.06, 0.045)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -0.1 + progress * 0.08, 0.04)

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -0.06 + progress * 0.18, 0.04)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.02 - progress * 0.08, 0.04)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5.1 - progress * 0.48, 0.04)
    state.camera.lookAt(0.12, 0, 0)

    const corePosition = core.geometry.attributes.position as THREE.BufferAttribute
    const shellPosition = shell.geometry.attributes.position as THREE.BufferAttribute
    const coreArray = corePosition.array as Float32Array
    const shellArray = shellPosition.array as Float32Array
    const amplitude = enabled ? 0.034 : 0.018

    for (let index = 0; index < coreArray.length; index += 3) {
      const x = basePositions[index]
      const y = basePositions[index + 1]
      const z = basePositions[index + 2]
      const wave =
        Math.sin(x * 3.3 + time * 0.7) * 0.48 +
        Math.sin(y * 4.1 - time * 0.44 + progress * 3.8) * 0.34 +
        Math.sin(z * 2.9 + time * 0.56) * 0.24

      const scale = 1 + wave * amplitude + progress * 0.018
      const shellScale = 1.07 + wave * amplitude * 0.52 + progress * 0.008

      coreArray[index] = x * scale
      coreArray[index + 1] = y * scale
      coreArray[index + 2] = z * scale

      shellArray[index] = x * shellScale
      shellArray[index + 1] = y * shellScale
      shellArray[index + 2] = z * shellScale
    }

    corePosition.needsUpdate = true
    shellPosition.needsUpdate = true
    frameRef.current += 1

    if (frameRef.current % 12 === 0) {
      core.geometry.computeVertexNormals()
      shell.geometry.computeVertexNormals()
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={shellRef} geometry={shellGeometry}>
          <meshPhysicalMaterial
            color="#2F63BA"
            transparent
            opacity={0.12}
            roughness={0.42}
            metalness={0.01}
            clearcoat={1}
            clearcoatRoughness={0.48}
            transmission={0.08}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={coreRef} geometry={coreGeometry}>
          <meshPhysicalMaterial
            color="#162A53"
            emissive="#2F63BA"
            emissiveIntensity={0.08}
            roughness={0.28}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.18}
            sheen={1}
            sheenColor="#C7D3E0"
            specularIntensity={0.64}
          />
        </mesh>
        <mesh position={[0.14, -0.08, 0.18]} scale={0.46}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#3E2B2D" transparent opacity={0.14} />
        </mesh>
      </group>

      <mesh position={[0.8, -1.88, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 64]} />
        <meshBasicMaterial color="#2F63BA" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </>
  )
}

export default function HeroScene({ enabled, triggerRef }: HeroSceneProps) {
  const pointerRef = useRef({ x: 0, y: 0 })
  const progressRef = useRef(0)

  useEffect(() => {
    if (!enabled) {
      progressRef.current = 0
      return
    }

    const trigger = triggerRef.current

    if (!trigger) {
      return
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: ({ progress }) => {
        progressRef.current = progress
      },
    })

    return () => {
      progressRef.current = 0
      scrollTrigger.kill()
    }
  }, [enabled, triggerRef])

  useEffect(() => {
    if (!enabled) {
      pointerRef.current = { x: 0, y: 0 }
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [enabled])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.75 }}
        camera={{ fov: 32, position: [0, 0, 5.2] }}
      >
        <color attach="background" args={["#04070C"]} />
        <fog attach="fog" args={["#0A1325", 4.5, 8.5]} />
        <ambientLight intensity={0.5} color="#C7D3E0" />
        <directionalLight position={[-2.8, 2.4, 3.6]} intensity={1.1} color="#EEF3F8" />
        <pointLight position={[2.8, 1.4, 2.2]} intensity={1.3} color="#2F63BA" />
        <pointLight position={[1.2, -2.6, 1.6]} intensity={0.52} color="#3E2B2D" />
        <FloatingSpecimen enabled={enabled} pointerRef={pointerRef} progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
