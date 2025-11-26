"use client"

import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import type { Base } from "@/lib/types"
import { Share2, Heart } from "lucide-react"
import { toast } from "sonner"

interface BaseActionsProps {
  base: Base
}

export function BaseActions({ base }: BaseActionsProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const isFav = isFavorite(base.id)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!", {
        description: "Share this base with your team",
      })
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleFavorite = () => {
    if (isFav) {
      removeFavorite(base.id)
      toast.success("Removed from favorites", {
        description: "Base removed from your collection",
      })
    } else {
      addFavorite(base)
      toast.success("Added to favorites", {
        description: "Base saved to your collection",
      })
    }
  }

  return (
    <div className="mt-6 flex gap-4">
      <Button onClick={handleFavorite} className="bg-[#5B7C99] hover:bg-[#4A6B88] text-white font-medium px-6 gap-2">
        <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
        {isFav ? "Remove from favorites" : "Save as favorite"}
      </Button>
      <Button onClick={handleShare} className="bg-[#5B7C99] hover:bg-[#4A6B88] text-white font-medium px-6 gap-2">
        <Share2 className="h-4 w-4" />
        Share base
      </Button>
    </div>
  )
}
