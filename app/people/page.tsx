import Image from "next/image"
import type { Metadata } from "next"
import { ContactCinematic } from "@/app/sections/ContactCinematic"

export const metadata: Metadata = {
  title: "Admission — DANVERSE",
  description: "DANVERSE accepts projects on a selective cycle. Bring a brand, campaign, or digital surface that needs discipline.",
}

export default function PeoplePage() {
  return (
    <main className="chapter-page">
      <section className="chapter-hero">
        <div className="section-kicker">
          <span>[ Admission ]</span>
          <span>Selective intake</span>
        </div>
        <h1>
          Work begins
          <br />
          with the
          <br />
          right brief
        </h1>
        <p>
          The assembly works on a selective cycle. Bring a project when it is ready to be formed — not when it needs to be saved.
        </p>
      </section>

      <section className="chapter-copy">
        <div>
          <div className="section-kicker">
            <span>What we need</span>
            <span>From you</span>
          </div>
          <p>
            A clear object. A brand that needs a visual system, a product that needs a campaign, a motion piece that needs direction, or a digital surface that needs to behave. The brief does not need to be perfect — the conditions do.
          </p>
          <p>
            The assembly is not a production vendor. It does not take briefs that require speed over discipline. Projects accepted here are shaped, not processed.
          </p>
        </div>
        <div className="chapter-copy__image">
          <Image
            src="/images/work/shelby-alexandria/bridge-sunset-2.webp"
            alt="Stanley Bridge, Alexandria — point of origin"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </section>

      <ContactCinematic />
    </main>
  )
}
