import { TeamSizeLandingPage } from "@/components/team-size-landing-page"
import { getFilteredBases, getAllTeamSizes } from "@/lib/db-queries"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
    const year = new Date().getFullYear()

    const title = `Best Duo Rust Base Designs ${year} | 60+ Duo Bases`
    const description = `Find the perfect duo base for Rust ${year}. 2x2 expansions, bunker bases, open cores & more. Optimized for 2-player teams. Build guides included!`

    return {
        title,
        description,
        keywords: [
            "rust duo base",
            "duo base design",
            "best duo rust base",
            `rust duo base ${year}`,
            "rust duo base design",
            "rust 2x2 duo base",
            "rust duo bunker base",
        ],
        openGraph: {
            title: `${title} | RustBaseLab`,
            description,
            url: "https://rustbaselab.com/bases/duo",
            type: "website",
        },
        alternates: {
            canonical: "https://rustbaselab.com/bases/duo",
        },
    }
}

export default async function DuoBasesPage() {
    const year = new Date().getFullYear()

    // Get Duo team size ID
    const teamSizes = await getAllTeamSizes()
    const duoTeamSize = teamSizes.find(ts => ts.name.toLowerCase() === "duo")

    if (!duoTeamSize) {
        return <div>Duo team size not found</div>
    }

    // Fetch all duo bases
    const bases = await getFilteredBases({ teamSizeId: duoTeamSize.id })

    return (
        <TeamSizeLandingPage
            teamSize="Duo"
            teamSizeId={duoTeamSize.id}
            bases={bases}
            title={`Best Duo Rust Base Designs ${year}`}
            description={`Explore ${bases.length}+ duo base designs perfect for 2-player teams. From compact 2x2s to expandable compounds.`}
            introText={`Playing Rust with a partner opens up new strategic possibilities. Duo bases need to balance efficiency with the extra firepower of two players. Our collection features bases optimized for duo teams - from starter 2x2 bunkers to advanced open-core designs. Each base is designed to maximize your duo's defensive capabilities while keeping build costs reasonable.`}
            tips={[
                "2x2 bases are the sweet spot for duo teams - compact yet powerful",
                "Look for bases with multiple bunkers for better raid defense",
                "Consider open-core designs for easier access during online raids",
                "Expandable bases let you grow from duo to trio if needed",
                "Prioritize bases with good shooting angles for both players",
            ]}
        />
    )
}
