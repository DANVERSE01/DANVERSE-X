"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { SafeMediaGrid3D } from "./3d-media-grid-safe"
import { useMemo } from "react"

const ACCENT = "#EF4444"

type ExamplesDialogProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  planName: string
  price: string
  videoIds: string[]
}

// Map YouTube IDs to professional sample images
// In production, these would be actual portfolio images/videos
const SAMPLE_MEDIA_MAP: Record<string, string> = {
  H1h5dHpp1Nw: "https://images.unsplash.com/photo-1579546689838-83d87e42ba2b?w=800&q=80",
  HXARcSSdfMU: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80",
  fd8zraQ1JdE: "https://images.unsplash.com/photo-1674027444485-cec6c3ac3534?w=800&q=80",
  ARQyF2FA3Ec: "https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=800&q=80",
  dEZfHADlFtw: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
  wuyfdfKO6Rc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  ASV2myPRfKA: "https://images.unsplash.com/photo-1658896402989-80a248e716e1?w=800&q=80",
  eTfS2lqwf6A: "https://images.unsplash.com/photo-1654129092160-69ebc2b6266d?w=800&q=80",
  KALbYHmGV4I: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80",
  Go0AA9hZ4as: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
  sB7RZ9QCOAg: "https://images.unsplash.com/photo-1642883516165-29a84f07cdf7?w=800&q=80",
  TK2WboJOJaw: "https://images.unsplash.com/photo-1632519645293-164b67ba7c00?w=800&q=80",
  v2AC41dglnM: "https://images.unsplash.com/photo-1606933248051-5ce98adc9d2f?w=800&q=80",
  pRpeEdMmmQ0: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
  "3AtDnEC4zak": "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80",
  JRfuAukYTKg: "https://images.unsplash.com/photo-1678804332654-850b4a6e8f9c?w=800&q=80",
  LsoLEjrDogU: "https://images.unsplash.com/photo-1653534221318-4fe8e0fed36f?w=800&q=80",
  "RB-RcX5DS5A": "https://images.unsplash.com/photo-1606933248051-5ce98adc9d2f?w=800&q=80",
}

export function ExamplesDialog({ open, onOpenChange, planName, price, videoIds }: ExamplesDialogProps) {
  const mediaItems = useMemo(
    () =>
      videoIds.map((id, idx) => ({
        id,
        type: "image" as const,
        src: SAMPLE_MEDIA_MAP[id] || `https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80`,
        title: `Example ${idx + 1}`,
      })),
    [videoIds]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-5xl border-white/10 bg-gradient-to-b from-neutral-950 to-black p-0 text-white sm:rounded-3xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-black to-neutral-900/50 px-6 py-5">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-semibold" style={{ color: ACCENT }}>
              {planName}
            </DialogTitle>
            <DialogDescription className="text-sm text-white/60">Pricing: {price}</DialogDescription>
          </DialogHeader>
        </div>
        <div className="max-h-[80vh] overflow-auto px-6 py-6 lg:px-8 lg:py-8">
          <SafeMediaGrid3D items={mediaItems} title="Portfolio Examples" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
