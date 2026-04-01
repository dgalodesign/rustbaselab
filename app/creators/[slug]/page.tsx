import { getAllCreators, getAllBasesByCreatorId } from "@/lib/db-queries"
import { slugifyCreator } from "@/lib/utils/base-helpers"
import { BaseCard } from "@/components/base-card"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Footer } from "@/components/footer"
import { Youtube, Layout, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const revalidate = 3600

// ─── Static Params ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const creators = await getAllCreators()
  return creators.map((c) => ({ slug: slugifyCreator(c.name) }))
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const creators = await getAllCreators()
  const creator = creators.find((c) => slugifyCreator(c.name) === slug)

  if (!creator) return { title: "Creator not found" }

  const title = `${creator.name} Rust Bases — All Designs`
  const description = `Browse all Rust base designs by ${creator.name}. Step-by-step video tutorials for every base, optimized for solo, duo, trio, and group play.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | RustBaseLab`,
      description,
      url: `https://rustbaselab.com/creators/${slug}`,
      type: "profile",
    },
    alternates: {
      canonical: `https://rustbaselab.com/creators/${slug}`,
    },
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const creators = await getAllCreators()
  const creator = creators.find((c) => slugifyCreator(c.name) === slug)

  if (!creator) notFound()

  const bases = await getAllBasesByCreatorId(creator.id)
  const channelUrl = creator.channel_youtube_id
    ? `https://www.youtube.com/channel/${creator.channel_youtube_id}`
    : null

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: creator.name,
      url: `https://rustbaselab.com/creators/${slug}`,
      ...(channelUrl && {
        sameAs: [channelUrl],
        knowsAbout: ["Rust", "base building", "game strategy"],
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${creator.name} Rust Bases`,
      description: `All Rust base designs by ${creator.name} on RustBaseLab.`,
      url: `https://rustbaselab.com/creators/${slug}`,
      numberOfItems: bases.length,
    },
  ]

  return (
    <>
      <StructuredData data={structuredData} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b-2 border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: "Creators", href: "/creators" },
                { label: creator.name },
              ]}
            />
          </div>
        </section>

        {/* Hero */}
        <section className="border-b-2 border-border bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(86,117,162,0.12),transparent)]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-3xl font-bold font-display text-primary">
                {creator.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h1 className="font-display text-4xl font-bold md:text-5xl mb-2">
                  {creator.name.toUpperCase()}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Layout className="h-4 w-4" />
                    <span>
                      {bases.length} base{bases.length !== 1 ? "s" : ""} published
                    </span>
                  </div>
                  {channelUrl && (
                    <a
                      href={channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Youtube className="h-4 w-4" />
                      <span>YouTube Channel</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bases grid */}
        <section className="container mx-auto px-4 py-12">
          {bases.length === 0 ? (
            <div className="py-16 text-center border-2 border-border rounded-lg bg-card space-y-2">
              <p className="text-lg font-bold">NO BASES YET</p>
              <p className="text-sm text-muted-foreground">
                {creator.name} hasn&apos;t published any bases yet — check back soon.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                SHOWING {bases.length} BASE{bases.length !== 1 ? "S" : ""} BY {creator.name.toUpperCase()}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bases.map((base) => (
                  <BaseCard key={base.id} base={base} />
                ))}
              </div>
            </>
          )}

          <div className="mt-12 pt-8 border-t-2 border-border">
            <Button variant="outline" asChild className="border-2">
              <Link href="/creators">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Creators
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
