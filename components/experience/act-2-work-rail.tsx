"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { MaskReveal } from "@/components/motion/mask-reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { projects, type Project } from "@/content/projects"
import { ProjectCard } from "@/components/experience/project-card"

const ProjectOverlay = dynamic(
  () => import("@/components/experience/project-overlay").then((mod) => mod.ProjectOverlay),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function Act2WorkRail() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const cardLayout = [
    { className: "md:col-span-7 xl:col-span-5", featured: true },
    { className: "md:col-span-5 xl:col-span-3", featured: false },
    { className: "md:col-span-5 xl:col-span-3", featured: false },
    { className: "md:col-span-7 xl:col-span-4", featured: true },
  ] as const

  return (
    <section id="work-rail" className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(47_99_186_/_0.1),transparent_18%),radial-gradient(circle_at_82%_14%,rgb(62_43_45_/_0.08),transparent_18%),linear-gradient(180deg,rgb(10_19_37_/_0.18),rgb(4_7_12_/_0.52))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(238_243_248_/_0.16),transparent)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.76fr)]">
          <div className="space-y-6">
            <MaskReveal className="max-w-max">
              <p className="section-label text-[10px]">Specimen 03 / Work Rail</p>
            </MaskReveal>
            <SplitReveal
              as="h2"
              text="Selected specimens from the current release cycle."
              unit="words"
              className="max-w-5xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-tight tracking-[-0.04em] text-[var(--color-ice)] md:text-6xl"
            />
          </div>

          <MaskReveal>
            <p className="max-w-xl text-base leading-7 text-[rgb(199_211_224_/_0.74)] md:text-lg">
              Each card compresses film, interface, and offer strategy into a single object. The layout stays
              curated, the motion stays restrained, and the build stays light enough for static export.
            </p>
          </MaskReveal>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              project={project}
              onOpen={setActiveProject}
              featured={cardLayout[index]?.featured}
              className={cardLayout[index]?.className}
            />
          ))}
        </div>
      </div>

      {activeProject ? <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} /> : null}
    </section>
  )
}
