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
  className = "cta-coral rounded-full px-8 text-white font-medium transition-all hover:scale-105",
}: WaCtaButtonProps) {
  return (
    <Button size={size} className={className} onClick={() => fireCTAAndOpenWhatsApp(source)}>
      {label}
    </Button>
  )
}
