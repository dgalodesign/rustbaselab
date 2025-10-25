import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-2xl space-y-8">
            {/* Error Code */}
            <div className="relative">
              <h1 className="font-display text-9xl font-bold text-primary/20 select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary animate-pulse">ERROR</span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-foreground uppercase">Página No Encontrada</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                La página que buscas no existe o ha sido movida. Puede que el enlace esté roto o que la base haya sido
                eliminada.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-background font-mono font-bold uppercase min-w-[200px]"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Ir al Inicio
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-mono font-bold uppercase min-w-[200px] bg-transparent"
              >
                <Link href="/bases">
                  <Search className="mr-2 h-5 w-5" />
                  Ver Todas las Bases
                </Link>
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="pt-8 opacity-50">
              <div className="flex justify-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="animate-pulse">▓</span>
                <span className="animate-pulse delay-100">▓</span>
                <span className="animate-pulse delay-200">▓</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
