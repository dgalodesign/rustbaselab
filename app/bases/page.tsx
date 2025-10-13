import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { getAllBases } from "@/lib/db-queries"

export default async function BasesPage() {
  const bases = await getAllBases()

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
            <FilterBar />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">Showing {bases.length} bases</div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {bases.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No bases found.</p>
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
