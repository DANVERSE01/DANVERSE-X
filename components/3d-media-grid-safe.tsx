"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

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

// Dynamically import 3D grid with SSR disabled to prevent server-side errors
const MediaGrid3D = dynamic(() => import("./3d-media-grid").then(mod => ({ default: mod.MediaGrid3D })), {
  loading: () => <GridLoadingFallback />,
  ssr: false,
})

/**
 * Wrapper for 3D Media Grid with fallback support
 * Uses dynamic import to prevent SSR issues with Three.js
 */
export function SafeMediaGrid3D({ items, title }: SafeMediaGridProps) {
  return (
    <Suspense fallback={<GridLoadingFallback />}>
      <MediaGrid3D items={items} title={title} />
    </Suspense>
  )
}

function GridLoadingFallback() {
  return (
    <div className="w-full h-[550px] bg-gradient-to-b from-black to-neutral-950 rounded-2xl border border-white/5 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-red-500 animate-spin" />
        </div>
        <p className="text-white/60 text-sm">Loading gallery...</p>
      </div>
    </div>
  )
}

function FallbackMediaGrid({ items, title }: SafeMediaGridProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-video bg-neutral-900 border border-white/5">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.title || "Gallery item"}
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
