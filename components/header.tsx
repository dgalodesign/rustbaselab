"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n/context"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  types?: Array<{ id: string; name: string }>
  teamSizes?: Array<{ id: string; name: string }>
}

export function Header({ types = [], teamSizes = [] }: HeaderProps) {
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

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none focus:text-primary group">
              {t.home.filters.type}
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link href="/bases?type=all" className="w-full cursor-pointer">
                  {t.home.filters.allTypes}
                </Link>
              </DropdownMenuItem>
              {types.map((type) => (
                <DropdownMenuItem key={type.id} asChild>
                  <Link href={`/bases?type=${type.id}`} className="w-full cursor-pointer">
                    {type.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none focus:text-primary group">
              {t.home.filters.teamSize}
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link href="/bases?teamSize=all" className="w-full cursor-pointer">
                  {t.home.filters.allTeamSizes}
                </Link>
              </DropdownMenuItem>
              {teamSizes.map((size) => {
                const staticPageMap: Record<string, string> = {
                  solo: "/bases/solo",
                  duo: "/bases/duo",
                  trio: "/bases/trio",
                  quad: "/bases/quad",
                }
                const href = staticPageMap[size.name.toLowerCase()] || `/bases?teamSize=${size.id}`

                return (
                  <DropdownMenuItem key={size.id} asChild>
                    <Link href={href} className="w-full cursor-pointer">
                      {size.name}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/bases"
            className="text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
          >
            {t.nav.allBases}
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
          >
            Favorites
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-2 bg-transparent">
            <Link href="/feedback">
              <span>{t.nav.feedback}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
