import type { Locale } from "@/lib/i18n/translations"

export function getRelativeTime(date: string | Date, locale: Locale): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return locale === "es" ? "Justo ahora" : "Just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    if (locale === "es") {
      return diffInMinutes === 1 ? "hace 1 minuto" : `hace ${diffInMinutes} minutos`
    }
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    if (locale === "es") {
      return diffInHours === 1 ? "hace 1 hora" : `hace ${diffInHours} horas`
    }
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    if (locale === "es") {
      return diffInDays === 1 ? "hace 1 día" : `hace ${diffInDays} días`
    }
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    if (locale === "es") {
      return diffInWeeks === 1 ? "hace 1 semana" : `hace ${diffInWeeks} semanas`
    }
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    if (locale === "es") {
      return diffInMonths === 1 ? "hace 1 mes" : `hace ${diffInMonths} meses`
    }
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  if (locale === "es") {
    return diffInYears === 1 ? "hace 1 año" : `hace ${diffInYears} años`
  }
  return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`
}
