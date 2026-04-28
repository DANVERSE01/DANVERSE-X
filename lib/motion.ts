export const ease = {
  appear: "cubic-bezier(0.16, 1.00, 0.30, 1.00)",
  depart: "cubic-bezier(0.55, 0.00, 1.00, 0.45)",
  cinematic: "cubic-bezier(0.76, 0.00, 0.24, 1.00)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1.00)",
  linear: "linear",
} as const

export const dur = {
  instant: 0.08,
  micro: 0.18,
  fast: 0.32,
  moderate: 0.5,
  slow: 0.8,
  cinematic: 1.2,
  dramatic: 1.8,
} as const

export const stagger = {
  tight: 0.015,
  normal: 0.06,
  loose: 0.12,
} as const
