import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostContent,
  getRelatedPosts,
  estimateReadingTime,
} from "@/lib/notion-blog"
import { NotionBlockRenderer } from "@/components/notion-block-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Footer } from "@/components/footer"
import { CalendarDays, Tag, Clock, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const revalidate = 3600

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post not found" }
  }

  const description = post.description || `Read ${post.title} on RustBaseLab`
  const ogImage = post.coverImageUrl
    ? [{ url: post.coverImageUrl, width: 1200, height: 630, alt: post.title }]
    : [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }]

  return {
    title: post.title,
    description,
    keywords: post.tags.length > 0 ? post.tags : undefined,
    openGraph: {
      title: `${post.title} | RustBaseLab`,
      description,
      url: `https://rustbaselab.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedDate ?? undefined,
      modifiedTime: post.updatedDate ?? post.publishedDate ?? undefined,
      authors: ["https://rustbaselab.com"],
      tags: post.tags,
      images: ogImage,
    },
    alternates: {
      canonical: `https://rustbaselab.com/blog/${slug}`,
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, content] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPostBySlug(slug).then((p) => (p ? getBlogPostContent(p.id) : [])),
  ])

  if (!post) notFound()

  const readingTime = estimateReadingTime(content)
  const relatedPosts = await getRelatedPosts(slug, post.category)
  const description = post.description || post.title

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.coverImageUrl ?? "https://rustbaselab.com/og-image.png",
    datePublished: post.publishedDate ?? undefined,
    dateModified: post.updatedDate ?? post.publishedDate ?? undefined,
    inLanguage: "en-US",
    articleSection: post.category ?? undefined,
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    author: {
      "@type": "Organization",
      name: "RustBaseLab",
      url: "https://rustbaselab.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RustBaseLab",
      url: "https://rustbaselab.com",
      logo: {
        "@type": "ImageObject",
        url: "https://rustbaselab.com/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rustbaselab.com/blog/${slug}`,
    },
  }

  const shareUrl = `https://rustbaselab.com/blog/${slug}`
  const shareText = encodeURIComponent(post.title)

  return (
    <>
      <StructuredData data={structuredData} />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
        </section>

        <article className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            {/* Category badge */}
            {post.category && (
              <span
                className={`inline-block rounded border px-2.5 py-1 text-xs font-bold uppercase mb-4 ${
                  categoryColors[post.category] ?? "bg-muted text-muted-foreground border-border"
                }`}
              >
                {post.category}
              </span>
            )}

            {/* Title */}
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-lg text-muted-foreground mb-5">{post.description}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-3">
              {post.publishedDate && (
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="h-4 w-4" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Cover image */}
          {post.coverImageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border mb-8">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents blocks={content} />

          {/* Content */}
          <section>
            {content.length > 0 ? (
              <NotionBlockRenderer blocks={content} />
            ) : (
              <p className="text-muted-foreground italic">Content coming soon...</p>
            )}
          </section>

          {/* Share + Back */}
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Button variant="outline" asChild className="border">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Share on X (Twitter)"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Share on Reddit"
              >
                Reddit
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-12" aria-label="Related guides">
              <h2 className="font-display font-bold text-xl text-foreground mb-4">
                Related Guides
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group rounded-lg border border-border bg-card p-4 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col gap-2"
                  >
                    {related.category && (
                      <span
                        className={`self-start rounded border px-2 py-0.5 text-xs font-bold uppercase ${
                          categoryColors[related.category] ?? "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {related.category}
                      </span>
                    )}
                    <p className="font-display font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">
                      {related.title}
                    </p>
                    {related.publishedDate && (
                      <p className="text-xs text-muted-foreground mt-auto">
                        {formatDate(related.publishedDate)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  )
}
