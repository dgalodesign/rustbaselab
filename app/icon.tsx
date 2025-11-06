import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ef4444",
        borderRadius: "20%",
      }}
    >
      <div style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>R</div>
    </div>,
    {
      ...size,
    },
  )
}
