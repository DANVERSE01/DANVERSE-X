import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type DeviceTier = "tier1" | "tier2" | "tier3"
export type CursorState = "default" | "hover-cta" | "hover-work" | "drag" | "hidden"
export type FormState = "idle" | "submitting" | "success" | "error"

interface DanverseStore {
  preloaderDone: boolean
  setPreloaderDone: () => void

  deviceTier: DeviceTier
  setDeviceTier: (tier: DeviceTier) => void

  cursorState: CursorState
  setCursorState: (state: CursorState) => void

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

      cursorState: "default",
      setCursorState: (cursorState) => set({ cursorState }),

      formState: "idle",
      setFormState: (formState) => set({ formState }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    { name: "danverse-store", enabled: process.env.NODE_ENV === "development" }
  )
)
