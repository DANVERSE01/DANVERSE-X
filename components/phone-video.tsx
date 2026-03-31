"use client"

import LazyVideo from "@/components/lazy-video"

export default function PhoneVideo({
  className = "",
  poster,
  src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4",
}: {
  className?: string
  poster?: string
  src?: string
}) {
  return (
    <LazyVideo
      src={src}
      poster={poster}
      className={className}
      autoplay
      loop
      muted
      playsInline
      aria-label="DANVERSE preview video"
    />
  )
}
