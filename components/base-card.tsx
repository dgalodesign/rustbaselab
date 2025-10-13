import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Hammer } from "lucide-react"
import type { Base } from "@/lib/types"

interface BaseCardProps {
  base: Base
}

export function BaseCard({ base }: BaseCardProps) {
  const typeName = base.type?.name || "Base"
  const teamSize = base.team_sizes?.[0]?.team_size?.size || "Unknown"
  const buildTime = base.build_time_min ? `${base.build_time_min} min` : "N/A"
  const thumbnailUrl =
    base.image_main_url || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(base.title)}`

  const categoryColors: Record<string, string> = {
    solo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    duo: "bg-green-500/10 text-green-500 border-green-500/20",
    trio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    quad: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    zerg: "bg-red-500/10 text-red-500 border-red-500/20",
    bunker: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    raid: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    default: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  }

  const getColorForTeamSize = (size: string) => {
    const lowerSize = size.toLowerCase()
    return categoryColors[lowerSize] || categoryColors.default
  }

  return (
    <Link href={`/base/${base.id}`}>
      <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={base.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className={getColorForTeamSize(teamSize)}>
              {teamSize}
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              {typeName}
            </Badge>
          </div>

          <h3 className="mb-2 line-clamp-2 font-semibold text-balance group-hover:text-primary">{base.title}</h3>
          {base.features && <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">{base.features}</p>}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{buildTime}</span>
          </div>
          {base.raid_cost_sulfur && (
            <div className="flex items-center gap-1">
              <Hammer className="h-3 w-3" />
              <span>{base.raid_cost_sulfur.toLocaleString()} sulfur</span>
            </div>
          )}
          {base.footprint?.name && (
            <div className="flex items-center gap-1">
              <span className="text-xs">{base.footprint.name}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
