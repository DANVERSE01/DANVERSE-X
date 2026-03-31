import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#080B10",
        color: "#F0F4FF",
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
            "radial-gradient(circle at top, rgba(42, 107, 255, 0.28), transparent 48%), radial-gradient(circle at bottom right, rgba(201, 168, 76, 0.2), transparent 36%)",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(13, 17, 23, 0.82)",
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
            color: "#F0F4FF",
            fontSize: 116,
            fontWeight: 700,
            letterSpacing: 8,
            lineHeight: 1,
          }}
        >
          DANVERSE
        </div>
        <div
          style={{
            color: "#C8D2E6",
            fontSize: 36,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          AI-Powered Creative Studio
        </div>
        <div
          style={{
            alignSelf: "center",
            background: "linear-gradient(90deg, #c9a8f5 0%, #f5f500 100%)",
            borderRadius: 999,
            height: 6,
            width: 280,
          }}
        />
      </div>
    </div>,
    size
  )
}
