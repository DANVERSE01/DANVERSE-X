import { Clapperboard, Compass, Rocket } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Strategy Lock",
    description:
      "We define your visual language, target format, and campaign objectives before a single frame is touched. You approve the roadmap, then we execute without guesswork.",
    deliverables: ["Brand alignment audit", "Visual direction brief", "Format + platform strategy"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Production",
    description:
      "Cinematic lighting, camera motion, 3D modeling, and sound design built inside your brand system. Every deliverable passes internal QA before you see it.",
    deliverables: ["Shot list + storyboard", "3D modelling + texturing", "Color grade + sound design"],
    icon: Clapperboard,
  },
  {
    step: "03",
    title: "Launch-Ready Delivery",
    description:
      "You receive final assets, not drafts. Multiple ratios, structured revision rounds, and source files so the campaign is ready to move on day one.",
    deliverables: ["All platform ratios", "Structured revision rounds", "Source files + brand asset library"],
    icon: Rocket,
  },
] as const

export function ProcessSection() {
  return (
    <section id="process" className="section-shell relative overflow-hidden" data-analytics-section="Process">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[2.2rem] top-[17rem] bottom-[8rem] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--gold-muted)_18%,var(--gold-primary)_50%,var(--gold-muted)_82%,transparent)] md:block lg:left-1/2" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll" data-reveal>
          <span className="section-tag">How We Work</span>
          <h2 className="mt-7 text-balance text-[clamp(2.6rem,6vw,4.8rem)] font-black leading-[0.95]">
            From brief to <span className="headline-accent">cinematic.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--platinum-muted)] sm:text-lg">
            Every project follows a locked creative system. No ambiguity. No scope creep. Just premium execution with a
            clear line from strategy to delivery.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-[980px]">
          {steps.map((step, index) => (
            <article
              key={step.step}
              className="process-step reveal-on-scroll group relative grid gap-6 border-b border-[var(--bg-border)] py-10 transition-all duration-500 [transition-timing-function:var(--ease-cinematic)] hover:rounded-[24px] hover:border-transparent hover:bg-[var(--gold-glow)] hover:px-5 md:grid-cols-[80px_minmax(0,1fr)_180px] md:gap-10 md:py-14"
              data-reveal
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="text-[3.5rem] font-black leading-none tracking-[-0.06em] text-[var(--bg-border)] transition-colors duration-300 group-hover:text-[var(--gold-primary)] md:text-[4.5rem]">
                {step.step}
              </div>

              <div className="step-content">
                <h3 className="text-[1.9rem] font-bold text-[var(--platinum)] sm:text-[2.2rem]">{step.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--platinum-muted)] sm:text-base">
                  {step.description}
                </p>

                <ul className="step-deliverables mt-6 flex flex-col gap-3">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--platinum-muted)]"
                    >
                      <span className="h-px w-5 bg-[var(--gold-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex md:justify-end">
                <div className="step-icon-wrapper flex h-20 w-20 items-center justify-center rounded-[20px] border border-[var(--bg-border)] bg-[rgba(255,255,255,0.02)] transition-all duration-300">
                  <step.icon className="h-8 w-8 text-[var(--gold-primary)]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="process-cta reveal-on-scroll mt-14 flex flex-col items-center gap-6 text-center" data-reveal>
          <p className="process-cta-text text-lg text-[var(--platinum-muted)] sm:text-xl">Ready to start?</p>
          <a href="#contact" className="btn-primary" data-hover>
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
