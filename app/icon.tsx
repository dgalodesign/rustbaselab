import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 900,
          color: "#0a0a0a",
          fontFamily: "monospace",
          letterSpacing: "-1px",
        }}
      >
        RB
      </div>
    </div>,
    {
      ...size,
    },
  )
}
