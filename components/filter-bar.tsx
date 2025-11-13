"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, X } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"

interface FilterBarProps {
  types?: Array<{ id: string; name: string }>
  teamSizes?: Array<{ id: string; name: string }>
  footprints?: Array<{ id: string; name: string }>
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
    const queryString = params.toString()
    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ""}`)
  }

  const handleReset = () => {
    router.push(window.location.pathname)
  }

  const hasActiveFilters = typeId !== "all" || teamSizeId !== "all" || footprintId !== "all"

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-md border-2 border-border bg-card p-4 shadow-md">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <span className="text-sm font-bold uppercase tracking-wide">{t.home.filters.title}</span>
      </div>

      <Select value={typeId} onValueChange={(value) => updateFilters("type", value)}>
        <SelectTrigger className="w-[160px] border-2 font-medium">
          <SelectValue placeholder={t.home.filters.type} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allTypes}</SelectItem>
          {types.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={teamSizeId} onValueChange={(value) => updateFilters("teamSize", value)}>
        <SelectTrigger className="w-[160px] border-2 font-medium">
          <SelectValue placeholder={t.home.filters.teamSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allTeamSizes}</SelectItem>
          {teamSizes.map((size) => (
            <SelectItem key={size.id} value={size.id}>
              {size.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={footprintId} onValueChange={(value) => updateFilters("footprint", value)}>
        <SelectTrigger className="w-[160px] border-2 font-medium">
          <SelectValue placeholder={t.home.filters.footprint} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.home.filters.allFootprints}</SelectItem>
          {footprints.map((footprint) => (
            <SelectItem key={footprint.id} value={footprint.id}>
              {footprint.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="destructive" size="sm" onClick={handleReset} className="gap-1">
          <X className="h-3 w-3" />
          {t.home.filters.reset}
        </Button>
      )}
    </div>
  )
}
