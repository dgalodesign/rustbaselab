import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/context"
import { CookieConsent } from "@/components/cookie-consent"
import Script from "next/script"
import { Toaster } from "sonner"
import { Header } from "@/components/header"
import { getAllTypes, getAllTeamSizes } from "@/lib/db-queries"

import { Inter, Space_Grotesk } from 'next/font/google'



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
  metadataBase: new URL("https://rustbaselab.com"),
  title: {
    default: "RustBaseLab - Rust Base Designs & Tutorials",
    template: "%s | RustBaseLab",
  },
  description:
    "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay. Professional video tutorials and building guides for all team sizes.",
  keywords: [
    "rust",
    "rust base",
    "rust base design",
    "rust tutorial",
    "rust building guide",
    "rust solo base",
    "rust duo base",
    "rust trio base",
    "rust zerg base",
    "rust building",
    "rust fortifications",
    "rust defense",
    "rust base builder",
  ],
  authors: [{ name: "RustBaseLab" }],
  creator: "RustBaseLab",
  publisher: "RustBaseLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rustbaselab.com",
    siteName: "RustBaseLab",
    title: "RustBaseLab - Rust Base Designs & Tutorials",
    description: "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay. Professional video tutorials and building guides.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "RustBaseLab - Rust Base Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RustBaseLab - Rust Base Designs & Tutorials",
    description: "Discover the best Rust base designs for solo, duo, trio, and zerg gameplay.",
    images: ["/logo.svg"],
    creator: "@rustbaselab",
  },
  alternates: {
    canonical: "https://rustbaselab.com",
    languages: {
      "en-US": "https://rustbaselab.com",
      "es-ES": "https://rustbaselab.com/es",
    },
  },
  verification: {
    google: "bpWqD-y3XKcAqVhVhsjrnS8hlXHf-iHFzvBjhDqW10c",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [types, teamSizes] = await Promise.all([getAllTypes(), getAllTeamSizes()])

  return (
    <html lang="en" className="dark">
      <head />
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XP4WCJMLR4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XP4WCJMLR4');
          `}
        </Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6148269016507542"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <I18nProvider>
          <Header types={types} teamSizes={teamSizes} />
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <CookieConsent />
        <Analytics />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
