"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "Why brands choose DANVERSE",
  subtitle: "Discover our unique approach to creative storytelling",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  useEffect(() => {
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.features) setContent(parsed.features)
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
        {content.title}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Cinematic Visuals Card -> CRAFT + CONTROL */}
        <Card className="liquid-glass border border-white/10 overflow-hidden">
          <CardHeader className="pb-4">
            <p className="text-[11px] tracking-widest text-red-400 uppercase">CRAFT + CONTROL</p>
            <CardTitle className="mt-1 text-xl text-white">Cinematic, without the chaos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 mb-4">Every shot has a purpose. Every detail serves the outcome.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-1.webp"
                  alt="Close-up smartphone camera module"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-2.webp"
                  alt="Hand gripping textured phone back"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Feedback Card -> CLIENT FEEDBACK */}
        <Card className="liquid-glass border border-white/10 overflow-hidden">
          <CardHeader className="pb-4">
            <p className="text-[11px] tracking-widest text-red-400 uppercase">CLIENT FEEDBACK</p>
            <CardTitle className="mt-1 text-xl text-white">
              Five-star standard delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 mb-4">We ship only when it’s right, not when it’s “almost done.”</p>
            <div className="mb-5 flex flex-col items-start gap-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-400 text-red-400" />
                ))}
              </div>
              <div className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Post-project feedback</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Image
                src="/images/top-rated-1.webp"
                width={280}
                height={160}
                alt="Product sketch concepts"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              <Image
                src="/images/top-rated-2.webp"
                width={280}
                height={160}
                alt="Backpacks on stage"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Content Systems Block */}
      <div className="mt-12 max-w-5xl mx-auto p-8 rounded-2xl liquid-glass border border-white/10 text-center">
        <p className="text-lg text-white/80 leading-relaxed">
          We build AI workflows that turn briefs into hooks, scripts, and campaign variants with your brand rules locked in.
        </p>
      </div>
    </section>
  )
}
