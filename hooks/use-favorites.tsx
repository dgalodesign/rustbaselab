"use client"

import { useState, useEffect } from "react"
import type { Base } from "@/lib/types"

/**
 * Minimal snapshot of a Base stored in localStorage.
 * Only the fields needed for display are persisted, avoiding stale full-object data
 * if the Base schema changes in the future.
 */
export interface StoredFavorite {
  id: string
  slug: string
  title: string
  image_main_url: string | null
  video_youtube_id: string | null
  type?: { name: string }
  team_sizes?: Array<{ team_size: { name: string } }>
}

const STORAGE_KEY = "favorites_v2"

function toStoredFavorite(base: Base): StoredFavorite {
  return {
    id: base.id,
    slug: base.slug,
    title: base.title,
    image_main_url: base.image_main_url ?? null,
    video_youtube_id: base.video_youtube_id ?? null,
    type: base.type,
    team_sizes: base.team_sizes,
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<StoredFavorite[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
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
      // Avoid duplicates
      if (prev.some((b) => b.id === base.id)) return prev
      const newFavorites = [...prev, toStoredFavorite(base)]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (baseId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((b) => b.id !== baseId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
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
