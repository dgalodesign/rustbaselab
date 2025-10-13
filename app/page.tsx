import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllBases, getFeaturedBases } from "@/lib/db-queries"

export default async function HomePage() {
  const [allBases, featuredBases] = await Promise.all([getAllBases(), getFeaturedBases()])

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
                <span className="font-medium">Best Rust Base Designs</span>
              </div>
              <h1 className="mb-6 font-mono text-4xl font-bold leading-tight text-balance md:text-6xl">
                Build Smarter, Survive Longer
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                Discover professional Rust base designs with detailed video tutorials. From solo starter bases to
                massive zerg fortresses.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/bases">
                    Browse All Bases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/search">Search Bases</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Space - Top */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="homepage-top" format="horizontal" />
        </section>

        {/* Featured Bases */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 font-mono text-3xl font-bold">Featured Bases</h2>
              <p className="text-muted-foreground">Hand-picked designs from our community</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>
        </section>

        {/* Ad Space - Middle */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="homepage-middle" format="horizontal" />
        </section>

        {/* All Bases with Filters */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="mb-2 font-mono text-3xl font-bold">All Base Designs</h2>
            <p className="text-muted-foreground">Filter by category and difficulty to find your perfect base</p>
          </div>

          <div className="mb-6">
            <FilterBar />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {allBases.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No bases found.</p>
            </div>
          )}
        </section>

        {/* Ad Space - Bottom */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="homepage-bottom" format="horizontal" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
