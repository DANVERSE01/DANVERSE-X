import { ImageResponse } from "next/og"
import { getWorkBySlug } from "@/lib/work"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }

export default async function WorkOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#080808",
        color: "#F2F0E8",
      }}
    >
      <div style={{ fontSize: 14, color: "#DEFF00", letterSpacing: 8, marginBottom: 32 }}>TX-02 / CASE FILE</div>
      <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 0.92 }}>{work?.title ?? "DANVERSE"}</div>
      <div style={{ fontSize: 24, color: "rgba(242,240,232,0.6)", marginTop: 24 }}>
        {work?.category ?? "AI Creative Studio"}
      </div>
    </div>
  )
}
