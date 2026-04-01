"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type ProcessVisualMode = "brief" | "build" | "launch"

const LOOP = {
  duration: 8,
  ease: "easeInOut",
  repeat: Number.POSITIVE_INFINITY,
} as const

export function ProcessVisual({ mode }: { mode: ProcessVisualMode }) {
  switch (mode) {
    case "brief":
      return <BriefVisual />
    case "build":
      return <BuildVisual />
    case "launch":
      return <LaunchVisual />
    default:
      return null
  }
}

function VisualShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(10,16,28,0.9),rgba(9,12,22,0.72))] p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(73,107,255,0.16),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(255,47,146,0.14),transparent_28%),radial-gradient(circle_at_52%_88%,rgba(217,255,38,0.08),transparent_26%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function BriefVisual() {
  const reduced = useReducedMotion()
  const nodes = [
    { label: "Offer", className: "left-[8%] top-[24%]" },
    { label: "Audience", className: "left-[16%] bottom-[16%]" },
    { label: "Script Angle", className: "right-[10%] top-[26%]" },
    { label: "Visual Tone", className: "right-[16%] bottom-[18%]" },
  ]

  return (
    <VisualShell>
      <div className="absolute inset-[12%] rounded-[2rem] border border-white/6 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_52%)]" />
      <div className="absolute inset-x-[22%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="absolute inset-y-[18%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/14 to-transparent" />

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className={`absolute ${node.className} rounded-full border border-white/10 bg-[rgba(11,16,26,0.68)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/66 backdrop-blur-xl`}
          animate={reduced ? undefined : { y: [0, index % 2 === 0 ? -6 : 6, 0] }}
          transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
        >
          {node.label}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(217,255,38,0.22)] bg-[radial-gradient(circle,rgba(217,255,38,0.12),rgba(11,16,26,0.76)_68%)] shadow-[0_0_42px_rgba(217,255,38,0.12)]"
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={reduced ? undefined : { ...LOOP, duration: 5.5 }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-acid-lime)]">
            Creative
          </span>
          <span className="text-sm font-semibold tracking-[-0.04em] text-white">Lock</span>
        </div>
      </motion.div>

      <div className="absolute left-[14%] top-[48%] h-px w-[20%] bg-gradient-to-r from-transparent to-[rgba(217,255,38,0.3)]" />
      <div className="absolute right-[14%] top-[48%] h-px w-[20%] bg-gradient-to-l from-transparent to-[rgba(73,107,255,0.34)]" />
      <div className="absolute left-[42%] top-[24%] h-[22%] w-px bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.16)]" />
      <div className="absolute left-[58%] bottom-[24%] h-[18%] w-px bg-gradient-to-t from-transparent to-[rgba(255,255,255,0.16)]" />
    </VisualShell>
  )
}

function BuildVisual() {
  const reduced = useReducedMotion()
  const tracks = [
    { label: "Scene Arc", value: "Structure", accent: "from-[var(--color-electric-blue)] to-[rgba(73,107,255,0.3)]" },
    { label: "Motion Cadence", value: "Pacing", accent: "from-[var(--color-hot-pink)] to-[rgba(255,47,146,0.3)]" },
    { label: "Finish System", value: "Grade", accent: "from-[var(--color-acid-lime)] to-[rgba(217,255,38,0.24)]" },
  ]

  return (
    <VisualShell>
      <div className="grid h-full grid-rows-[auto_1fr] gap-4">
        <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/58">
          Build Sequence
        </div>

        <div className="grid gap-3">
          {tracks.map((track, index) => (
            <div key={track.label} className="rounded-[1.35rem] border border-white/8 bg-black/18 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                  {track.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/38">{track.value}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/8">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${track.accent}`}
                  animate={reduced ? undefined : { width: ["22%", "88%", "22%"] }}
                  transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
                />
              </div>
              <div className="mt-3 grid grid-cols-8 gap-1.5">
                {Array.from({ length: 8 }).map((_, barIndex) => (
                  <motion.span
                    key={`${track.label}-${barIndex}`}
                    className="block rounded-full bg-white/8"
                    style={{ height: 6 + ((barIndex + index) % 4) * 4 }}
                    animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                    transition={reduced ? undefined : { ...LOOP, duration: 4 + barIndex * 0.35 + index }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  )
}

function LaunchVisual() {
  const reduced = useReducedMotion()
  const outputs = ["9:16", "1:1", "16:9"]
  const deliverables = ["Master Exports", "Vertical Cutz", "Thumbnail Covers", "Launch Notes"]

  return (
    <VisualShell>
      <div className="grid h-full gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-4">
          <div className="rounded-[1.4rem] border border-white/8 bg-black/18 p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/44">Output Matrix</div>
            <div className="mt-4 grid grid-cols-3 gap-3 justify-items-start">
              {outputs.map((ratio, index) => (
                <motion.div
                  key={ratio}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[1rem] border border-white/8 bg-white/[0.03] p-0 text-center"
                  animate={reduced ? undefined : { y: [0, -4, 0] }}
                  transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
                >
                  <div className="text-[1.35rem] font-black tracking-[-0.05em] text-white">{ratio}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/8 bg-black/18 p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/44">Distribution Ready</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Paid", "Social", "Launch Pages", "Internal Handoff"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/62"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
          <div className="absolute left-[16%] top-[18%] bottom-[18%] w-px bg-gradient-to-b from-[rgba(73,107,255,0.32)] via-[rgba(255,47,146,0.18)] to-[rgba(217,255,38,0.28)]" />
          <div className="absolute left-[16%] top-[18%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-electric-blue)] shadow-[0_0_16px_rgba(73,107,255,0.42)]" />
          <div className="absolute left-[16%] bottom-[18%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_16px_rgba(217,255,38,0.34)]" />

          <div className="grid h-full content-center gap-3 pl-[22%]">
            {deliverables.map((item, index) => (
              <motion.div
                key={item}
                className="rounded-[1.15rem] border border-white/8 bg-black/18 px-4 py-4 text-sm font-medium text-white/76"
                animate={reduced ? undefined : { x: [0, 8, 0] }}
                transition={reduced ? undefined : { ...LOOP, duration: 7 + index }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  )
}
