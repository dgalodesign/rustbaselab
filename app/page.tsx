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
        <section className="border-b-2 border-rust-metal bg-gradient-to-b from-rust-dark via-rust-darker to-rust-darkest relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded border-2 border-rust-orange/30 bg-rust-orange/10 px-4 py-1.5 text-sm text-rust-orange font-mono">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">MEJORES DISEÑOS DE BASES</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-6xl text-rust-light">
                CONSTRUYE MEJOR, SOBREVIVE MÁS
              </h1>
              <p className="mb-8 text-lg text-rust-muted text-pretty md:text-xl">
                Descubre diseños profesionales de bases de Rust con tutoriales en video detallados. Desde bases para
                principiantes hasta fortalezas masivas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-rust-orange hover:bg-rust-orange/90 text-rust-darkest border-2 border-rust-orange/50 font-bold"
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
                  className="border-2 border-rust-metal hover:bg-rust-metal/10 bg-transparent"
                >
                  <Link href="/search">BUSCAR BASES</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <AdPlaceholder slot="homepage-top" format="horizontal" />

        {/* Featured Bases */}
        <section className="container mx-auto px-4 py-12 bg-rust-darker">
          <div className="mb-8 flex items-center justify-between border-b-2 border-rust-metal pb-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-rust-light">BASES DESTACADAS</h2>
              <p className="text-rust-muted text-sm">Diseños seleccionados de nuestra comunidad</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {featuredBases.length === 0 && (
            <div className="py-12 text-center border-2 border-rust-metal rounded bg-rust-dark/50">
              <p className="text-lg text-rust-muted font-mono">NO HAY BASES DESTACADAS DISPONIBLES</p>
            </div>
          )}
        </section>

        <AdPlaceholder slot="homepage-middle" format="horizontal" />

        {/* All Bases with Filters */}
        <section className="container mx-auto px-4 py-12 bg-rust-darkest">
          <div className="mb-8 border-b-2 border-rust-metal pb-4">
            <h2 className="mb-2 text-3xl font-bold text-rust-light">EXPLORAR BASES</h2>
            <p className="text-rust-muted text-sm">
              Filtra por tipo, tamaño de equipo y huella para encontrar tu base perfecta
            </p>
          </div>

          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} footprints={footprints} />
          </div>

          {hasActiveFilters ? (
            <>
              <div className="mb-4 text-sm text-rust-muted font-mono">MOSTRANDO {filteredBases.length} BASES</div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBases.map((base) => (
                  <BaseCard key={base.id} base={base} />
                ))}
              </div>
              {filteredBases.length === 0 && (
                <div className="py-12 text-center border-2 border-rust-metal rounded bg-rust-dark/50">
                  <p className="text-lg text-rust-muted font-mono">NO SE ENCONTRARON BASES CON ESTOS FILTROS</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 border-2 border-rust-metal rounded bg-rust-dark/50">
              <p className="text-rust-muted mb-4">
                USA LOS FILTROS ARRIBA PARA EXPLORAR LAS BASES DISPONIBLES
              </p>
              <Button
                asChild
                className="bg-rust-orange hover:bg-rust-orange/90 text-rust-darkest border-2 border-rust-orange/50 font-bold"
              >
                <Link href="/bases">VER TODAS LAS BASES</Link>
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
