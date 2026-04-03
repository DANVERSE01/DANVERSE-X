import { PlasmaLayer } from "@/components/plasma-layer"

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 h-full w-full" aria-hidden="true" style={{ zIndex: "var(--z-background)" }}>
      <PlasmaLayer />
      <div className="plasma-atmosphere" />
      <div className="plasma-grain" />
      <div className="editorial-vignette" />
    </div>
  )
}
