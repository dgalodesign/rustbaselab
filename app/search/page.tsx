"use client"

import { useState, useMemo, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { SearchInput } from "@/components/search-input"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { mockBases } from "@/lib/mock-data"
import { SearchIcon } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredBases = useMemo(() => {
    return mockBases.filter((base) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        base.title.toLowerCase().includes(searchLower) ||
        base.description.toLowerCase().includes(searchLower) ||
        base.category.toLowerCase().includes(searchLower)

      // Category filter
      const matchesCategory = categoryFilter === "all" || base.category === categoryFilter

      // Difficulty filter
      const matchesDifficulty = difficultyFilter === "all" || base.difficulty === difficultyFilter

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchQuery, categoryFilter, difficultyFilter])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleFilterChange = useCallback((category: string, difficulty: string) => {
    setCategoryFilter(category)
    setDifficultyFilter(difficulty)
  }, [])

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
                <SearchInput onSearch={handleSearch} placeholder="Search by title, description, or category..." />
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
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {searchQuery ? (
                <>
                  Found <span className="font-semibold text-foreground">{filteredBases.length}</span> results for "
                  <span className="font-semibold text-foreground">{searchQuery}</span>"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-foreground">{filteredBases.length}</span> bases
                </>
              )}
            </div>
          </div>

          {filteredBases.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBases.map((base) => (
                <BaseCard key={base.id} base={base} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No bases found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `No results found for "${searchQuery}". Try different keywords or adjust your filters.`
                  : "Try adjusting your filters to see more results."}
              </p>
            </div>
          )}
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
