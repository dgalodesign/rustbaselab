export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "es"

export function getLocaleFromPath(pathname: string): Locale {
  const locale = pathname.split("/")[1]
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}
