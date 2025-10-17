"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
    <Link href={`/base/${base.id}`}>
      <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg py-0 px-0 border-0 border-none">
        <CardHeader className="p-0 py-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={base.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 py-0">
          <h3 className="mb-2 line-clamp-2 font-semibold text-balance group-hover:text-primary text-xl">{base.title}</h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="truncate text-base">
              {t.base.publishedBy} {creatorName}
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-border/40 p-4 px-4 py-4 border-t">
          <span className="text-muted-foreground text-sm">{relativeTime}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
