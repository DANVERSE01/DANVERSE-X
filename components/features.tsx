import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TITLE = "Built different. By design."

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <p
        style={{ fontFamily: "var(--font-condensed)" }}
        className="reveal mb-4 text-center text-xs uppercase tracking-[0.45em] text-[var(--color-accent)]"
      >
        Design Systems
      </p>
      <h2
        style={{ fontFamily: "var(--font-display)" }}
        className="reveal mb-10 text-center text-[clamp(2.5rem,6vw,6rem)] leading-none uppercase text-white"
      >
        {TITLE}
      </h2>

      <div className="grid max-w-5xl mx-auto gap-6 md:grid-cols-2">
        {/* Cinematic Visuals Card -> CRAFT + CONTROL */}
        <Card className="reveal liquid-glass overflow-hidden border border-white/10">
          <CardHeader className="pb-4">
            <p
              style={{ fontFamily: "var(--font-condensed)" }}
              className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-accent)]"
            >
              CRAFT + CONTROL
            </p>
            <CardTitle className="mt-1 text-xl text-white">Direction before a single frame is shot.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 mb-4">
              We lock strategy, visual language, and output format before production starts.
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

        {/* Client Feedback Card -> CLIENT FEEDBACK */}
        <Card className="reveal liquid-glass overflow-hidden border border-white/10">
          <CardHeader className="pb-4">
            <p
              style={{ fontFamily: "var(--font-condensed)" }}
              className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-accent)]"
            >
              CLIENT FEEDBACK
            </p>
            <CardTitle className="mt-1 text-xl text-white">We ship finished work. Not "almost done."</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 mb-4">
              Every deliverable passes internal QA. You review final — not rough cuts.
            </p>
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
      <div className="reveal mx-auto mt-12 max-w-5xl rounded-2xl border border-white/10 p-8 text-center liquid-glass">
        <p className="text-lg text-white/80 leading-relaxed">
          One brief. Ten campaign-ready outputs. Hooks, scripts, formats — locked inside your brand system.
        </p>
      </div>
    </section>
  )
}
