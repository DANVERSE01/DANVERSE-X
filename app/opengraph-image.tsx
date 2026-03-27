import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at top, rgba(230, 60, 47, 0.28), transparent 55%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            border: "1px solid rgba(230, 60, 47, 0.35)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "56px 72px",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#e63c2f",
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: 8,
              lineHeight: 1,
            }}
          >
            DANVERSE
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 36,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            AI-Powered Creative Studio
          </div>
        </div>
      </div>
    ),
    size,
  )
}
