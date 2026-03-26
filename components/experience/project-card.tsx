"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import LazyVideo from "@/components/lazy-video"
import { Magnetic } from "@/components/motion/magnetic"
import { useCursorState } from "@/components/motion/cursor-state"
import type { Project } from "@/content/projects"

interface ProjectCardProps {
  index: number
  project: Project
  onOpen: (project: Project) => void
  className?: string
  featured?: boolean
}

export function ProjectCard({
  index,
  project,
  onOpen,
  className,
  featured = false,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const { setCursorLabel, clearCursorLabel } = useCursorState()

  return (
    <motion.div
      className={cn(className, "[perspective:1400px]")}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -8, rotateX: 2.2, rotateY: featured ? -2.4 : -1.5 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.05 }}
    >
      <Magnetic strength={featured ? 12 : 10}>
        <button
          type="button"
          data-project-card={project.id}
          data-cursor="interactive"
          aria-label={`Open ${project.title}`}
          className="group powder-panel micro-edge chrome-border relative flex h-full w-full flex-col overflow-hidden rounded-[30px] text-left transition-[border-color,box-shadow,transform] duration-500 [transform-style:preserve-3d] hover:border-[rgb(47_99_186_/_0.28)] hover:shadow-[0_16px_36px_rgb(4_7_12_/_0.2),0_0_0_1px_rgb(47_99_186_/_0.16)]"
          onClick={() => onOpen(project)}
          onMouseEnter={() => setCursorLabel(project.mediaType === "video" ? "Open reel" : "Open case")}
          onMouseLeave={clearCursorLabel}
        >
          <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-[rgb(238_243_248_/_0.04)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(238_243_248_/_0.22),transparent)] opacity-60" />
          <div className={cn("relative overflow-hidden", featured ? "aspect-[5/4] lg:aspect-[4/3]" : "aspect-[4/5]")}>
            {project.mediaType === "video" ? (
              <LazyVideo
                src={project.cover}
                autoplay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                aria-label={project.title}
              />
            ) : (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgb(238_243_248_/_0.12),transparent_18%),linear-gradient(180deg,transparent_26%,rgb(4_7_12_/_0.9)_100%)]" />
            <div className="absolute inset-0 rounded-t-[30px] ring-1 ring-inset ring-[rgb(47_99_186_/_0)] transition duration-500 group-hover:ring-[rgb(47_99_186_/_0.16)]" />
            <div className="absolute left-5 top-5 rounded-full border border-[rgb(199_211_224_/_0.16)] bg-[rgb(4_7_12_/_0.54)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ice)]">
              {project.category}
            </div>
            <div className="absolute right-5 top-5 rounded-full border border-[rgb(199_211_224_/_0.1)] bg-[rgb(4_7_12_/_0.4)] px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-[var(--color-glacial)]">
              S0{index + 1}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5 text-[var(--color-pearl)] md:p-6">
            <div className="space-y-2">
              <h3 className={cn(
                "font-[family-name:var(--font-space-grotesk)] font-medium text-[var(--color-ice)]",
                featured ? "text-[2rem] leading-tight" : "text-2xl",
              )}>
                {project.title}
              </h3>
              <p className="text-sm leading-6 text-[rgb(199_211_224_/_0.74)]">{project.hook}</p>
            </div>

            {project.outcome ? (
              <p className="text-sm leading-6 text-[rgb(126_160_200_/_0.8)]">{project.outcome}</p>
            ) : null}

            <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[var(--color-glacial)]">
              View specimen
              <span className="h-px w-10 bg-[rgb(126_160_200_/_0.32)] transition-all duration-300 group-hover:w-14 group-hover:bg-[rgb(47_99_186_/_0.55)]" />
            </span>
          </div>
        </button>
      </Magnetic>
    </motion.div>
  )
}
