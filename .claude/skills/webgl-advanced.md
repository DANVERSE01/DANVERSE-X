---
name: webgl-advanced
description: Advanced WebGL and Three.js patterns for DANVERSE-X — GPU particles, FBO ping-pong, ray marching, TSL shaders, post-processing, WebGPU, and production-grade 3D scene architecture.
trigger: webgl|glsl|shader|gpu particle|fbo|ping pong|ray march|sdf|tsl|webgpu|postprocessing|fragment|vertex|uniform|three.js advanced|r3f|react three fiber
---

# Advanced WebGL — DANVERSE Production Patterns

## Architecture Rule
Always dynamic-import the entire 3D stack — never add to main bundle:
```ts
const Scene = dynamic(() => import('./scene-3d'), { ssr: false });
```

---

## GPU Particles — FBO Ping-Pong

The highest-quality particle system: positions computed on GPU, zero CPU per frame.

```glsl
/* position.frag — runs on GPU for each particle */
uniform sampler2D uPositions;    /* current positions */
uniform sampler2D uVelocities;   /* current velocities */
uniform float uTime;
uniform float uDelta;
uniform vec3 uMouse;             /* mouse world position */

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 pos = texture2D(uPositions, uv);
  vec4 vel = texture2D(uVelocities, uv);

  /* Curl noise field */
  vec3 curl = curlNoise(pos.xyz * 0.4 + uTime * 0.1);
  vel.xyz += curl * 0.002;

  /* Mouse attraction */
  vec3 toMouse = uMouse - pos.xyz;
  float dist = length(toMouse);
  if (dist < 2.0) vel.xyz += normalize(toMouse) * (1.0 - dist / 2.0) * 0.01;

  /* Damping */
  vel.xyz *= 0.99;

  pos.xyz += vel.xyz * uDelta;

  /* Boundary reset */
  if (abs(pos.x) > 5.0 || abs(pos.y) > 5.0 || abs(pos.z) > 5.0) {
    pos.xyz = (texture2D(uInitPositions, uv)).xyz;
    vel.xyz = vec3(0.0);
  }

  gl_FragColor = pos;
}
```

```ts
// FBO setup (React Three Fiber)
import { useFBO } from '@react-three/drei';

const size = 256; // 256×256 = 65,536 particles
const posA = useFBO(size, size, { type: THREE.FloatType });
const posB = useFBO(size, size, { type: THREE.FloatType });
let read = posA, write = posB;

useFrame(({ gl, clock }) => {
  // Compute new positions
  gl.setRenderTarget(write);
  gl.render(simulationScene, simCamera);

  // Render particles using computed positions
  particleMaterial.uniforms.uPositions.value = write.texture;

  // Swap buffers
  [read, write] = [write, read];
  gl.setRenderTarget(null);
});
```

---

## Ray Marching — SDF Scenes

Full-screen quad with signed distance functions for organic/impossible shapes:

```glsl
/* Full-screen ray march template */
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

/* Primitive SDFs */
float sdSphere(vec3 p, float r) { return length(p) - r; }
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

/* Smooth union */
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

/* Scene SDF */
float scene(vec3 p) {
  float t = uTime * 0.4;
  vec3 p1 = p - vec3(sin(t)*0.8, cos(t)*0.5, 0.0);
  vec3 p2 = p - vec3(cos(t)*0.8, sin(t)*0.5, 0.0);
  return smin(sdSphere(p1, 0.6), sdSphere(p2, 0.6), 0.4);
}

/* Ray march */
float march(vec3 ro, vec3 rd) {
  float d = 0.0;
  for (int i = 0; i < 96; i++) {
    float h = scene(ro + rd * d);
    if (h < 0.001 || d > 20.0) break;
    d += h;
  }
  return d;
}

/* Normal via finite difference */
vec3 normal(vec3 p) {
  float e = 0.001;
  return normalize(vec3(
    scene(p + vec3(e,0,0)) - scene(p - vec3(e,0,0)),
    scene(p + vec3(0,e,0)) - scene(p - vec3(0,e,0)),
    scene(p + vec3(0,0,e)) - scene(p - vec3(0,0,e))
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uResolution * 0.5) / uResolution.y;
  vec2 mouse = (uMouse - 0.5) * 2.0;

  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(uv, -1.5));

  float d = march(ro, rd);
  vec3 col = vec3(0.05, 0.07, 0.1); /* background */

  if (d < 20.0) {
    vec3 p = ro + rd * d;
    vec3 n = normal(p);
    vec3 light = normalize(vec3(2.0, 4.0, 3.0));

    float diff = max(dot(n, light), 0.0);
    float spec = pow(max(dot(reflect(-light, n), -rd), 0.0), 32.0);
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

    col = vec3(0.88, 0.91, 0.36) * diff /* citrus-lime brand */
        + vec3(1.0) * spec * 0.6
        + vec3(0.0, 0.65, 0.65) * fres * 0.8; /* aqua-teal brand */
  }

  gl_FragColor = vec4(col, 1.0);
}
```

---

## MeshTransmissionMaterial — Glass/Crystal

```tsx
import { MeshTransmissionMaterial } from '@react-three/drei';

<mesh>
  <torusKnotGeometry args={[1, 0.3, 200, 32]} />
  <MeshTransmissionMaterial
    samples={16}              /* ray samples — higher = better refraction */
    resolution={1024}         /* FBO size */
    thickness={0.5}           /* glass thickness */
    roughness={0.02}          /* surface roughness */
    transmission={1}          /* 0=opaque, 1=fully transparent */
    ior={1.5}                 /* index of refraction — glass=1.5 */
    chromaticAberration={0.06}
    backside={true}           /* renders backside too */
    backsideThickness={0.4}
    distortion={0.3}
    distortionScale={0.4}
    temporalDistortion={0.08}
  />
</mesh>
```

---

## Post-Processing (R3F)

```tsx
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

<EffectComposer multisampling={0}>
  {/* Bloom — for glowing elements */}
  <Bloom
    intensity={0.4}
    luminanceThreshold={0.9}
    luminanceSmoothing={0.9}
    mipmapBlur
  />

  {/* Chromatic Aberration — lens distortion */}
  <ChromaticAberration offset={[0.002, 0.002]} />

  {/* Film grain */}
  <Noise
    premultiply
    blendFunction={BlendFunction.SOFT_LIGHT}
    opacity={0.4}
  />

  {/* Depth of Field */}
  <DepthOfField
    focusDistance={0.02}
    focalLength={0.2}
    bokehScale={4}
  />

  {/* Vignette */}
  <Vignette darkness={0.4} offset={0.3} />
</EffectComposer>
```

---

## TSL (Three Shading Language) — WebGL + WebGPU Universal

TSL shaders run on both WebGL and WebGPU without changes:

```ts
import { uniform, float, vec3, sin, cos, mix, Fn } from 'three/tsl';
import { MeshStandardNodeMaterial } from 'three/webgpu';

const time = uniform(0); // updated via useFrame

const brandColor = vec3(0.88, 0.91, 0.36); // citrus-lime
const darkColor = vec3(0.02, 0.03, 0.04);  // --color-bg

const colorNode = Fn(() => {
  const wave = sin(time.mul(2.0)).add(1.0).div(2.0); // 0–1 oscillation
  return mix(darkColor, brandColor, wave);
})();

const material = new MeshStandardNodeMaterial();
material.colorNode = colorNode;

// Update in animation loop:
useFrame(({ clock }) => { time.value = clock.elapsedTime; });
```

---

## N8AO — Ambient Occlusion (Cheaper than SSAO)

```tsx
import { N8AO } from '@react-three/postprocessing';

<N8AO
  halfRes           /* half resolution — big performance saving */
  aoRadius={2}      /* AO sampling radius */
  intensity={2}     /* darkness intensity */
  aoSamples={6}     /* fewer = faster */
  denoiseSamples={4}
/>
```

---

## Detect GPU Tier (Production)

Never run full effects on low-end devices:

```ts
import { getGPUTier } from 'detect-gpu';

const tier = await getGPUTier();

const config = {
  particles: tier.tier >= 2 ? 65536 : tier.tier === 1 ? 16384 : 0,
  postprocessing: tier.tier >= 2,
  shadowMap: tier.tier >= 2 ? THREE.PCFSoftShadowMap : false,
  dpr: tier.tier >= 3 ? 2 : 1,
  bloomEnabled: tier.tier >= 2,
};
```

---

## iOS Safari WebGL Fixes

```ts
// 1. Disable MSAA on iOS (causes context loss)
const isMobile = /iPhone|iPad|iPod/.test(navigator.userAgent);

<Canvas
  gl={{
    antialias: !isMobile,          // disable on iOS
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
  }}
>

// 2. Handle context loss
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  setTimeout(() => renderer.forceContextRestore(), 1000);
});

// 3. Limit DPR on iOS
dpr={isMobile ? [1, 1.5] : [1, 2]}

// 4. Avoid FLOAT textures on iOS (use HALF_FLOAT)
type: isIOS ? THREE.HalfFloatType : THREE.FloatType
```

---

## SceneManager (Multi-Scene Pattern)

```ts
class SceneManager {
  scenes: Map<string, { scene: THREE.Scene; camera: THREE.Camera; dispose: () => void }> = new Map();

  add(key: string, scene: THREE.Scene, camera: THREE.Camera, dispose: () => void) {
    this.scenes.set(key, { scene, camera, dispose });
  }

  remove(key: string) {
    const entry = this.scenes.get(key);
    if (entry) {
      entry.dispose();
      this.scenes.delete(key);
    }
  }

  render(key: string, renderer: THREE.WebGLRenderer) {
    const entry = this.scenes.get(key);
    if (entry) renderer.render(entry.scene, entry.camera);
  }
}
```

---

## Complete Cleanup Pattern

```ts
useEffect(() => {
  // Setup
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.ShaderMaterial({ ... });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const animId = requestAnimationFrame(animate);

  return () => {
    // Always dispose — prevents GPU memory leak
    cancelAnimationFrame(animId);
    geometry.dispose();
    material.dispose();
    if (material.uniforms.uTexture?.value) {
      material.uniforms.uTexture.value.dispose();
    }
    scene.remove(mesh);
    renderer.dispose();
    renderer.forceContextLoss();
  };
}, []);
```
