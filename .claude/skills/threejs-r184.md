# threejs-r184

## Purpose
Production-ready Three.js r184 setup patterns for realtime scenes.

## Renderer setup
- Initialize `WebGLRenderer` with `antialias: true`.
- Set `powerPreference: "high-performance"` for discrete GPU bias.
- Cap pixel density with `Math.min(window.devicePixelRatio, 2)`.

## Environment lighting
- Use `RGBELoader` to load HDR environments.
- Process environment maps through `PMREMGenerator`.
- Assign generated env map to scene/environment and reflective materials.

## Asset pipeline
- Load GLB assets with `GLTFLoader`.
- Enable mesh compression via `DRACOLoader`.
- Enable GPU texture compression via `KTX2Loader`.

## Material defaults
- For glass-like assets, use `MeshTransmissionMaterial`.
- Set `samples: 16` for stable transmission quality.
- Set `backside: true` to improve thick-surface transmission.
- For planar reflections, use `MeshReflectorMaterial`.
- Set reflector `resolution: 2048` for high-fidelity mirrors.

## LOD strategy
- Build 3 LOD levels per heavy mesh.
- Configure `distanceThreshold` transitions to avoid popping.
- Prefer aggressive simplification on the furthest level.

## Memory and teardown
- Apply explicit `dispose()` on geometries, materials, and textures.
- Dispose render targets and post-processing buffers on unmount.
- r184 fix: call `renderer.dispose()` before forcing context loss.

