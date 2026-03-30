import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TITLE = "Precision Before Production."

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="section-heading mb-10 text-center text-3xl text-white sm:text-4xl md:text-5xl">{TITLE}</h2>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <Card className="brand-card overflow-hidden">
          <CardHeader className="pb-4">
            <p className="section-label text-[11px]">CRAFT + CONTROL</p>
            <CardTitle className="mt-1 text-xl text-white">Every frame starts with a decision.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="body-copy mb-4 text-sm">
              We lock positioning, pacing, visual language, and output format before production begins.
            </p>
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

        <Card className="brand-card overflow-hidden">
          <CardHeader className="pb-4">
            <p className="section-label text-[11px]">CLIENT FEEDBACK</p>
            <CardTitle className="mt-1 text-xl text-white">What you review is already release-ready.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="body-copy mb-4 text-sm">
              Internal QA, finish, and brand consistency happen before anything reaches your inbox.
            </p>
            <div className="mb-5 flex flex-col items-start gap-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-lime)] text-[var(--color-lime)]" />
                ))}
              </div>
              <div className="section-label text-[10px]">Post-project feedback</div>
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

      <div className="brand-card mt-12 mx-auto max-w-5xl rounded-2xl p-8 text-center">
        <p className="body-copy text-lg leading-relaxed">
          One brief becomes a complete launch system: hooks, scripts, formats, and rollout-ready assets built around
          your brand.
        </p>
      </div>
    </section>
  )
}
