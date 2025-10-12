import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Hammer } from "lucide-react"
import type { Base } from "@/lib/types"

interface BaseCardProps {
  base: Base
}

export function BaseCard({ base }: BaseCardProps) {
  const categoryColors = {
    solo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    duo: "bg-green-500/10 text-green-500 border-green-500/20",
    trio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    quad: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    zerg: "bg-red-500/10 text-red-500 border-red-500/20",
    bunker: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    raid: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  }

  const difficultyColors = {
    easy: "bg-green-500/10 text-green-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    hard: "bg-red-500/10 text-red-400",
  }

  return (
    <Link href={`/base/${base.id}`}>
      <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={base.thumbnailUrl || "/placeholder.svg"}
              alt={base.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {base.featured && (
              <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className={categoryColors[base.category]}>
              {base.category.toUpperCase()}
            </Badge>
            <Badge variant="outline" className={difficultyColors[base.difficulty]}>
              {base.difficulty}
            </Badge>
          </div>

          <h3 className="mb-2 line-clamp-1 font-semibold text-balance group-hover:text-primary">{base.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">{base.description}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{base.buildTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{base.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Hammer className="h-3 w-3" />
            <span className="hidden sm:inline">{base.difficulty}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
