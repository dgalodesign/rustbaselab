import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const runtime = "edge"
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default async function AppleIcon() {
  try {
    const faviconPath = join(process.cwd(), "public", "favicon.png")
    const imageData = await readFile(faviconPath)

    return new Response(imageData, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    // Fallback: return a simple colored square if file not found
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ef4444",
        }}
      >
        <div style={{ fontSize: 80, color: "white" }}>R</div>
      </div>,
      {
        ...size,
      },
    )
  }
}
