import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "About the DANVERSE creative assembly.",
}

export default function AboutPage() {
  return (
    <main className="chapter-page">
      <section className="chapter-hero">
        <div className="section-kicker">
          <span>[ About ]</span>
          <span>Private creative assembly</span>
        </div>
        <h1>
          The room
          <br />
          before the
          <br />
          release
        </h1>
        <p>
          DANVERSE coordinates brand systems, motion films, and digital places for clients who need the work to feel formed, not decorated.
        </p>
      </section>

      <section className="chapter-copy">
        <div>
          <div className="section-kicker">
            <span>Coherence</span>
            <span>Coordination</span>
          </div>
          <p>
            The assembly exists to keep image, movement, interface, and message in the same room. Each decision is measured against the object it helps create.
          </p>
          <p>
            Participation changes by project. The rule stays constant: fewer visible claims, stronger visible work.
          </p>
        </div>
        <div className="chapter-copy__image">
          <Image
            src="/images/work/kova-cosmetics/model-lifestyle.webp"
            alt="Editorial campaign image"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={75}
          />
        </div>
      </section>
    </main>
  )
}
