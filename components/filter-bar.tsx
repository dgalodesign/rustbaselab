"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

interface FilterBarProps {
  types?: Array<{ id: string; type: string }>
  teamSizes?: Array<{ id: string; size: string }>
  tags?: Array<{ id: string; tag: string }>
  onFilterChange?: (filters: { typeId: string; teamSizeId: string; tagId: string }) => void
}

export function FilterBar({ types = [], teamSizes = [], tags = [], onFilterChange }: FilterBarProps) {
  const [typeId, setTypeId] = useState("all")
  const [teamSizeId, setTeamSizeId] = useState("all")
  const [tagId, setTagId] = useState("all")

  const handleTypeChange = (value: string) => {
    setTypeId(value)
    onFilterChange?.({ typeId: value, teamSizeId, tagId })
  }

  const handleTeamSizeChange = (value: string) => {
    setTeamSizeId(value)
    onFilterChange?.({ typeId, teamSizeId: value, tagId })
  }

  const handleTagChange = (value: string) => {
    setTagId(value)
    onFilterChange?.({ typeId, teamSizeId, tagId: value })
  }

  const handleReset = () => {
    setTypeId("all")
    setTeamSizeId("all")
    setTagId("all")
    onFilterChange?.({ typeId: "all", teamSizeId: "all", tagId: "all" })
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/40 bg-card p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      <Select value={typeId} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Tipo de Base" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los Tipos</SelectItem>
          {types.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={teamSizeId} onValueChange={handleTeamSizeChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Tamaño de Equipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los Tamaños</SelectItem>
          {teamSizes.map((size) => (
            <SelectItem key={size.id} value={size.id}>
              {size.size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={tagId} onValueChange={handleTagChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Etiqueta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las Etiquetas</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id}>
              {tag.tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(typeId !== "all" || teamSizeId !== "all" || tagId !== "all") && (
        <Button variant="outline" size="sm" onClick={handleReset}>
          Limpiar
        </Button>
      )}
    </div>
  )
}
