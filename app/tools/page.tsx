import { RaidCostCalculator } from "@/components/raid-cost-calculator"
import { UpkeepCalculator } from "@/components/upkeep-calculator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Footer } from "@/components/footer"
import { Calculator, Zap, Home } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rust Base Calculators — Raid Cost & Upkeep",
  description:
    "Free Rust calculators: calculate how many rockets or C4 it takes to raid any base, and how much upkeep your base costs per day. Instant results, no login needed.",
  keywords: [
    "rust raid cost calculator",
    "rust upkeep calculator",
    "rust base calculator",
    "how many rockets to raid rust",
    "rust building upkeep",
    "rust calculator 2026",
  ],
  openGraph: {
    title: "Rust Base Calculators — Raid Cost & Upkeep | RustBaseLab",
    description:
      "Calculate raid cost in rockets, C4 and sulfur — plus your base upkeep per day. Free Rust tools.",
    url: "https://rustbaselab.com/tools",
    type: "website",
  },
  alternates: {
    canonical: "https://rustbaselab.com/tools",
  },
}

export default function ToolsPage() {
  return (
    <>
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs items={[{ label: "Tools" }]} />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-2">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                RUST CALCULATORS
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Calculate raid cost in rockets and sulfur, or figure out how much your base costs to upkeep per day. No login needed.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="raid">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="raid" className="flex-1 gap-2">
                <Zap className="h-4 w-4" />
                Raid Cost
              </TabsTrigger>
              <TabsTrigger value="upkeep" className="flex-1 gap-2">
                <Home className="h-4 w-4" />
                Upkeep
              </TabsTrigger>
            </TabsList>

            <TabsContent value="raid">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-5">
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">
                    Raid Cost Calculator
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Add each building piece you want to raid through. Select the weapon type to see how many you need and the total sulfur cost.
                  </p>
                </div>
                <RaidCostCalculator />
              </div>
            </TabsContent>

            <TabsContent value="upkeep">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-5">
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">
                    Upkeep Calculator
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Add every building piece in your base to see your daily upkeep cost and how much you need to keep in your TC.
                  </p>
                </div>
                <UpkeepCalculator />
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="mt-10 rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Want a base already optimized for raid cost and upkeep?
            </p>
            <a
              href="/bases"
              className="inline-flex items-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              Browse base designs →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
