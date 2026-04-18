# postfx-pipeline

## Purpose
High-end but scalable post-processing defaults for cinematic realtime scenes.

## Composer foundation
- Configure EffectComposer in the R3F pipeline.
- Keep all passes inside a single deterministic render chain.

## AO baseline
- Use N8AO for screen-space ambient occlusion.
- Default `aoRadius: 1`.
- Default `intensity: 5`.

## Film grain
- Add grain pass with `BlendFunction.SOFT_LIGHT`.
- Set grain opacity to `0.35`.

## Depth of field
- Use DOF with `focusDistance: 0.02`.
- Set `focalLength: 0.05`.

## Stylized optics
- Add `TiltShift2` with `blur: 0.15`.
- Keep tilt-shift subtle to avoid readability loss.

## Bloom settings
- Use bloom `luminanceThreshold: 0.9`.
- Use bloom `intensity: 0.5`.

## Performance gating
- Disable all post effects below GPU tier 2.
- Keep only base render path for constrained hardware classes.

