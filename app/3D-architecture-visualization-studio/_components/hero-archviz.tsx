import { Button } from "@/components/ui/button"
import Image from "next/image"
import LazyVideo from "@/components/lazy-video"

const ARCHVIZ_CARDS = [
  {
    title: "Exteriors",
    sub: "Every detail counts, every frame matters — every stage of the process is done with care.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Every%20detail%20counts%2C%20every%20frame%20matters%21Every%20stage%20of%20the%20process%20is%20done%20with%20care.%20From%20plac-0aQhUmeIEWI32BfXyNdANQy72OkyTw.mp4",
  },
  {
    title: "Interiors",
    sub: "Visualize every room, material, and light — exactly as it will feel in real life.",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/interior-K4oSxppSecydQwbsEP3MkhQM7FU54u.mp4",
  },
  {
    title: "Vision",
    sub: "Take your audience on a cinematic journey.",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cinematic-o21Pr562TclgLhHHER6gvzHRNBUnj2.mp4",
  },
  {
    title: "Cinematics",
    sub: "Camera moves for emotion.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
  },
  {
    title: "Site Plans",
    sub: "Masterplans with context.",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
  },
] as const

export function HeroArchviz() {
  return (
    <section className="section-shell relative isolate overflow-hidden pt-8">
      <div className="content-shell">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div className="mb-5 flex items-center gap-2">
            <Image src="/images/danverse-logo.png" alt="DANVERSE logo" width={48} height={48} className="h-12 w-12 object-contain" />
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-acid-lime)]/80">ArchViz</p>
          </div>

          <h1 className="mt-3 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Photo-realistic</span>
            <span className="block text-[var(--color-electric-blue-strong)]">Architecture</span>
            <span className="block">Visualization</span>
          </h1>

          <p className="mt-4 max-w-2xl text-center text-sm text-white/80 sm:text-base">
            Exterior renders, interior styling, and cinematic walkthroughs for developers, architects, and agencies.
          </p>

          <div className="mt-6">
            <Button asChild className="cta-primary rounded-full px-6">
              <a href="https://wa.link/65mf3i" target="_blank" rel="noopener noreferrer">
                Start ArchViz Project
              </a>
            </Button>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {ARCHVIZ_CARDS.map((card, index) => {
              const visibility = index <= 2 ? "block" : index === 3 ? "hidden md:block" : "hidden xl:block"

              return (
                <div key={card.title} className={visibility}>
                  <ArchvizCard {...card} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchvizCard({ sub, title, videoSrc }: (typeof ARCHVIZ_CARDS)[number]) {
  return (
    <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <LazyVideo
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoplay
          loop
          muted
          playsInline
          aria-label={`${title} - ${sub}`}
        />
        <div className="relative p-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="space-y-1 px-1">
            <h3 className="text-3xl font-semibold leading-snug text-white/90">{title}</h3>
            <p className="text-xs text-white/70">{sub}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-hot-pink-strong)]">
              ArchViz
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
