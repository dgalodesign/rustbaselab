"use client"

import { BaseCard } from "@/components/base-card"
import { SectionHeader } from "@/components/section-header"
import { useTranslations } from "@/lib/i18n/context"
import type { Base } from "@/lib/types"

interface RelatedBasesProps {
  bases: Base[]
}

export function RelatedBases({ bases }: RelatedBasesProps) {
  const { t } = useTranslations()

  if (bases.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <SectionHeader title={t.base.relatedBases} variant="simple" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bases.map((base) => (
          <BaseCard key={base.id} base={base} />
        ))}
      </div>
    </section>
  )
}
