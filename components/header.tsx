"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n/context"
import Image from "next/image"

export function Header() {
  const { t } = useTranslations()

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image src="/logo.svg" alt="RustBaseLab" width={160} height={40} className="h-8 w-auto" priority />
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
