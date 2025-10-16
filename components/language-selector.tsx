"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n/context"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { locale, setLocale } = useTranslations()

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale} className="gap-2">
      <Globe className="h-4 w-4" />
      <span className="font-mono text-sm uppercase">{locale}</span>
    </Button>
  )
}
