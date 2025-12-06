import { TeamSizeLandingPage } from "@/components/team-size-landing-page"
import { getFilteredBases, getAllTeamSizes } from "@/lib/db-queries"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
    const year = new Date().getFullYear()

    const title = `Best Quad Rust Base Designs ${year} | 30+ Quad Bases`
    const description = `Discover powerful quad base designs for Rust ${year}. 4x4 compounds, zerg bases, clan bases. Optimized for 4+ players. Maximum defense!`

    return {
        title,
        description,
        keywords: [
            "rust quad base",
            "quad base design",
            "4 man rust base",
            `rust quad base ${year}`,
            "rust 4x4 quad base",
            "rust clan base",
            "rust zerg base",
        ],
        openGraph: {
            title: `${title} | RustBaseLab`,
            description,
            url: "https://rustbaselab.com/bases/quad",
            type: "website",
        },
        alternates: {
            canonical: "https://rustbaselab.com/bases/quad",
        },
    }
}

export default async function QuadBasesPage() {
    const year = new Date().getFullYear()

    // Get Quad team size ID
    const teamSizes = await getAllTeamSizes()
    const quadTeamSize = teamSizes.find(ts => ts.name.toLowerCase() === "quad")

    if (!quadTeamSize) {
        return <div>Quad team size not found</div>
    }

    // Fetch all quad bases
    const bases = await getFilteredBases({ teamSizeId: quadTeamSize.id })

    return (
        <TeamSizeLandingPage
            teamSize="Quad"
            teamSizeId={quadTeamSize.id}
            bases={bases}
            title={`Best Quad Rust Base Designs ${year}`}
            description={`Explore ${bases.length}+ quad base designs for 4+ player teams. From efficient 4x4s to massive compounds.`}
            introText={`Quad teams and larger groups dominate Rust servers with superior firepower and resources. Our quad base collection features fortress-level designs with multiple TCs, extensive honeycomb, and advanced bunker systems. These bases are built to withstand massive raids while providing your team with the space and organization needed for serious gameplay.`}
            tips={[
                "4x4 bases provide excellent space-to-defense ratio for quad teams",
                "Look for multi-TC designs for better raid protection",
                "Consider compound bases for separating main base from farm bases",
                "Prioritize bases with 5+ bunkers for maximum security",
                "External TCs and perimeter defenses become crucial at this scale",
            ]}
        />
    )
}
