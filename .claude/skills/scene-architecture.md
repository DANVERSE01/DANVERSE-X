# scene-architecture

## Purpose
Scene organization pattern for complex realtime experiences.

## SceneManager
- Use a central `SceneManager` built on `Map`.
- Store scene modules by stable key for deterministic retrieval.
- Keep lifecycle methods (`init`, `update`, `dispose`) per entry.
- Allow active-scene switching without recreating shared services.
- Ensure map entries are disposed and removed on teardown.

