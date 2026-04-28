"use client"

import dynamic from "next/dynamic"

export const CapabilitiesGridLazy = dynamic(
  () => import("@/app/sections/CapabilitiesGrid").then((m) => ({ default: m.CapabilitiesGrid })),
  { ssr: false, loading: () => <div style={{ minHeight: "900px", background: "#050507" }} /> }
)
