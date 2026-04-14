"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useDanverseStore } from "@/lib/store"

type GhostButtonProps = {
  href: string
  children: ReactNode
}

export function GhostButton({ href, children }: GhostButtonProps) {
  const setCursorState = useDanverseStore((state) => state.setCursorState)

  return href.startsWith("http") || href.startsWith("mailto:") ? (
    <a
      className="ghost-button"
      href={href}
      data-cursor="hover-cta"
      onMouseEnter={() => setCursorState("hover-cta")}
      onMouseLeave={() => setCursorState("default")}
    >
      {children}
    </a>
  ) : (
    <Link
      className="ghost-button"
      href={href}
      data-cursor="hover-cta"
      onMouseEnter={() => setCursorState("hover-cta")}
      onMouseLeave={() => setCursorState("default")}
    >
      {children}
    </Link>
  )
}
