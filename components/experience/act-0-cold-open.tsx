import { MaskReveal } from "@/components/motion/mask-reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

export default function Act0ColdOpen() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[var(--color-base)] px-6 pb-24 pt-36 text-[var(--color-ice)] md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_18%,rgb(47_99_186_/_0.16),transparent_24%),radial-gradient(circle_at_72%_24%,rgb(199_38_76_/_0.08),transparent_14%),linear-gradient(180deg,rgb(4_7_12_/_0.98),rgb(10_19_37_/_0.94)_60%,rgb(4_7_12_/_1)_100%)]" />
        <div className="absolute left-1/2 top-0 h-40 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgb(199_211_224_/_0),rgb(199_211_224_/_0.2),rgb(199_211_224_/_0))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgb(10_19_37_/_0.68))]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
        <MaskReveal className="max-w-max">
          <p className="section-label text-[10px]">Specimen 01 / Cold Open</p>
        </MaskReveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.62fr)] lg:items-end">
          <div className="space-y-7">
            <SplitReveal
              as="h1"
              text="Building extraordinary worlds."
              unit="words"
              className="max-w-5xl font-[family-name:var(--font-space-grotesk)] text-5xl font-medium leading-[0.92] tracking-[-0.06em] text-[var(--color-ice)] md:text-7xl lg:text-[6.75rem]"
            />

            <MaskReveal delay={0.06}>
              <p className="max-w-2xl text-sm uppercase tracking-[0.28em] text-[rgb(126_160_200_/_0.72)] md:text-[13px]">
                Cinematic direction. Landing systems. Controlled release.
              </p>
            </MaskReveal>
          </div>

          <div className="space-y-6 lg:justify-self-end">
            <MaskReveal>
              <p className="max-w-md text-base leading-7 text-[rgb(199_211_224_/_0.72)] md:text-lg">
                DANVERSE shapes film, interface, and offer design into one precise sequence so the launch already
                feels resolved when the audience arrives.
              </p>
            </MaskReveal>
            <MaskReveal delay={0.12}>
              <div className="soft-shell inline-flex rounded-full px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--color-midnight)]">
                  Scroll to enter the timeline
                </p>
              </div>
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
