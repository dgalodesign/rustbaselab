import { ImageResponse } from "next/og"
import { getBlogPostBySlug } from "@/lib/notion-blog"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function BlogPostOGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  const title = post?.title ?? "Rust Base Guide"
  const description = post?.description ?? "RustBaseLab — Guides & Tutorials"
  const category = post?.category ?? "Guide"

  const categoryColors: Record<string, string> = {
    Guide: "#5675a2",
    Tutorial: "#4a9e6e",
    Strategy: "#c27c2e",
    Meta: "#9b4dca",
  }
  const accent = categoryColors[category] ?? "#5675a2"

  // Shorten title if too long
  const displayTitle = title.length > 52 ? title.slice(0, 49) + "…" : title
  const titleFontSize = displayTitle.length > 38 ? 48 : 56

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0e131a",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(86,117,162,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(86,117,162,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 8,
            height: 630,
            backgroundColor: accent,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px 60px 88px",
            height: "100%",
          }}
        >
          {/* Top: logo + category */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#d9eaff",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              RUSTBASELAB
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: accent,
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: accent,
                letterSpacing: 3,
                textTransform: "uppercase",
                border: `2px solid ${accent}55`,
                padding: "4px 12px",
                borderRadius: 4,
              }}
            >
              {category}
            </div>
          </div>

          {/* Middle: title + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: titleFontSize,
                fontWeight: 900,
                color: "#d9eaff",
                lineHeight: 1.15,
                letterSpacing: -1,
                maxWidth: 900,
              }}
            >
              {displayTitle}
            </div>
            {description && (
              <div
                style={{
                  fontSize: 22,
                  color: "#7a9cc4",
                  lineHeight: 1.4,
                  maxWidth: 820,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                {description.length > 120 ? description.slice(0, 117) + "…" : description}
              </div>
            )}
          </div>

          {/* Bottom: URL */}
          <div
            style={{
              fontSize: 16,
              color: "#3a5070",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            rustbaselab.com/blog
          </div>
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
