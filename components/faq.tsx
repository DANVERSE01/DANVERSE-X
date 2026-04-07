"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { TextReveal } from "@/components/text-reveal"
import { useGsapEnter } from "@/hooks/use-gsap-enter"

const FAQS = [
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope: Cinematic Ads start at 15k–50k (30–90s hero film). Brand Systems run 20k–60k (complete design language). Launch Websites begin at 25k–75k. Content Rollouts are monthly retainers starting at 8k–15k. Every brief gets a scope estimate before production begins.",
  },
  {
    question: "What's the timeline?",
    answer:
      "Strategy Lock (1–2 weeks) → Frame & Build (3–6 weeks) → Ship & Scale (1–2 weeks). Expedited timelines available for 20% rush fee. We lock deadlines in the brief before day one.",
  },
  {
    question: "Do you work with template solutions or only custom?",
    answer:
      "Custom always. Every brief gets director-led positioning and a custom production system. No templates. No shortcuts. We control the creative from start to finish.",
  },
  {
    question: "What's included in deliverables?",
    answer:
      "Cinematic Ads: Hero film + platform edits + social shorts. Brand Systems: Design guidelines + asset library + motion templates. Launch Websites: Responsive site + CMS setup + analytics dashboard. Content Rollouts: 4–8 pieces monthly + calendar + all platform ratios. Everything uploaded and ready to deploy.",
  },
  {
    question: "Who handles hosting and deployment?",
    answer:
      "For websites, we set up on your preferred platform (Vercel, AWS, custom server). You control the domain and CDN. All handoff docs include deployment guides and support contacts.",
  },
  {
    question: "Do you offer post-project support or retainers?",
    answer:
      "Yes. Post-project support available (30 days included, then 2k/month for revisions). Content Rollouts are ongoing retainers with monthly asset sprints, platform optimization, and performance reporting.",
  },
  {
    question: "What if the project changes mid-way?",
    answer:
      "Strategy Lock prevents scope drift. Changes after approval trigger scope adjustments and timeline shifts. We stay transparent on impact. Minor revisions included; major pivots become new line items.",
  },
  {
    question: "How do we stay in touch during production?",
    answer:
      "Kickoff call → Weekly check-ins (async + sync). You see work-in-progress at key milestones for feedback. Final delivery is approval-ready (QA'd and director-signed). All communication via WhatsApp or email.",
  },
]

export function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const headingRef = useGsapEnter<HTMLDivElement>({ preset: "blur-rise", start: "top 88%" })
  const itemsRef = useGsapEnter<HTMLDivElement>({
    preset: "scale-in",
    stagger: 0.06,
    childSelector: "[data-faq-item]",
    start: "top 84%",
  })

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section-shell relative overflow-hidden py-[var(--section-block)]"
    >
      <div className="content-shell">
        <div className="mx-auto max-w-[1120px]">
          {/* Heading */}
          <div ref={headingRef} className="mb-12 text-center sm:mb-16">
            <p className="section-label">Questions</p>
            <TextReveal
              as="h2"
              type="words"
              preset="clip-up"
              stagger={0.08}
              className="section-heading mt-4 text-white"
            >
              Before You Ask
            </TextReveal>
            <p className="body-copy mx-auto mt-6 max-w-[54ch] text-[1rem] leading-7">
              Answers to scope, timeline, pricing, and how we work. If anything else matters, WhatsApp and ask directly.
            </p>
          </div>

          {/* FAQ Items */}
          <div ref={itemsRef} className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expanded === index}
                onToggle={() => setExpanded(expanded === index ? null : index)}
              />
            ))}
          </div>

          {/* Final CTA */}
          <div className="mx-auto mt-12 max-w-[56ch] rounded-[1.75rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 text-center">
            <p className="text-sm leading-7 text-white/74">
              <span className="font-semibold text-white">Still unsure?</span> Send the brief on WhatsApp. Fastest way to clarify scope, timeline, and the right next move.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  question,
  answer,
  isExpanded,
  onToggle,
}: {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      data-faq-item
      className="group rounded-[1.25rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] transition-all duration-300 hover:border-white/12 hover:bg-[linear-gradient(165deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
        aria-expanded={isExpanded}
      >
        <span className="flex-1 text-sm font-semibold leading-6 text-white sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-white/48 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-white/6 px-6 py-5 sm:px-8 sm:py-6">
          <p className="text-sm leading-7 text-white/68">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}
