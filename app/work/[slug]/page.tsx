import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAdjacentWorks, getAllWorkSlugs, getWorkBySlug } from "@/lib/work"
import { CaseStudyVideo } from "./CaseStudyVideo"
import { ProjectNav } from "@/components/work/ProjectNav"
import { BLUR_DARK } from "@/lib/blur"

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
    return { title: "Object not found" }
  }

  return {
    title: `${work.title} - DANVERSE`,
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

  const { previous, next } = getAdjacentWorks(slug)

  return (
    <main className="case-study">
      <section className="case-study__hero">
        {work.cover ? (
          <div className="case-study__hero-media" data-vt={`project-${slug}`} aria-hidden="true">
            <Image src={work.cover} alt="" fill priority quality={75} sizes="100vw" fetchPriority="high" />
          </div>
        ) : null}
        <div className="case-study__hero-copy">
          <p className="tx-label">[ Origin Object ] / {work.category?.toUpperCase() ?? "PROJECT"}</p>
          <h1 className="case-study__title">{work.title}</h1>
          {work.hook ? <p className="case-study__hook">{work.hook}</p> : null}
          <div className="case-study__meta-row">
            {work.year ? <span className="case-study__year">{work.year}</span> : null}
            {work.duration ? <span className="case-study__year">{work.duration}</span> : null}
            {work.tags.map((tag) => (
              <span key={tag} className="case-study__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="case-study__scroll">Scroll for conditions</span>
      </section>

      {work.metrics && work.metrics.length > 0 ? (
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
      ) : null}

      <section className="case-study__content">
        <div className="case-study__content-grid">
          {work.challenge ? (
            <div className="case-study__block">
              <h2 className="case-study__block-title">Challenge</h2>
              <p className="case-study__block-text">{work.challenge}</p>
            </div>
          ) : null}
          {work.approach ? (
            <div className="case-study__block">
              <h2 className="case-study__block-title">Approach</h2>
              <p className="case-study__block-text">{work.approach}</p>
            </div>
          ) : null}
          {work.solution ? (
            <div className="case-study__block">
              <h2 className="case-study__block-title">Solution</h2>
              <p className="case-study__block-text">{work.solution}</p>
            </div>
          ) : null}
        </div>
      </section>

      {work.gallery.length > 0 ? (
        <section className="case-study__gallery">
          <h2 className="case-study__gallery-title">Formation record / {work.gallery.length.toString().padStart(2, "0")}</h2>
          <div className="case-study__gallery-grid">
            {work.gallery.map((image, index) => (
              <div
                key={image}
                className={`case-study__gallery-item ${index === 0 ? "case-study__gallery-item--featured" : ""}`}
              >
                <Image
                  src={image}
                  alt={`${work.title} image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={86}
                  placeholder="blur"
                  blurDataURL={BLUR_DARK}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {work.video ? <CaseStudyVideo src={work.video} title={work.title} /> : null}

      {work.clientQuote ? (
        <section className="case-study__quote">
          <blockquote className="case-study__blockquote">
            <p>&quot;{work.clientQuote.text}&quot;</p>
            <footer>
              <strong>{work.clientQuote.author}</strong>
              <span>{work.clientQuote.role}</span>
            </footer>
          </blockquote>
        </section>
      ) : null}

      <section className="case-study__details">
        <div className="case-study__details-grid">
          {work.roles && work.roles.length > 0 ? (
            <div className="case-study__detail">
              <h3>Roles</h3>
              <ul>
                {work.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {work.tools && work.tools.length > 0 ? (
            <div className="case-study__detail">
              <h3>Tools</h3>
              <ul>
                {work.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {work.duration ? (
            <div className="case-study__detail">
              <h3>Duration</h3>
              <p>{work.duration}</p>
            </div>
          ) : null}
        </div>
      </section>

      <ProjectNav
        previous={previous ? { slug: previous.slug, title: previous.title, category: previous.category } : null}
        next={next ? { slug: next.slug, title: next.title, category: next.category } : null}
      />
    </main>
  )
}
