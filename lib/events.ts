import mitt from "mitt"

type Events = {
  "gpu-ready": void
  "preloader-done": void
  "section-change": { id: string }
  "cursor-override": { state: string }
  "work-hover": { slug: string | null }
}

export const emitter = mitt<Events>()
