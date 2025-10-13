import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { SearchInput } from "@/components/search-input"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { searchBases } from "@/lib/db-queries"
import { SearchIcon } from "lucide-react"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = "" } = await searchParams
  const bases = query ? await searchBases(query) : []

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
              <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">Search Base Designs</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Find the perfect Rust base design by searching for keywords, categories, or difficulty levels.
              </p>

              <div className="mx-auto max-w-xl">
                <SearchInput initialQuery={query} placeholder="Search by title, description, or category..." />
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
            <FilterBar />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {query ? (
                <>
                  Found <span className="font-semibold text-foreground">{bases.length}</span> results for "
                  <span className="font-semibold text-foreground">{query}</span>"
                </>
              ) : (
                <>Enter a search term to find bases</>
              )}
            </div>
          </div>

          {bases.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bases.map((base) => (
                <BaseCard key={base.id} base={base} />
              ))}
            </div>
          ) : query ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No bases found</h3>
              <p className="text-muted-foreground">
                No results found for "{query}". Try different keywords or adjust your filters.
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
