import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { contactEmailHref, env } from "@/lib/env"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Revision Policy - DANVERSE",
  description: "Our revision policy ensures transparency and fairness for all clients.",
}

export default function RevisionPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="liquid-glass rounded-2xl border border-white/10 p-8 md:p-10">
              <div className="space-y-10">
                <header className="space-y-3">
                  <h1 className="text-3xl font-bold text-[var(--color-electric-blue-strong)] md:text-4xl">
                    Revision Policy
                  </h1>
                  <p className="text-white/75">
                    Our revision policy ensures transparency and fairness for all clients while maintaining quality and
                    efficiency.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">1. Included Revisions</h2>
                  <p className="text-sm leading-relaxed text-white/60">Each plan includes a set number of revisions:</p>
                  <ul className="list-inside list-disc space-y-1.5 text-sm text-white/75">
                    <li>Startup Plan: 1 revision included</li>
                    <li>Pro Plan: 2 revisions included</li>
                    <li>Premium Plan: 3 revisions included</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">2. Additional Revisions</h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    Revisions beyond the included amount will be charged at hourly rates:
                  </p>
                  <ul className="list-inside list-disc space-y-1.5 text-sm text-white/75">
                    <li>Startup Plan: $35/hour</li>
                    <li>Pro Plan: $55/hour</li>
                    <li>Premium Plan: $60/hour</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">3. Scope of Revisions</h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    Revisions are meant to refine and adjust the agreed deliverables, not to expand the original scope
                    of work. Significant changes will require a new project agreement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">4. Turnaround Time</h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    The turnaround time for revisions depends on the complexity of requested changes and current project
                    workload.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">5. Contact Us</h2>
                  <p className="text-sm text-white/60">
                    Email:{" "}
                    <a href={contactEmailHref} className="accent-link text-[var(--color-hot-pink-strong)]">
                      {env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
