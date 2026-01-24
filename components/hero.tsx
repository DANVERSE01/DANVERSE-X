import { Button } from "@/components/ui/button"
import LazyVideo from "./lazy-video"
import { DanverseLogo } from "./danverse-logo"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          {/* Logo - Centered with consistent spacing */}
          <div className="mb-6">
            <DanverseLogo size="hero" />
          </div>

          {/* Headline */}
          <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block text-white">AI-POWERED</span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-400 bg-clip-text text-transparent">
              CREATIVE STUDIO
            </span>
            <span className="block text-white">FOR BRANDS</span>
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 text-white font-medium hover:from-red-400 hover:to-orange-400 hover:scale-105 transition-all"
            >
              <a href="https://wa.link/rc25na" target="_blank" rel="noopener noreferrer">
                Chat With Us
              </a>
            </Button>
          </div>

          {/* Phone Cards Grid */}
          <div className="mt-12 w-full">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto">
              {phoneData.map((p, i) => {
                const visibility =
                  i <= 1 ? "block" : i === 2 ? "hidden sm:block" : i === 3 ? "hidden lg:block" : "hidden xl:block"

                return (
                  <div key={i} className={visibility}>
                    <PhoneCard title={p.title} sub={p.sub} tone={p.tone} videoSrc={p.videoSrc} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "Feature",
  sub = "Description here",
  tone = "default",
  videoSrc,
}: {
  title?: string
  sub?: string
  tone?: string
  videoSrc?: string
}) {
  return (
    <div className="relative rounded-[24px] glass-border bg-black/40 p-1.5">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black">
        <LazyVideo
          src={videoSrc ?? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4"}
          className="absolute inset-0 h-full w-full object-cover"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-xl font-bold text-white mb-1">{title}</div>
          <p className="text-xs text-white/70">{sub}</p>
          <div className="mt-2 inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-400">
            DANVERSE
          </div>
        </div>
      </div>
    </div>
  )
}

const phoneData = [
  {
    title: "Conversions",
    sub: "Turn clicks into paying customers.",
    tone: "results",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20new%20chapter%20in%20the%20story%20of%20success.__Introducing%20the%20new%20TAG%20Heuer%20Carrera%20Day-Date%20collection%2C%20reimagined%20with%20bold%20colors%2C%20refined%20finishes%2C%20and%20upgraded%20functionality%20to%20keep%20you%20focused%20on%20your%20goals.%20__Six%20-nDNoRQyFaZ8oaaoty4XaQz8W8E5bqA.mp4",
  },
  {
    title: "Speed",
    sub: "Launch in days, not weeks.",
    tone: "speed",
  },
  {
    title: "Social-Ready",
    sub: "Made for IG, TikTok, and Meta.",
    tone: "social",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
  },
  {
    title: "Standout",
    sub: "Be the product no one scrolls past.",
    tone: "standout",
  },
  {
    title: "Premium",
    sub: "Look like the market leader.",
    tone: "premium",
  },
]
