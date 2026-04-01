import { ImageResponse } from "next/og"
import { getBaseBySlug } from "@/lib/db-queries"

export const runtime = "nodejs"
export const alt = "Rust Base Design"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(" ", "+")}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }
  ).then((r) => r.text())

  const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
  if (!fontUrl) throw new Error(`No font URL found for ${family} ${weight}`)
  return fetch(fontUrl).then((r) => r.arrayBuffer())
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const base = await getBaseBySlug(slug)

  const [fontBold, fontMedium] = await Promise.all([
    loadFont("Space Grotesk", 700),
    loadFont("Space Grotesk", 500),
  ])

  const title = base?.seo_title || base?.title || "Rust Base Design"
  const creator = base?.creator?.name
  const type = base?.type?.name
  const footprint = base?.footprint?.name
  const thumbnailUrl = base?.video_youtube_id
    ? `https://img.youtube.com/vi/${base.video_youtube_id}/maxresdefault.jpg`
    : null

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
          fontFamily: "Space Grotesk",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* YouTube thumbnail as blurred background */}
        {thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
              filter: "blur(4px)",
            }}
          />
        )}

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(14,19,26,0.85) 0%, rgba(14,19,26,0.97) 60%)",
          }}
        />

        {/* Top accent bar */}
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

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "52px 60px 52px",
            position: "relative",
          }}
        >
          {/* Top: site name */}
          <div
            style={{
              color: "#d9eaff",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            RUSTBASELAB
          </div>

          {/* Middle: base title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: title.length > 40 ? "52px" : "64px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            {creator && (
              <div
                style={{
                  color: "#8fa8c8",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                by {creator}
              </div>
            )}
          </div>

          {/* Bottom: tags + URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {type && (
                <div
                  style={{
                    background: "rgba(86,117,162,0.15)",
                    border: "1px solid rgba(217,234,255,0.25)",
                    color: "#d9eaff",
                    padding: "6px 16px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {type}
                </div>
              )}
              {footprint && (
                <div
                  style={{
                    background: "rgba(86,117,162,0.15)",
                    border: "1px solid rgba(217,234,255,0.25)",
                    color: "#d9eaff",
                    padding: "6px 16px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {footprint}
                </div>
              )}
            </div>
            <div style={{ color: "#4a6080", fontSize: "17px", fontWeight: 500 }}>
              rustbaselab.com
            </div>
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
