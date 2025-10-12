"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { mockBases } from "@/lib/mock-data"

export default function BasesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredBases = useMemo(() => {
    return mockBases.filter((base) => {
      const categoryMatch = categoryFilter === "all" || base.category === categoryFilter
      const difficultyMatch = difficultyFilter === "all" || base.difficulty === difficultyFilter
      return categoryMatch && difficultyMatch
    })
  }, [categoryFilter, difficultyFilter])

  const handleFilterChange = (category: string, difficulty: string) => {
    setCategoryFilter(category)
    setDifficultyFilter(difficulty)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">All Base Designs</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of Rust base designs for all team sizes and skill levels.
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
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredBases.length} of {mockBases.length} bases
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {filteredBases.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No bases found matching your filters.</p>
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
