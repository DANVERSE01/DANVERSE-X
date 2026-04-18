# webgpu-tsl

## Purpose
Patterns for WebGPU-first rendering with TSL node workflows.

## Core import
- Import WebGPU-compatible Three namespace:
- `import * as THREE from "three/webgpu"`

## Renderer fallback chain
- Try `WebGPURenderer` first when WebGPU is supported.
- If unavailable, fall back to `WebGLRenderer`.
- Keep scene/camera lifecycle shared across both renderers.

## Capability check
- Detect support with `navigator.gpu`.
- Route unsupported environments to the WebGL fallback path.

## TSL node primitives
- Use `uniform()` for external runtime values.
- Use `attribute()` for geometry-fed per-vertex values.
- Use `texture()` for sampled texture inputs.
- Use `vec4()` for explicit typed vector construction.
- Use `Fn()` to build reusable node functions.

## GPU compute
- Model compute passes with `ComputeNode`.
- Store simulation state in `StorageBufferAttribute`.
- Use compute output buffers directly in render-stage nodes.

## Browser support note
- Treat Safari 26+ as universal WebGPU-capable target baseline.
- Preserve fallback behavior for older Safari and constrained devices.

