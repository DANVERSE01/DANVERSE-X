import Image from "next/image"
import type { Metadata } from "next"
import { ContactCinematic } from "@/app/sections/ContactCinematic"

export const metadata: Metadata = {
  title: "People",
  description: "Admission and contact for DANVERSE.",
}

export default function PeoplePage() {
  return (
    <main className="chapter-page">
      <section className="chapter-hero">
        <div className="section-kicker">
          <span>[ People ]</span>
          <span>Admission</span>
        </div>
        <h1>
          People
          <br />
          enter with
          <br />
          intent
        </h1>
        <p>
          Bring the project when it is ready to be held with discipline. The first conversation decides whether it belongs inside the room.
        </p>
      </section>

      <section className="chapter-copy">
        <div className="chapter-copy__image">
          <Image
            src="/images/work/shelby-alexandria/bridge-sunset-2.webp"
            alt="Precision object study"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={75}
          />
        </div>
        <div>
          <div className="section-kicker">
            <span>No public queue</span>
            <span>Selective cycle</span>
          </div>
          <p>
            The assembly works with a small number of projects at a time so the object can receive enough attention to become specific.
          </p>
        </div>
      </section>

      <ContactCinematic />
    </main>
  )
}
