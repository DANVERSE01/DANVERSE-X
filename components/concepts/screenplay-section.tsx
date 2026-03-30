"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const LINES = [
  { type: "slug", text: "FADE IN:" },
  { type: "slug", text: "INT. THE HOOK -- DIGITAL SPACE -- 0-3s" },
  {
    type: "action",
    text: "The screen holds black. Your brand arrives. Three seconds -- the only window before the brain decides to scroll past. We engineer this moment. We do not guess at it.",
  },
  { type: "character", text: "DANVERSE (V.O.)" },
  { type: "dialogue", text: "We do not guess at the hook. We engineer it." },
  { type: "direction", text: "CUT TO:" },
  { type: "slug", text: "INT. THE STORY -- NARRATIVE ARC -- 3-45s" },
  {
    type: "action",
    text: "Problem introduced. Solution revealed. Transformation made real. Every frame earns its place. Nothing is filler. The narrative is the product.",
  },
  { type: "character", text: "DANVERSE (V.O.)" },
  { type: "dialogue", text: "If it does not serve the conversion, it does not exist." },
  { type: "direction", text: "SMASH CUT TO:" },
  { type: "slug", text: "INT. THE CALL -- PEAK MOMENT -- 45-60s" },
  {
    type: "action",
    text: "One decision. One action. The CTA lands at peak emotional investment -- written into the story from the brief, not appended in the edit.",
  },
  { type: "character", text: "DANVERSE (V.O.)" },
  { type: "dialogue", text: "We do not ask for the click. We make it inevitable." },
  { type: "direction", text: "FADE OUT." },
] as const

const SPEEDS: Record<string, number> = { slug: 38, action: 16, character: 28, dialogue: 22, direction: 40 }
const SURFACE_BASE = "var(--color-surface-base)"
const SURFACE_RAISED = "var(--color-surface-raised)"
const TEXT_PRIMARY = "var(--color-text-primary)"
const TEXT_SECONDARY = "var(--color-text-secondary)"
const TEXT_MUTED = "var(--color-text-muted)"
const ACCENT_CORAL = "var(--color-accent-coral)"
const STYLES: Record<string, React.CSSProperties> = {
  slug: {
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: TEXT_PRIMARY,
    fontSize: "clamp(0.72rem,1.5vw,0.82rem)",
    marginTop: "clamp(0.875rem,2.5vw,1.25rem)",
  },
  action: { color: TEXT_SECONDARY, fontSize: "clamp(0.875rem,1.8vw,0.95rem)", lineHeight: 1.8, maxWidth: "58ch" },
  character: {
    color: TEXT_PRIMARY,
    textAlign: "center",
    fontSize: "clamp(0.75rem,1.6vw,0.85rem)",
    marginTop: "clamp(0.75rem,2vw,1rem)",
    fontWeight: 700,
  },
  dialogue: {
    color: TEXT_PRIMARY,
    textAlign: "center",
    fontSize: "clamp(0.875rem,1.8vw,0.95rem)",
    maxWidth: "35ch",
    margin: "0 auto clamp(0.5rem,1.5vw,0.75rem)",
  },
  direction: {
    color: TEXT_MUTED,
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontSize: "clamp(0.72rem,1.4vw,0.8rem)",
    marginTop: "clamp(0.625rem,1.5vw,0.75rem)",
  },
}

export function ScreenplaySection() {
  const secRef = useRef<HTMLElement>(null)
  const outRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion:reduce)").matches)
  }, [])

  useEffect(() => {
    const s = secRef.current
    if (!s) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.3 }
    )
    obs.observe(s)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || !outRef.current) return
    outRef.current.innerHTML = ""
    if (reduce) {
      const frag = document.createDocumentFragment()
      LINES.forEach((l) => {
        const p = document.createElement("p")
        p.textContent = l.text
        Object.assign(p.style, { fontFamily: "'Courier Prime',monospace", marginBottom: "0.125rem", ...STYLES[l.type] })
        frag.appendChild(p)
      })
      outRef.current.appendChild(frag)
      return
    }
    let li = 0,
      ci = 0,
      cur: HTMLParagraphElement | null = null,
      t: ReturnType<typeof setTimeout>
    const out = outRef.current
    function nl() {
      if (li >= LINES.length) return
      cur = document.createElement("p")
      Object.assign(cur.style, {
        fontFamily: "'Courier Prime',monospace",
        marginBottom: "0.125rem",
        ...STYLES[LINES[li].type],
      })
      out.appendChild(cur)
      tc()
    }
    function tc() {
      const l = LINES[li]
      if (ci < l.text.length) {
        if (cur) cur.textContent += l.text[ci]
        ci++
        t = setTimeout(tc, SPEEDS[l.type] ?? 20)
      } else {
        ci = 0
        li++
        t = setTimeout(nl, l.type === "direction" ? 500 : 120)
      }
    }
    nl()
    return () => clearTimeout(t)
  }, [started, reduce])

  return (
    <section
      ref={secRef}
      style={{
        background: SURFACE_BASE,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "clamp(3rem,10vw,5rem) clamp(1.5rem,6vw,5rem)",
      }}
    >
      <div style={{ marginBottom: "clamp(1.5rem,5vw,3rem)" }}>
        <p
          style={{
            fontFamily: "Courier Prime,monospace",
            fontSize: "clamp(0.7rem,1.4vw,0.8rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: ACCENT_CORAL,
            margin: "0 0 clamp(0.75rem,2vw,1rem)",
          }}
        >
          CONCEPT 04 / THE SCRIPT
        </p>
        <h2
          style={{
            fontFamily: "Bebas Neue,Arial Black,sans-serif",
            fontSize: "clamp(2.25rem,6vw,4rem)",
            lineHeight: 0.92,
            color: TEXT_PRIMARY,
            margin: 0,
          }}
        >
          Every ad is a film.
          <br />
          <span style={{ color: ACCENT_CORAL }}>Three acts.</span> One outcome.
        </h2>
      </div>
      <div
        style={{
          background: SURFACE_RAISED,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(1.5rem,4vw,3rem) clamp(1.25rem,4vw,3.5rem)",
          maxWidth: "min(100%,52rem)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "clamp(0.125rem,0.3vw,0.1875rem)",
            background: ACCENT_CORAL,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.375rem,1.5vw,0.5rem)",
            marginBottom: "clamp(1rem,3vw,2rem)",
            flexWrap: "wrap",
          }}
        >
          {[ACCENT_CORAL, TEXT_PRIMARY, SURFACE_BASE].map((c) => (
            <div
              key={c}
              style={{
                width: "clamp(0.5rem,1.8vw,0.625rem)",
                height: "clamp(0.5rem,1.8vw,0.625rem)",
                borderRadius: "50%",
                background: c,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "Courier Prime,monospace",
              fontSize: "clamp(0.7rem,1.4vw,0.8rem)",
              letterSpacing: "0.28em",
              color: TEXT_MUTED,
              textTransform: "uppercase",
              marginLeft: "clamp(0.25rem,1vw,0.5rem)",
            }}
          >
            danverse_screenplay_v1.fountain
          </span>
        </div>
        <div ref={outRef} />
        <span className="term-cursor" />
      </div>
      <div style={{ marginTop: "clamp(1.5rem,5vw,3rem)" }}>
        <button
          type="button"
          aria-label="Start the brief in WhatsApp"
          onClick={() => fireCTAAndOpenWhatsApp("concept-04-screenplay")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(0.75rem,2vw,1rem)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Courier Prime,monospace",
              fontSize: "clamp(0.75rem,1.4vw,0.85rem)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: TEXT_PRIMARY,
            }}
          >
            Start the brief
          </span>
          <span
            style={{
              width: "clamp(1.5rem,6vw,2rem)",
              height: "1px",
              background: ACCENT_CORAL,
              transition: "width .5s",
              display: "block",
            }}
          />
        </button>
      </div>
    </section>
  )
}
