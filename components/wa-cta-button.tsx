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
  className = "rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 text-white font-medium hover:from-red-400 hover:to-orange-400 hover:scale-105 transition-all",
}: WaCtaButtonProps) {
  return (
    <Button size={size} className={className} onClick={() => fireCTAAndOpenWhatsApp(source)}>
      {label}
    </Button>
  )
}
