"use client"

import React from "react"

interface ExampleTile {
  id: string
  label: string
  meta: string
  description: string
  src: string
}

const EXAMPLES: ExampleTile[] = [
  {
    id: "beauty-launch",
    label: "Beauty Launch Film",
    meta: "15s • Social Campaign",
    description: "High-end product cinematography with fluid transitions and macro details.",
    src: "/videos/fallback.webm",
  },
  {
    id: "tech-reveal",
    label: "Tech Product Reveal",
    meta: "30s • Product Launch",
    description: "Precise 3D technical animations highlighting complex internal systems.",
    src: "/videos/fallback.webm",
  },
  {
    id: "luxury-brand",
    label: "Luxury Brand System",
    meta: "45s • Brand Identity",
    description: "Cohesive visual language and cinematic storytelling for premium brands.",
    src: "/videos/fallback.webm",
  },
]

export function PricingExamplesStrip() {
  return (
    <div className="w-full space-y-12">
      {/* Header Area */}
      <header className="text-center space-y-4" aria-labelledby="pricing-heading">
        <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-red-500 font-semibold">
          Creative Operating System
        </span>
        <h2 id="pricing-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Cinematic Excellence
        </h2>
        <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
          Explore our system of high-fidelity cinematic examples, engineered for maximum impact and brand elevation.
        </p>
      </header>

      {/* Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {EXAMPLES.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20"
          >
            {/* Glassmorphism Backdrop Blur (Tailwind only) */}
            <div className="absolute inset-0 backdrop-blur-xl -z-10" />

            {/* Video Container */}
            <div className="relative aspect-[9/16] overflow-hidden">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-3">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  {item.label}
                </h3>
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                  {item.meta}
                </p>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
