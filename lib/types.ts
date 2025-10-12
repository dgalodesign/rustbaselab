export interface Base {
  id: string
  title: string
  description: string
  youtubeUrl: string
  thumbnailUrl: string
  category: "solo" | "duo" | "trio" | "quad" | "zerg" | "bunker" | "raid"
  difficulty: "easy" | "medium" | "hard"
  buildTime: string
  materials: string
  featured: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  category?: string
  difficulty?: string
  search?: string
}
