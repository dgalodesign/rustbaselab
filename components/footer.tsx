"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useTranslations()

  return (
    <footer className="border-t-2 border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center mb-4 transition-transform hover:scale-105">
              <Image src="/logo.svg" alt="RustBaseLab" width={160} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold font-display uppercase tracking-wide">{t.footer.quickLinks}</h4>
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
                <Link
                  href="/feedback"
                  className="text-muted-foreground transition-colors hover:text-primary font-medium"
                >
                  {t.nav.feedback}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold font-display uppercase tracking-wide">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground transition-colors hover:text-primary font-medium"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-primary font-medium"
                >
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold font-display uppercase tracking-wide">RustBaseLab</h4>
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
          <p className="text-center text-xs text-muted-foreground">
            Built for the Rust community • Powered by RustBaseLab DS
          </p>
        </div>
      </div>
    </footer>
  )
}
