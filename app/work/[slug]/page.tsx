import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllWorkSlugs, getWorkBySlug } from "@/lib/work"
import { CaseStudyVideo } from "./CaseStudyVideo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) {
    return { title: "Signal Lost" }
  }

  return {
    title: `${work.title} — DANVERSE`,
    description: work.hook ?? "DANVERSE work archive",
    openGraph: {
      title: work.title,
      description: work.hook ?? "DANVERSE work archive",
      images: work.cover ? [work.cover] : undefined,
    },
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  return (
    <main className="case-study">
      {/* Hero Section */}
      <section className="case-study__hero">
        <div className="case-study__hero-inner">
          <p className="tx-label">TX-02 / {work.category?.toUpperCase() ?? "CASE FILE"}</p>
          <h1 className="case-study__title">{work.title}</h1>
          {work.hook && <p className="case-study__hook">{work.hook}</p>}
          
          <div className="case-study__meta-row">
            {work.year && <span className="case-study__year">{work.year}</span>}
            {work.tags.length > 0 && (
              <div className="case-study__tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="case-study__tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {work.cover && (
        <section className="case-study__cover">
          <div className="case-study__cover-image">
            <Image 
              src={work.cover} 
              alt={work.title} 
              fill 
              sizes="100vw" 
              priority 
              quality={90}
            />
          </div>
        </section>
      )}

      {/* Metrics */}
      {work.metrics && work.metrics.length > 0 && (
        <section className="case-study__metrics">
          <div className="case-study__metrics-grid">
            {work.metrics.map((metric) => (
              <div key={metric.label} className="case-study__metric">
                <span className="case-study__metric-value">{metric.value}</span>
                <span className="case-study__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenge & Approach */}
      <section className="case-study__content">
        <div className="case-study__content-grid">
          {work.challenge && (
            <div className="case-study__block">
              <h2 className="case-study__block-title">The Challenge</h2>
              <p className="case-study__block-text">{work.challenge}</p>
            </div>
          )}
          {work.approach && (
            <div className="case-study__block">
              <h2 className="case-study__block-title">Our Approach</h2>
              <p className="case-study__block-text">{work.approach}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {work.gallery.length > 0 && (
        <section className="case-study__gallery">
          <h2 className="case-study__gallery-title">Gallery</h2>
          <div className="case-study__gallery-grid">
            {work.gallery.map((image, index) => (
              <div 
                key={image} 
                className={`case-study__gallery-item ${index === 0 ? "case-study__gallery-item--featured" : ""}`}
              >
                <Image
                  src={image}
                  alt={`${work.title} — Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={85}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Showcase */}
      {work.video && <CaseStudyVideo src={work.video} title={work.title} />}

      {/* Client Quote */}
      {work.clientQuote && (
        <section className="case-study__quote">
          <blockquote className="case-study__blockquote">
            <p>&ldquo;{work.clientQuote.text}&rdquo;</p>
            <footer>
              <strong>{work.clientQuote.author}</strong>
              <span>{work.clientQuote.role}</span>
            </footer>
          </blockquote>
        </section>
      )}

      {/* Project Details */}
      <section className="case-study__details">
        <div className="case-study__details-grid">
          {work.roles && work.roles.length > 0 && (
            <div className="case-study__detail">
              <h3>Roles</h3>
              <ul>
                {work.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          )}
          {work.tools && work.tools.length > 0 && (
            <div className="case-study__detail">
              <h3>Tools</h3>
              <ul>
                {work.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          )}
          {work.duration && (
            <div className="case-study__detail">
              <h3>Duration</h3>
              <p>{work.duration}</p>
            </div>
          )}
        </div>
      </section>

      {/* Next Project */}
      {work.nextProject && (
        <section className="case-study__next">
          <Link href={`/work/${work.nextProject}`} className="case-study__next-link">
            <span className="tx-label">Next Project</span>
            <span className="case-study__next-arrow">→</span>
          </Link>
        </section>
      )}
    </main>
  )
}
