"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, type Locale } from "./translations"
import { defaultLocale } from "./config"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.en
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale

  const browserLang = navigator.language.toLowerCase()

  // If browser is in English, use English
  if (browserLang.startsWith("en")) {
    return "en"
  }

  // If browser is in Spanish, use Spanish
  if (browserLang.startsWith("es")) {
    return "es"
  }

  return "en"
}

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return getBrowserLocale()
    }
    return initialLocale
  })

  const value: I18nContextType = {
    locale,
    setLocale,
    t: translations[locale],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslations() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useTranslations must be used within I18nProvider")
  }
  return context
}
