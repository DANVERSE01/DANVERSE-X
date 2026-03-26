"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { X } from "lucide-react"
import LazyVideo from "@/components/lazy-video"
import { FLIPOverlay } from "@/components/motion/flip-overlay"
import { WaCtaButton } from "@/components/wa-cta-button"
import type { Project } from "@/content/projects"

function OverlayBody({
  close,
  project,
}: {
  close: () => void
  project: Project
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 500 : 180,
    damping: reduceMotion ? 60 : 28,
    mass: 0.25,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [close])

  return (
    <div className="flex h-full w-full flex-col bg-[linear-gradient(180deg,rgb(4_7_12_/_0.98),rgb(10_19_37_/_0.94))] text-[var(--color-pearl)]">
      <div className="flex items-start justify-between gap-6 border-b border-[rgb(199_211_224_/_0.08)] px-5 py-5 md:px-7">
        <div className="space-y-3">
          <p className="section-label text-[10px]">{project.category}</p>
          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-medium text-[var(--color-ice)] md:text-4xl">
              {project.title}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-[rgb(199_211_224_/_0.74)] md:text-base">{project.hook}</p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close project overlay"
          data-cursor="interactive"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(199_211_224_/_0.12)] bg-[rgb(255_255_255_/_0.04)] text-[var(--color-ice)] transition-colors hover:border-[rgb(199_38_76_/_0.4)] hover:text-[var(--color-rose)]"
          onClick={close}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <motion.div className="h-px origin-left bg-[var(--color-crimson)]" style={{ scaleX: progress }} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-7">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,1fr)] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-0">
            <div className="relative overflow-hidden rounded-[28px] border border-[rgb(199_211_224_/_0.08)] bg-[rgb(255_255_255_/_0.04)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                {project.mediaType === "video" ? (
                  <LazyVideo
                    src={project.cover}
                    autoplay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label={project.title}
                  />
                ) : (
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgb(4_7_12_/_0.84)_100%)]" />
              </div>
            </div>

            {project.outcome ? (
              <div className="rounded-[24px] border border-[rgb(126_160_200_/_0.18)] bg-[rgb(255_255_255_/_0.03)] p-5">
                <p className="section-label text-[10px]">Outcome</p>
                <p className="mt-3 text-sm leading-7 text-[rgb(199_211_224_/_0.76)] md:text-base">{project.outcome}</p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {project.beats.map((beat, index) => (
              <motion.article
                key={`${project.id}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="rounded-[26px] border border-[rgb(199_211_224_/_0.08)] bg-[rgb(255_255_255_/_0.03)] p-5 md:p-6"
              >
                <p className="section-label text-[10px]">Beat 0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-[rgb(199_211_224_/_0.78)] md:text-base">{beat}</p>
              </motion.article>
            ))}

            <div className="rounded-[28px] border border-[rgb(47_99_186_/_0.2)] bg-[rgb(255_255_255_/_0.04)] p-5 md:p-6">
              <p className="section-label text-[10px]">Next Move</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgb(199_211_224_/_0.78)] md:text-base">
                If this structure fits the brief, we can map your offer into a similar sequence and wire the CTA
                into the same conversion path already used across the site.
              </p>
              <div className="mt-5">
                <WaCtaButton
                  source={`project-overlay-${project.id}`}
                  label={project.ctaLabel ?? "Start this direction"}
                  className="rounded-full border border-[rgb(47_99_186_/_0.3)] bg-[var(--color-cobalt)] px-6 text-[var(--color-ice)] hover:bg-[var(--color-crimson)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <FLIPOverlay originId={project.id} onClosed={onClose}>
      {({ close }) => <OverlayBody project={project} close={close} />}
    </FLIPOverlay>
  )
}
