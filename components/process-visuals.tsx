"use client"

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

function BriefVisual() {
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(10,16,28,0.9),rgba(10,13,22,0.68))] p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,255,0,0.16),transparent_28%),radial-gradient(circle_at_78%_70%,rgba(255,47,146,0.16),transparent_32%),radial-gradient(circle_at_74%_24%,rgba(73,107,255,0.18),transparent_34%)]" />
      <div className="relative grid h-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="inline-flex rounded-full bg-[var(--color-acid-lime)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-bg)]">
            Danverse Method
          </div>
          {["Hook first", "Taste locked", "Frame references aligned"].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-[1.15rem] border border-white/10 bg-black/20 px-4 py-4 text-sm font-medium text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              animate={reduced ? undefined : { x: [0, 5, 0] }}
              transition={reduced ? undefined : { ...LOOP, duration: 7 + index }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-[280px]">
          <motion.div
            className="absolute left-[6%] top-[12%] h-[52%] w-[34%] rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(162,197,255,0.18),rgba(255,255,255,0.02))] shadow-[0_30px_70px_rgba(0,0,0,0.22)]"
            animate={reduced ? undefined : { y: [-6, 6, -6], rotate: [-3, -1, -3] }}
            transition={reduced ? undefined : { ...LOOP, duration: 9 }}
          >
            <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/58">Offer</span>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-[rgba(73,107,255,0.8)] to-transparent" />
          </motion.div>

          <motion.div
            className="absolute bottom-[4%] right-[8%] h-[42%] w-[48%] rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_30px_70px_rgba(0,0,0,0.22)]"
            animate={reduced ? undefined : { y: [6, -6, 6], rotate: [5, 2, 5] }}
            transition={reduced ? undefined : { ...LOOP, duration: 10 }}
          >
            <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/58">Visual Tone</span>
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_42%,rgba(255,47,146,0.22),transparent_36%)]" />
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-[rgba(255,47,146,0.72)] to-transparent" />
          </motion.div>

          <div className="absolute inset-x-[20%] top-[42%] flex items-center justify-between">
            <span className="h-px w-[28%] bg-gradient-to-r from-transparent via-[rgba(214,255,0,0.68)] to-[rgba(214,255,0,0.18)]" />
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(214,255,0,0.32)] bg-[rgba(214,255,0,0.12)] shadow-[0_0_36px_rgba(214,255,0,0.18)]"
              animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
              transition={reduced ? undefined : { ...LOOP, duration: 5 }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-acid-lime)]" />
            </motion.div>
            <span className="h-px w-[28%] bg-gradient-to-r from-[rgba(214,255,0,0.18)] via-[rgba(214,255,0,0.68)] to-transparent" />
          </div>

          <div className="absolute left-[20%] top-[52%] text-[10px] uppercase tracking-[0.22em] text-white/46">Audience</div>
          <div className="absolute left-[42%] top-[30%] text-[10px] uppercase tracking-[0.22em] text-white/46">Angle</div>
          <div className="absolute right-[8%] top-[18%] rounded-full border border-white/10 bg-black/24 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/56">
            Script Logic
          </div>
        </div>
      </div>
    </div>
  )
}

function BuildVisual() {
  const reduced = useReducedMotion()
  const columns = [
    { label: "Shot / Light", height: "60%", accent: "rgba(118,162,255,0.38)" },
    { label: "Motion / Pace", height: "88%", accent: "rgba(118,162,255,0.5)" },
    { label: "Grade / Finish", height: "70%", accent: "rgba(255,47,146,0.34)" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(10,16,28,0.9),rgba(9,12,22,0.68))] p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(73,107,255,0.18),transparent_32%),radial-gradient(circle_at_84%_76%,rgba(255,47,146,0.12),transparent_28%)]" />
      <div className="absolute left-[6%] top-[42%] text-[clamp(3.4rem,8vw,6rem)] font-black tracking-[-0.08em] text-white/[0.06]">FRAME</div>

      <div className="relative flex h-full items-end gap-4">
        {columns.map((column, index) => (
          <motion.div
            key={column.label}
            className="relative flex-1 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]"
            style={{ height: column.height }}
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={reduced ? undefined : { ...LOOP, duration: 8 + index }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(8,14,20,0.56))]" />
            <motion.div
              className="absolute inset-x-[18%] top-[-10%] h-[42%] rounded-full blur-3xl"
              style={{ background: column.accent }}
              animate={reduced ? undefined : { opacity: [0.22, 0.5, 0.22], y: [-8, 8, -8] }}
              transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
            />
            <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white/60">{column.label}</div>
            <div className="absolute bottom-4 left-4 right-4 space-y-3">
              <div className="h-1.5 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-electric-blue)] via-[var(--color-hot-pink)] to-[var(--color-acid-lime)]"
                  animate={reduced ? undefined : { width: ["24%", "88%", "24%"] }}
                  transition={reduced ? undefined : { ...LOOP, duration: 6 + index }}
                />
              </div>
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-electric-blue)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-hot-pink)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-acid-lime)]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LaunchVisual() {
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(20,12,34,0.9),rgba(18,14,28,0.72))] p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_80%,rgba(73,107,255,0.14),transparent_34%),radial-gradient(circle_at_74%_32%,rgba(255,47,146,0.14),transparent_28%)]" />
      <div className="relative grid h-full gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 content-start">
          <div className="grid grid-cols-3 gap-3 rounded-[1.35rem] border border-white/10 bg-black/18 p-4">
            {[
              ["9:16", "Reels"],
              ["1:1", "Paid"],
              ["16:9", "Hero"],
            ].map(([ratio, label], index) => (
              <motion.div
                key={ratio}
                className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-3 text-center"
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={reduced ? undefined : { ...LOOP, duration: 7 + index }}
              >
                <div className="text-xl font-black leading-none text-white">{ratio}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/48">{label}</div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-black/18 p-4">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/44">Ready Across</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Paid", "Social", "Launch Pages", "Internal Handoff"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/68">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
          <motion.div
            className="absolute left-[10%] top-[24%] h-px w-[32%] bg-gradient-to-r from-[rgba(73,107,255,0.8)] to-transparent"
            animate={reduced ? undefined : { scaleX: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
            transition={reduced ? undefined : { ...LOOP, duration: 6 }}
          />
          <motion.div
            className="absolute right-[12%] top-[40%] h-px w-[28%] bg-gradient-to-r from-[rgba(255,47,146,0.7)] to-transparent"
            animate={reduced ? undefined : { scaleX: [1, 0.7, 1], opacity: [0.5, 1, 0.5] }}
            transition={reduced ? undefined : { ...LOOP, duration: 7 }}
          />

          <div className="grid h-full content-between gap-4">
            <div className="max-w-[12rem] text-[11px] uppercase leading-7 tracking-[0.26em] text-white/52">
              Masters, cutdowns, cover frames, stills, and rollout logic delivered as one launch-ready pack.
            </div>

            <div className="grid gap-3">
              {["Master Exports", "Vertical Cutz", "Thumbnail Covers", "Launch Notes"].map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-[1.1rem] border border-white/10 bg-black/18 px-4 py-3 text-sm font-medium text-white/78"
                  animate={reduced ? undefined : { x: [0, 6, 0] }}
                  transition={reduced ? undefined : { ...LOOP, duration: 8 + index }}
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end">
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric-blue-strong),var(--color-electric-blue))] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(49,77,255,0.28)]"
                animate={reduced ? undefined : { y: [0, -5, 0], boxShadow: ["0 18px 38px rgba(49,77,255,0.22)", "0 24px 44px rgba(49,77,255,0.34)", "0 18px 38px rgba(49,77,255,0.22)"] }}
                transition={reduced ? undefined : { ...LOOP, duration: 6 }}
              >
                Launch Pack
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
