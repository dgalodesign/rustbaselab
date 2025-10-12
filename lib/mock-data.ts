import type { Base, FilterOptions } from "./types"

export const mockBases: Base[] = [
  {
    id: "1",
    title: "Compact Solo Starter Base",
    description:
      "Perfect starter base for solo players. Efficient design with honeycomb protection and easy expansion options.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "solo",
    difficulty: "easy",
    buildTime: "30 minutes",
    materials: "15k stone, 5k metal frags, 2k wood",
    featured: true,
    views: 15420,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Duo Bunker Design",
    description: "Advanced bunker base for duo teams. Features multiple bunker entrances and secure loot rooms.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "duo",
    difficulty: "hard",
    buildTime: "2 hours",
    materials: "50k stone, 20k metal frags, 5k HQM",
    featured: true,
    views: 28350,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Trio Tower Base",
    description:
      "Vertical tower design optimized for trio gameplay. Strong roof protection and multiple shooting floors.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "trio",
    difficulty: "medium",
    buildTime: "1.5 hours",
    materials: "35k stone, 15k metal frags, 3k wood",
    featured: false,
    views: 12890,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Quad Compound Base",
    description: "Large compound base for 4-player teams. Multiple buildings with secure courtyard and garage.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "quad",
    difficulty: "hard",
    buildTime: "3 hours",
    materials: "80k stone, 40k metal frags, 10k HQM",
    featured: true,
    views: 34120,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Zerg Fortress",
    description: "Massive fortress design for large groups. Multiple layers of defense and extensive storage.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "zerg",
    difficulty: "hard",
    buildTime: "5+ hours",
    materials: "200k stone, 100k metal frags, 30k HQM",
    featured: false,
    views: 45670,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
  },
  {
    id: "6",
    title: "Raid Base Quick Deploy",
    description: "Fast-deploy raid base design. Quick to build near targets with secure spawn and storage.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    category: "raid",
    difficulty: "easy",
    buildTime: "20 minutes",
    materials: "10k stone, 3k metal frags, 1k wood",
    featured: false,
    views: 8920,
    createdAt: "2024-02-20",
    updatedAt: "2024-02-20",
  },
]

export function getBaseById(id: string): Base | undefined {
  return mockBases.find((base) => base.id === id)
}

export function filterBases(options: FilterOptions): Base[] {
  let filtered = [...mockBases]

  if (options.category && options.category !== "all") {
    filtered = filtered.filter((base) => base.category === options.category)
  }

  if (options.difficulty && options.difficulty !== "all") {
    filtered = filtered.filter((base) => base.difficulty === options.difficulty)
  }

  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filtered = filtered.filter(
      (base) => base.title.toLowerCase().includes(searchLower) || base.description.toLowerCase().includes(searchLower),
    )
  }

  return filtered
}
