"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

interface FilterBarProps {
  onFilterChange: (category: string, difficulty: string) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [category, setCategory] = useState("all")
  const [difficulty, setDifficulty] = useState("all")

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange(value, difficulty)
  }

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value)
    onFilterChange(category, value)
  }

  const handleReset = () => {
    setCategory("all")
    setDifficulty("all")
    onFilterChange("all", "all")
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/40 bg-card p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="solo">Solo</SelectItem>
          <SelectItem value="duo">Duo</SelectItem>
          <SelectItem value="trio">Trio</SelectItem>
          <SelectItem value="quad">Quad</SelectItem>
          <SelectItem value="zerg">Zerg</SelectItem>
          <SelectItem value="bunker">Bunker</SelectItem>
          <SelectItem value="raid">Raid</SelectItem>
        </SelectContent>
      </Select>

      <Select value={difficulty} onValueChange={handleDifficultyChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Difficulties</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      {(category !== "all" || difficulty !== "all") && (
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
      )}
    </div>
  )
}
