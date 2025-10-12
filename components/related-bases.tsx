import { BaseCard } from "@/components/base-card"
import type { Base } from "@/lib/types"

interface RelatedBasesProps {
  bases: Base[]
  currentBaseId: string
}

export function RelatedBases({ bases, currentBaseId }: RelatedBasesProps) {
  const relatedBases = bases.filter((base) => base.id !== currentBaseId).slice(0, 3)

  if (relatedBases.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-6 font-mono text-2xl font-bold">Related Bases</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedBases.map((base) => (
          <BaseCard key={base.id} base={base} />
        ))}
      </div>
    </section>
  )
}
