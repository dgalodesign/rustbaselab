import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Users, Zap, Shield, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Acerca de RustBaseLab - Catálogo de Bases de Rust",
  description:
    "Conoce RustBaseLab, tu fuente definitiva de diseños de bases para Rust. Aprende sobre nuestra misión y cómo ayudamos a la comunidad de Rust.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Acerca de RustBaseLab
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Tu fuente definitiva de diseños de bases para Rust, creada por jugadores para jugadores.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-lg border-2 border-primary bg-card p-8 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              RustBaseLab nació de la necesidad de tener un lugar centralizado donde los jugadores de Rust puedan
              encontrar diseños de bases de calidad, organizados por tipo de jugador y tamaño de equipo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sabemos lo frustrante que es perder todo tu progreso por una base mal diseñada. Por eso, recopilamos y
              organizamos los mejores diseños de bases de la comunidad, con tutoriales en video para que puedas
              construirlas fácilmente.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">¿Qué ofrecemos?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Bases para Todos</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Desde bases solo hasta diseños para zergs, organizadas por tamaño de equipo y tipo de jugador.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <Zap className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-lg font-bold">Tutoriales en Video</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cada base incluye un tutorial en video paso a paso para que puedas construirla sin complicaciones.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold">Diseños Probados</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Todas las bases han sido probadas y validadas por la comunidad de Rust.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Fácil Navegación</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Filtra por tipo de base, tamaño de equipo y encuentra exactamente lo que necesitas.
              </p>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Construido para la Comunidad</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RustBaseLab es un proyecto comunitario. Si tienes un diseño de base que quieres compartir o sugerencias
              para mejorar el sitio, nos encantaría escucharte.
            </p>
            <Link href="/contact">
              <Button size="lg" className="font-bold">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para construir tu próxima base?</h2>
          <p className="text-muted-foreground mb-6">Explora nuestro catálogo completo de diseños de bases para Rust.</p>
          <Link href="/bases">
            <Button size="lg" className="font-bold">
              Ver Todas las Bases
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
