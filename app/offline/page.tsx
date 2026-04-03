import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Offline | DANVERSE",
  description: "Offline fallback page for DANVERSE visitors returning without a connection.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <main className="section-shell min-h-[100dvh] py-[var(--section-block)] text-white">
      <div className="content-shell">
        <section className="statement-panel mx-auto max-w-[720px] rounded-[2rem] px-6 py-12 text-center sm:px-8">
          <p className="section-label">Offline Mode</p>
          <h1 className="mt-4 text-[clamp(2rem,6vw,3.4rem)] font-bold tracking-[-0.05em] text-white">
            You are offline, but the brief can wait here with you.
          </h1>
          <p className="body-copy mx-auto mt-5 max-w-[34ch] text-[0.98rem] leading-7">
            Core pages stay available from the local cache. Once the connection is back, reload to restore live media
            and analytics.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="cta-primary rounded-full px-6 py-3 text-sm font-semibold text-white">
              Back to Homepage
            </Link>
            <Link href="/" className="cta-secondary rounded-full px-6 py-3 text-sm font-semibold text-white">
              Retry Connection
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
