import { getAllCreators, getAllBasesByCreatorId } from "@/lib/db-queries"
import { slugifyCreator } from "@/lib/utils/base-helpers"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Footer } from "@/components/footer"
import { Users, Youtube, Layout } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { Creator } from "@/lib/types"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Rust Base Creators — Top Builders & Designers",
  description:
    "Discover the best Rust base designers and creators. Browse bases from RustLogic, STELIC, Limi Lab and more — all with step-by-step video tutorials.",
  keywords: [
    "rust base creators",
    "rust base designers",
    "rustlogic bases",
    "best rust builders",
    "rust youtube base designers",
  ],
  openGraph: {
    title: "Rust Base Creators | RustBaseLab",
    description: "Browse bases from the top Rust base designers and creators.",
    url: "https://rustbaselab.com/creators",
    type: "website",
  },
  alternates: {
    canonical: "https://rustbaselab.com/creators",
  },
}

export default async function CreatorsPage() {
  const creators = await getAllCreators()

  // Fetch base counts per creator in parallel
  const creatorBaseCounts = await Promise.all(
    creators.map(async (creator) => {
      const bases = await getAllBasesByCreatorId(creator.id)
      return { creatorId: creator.id, count: bases.length }
    })
  )
  const countMap = Object.fromEntries(
    creatorBaseCounts.map(({ creatorId, count }) => [creatorId, count])
  )

  // Only show creators with at least 1 published base
  const activeCreators = creators.filter((c) => (countMap[c.id] ?? 0) > 0)

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Rust Base Creators",
          description: "Top Rust base designers and their published base collections on RustBaseLab.",
          url: "https://rustbaselab.com/creators",
          publisher: {
            "@type": "Organization",
            name: "RustBaseLab",
            url: "https://rustbaselab.com",
          },
        }}
      />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs items={[{ label: "Creators" }]} />
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="font-display text-4xl font-bold md:text-5xl">BASE CREATORS</h1>
              <Users className="text-primary size-10" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The builders behind the designs. Each creator specializes in different playstyles — find the one that
              matches how you play.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          {activeCreators.length === 0 ? (
            <div className="py-16 text-center border border-border rounded-lg bg-card space-y-2">
              <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-lg font-bold">NO CREATORS YET</p>
              <p className="text-sm text-muted-foreground">Check back soon.</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                SHOWING {activeCreators.length} CREATOR{activeCreators.length !== 1 ? "S" : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeCreators.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    baseCount={countMap[creator.id] ?? 0}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

function CreatorCard({ creator, baseCount }: { creator: Creator; baseCount: number }) {
  const slug = slugifyCreator(creator.name)
  const channelUrl = creator.channel_youtube_id
    ? `https://www.youtube.com/channel/${creator.channel_youtube_id}`
    : null

  return (
    <Link
      href={`/creators/${slug}`}
      className="group relative flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
    >
      {/* Avatar */}
      <div className="mb-4 h-14 w-14 shrink-0 rounded-full border border-border group-hover:border-primary transition-colors overflow-hidden">
        {creator.avatar_url ? (
          <Image
            src={creator.avatar_url}
            alt={creator.name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-background text-xl font-bold font-display text-primary">
            {creator.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <h2 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors">
        {creator.name}
      </h2>

      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Layout className="h-4 w-4" />
          <span>
            {baseCount} base{baseCount !== 1 ? "s" : ""}
          </span>
        </div>
        {channelUrl && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
            <Youtube className="h-4 w-4 text-red-500" />
            <span>YouTube</span>
          </div>
        )}
      </div>
    </Link>
  )
}
