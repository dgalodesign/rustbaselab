"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Base } from "@/lib/types"
import { useTranslations } from "@/lib/i18n/context"
import { getRelativeTime } from "@/lib/utils/date"

interface BaseCardProps {
  base: Base
}

export function BaseCard({ base }: BaseCardProps) {
  const { locale, t } = useTranslations()

  const thumbnailUrl =
    base.image_main_url || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(base.title)}`

  const creatorName = base.creator?.name || "Unknown Creator"
  const relativeTime = base.created_at ? getRelativeTime(base.created_at, locale) : ""

  return (
    <Link href={`/base/${base.slug}`} className="group">
      <Card className="industrial-card group overflow-hidden transition-all hover:border-primary hover:shadow-xl border-2">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={base.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {base.type && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground font-mono text-xs">
                  {base.type.name}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <h3 className="line-clamp-2 font-bold font-display text-balance group-hover:text-primary transition-colors my-0 text-xl">
            {base.title}
          </h3>

          <div className="flex items-center justify-between text-muted-foreground my-0 text-base">
            <span className="truncate font-medium text-sm">
              {t.base.publishedBy} <span className="text-foreground">{creatorName}</span>
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-t-2 border-border p-4">
          <span className="text-muted-foreground text-sm">{relativeTime}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
