import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import LazyVideo from "@/components/lazy-video"
import Image from "next/image"

export function FooterArchviz() {
  return (
    <section className="section-shell py-[var(--section-block)] text-white">
      <div className="content-shell">
        <div className="flex justify-center">
          <Button asChild className="cta-primary rounded-full px-6 py-2 text-sm font-medium">
            <a href="https://wa.link/65mf3i" target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
          </Button>
        </div>

        <div className="py-12 sm:py-16">
          <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] tracking-widest text-[var(--color-acid-lime)]">Design Buy-In Faster</p>
                <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Walk stakeholders through your space before it is built.
                </h3>
                <p className="mt-2 max-w-prose text-sm text-neutral-400">
                  Present options, gather timestamped feedback, and reach approvals with walkthrough videos and stills.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[320px]">
                <div className="relative rounded-[28px] liquid-glass p-2 shadow-2xl">
                  <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
                    <LazyVideo
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                      className="absolute inset-0 h-full w-full object-cover"
                      autoplay
                      loop
                      muted
                      playsInline
                      aria-label="ArchViz walkthrough preview"
                    />
                    <div className="relative p-3">
                      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
                      <div className="space-y-1 px-1">
                        <div className="text-5xl font-bold text-[var(--color-electric-blue-strong)]">ArchViz</div>
                        <p className="text-xs text-white/80">Sell the vision with visuals</p>
                        <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-hot-pink-strong)]">
                          Walkthrough Ready
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <footer className="border-t border-white/10 pb-20 pt-10 md:pb-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/images/danverse-logo.webp"
                  alt="DANVERSE logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-xl font-semibold text-white">DANVERSE ArchViz</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">
                Photorealistic architecture visualization for launches, leasing, and approvals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <FooterLinks
                title="Navigation"
                items={[
                  { href: "#services", label: "Services" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "#faq", label: "FAQ" },
                  { href: "#about", label: "About" },
                ]}
              />
              <FooterLinks
                title="Legal"
                items={[
                  { href: "/revisions", label: "Revision Policy" },
                  { href: "/t&c", label: "Terms & Conditions" },
                ]}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>© 2026 DANVERSE</p>
            <div className="flex items-center gap-6">
              <a href="#services" className="hover:text-[var(--color-hot-pink-strong)]">
                Services
              </a>
              <a href="#pricing" className="hover:text-[var(--color-hot-pink-strong)]">
                Pricing
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

function FooterLinks({ items, title }: { items: Array<{ href: string; label: string }>; title: string }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">{title}</h4>
      <ul className="space-y-2 text-sm text-neutral-300">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-[var(--color-hot-pink-strong)]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
