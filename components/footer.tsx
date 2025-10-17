"use client"

import Link from "next/link"
import { useTranslations } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useTranslations()

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-mono text-lg font-bold">RustBaseLab</h3>
            <p className="text-sm text-muted-foreground">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/bases" className="text-muted-foreground transition-colors hover:text-primary">
                  {t.nav.allBases}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground transition-colors hover:text-primary">
                  {t.nav.search}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">RustBaseLab</h4>
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
      </div>
    </footer>
  )
}
