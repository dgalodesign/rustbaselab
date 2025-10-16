"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "@/lib/i18n/context"

export function Header() {
  const { t } = useTranslations()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <span className="font-mono text-lg font-bold text-primary-foreground">RB</span>
          </div>
          <span className="font-mono text-xl font-bold">RustBaseLab</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            {t.nav.home}
          </Link>
          <Link href="/bases" className="text-sm font-medium transition-colors hover:text-primary">
            {t.nav.allBases}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="outline" size="sm" asChild>
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
