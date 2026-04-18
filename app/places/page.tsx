import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Places",
  description: "Production places inside the DANVERSE assembly.",
}

const PLACES = [
  {
    title: "Lower hall",
    status: "Strategy room",
    desc: "Market pressure, audience movement, and visual debt are examined before the work is allowed to take shape.",
  },
  {
    title: "Image chamber",
    status: "Visual formation",
    desc: "Product images, campaign stills, and editorial frames are held until the object feels inevitable.",
  },
  {
    title: "Motion passage",
    status: "Film and rhythm",
    desc: "Motion is cut for attention without becoming loud. The pacing stays calm, direct, and difficult to ignore.",
  },
  {
    title: "Interface vault",
    status: "Digital surface",
    desc: "Web pages and interaction states are composed as rooms, not as generic marketing sections.",
  },
  {
    title: "Release desk",
    status: "QA and handoff",
    desc: "Every file, route, button, and media object is checked before the work leaves the assembly.",
  },
]

export default function PlacesPage() {
  return (
    <main className="places-page">
      <section className="places-page__hero">
        <div className="section-kicker">
          <span>[ Places ]</span>
          <span>Controlled environments</span>
        </div>
        <h1>
          Places
          <br />
          hold the
          <br />
          work
        </h1>
        <p>
          Each place is a condition for making. Strategy, image, motion, interface, and release are separated so the final object can stay coherent.
        </p>
      </section>

      <section className="chapter-copy">
        <div>
          <div className="section-kicker">
            <span>Origin</span>
            <span>Alexandria</span>
          </div>
          <p>
            DANVERSE does not treat services as shelves. Each capability is a room with its own pressure, language, and exit rules.
          </p>
        </div>
        <div className="chapter-copy__image">
          <Image
            src="/images/work/shelby-alexandria/stanley-golden.webp"
            alt="Alexandria location study"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={75}
          />
        </div>
      </section>

      <section className="places-page__grid">
        {PLACES.map((place, index) => (
          <article className="places-page__item" key={place.title}>
            <span>{String(index + 1)}</span>
            <div>
              <div className="section-kicker">
                <span>{place.status}</span>
              </div>
              <h2>{place.title}</h2>
            </div>
            <p>{place.desc}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
