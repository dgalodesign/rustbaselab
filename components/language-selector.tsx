"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "@/lib/i18n/context"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { locale, setLocale } = useTranslations()

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as "es" | "en")}>
      <SelectTrigger className="w-[120px] gap-2">
        <Globe className="h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}
