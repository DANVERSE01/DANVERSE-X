import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — DANVERSE",
  description: "DANVERSE is a creative direction practice based in Alexandria. Brand systems, motion, CGI, and digital surfaces for clients who need work that holds.",
}

const CAPABILITIES = [
  ["Brand Identity", "Complete visual systems — mark, guidelines, rollout"],
  ["Motion Design", "Frame-by-frame motion for campaigns, social, broadcast"],
  ["CGI & 3D", "Photorealistic product and environment renders"],
  ["Campaign Direction", "End-to-end creative direction from brief to delivery"],
  ["Social Content", "Platform-native content tuned for GCC audiences"],
  ["Digital Design", "UI and web surfaces where form serves function"],
  ["Creative Strategy", "Research-led direction before any image is made"],
]

export default function AboutPage() {
  return (
    <main className="chapter-page">
      <section className="chapter-hero">
        <div className="section-kicker">
          <span>[ About ]</span>
          <span>Private creative practice</span>
        </div>
        <h1>
          The room
          <br />
          before
          <br />
          release
        </h1>
        <p>
          Creative direction, motion, CGI, and digital surfaces — formed under discipline, released when the system holds.
        </p>
      </section>

      <section className="chapter-copy">
        <div>
          <div className="section-kicker">
            <span>Practice</span>
            <span>Alexandria → GCC</span>
          </div>
          <p>
            DANVERSE operates as a private creative practice. The work begins before the brief is written and ends only when every surface — image, motion, interface — reads as one object.
          </p>
          <p>
            The studio accepts a small number of projects per cycle so each one receives enough attention to become specific. Generic output is not a risk — it is an impossibility under these conditions.
          </p>
        </div>
        <div className="chapter-copy__image">
          <Image
            src="/images/work/kova-cosmetics/model-lifestyle.webp"
            alt="Editorial campaign image — KOVA Cosmetics"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </section>

      <section className="about-conditions">
        <div className="section-kicker">
          <span>[ Conditions ]</span>
          <span>How we work</span>
        </div>
        <div className="about-conditions__grid">
          <div className="about-conditions__copy">
            <p>
              Every project is an origin object. Brand systems are built for coherence across all surfaces. Motion is cut for attention without becoming loud. CGI is used when the image cannot be achieved any other way.
            </p>
            <p>
              The clients are beauty brands, automotive studios, and luxury operators in the GCC market. The common condition is that they need the work to feel formed, not assembled. Authority without announcement.
            </p>
            <Link href="/people" className="assembly-button">
              Seek admission
            </Link>
          </div>
          <div className="about-conditions__image">
            <Image
              src="/images/work/shelby-alexandria/garage-front.webp"
              alt="Shelby GT350 — Alexandria CGI"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              quality={80}
            />
          </div>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="section-kicker">
          <span>[ Capabilities ]</span>
          <span>What the rooms produce</span>
        </div>
        <h2>
          Seven forms,
          <br />
          one standard
        </h2>
        <div className="about-capabilities__list">
          {CAPABILITIES.map(([title, desc]) => (
            <div key={title} className="about-capabilities__item">
              <span className="about-capabilities__marker" aria-hidden="true">+</span>
              <div>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
