# glsl-shaders

## Purpose
Reference patterns for advanced GLSL simulation and rendering pipelines.

## Ping-pong simulation core
- Build simulation textures with `DataTexture`.
- Use `RGBAFormat` and `FloatType` for high-precision state.
- Allocate a `WebGLRenderTarget` pair for ping-pong updates.
- Implement per-frame swap logic (`read` ↔ `write`) after each pass.

## GPU particle scale
- Use a 512×512 simulation texture for particle state.
- Total particle budget: 262,144 particles.
- Sample simulation texture in the render pass for positions/velocity.

## Flow field
- Drive particle advection with curl-noise flow fields.
- Derive curl vectors from FBM-based scalar noise fields.
- Keep time and scale uniforms exposed for art direction.

## Raymarching stack
- Compose SDF primitives: sphere, box, and torus.
- Blend/union operations should preserve smooth transitions where needed.
- Add soft shadows to stabilize depth and contact perception.

## Lighting and view response
- Use Fresnel term: `pow(1.0 - NdotV, 3.0)`.
- Combine Fresnel with environment/specular response for edge lift.

## Shader module imports
- Prefer glslify for reusable shader chunks.
- Use `glsl-noise/simplex/3d` for simplex noise sourcing.

