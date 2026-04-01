import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "RustBaseLab - Rust Base Designs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(" ", "+")}:wght@${weight}&display=swap`,
    {
      headers: {
        // Old Safari UA — gets TTF format, which Satori (next/og) supports
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }
  ).then((r) => r.text())

  const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
  if (!fontUrl) throw new Error(`No font URL found for ${family} ${weight}`)
  return fetch(fontUrl).then((r) => r.arrayBuffer())
}

export default async function Image() {
  const [fontBold, fontMedium] = await Promise.all([
    loadFont("Space Grotesk", 700),
    loadFont("Space Grotesk", 500),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0e131a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "Space Grotesk",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(86,117,162,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(86,117,162,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top accent gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #5675a2, #d9eaff, #5675a2)",
          }}
        />

        {/* Site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#d9eaff",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          RUSTBASELAB
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "74px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Rust Base Designs
          </div>
          <div
            style={{
              color: "#8fa8c8",
              fontSize: "26px",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            Step-by-step video tutorials for every team size
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Team size pills */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["Solo", "Duo", "Trio", "Zerg"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(86,117,162,0.15)",
                  border: "1px solid rgba(217,234,255,0.25)",
                  color: "#d9eaff",
                  padding: "7px 18px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* URL */}
          <div style={{ color: "#4a6080", fontSize: "17px", fontWeight: 500 }}>
            rustbaselab.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: fontBold, style: "normal", weight: 700 },
        { name: "Space Grotesk", data: fontMedium, style: "normal", weight: 500 },
      ],
    }
  )
}
