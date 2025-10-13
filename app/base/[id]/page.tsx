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
import { Clock, Eye, Hammer, Calendar, ArrowLeft } from "lucide-react"
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
    description: base.description,
    openGraph: {
      title: base.title,
      description: base.description,
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

  const relatedBases = await getRelatedBases(id, base.category)

  const categoryColors = {
    solo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    duo: "bg-green-500/10 text-green-500 border-green-500/20",
    trio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    quad: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    zerg: "bg-red-500/10 text-red-500 border-red-500/20",
    bunker: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    raid: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  }

  const difficultyColors = {
    easy: "bg-green-500/10 text-green-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    hard: "bg-red-500/10 text-red-400",
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
              <Badge variant="outline" className={categoryColors[base.category]}>
                {base.category.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={difficultyColors[base.difficulty]}>
                {base.difficulty}
              </Badge>
              {base.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            </div>

            <h1 className="mb-4 font-mono text-4xl font-bold text-balance md:text-5xl">{base.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground text-pretty">{base.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Build Time: {base.buildTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{base.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Hammer className="h-4 w-4" />
                <span>Difficulty: {base.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated: {new Date(base.updatedAt).toLocaleDateString()}</span>
              </div>
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
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Video Tutorial</h2>
                <YouTubeEmbed url={base.youtubeUrl} title={base.title} />
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">About This Base</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{base.description}</p>
                    <p>
                      This {base.category} base design is rated as {base.difficulty} difficulty and takes approximately{" "}
                      {base.buildTime} to build. It's perfect for players looking for a reliable and efficient base
                      design.
                    </p>
                    <p>
                      Watch the full video tutorial above to see the complete building process, including tips for
                      optimal placement and defensive strategies.
                    </p>
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
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <span className="text-muted-foreground">Total Cost:</span>
                      <span className="font-mono font-semibold">{base.materials}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Base Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className={categoryColors[base.category]}>
                        {base.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant="outline" className={difficultyColors[base.difficulty]}>
                        {base.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Build Time:</span>
                      <span className="font-medium">{base.buildTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">{base.views.toLocaleString()}</span>
                    </div>
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
