import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/context"
import { CookieConsent } from "@/components/cookie-consent"
import Script from "next/script"
import { Toaster } from "sonner"

import { Inter, Space_Grotesk, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RustBaseLab - Rust Base Designs & Tutorials",
  description:
    "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay. Video tutorials and building guides.",
  keywords: "rust, rust base, rust base design, rust tutorial, rust building, rust solo base, rust duo base",
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
      <head />
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6148269016507542"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <CookieConsent />
        <Analytics />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
