"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTranslations } from "@/lib/i18n/context"

interface SearchInputProps {
  initialQuery?: string
  placeholder?: string
}

export function SearchInput({ initialQuery = "", placeholder }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const { t } = useTranslations()

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      } else {
        router.push("/search")
      }
    }, 500)

    return () => clearTimeout(debounce)
  }, [query, router])

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder || t.search.placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
