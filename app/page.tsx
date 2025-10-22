import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Flame, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getMetaBases, getPopularBases, getAllTypes, getAllTeamSizes } from "@/lib/db-queries"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [metaBases, popularBases, types, teamSizes] = await Promise.all([
    getMetaBases(6),
    getPopularBases(6),
    getAllTypes(),
    getAllTeamSizes(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b-2 border-primary/20 bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent)]" />
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-mono">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">MEJORES DISEÑOS DE BASES</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-6xl">
                CONSTRUYE MEJOR, SOBREVIVE MÁS
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                Descubre diseños profesionales de bases de Rust con tutoriales en video detallados. Desde bases para
                principiantes hasta fortalezas masivas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/50 font-bold"
                >
                  <Link href="/bases">
                    VER TODAS LAS BASES
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-border hover:bg-accent bg-transparent"
                >
                  <Link href="/search">BUSCAR BASES</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <AdPlaceholder slot="homepage-top" format="horizontal" />

        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between border-b-2 border-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">BASES META</h2>
              </div>
              <p className="text-muted-foreground text-sm">Las bases más recientes y actualizadas</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metaBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {metaBases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground font-mono">NO HAY BASES META DISPONIBLES</p>
            </div>
          )}
        </section>

        <AdPlaceholder slot="homepage-middle" format="horizontal" />

        <section className="container mx-auto px-4 py-12 bg-background">
          <div className="mb-8 flex items-center justify-between border-b-2 border-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-secondary" />
                <h2 className="text-3xl font-bold">BASES MÁS POPULARES</h2>
              </div>
              <p className="text-muted-foreground text-sm">Las bases más vistas por la comunidad</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {popularBases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground font-mono">NO HAY BASES POPULARES DISPONIBLES</p>
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 py-12 bg-background">
          <div className="mb-8 border-b-2 border-border pb-4">
            <h2 className="mb-2 text-3xl font-bold">TIPOS DE BASES</h2>
            <p className="text-muted-foreground text-sm">Explora bases por categoría</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {types.map((type) => (
              <Link
                key={type.id}
                href={`/bases?type=${type.id}`}
                className="group relative overflow-hidden rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold uppercase">{type.type}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-background">
          <div className="mb-8 border-b-2 border-border pb-4">
            <h2 className="mb-2 text-3xl font-bold">TAMAÑOS DE EQUIPO</h2>
            <p className="text-muted-foreground text-sm">Encuentra bases para tu grupo</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teamSizes.map((size) => (
              <Link
                key={size.id}
                href={`/bases?teamSize=${size.id}`}
                className="group relative overflow-hidden rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-secondary hover:shadow-lg hover:shadow-secondary/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold uppercase">{size.size}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AdPlaceholder slot="homepage-bottom" format="horizontal" />
      </main>

      <Footer />
    </div>
  )
}
