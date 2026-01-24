import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Revision Policy — DANVERSE",
  description: "Our revision policy ensures transparency and fairness for all clients.",
}

export default function RevisionPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8 md:p-10 border border-white/10">
              <div className="space-y-10">
                <header className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-red-400">Revision Policy</h1>
                  <p className="text-white/50">
                    Our revision policy ensures transparency and fairness for all clients while maintaining quality and
                    efficiency.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">1. Included Revisions</h2>
                  <p className="text-white/60 text-sm leading-relaxed">Each plan includes a set number of revisions:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-white/50 text-sm">
                    <li>Startup Plan: 1 revision included</li>
                    <li>Pro Plan: 2 revisions included</li>
                    <li>Premium Plan: 3 revisions included</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">2. Additional Revisions</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Revisions beyond the included amount will be charged at hourly rates:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-white/50 text-sm">
                    <li>Startup Plan: $35/hour</li>
                    <li>Pro Plan: $55/hour</li>
                    <li>Premium Plan: $60/hour</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">3. Scope of Revisions</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Revisions are meant to refine and adjust the agreed deliverables, not to expand the original scope
                    of work. Significant changes will require a new project agreement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">4. Turnaround Time</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The turnaround time for revisions depends on the complexity of requested changes and current project
                    workload.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">5. Contact Us</h2>
                  <p className="text-white/60 text-sm">
                    Email:{" "}
                    <a href="mailto:danverseai@outlook.com" className="text-red-400 hover:underline">
                      danverseai@outlook.com
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
