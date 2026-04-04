import { getAllBases } from "@/lib/db-queries"
import { BaseCard } from "@/components/base-card"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const year = new Date().getFullYear()
  const title = `Best Rust Console Base Designs ${year} | PS4, PS5 & Xbox`
  const description = `Find the best Rust Console Edition base designs for ${year}. All bases tested for console building mechanics — PS4, PS5, Xbox One, Xbox Series X/S.`

  return {
    title,
    description,
    keywords: [
      "rust console base",
      "rust console base design",
      "rust ps4 base",
      "rust ps5 base",
      "rust xbox base",
      `rust console base ${year}`,
      "rust console edition base building",
      "rust console solo base",
      "rust console bunker",
    ],
    openGraph: {
      title: `${title} | RustBaseLab`,
      description,
      url: "https://rustbaselab.com/bases/console",
      type: "website",
    },
    alternates: {
      canonical: "https://rustbaselab.com/bases/console",
    },
  }
}

const CONSOLE_TIPS = [
  "Console building uses the same blueprint as PC — every design on this site works on PS4, PS5, Xbox One and Xbox Series X/S.",
  "Use the D-pad to switch between building plan, hammer, and upgrade hammer quickly.",
  "Honeycomb before you upgrade — place all triangle foundations first, then mass-upgrade using the hammer.",
  "Prioritize stone on outer walls and metal on your TC room. HQ on the inner core if you have resources.",
  "Console wipes happen at the same time as PC wipes — plan your build around wipe day.",
]

export default async function ConsoleBasesPage() {
  const year = new Date().getFullYear()
  const allBases = await getAllBases()

  return (
    <>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://rustbaselab.com" },
              { "@type": "ListItem", position: 2, name: "Bases", item: "https://rustbaselab.com/bases" },
              { "@type": "ListItem", position: 3, name: "Console Bases", item: "https://rustbaselab.com/bases/console" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Best Rust Console Base Designs ${year}`,
            description: `All Rust base designs compatible with Rust Console Edition — PS4, PS5, Xbox One, Xbox Series X/S.`,
            url: "https://rustbaselab.com/bases/console",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are PC Rust base designs compatible with Rust Console Edition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Rust Console Edition uses the same building mechanics as PC. All base designs on RustBaseLab work on PS4, PS5, Xbox One, and Xbox Series X/S.",
                },
              },
              {
                "@type": "Question",
                name: "Does Rust Console Edition have honeycomb?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Honeycomb — placing triangle foundations around your core — works identically on console. It is the most effective defense technique on both platforms.",
                },
              },
            ],
          },
        ]}
      />

      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {/* Breadcrumb */}
          <section className="border-b border-border bg-background">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumbs
                items={[
                  { label: "Bases", href: "/bases" },
                  { label: "Console Bases" },
                ]}
              />
            </div>
          </section>

          {/* Hero */}
          <section className="border-b border-border bg-background">
            <div className="container mx-auto px-4 py-12">
              <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                BEST RUST CONSOLE BASE DESIGNS {year}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Every base design on RustBaseLab works on Rust Console Edition — PS4, PS5, Xbox One, and Xbox Series
                X/S. Same mechanics, same strategies, same results.
              </p>

              {/* Platform badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["PS4", "PS5", "Xbox One", "Xbox Series X|S"].map((platform) => (
                  <span
                    key={platform}
                    className="rounded border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-bold text-primary"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Info box */}
              <div className="bg-card border border-border rounded-lg p-6 mb-2">
                <h2 className="text-2xl font-bold font-display mb-4">CONSOLE BUILDING TIPS</h2>
                <ul className="space-y-2">
                  {CONSOLE_TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="border-b border-border bg-card/50">
            <div className="container mx-auto px-4 py-8">
              <h2 className="font-display text-2xl font-bold mb-6">FREQUENTLY ASKED QUESTIONS</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-bold mb-2">
                    Are PC base designs compatible with Rust Console Edition?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes. Rust Console uses the same building system as PC. Every design on this site works on
                    PS4, PS5, Xbox One, and Xbox Series X/S without modification.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-bold mb-2">Does Rust Console have honeycomb?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes. Honeycomb works identically on console. Place triangle foundations around your core
                    and upgrade them to stone or metal for maximum raid protection.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-bold mb-2">What&apos;s the best starter base for console?</h3>
                  <p className="text-sm text-muted-foreground">
                    A 2×1 or 2×2 with honeycomb is the standard wipe-day starter for console players. Browse
                    our Solo Bases section for the best beginner-friendly designs.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-bold mb-2">When do Rust Console servers wipe?</h3>
                  <p className="text-sm text-muted-foreground">
                    Console servers typically wipe on the first Thursday of each month, aligned with PC Rust
                    wipes. Monthly and bi-weekly wipe schedules both exist depending on the server.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bases grid */}
          <section className="container mx-auto px-4 py-12">
            <p className="mb-6 text-sm text-muted-foreground">
              SHOWING {allBases.length} BASES — ALL COMPATIBLE WITH RUST CONSOLE EDITION
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allBases.map((base) => (
                <BaseCard key={base.id} base={base} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
