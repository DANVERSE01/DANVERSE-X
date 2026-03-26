import { MaskReveal } from "@/components/motion/mask-reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { WaCtaButton } from "@/components/wa-cta-button"

const engagements = [
  {
    title: "Sprint Film",
    description: "One focused campaign film or launch asset with fast strategy, production, and polish.",
  },
  {
    title: "Studio System",
    description: "A repeatable content and landing-page engine built to ship every week without drift.",
  },
  {
    title: "World Build",
    description: "A full-stack creative partnership spanning identity, web, motion, and premium rollout.",
  },
]

const socialProof = [
  "Cinematic direction",
  "Conversion-aware landing pages",
  "Fast premium iteration",
  "Motion systems that scale",
  "Performance-first creative",
  "Narrative brand environments",
]

export default function Act3ProofOffer() {
  const marqueeItems = [...socialProof, ...socialProof]

  return (
    <section id="pricing" className="relative px-6 py-24 md:px-10 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,transparent,rgb(10_19_37_/_0.12))]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
          <div className="space-y-6">
            <MaskReveal className="max-w-max">
              <p className="section-label text-[10px]">Specimen 04 / Proof Offer</p>
            </MaskReveal>
            <SplitReveal
              as="h2"
              text="Choose the engagement model that matches the ambition of the launch."
              unit="words"
              className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-tight tracking-[-0.04em] text-[var(--color-base)] md:text-6xl"
            />
          </div>

          <MaskReveal>
            <p className="max-w-xl text-base leading-7 text-[rgb(10_19_37_/_0.72)] md:text-lg">
              The structure stays lean: define the scene, build the asset system, and move the audience toward
              one decisive action without bloating the stack.
            </p>
          </MaskReveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {engagements.map((engagement, index) => (
            <MaskReveal key={engagement.title} delay={index * 0.08}>
              <article className="powder-panel micro-edge flex h-full flex-col gap-4 rounded-[28px] p-7 text-[var(--color-pearl)]">
                <p className="section-label text-[10px]">0{index + 1}</p>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-medium text-[var(--color-ice)]">
                  {engagement.title}
                </h3>
                <p className="text-sm leading-7 text-[rgb(199_211_224_/_0.74)]">{engagement.description}</p>
              </article>
            </MaskReveal>
          ))}
        </div>

        <div className="soft-shell chrome-border soft-marquee overflow-hidden rounded-full py-3">
          <div className="flex min-w-max animate-scroll-left gap-4 px-4">
            {marqueeItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-[rgb(22_42_83_/_0.1)] bg-[rgb(255_255_255_/_0.42)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-[var(--color-midnight)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="lacquer-shell micro-edge flex flex-col items-start justify-between gap-6 rounded-[32px] px-6 py-7 md:flex-row md:items-center md:px-8">
          <p className="max-w-2xl text-sm leading-7 text-[rgb(199_211_224_/_0.78)] md:text-base">
            Need the fastest path to a cinematic launch, a scalable content machine, or a new visual world?
            Start with the offer and we will shape the execution around it.
          </p>
          <WaCtaButton
            source="home-proof-offer"
            label="Start the conversation"
            className="command-cta rounded-full px-7"
          />
        </div>
      </div>
    </section>
  )
}
