import { getAllBlogPosts } from "@/lib/notion-blog"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SectionHeader } from "@/components/section-header"
import { Footer } from "@/components/footer"
import { BookOpen, CalendarDays, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Rust Blog — Guides & Tutorials",
  description:
    "Learn advanced Rust building techniques, base strategies, and meta guides. Step-by-step tutorials for solo, duo, trio, and zerg players.",
  keywords: [
    "rust building guide",
    "rust base tutorial",
    "rust honeycomb guide",
    "rust bunker guide",
    "rust wipe day strategy",
    "rust TC placement",
    "rust footprint guide",
  ],
  openGraph: {
    title: "Rust Blog — Guides & Tutorials | RustBaseLab",
    description: "Advanced Rust building techniques, base strategies, and meta guides.",
    url: "https://rustbaselab.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://rustbaselab.com/blog",
  },
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const categoryColors: Record<string, string> = {
  Guide: "bg-primary/15 text-primary border-primary/30",
  Tutorial: "bg-secondary/15 text-secondary border-secondary/30",
  Strategy: "bg-accent/15 text-accent border-accent/30",
  Meta: "bg-destructive/15 text-destructive border-destructive/30",
}

const ALL_CATEGORIES = ["Guide", "Tutorial", "Strategy", "Meta"]

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const allPosts = await getAllBlogPosts()

  const activeCategory = ALL_CATEGORIES.includes(category ?? "") ? category! : null
  const posts = activeCategory ? allPosts.filter((p) => p.category === activeCategory) : allPosts

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Rust Blog — Guides & Tutorials",
          description:
            "Advanced Rust building techniques, base strategies, and meta guides for all team sizes.",
          url: "https://rustbaselab.com/blog",
          numberOfItems: allPosts.length,
          publisher: {
            "@type": "Organization",
            name: "RustBaseLab",
            url: "https://rustbaselab.com",
          },
        }}
      />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Breadcrumbs items={[{ label: "Blog" }]} />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <SectionHeader
            icon={BookOpen}
            title="RUST BLOG"
            description="Guides, tutorials, and strategies for every player"
            className="border-none pb-2"
          />

          {/* Category filters */}
          <nav className="flex flex-wrap gap-2 mt-4" aria-label="Filter by category">
            <Link
              href="/blog"
              className={`rounded border px-3 py-1 text-xs font-bold uppercase transition-colors ${
                !activeCategory
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`rounded border px-3 py-1 text-xs font-bold uppercase transition-colors ${
                  activeCategory === cat
                    ? categoryColors[cat]
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>

          {posts.length === 0 ? (
            <div className="py-16 text-center border border-border rounded-lg bg-card space-y-2 mt-6">
              <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-lg font-bold">NO POSTS YET</p>
              <p className="text-sm text-muted-foreground">Check back soon — guides are on the way!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] flex flex-col"
                >
                  {/* Cover image */}
                  {post.coverImageUrl ? (
                    <div className="relative aspect-video overflow-hidden border-b border-border">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted/30 border-b border-border flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}

                  <div className="flex flex-col gap-3 p-5 flex-1">
                    {/* Category */}
                    {post.category && (
                      <span
                        className={`self-start rounded border px-2 py-0.5 text-xs font-bold uppercase ${
                          categoryColors[post.category] ?? "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="font-display font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    {post.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {post.description}
                      </p>
                    )}

                    {/* Tags + Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-2 border-t border-border">
                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                          )}
                        </div>
                      )}
                      {post.publishedDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <CalendarDays className="h-3 w-3" />
                          <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
