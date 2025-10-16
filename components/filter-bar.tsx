"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"

interface FilterBarProps {
  types?: Array<{ id: string; type: string }>
  teamSizes?: Array<{ id: string; size: string }>
  footprints?: Array<{ id: string; footprint: string }>
}

export function FilterBar({ types = [], teamSizes = [], footprints = [] }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslations()

  const typeId = searchParams.get("type") || "all"
  const teamSizeId = searchParams.get("teamSize") || "all"
  const footprintId = searchParams.get("footprint") || "all"

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`?${params.toString()}`)
  }

  const handleReset = () => {
    router.push(window.location.pathname)
  }

  const hasActiveFilters = typeId !== "all" || teamSizeId !== "all" || footprintId !== "all"

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/40 bg-card p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{t.home.filters.title}:</span>
      </div>

      <Select value={typeId} onValueChange={(value) => updateFilters("type", value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t.home.filters.type} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allTypes}</SelectItem>
          {types.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={teamSizeId} onValueChange={(value) => updateFilters("teamSize", value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t.home.filters.teamSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allTeamSizes}</SelectItem>
          {teamSizes.map((size) => (
            <SelectItem key={size.id} value={size.id}>
              {size.size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={footprintId} onValueChange={(value) => updateFilters("footprint", value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t.home.filters.footprint} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allFootprints}</SelectItem>
          {footprints.map((footprint) => (
            <SelectItem key={footprint.id} value={footprint.id}>
              {footprint.footprint}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={handleReset}>
          {t.home.filters.reset}
        </Button>
      )}
    </div>
  )
}
