import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RustBaseLab - Rust Base Designs Catalog",
    short_name: "RustBaseLab",
    description:
      "Complete catalog of base designs for the Rust video game. Find meta bases, popular designs, and filter by type, team size, and footprint.",
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
