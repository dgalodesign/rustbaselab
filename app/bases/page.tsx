import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { getFilteredBases, getAllTypes, getAllTeamSizes, getAllFootprints } from "@/lib/db-queries"

interface BasesPageProps {
  searchParams: Promise<{
    type?: string
    teamSize?: string
    footprint?: string
  }>
}

export default async function BasesPage({ searchParams }: BasesPageProps) {
  const params = await searchParams
  const typeId = params.type || "all"
  const teamSizeId = params.teamSize || "all"
  const footprintId = params.footprint || "all"

  const [bases, types, teamSizes, footprints] = await Promise.all([
    getFilteredBases({ typeId, teamSizeId, footprintId }),
    getAllTypes(),
    getAllTeamSizes(),
    getAllFootprints(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">Todos los Diseños de Bases</h1>
            <p className="text-lg text-muted-foreground">
              Explora nuestra colección completa de diseños de bases de Rust para todos los tamaños de equipo.
            </p>
          </div>
        </section>

        {/* Ad Space - Top */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="bases-page-top" format="horizontal" />
        </section>

        {/* Bases Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} footprints={footprints} />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">Mostrando {bases.length} bases</div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {bases.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No se encontraron bases con estos filtros.</p>
            </div>
          )}
        </section>

        {/* Ad Space - Bottom */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="bases-page-bottom" format="horizontal" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
