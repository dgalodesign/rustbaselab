import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { SearchInput } from "@/components/search-input"
import { FilterBar } from "@/components/filter-bar"
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

export const dynamic = "force-dynamic"

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
              <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Search Base Designs</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Find the perfect Rust base design by searching keywords or using filters.
              </p>

              <div className="mx-auto max-w-xl">
                <SearchInput initialQuery={query} placeholder="Search by title, description or features..." />
              </div>
            </div>
          </div>
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
                  Found <span className="font-semibold text-foreground">{bases.length}</span> results for "
                  <span className="font-semibold text-foreground">{query}</span>"
                </>
              ) : bases.length > 0 ? (
                <>
                  Showing <span className="font-semibold text-foreground">{bases.length}</span> bases
                </>
              ) : (
                <>Enter a search term or use the filters</>
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
              <h3 className="mb-2 text-xl font-semibold font-display">No bases found</h3>
              <p className="text-muted-foreground">
                {query
                  ? `No results found for "${query}". Try different keywords or adjust the filters.`
                  : "No bases found with these filters. Try adjusting your selection."}
              </p>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}
