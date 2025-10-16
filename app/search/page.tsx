import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { SearchInput } from "@/components/search-input"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { getFilteredBases, getAllTypes, getAllTeamSizes, getAllTags } from "@/lib/db-queries"
import { SearchIcon } from "lucide-react"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    teamSize?: string
    tag?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  const typeId = params.type || "all"
  const teamSizeId = params.teamSize || "all"
  const tagId = params.tag || "all"

  const [bases, types, teamSizes, tags] = await Promise.all([
    query || typeId !== "all" || teamSizeId !== "all" || tagId !== "all"
      ? getFilteredBases({ search: query, typeId, teamSizeId, tagId })
      : Promise.resolve([]),
    getAllTypes(),
    getAllTeamSizes(),
    getAllTags(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <SearchIcon className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">Buscar Diseños de Bases</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Encuentra el diseño perfecto de base de Rust buscando por palabras clave o usando filtros.
              </p>

              <div className="mx-auto max-w-xl">
                <SearchInput initialQuery={query} placeholder="Buscar por título, descripción o características..." />
              </div>
            </div>
          </div>
        </section>

        {/* Ad Space - Top */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="search-page-top" format="horizontal" />
        </section>

        {/* Search Results */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} tags={tags} />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {query ? (
                <>
                  Se encontraron <span className="font-semibold text-foreground">{bases.length}</span> resultados para "
                  <span className="font-semibold text-foreground">{query}</span>"
                </>
              ) : bases.length > 0 ? (
                <>
                  Mostrando <span className="font-semibold text-foreground">{bases.length}</span> bases
                </>
              ) : (
                <>Ingresa un término de búsqueda o usa los filtros</>
              )}
            </div>
          </div>

          {bases.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bases.map((base) => (
                <BaseCard key={base.id} base={base} />
              ))}
            </div>
          ) : query || typeId !== "all" || teamSizeId !== "all" || tagId !== "all" ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No se encontraron bases</h3>
              <p className="text-muted-foreground">
                {query
                  ? `No se encontraron resultados para "${query}". Intenta con diferentes palabras clave o ajusta los filtros.`
                  : "No se encontraron bases con estos filtros. Intenta ajustar tu selección."}
              </p>
            </div>
          ) : null}
        </section>

        {/* Ad Space - Bottom */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="search-page-bottom" format="horizontal" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
