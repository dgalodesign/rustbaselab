import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { RelatedBases } from "@/components/related-bases"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getBaseById, getRelatedBases, incrementBaseViews } from "@/lib/db-queries"
import { Clock, Hammer, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

interface BasePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: BasePageProps): Promise<Metadata> {
  const { id } = await params
  const base = await getBaseById(id)

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

export default async function BasePage({ params }: BasePageProps) {
  const { id } = await params
  const base = await getBaseById(id)

  if (!base) {
    notFound()
  }

  await incrementBaseViews(id)

  const relatedBases = await getRelatedBases(id, base.type_id || null)

  const formatMaterials = () => {
    const materials = []
    if (base.materials_stone > 0) materials.push(`${base.materials_stone.toLocaleString()} Stone`)
    if (base.materials_metal > 0) materials.push(`${base.materials_metal.toLocaleString()} Metal`)
    if (base.materials_hq > 0) materials.push(`${base.materials_hq.toLocaleString()} HQM`)
    return materials.length > 0 ? materials.join(", ") : "Materials not specified"
  }

  const formatUpkeep = () => {
    const upkeep = []
    if (base.upkeep_stone > 0) upkeep.push(`${base.upkeep_stone.toLocaleString()} Stone`)
    if (base.upkeep_metal > 0) upkeep.push(`${base.upkeep_metal.toLocaleString()} Metal`)
    if (base.upkeep_hq > 0) upkeep.push(`${base.upkeep_hq.toLocaleString()} HQM`)
    return upkeep.length > 0 ? upkeep.join(", ") : "Upkeep not specified"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border/40 bg-muted/20">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>

        {/* Base Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {base.type?.name && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  {base.type.name}
                </Badge>
              )}
              {base.team_sizes && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {base.team_sizes}
                </Badge>
              )}
            </div>

            <h1 className="mb-4 font-mono text-4xl font-bold text-balance md:text-5xl">{base.title}</h1>
            {base.features && <p className="mb-6 text-lg text-muted-foreground text-pretty">{base.features}</p>}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {base.build_time_min && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Build Time: {base.build_time_min} min</span>
                </div>
              )}
              {base.raid_cost_sulfur && (
                <div className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  <span>Raid Cost: {base.raid_cost_sulfur.toLocaleString()} Sulfur</span>
                </div>
              )}
              {base.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Added: {new Date(base.created_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ad Space - Top */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="base-detail-top" format="horizontal" />
        </section>

        {/* Video and Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {base.video_youtube_id && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Video Tutorial</h2>
                  <YouTubeEmbed url={`https://www.youtube.com/watch?v=${base.video_youtube_id}`} title={base.title} />
                </div>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">About This Base</h3>
                  <div className="space-y-4 text-muted-foreground">
                    {base.features && <p>{base.features}</p>}
                    <p>
                      This base design is suitable for {base.team_sizes || "various team sizes"} and provides a solid
                      foundation for your Rust gameplay.
                    </p>
                    {base.video_youtube_id && (
                      <p>
                        Watch the full video tutorial above to see the complete building process, including tips for
                        optimal placement and defensive strategies.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Materials Required</h3>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Build Cost:</span>
                        <span className="font-mono font-semibold text-xs">{formatMaterials()}</span>
                      </div>
                      {(base.upkeep_stone > 0 || base.upkeep_metal > 0 || base.upkeep_hq > 0) && (
                        <div className="flex items-center justify-between pt-2 border-t border-border/40">
                          <span className="text-muted-foreground">Upkeep:</span>
                          <span className="font-mono font-semibold text-xs">{formatUpkeep()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Base Stats</h3>
                  <div className="space-y-3 text-sm">
                    {base.type?.name && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          {base.type.name}
                        </Badge>
                      </div>
                    )}
                    {base.team_sizes && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Team Size:</span>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                          {base.team_sizes}
                        </Badge>
                      </div>
                    )}
                    {base.build_time_min && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Build Time:</span>
                        <span className="font-medium">{base.build_time_min} min</span>
                      </div>
                    )}
                    {base.raid_cost_sulfur && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Raid Cost:</span>
                        <span className="font-medium">{base.raid_cost_sulfur.toLocaleString()} Sulfur</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space - Sidebar */}
              <AdPlaceholder slot="base-detail-sidebar" format="square" />
            </div>
          </div>
        </section>

        {/* Ad Space - Bottom */}
        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="base-detail-bottom" format="horizontal" />
        </section>

        {/* Related Bases */}
        <RelatedBases bases={relatedBases} />
      </main>

      <Footer />
    </div>
  )
}
