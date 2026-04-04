import { notFound } from "next/navigation"
import { cache } from "react"
import { SULFUR_PER_ROCKET, SULFUR_PER_C4, SULFUR_PER_SATCHEL } from "@/lib/constants"

import { Footer } from "@/components/footer"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { RelatedBases } from "@/components/related-bases"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import {
  getBaseBySlug,
  getRelatedBases,
  getBasesByCreator,
  incrementBaseViews,
} from "@/lib/db-queries"
import { Clock, Hammer, Calendar, Users, TagIcon } from "lucide-react"
import type { Metadata } from "next"
import { createPublicClient } from "@/lib/supabase/public-client"
import Image from "next/image"
import { BaseActions } from "@/components/base-actions"
import { revalidatePath } from "next/cache"
import { RequestInfoButton } from "@/components/request-info-button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { logger } from "@/lib/logger"

/**
 * Cached fetchers — React's cache() deduplicates calls within the same
 * request/render cycle, so generateMetadata and the Page component share
 * a single DB round-trip for the same slug.
 */
const getCachedBase = cache((slug: string) => getBaseBySlug(slug))

const getCachedBaseTeams = cache((baseId: string) =>
  createPublicClient()
    .from("base_teams")
    .select("team_size_id, team_sizes(name)")
    .eq("base_id", baseId)
)

export const revalidate = 3600 // Revalidate every hour (ISR)

interface BasePageProps {
  params: Promise<{
    slug: string
  }>
}

interface BaseTeamResult {
  team_size_id: string
  team_sizes: { name: string } | null
}

interface BaseTagResult {
  tags: { tag: string; description: string | null } | null
}

export async function generateMetadata({ params }: BasePageProps): Promise<Metadata> {
  const { slug } = await params
  const base = await getCachedBase(slug)

  if (!base) {
    return {
      title: "Base Not Found",
    }
  }

  // Reuse the cached query — no extra DB round-trip if the page also calls this
  const { data: baseTeamsData } = await getCachedBaseTeams(base.id)

  const teamSizes = (baseTeamsData?.map((bt: any) => bt.team_sizes?.name).filter(Boolean) || []) as string[]

  // Dynamic Year Logic
  const year = new Date().getFullYear()

  // Smart Title Logic: Avoid duplicate team sizes
  const teamSizeString = teamSizes.join('/')
  const titleSuffix = base.title.toLowerCase().includes(teamSizeString.toLowerCase())
    ? `Base Design Rust ${year}`
    : `${teamSizeString} Base Design Rust ${year}`

  // Clean up double spaces if teamSizeString is empty
  const cleanTitleSuffix = titleSuffix.replace(/^\s+/, '')
  const title = `${base.title} | ${cleanTitleSuffix}`

  // Enhanced Description
  const baseType = base.type?.name || "Base"
  const footprint = base.footprint?.name || "standard"
  const raidCost = base.raid_rockets ? `🛡️ Raid Cost: ${(base.raid_rockets * SULFUR_PER_ROCKET).toLocaleString()} Sulfur.` : ""
  const buildTime = base.build_time_min ? `⚡ Build Time: ${base.build_time_min}m.` : ""

  const description = base.features ||
    `Discover the best ${baseType} design for Rust ${year}. ${footprint} footprint optimized for ${teamSizes.join('/') || "any team"}. ${raidCost} ${buildTime} Easy to build & hard to raid tutorial.`

  // Usar thumbnail de YouTube si está disponible
  const ogImage = base.video_youtube_id
    ? `https://i.ytimg.com/vi/${base.video_youtube_id}/maxresdefault.jpg`
    : "/logo.svg"

  return {
    title,
    description,
    keywords: [
      "rust base",
      "rust base design",
      `rust base design ${year}`,
      base.type?.name || "base design",
      base.footprint?.name || "rust building",
      "rust tutorial",
      "rust building guide",
      base.creator?.name || "rust base builder",
      ...teamSizes.map(size => `rust ${size} base`),
    ],
    authors: base.creator?.name ? [{ name: base.creator.name }] : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://rustbaselab.com/base/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: base.title,
        },
      ],
      publishedTime: base.created_at,
      modifiedTime: base.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://rustbaselab.com/base/${slug}`,
    },
  }
}


function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Published today"
  if (diffInDays === 1) return "Published 1 day ago"
  if (diffInDays < 30) return `Published ${diffInDays} days ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths === 1) return "Published 1 month ago"
  if (diffInMonths < 12) return `Published ${diffInMonths} months ago`

  const diffInYears = Math.floor(diffInMonths / 12)
  if (diffInYears === 1) return "Published 1 year ago"
  return `Published ${diffInYears} years ago`
}

export default async function BasePage({ params }: BasePageProps) {
  const { slug } = await params
  const base = await getCachedBase(slug)

  if (!base) {
    notFound()
  }

  await incrementBaseViews(base.id)

  // Reuses the cached query from generateMetadata (same request cycle → no extra DB call)
  const { data: baseTeamsData } = await getCachedBaseTeams(base.id)

  const baseTeams = baseTeamsData as BaseTeamResult[] | null
  const teamSizes = (baseTeams?.map((bt) => bt.team_sizes?.name).filter((name): name is string => name !== undefined) ||
    []) as string[]
  const teamSizeIds = baseTeams?.map((bt) => bt.team_size_id).filter(Boolean) || []

  const supabase = createPublicClient()
  const { data: baseTagsData } = await supabase
    .from("base_tags")
    .select("tags(tag, description)")
    .eq("base_id", base.id)

  const baseTags = baseTagsData as BaseTagResult[] | null
  const tags =
    baseTags?.map((bt) => bt.tags).filter((tag): tag is { tag: string; description: string | null } => tag !== null) ||
    []

  const relatedBases = await getRelatedBases(base.id, teamSizeIds)

  const creatorBases = base.creator_id ? await getBasesByCreator(base.creator_id, base.id) : []

  async function requestInformation(formData: FormData) {
    "use server"

    if (!base) return { success: false, error: "Base not found" }

    const requestType = formData.get("requestType") as "build_cost" | "upkeep" | "raid_cost"

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        logger.error("[RustBaseLab] Supabase configuration missing in requestInformation")
        return { success: false, error: "Configuration missing" }
      }

      const title = "Update Material Cost"
      const message = base.title

      const response = await fetch(`${supabaseUrl}/functions/v1/notion-create-record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ title, message }),
      })

      if (!response.ok) {
        logger.error("[RustBaseLab] Edge function error in requestInformation", await response.text())
        return { success: false, error: "Failed to create record" }
      }

      revalidatePath(`/base/${base.slug}`)
      return { success: true, message: "Request sent successfully! We'll update the information soon." }
    } catch (error) {
      logger.error("[RustBaseLab] Error in requestInformation", error)
      return { success: false, error: "Internal error" }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">


      {/* Structured Data for SEO */}
      <StructuredData
        data={[
          // BreadcrumbList Schema
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
              {
                "@type": "ListItem",
                position: 3,
                name: base.title,
                item: `https://rustbaselab.com/base/${base.slug}`,
              },
            ],
          },
          // Article Schema
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: base.title,
            description: base.features || `${base.type?.name} base design for Rust`,
            image: base.video_youtube_id
              ? `https://i.ytimg.com/vi/${base.video_youtube_id}/maxresdefault.jpg`
              : "https://rustbaselab.com/logo.svg",
            datePublished: base.created_at,
            dateModified: base.updated_at,
            author: {
              "@type": "Person",
              name: base.creator?.name || "RustBaseLab",
            },
            publisher: {
              "@type": "Organization",
              name: "RustBaseLab",
              logo: {
                "@type": "ImageObject",
                url: "https://rustbaselab.com/logo.svg",
              },
            },
          },
          // VideoObject Schema (if video exists)
          ...(base.video_youtube_id
            ? [
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: base.title,
                description: base.features || `${base.type?.name} base design tutorial for Rust`,
                thumbnailUrl: `https://i.ytimg.com/vi/${base.video_youtube_id}/maxresdefault.jpg`,
                uploadDate: base.created_at,
                contentUrl: `https://www.youtube.com/watch?v=${base.video_youtube_id}`,
                embedUrl: `https://www.youtube.com/embed/${base.video_youtube_id}`,
                duration: base.build_time_min ? `PT${base.build_time_min}M` : undefined,
              },
            ]
            : []),
          // HowTo Schema for building instructions
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Build: ${base.title}`,
            description: base.features || `Step-by-step guide to building this ${base.type?.name || "base"} design in Rust`,
            image: base.video_youtube_id
              ? `https://i.ytimg.com/vi/${base.video_youtube_id}/maxresdefault.jpg`
              : "https://rustbaselab.com/logo.svg",
            totalTime: base.build_time_min ? `PT${base.build_time_min}M` : undefined,
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "RESOURCES",
              value: [
                base.materials_stone ? `${base.materials_stone.toLocaleString()} Stone` : null,
                base.materials_metal ? `${base.materials_metal.toLocaleString()} Metal Fragments` : null,
                base.materials_hq ? `${base.materials_hq.toLocaleString()} HQM` : null,
              ].filter(Boolean).join(", ") || "Materials not specified",
            },
            tool: [
              {
                "@type": "HowToTool",
                name: "Building Plan",
              },
              {
                "@type": "HowToTool",
                name: "Hammer",
              },
            ],
            supply: [
              ...(base.materials_stone ? [{
                "@type": "HowToSupply",
                name: "Stone",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "RESOURCES",
                  value: base.materials_stone.toLocaleString(),
                },
              }] : []),
              ...(base.materials_metal ? [{
                "@type": "HowToSupply",
                name: "Metal Fragments",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "RESOURCES",
                  value: base.materials_metal.toLocaleString(),
                },
              }] : []),
              ...(base.materials_hq ? [{
                "@type": "HowToSupply",
                name: "High Quality Metal",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "RESOURCES",
                  value: base.materials_hq.toLocaleString(),
                },
              }] : []),
            ],
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Gather Materials",
                text: `Collect the required materials: ${[
                  base.materials_stone ? `${base.materials_stone.toLocaleString()} Stone` : null,
                  base.materials_metal ? `${base.materials_metal.toLocaleString()} Metal Fragments` : null,
                  base.materials_hq ? `${base.materials_hq.toLocaleString()} High Quality Metal` : null,
                ].filter(Boolean).join(", ") || "materials as shown in the build cost section"}`,
                url: `https://rustbaselab.com/base/${base.slug}#build-cost`,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose Location",
                text: `Find a suitable location for your ${base.footprint?.name || "standard"} footprint base. Consider proximity to resources and monuments.`,
                url: `https://rustbaselab.com/base/${base.slug}`,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Follow Video Tutorial",
                text: base.video_youtube_id
                  ? `Watch the complete building tutorial to see the exact placement and building order for this ${base.type?.name || "base"} design.`
                  : `Follow the base design specifications for this ${base.type?.name || "base"}.`,
                url: base.video_youtube_id
                  ? `https://www.youtube.com/watch?v=${base.video_youtube_id}`
                  : `https://rustbaselab.com/base/${base.slug}`,
                video: base.video_youtube_id ? {
                  "@type": "VideoObject",
                  name: base.title,
                  thumbnailUrl: `https://i.ytimg.com/vi/${base.video_youtube_id}/maxresdefault.jpg`,
                  contentUrl: `https://www.youtube.com/watch?v=${base.video_youtube_id}`,
                  embedUrl: `https://www.youtube.com/embed/${base.video_youtube_id}`,
                  uploadDate: base.created_at,
                } : undefined,
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Upgrade and Secure",
                text: "Upgrade walls and doors to metal or armored. Add code locks and ensure all entry points are secured.",
                url: `https://rustbaselab.com/base/${base.slug}`,
              },
              ...(base.upkeep_stone || base.upkeep_metal || base.upkeep_hq ? [{
                "@type": "HowToStep",
                position: 5,
                name: "Maintain Upkeep",
                text: `Keep your base maintained with ${[
                  base.upkeep_stone ? `${base.upkeep_stone.toLocaleString()} Stone` : null,
                  base.upkeep_metal ? `${base.upkeep_metal.toLocaleString()} Metal` : null,
                  base.upkeep_hq ? `${base.upkeep_hq.toLocaleString()} HQM` : null,
                ].filter(Boolean).join(", ")} per 24 hours in the Tool Cupboard.`,
                url: `https://rustbaselab.com/base/${base.slug}#upkeep`,
              }] : []),
            ],
          },
        ]}
      />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Breadcrumbs
              items={[
                { label: "Bases", href: "/bases" },
                { label: base.title },
              ]}
            />
          </div>
        </section>

        <section className="border-b border-border bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" aria-hidden="true" />
          <div className="container relative mx-auto px-4 py-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {base.type?.name && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border border-primary/30 font-mono font-bold"
                >
                  {base.type.name.toUpperCase()}
                </Badge>
              )}
              {base.footprint?.name && (
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border border-secondary/30 font-mono font-bold"
                >
                  {base.footprint.name.toUpperCase()}
                </Badge>
              )}
              {teamSizes.map((size: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-accent/10 text-accent border border-accent/30 font-mono font-bold"
                >
                  {size.toUpperCase()}
                </Badge>
              ))}
            </div>

            <h1 className="mb-4 font-display text-4xl font-bold text-balance md:text-5xl text-foreground">
              {base.title.toUpperCase()}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {base.creator?.name && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-sans">by {base.creator.name}</span>
                </div>
              )}
              {base.build_time_min && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">TIME: {base.build_time_min} MIN</span>
                </div>
              )}
              {base.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-sans">{getRelativeTime(base.created_at)}</span>
                </div>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <TagIcon className="h-4 w-4 text-muted-foreground" />
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="font-mono">
                    {tag.tag.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {base.video_youtube_id && (
                <div className="mb-8">
                  <YouTubeEmbed videoId={base.video_youtube_id} title={base.title} baseId={base.id} />
                </div>
              )}

              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold font-display text-foreground">ABOUT THIS BASE</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-foreground">
                    Design of a {base.type?.name || "standard"} base, intended for{" "}
                    {teamSizes.length > 0 ? teamSizes.join("/") : "any"} teams with an initial footprint of{" "}
                    {base.footprint?.name || "standard"}.
                  </p>
                  <p>This base design provides a solid foundation for your Rust gameplay.</p>

                  {base.video_youtube_id && (
                    <p>
                      Watch the complete tutorial above to see the full building process, including tips for optimal
                      placement and defensive strategies.
                    </p>
                  )}
                </div>

                <BaseActions base={base} />
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold font-display text-foreground mb-0">BUILD COST</h3>
                  <p className="mb-4 text-muted-foreground text-sm">Materials for base construction</p>
                  {base.materials_stone || base.materials_metal || base.materials_hq ? (
                    <div className="space-y-3">
                      {base.materials_stone && base.materials_stone > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/stones.webp"
                            alt="Stone"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.materials_stone.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {base.materials_metal && base.materials_metal > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/metal-fragments.webp"
                            alt="Metal Fragments"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.materials_metal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {base.materials_hq && base.materials_hq > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/high-quality-metal.webp"
                            alt="High Quality Metal"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.materials_hq.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-4 items-start">
                      <p className="text-sm text-center text-muted-foreground">Materials not specified for this base</p>
                      <RequestInfoButton requestType="build_cost" action={requestInformation} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold font-display text-foreground mb-0">UPKEEP</h3>
                  <p className="mb-4 text-muted-foreground text-sm">Materials for 24h maintenance</p>
                  {base.upkeep_stone || base.upkeep_metal || base.upkeep_hq ? (
                    <div className="space-y-3">
                      {base.upkeep_stone && base.upkeep_stone > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/stones.webp"
                            alt="Stone"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.upkeep_stone.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {base.upkeep_metal && base.upkeep_metal > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/metal-fragments.webp"
                            alt="Metal Fragments"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.upkeep_metal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {base.upkeep_hq && base.upkeep_hq > 0 && (
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icons/high-quality-metal.webp"
                            alt="High Quality Metal"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-foreground font-mono">
                            {base.upkeep_hq.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-4 items-start">
                      <p className="text-sm text-muted-foreground text-center">
                        Upkeep data not available for this base
                      </p>
                      <RequestInfoButton requestType="upkeep" action={requestInformation} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold font-display text-foreground mb-0">RAID COST</h3>
                  <p className="mb-4 text-muted-foreground text-sm">Explosives needed to destroy this base</p>
                  {base.raid_rockets ? (
                    <>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="flex flex-col items-center gap-1 rounded border border-border bg-muted/30 p-3">
                          <Image
                            src="/icons/rocket.webp"
                            alt="Rocket"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                          />
                          <span className="font-mono font-bold text-xl text-foreground">{base.raid_rockets}</span>
                          <span className="text-xs text-muted-foreground uppercase font-mono">Rockets</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded border border-border bg-muted/30 p-3">
                          <Image
                            src="/icons/c4.webp"
                            alt="C4"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                          />
                          <span className="font-mono font-bold text-xl text-foreground">
                            {Math.ceil((base.raid_rockets * SULFUR_PER_ROCKET) / SULFUR_PER_C4)}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase font-mono">C4</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded border border-border bg-muted/30 p-3">
                          <Image
                            src="/icons/satchel.webp"
                            alt="Satchel"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                          />
                          <span className="font-mono font-bold text-xl text-foreground">
                            {Math.ceil((base.raid_rockets * SULFUR_PER_ROCKET) / SULFUR_PER_SATCHEL)}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase font-mono">Satchels</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded border border-border/50 bg-muted/20 px-4 py-2">
                        <Image
                          src="/icons/sulfur.webp"
                          alt="Sulfur"
                          width={20}
                          height={20}
                          className="h-5 w-5 object-contain"
                        />
                        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                          ≈ {(base.raid_rockets * SULFUR_PER_ROCKET).toLocaleString()} Sulfur to craft
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3 py-4 items-start">
                      <p className="text-sm text-muted-foreground text-center">Raid cost not specified for this base</p>
                      <RequestInfoButton requestType="raid_cost" action={requestInformation} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {relatedBases.length > 0 && (
          <RelatedBases
            bases={relatedBases}
            title="SIMILAR TEAM SIZE BASES"
            description="Bases designed for similar team sizes"
          />
        )}

        {creatorBases.length > 0 && base.creator?.name && (
          <RelatedBases
            bases={creatorBases}
            title={`MORE FROM ${base.creator.name.toUpperCase()}`}
            description={`Other base designs by ${base.creator.name}`}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
