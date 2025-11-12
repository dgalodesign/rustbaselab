"use client"

import { BaseCard } from "@/components/base-card"
import { SectionHeader } from "@/components/section-header"
import { useTranslations } from "@/lib/i18n/context"
import type { Base } from "@/lib/types"

interface RelatedBasesProps {
  bases: Base[]
  title?: string
  description?: string
}

export function RelatedBases({ bases, title, description }: RelatedBasesProps) {
  const { t } = useTranslations()

  if (bases.length === 0) {
    return null
  }

  const displayTitle = title || t.base.relatedBases
  const displayDescription = description

  return (
    <section className="container mx-auto px-4 py-12">
      <SectionHeader title={displayTitle} description={displayDescription} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bases.map((base) => (
          <BaseCard key={base.id} base={base} />
        ))}
      </div>
    </section>
  )
}
