import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/context"

import { Inter, JetBrains_Mono, IBM_Plex_Sans as V0_Font_IBM_Plex_Sans, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, IBM_Plex_Serif as V0_Font_IBM_Plex_Serif } from 'next/font/google'

// Initialize fonts
const _ibmPlexSans = V0_Font_IBM_Plex_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _ibmPlexSerif = V0_Font_IBM_Plex_Serif({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RustBaseLab - Rust Base Designs & Tutorials",
  description:
    "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay. Video tutorials and building guides.",
  keywords: "rust, rust base, rust base design, rust tutorial, rust building, rust solo base, rust duo base",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "RustBaseLab - Rust Base Designs & Tutorials",
    description: "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
