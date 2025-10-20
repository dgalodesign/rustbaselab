"use client"

import Link from "next/link"
import { Search, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "@/lib/i18n/context"

export function Header() {
  const { t } = useTranslations()

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary shadow-md">
            <Hammer className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Rust<span className="text-primary">Base</span>Lab
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/bases"
            className="text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
          >
            {t.nav.allBases}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="outline" size="sm" asChild className="border-2 bg-transparent">
            <Link href="/search">
              <Search className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">{t.nav.search}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
