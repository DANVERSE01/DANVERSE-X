"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type PartnerLogo = {
  name: string
  image?: string
  monogram?: string
}

export function LogoMarqueeArchviz() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  const logos: PartnerLogo[] = [
    { name: "Lionsgate", monogram: "LG" },
    { name: "DANVERSE", image: "/images/danverse-logo.png" },
    { name: "AP", monogram: "AP" },
    { name: "Framework", monogram: "FW" },
  ]

  const Row = ({ dir, id }: { dir: "left" | "right"; id: string }) => (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex ${dir === "left" ? "animate-scroll-left" : "animate-scroll-right"} whitespace-nowrap`}
        style={{ animationPlayState: pausedRow === id ? "paused" : "running", width: "max-content" }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={`${id}-${i}`}
            className="flex-shrink-0 mx-3"
            onMouseEnter={() => setPausedRow(id)}
            onMouseLeave={() => setPausedRow(null)}
          >
            <div className="w-24 h-24 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-xl flex items-center justify-center overflow-hidden">
              {logo.image ? (
                <div className="relative h-full w-full p-2">
                  <Image src={logo.image} alt={logo.name} fill className="object-contain p-2" />
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(73,107,255,0.18),transparent_42%),linear-gradient(160deg,rgba(10,14,24,0.96),rgba(14,18,30,0.82))] px-2 text-center">
                  <span className="text-lg font-semibold tracking-[0.16em] text-white/90">{logo.monogram}</span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/52">{logo.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
            Trusted by <span className="text-lime-300">property teams</span>
          </h2>
          <Button variant="outline" className="mt-4 sm:mt-0 liquid-glass text-white border-white/20 bg-transparent">
            Learn More
          </Button>
        </div>
        <div className="relative">
          <Row dir="right" id="first" />
          <div className="mt-6" />
          <Row dir="left" id="second" />
        </div>
      </div>
    </section>
  )
}
