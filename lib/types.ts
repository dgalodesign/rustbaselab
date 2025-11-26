export interface Base {
  id: string
  title: string
  slug: string
  features: string | null
  video_youtube_id: string | null
  image_main_url: string | null
  status: string | null
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  materials_stone: number | null
  materials_metal: number | null
  materials_hq: number | null
  materials_wood: number | null
  upkeep_stone: number | null
  upkeep_metal: number | null
  upkeep_hq: number | null
  upkeep_wood: number | null
  build_time_min: number | null
  raid_cost_sulfur: number | null
  raid_costs: any | null
  created_at: string
  updated_at: string
  type_id: string | null
  footprint_id: string | null
  creator_id: string | null
  type?: { name: string }
  footprint?: { name: string }
  creator?: { name: string; channel_youtube_id: string }
  team_sizes?: Array<{ team_size: { name: string } }>
  tags?: Array<{ tag: { tag: string; description: string } }>
}

export interface BaseType {
  id: string
  name: string
}

export interface Footprint {
  id: string
  name: string
}

export interface TeamSize {
  id: string
  name: string
}

export interface Tag {
  id: string
  tag: string
  description: string | null
}

export interface Creator {
  id: string
  name: string
  channel_youtube_id: string | null
  created_at: string
}

export interface FilterOptions {
  type?: string
  teamSize?: string
  search?: string
}
