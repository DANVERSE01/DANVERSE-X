"use client"

const ITEMS = [
  "BRAND IDENTITY",
  "✦",
  "MOTION DESIGN",
  "✦",
  "VISUAL SYSTEMS",
  "✦",
  "ART DIRECTION",
  "✦",
  "INTERACTIVE EXPERIENCES",
  "✦",
  "CREATIVE DIRECTION",
  "✦",
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ overflow: "hidden", lineHeight: 1 }}>
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`marquee-item ${item === "✦" ? "marquee-item--accent" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function MarqueeReel() {
  return (
    <section className="marquee-section" data-section="marquee" aria-label="Services overview">
      <MarqueeRow />
      <div style={{ marginTop: "0.5rem" }}>
        <MarqueeRow reverse />
      </div>
    </section>
  )
}
