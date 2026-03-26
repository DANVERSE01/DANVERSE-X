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

  return (
    <section id="work-rail" className="relative px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.76fr)]">
          <div className="space-y-6">
            <MaskReveal className="max-w-max">
              <p className="section-label text-[11px]">Act 02 / Work Rail</p>
            </MaskReveal>
            <SplitReveal
              as="h2"
              text="A curated rail of films, interfaces, launch systems, and premium brand worlds."
              unit="words"
              className="max-w-5xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-tight tracking-[-0.04em] text-[var(--color-base)] md:text-6xl"
            />
          </div>

          <MaskReveal>
            <p className="max-w-xl text-base leading-7 text-[rgb(10_19_37_/_0.72)] md:text-lg">
              The goal is not ornamental motion. Each scene is built from reusable primitives so the site stays
              light, static-export-safe, and maintainable while still feeling authored.
            </p>
          </MaskReveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} onOpen={setActiveProject} />
          ))}
        </div>
      </div>

      {activeProject ? <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} /> : null}
    </section>
  )
}
