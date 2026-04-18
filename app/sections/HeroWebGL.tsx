"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"
import * as THREE from "three"

// ─── GLSL: Curl Noise Simulation Shader ───────────────────────────────────────
const SIM_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const SIM_FRAG = `
precision highp float;
uniform sampler2D uPositions;
uniform float uTime;
uniform float uDelta;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 curl(vec3 p) {
  float eps = 0.01;
  float n1, n2;
  vec3 curl;
  n1 = snoise(vec3(p.x, p.y + eps, p.z));
  n2 = snoise(vec3(p.x, p.y - eps, p.z));
  curl.x = (n1 - n2) / (2.0 * eps);
  n1 = snoise(vec3(p.x, p.y, p.z + eps));
  n2 = snoise(vec3(p.x, p.y, p.z - eps));
  curl.y = (n1 - n2) / (2.0 * eps);
  n1 = snoise(vec3(p.x + eps, p.y, p.z));
  n2 = snoise(vec3(p.x - eps, p.y, p.z));
  curl.z = (n1 - n2) / (2.0 * eps);
  return curl;
}

void main() {
  vec4 pos = texture2D(uPositions, vUv);
  vec3 p = pos.xyz;
  vec3 vel = curl(p * 0.4 + uTime * 0.08) * 0.012;
  p += vel;
  // Soft boundary reset
  float d = length(p);
  if (d > 2.8) p = normalize(p) * (0.5 + fract(d * 0.3));
  gl_FragColor = vec4(p, 1.0);
}
`

const POINTS_VERT = `
precision highp float;
uniform sampler2D uPositions;
uniform float uSize;
attribute vec2 aRef;
varying float vLife;

void main() {
  vec3 pos = texture2D(uPositions, aRef).xyz;
  vLife = length(pos) / 2.8;
  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * (1.0 / -mvPos.z) * (1.0 - vLife * 0.5);
  gl_Position = projectionMatrix * mvPos;
}
`

const POINTS_FRAG = `
precision highp float;
varying float vLife;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float alpha = (1.0 - d * 2.0) * 0.35 * (0.5 + vLife * 0.5);
  // Mineral tint: #7b5136
  gl_FragColor = vec4(0.784, 1.0, 0.0, alpha);
}
`

// ─── FBO Particles Scene ──────────────────────────────────────────────────────
const PARTICLE_COUNT = 128

function FBOParticles({ count = PARTICLE_COUNT }: { count?: number }) {
  const gl = useThree((s) => s.gl)
  const simScene = useMemo(() => new THREE.Scene(), [])
  const simCam = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), [])

  const target0 = useFBO(count, count, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false,
  })
  const target1 = useFBO(count, count, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false,
  })

  const pingPong = useRef({ read: target0, write: target1 })

  const initTexture = useMemo(() => {
    const data = new Float32Array(count * count * 4)
    for (let i = 0; i < count * count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.8 + Math.random() * 1.6
      data[i * 4] = r * Math.sin(phi) * Math.cos(theta)
      data[i * 4 + 1] = r * Math.sin(phi) * Math.sin(theta)
      data[i * 4 + 2] = r * Math.cos(phi)
      data[i * 4 + 3] = 1
    }
    const tex = new THREE.DataTexture(data, count, count, THREE.RGBAFormat, THREE.FloatType)
    tex.needsUpdate = true
    return tex
  }, [count])

  const simMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uPositions: { value: initTexture }, uTime: { value: 0 }, uDelta: { value: 0.016 } },
        vertexShader: SIM_VERT,
        fragmentShader: SIM_FRAG,
      }),
    [initTexture]
  )

  const simMesh = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2)
    return new THREE.Mesh(geo, simMat)
  }, [simMat])
  simScene.add(simMesh)

  const refs = useMemo(() => {
    const arr = new Float32Array(count * count * 2)
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 2
        arr[idx] = j / (count - 1)
        arr[idx + 1] = i / (count - 1)
      }
    }
    return arr
  }, [count])

  const pointsMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uPositions: { value: null }, uSize: { value: 60 } },
        vertexShader: POINTS_VERT,
        fragmentShader: POINTS_FRAG,
        transparent: true,
        depthWrite: false,
      }),
    []
  )

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * count * 3), 3))
    geo.setAttribute("aRef", new THREE.BufferAttribute(refs, 2))
    return geo
  }, [count, refs])

  const initialized = useRef(false)

  useFrame(({ clock }, delta) => {
    const { read, write } = pingPong.current

    if (!initialized.current) {
      gl.setRenderTarget(read)
      gl.render(simScene, simCam)
      initialized.current = true
    }

    simMat.uniforms.uPositions.value = read.texture
    simMat.uniforms.uTime.value = clock.elapsedTime
    simMat.uniforms.uDelta.value = delta

    gl.setRenderTarget(write)
    gl.render(simScene, simCam)
    gl.setRenderTarget(null)

    pointsMat.uniforms.uPositions.value = write.texture

    pingPong.current = { read: write, write: read }
  })

  return (
    <points geometry={pointsGeo} material={pointsMat} scale={[1.4, 1.4, 1.4]} />
  )
}

// ─── Exported Canvas wrapper ──────────────────────────────────────────────────
export default function HeroWebGL({ gpuTier }: { gpuTier: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 55 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={[1, gpuTier >= 3 ? 1.5 : 1]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <FBOParticles count={gpuTier >= 3 ? 160 : 96} />
      </Suspense>
    </Canvas>
  )
}
