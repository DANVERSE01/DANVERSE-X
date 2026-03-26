import { MaskReveal } from "@/components/motion/mask-reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

export default function Act0ColdOpen() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--color-base)] px-6 pb-20 pt-36 text-[var(--color-ice)] md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(47_99_186_/_0.18),transparent_28%),radial-gradient(circle_at_75%_28%,rgb(199_38_76_/_0.16),transparent_20%),linear-gradient(180deg,rgb(4_7_12_/_0.94),rgb(4_7_12_/_1))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgb(10_19_37_/_0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <MaskReveal className="max-w-max">
          <p className="section-label text-[11px]">Cold Open</p>
        </MaskReveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.7fr)] lg:items-end">
          <SplitReveal
            as="h1"
            text="Building extraordinary worlds."
            unit="words"
            className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-5xl font-medium leading-[0.95] tracking-[-0.05em] text-[var(--color-ice)] md:text-7xl lg:text-[7rem]"
          />

          <div className="space-y-6">
            <MaskReveal>
              <p className="max-w-xl text-base leading-7 text-[rgb(199_211_224_/_0.76)] md:text-lg">
                DANVERSE merges cinematic direction, brand systems, and conversion engineering into one
                timeline so the pitch feels finished before the meeting starts.
              </p>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.36em] text-[rgb(126_160_200_/_0.72)]">
                Scroll to enter the timeline
              </p>
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
