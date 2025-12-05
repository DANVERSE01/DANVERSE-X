import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions — DANVERSE",
  description: "Terms and conditions for DANVERSE creative services.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8 md:p-10 border border-white/10">
              <div className="space-y-10">
                <header className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-red-400">Terms and Conditions</h1>
                  <p className="text-white/50">
                    Welcome to DANVERSE. By accessing our website, you agree to these terms and conditions.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    These Terms and Conditions govern your use of the DANVERSE website and services. By using our
                    website, you accept these Terms in full.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">2. Intellectual Property Rights</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Unless otherwise stated, DANVERSE owns all the project files. This includes all electronic files,
                    drawings, source files, and any materials provided to the client.
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-white/50 text-sm">
                    <li>You must not republish material from this site.</li>
                    <li>
                      You must not reproduce, duplicate, or copy material for commercial purposes without permission.
                    </li>
                    <li>You must not edit or modify any content without consent.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">3. Acceptable Use</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    You must not use this website in any way that causes, or may cause, damage to the website or
                    impairment of the availability or accessibility of the website.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">4. Limitation of Liability</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    DANVERSE will not be liable for any direct, indirect, or consequential loss or damage arising under
                    these Terms. Revisions are governed by our{" "}
                    <Link href="/revisions" className="text-red-400 hover:underline">
                      revision policy
                    </Link>
                    .
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">5. Changes to These Terms</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We may revise these Terms from time to time. The revised Terms will apply from the date of
                    publication on this site.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-white">6. Contact Us</h2>
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
