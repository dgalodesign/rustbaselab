import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getFeaturedBases, getAllTypes, getAllTeamSizes, getAllFootprints, getFilteredBases } from "@/lib/db-queries"

interface HomePageProps {
  searchParams: Promise<{
    type?: string
    teamSize?: string
    footprint?: string
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const typeId = params.type || "all"
  const teamSizeId = params.teamSize || "all"
  const footprintId = params.footprint || "all"

  const [featuredBases, types, teamSizes, footprints, filteredBases] = await Promise.all([
    getFeaturedBases(),
    getAllTypes(),
    getAllTeamSizes(),
    getAllFootprints(),
    typeId !== "all" || teamSizeId !== "all" || footprintId !== "all"
      ? getFilteredBases({ typeId, teamSizeId, footprintId })
      : Promise.resolve([]),
  ])

  const hasActiveFilters = typeId !== "all" || teamSizeId !== "all" || footprintId !== "all"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Mejores Diseños de Bases de Rust</span>
              </div>
              <h1 className="mb-6 font-mono text-4xl font-bold leading-tight text-balance md:text-6xl">
                Construye Mejor, Sobrevive Más
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                Descubre diseños profesionales de bases de Rust con tutoriales en video detallados. Desde bases para
                principiantes hasta fortalezas masivas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/bases">
                    Ver Todas las Bases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/search">Buscar Bases</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <AdPlaceholder slot="homepage-top" format="horizontal" />

        {/* Featured Bases */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 font-mono text-3xl font-bold">Bases Destacadas</h2>
              <p className="text-muted-foreground">Diseños seleccionados de nuestra comunidad</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {featuredBases.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No hay bases destacadas disponibles.</p>
            </div>
          )}
        </section>

        <AdPlaceholder slot="homepage-middle" format="horizontal" />

        {/* All Bases with Filters */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="mb-2 font-mono text-3xl font-bold">Explorar Bases</h2>
            <p className="text-muted-foreground">
              Filtra por tipo, tamaño de equipo y huella para encontrar tu base perfecta
            </p>
          </div>

          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} footprints={footprints} />
          </div>

          {hasActiveFilters ? (
            <>
              <div className="mb-4 text-sm text-muted-foreground">Mostrando {filteredBases.length} bases</div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBases.map((base) => (
                  <BaseCard key={base.id} base={base} />
                ))}
              </div>
              {filteredBases.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">No se encontraron bases con estos filtros.</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Usa los filtros arriba para explorar las bases disponibles</p>
              <Button asChild className="mt-4">
                <Link href="/bases">Ver Todas las Bases</Link>
              </Button>
            </div>
          )}
        </section>

        <AdPlaceholder slot="homepage-bottom" format="horizontal" />
      </main>

      <Footer />
    </div>
  )
}
