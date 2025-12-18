
import { Footer } from "@/components/footer"
import { BaseCard } from "@/components/base-card"

import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Base } from "@/lib/types"

interface TeamSizeLandingPageProps {
    teamSize: "Solo" | "Duo" | "Trio" | "Quad"
    teamSizeId: string
    bases: Base[]
    title: string
    description: string
    introText: string
    tips: string[]
}

export function TeamSizeLandingPage({
    teamSize,
    teamSizeId,
    bases,
    title,
    description,
    introText,
    tips,
}: TeamSizeLandingPageProps) {
    const year = new Date().getFullYear()

    return (
        <div className="flex min-h-screen flex-col">


            {/* Structured Data for SEO */}
            <StructuredData
                data={[
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
                                name: `${teamSize} Bases`,
                                item: `https://rustbaselab.com/bases/${teamSize.toLowerCase()}`,
                            },
                        ],
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: title,
                        description: description,
                        url: `https://rustbaselab.com/bases/${teamSize.toLowerCase()}`,
                    },
                ]}
            />

            <main className="flex-1">
                <section className="border-b-2 border-border bg-background">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Breadcrumbs
                            items={[
                                { label: "Bases", href: "/bases" },
                                { label: `${teamSize} Bases` }
                            ]}
                        />
                    </div>
                </section>

                <section className="border-b-2 border-border bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent)]" aria-hidden="true" />
                    <div className="container relative mx-auto px-4 py-12">
                        <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                            {title.toUpperCase()}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">{description}</p>

                        {/* Intro Section */}
                        <div className="bg-card border-2 border-border rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold font-display mb-4">WHY {teamSize.toUpperCase()} BASES?</h2>
                            <p className="text-muted-foreground mb-4">{introText}</p>

                            <h3 className="text-xl font-bold font-display mb-3">TIPS FOR {teamSize.toUpperCase()} PLAYERS</h3>
                            <ul className="space-y-2">
                                {tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">▸</span>
                                        <span className="text-muted-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-12">
                    <div className="mb-4 text-sm text-muted-foreground">
                        SHOWING {bases.length} {teamSize.toUpperCase()} BASES
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {bases.map((base) => (
                            <BaseCard key={base.id} base={base} />
                        ))}
                    </div>

                    {bases.length === 0 && (
                        <div className="py-12 text-center border-2 border-border rounded-lg bg-card">
                            <p className="text-lg text-muted-foreground">
                                NO {teamSize.toUpperCase()} BASES FOUND
                            </p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}
