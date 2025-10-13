import type { Base } from "@/lib/types"

export function getYouTubeEmbedUrl(videoId: string | null): string {
  if (!videoId) return ""
  return `https://www.youtube.com/embed/${videoId}`
}

export function getYouTubeWatchUrl(videoId: string | null): string {
  if (!videoId) return ""
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function formatMaterials(base: Base): string {
  const parts: string[] = []

  if (base.materials_stone) parts.push(`${base.materials_stone.toLocaleString()} stone`)
  if (base.materials_metal) parts.push(`${base.materials_metal.toLocaleString()} metal`)
  if (base.materials_hq) parts.push(`${base.materials_hq.toLocaleString()} HQM`)

  return parts.join(", ") || "Materials not specified"
}

export function formatBuildTime(minutes: number | null): string {
  if (!minutes) return "Build time not specified"

  if (minutes < 60) return `${minutes} minutes`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`

  return `${hours}h ${remainingMinutes}m`
}

export function getTeamSizeDisplay(base: Base): string {
  if (!base.team_sizes || base.team_sizes.length === 0) return "Any"

  return base.team_sizes
    .map((ts) => ts.team_size?.size)
    .filter(Boolean)
    .join(", ")
}

export function getTagsDisplay(base: Base): string[] {
  if (!base.tags || base.tags.length === 0) return []

  return base.tags.map((t) => t.tag?.tag).filter(Boolean) as string[]
}

export function getCategoryColor(typeName: string | undefined): string {
  if (!typeName) return "bg-gray-500/10 text-gray-500 border-gray-500/20"

  const lowerType = typeName.toLowerCase()

  const colorMap: Record<string, string> = {
    solo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    duo: "bg-green-500/10 text-green-500 border-green-500/20",
    trio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    quad: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    zerg: "bg-red-500/10 text-red-500 border-red-500/20",
    bunker: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    raid: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  }

  return colorMap[lowerType] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
}
