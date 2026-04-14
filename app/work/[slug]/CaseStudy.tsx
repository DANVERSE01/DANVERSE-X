"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { WorkItem } from "@/lib/work"
import { getWorkBySlug } from "@/lib/work"

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function MetricCard({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      style={{
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        border: "1px solid rgba(200,255,0,0.12)",
        borderRadius: "8px",
        background: "rgba(200,255,0,0.03)",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 600,
          color: "#c8ff00",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          display: "block",
          marginTop: "0.5rem",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(240,240,240,0.5)",
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function CaseStudy({ work }: { work: WorkItem }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const nextWork = work.nextProject ? getWorkBySlug(work.nextProject) : null

  return (
    <main style={{ background: "#050507", color: "#f0f0f0", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {work.cover ? (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              y: heroY,
              opacity: heroOpacity,
            }}
          >
            <Image
              src={work.cover}
              alt={work.title}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #050507 0%, rgba(5,5,7,0.4) 40%, rgba(5,5,7,0.1) 100%)",
              }}
            />
          </motion.div>
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#0a0a0c" }} />
        )}

        <div
          style={{
            position: "relative",
            width: "var(--container, min(90rem, 92vw))",
            margin: "0 auto",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c8ff00",
              marginBottom: "1rem",
            }}
          >
            {work.category}
            {work.year ? ` — ${work.year}` : ""}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            style={{
              fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
              fontSize: "clamp(2.5rem, 2rem + 5vw, 7rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "50rem",
            }}
          >
            {work.title}
          </motion.h1>

          {work.hook ? (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              style={{
                marginTop: "1.5rem",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: 1.5,
                color: "rgba(240,240,240,0.6)",
                maxWidth: "36rem",
              }}
            >
              {work.hook}
            </motion.p>
          ) : null}
        </div>
      </section>

      {/* Project Info Bar */}
      <section
        style={{
          width: "var(--container, min(90rem, 92vw))",
          margin: "0 auto",
          padding: "clamp(2rem, 4vw, 3rem) 0",
          borderBottom: "1px solid rgba(200,255,0,0.08)",
        }}
      >
        <FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {work.roles?.length ? (
              <div>
                <span style={labelStyle}>Role</span>
                <span style={valueStyle}>{work.roles.join(", ")}</span>
              </div>
            ) : null}
            {work.duration ? (
              <div>
                <span style={labelStyle}>Duration</span>
                <span style={valueStyle}>{work.duration}</span>
              </div>
            ) : null}
            {work.tools?.length ? (
              <div>
                <span style={labelStyle}>Tools</span>
                <span style={valueStyle}>{work.tools.join(", ")}</span>
              </div>
            ) : null}
            {work.year ? (
              <div>
                <span style={labelStyle}>Year</span>
                <span style={valueStyle}>{work.year}</span>
              </div>
            ) : null}
          </div>
        </FadeUp>
      </section>

      {/* Challenge & Approach */}
      <section
        style={{
          width: "var(--container, min(90rem, 92vw))",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 7rem) 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
          gap: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {(work.challenge ?? work.hook) ? (
          <FadeUp>
            <p style={sectionLabel}>The Challenge</p>
            <p style={bodyText}>{work.challenge ?? work.hook}</p>
          </FadeUp>
        ) : null}
        {(work.approach ?? work.solution) ? (
          <FadeUp delay={0.15}>
            <p style={sectionLabel}>The Approach</p>
            <p style={bodyText}>{work.approach ?? work.solution}</p>
          </FadeUp>
        ) : null}
      </section>

      {/* Gallery */}
      {work.gallery.length > 0 ? (
        <section
          style={{
            width: "var(--container, min(90rem, 92vw))",
            margin: "0 auto",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            display: "grid",
            gridTemplateColumns: work.gallery.length === 1 ? "1fr" : "repeat(auto-fit, minmax(min(100%, 24rem), 1fr))",
            gap: "1rem",
          }}
        >
          {work.gallery.map((src, i) => (
            <FadeUp key={src} delay={i * 0.1}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(200,255,0,0.06)",
                }}
              >
                <Image src={src} alt={`${work.title} — ${i + 1}`} fill sizes="(max-width: 959px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            </FadeUp>
          ))}
        </section>
      ) : null}

      {/* Metrics */}
      {work.metrics?.length ? (
        <section
          style={{
            width: "var(--container, min(90rem, 92vw))",
            margin: "0 auto",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
          }}
        >
          <FadeUp>
            <p style={{ ...sectionLabel, marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>Results</p>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(work.metrics.length, 3)}, 1fr)`,
              gap: "1rem",
            }}
          >
            {work.metrics.map((m, i) => (
              <MetricCard key={m.label} label={m.label} value={m.value} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Client Quote */}
      {work.clientQuote ? (
        <section
          style={{
            width: "var(--container, min(90rem, 92vw))",
            margin: "0 auto",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
          }}
        >
          <FadeUp>
            <blockquote
              style={{
                maxWidth: "48rem",
                margin: "0 auto",
                textAlign: "center",
                padding: "clamp(2rem, 4vw, 3.5rem)",
                border: "1px solid rgba(200,255,0,0.08)",
                borderRadius: "12px",
                background: "rgba(200,255,0,0.02)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "rgba(240,240,240,0.85)",
                }}
              >
                &ldquo;{work.clientQuote.text}&rdquo;
              </p>
              <footer style={{ marginTop: "1.25rem" }}>
                <span style={{ color: "#c8ff00", fontWeight: 600, fontSize: "0.875rem" }}>
                  {work.clientQuote.author}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "rgba(240,240,240,0.4)",
                    marginTop: "0.25rem",
                  }}
                >
                  {work.clientQuote.role}
                </span>
              </footer>
            </blockquote>
          </FadeUp>
        </section>
      ) : null}

      {/* Tags */}
      {work.tags.length > 0 ? (
        <section
          style={{
            width: "var(--container, min(90rem, 92vw))",
            margin: "0 auto",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            borderTop: "1px solid rgba(200,255,0,0.06)",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.4rem 1rem",
                    border: "1px solid rgba(200,255,0,0.15)",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(240,240,240,0.6)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </section>
      ) : null}

      {/* Next Project */}
      {nextWork ? (
        <section
          style={{
            borderTop: "1px solid rgba(200,255,0,0.08)",
            padding: "clamp(4rem, 8vw, 7rem) 0",
          }}
        >
          <FadeUp>
            <Link
              href={`/work/${nextWork.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div
                style={{
                  width: "var(--container, min(90rem, 92vw))",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "2rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(240,240,240,0.4)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Next Project
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display, 'Clash Display', sans-serif)",
                      fontSize: "clamp(1.75rem, 3vw, 3rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {nextWork.title}
                  </h2>
                  {nextWork.category ? (
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "rgba(240,240,240,0.5)",
                      }}
                    >
                      {nextWork.category}
                    </p>
                  ) : null}
                </div>
                <span
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#c8ff00",
                    transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          </FadeUp>
        </section>
      ) : null}

      {/* Back to Archive */}
      <section
        style={{
          width: "var(--container, min(90rem, 92vw))",
          margin: "0 auto",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <Link
            href="/work"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              border: "1px solid rgba(200,255,0,0.2)",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(240,240,240,0.6)",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            ← All Projects
          </Link>
        </FadeUp>
      </section>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(240,240,240,0.35)",
  marginBottom: "0.4rem",
}

const valueStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  color: "rgba(240,240,240,0.8)",
  lineHeight: 1.5,
}

const sectionLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#c8ff00",
  marginBottom: "1rem",
}

const bodyText: React.CSSProperties = {
  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
  lineHeight: 1.7,
  color: "rgba(240,240,240,0.65)",
  maxWidth: "36rem",
}
