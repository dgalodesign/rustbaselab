import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { StructuredData } from "@/components/structured-data"
import {
  Sparkles,
  ArrowRight,
  Flame,
  TrendingUp,
  Home,
  Shield,
  Castle,
  Building2,
  Mountain,
  Tent,
  User,
  Users,
  Users2,
  UsersRound,
  Crown,
  Warehouse,
  Factory,
  Landmark,
  Church,
  Store,
  Building,
  Grid3x3,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { getMetaBases, getPopularBases, getAllTypes, getAllTeamSizes } from "@/lib/db-queries"
import type { Base, BaseType, TeamSize } from "@/lib/types"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Rust Base Designs & Building Tutorials",
  description:
    "Discover professional Rust base designs for solo, duo, trio, and zerg teams. Watch detailed video tutorials and learn advanced building techniques. Find the perfect base for your playstyle.",
  keywords: [
    "rust base designs",
    "rust building guide",
    "rust solo base",
    "rust duo base",
    "rust trio base",
    "rust zerg base",
    "rust base tutorial",
    "rust fortifications",
  ],
  openGraph: {
    title: "RustBaseLab - Professional Rust Base Designs",
    description: "Discover the best Rust base designs with video tutorials for all team sizes.",
    url: "https://rustbaselab.com",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "RustBaseLab - Rust Base Designs",
      },
    ],
  },
  alternates: {
    canonical: "https://rustbaselab.com",
  },
}


const typeIcons: Record<string, any> = {
  starter: Home,
  bunker: Shield,
  tower: Castle,
  compound: Building2,
  cave: Mountain,
  warehouse: Warehouse,
  factory: Factory,
  fortress: Landmark,
  church: Church,
  shop: Store,
  building: Building,
  base: Tent,
  default: Tent,
}

const teamSizeIcons: Record<string, any> = {
  solo: User,
  duo: Users,
  trio: Users2,
  quad: UsersRound,
  zerg: Crown,
  default: Users,
}

function getTypeIcon(typeName: string) {
  if (!typeName) return typeIcons.default

  // Normalizar el nombre: lowercase, sin espacios, sin guiones
  const normalized = typeName
    .toLowerCase()
    .trim()
    .replace(/[\s-_]/g, "")

  // Buscar coincidencia exacta primero
  if (typeIcons[normalized]) {
    return typeIcons[normalized]
  }

  // Buscar coincidencia parcial (si el tipo contiene alguna palabra clave)
  for (const [key, icon] of Object.entries(typeIcons)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return icon
    }
  }

  // Si no hay coincidencia, usar el icono por defecto
  return typeIcons.default
}

function getTeamSizeIcon(sizeName: string) {
  if (!sizeName) return teamSizeIcons.default

  const key = sizeName.toLowerCase()
  return teamSizeIcons[key] || teamSizeIcons.default
}

function sortTeamSizes(sizes: any[]) {
  const order = ["solo", "duo", "trio", "quad", "zerg"]
  return [...sizes].sort((a, b) => {
    const aIndex = order.indexOf(a.name?.toLowerCase() || "")
    const bIndex = order.indexOf(b.name?.toLowerCase() || "")
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
}

export default async function HomePage() {
  let metaBases: Base[] = []
  let popularBases: Base[] = []
  let types: BaseType[] = []
  let teamSizes: TeamSize[] = []
  let hasError = false

  try {
    const results = await Promise.all([getMetaBases(6), getPopularBases(6), getAllTypes(), getAllTeamSizes()])

    metaBases = results[0]
    popularBases = results[1]
    types = results[2]
    teamSizes = results[3]
  } catch (error) {
    hasError = true
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Structured Data for SEO */}
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RustBaseLab",
            url: "https://rustbaselab.com",
            logo: "https://rustbaselab.com/logo.svg",
            description:
              "Professional Rust base designs and building tutorials for all team sizes. Learn advanced building techniques and defensive strategies.",
            sameAs: [
              // Añadir redes sociales cuando estén disponibles
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RustBaseLab",
            url: "https://rustbaselab.com",
            description: "Discover the best Rust base designs with video tutorials for all team sizes.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://rustbaselab.com/bases?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      <main className="flex-1">
        {hasError && (
          <div className="container mx-auto px-4 py-8">
            <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-destructive">Connection Error</h2>
              <p className="text-muted-foreground">
                Could not connect to the database. Please verify that environment variables are correctly configured in
                Vercel.
              </p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="border-b-2 border-primary/20 bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true" />
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">BEST RUST BASE DESIGNS</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold font-display leading-tight text-balance md:text-6xl">
                BUILD BETTER, SURVIVE LONGER
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                Discover professional Rust base designs with detailed video tutorials. From beginner bases to massive
                fortresses.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/50 font-bold"
                >
                  <Link href="/bases">
                    VIEW ALL BASES
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <SectionHeader
            icon={Flame}
            title="META BASES"
            description="The most recent and updated bases"
            className="border-none pb-0"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metaBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {metaBases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground">NO META BASES AVAILABLE</p>
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 bg-background py-16">
          <SectionHeader
            icon={TrendingUp}
            title="MOST POPULAR BASES"
            description="The most viewed bases by the community"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBases.map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>

          {popularBases.length === 0 && (
            <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
              <p className="text-lg text-muted-foreground">NO POPULAR BASES AVAILABLE</p>
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 bg-background py-16">
          <SectionHeader icon={Grid3x3} title="BASE TYPES" description="Explore bases by category" />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {types.map((type) => {
              const Icon = getTypeIcon(type.name)
              return (
                <Link
                  key={type.id}
                  href={`/bases?type=${type.id}`}
                  className="group relative overflow-hidden rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <div className="relative flex flex-col items-center gap-3 text-center">
                    <div className="rounded-lg bg-primary/10 p-3 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      <Icon className="h-8 w-8 text-primary-foregroundry" />
                    </div>
                    <span className="text-lg font-bold uppercase">{type.name}</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 bg-background py-16">
          <SectionHeader icon={UsersIcon} title="TEAM SIZES" description="Find bases for your group" />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sortTeamSizes(teamSizes).map((size) => {
              const Icon = getTeamSizeIcon(size.name)
              return (
                <Link
                  key={size.id}
                  href={`/bases?teamSize=${size.id}`}
                  className="group relative overflow-hidden rounded-lg border-2 border-border bg-card p-6 transition-all hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <div className="relative flex flex-col items-center gap-3 text-center">
                    <div className="rounded-lg bg-secondary/10 p-3 border-2 border-secondary/20 group-hover:border-secondary/50 transition-colors">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <span className="text-lg font-bold uppercase">{size.name}</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-secondary" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
