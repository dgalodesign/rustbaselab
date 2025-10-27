import { createPublicClient } from "@/lib/supabase/public-client"
import type { Base, Footprint, TeamSize, Tag, Creator } from "./types"

async function handleSupabaseError(error: any, context: string) {
  console.error(`[v0] Supabase error in ${context}:`, {
    message: error?.message,
    details: error?.details,
    hint: error?.hint,
    code: error?.code,
  })
}

// This ensures only published content is fetched and provides better performance

export async function getAllBases(): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching bases:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getAllBases:", err)
    return []
  }
}

export async function getBaseBySlug(slug: string): Promise<Base | null> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(type),
        footprint:footprints(footprint)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("[v0] Error fetching base by slug:", error)
      return null
    }

    return data as Base
  } catch (err) {
    console.error("[v0] Unexpected error in getBaseBySlug:", err)
    return null
  }
}

export async function getBaseById(id: string): Promise<Base | null> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(type),
        footprint:footprints(footprint)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("[v0] Error fetching base by id:", error)
      return null
    }

    return data as Base
  } catch (err) {
    console.error("[v0] Unexpected error in getBaseById:", err)
    return null
  }
}

export async function searchBases(query: string): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select("*")
      .or(`title.ilike.%${query}%,features.ilike.%${query}%,seo_description.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error searching bases:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in searchBases:", err)
    return []
  }
}

export async function getBasesByType(typeId: string): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select("*")
      .eq("type_id", typeId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching bases by type:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getBasesByType:", err)
    return []
  }
}

export async function getAllFootprints(): Promise<Footprint[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("footprints").select("*").order("footprint")

  if (error) {
    console.error("Error fetching footprints:", error)
    return []
  }

  return data || []
}

export async function getAllTeamSizes(): Promise<TeamSize[]> {
  try {
    const supabase = createPublicClient()

    console.log("[v0] Fetching team sizes")

    const { data, error } = await supabase.from("team_sizes").select("*").order("size")

    if (error) {
      await handleSupabaseError(error, "getAllTeamSizes")
      return []
    }

    console.log(`[v0] Successfully fetched ${data?.length || 0} team sizes`)
    return data || []
  } catch (err) {
    console.error("[v0] Unexpected error in getAllTeamSizes:", err)
    return []
  }
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("tags").select("*").order("tag")

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return data || []
}

export async function getAllCreators(): Promise<Creator[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("creators").select("*").order("name")

  if (error) {
    console.error("Error fetching creators:", error)
    return []
  }

  return data || []
}

export async function getFeaturedBases(): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id)
      `)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("[v0] Error fetching featured bases:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getFeaturedBases:", err)
    return []
  }
}

export async function getRelatedBases(currentBaseId: string, typeId?: string | null): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    let query = supabase.from("published_bases").select("*").neq("id", currentBaseId)

    if (typeId) {
      query = query.eq("type_id", typeId)
    }

    const { data, error } = await query.order("created_at", { ascending: false }).limit(3)

    if (error) {
      console.error("[v0] Error fetching related bases:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getRelatedBases:", err)
    return []
  }
}

export async function incrementBaseViews(id: string): Promise<void> {
  // For now, we'll skip this as it requires a custom RPC function in Supabase
  console.log("View increment skipped for base:", id)
}

export async function getAllTypes(): Promise<Array<{ id: string; type: string }>> {
  const supabase = createPublicClient()

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
  const supabase = createPublicClient()

  try {
    let query = supabase.from("published_bases").select(`
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
        console.error("[v0] Error fetching base teams:", teamError)
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
      console.error("[v0] Error fetching filtered bases:", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getFilteredBases:", err)
    return []
  }
}

export async function getMetaBases(limit = 6): Promise<Base[]> {
  try {
    const supabase = createPublicClient()

    console.log("[v0] Fetching meta bases from published_bases view")

    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(type),
        footprint:footprints(footprint)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      await handleSupabaseError(error, "getMetaBases")
      return []
    }

    console.log(`[v0] Successfully fetched ${data?.length || 0} meta bases`)
    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getMetaBases:", err)
    try {
      console.log("[v0] Attempting fallback to bases table")
      const supabase = createPublicClient()
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
        await handleSupabaseError(error, "getMetaBases fallback")
        return []
      }

      console.log(`[v0] Fallback successful: fetched ${data?.length || 0} bases`)
      return (data || []) as Base[]
    } catch (fallbackErr) {
      console.error("[v0] Fallback also failed:", fallbackErr)
      return []
    }
  }
}

export async function getPopularBases(limit = 6): Promise<Base[]> {
  try {
    const supabase = createPublicClient()

    console.log("[v0] Fetching popular bases from published_bases view")

    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(type),
        footprint:footprints(footprint)
      `)
      .order("youtube_clicks", { ascending: false, nullsFirst: false })
      .limit(limit)

    if (error) {
      await handleSupabaseError(error, "getPopularBases")
      return []
    }

    console.log(`[v0] Successfully fetched ${data?.length || 0} popular bases`)
    return (data || []) as Base[]
  } catch (err) {
    console.error("[v0] Unexpected error in getPopularBases:", err)
    try {
      console.log("[v0] Attempting fallback to bases table")
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from("bases")
        .select(`
          *,
          creator:creators(name, channel_youtube_id),
          type:types(type),
          footprint:footprints(footprint)
        `)
        .eq("status", "published")
        .order("youtube_clicks", { ascending: false, nullsFirst: false })
        .limit(limit)

      if (error) {
        await handleSupabaseError(error, "getPopularBases fallback")
        return []
      }

      console.log(`[v0] Fallback successful: fetched ${data?.length || 0} bases`)
      return (data || []) as Base[]
    } catch (fallbackErr) {
      console.error("[v0] Fallback also failed:", fallbackErr)
      return []
    }
  }
}

export async function incrementYoutubeClicks(baseId: string): Promise<void> {
  const supabase = createPublicClient()

  try {
    const { error } = await supabase.rpc("increment_youtube_clicks", { base_id: baseId })

    if (error) {
      console.error("[v0] Error incrementing youtube clicks:", error)
    }
  } catch (err) {
    console.error("[v0] Unexpected error in incrementYoutubeClicks:", err)
  }
}
