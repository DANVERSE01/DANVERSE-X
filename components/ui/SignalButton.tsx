"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { MagneticField } from "@/components/cursor/MagneticField"
import { useDanverseStore } from "@/lib/store"

type SignalButtonProps = {
  href?: string
  children: ReactNode
  type?: "button" | "submit"
  onClick?: () => void
  target?: string
  rel?: string
  disabled?: boolean
}

export function SignalButton({
  href,
  children,
  type = "button",
  onClick,
  target,
  rel,
  disabled = false,
}: SignalButtonProps) {
  const setCursorState = useDanverseStore((state) => state.setCursorState)

  const content = href ? (
    href.startsWith("http") || href.startsWith("mailto:") ? (
      <a
        className="signal-button"
        href={href}
        target={target}
        rel={rel}
        data-cursor="hover-cta"
        onMouseEnter={() => setCursorState("hover-cta")}
        onMouseLeave={() => setCursorState("default")}
      >
        {children}
      </a>
    ) : (
      <Link
        className="signal-button"
        href={href}
        data-cursor="hover-cta"
        onMouseEnter={() => setCursorState("hover-cta")}
        onMouseLeave={() => setCursorState("default")}
      >
        {children}
      </Link>
    )
  ) : (
    <button
      className="signal-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover-cta"
      onMouseEnter={() => setCursorState("hover-cta")}
      onMouseLeave={() => setCursorState("default")}
    >
      {children}
    </button>
  )

  return <MagneticField>{content}</MagneticField>
}
