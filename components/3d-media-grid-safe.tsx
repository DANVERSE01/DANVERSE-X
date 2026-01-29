"use client"

import { ReactNode } from "react"
import { MediaGrid3D } from "./3d-media-grid"

type MediaItem = {
  id: string
  type: "image" | "video"
  src: string
  title?: string
}

type SafeMediaGridProps = {
  items: MediaItem[]
  title?: string
}

/**
 * Error Boundary wrapper for 3D Media Grid
 * Falls back to a regular grid if 3D rendering fails
 */
export function SafeMediaGrid3D({ items, title }: SafeMediaGridProps) {
  try {
    return <MediaGrid3D items={items} title={title} />
  } catch (error) {
    console.error("[v0] 3D Grid rendering failed, using fallback:", error)
    return <FallbackMediaGrid items={items} title={title} />
  }
}

function FallbackMediaGrid({ items, title }: SafeMediaGridProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-2xl liquid-glass aspect-video">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                controls
                poster={item.src}
              />
            )}

            {/* Overlay with title */}
            {item.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
