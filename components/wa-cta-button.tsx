"use client"

import { Button } from "@/components/ui/button"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

interface WaCtaButtonProps {
  source: string
  label?: string
  size?: "sm" | "lg" | "default"
  className?: string
}

export function WaCtaButton({
  source,
  label = "Book a Call",
  size = "lg",
  className = "group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-black font-semibold tracking-widest uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[var(--color-accent-2)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] active:scale-95 justify-center",
}: WaCtaButtonProps) {
  return (
    <Button size={size} className={className} onClick={() => fireCTAAndOpenWhatsApp(source)}>
      {label}
    </Button>
  )
}
