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
  className = "btn-primary h-auto border-0 px-8 py-3 text-[0.74rem]",
}: WaCtaButtonProps) {
  return (
    <Button size={size} className={className} onClick={() => fireCTAAndOpenWhatsApp(source)}>
      {label}
    </Button>
  )
}
