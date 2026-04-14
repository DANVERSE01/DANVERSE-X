"use client"

import dynamic from "next/dynamic"

const CursorSystem = dynamic(
  () => import("@/components/cursor/CursorSystem").then((m) => m.CursorSystem),
  { ssr: false }
)

const SmoothScrollProvider = dynamic(
  () => import("@/components/ui/SmoothScrollProvider").then((m) => m.SmoothScrollProvider),
  { ssr: false }
)

export function ClientProviders() {
  return (
    <>
      <CursorSystem />
      <SmoothScrollProvider />
    </>
  )
}
