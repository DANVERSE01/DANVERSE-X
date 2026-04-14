---
name: danverse-2026-master-skills
description: >
  DANVERSE-X Elite Production Skill — Complete 2026 World-Class Web Standards.
  36 modules: Three.js r184+, WebGPU TSL Safari-26-universal, GSAP all-plugins-free,
  SplitText-mask-3.13, Framer-Motion, Lenis, FBO-ping-pong-GPU-particles, glslify-curl-noise,
  N8AO DOF film-grain post-FX, MeshTransmissionMaterial, CSS-Houdini paint-worklet,
  View-Transitions-API, CSS-Anchor-Positioning, Tailwind-v4-CSS-first-@theme,
  Zustand-subscribeWithSelector, SceneManager, TypedEventBus, detect-gpu-4-tier,
  iOS-Safari-WebGL-fixes, WCAG-2.1-AA, Next.js-15-App-Router, TypeScript-strict-branded,
  React-architecture, state-management, debug-first, Cloudflare-R2-CDN, Vite-GLSL-HMR.
  Standard: Awwwards SOTD. Zero AI-slop.
  References: lusion.co unfold.no activetheory.net basement.studio resn.co.nz
compatibility: "Next.js 15, React 19, TypeScript 5.5, Tailwind v4, Three.js r184+"
---

# DANVERSE-X Master Skills 2026
## 36 Modules · Awwwards Standard · Zero Generic Output

> Every decision intentional. Every animation earned. Every pixel purposeful.

---

## CORE PHILOSOPHY

1. Intent over template — Every visual decision must have a reason
2. Feel > Feature — Premium with 3 elements beats cluttered with 30
3. Performance IS design — 60fps non-negotiable. Jank destroys illusion
4. Anti-generic rule — If it looks like AI made it, redo it
5. Layers of depth — Foreground/midground/background at different rates
6. Sound optional but powerful — A subtle click doubles perceived quality

---

## DECISION MATRIX

| Task | Tool | Critical Note |
|------|------|---------------|
| PBR 3D scene | Three.js R3F | KTX2 + DRACO compression |
| Crystal/glass | MeshTransmissionMaterial | samples:16, backside:true |
| Mirror floor | MeshReflectorMaterial | resolution:2048 |
| GPU particles | GLSL + FBO ping-pong | Module 27 |
| SDF sculpting | Ray marching fullscreen quad | Pure GLSL |
| TSL shader | TSL Module 26 | WebGL+WebGPU future-proof |
| Scroll storytelling | GSAP ScrollTrigger + Lenis | scrub:1.5 premium feel |
| Scroll no-JS | CSS Scroll-Driven Module 31 | Native, zero library |
| Text cinematic | GSAP SplitText mask:chars | GSAP 3.13 auto-clip |
| Variable font | GSAP fontVariationSettings | Module 30 |
| SVG clip text | SVG clipPath | Video/image through text |
| Scramble text | ScrambleText class | Cyberpunk effect |
| SVG path reveal | GSAP DrawSVG | FREE since 2024 |
| SVG morph | GSAP MorphSVG | FREE since 2024 |
| Page transitions React | Framer AnimatePresence mode=wait | |
| Page transitions native | View Transitions API Module 31 | Safari 18+ universal |
| Shared element morph | view-transition-name CSS | Zero JS needed |
| Tooltip positioning | CSS Anchor Positioning Module 31 | Replaces Floating UI |
| Physics UI | Rapier @react-three/rapier | |
| Interactive anim | Rive + state machines | |
| GPU compute | TSL + WebGPURenderer Module 26 | |
| In-browser AI | WebLLM + WebGPU Module 14C | Zero server cost |
| Ambient occlusion | N8AO | Cheaper than SSAO |
| Film grain | Noise pass SOFT_LIGHT | Module 24 |
| Depth of field | DepthOfField pass | Module 24 |
| Cursor particles | ParticleTrailCursor | Canvas mix-blend:screen |
| CSS noise bg | Houdini paint worklet | Module 32 |
| Multi-scene | SceneManager Module 28 | With dispose |
| Three ↔ HTML | TypedEventBus Module 29 | Pub/sub |
| iOS WebGL | Module 20 checklist | Context loss + MSAA |
| Global 3D state | Zustand subscribeWithSelector | Module 23 |

---

## COMPLETE INSTALL

```bash
# 3D Core
npm install three@^0.184.0 @types/three
npm install @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
npm install @react-three/rapier
npm install detect-gpu

# Animation (ALL FREE 2024+)
npm install gsap @gsap/react
npm install framer-motion

# CSS Framework
npm install tailwindcss@^4 @tailwindcss/postcss

# Scroll
npm install lenis

# Page Transitions
npm install @barba/core @barba/css

# Canvas / 2D
npm install pixi.js

# Motion Graphics
npm install lottie-web lottie-react
npm install @rive-app/react-canvas
npm install @splinetool/react-spline
npm install animejs

# State
npm install zustand

# Shader Tools
npm install glslify glsl-noise glsl-constants glsl-hsl2rgb glsl-blend

# In-Browser AI
npm install @mlc-ai/web-llm

# Dev Tools
npm install stats.js
npm install vite-plugin-glsl --save-dev
npm install vite-plugin-static-copy --save-dev

# Asset CLI
npm install -g @gltf-transform/cli sharp-cli
```

---

## MODULE 1 — DESIGN TOKENS (tokens.css)

```css
:root {
  /* Backgrounds */
  --bg-base:     #050507;
  --bg-surface:  #0a0a0f;
  --bg-elevated: #111118;
  --bg-overlay:  #1a1a24;

  /* Brand */
  --color-lime:     #c8ff00;
  --color-lime-dim: rgba(200,255,0,0.6);
  --color-lime-glow:rgba(200,255,0,0.12);
  --color-white:    #f4f4f0;
  --color-white-80: rgba(244,244,240,.80);
  --color-white-60: rgba(244,244,240,.60);
  --color-white-30: rgba(244,244,240,.30);
  --color-white-10: rgba(244,244,240,.10);
  --color-white-05: rgba(244,244,240,.05);

  /* Accents */
  --accent-primary:   #c8ff00;
  --accent-secondary: #7b61ff;
  --accent-tertiary:  #ff3d6b;

  /* Typography */
  --font-display: 'Clash Display','Space Grotesk',system-ui,sans-serif;
  --font-body:    'Inter','DM Sans',system-ui,sans-serif;
  --font-mono:    'JetBrains Mono','Fira Code',monospace;

  /* Fluid Type */
  --text-hero:    clamp(4rem,10vw,10rem);
  --text-display: clamp(2.5rem,6vw,6rem);
  --text-heading: clamp(1.75rem,3vw,3rem);
  --text-subhead: clamp(1.1rem,2vw,1.5rem);
  --text-body:    clamp(0.875rem,1.2vw,1.0625rem);
  --text-small:   0.8125rem;
  --text-label:   0.6875rem;

  /* Spacing */
  --space-section: clamp(6rem,12vw,14rem);
  --space-block:   clamp(3rem,5vw,6rem);

  /* Borders */
  --border-subtle:  1px solid rgba(244,244,240,.06);
  --border-default: 1px solid rgba(244,244,240,.12);
  --border-strong:  1px solid rgba(244,244,240,.24);
  --border-accent:  1px solid var(--color-lime);

  /* Motion */
  --ease-out-expo:  cubic-bezier(0.16,1,0.3,1);
  --ease-in-expo:   cubic-bezier(0.7,0,0.84,0);
  --ease-inout:     cubic-bezier(0.83,0,0.17,1);
  --ease-spring:    cubic-bezier(0.34,1.56,0.64,1);
  --dur-fast:  200ms;
  --dur-base:  400ms;
  --dur-slow:  700ms;
  --dur-xslow: 1200ms;
}
```

## globals.css

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* Scrollbar */
::-webkit-scrollbar{width:2px;background:var(--bg-base)}
::-webkit-scrollbar-thumb{background:var(--color-lime);border-radius:1px}

/* Selection */
::selection{background:var(--color-lime);color:var(--bg-base)}

/* Focus */
:focus-visible{outline:2px solid var(--color-lime);outline-offset:4px;border-radius:2px}

/* Custom cursor */
html,*{cursor:none !important}

body{
  background:var(--bg-base);
  color:var(--color-white);
  font-family:var(--font-body);
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}

/* Reduced motion */
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:0.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:0.01ms !important;
  }
}

.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}

/* Tailwind v4 theme */
@theme {
  --color-lime: #c8ff00;
  --color-bg: #050507;
  --font-display: 'Clash Display', system-ui;
}
```

---

## MODULE 2 — THREE.JS R184+

```tsx
// r184 MANDATORY — critical memory leak fix in earlier versions
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF, MeshTransmissionMaterial, MeshReflectorMaterial } from '@react-three/drei'

// Canvas setup
<Canvas
  camera={{ position:[0,0,5], fov:45 }}
  gl={{ antialias:true, alpha:true, powerPreference:'high-performance' }}
  dpr={[1,2]}
  shadows
>

// Crystal material
<MeshTransmissionMaterial
  samples={16} resolution={512}
  transmission={1} thickness={0.5}
  roughness={0.05} ior={1.5}
  chromaticAberration={0.06}
  backside={true}
/>

// Mirror floor
<MeshReflectorMaterial
  blur={[300,100]} resolution={2048}
  mixBlur={1} mixStrength={40}
  roughness={0.8} depthScale={1.2}
  color="#050507" metalness={0.5}
/>

// Animation loop
function AnimatedMesh() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.3
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2
    // Mouse parallax
    ref.current.rotation.x += (pointer.y * 0.1 - ref.current.rotation.x) * 0.05
  })
  return <mesh ref={ref} />
}

// CRITICAL: Memory disposal
useEffect(() => () => {
  scene.traverse((obj: any) => {
    obj.geometry?.dispose()
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
    mats.forEach((m: any) => m?.dispose())
  })
}, [scene])
```

---

## MODULE 3 — GLSL SHADERS

```glsl
/* Plasma background — fragment */
uniform float uTime;
varying vec2 vUv;

vec3 palette(float t) {
  return vec3(0.5)+vec3(0.5)*cos(6.28318*(vec3(1.0)*t+vec3(0.78,1.0,0.0)));
}

void main() {
  vec2 uv = (vUv - 0.5) * 2.0;
  vec2 uv0 = uv;
  vec3 col = vec3(0.0);
  for(float i=0.0;i<3.0;i++){
    uv = fract(uv * 1.5) - 0.5;
    float d = length(uv)*exp(-length(uv0));
    vec3 c = palette(length(uv0)+i*0.4+uTime*0.2);
    d = sin(d*8.0+uTime)/8.0;
    d = abs(d);
    d = pow(0.01/d,1.2);
    col += c*d;
  }
  gl_FragColor = vec4(col*0.07,1.0); /* subtle */
}
```

---

## MODULE 4 — GSAP (ALL FREE 2024+)

```typescript
// lib/gsap.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVG } from 'gsap/DrawSVG'
import { MorphSVG } from 'gsap/MorphSVG'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger,SplitText,DrawSVG,MorphSVG,Flip,CustomEase,MotionPathPlugin)
CustomEase.create('danverse','0.16,1,0.3,1')
CustomEase.create('danverse-in','0.7,0,0.84,0')

export { gsap, ScrollTrigger, SplitText, Flip, DrawSVG }
```

```typescript
// SplitText — GSAP 3.13 mask (no overflow:hidden wrapper needed)
const split = new SplitText('.hero-headline',{type:'chars,words',mask:'chars'})
gsap.from(split.chars,{
  yPercent:110, opacity:0, duration:0.9,
  ease:'danverse', stagger:{amount:0.4,from:'start'}
})
// Cleanup: split.revert()

// ScrollTrigger cinematic reveal
gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
  gsap.fromTo(section.querySelectorAll('[data-animate]'),
    { opacity:0, y:60, filter:'blur(8px)' },
    { opacity:1, y:0, filter:'blur(0px)', duration:1, ease:'danverse', stagger:0.08,
      scrollTrigger:{ trigger:section, start:'top 75%', toggleActions:'play none none reverse' }
    }
  )
})

// Horizontal scroll
gsap.to('.track',{
  x: -(track.scrollWidth - window.innerWidth),
  ease:'none',
  scrollTrigger:{
    trigger:'.container', start:'top top',
    end:`+=${track.scrollWidth - window.innerWidth}`,
    pin:true, scrub:1.5, anticipatePin:1
  }
})
```

---

## MODULE 5 — FRAMER MOTION

```typescript
export const ease = {
  outExpo:    [0.16,1,0.3,1] as const,
  outQuart:   [0.25,1,0.5,1] as const,
  inOutQuart: [0.76,0,0.24,1] as const,
  spring:     {type:'spring',stiffness:300,damping:30} as const,
}

// Scroll parallax
const { scrollYProgress } = useScroll({target:sectionRef,offset:['start end','end start']})
const y = useTransform(scrollYProgress,[0,1],['0%','-20%'])
const opacity = useTransform(scrollYProgress,[0,0.2,0.8,1],[0,1,1,0])

// Velocity-based skew
const { scrollY } = useScroll()
const velocity = useVelocity(scrollY)
const skewX = useTransform(velocity,[-2000,0,2000],[-8,0,8])
const smoothSkew = useSpring(skewX,{stiffness:400,damping:90})

// Stagger variants
const container = {
  hidden:{},
  show:{transition:{staggerChildren:0.08,delayChildren:0.15}},
}
const item = {
  hidden:{opacity:0,y:24},
  show:{opacity:1,y:0,transition:{duration:0.6,ease:[0.16,1,0.3,1]}},
}

// Page transitions
<AnimatePresence mode="wait">
  <motion.div key={pathname}
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0,transition:{duration:0.5,ease:[0.16,1,0.3,1]}}}
    exit={{opacity:0,y:-20,transition:{duration:0.3}}}
  />
</AnimatePresence>

// Layout (Magic Move)
<motion.div layoutId="project-card-01" /> // Same ID = FLIP morph
```

---

## MODULE 6 — LENIS SMOOTH SCROLL

```typescript
// lib/lenis.ts
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from './gsap'

let lenis: Lenis | null = null

export function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => { lenis?.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroyLenis() { lenis?.destroy(); lenis = null }
```

---

## MODULE 14 — WEBGPU + TSL (SAFARI 26+ UNIVERSAL)

```typescript
// Safari 26 = WebGPU universal across ALL major browsers
import * as THREE from 'three/webgpu'
import { WebGPURenderer } from 'three/webgpu'

const renderer = new WebGPURenderer({ antialias:true })
await renderer.init() // required

// Fallback
if (!navigator.gpu) { /* use standard WebGL renderer */ }

// TSL shader (works WebGL AND WebGPU)
import { vec3, sin, cos, uv, time, color } from 'three/tsl'
const shader = vec3(
  sin(uv().x.mul(10).add(time)),
  cos(uv().y.mul(8).add(time.mul(1.3))),
  0.5
).mul(color('#c8ff00'))
```

---

## MODULE 15 — CUSTOM CURSOR

```tsx
'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Mode = 'default'|'hover'|'view'|'drag'|'text'
const sizes: Record<Mode,number> = {default:40,hover:56,view:72,drag:64,text:4}

export function CursorSystem() {
  const [mode,setMode] = useState<Mode>('default')
  const [label,setLabel] = useState('')
  const cx = useMotionValue(-100), cy = useMotionValue(-100)
  const rx = useSpring(cx,{stiffness:150,damping:20})
  const ry = useSpring(cy,{stiffness:150,damping:20})

  useEffect(() => {
    const move = (e:MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY) }
    const enter = (e:MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement|null
      if(el){ setMode((el.dataset.cursor as Mode)||'hover'); setLabel(el.dataset.cursorLabel||'') }
    }
    const leave = (e:MouseEvent) => {
      if((e.target as HTMLElement).closest('[data-cursor]')){ setMode('default'); setLabel('') }
    }
    window.addEventListener('mousemove',move,{passive:true})
    document.addEventListener('mouseenter',enter,true)
    document.addEventListener('mouseleave',leave,true)
    return () => {
      window.removeEventListener('mousemove',move)
      document.removeEventListener('mouseenter',enter,true)
      document.removeEventListener('mouseleave',leave,true)
    }
  },[])

  return (<>
    <motion.div style={{x:cx,y:cy}} className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
      <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-lime]"/>
    </motion.div>
    <motion.div
      style={{x:rx,y:ry,width:sizes[mode],height:sizes[mode],translateX:'-50%',translateY:'-50%'}}
      transition={{duration:0.2,ease:[0.16,1,0.3,1]}}
      className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[--color-lime]/50 flex items-center justify-center"
    >
      {label && <span className="text-[9px] font-mono tracking-widest text-[--color-lime] uppercase">{label}</span>}
    </motion.div>
  </>)
}
// Usage: data-cursor="hover" | data-cursor="view" data-cursor-label="VIEW"
```

---

## MODULE 17 — TAILWIND V4 (CSS-FIRST)

```css
/* NO tailwind.config.js in v4 — configure in CSS */
@import "tailwindcss";

@theme {
  --color-lime: #c8ff00;
  --color-bg-base: #050507;
  --color-bg-surface: #0a0a0f;
  --color-accent: #7b61ff;
  --font-display: 'Clash Display', system-ui;
  --font-body: 'Inter', system-ui;
  --font-mono: 'JetBrains Mono', monospace;
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --animate-fade-up: fadeUp 0.6s var(--ease-expo) both;
  --animate-blur-in: blurIn 0.7s var(--ease-expo) both;
}

@keyframes fadeUp {
  from{opacity:0;transform:translateY(24px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes blurIn {
  from{opacity:0;filter:blur(8px);transform:scale(1.02)}
  to{opacity:1;filter:blur(0);transform:scale(1)}
}
```

---

## MODULE 18 — PRELOADER

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to({val:0},{
        val:100, duration:2.2, ease:'power2.inOut',
        onUpdate:function(){ setCount(Math.round(this.targets()[0].val)) },
      })
      .to(containerRef.current,{opacity:0,duration:0.05},'-=0.05')
      .to(containerRef.current,{opacity:1,duration:0.05})
      .to([topRef.current,bottomRef.current],{
        yPercent:(i)=>i===0?-100:100,
        duration:0.9, ease:'expo.inOut', stagger:0,
        onComplete,
      },'+=0.1')
    })
    return () => ctx.revert()
  },[])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] select-none">
      <div ref={topRef} className="absolute top-0 left-0 w-full h-1/2 bg-[--bg-base] flex items-end justify-center pb-8">
        <span className="text-[--color-lime] font-display text-sm tracking-[0.3em] uppercase">DANVERSE</span>
      </div>
      <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[--bg-base] flex items-start justify-end pt-8 pr-12">
        <span className="text-[--color-white-30] font-mono text-8xl font-light tabular-nums leading-none">
          {String(count).padStart(2,'0')}
        </span>
      </div>
    </div>
  )
}
```

---

## MODULE 19 — GPU QUALITY TIERS

```typescript
import { getGPUTier } from 'detect-gpu'
export type QualityTier = 'low'|'mid'|'high'|'ultra'

export async function detectQuality(): Promise<QualityTier> {
  try {
    const gpu = await getGPUTier()
    if(gpu.tier===0) return 'low'   // No WebGL / blocked
    if(gpu.tier===1) return 'mid'   // Mobile GPU
    if(gpu.tier===2) return 'high'  // Desktop integrated
    return 'ultra'                   // Dedicated GPU
  } catch { return 'mid' }
}
// low   → CSS gradient only
// mid   → Simple Three.js, no post-FX
// high  → Shader + basic post-FX
// ultra → WebGPU + particles + full post-FX
```

---

## MODULE 20 — IOS SAFARI WEBGL FIXES

```typescript
// 1. Power preference
<Canvas gl={{powerPreference:'low-power'}} dpr={[1,2]}>

// 2. Context loss
canvas.addEventListener('webglcontextlost',(e)=>{
  e.preventDefault()
  setTimeout(()=>renderer.forceContextRestore(),1000)
})

// 3. Disable MSAA on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
<Canvas gl={{antialias:!isMobile}}>

// 4. Max texture: 4096 on iOS — never exceed
// 5. Use HalfFloatType for FBO on older iOS
```

---

## MODULE 21 — ACCESSIBILITY

```typescript
export function useReducedMotion() {
  if(typeof window==='undefined') return false
  return window.matchMedia('(prefers-reduced-motion:reduce)').matches
}

// Apply to GSAP
const reduced = useReducedMotion()
gsap.defaults({ duration:reduced?0:1, ease:reduced?'none':'danverse' })

// Canvas ARIA
<div role="img" aria-label="Decorative animated background">
  <Canvas />
</div>

// Skip link
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[--color-lime] focus:text-[--bg-base]">
  Skip to content
</a>
```

---

## MODULE 22 — ERROR BOUNDARY + FALLBACK

```tsx
'use client'
import { Component, type ReactNode } from 'react'

export class WebGLErrorBoundary extends Component<
  {children:ReactNode;fallback?:ReactNode},
  {hasError:boolean}
> {
  state = {hasError:false}
  static getDerivedStateFromError(){return{hasError:true}}
  render(){
    if(this.state.hasError)
      return this.props.fallback || (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,255,0,0.04),transparent_60%),radial-gradient(ellipse_at_70%_50%,rgba(123,97,255,0.04),transparent_60%)]"/>
      )
    return this.props.children
  }
}
```

---

## MODULE 23 — ZUSTAND FOR 3D STATE

```typescript
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface SceneStore {
  quality: 'low'|'mid'|'high'|'ultra'
  activeProject: string|null
  scrollProgress: number
  setQuality:(q:SceneStore['quality'])=>void
  setActiveProject:(id:string|null)=>void
  setScrollProgress:(p:number)=>void
}

export const useSceneStore = create<SceneStore>()(
  subscribeWithSelector((set) => ({
    quality:'high', activeProject:null, scrollProgress:0,
    setQuality:(quality)=>set({quality}),
    setActiveProject:(activeProject)=>set({activeProject}),
    setScrollProgress:(scrollProgress)=>set({scrollProgress}),
  }))
)

// Selective subscription (no re-render unless value changes)
const activeProject = useSceneStore(s=>s.activeProject)

// Subscribe in Three.js (outside React)
useSceneStore.subscribe(
  s=>s.scrollProgress,
  (p)=>{ camera.position.z = 5 + p * 2 }
)
```

---

## MODULE 24 — POST-PROCESSING

```tsx
import { EffectComposer,N8AO,Bloom,DepthOfField,Noise,Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

<EffectComposer multisampling={8}>
  <N8AO aoRadius={0.5} intensity={1} distanceFalloff={1}/>
  <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.025} mipmapBlur/>
  <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2}/>
  <Noise opacity={0.035} blendFunction={BlendFunction.SOFT_LIGHT}/>
  <Vignette offset={0.1} darkness={0.6}/>
</EffectComposer>
```

---

## MODULE 27 — GPU PARTICLES (FBO)

```glsl
/* Position simulation — fragment shader */
uniform sampler2D uPositions;
uniform float uTime;
uniform float uDelta;
varying vec2 vUv;

// Simplified curl noise
vec3 curlNoise(vec3 p) {
  float e = 0.1;
  float n1 = sin(p.y+uTime)*cos(p.z);
  float n2 = sin(p.z+uTime)*cos(p.x);
  float n3 = sin(p.x+uTime)*cos(p.y);
  return vec3(n2-n3, n3-n1, n1-n2) * 0.5;
}

void main(){
  vec4 pos = texture2D(uPositions,vUv);
  vec3 vel = curlNoise(pos.xyz) * 0.8;
  pos.xyz += vel * uDelta;
  if(length(pos.xyz)>3.0) pos.xyz *= 0.1; // reset
  gl_FragColor = pos;
}
```

---

## MODULE 30 — KINETIC TYPOGRAPHY

```typescript
// Scramble text
class ScrambleText {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
  animate(el:HTMLElement,final:string,duration=1000){
    const start = performance.now()
    const tick = () => {
      const p = Math.min((performance.now()-start)/duration,1)
      const revealed = Math.floor(p*final.length)
      el.textContent = final.slice(0,revealed) +
        Array.from({length:final.length-revealed},
          ()=>this.chars[Math.floor(Math.random()*this.chars.length)]
        ).join('')
      if(p<1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
}

// Variable font animation
gsap.to('.variable-text',{
  fontVariationSettings:'"wght" 800,"wdth" 125',
  duration:0.4, ease:'power2.out',
})
```

---

## MODULE 31 — MODERN CSS 2026

```css
/* View Transitions API */
.project-card{view-transition-name:var(--card-id)}
::view-transition-old(root){animation:300ms ease both fade-out}
::view-transition-new(root){animation:500ms var(--ease-out-expo) both fade-up}
```

```typescript
// Trigger
document.startViewTransition(()=>router.push(`/work/${id}`))
```

```css
/* CSS Scroll-Driven — NO JavaScript */
.section-element{
  animation:fadeInUp linear both;
  animation-timeline:view();
  animation-range:entry 0% entry 30%;
}
.parallax{
  animation:parallax linear;
  animation-timeline:scroll();
}
@keyframes parallax{from{transform:translateY(0)}to{transform:translateY(-200px)}}

/* CSS Anchor Positioning */
.trigger{anchor-name:--trigger}
.tooltip{
  position-anchor:--trigger;
  position:absolute;
  top:anchor(--trigger top);
  left:anchor(--trigger center);
  translate:-50% calc(-100% - 8px);
}

/* :has() */
.card:has(.checkbox:checked){background:var(--color-lime-glow)}
.nav:has([data-menu-open]){backdrop-filter:blur(20px)}
```

---

## MODULE 32 — CSS HOUDINI

```javascript
// public/paint-worklet.js
registerPaint('noise-bg',class{
  paint(ctx,size){
    for(let x=0;x<size.width;x+=2)
      for(let y=0;y<size.height;y+=2){
        ctx.fillStyle=`rgba(200,255,0,${Math.random()*0.06})`
        ctx.fillRect(x,y,2,2)
      }
  }
})
```

```typescript
if('paintWorklet' in CSS) CSS.paintWorklet.addModule('/paint-worklet.js')
```

```css
.noise-bg{background:paint(noise-bg)}
```

---

## MODULE 33 — PARTICLE TRAIL CURSOR

```tsx
'use client'
import { useEffect, useRef } from 'react'

export function ParticleTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    type P = {x:number;y:number;size:number;alpha:number;color:string}
    let particles: P[] = []
    const colors = ['#c8ff00','#7b61ff','#ff3d6b']

    const onMove = (e:MouseEvent) => {
      for(let i=0;i<2;i++) particles.push({
        x:e.clientX+(Math.random()-.5)*8,
        y:e.clientY+(Math.random()-.5)*8,
        size:Math.random()*4+2, alpha:0.8,
        color:colors[Math.floor(Math.random()*colors.length)],
      })
    }

    let raf: number
    const tick = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles = particles.filter(p=>p.alpha>0.01).map(p=>{
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
        ctx.fillStyle=p.color
        ctx.globalAlpha=p.alpha
        ctx.fill()
        return{...p,alpha:p.alpha*0.9,size:p.size*0.97}
      })
      ctx.globalAlpha=1
      raf=requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove',onMove,{passive:true})
    raf=requestAnimationFrame(tick)
    return()=>{ window.removeEventListener('mousemove',onMove); cancelAnimationFrame(raf) }
  },[])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9996]" style={{mixBlendMode:'screen'}}/>
}
```

---

## MODULE 35 — VITE CONFIG

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins:[
    react(),
    glsl({compress:true}), // GLSL HMR
    viteStaticCopy({targets:[{src:'src/assets/models',dest:'models'}]}),
  ],
  build:{
    rollupOptions:{
      output:{
        manualChunks:{
          'three':['three'],
          'r3f':['@react-three/fiber','@react-three/drei'],
          'gsap':['gsap'],
          'framer':['framer-motion'],
        }
      }
    }
  },
  worker:{format:'es'},
})
```

---

## NEXT.JS 15 — APP ROUTER RULES

```typescript
// Server (default) = no hooks, direct DB, faster
// Client ('use client') = hooks, events, browser APIs
// RULE: Push 'use client' as far DOWN the tree as possible

// Three.js ALWAYS needs dynamic import (no SSR)
import dynamic from 'next/dynamic'
const HeroCanvas = dynamic(()=>import('@/components/canvas/HeroCanvas'),{ssr:false,loading:()=>null})

// Parallel data fetching (not waterfall)
const [projects,stats] = await Promise.all([fetchProjects(),fetchStats()])

// Streaming
<Suspense fallback={<Skeleton/>}>
  <SlowComponent/> {/* fetches own data */}
</Suspense>

// Metadata
export const metadata = {
  title:'DANVERSE — Creative Director',
  description:'Brand Identity · Motion Design · Visual Systems',
  openGraph:{title:'DANVERSE',images:[{url:'/og.jpg',width:1200,height:630}]},
}
```

---

## TYPESCRIPT STRICT

```typescript
// tsconfig: strict+noUncheckedIndexedAccess+exactOptionalPropertyTypes

// Branded IDs
type ProjectId = string & {readonly _brand:'ProjectId'}

// Discriminated union
type AsyncState<T> =
  |{status:'idle'}
  |{status:'loading'}
  |{status:'success';data:T}
  |{status:'error';message:string}

// Exhaustive switch
function render<T>(s:AsyncState<T>) {
  switch(s.status){
    case 'idle': return null
    case 'loading': return <Spinner/>
    case 'success': return <View data={s.data}/>
    case 'error': return <Error msg={s.message}/>
    default: const _:never=s; return null // compile error if case missing
  }
}

// Type guard
function isProject(v:unknown):v is Project {
  return typeof v==='object'&&v!==null&&'id' in v&&'title' in v
}
```

---

## FILM GRAIN (CSS — Zero Cost)

```tsx
export function FilmGrain({opacity=0.035}:{opacity?:number}) {
  return (
    <div aria-hidden="true" style={{
      position:'fixed',inset:0,zIndex:9997,
      pointerEvents:'none',mixBlendMode:'overlay',opacity,
      backgroundImage:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      backgroundRepeat:'repeat',
    }}/>
  )
}
```

---

## MAGNETIC BUTTON

```tsx
'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticButton({children,className,strength=0.3,...props}:
  React.ButtonHTMLAttributes<HTMLButtonElement>&{strength?:number}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x,{stiffness:300,damping:20})
  const sy = useSpring(y,{stiffness:300,damping:20})
  return (
    <motion.button ref={ref} style={{x:sx,y:sy}}
      onMouseMove={(e)=>{
        if(!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX-r.left-r.width/2)*strength)
        y.set((e.clientY-r.top-r.height/2)*strength)
      }}
      onMouseLeave={()=>{x.set(0);y.set(0)}}
      className={className} {...props}
    >{children}</motion.button>
  )
}
```

---

## MARQUEE

```tsx
'use client'
import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

const ITEMS=['BRAND IDENTITY','MOTION DESIGN','ART DIRECTION','VISUAL SYSTEMS','TYPOGRAPHY','UI/UX']

function Row({direction=1,speed=40}:{direction?:1|-1;speed?:number}){
  const x=useMotionValue(0), base=useRef(0), paused=useRef(false)
  useAnimationFrame((_,delta)=>{
    if(!paused.current){ base.current+=direction*speed*(delta/1000); x.set(base.current%(180*ITEMS.length)) }
  })
  return (
    <div onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}} className="overflow-hidden">
      <motion.div style={{x}} className="flex whitespace-nowrap">
        {[...ITEMS,...ITEMS,...ITEMS].map((item,i)=>(
          <span key={i} className="inline-flex items-center gap-8 px-8 font-display text-[clamp(2rem,4vw,4rem)] font-light text-[--color-white-10] hover:text-[--color-white-30] transition-colors duration-500 tracking-tight">
            {item}<span className="text-[--color-lime] opacity-60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function MarqueeReel(){
  return(
    <section className="py-16 border-y border-[--border-subtle] overflow-hidden space-y-4">
      <Row direction={1} speed={30}/><Row direction={-1} speed={40}/>
    </section>
  )
}
```

---

## STATE MANAGEMENT DECISION TREE

```
Single component only?           → useState / useReducer
Server/async data (API calls)?   → TanStack Query
Truly global (auth, theme)?      → Zustand
3D scene / canvas state?         → Zustand + subscribeWithSelector
Fine-grained reactive atoms?     → Jotai
Complex shared + team knows RTK? → Redux Toolkit
NEVER: Redux without Toolkit
```

---

## REACT ARCHITECTURE RULES

```
components/ui/        → Primitives (Button, Input) — zero business logic
components/sections/  → Page sections — can have state
components/canvas/    → Three.js / WebGL — always 'use client' + dynamic import
components/cursor/    → Cursor system
components/nav/       → Navigation
lib/                  → gsap.ts, lenis.ts, motion.ts, store.ts
content/              → projects.ts, about.ts (data/types)
app/                  → Next.js pages
```

---

## QUALITY CHECKLIST (MANDATORY)

### Per Component
- [ ] TypeScript: `npx tsc --noEmit` zero errors
- [ ] Responsive: 375 / 768 / 1280 / 1920px tested
- [ ] Reduced motion: applied to all animations
- [ ] `data-cursor` on all interactive elements
- [ ] `data-animate` on all scroll-triggered elements
- [ ] `data-section` on all sections
- [ ] Three.js: `dynamic({ssr:false})` import
- [ ] Canvas: wrapped in `WebGLErrorBoundary`
- [ ] Three.js: memory disposal on unmount

### Build Gate
- [ ] `npm run build` — zero errors, zero warnings
- [ ] Three.js chunk < 500KB gzipped
- [ ] LCP < 2.5s (Lighthouse mobile)
- [ ] CLS < 0.1

### Awwwards Bar
- Does the hero stop you immediately? ✓
- Does scroll feel like cinema, not a website? ✓
- Does the cursor feel alive? ✓
- Is the typography commanding? ✓
- Are transitions earned, not decorative? ✓
- Would lusion.co approve? ✓

This is DANVERSE. The standard is Awwwards.
