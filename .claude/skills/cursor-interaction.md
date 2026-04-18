# Cursor Interaction

## MagneticCursor
- Read target geometry with `getBoundingClientRect()` on magnetic elements
- Use GSAP `quickTo` for smooth cursor and element deformation
- On leave, spring back with elastic easing

## ParticleTrailCursor
- Canvas overlay with `mix-blend-mode: screen`
- Particle pool reuse only; avoid runtime allocation/GC pressure
- Map mouse velocity to particle size and opacity

## Media Cursor
- Support `data-cursor-image` and `data-cursor-video` attributes

## CSS Houdini
- `registerPaint('noise')` for animated procedural background
- Load worklet via `CSS.paintWorklet.addModule()`

## Audio Micro-Feedback
- Use `AudioContext`, `OscillatorNode`, `GainNode`
- On iOS, call `resume()` only after first user gesture
- Hover tone target: `220Hz` for `20ms` subtle click
