"use client"

import Image from "next/image"

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero" | "header" | "small"
  className?: string
}

const SIZES = {
  xs: { width: 54, height: 50 },
  small: { width: 68, height: 64 },
  sm: { width: 92, height: 86 },
  header: { width: 84, height: 78 },
  md: { width: 168, height: 156 },
  lg: { width: 228, height: 212 },
  xl: { width: 310, height: 288 },
  hero: { width: 390, height: 362 },
}

export function DanverseLogo({ size = "md", className = "" }: LogoProps) {
  const { width, height } = SIZES[size]
  const priority = size === "hero" || size === "header"

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      <Image
        src="/images/danverse-logo.png"
        alt="DANVERSE"
        fill
        sizes={`${width}px`}
        className="object-contain select-none drop-shadow-[0_0_24px_rgba(49,93,255,0.18)]"
        priority={priority}
      />
    </div>
  )
}

export function DanverseHeaderLogo({ className = "" }: { className?: string }) {
  return <DanverseLogo size="header" className={className} />
}

export function DanverseEmblem({ size = "md", className = "" }: LogoProps) {
  return <DanverseLogo size={size} className={className} />
}

export function DanverseWordmark({ size = "md", className = "" }: LogoProps) {
  const fontSizes = {
    xs: "text-xs",
    small: "text-sm",
    sm: "text-base",
    header: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
    hero: "text-4xl",
  }

  return (
    <span
      className={`font-bold tracking-[0.15em] bg-gradient-to-r from-[var(--color-electric-blue-strong)] via-[var(--color-hot-pink)] to-[var(--color-acid-lime)] bg-clip-text text-transparent ${fontSizes[size]} ${className}`}
      style={{ fontFamily: '"Sora"' }}
    >
      DANVERSE
    </span>
  )
}

export function DanverseVerticalLockup({ size = "lg", className = "" }: LogoProps) {
  return <DanverseLogo size={size} className={className} />
}

export function DanverseHorizontalLockup({ size = "md", className = "" }: LogoProps) {
  return <DanverseLogo size={size} className={className} />
}

export function DanverseLockup({ size = "hero", className = "" }: LogoProps) {
  return <DanverseLogo size={size} className={className} />
}
