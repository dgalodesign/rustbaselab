import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RustBaseLab - Catálogo de Bases para Rust",
    short_name: "RustBaseLab",
    description:
      "Catálogo completo de diseños de bases para el videojuego Rust. Encuentra bases meta, populares y filtradas por tipo, tamaño y footprint.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#00ffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
