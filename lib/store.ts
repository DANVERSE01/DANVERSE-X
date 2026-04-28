import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type DeviceTier = "tier1" | "tier2" | "tier3"
export type CursorState = "default" | "hover-cta" | "hover-work" | "drag" | "hidden"
export type ActiveSection = "tx-00" | "tx-01" | "tx-02" | "tx-03" | "tx-04" | "tx-05" | "tx-06"
export type FormState = "idle" | "submitting" | "success" | "error"

interface DanverseStore {
  preloaderDone: boolean
  setPreloaderDone: () => void

  deviceTier: DeviceTier
  setDeviceTier: (tier: DeviceTier) => void

  rendererReady: boolean
  setRendererReady: () => void

  cursorState: CursorState
  setCursorState: (state: CursorState) => void

  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void

  formState: FormState
  setFormState: (state: FormState) => void

  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
}

export const useDanverseStore = create<DanverseStore>()(
  devtools(
    (set) => ({
      preloaderDone: false,
      setPreloaderDone: () => set({ preloaderDone: true }),

      deviceTier: "tier1",
      setDeviceTier: (deviceTier) => set({ deviceTier }),

      rendererReady: false,
      setRendererReady: () => set({ rendererReady: true }),

      cursorState: "default",
      setCursorState: (cursorState) => set({ cursorState }),

      activeSection: "tx-00",
      setActiveSection: (activeSection) => set({ activeSection }),

      formState: "idle",
      setFormState: (formState) => set({ formState }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    { name: "danverse-store" }
  )
)
