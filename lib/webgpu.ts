import { WebGPURenderer } from "three/webgpu"

export type DeviceTier = "tier1" | "tier2" | "tier3"

export async function detectTier(): Promise<DeviceTier> {
  if (typeof window === "undefined") return "tier1"
  if (!("gpu" in navigator)) return "tier1"

  const isMobile = /mobi|android|iphone|ipad/i.test(navigator.userAgent)
  if (isMobile) return "tier1"

  try {
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) return "tier1"

    const adapterWithInfo = adapter as GPUAdapter & {
      requestAdapterInfo?: () => Promise<GPUAdapterInfo>
    }

    const info = adapterWithInfo.requestAdapterInfo ? await adapterWithInfo.requestAdapterInfo() : null
    const description = info?.description?.toLowerCase() ?? ""
    const isIntegrated = description.includes("intel")

    return isIntegrated ? "tier2" : "tier3"
  } catch {
    return "tier1"
  }
}

export async function createRenderer(canvas: HTMLCanvasElement): Promise<WebGPURenderer> {
  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  })

  await renderer.init()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  return renderer
}
