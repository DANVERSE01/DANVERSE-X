"use client"

import Image from "next/image"

// DANVERSE Logo System - Uses exact reference image
// Clean, symmetric, professional layout

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero" | "header" | "small"
  className?: string
}

const SIZES = {
  xs: { width: 80, height: 80 },
  small: { width: 100, height: 100 },
  sm: { width: 120, height: 120 },
  header: { width: 140, height: 40 },
  md: { width: 200, height: 200 },
  lg: { width: 280, height: 280 },
  xl: { width: 360, height: 360 },
  hero: { width: 320, height: 320 },
}

export function DanverseLogo({ size = "md", className = "" }: LogoProps) {
  const { width, height } = SIZES[size]

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/images/danverse-logo.png"
        alt="DANVERSE"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}

export function DanverseHeaderLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/images/danverse-logo.png"
        alt="DANVERSE"
        width={140}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  )
}

export function DanverseEmblem({ size = "md", className = "" }: LogoProps) {
  const { width, height } = SIZES[size]
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
      className={`font-bold tracking-[0.15em] bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent ${fontSizes[size]} ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
