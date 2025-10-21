import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 120,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00ffff",
        fontFamily: "monospace",
        fontWeight: "bold",
        border: "8px solid #00ffff",
        borderRadius: "32px",
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
      }}
    >
      R
    </div>,
    {
      ...size,
    },
  )
}
