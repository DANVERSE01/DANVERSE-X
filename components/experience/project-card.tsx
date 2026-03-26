"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import LazyVideo from "@/components/lazy-video"
import { Magnetic } from "@/components/motion/magnetic"
import { useCursorState } from "@/components/motion/cursor-state"
import type { Project } from "@/content/projects"

interface ProjectCardProps {
  index: number
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ index, project, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const { setCursorLabel, clearCursorLabel } = useCursorState()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      <Magnetic>
        <button
          type="button"
          data-project-card={project.id}
          data-cursor="interactive"
          aria-label={`Open ${project.title}`}
          className="group powder-panel chrome-border flex h-full w-full flex-col overflow-hidden rounded-[30px] text-left transition-transform duration-300 hover:-translate-y-1"
          onClick={() => onOpen(project)}
          onMouseEnter={() => setCursorLabel(project.mediaType === "video" ? "Open reel" : "Open case")}
          onMouseLeave={clearCursorLabel}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            {project.mediaType === "video" ? (
              <LazyVideo
                src={project.cover}
                autoplay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                aria-label={project.title}
              />
            ) : (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgb(4_7_12_/_0.9)_100%)]" />
            <div className="absolute left-5 top-5 rounded-full border border-[rgb(199_211_224_/_0.16)] bg-[rgb(4_7_12_/_0.54)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ice)]">
              {project.category}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5 text-[var(--color-pearl)]">
            <div className="space-y-2">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-medium text-[var(--color-ice)]">
                {project.title}
              </h3>
              <p className="text-sm leading-6 text-[rgb(199_211_224_/_0.74)]">{project.hook}</p>
            </div>

            {project.outcome ? (
              <p className="text-sm leading-6 text-[rgb(126_160_200_/_0.8)]">{project.outcome}</p>
            ) : null}

            <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[var(--color-glacial)]">
              Open direction
              <span className="h-px w-10 bg-[rgb(126_160_200_/_0.38)] transition-all duration-300 group-hover:w-14 group-hover:bg-[rgb(199_38_76_/_0.6)]" />
            </span>
          </div>
        </button>
      </Magnetic>
    </motion.div>
  )
}
