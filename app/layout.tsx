import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/context"
import { CookieConsent } from "@/components/cookie-consent"

import { Inter, Space_Grotesk } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
