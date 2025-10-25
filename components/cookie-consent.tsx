"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-lg border-2 border-primary bg-card p-6 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
          <button
            onClick={rejectCookies}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Cookie className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-bold font-display">Usamos cookies</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Este sitio utiliza cookies para mejorar tu experiencia, mostrar anuncios personalizados (Google AdSense)
                y analizar el tráfico (Google Analytics). Al aceptar, consientes el uso de estas tecnologías.{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Más información
                </Link>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={acceptCookies} className="font-bold">
                  Aceptar cookies
                </Button>
                <Button onClick={rejectCookies} variant="outline" className="font-bold bg-transparent">
                  Rechazar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
