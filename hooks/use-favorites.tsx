"use client"

import { useState, useEffect } from "react"
import type { Base } from "@/lib/types"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Base[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem("favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  const addFavorite = (base: Base) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, base]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (baseId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((b) => b.id !== baseId)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (baseId: string) => {
    return favorites.some((b) => b.id === baseId)
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
