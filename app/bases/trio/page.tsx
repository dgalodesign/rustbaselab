import { TeamSizeLandingPage } from "@/components/team-size-landing-page"
import { getFilteredBases, getAllTeamSizes } from "@/lib/db-queries"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
    const year = new Date().getFullYear()

    const title = `Best Trio Rust Base Designs ${year} | 40+ Trio Bases`
    const description = `Explore top trio base designs for Rust ${year}. 3x3 farms, bunker bases, raid bases. Perfect for 3-player teams. Raid costs & build times included!`

    return {
        title,
        description,
        keywords: [
            "rust trio base",
            "trio base design",
            "best trio rust base",
            `rust trio base ${year}`,
            "rust 3x3 trio base",
            "rust trio bunker base",
            "rust trio farm base",
        ],
        openGraph: {
            title: `${title} | RustBaseLab`,
            description,
            url: "https://rustbaselab.com/bases/trio",
            type: "website",
        },
        alternates: {
            canonical: "https://rustbaselab.com/bases/trio",
        },
    }
}

export default async function TrioBasesPage() {
    const year = new Date().getFullYear()

    // Get Trio team size ID
    const teamSizes = await getAllTeamSizes()
    const trioTeamSize = teamSizes.find(ts => ts.name.toLowerCase() === "trio")

    if (!trioTeamSize) {
        return <div>Trio team size not found</div>
    }

    // Fetch all trio bases
    const bases = await getFilteredBases({ teamSizeId: trioTeamSize.id })

    return (
        <TeamSizeLandingPage
            teamSize="Trio"
            teamSizeId={trioTeamSize.id}
            bases={bases}
            title={`Best Trio Rust Base Designs ${year}`}
            description={`Explore ${bases.length}+ trio base designs optimized for 3-player teams. From efficient 3x3s to fortress compounds.`}
            introText={`Trio teams hit the sweet spot in Rust - enough players for serious defense and raiding, but small enough to stay efficient. Our trio base collection features designs that maximize your team's potential with smart layouts, multiple bunkers, and excellent raid defense. Whether you're farming, PvPing, or defending against larger groups, you'll find the perfect base here.`}
            tips={[
                "3x3 bases offer the best balance of space and defense for trios",
                "Look for bases with 3+ bunkers for maximum raid protection",
                "Consider bases with separate loot rooms for better organization",
                "Farm bases are essential - dedicate one player to resource gathering",
                "Prioritize bases with strong online raid defense capabilities",
            ]}
        />
    )
}
