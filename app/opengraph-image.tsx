import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "RustBaseLab - Catálogo de Bases para Rust"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Grid background effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(#00ffff22 1px, transparent 1px), linear-gradient(90deg, #00ffff22 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: "bold",
            fontFamily: "monospace",
            color: "#00ffff",
            textShadow: "0 0 40px rgba(0, 255, 255, 0.5)",
            marginBottom: "20px",
            letterSpacing: "8px",
          }}
        >
          RUSTBASELAB
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#f5f5f5",
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Catálogo de Diseños de Bases para Rust
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(0, 255, 255, 0.1)",
              border: "2px solid #00ffff",
              borderRadius: "8px",
              color: "#00ffff",
              fontSize: 24,
              fontFamily: "monospace",
            }}
          >
            BASES META
          </div>
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 0, 255, 0.1)",
              border: "2px solid #ff00ff",
              borderRadius: "8px",
              color: "#ff00ff",
              fontSize: 24,
              fontFamily: "monospace",
            }}
          >
            MÁS POPULARES
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
