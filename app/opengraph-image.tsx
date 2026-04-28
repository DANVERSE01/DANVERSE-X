import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#080808",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ fontSize: 14, color: "#DEFF00", letterSpacing: 8, marginBottom: 32 }}>
        TX-00 / DANVERSE TRANSMISSION
      </div>
      <div style={{ fontSize: 96, fontWeight: 900, color: "#F2F0E8", lineHeight: 0.9 }}>DANVERSE</div>
      <div style={{ fontSize: 28, color: "rgba(242,240,232,0.6)", marginTop: 24 }}>AI Creative Studio</div>
    </div>
  )
}
