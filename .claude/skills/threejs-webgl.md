---
name: threejs-webgl
description: Three.js r169 and WebGL patterns for DANVERSE-X — scene setup, shaders, React integration, performance, and cleanup. Auto-loaded for Three.js, 3D, or WebGL work.
trigger: three.js|threejs|webgl|shader|glsl|canvas|3d|geometry|material|renderer|scene|mesh
---

# Three.js r169 — DANVERSE-X Patterns

## React Integration (always dynamic import)
```tsx
// components/ThreeScene.tsx
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5

    // Add objects...
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xE0E75B })  // --color-electric-blue
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      mesh.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // CRITICAL: cleanup on unmount — prevents memory leaks on navigation
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 'var(--z-background)' }} />
}
```

## Dynamic Import in Page (always)
```tsx
// app/page.tsx or any Server Component
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,  // MANDATORY — Three.js needs browser globals
  loading: () => <div className="absolute inset-0 bg-[--color-bg]" />
})
```

## GLSL Shader Material
```tsx
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 2.0 + uTime) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec3 lime = vec3(0.878, 0.906, 0.357);   // #E0E75B
    vec3 teal = vec3(0.0, 0.651, 0.651);     // #00A6A6
    vec3 color = mix(lime, teal, vUv.y + sin(uTime * 0.5) * 0.3);
    gl_FragColor = vec4(color, 1.0);
  }
`

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 }
  }
})

// In animation loop:
shaderMaterial.uniforms.uTime.value = clock.getElapsedTime()
```

## Post-processing (EffectComposer)
```tsx
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.8,    // strength
  0.4,    // radius
  0.85    // threshold
))

// In animate():
composer.render()  // replace renderer.render(scene, camera)
```

## Performance Rules

### Pixel Ratio
```ts
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  // never >2
```

### Geometry Sharing
```ts
const sharedGeometry = new THREE.IcosahedronGeometry(1)
// Reuse for multiple meshes — never new geometry per instance
const mesh1 = new THREE.Mesh(sharedGeometry, mat1)
const mesh2 = new THREE.Mesh(sharedGeometry, mat2)
```

### Object Pooling for Particles
```ts
// Create once, reuse positions — never create/destroy particles
```

### Frustum Culling
```ts
mesh.frustumCulled = true  // default — don't disable unless needed
```

## DANVERSE Color Constants for Three.js
```ts
const COLORS = {
  electricBlue: new THREE.Color('#E0E75B'),   // citrus-lime
  hotPink: new THREE.Color('#00A6A6'),         // aqua-teal
  acidLime: new THREE.Color('#EF786A'),        // coral
  lavender: new THREE.Color('#C48BB4'),
  dark: new THREE.Color('#06070a'),
}
```

## GSAP + Three.js (scroll-driven 3D)
```ts
// Animate Three.js object with GSAP ScrollTrigger
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    mesh.rotation.y = self.progress * Math.PI * 2
    camera.position.z = 5 - self.progress * 2
  }
})
```

## Cleanup Checklist (always in useEffect return)
```ts
return () => {
  cancelAnimationFrame(animId)
  // Dispose all geometries
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose()
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose())
      } else {
        obj.material.dispose()
      }
    }
  })
  renderer.dispose()
  renderer.forceContextLoss()  // for WebGL context cleanup
  scene.clear()
}
```
