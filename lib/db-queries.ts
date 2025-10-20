import { createClient } from "@/lib/supabase/server"
import type { Base, Footprint, TeamSize, Tag, Creator } from "./types"

export async function getAllBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      creator:creators(name, channel_youtube_id)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getBaseBySlug(slug: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").select("*").eq("slug", slug).eq("status", "published").single()

  if (error) {
    console.error("Error fetching base:", error)
    return null
  }

  return data as Base
}

export async function getBaseById(id: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      creator:creators(name, channel_youtube_id),
      type:types(type),
      footprint:footprints(footprint)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching base:", error)
    return null
  }

  return data as Base
}

export async function searchBases(query: string): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .eq("status", "published")
    .or(`title.ilike.%${query}%,features.ilike.%${query}%,seo_description.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getBasesByType(typeId: string): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .eq("type_id", typeId)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bases by type:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getAllFootprints(): Promise<Footprint[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("footprints").select("*").order("footprint")

  if (error) {
    console.error("Error fetching footprints:", error)
    return []
  }

  return data || []
}

export async function getAllTeamSizes(): Promise<TeamSize[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("team_sizes").select("*").order("size")

  if (error) {
    console.error("Error fetching team sizes:", error)
    return []
  }

  return data || []
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("tags").select("*").order("tag")

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return data || []
}

export async function getAllCreators(): Promise<Creator[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("creators").select("*").order("name")

  if (error) {
    console.error("Error fetching creators:", error)
    return []
  }

  return data || []
}

export async function getFeaturedBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      creator:creators(name, channel_youtube_id)
    `)
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching featured bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getRelatedBases(currentBaseId: string, typeId?: string | null): Promise<Base[]> {
  const supabase = await createClient()

  let query = supabase.from("bases").select("*").eq("status", "published").neq("id", currentBaseId)

  if (typeId) {
    query = query.eq("type_id", typeId)
  }

  const { data, error } = await query.order("created_at", { ascending: false }).limit(3)

  if (error) {
    console.error("Error fetching related bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function incrementBaseViews(id: string): Promise<void> {
  // For now, we'll skip this as it requires a custom RPC function in Supabase
  console.log("View increment skipped for base:", id)
}

export async function getAllTypes(): Promise<Array<{ id: string; type: string }>> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("types").select("*").order("type")

  if (error) {
    console.error("Error fetching types:", error)
    return []
  }

  return data || []
}

export async function getFilteredBases(filters: {
  typeId?: string
  teamSizeId?: string
  footprintId?: string
  search?: string
}): Promise<Base[]> {
  const supabase = await createClient()

  let query = supabase.from("bases").select(`
    *,
    creator:creators(name, channel_youtube_id),
    type:types(type),
    footprint:footprints(footprint)
  `)

  if (filters.typeId && filters.typeId !== "all") {
    query = query.eq("type_id", filters.typeId)
  }

  if (filters.footprintId && filters.footprintId !== "all") {
    query = query.eq("footprint_id", filters.footprintId)
  }

  if (filters.teamSizeId && filters.teamSizeId !== "all") {
    const { data: baseTeams, error: teamError } = await supabase
      .from("base_teams")
      .select("base_id")
      .eq("team_size_id", filters.teamSizeId)

    if (teamError) {
      console.error("Error fetching base teams:", teamError)
      return []
    }

    if (baseTeams && baseTeams.length > 0) {
      const baseIds = baseTeams.map((bt) => bt.base_id)
      query = query.in("id", baseIds)
    } else {
      return []
    }
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,features.ilike.%${filters.search}%`)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching filtered bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getMetaBases(limit = 6): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      creator:creators(name, channel_youtube_id),
      type:types(type),
      footprint:footprints(footprint)
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching meta bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getPopularBases(limit = 6): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      creator:creators(name, channel_youtube_id),
      type:types(type),
      footprint:footprints(footprint)
    `)
    .eq("status", "published")
    .order("youtube_clicks", { ascending: false }) // Intentar ordenar por youtube_clicks
    .order("created_at", { ascending: false }) // Usar created_at temporalmente si falla
    .limit(limit)

  if (error) {
    console.error("Error fetching popular bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function incrementYoutubeClicks(baseId: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc("increment_youtube_clicks", { base_id: baseId })

  if (error) {
    console.error("Error incrementing youtube clicks:", error)
  }
}
