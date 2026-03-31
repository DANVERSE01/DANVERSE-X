"use client"

import { useMemo, useState, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { useLazyLoad } from "@/hooks/use-lazy-load"

type LazyPictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src"> & {
  alt: string
  avifSrc?: string
  webpSrc?: string
  jpgSrc?: string
  pictureClassName?: string
  placeholderSrc?: string
}

export function LazyPicture({
  alt,
  avifSrc,
  webpSrc,
  jpgSrc,
  pictureClassName,
  placeholderSrc = "/placeholder.webp",
  className,
  onLoad,
  ...props
}: LazyPictureProps) {
  const { ref, isVisible } = useLazyLoad<HTMLPictureElement>()
  const [loaded, setLoaded] = useState(false)

  const fallbackSrc = useMemo(
    () => jpgSrc ?? webpSrc ?? avifSrc ?? placeholderSrc,
    [avifSrc, jpgSrc, placeholderSrc, webpSrc]
  )

  return (
    <picture ref={ref} className={pictureClassName}>
      {avifSrc ? <source data-srcset={avifSrc} srcSet={isVisible ? avifSrc : undefined} type="image/avif" /> : null}
      {webpSrc ? <source data-srcset={webpSrc} srcSet={isVisible ? webpSrc : undefined} type="image/webp" /> : null}
      {jpgSrc ? <source data-srcset={jpgSrc} srcSet={isVisible ? jpgSrc : undefined} type="image/jpeg" /> : null}
      <img
        {...props}
        src={isVisible ? fallbackSrc : placeholderSrc}
        data-src={fallbackSrc}
        loading="lazy"
        decoding="async"
        alt={alt}
        className={cn("lazy-image", loaded && "is-loaded", className)}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
      />
    </picture>
  )
}
