"use client"

import { useEffect, useRef } from "react"

interface PlasmaProps {
  colorStops?: [string, string, string]
  speed?: number
  amplitude?: number
  blend?: number
}

export default function Plasma({
  colorStops = ["#ef4444", "#f97316", "#fbbf24"],
  speed = 1.0,
  amplitude = 1.0,
  blend = 0.6,
}: PlasmaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    })
    if (!gl) return

    // Convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [
            Number.parseInt(result[1], 16) / 255,
            Number.parseInt(result[2], 16) / 255,
            Number.parseInt(result[3], 16) / 255,
          ]
        : [1, 0, 0]
    }

    const colors = colorStops.map(hexToRgb)

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader - Aurora effect
    const fragmentShaderSource = `
      precision highp float;

      uniform float u_time;
      uniform float u_amplitude;
      uniform float u_blend;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec2 u_resolution;

      varying vec2 v_uv;

      // Simplex noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amp * snoise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float time = u_time * 0.5;

        // Create flowing aurora waves
        float wave1 = sin(p.x * 2.0 + time * 1.2) * 0.5;
        float wave2 = sin(p.x * 3.0 - time * 0.8 + 1.5) * 0.3;
        float wave3 = sin(p.x * 1.5 + time * 1.5 + 3.0) * 0.4;

        // Combine waves with amplitude
        float aurora = (wave1 + wave2 + wave3) * u_amplitude;

        // Calculate distance from aurora center
        float dist = abs(p.y - aurora * 0.3);

        // Create soft glow falloff
        float glow = exp(-dist * 3.0);
        glow = pow(glow, 1.5);

        // Add noise for organic feel
        float n = fbm(p * 3.0 + time * 0.3);
        glow *= 0.8 + 0.4 * n;

        // Color gradient based on position and time
        float colorMix1 = sin(p.x * 2.0 + time) * 0.5 + 0.5;
        float colorMix2 = sin(p.x * 1.5 - time * 0.7 + 2.0) * 0.5 + 0.5;

        vec3 color = mix(u_color1, u_color2, colorMix1);
        color = mix(color, u_color3, colorMix2 * 0.5);

        // Add vertical color variation
        float verticalGradient = smoothstep(-1.0, 1.0, p.y);
        color = mix(color, u_color3, verticalGradient * 0.3);

        // Secondary aurora layer
        float wave4 = sin(p.x * 4.0 + time * 2.0) * 0.2;
        float aurora2 = p.y - wave4 - 0.5;
        float glow2 = exp(-abs(aurora2) * 4.0) * 0.5;

        // Combine layers
        float finalGlow = glow + glow2;
        finalGlow = clamp(finalGlow, 0.0, 1.0);

        // Add subtle sparkle using noise
        float sparkle = snoise(p * 50.0 + time * 5.0);
        sparkle = pow(max(sparkle, 0.0), 10.0) * 0.3;

        vec3 finalColor = color * finalGlow + vec3(1.0) * sparkle * finalGlow;

        // Apply blend factor
        float alpha = finalGlow * u_blend;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `

    // Compile shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    // Create fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    // Get locations
    const positionLocation = gl.getAttribLocation(program, "a_position")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const amplitudeLocation = gl.getUniformLocation(program, "u_amplitude")
    const blendLocation = gl.getUniformLocation(program, "u_blend")
    const color1Location = gl.getUniformLocation(program, "u_color1")
    const color2Location = gl.getUniformLocation(program, "u_color2")
    const color3Location = gl.getUniformLocation(program, "u_color3")
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")

    // Enable blending
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Activate program
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    const bindProgram = gl.useProgram.bind(gl)
    bindProgram(program)

    let animationId: number
    const startTime = performance.now()
    let lastTime = 0
    const fps = 30
    const interval = 1000 / fps
    let isVisible = true

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = (now: number) => {
      animationId = requestAnimationFrame(render)

      if (!isVisible || document.visibilityState === "hidden") return

      const delta = now - lastTime
      if (delta < interval) return
      lastTime = now - (delta % interval)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const elapsed = (now - startTime) / 1000

      gl.uniform1f(timeLocation, elapsed * speed)
      gl.uniform1f(amplitudeLocation, amplitude)
      gl.uniform1f(blendLocation, blend)
      gl.uniform3f(color1Location, colors[0][0], colors[0][1], colors[0][2])
      gl.uniform3f(color2Location, colors[1][0], colors[1][1], colors[1][2])
      gl.uniform3f(color3Location, colors[2][0], colors[2][1], colors[2][2])
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    window.addEventListener("resize", resize)
    resize()
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [colorStops, speed, amplitude, blend])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )
}
