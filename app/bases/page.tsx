import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { FilterBar } from "@/components/filter-bar"

import { StructuredData } from "@/components/structured-data"
import { getFilteredBases, getAllTypes, getAllTeamSizes, getAllFootprints } from "@/lib/db-queries"
import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const dynamic = "force-dynamic"

interface BasesPageProps {
  searchParams: Promise<{
    type?: string
    teamSize?: string
    footprint?: string
  }>
}

export async function generateMetadata({ searchParams }: BasesPageProps): Promise<Metadata> {
  const params = await searchParams
  const typeId = params.type
  const teamSizeId = params.teamSize
  const footprintId = params.footprint

  const year = new Date().getFullYear()

  let title = `All Rust Base Designs ${year} | Best Rust Bases`
  let description = `Browse our complete collection of Rust base designs for ${year}. Filter by team size (Solo/Duo/Trio/Quad), type, and footprint. Updated daily with the best bases.`

  if (typeId && typeId !== "all") {
    title = `${typeId} Rust Bases ${year} | Best Designs`
    description = `Explore the best ${typeId} base designs for Rust ${year}. Detailed video tutorials, build costs, and raid defense guides for ${typeId} bases.`
  } else if (teamSizeId && teamSizeId !== "all") {
    title = `Best Rust ${teamSizeId} Bases ${year} | Top Designs`
    description = `Find the best Rust base designs for ${teamSizeId} teams in ${year}. From starter bases to main bases, optimized for ${teamSizeId} players.`
  } else if (footprintId && footprintId !== "all") {
    title = `Rust ${footprintId} Base Designs ${year}`
    description = `Discover top Rust base designs with ${footprintId} footprint for ${year}. Efficient and strong builds for any team size.`
  }

  return {
    title,
    description,
    keywords: [
      "rust base designs",
      `rust base designs ${year}`,
      "best rust bases",
      "rust building",
      "rust console base designs",
      typeId !== "all" ? `rust ${typeId} base` : "",
      teamSizeId !== "all" ? `rust ${teamSizeId} base` : "",
    ].filter(Boolean),
    openGraph: {
      title: `${title} | RustBaseLab`,
      description,
      url: "https://rustbaselab.com/bases",
      type: "website",
    },
    alternates: {
      canonical: "https://rustbaselab.com/bases",
    },
  }
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

      {/* Structured Data for SEO */}
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rustbaselab.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Bases",
                item: "https://rustbaselab.com/bases",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Rust Base Designs Collection",
            description: "Browse our complete collection of Rust base designs for all team sizes.",
            url: "https://rustbaselab.com/bases",
          },
        ]}
      />

      <main className="flex-1">
        <section className="border-b-2 border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Breadcrumbs items={[{ label: "Bases" }]} />
          </div>
        </section>

        <section className="border-b-2 border-border bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent)]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto px-4 py-12">
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">ALL BASE DESIGNS</h1>
            <p className="text-lg text-muted-foreground">
              Explore our complete collection of Rust base designs for all team sizes
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <FilterBar types={types} teamSizes={teamSizes} footprints={footprints} />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">SHOWING {bases.length} BASES</div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {bases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground">NO BASES FOUND WITH THESE FILTERS</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div >
  )
}
