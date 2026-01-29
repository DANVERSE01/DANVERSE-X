"use client"

import { Play } from "lucide-react"

const ACCENT = "#C6FF3A"

type ExampleGridProps = {
  videoIds: string[]
}

export default function ExampleGrid({ videoIds }: ExampleGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videoIds.map((_, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-2xl liquid-glass">
          <div className="relative z-0 aspect-video bg-neutral-900 flex items-center justify-center">
             <div className="text-neutral-700">
                <Play className="h-12 w-12 opacity-20" />
             </div>
          </div>

          {/* Hover gradient */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Overlay Controls Placeholder */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-center justify-center">
            <button
              aria-disabled="true"
              className="pointer-events-none rounded-full px-3 py-1 text-xs font-medium text-black transition-colors opacity-50 cursor-not-allowed"
              style={{ backgroundColor: ACCENT }}
              tabIndex={-1}
              type="button"
            >
              <span className="inline-flex items-center gap-1">
                <Play className="h-3.5 w-3.5" /> Preview
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
