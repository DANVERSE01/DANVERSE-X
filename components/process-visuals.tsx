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
    <div className="absolute inset-0 overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(145deg,rgba(10,16,28,0.9),rgba(9,12,22,0.72))] p-4 sm:rounded-[2rem] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(73,107,255,0.16),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(255,47,146,0.14),transparent_28%),radial-gradient(circle_at_52%_88%,rgba(217,255,38,0.08),transparent_26%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function BriefVisual() {
  const reduced = useReducedMotion()
  const nodes = [
    { label: "Offer", className: "left-[6%] top-[18%] sm:left-[8%] sm:top-[24%]" },
    { label: "Audience", className: "left-[10%] bottom-[14%] sm:left-[16%] sm:bottom-[16%]" },
    { label: "Script Angle", className: "right-[5%] top-[18%] sm:right-[10%] sm:top-[26%]" },
    { label: "Visual Tone", className: "right-[10%] bottom-[14%] sm:right-[16%] sm:bottom-[18%]" },
  ]

  return (
    <VisualShell>
      <div className="absolute inset-[10%] rounded-[1.5rem] border border-white/6 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_52%)] sm:inset-[12%] sm:rounded-[2rem]" />
      <div className="absolute inset-x-[18%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/14 to-transparent sm:inset-x-[22%]" />
      <div className="absolute inset-y-[16%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/14 to-transparent sm:inset-y-[18%]" />

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className={`absolute ${node.className} rounded-full border border-white/10 bg-[rgba(11,16,26,0.68)] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/66 backdrop-blur-xl sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.22em]`}
          animate={reduced ? undefined : { y: [0, index % 2 === 0 ? -6 : 6, 0] }}
          transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
        >
          {node.label}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(217,255,38,0.22)] bg-[radial-gradient(circle,rgba(217,255,38,0.12),rgba(11,16,26,0.76)_68%)] shadow-[0_0_42px_rgba(217,255,38,0.12)] sm:h-28 sm:w-28"
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={reduced ? undefined : { ...LOOP, duration: 5.5 }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)] sm:text-[11px] sm:tracking-[0.24em]">
            Creative
          </span>
          <span className="text-[0.85rem] font-semibold tracking-[-0.04em] text-white sm:text-sm">Lock</span>
        </div>
      </motion.div>

      <div className="absolute left-[10%] top-[48%] h-px w-[24%] bg-gradient-to-r from-transparent to-[rgba(217,255,38,0.3)] sm:left-[14%] sm:w-[20%]" />
      <div className="absolute right-[10%] top-[48%] h-px w-[24%] bg-gradient-to-l from-transparent to-[rgba(73,107,255,0.34)] sm:right-[14%] sm:w-[20%]" />
      <div className="absolute left-[40%] top-[20%] h-[20%] w-px bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.16)] sm:left-[42%] sm:top-[24%] sm:h-[22%]" />
      <div className="absolute left-[60%] bottom-[20%] h-[16%] w-px bg-gradient-to-t from-transparent to-[rgba(255,255,255,0.16)] sm:left-[58%] sm:bottom-[24%] sm:h-[18%]" />
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
      <div className="grid h-full grid-rows-[auto_1fr] gap-3 sm:gap-4">
        <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/58 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.22em]">
          Build Sequence
        </div>

        <div className="grid gap-2.5 sm:gap-3">
          {tracks.map((track, index) => (
            <div
              key={track.label}
              className="rounded-[1.15rem] border border-white/8 bg-black/18 p-3 sm:rounded-[1.35rem] sm:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/46 sm:text-[10px] sm:tracking-[0.2em]">
                  {track.label}
                </span>
                <span className="text-[9px] uppercase tracking-[0.14em] text-white/38 sm:text-[10px] sm:tracking-[0.18em]">
                  {track.value}
                </span>
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
      <div className="grid h-full gap-3 sm:gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-3 sm:gap-4">
          <div className="rounded-[1.2rem] border border-white/8 bg-black/18 p-3.5 sm:rounded-[1.4rem] sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/44 sm:text-[10px] sm:tracking-[0.22em]">
              Output Matrix
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 justify-items-start">
              {outputs.map((ratio, index) => (
                <motion.div
                  key={ratio}
                  className="flex h-[56px] w-[56px] items-center justify-center rounded-[0.85rem] border border-white/8 bg-white/[0.03] p-0 text-center sm:h-[72px] sm:w-[72px] sm:rounded-[1rem]"
                  animate={reduced ? undefined : { y: [0, -4, 0] }}
                  transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
                >
                  <div className="text-[1.05rem] font-black tracking-[-0.05em] text-white sm:text-[1.35rem]">
                    {ratio}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-white/8 bg-black/18 p-3.5 sm:rounded-[1.4rem] sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/44 sm:text-[10px] sm:tracking-[0.22em]">
              Distribution Ready
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Paid", "Social", "Launch Pages", "Internal Handoff"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/62 sm:px-3 sm:text-[10px] sm:tracking-[0.18em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 sm:rounded-[1.7rem] sm:p-5">
          <div className="absolute bottom-[16%] left-4 top-[16%] w-px bg-gradient-to-b from-[rgba(73,107,255,0.32)] via-[rgba(255,47,146,0.18)] to-[rgba(217,255,38,0.28)] sm:bottom-[18%] sm:left-[16%] sm:top-[18%]" />
          <div className="absolute left-4 top-[16%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-electric-blue)] shadow-[0_0_16px_rgba(73,107,255,0.42)] sm:left-[16%] sm:top-[18%]" />
          <div className="absolute bottom-[16%] left-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-acid-lime)] shadow-[0_0_16px_rgba(217,255,38,0.34)] sm:bottom-[18%] sm:left-[16%]" />

          <div className="grid h-full content-center gap-2.5 pl-8 sm:gap-3 sm:pl-[22%]">
            {deliverables.map((item, index) => (
              <motion.div
                key={item}
                className="rounded-[1rem] border border-white/8 bg-black/18 px-3.5 py-3 text-[0.92rem] font-medium text-white/76 sm:rounded-[1.15rem] sm:px-4 sm:py-4 sm:text-sm"
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
