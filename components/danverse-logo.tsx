"use client"

import Image from "next/image"

// DANVERSE Logo System - Uses exact reference image

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero" | "header" | "small"
  className?: string
}

const SIZES = {
  xs: { width: 74, height: 74, scale: 1.16 },
  small: { width: 92, height: 92, scale: 1.18 },
  sm: { width: 116, height: 116, scale: 1.16 },
  header: { width: 84, height: 84, scale: 1.24 },
  md: { width: 212, height: 212, scale: 1.08 },
  lg: { width: 292, height: 292, scale: 1.06 },
  xl: { width: 372, height: 372, scale: 1.04 },
  hero: { width: 400, height: 400, scale: 1.04 },
}

export function DanverseLogo({ size = "md", className = "" }: LogoProps) {
  const { width, height, scale } = SIZES[size]
  const priority = size === "hero" || size === "header"

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      <Image
        src="/images/danverse-logo.png"
        alt="DANVERSE"
        fill
        sizes={`${width}px`}
        className="object-contain"
        style={{ transform: `scale(${scale})` }}
        priority={priority}
      />
    </div>
  )
}

export function DanverseHeaderLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 84, height: 84 }}>
      <Image
        src="/images/danverse-logo.png"
        alt="DANVERSE"
        fill
        sizes="84px"
        className="object-contain"
        style={{ transform: "scale(1.24)" }}
        priority
      />
    </div>
  )
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
