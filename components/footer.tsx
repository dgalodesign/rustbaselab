"use client"

import Link from "next/link"
import { useTranslations } from "@/lib/i18n/context"
import { Hammer } from "lucide-react"

export function Footer() {
  const { t } = useTranslations()

  return (
    <footer className="border-t-2 border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
                <Hammer className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-lg font-bold">
                Rust<span className="text-primary">Base</span>Lab
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/bases" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                  {t.nav.allBases}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                  {t.nav.search}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">RustBaseLab</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
              </li>
              <li>
                <span className="text-muted-foreground">{t.footer.allRightsReserved}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground font-mono">
            Built for the Rust community • Powered by RustBaseLab DS
          </p>
        </div>
      </div>
    </footer>
  )
}
