import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { getFilteredBases, getAllTypes, getAllTeamSizes, getAllFootprints } from "@/lib/db-queries"

export const dynamic = "force-dynamic"

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
        <section className="border-b-2 border-border bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent)]" />
          <div className="container relative mx-auto px-4 py-12">
            <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">TODOS LOS DISEÑOS DE BASES</h1>
            <p className="text-lg text-muted-foreground font-mono">
              Explora nuestra colección completa de diseños de bases de Rust para todos los tamaños de equipo
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} footprints={footprints} />
          </div>

          <div className="mb-4 text-sm text-muted-foreground font-mono">MOSTRANDO {bases.length} BASES</div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {bases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground font-mono">NO SE ENCONTRARON BASES CON ESTOS FILTROS</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
