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
        {/* Cinematic Visuals Card */}
        <Card className="liquid-glass border border-white/10 overflow-hidden">
          <CardHeader className="pb-4">
            <p className="text-[11px] tracking-widest text-red-400 uppercase">Cinematic Visuals</p>
            <CardTitle className="mt-1 text-xl text-white">Make the experience truly memorable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-1.png"
                  alt="Close-up smartphone camera module"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-2.png"
                  alt="Hand gripping textured phone back"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Love Card */}
        <Card className="liquid-glass border border-white/10 overflow-hidden">
          <CardHeader className="pb-4">
            <p className="text-[11px] tracking-widest text-red-400 uppercase">Client Love</p>
            <CardTitle className="mt-1 text-xl text-white">
              Campaigns that move the needle — audiences feel the difference instantly.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex items-end gap-3">
              <div className="text-4xl font-bold text-red-400">4.9</div>
              <div className="flex items-center gap-0.5 pb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-400 text-red-400" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Image
                src="/images/top-rated-1.png"
                width={280}
                height={160}
                alt="Product sketch concepts"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              <Image
                src="/images/top-rated-2.png"
                width={280}
                height={160}
                alt="Backpacks on stage"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
