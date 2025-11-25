import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { RelatedBases } from "@/components/related-bases"
import { BackToHome } from "@/components/back-to-home"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  getBaseBySlug,
  getRelatedBases,
  getBasesByCreator,
  incrementBaseViews,
  incrementYoutubeClicks,
} from "@/lib/db-queries"
import { Clock, Hammer, Calendar, Users, TagIcon } from "lucide-react"
import type { Metadata } from "next"
import { createPublicClient } from "@/lib/supabase/public-client"
import Image from "next/image"
import { BaseActions } from "@/components/base-actions"
import { revalidatePath } from "next/cache"
import { RequestInfoButton } from "@/components/request-info-button"

export const dynamic = "force-dynamic"

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
  const base = await getBaseBySlug(slug)

  if (!base) {
    return {
      title: "Base Not Found",
    }
  }

  return {
    title: `${base.title} - RustBaseLab`,
    description: base.features || base.title,
    openGraph: {
      title: base.title,
      description: base.features || base.title,
      type: "article",
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
  const base = await getBaseBySlug(slug)

  if (!base) {
    notFound()
  }

  await incrementBaseViews(base.id)
  await incrementYoutubeClicks(base.id)

  const supabase = createPublicClient()

  const { data: baseTeamsData } = await supabase
    .from("base_teams")
    .select("team_size_id, team_sizes(name)")
    .eq("base_id", base.id)

  const baseTeams = baseTeamsData as BaseTeamResult[] | null
  const teamSizes = (baseTeams?.map((bt) => bt.team_sizes?.name).filter((name): name is string => name !== undefined) ||
    []) as string[]
  const teamSizeIds = baseTeams?.map((bt) => bt.team_size_id).filter(Boolean) || []

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

    const requestType = formData.get("requestType") as "build_cost" | "upkeep"

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("[v0] Supabase configuration missing")
        return { success: false, error: "Configuration missing" }
      }

      if (!base) {
        console.error("[v0] Base not found")
        return { success: false, error: "Base not found" }
      }

      const title = "Update Material Cost"
      const message = base.title

      const response = await fetch(`${supabaseUrl}/functions/v1/notion-create-record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          title,
          message,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("[v0] Edge function error:", error)
        return { success: false, error: "Failed to create record" }
      }

      revalidatePath(`/base/${base.slug}`)
      return { success: true, message: "Request sent successfully! We'll update the information soon." }
    } catch (error) {
      console.error("[v0] Error creating record:", error)
      return { success: false, error: "Internal error" }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b-2 border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <BackToHome />
          </div>
        </section>

        <section className="border-b-2 border-border bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="container relative mx-auto px-4 py-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {base.type?.name && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-2 border-primary/30 font-mono font-bold"
                >
                  {base.type.name.toUpperCase()}
                </Badge>
              )}
              {base.footprint?.name && (
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-2 border-secondary/30 font-mono font-bold"
                >
                  {base.footprint.name.toUpperCase()}
                </Badge>
              )}
              {teamSizes.map((size: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-accent/10 text-accent border-2 border-accent/30 font-mono font-bold"
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
              {base.raid_cost_sulfur && (
                <div className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  <span className="font-mono">RAID: {base.raid_cost_sulfur.toLocaleString()} SULFUR</span>
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
                  <YouTubeEmbed videoId={base.video_youtube_id} title={base.title} />
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

                <BaseActions
                  base={{
                    id: base.id,
                    title: base.title,
                    slug: base.slug,
                    image_url: base.image_url,
                    type: base.type?.name,
                    team_size: teamSizes,
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-border bg-card">
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

              <Card className="border-2 border-border bg-card">
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
