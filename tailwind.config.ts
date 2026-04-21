import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "var(--bone)",
        "bone-soft": "var(--bone-soft)",
        parchment: "var(--parchment)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-fog": "var(--ink-fog)",
        "ink-muted": "var(--ink-muted)",
        ember: "var(--ember)",
        coral: "var(--neon-magenta)",
        aqua: "var(--neon-amber)",
        void: "var(--void)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
        appear: "cubic-bezier(0.16, 1, 0.3, 1)",
        snap: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        inout: "cubic-bezier(0.83, 0, 0.17, 1)",
      },
    },
  },
  plugins: [],
}

export default config
