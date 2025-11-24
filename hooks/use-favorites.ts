"use client"

import { useState, useEffect } from "react"

export interface FavoriteBase {
  id: string
  title: string
  slug: string
  image_url: string | null
  type?: string
  team_size?: string[]
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBase[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("rustbaselab_favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = (base: FavoriteBase) => {
    const newFavorites = [...favorites]
    const index = newFavorites.findIndex((f) => f.id === base.id)

    if (index > -1) {
      newFavorites.splice(index, 1)
    } else {
      newFavorites.push(base)
    }

    setFavorites(newFavorites)
    localStorage.setItem("rustbaselab_favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (baseId: string) => {
    return favorites.some((f) => f.id === baseId)
  }

  return { favorites, toggleFavorite, isFavorite }
}
