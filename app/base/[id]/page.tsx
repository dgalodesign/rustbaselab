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
    if (base.materials_stone && base.materials_stone > 0)
      materials.push(`${base.materials_stone.toLocaleString()} Stone`)
    if (base.materials_metal && base.materials_metal > 0)
      materials.push(`${base.materials_metal.toLocaleString()} Metal`)
    if (base.materials_hq && base.materials_hq > 0) materials.push(`${base.materials_hq.toLocaleString()} HQM`)
    return materials.length > 0 ? materials.join(", ") : "Materials not specified"
  }

  const formatUpkeep = () => {
    const upkeep = []
    if (base.upkeep_stone && base.upkeep_stone > 0) upkeep.push(`${base.upkeep_stone.toLocaleString()} Stone`)
    if (base.upkeep_metal && base.upkeep_metal > 0) upkeep.push(`${base.upkeep_metal.toLocaleString()} Metal`)
    if (base.upkeep_hq && base.upkeep_hq > 0) upkeep.push(`${base.upkeep_hq.toLocaleString()} HQM`)
    return upkeep.length > 0 ? upkeep.join(", ") : "Upkeep not specified"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b-2 border-rust-metal bg-rust-darkest">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-rust-metal/10 font-mono">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                VOLVER AL INICIO
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-b-2 border-rust-metal bg-gradient-to-b from-rust-dark to-rust-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="container relative mx-auto px-4 py-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {base.type?.type && (
                <Badge
                  variant="outline"
                  className="bg-rust-orange/10 text-rust-orange border-2 border-rust-orange/30 font-mono font-bold"
                >
                  {base.type.type.toUpperCase()}
                </Badge>
              )}
              {base.footprint?.footprint && (
                <Badge
                  variant="outline"
                  className="bg-rust-blue/10 text-rust-blue border-2 border-rust-blue/30 font-mono font-bold"
                >
                  {base.footprint.footprint.toUpperCase()}
                </Badge>
              )}
            </div>

            <h1 className="mb-4 font-mono text-4xl font-bold text-balance md:text-5xl text-rust-light">
              {base.title.toUpperCase()}
            </h1>
            {base.features && <p className="mb-6 text-lg text-rust-muted text-pretty">{base.features}</p>}

            <div className="flex flex-wrap items-center gap-6 text-sm text-rust-muted font-mono">
              {base.build_time_min && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>TIEMPO: {base.build_time_min} MIN</span>
                </div>
              )}
              {base.raid_cost_sulfur && (
                <div className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  <span>RAID: {base.raid_cost_sulfur.toLocaleString()} SULFUR</span>
                </div>
              )}
              {base.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>AÑADIDO: {new Date(base.created_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="base-detail-top" format="horizontal" />
        </section>

        <section className="container mx-auto px-4 py-8 bg-rust-darker">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {base.video_youtube_id && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold font-mono text-rust-light border-b-2 border-rust-metal pb-2">
                    VIDEO TUTORIAL
                  </h2>
                  <YouTubeEmbed url={`https://www.youtube.com/watch?v=${base.video_youtube_id}`} title={base.title} />
                </div>
              )}

              <Card className="border-2 border-rust-metal bg-rust-dark/50">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold font-mono text-rust-light">SOBRE ESTA BASE</h3>
                  <div className="space-y-4 text-rust-muted">
                    {base.features && <p>{base.features}</p>}
                    <p>Este diseño de base proporciona una base sólida para tu gameplay en Rust.</p>
                    {base.video_youtube_id && (
                      <p>
                        Mira el tutorial completo arriba para ver el proceso de construcción completo, incluyendo
                        consejos para colocación óptima y estrategias defensivas.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-rust-metal bg-rust-dark/50">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold font-mono text-rust-light">MATERIALES REQUERIDOS</h3>
                  <div className="space-y-2 text-sm">
                    <div className="rounded border-2 border-rust-metal bg-rust-darkest p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-rust-muted font-mono">COSTO:</span>
                        <span className="font-mono font-semibold text-xs text-rust-light">{formatMaterials()}</span>
                      </div>
                      {(base.upkeep_stone || base.upkeep_metal || base.upkeep_hq) && (
                        <div className="flex items-center justify-between pt-2 border-t-2 border-rust-metal">
                          <span className="text-rust-muted font-mono">UPKEEP:</span>
                          <span className="font-mono font-semibold text-xs text-rust-light">{formatUpkeep()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-rust-metal bg-rust-dark/50">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold font-mono text-rust-light">ESTADÍSTICAS</h3>
                  <div className="space-y-3 text-sm">
                    {base.type?.type && (
                      <div className="flex items-center justify-between">
                        <span className="text-rust-muted font-mono">TIPO:</span>
                        <Badge
                          variant="outline"
                          className="bg-rust-orange/10 text-rust-orange border-2 border-rust-orange/30 font-mono font-bold"
                        >
                          {base.type.type.toUpperCase()}
                        </Badge>
                      </div>
                    )}
                    {base.footprint?.footprint && (
                      <div className="flex items-center justify-between">
                        <span className="text-rust-muted font-mono">FOOTPRINT:</span>
                        <Badge
                          variant="outline"
                          className="bg-rust-blue/10 text-rust-blue border-2 border-rust-blue/30 font-mono font-bold"
                        >
                          {base.footprint.footprint.toUpperCase()}
                        </Badge>
                      </div>
                    )}
                    {base.build_time_min && (
                      <div className="flex items-center justify-between">
                        <span className="text-rust-muted font-mono">TIEMPO:</span>
                        <span className="font-medium text-rust-light font-mono">{base.build_time_min} MIN</span>
                      </div>
                    )}
                    {base.raid_cost_sulfur && (
                      <div className="flex items-center justify-between">
                        <span className="text-rust-muted font-mono">RAID:</span>
                        <span className="font-medium text-rust-light font-mono">
                          {base.raid_cost_sulfur.toLocaleString()} SULFUR
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <AdPlaceholder slot="base-detail-sidebar" format="square" />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <AdPlaceholder slot="base-detail-bottom" format="horizontal" />
        </section>

        <RelatedBases bases={relatedBases} />
      </main>

      <Footer />
    </div>
  )
}
