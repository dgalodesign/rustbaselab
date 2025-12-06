import { TeamSizeLandingPage } from "@/components/team-size-landing-page"
import { getFilteredBases, getAllTeamSizes } from "@/lib/db-queries"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
    const year = new Date().getFullYear()

    const title = `Best Solo Rust Base Designs ${year} | 50+ Solo Bases`
    const description = `Discover the best solo base designs for Rust ${year}. Bunker bases, starter bases, farm bases & more. Easy to build, hard to raid. Updated daily!`

    return {
        title,
        description,
        keywords: [
            "rust solo base",
            "solo base design",
            "best solo rust base",
            `rust solo base ${year}`,
            "rust solo bunker base",
            "rust solo starter base",
            "rust solo farm base",
        ],
        openGraph: {
            title: `${title} | RustBaseLab`,
            description,
            url: "https://rustbaselab.com/bases/solo",
            type: "website",
        },
        alternates: {
            canonical: "https://rustbaselab.com/bases/solo",
        },
    }
}

export default async function SoloBasesPage() {
    const year = new Date().getFullYear()

    // Get Solo team size ID
    const teamSizes = await getAllTeamSizes()
    const soloTeamSize = teamSizes.find(ts => ts.name.toLowerCase() === "solo")

    if (!soloTeamSize) {
        return <div>Solo team size not found</div>
    }

    // Fetch all solo bases
    const bases = await getFilteredBases({ teamSizeId: soloTeamSize.id })

    return (
        <TeamSizeLandingPage
            teamSize="Solo"
            teamSizeId={soloTeamSize.id}
            bases={bases}
            title={`Best Solo Rust Base Designs ${year}`}
            description={`Explore ${bases.length}+ solo base designs optimized for single players. From starter bases to endgame fortresses.`}
            introText={`Solo players face unique challenges in Rust - you need bases that are efficient to build, easy to defend alone, and cost-effective to maintain. Our curated collection of solo bases features compact designs with smart bunkers, efficient loot rooms, and minimal upkeep costs. Whether you're just starting out or looking for a raid-proof main base, you'll find the perfect design here.`}
            tips={[
                "Prioritize bases with bunkers - they're essential for solo defense",
                "Look for compact footprints (2x1, 2x2) to minimize building costs",
                "Choose designs with low upkeep to avoid farming all day",
                "Consider starter bases that can expand as you progress",
                "Focus on bases with good sight lines for solo PvP defense",
            ]}
        />
    )
}
