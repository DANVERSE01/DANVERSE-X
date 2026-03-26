"use client"

import type React from "react"
import { createContext, useCallback, useContext, useMemo, useState } from "react"

interface CursorStateValue {
  label: string
  setCursorLabel: (label: string) => void
  clearCursorLabel: () => void
}

const CursorStateContext = createContext<CursorStateValue | null>(null)

export function CursorStateProvider({ children }: { children: React.ReactNode }) {
  const [label, setLabel] = useState("")

  const setCursorLabel = useCallback((nextLabel: string) => {
    setLabel(nextLabel)
  }, [])

  const clearCursorLabel = useCallback(() => {
    setLabel("")
  }, [])

  const value = useMemo(
    () => ({
      label,
      setCursorLabel,
      clearCursorLabel,
    }),
    [clearCursorLabel, label, setCursorLabel],
  )

  return <CursorStateContext.Provider value={value}>{children}</CursorStateContext.Provider>
}

export function useCursorState() {
  const context = useContext(CursorStateContext)

  if (!context) {
    throw new Error("useCursorState must be used within CursorStateProvider")
  }

  return context
}
