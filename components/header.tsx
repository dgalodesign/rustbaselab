"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n/context"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

interface HeaderProps {
  types?: Array<{ id: string; name: string }>
  teamSizes?: Array<{ id: string; name: string }>
}

const STATIC_PAGE_MAP: Record<string, string> = {
  solo: "/bases/solo",
  duo: "/bases/duo",
  trio: "/bases/trio",
  quad: "/bases/quad",
}

export function Header({ types = [], teamSizes = [] }: HeaderProps) {
  const { t } = useTranslations()
  const pathname = usePathname()

  // Shared base styles for all nav items
  const navItemStyles = "text-sm font-medium transition-colors hover:text-primary border-b-2 pb-1 flex items-center gap-1"
  const activeStyles = "border-primary text-primary"
  const inactiveStyles = "border-transparent text-foreground/80" // slightly muted for inactive to pop active more

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <MobileNav types={types} teamSizes={teamSizes} />

        {/* Logo */}
        <Link href="/" className="flex items-center transition-transform hover:scale-105 mr-auto md:mr-0">
          <Image src="/logo.svg" alt="RustBaseLab" width={160} height={40} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* 1. All Bases */}
          <Link
            href="/bases"
            className={cn(
              navItemStyles,
              pathname === "/bases" ? activeStyles : inactiveStyles
            )}
          >
            {t.nav.allBases}
          </Link>

          {/* 2. Base Types Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              navItemStyles,
              "outline-none focus:text-primary group",
              pathname?.includes("type=") ? activeStyles : inactiveStyles
            )}>
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

          {/* 3. Team Sizes Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              navItemStyles,
              "outline-none focus:text-primary group",
              // Check if current path matches any team size page or query
              pathname?.includes("teamSize=") || Object.values(STATIC_PAGE_MAP).includes(pathname) ? activeStyles : inactiveStyles
            )}>
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
                const href = STATIC_PAGE_MAP[size.name.toLowerCase()] || `/bases?teamSize=${size.id}`
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

          {/* 4. Favorites */}
          <Link
            href="/favorites"
            className={cn(
              navItemStyles,
              pathname === "/favorites" ? activeStyles : inactiveStyles
            )}
          >
            Favorites
          </Link>
        </nav>

        {/* Feedback Button */}
        <div className="hidden md:flex items-center gap-2">
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
