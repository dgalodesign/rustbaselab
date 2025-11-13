import { createPublicClient } from "@/lib/supabase/public-client"
import type { Base, Footprint, TeamSize, Tag, Creator } from "./types"
import { logger } from "./logger"
import { handleDatabaseError } from "./error-handler"

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
      handleDatabaseError(error, "getAllBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getAllBases", err)
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
        type:types(name),
        footprint:footprints(name)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      handleDatabaseError(error, "getBaseBySlug")
    }

    return data as Base
  } catch (err) {
    logger.error("Error in getBaseBySlug", err)
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
        type:types(name),
        footprint:footprints(name)
      `)
      .eq("id", id)
      .single()

    if (error) {
      handleDatabaseError(error, "getBaseById")
    }

    return data as Base
  } catch (err) {
    logger.error("Error in getBaseById", err)
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
      handleDatabaseError(error, "searchBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in searchBases", err)
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
      handleDatabaseError(error, "getBasesByType")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getBasesByType", err)
    return []
  }
}

export async function getAllFootprints(): Promise<Footprint[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("footprints").select("*").order("name")

  if (error) {
    logger.error("Error fetching footprints", error)
    return []
  }

  return data || []
}

export async function getAllTeamSizes(): Promise<TeamSize[]> {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase.from("team_sizes").select("*").order("name")

    if (error) {
      handleDatabaseError(error, "getAllTeamSizes")
    }

    return data || []
  } catch (err) {
    logger.error("Error in getAllTeamSizes", err)
    return []
  }
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("tags").select("*").order("tag")

  if (error) {
    logger.error("Error fetching tags", error)
    return []
  }

  return data || []
}

export async function getAllCreators(): Promise<Creator[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("creators").select("*").order("name")

  if (error) {
    logger.error("Error fetching creators", error)
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
      handleDatabaseError(error, "getFeaturedBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getFeaturedBases", err)
    return []
  }
}

export async function getRelatedBases(currentBaseId: string, teamSizeIds?: string[]): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    if (teamSizeIds && teamSizeIds.length > 0) {
      const { data: baseTeams, error: teamError } = await supabase
        .from("base_teams")
        .select("base_id")
        .in("team_size_id", teamSizeIds)
        .neq("base_id", currentBaseId)

      if (teamError) {
        logger.error("Error fetching related bases by team size", teamError)
        return []
      }

      if (baseTeams && baseTeams.length > 0) {
        const baseIds = baseTeams.map((bt) => bt.base_id)

        const { data, error } = await supabase
          .from("published_bases")
          .select(`
            *,
            creator:creators(name, channel_youtube_id),
            type:types(name),
            footprint:footprints(name)
          `)
          .in("id", baseIds)
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) {
          logger.error("Error fetching related bases", error)
          return []
        }

        return (data || []) as Base[]
      }
    }

    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(name),
        footprint:footprints(name)
      `)
      .neq("id", currentBaseId)
      .order("created_at", { ascending: false })
      .limit(3)

    if (error) {
      logger.error("Error fetching related bases", error)
      return []
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getRelatedBases", err)
    return []
  }
}

export async function incrementBaseViews(id: string): Promise<void> {
  logger.debug("View increment skipped for base:", id)
}

export async function getAllTypes(): Promise<Array<{ id: string; type: string }>> {
  const supabase = createPublicClient()

  const { data, error } = await supabase.from("types").select("*").order("name")

  if (error) {
    logger.error("Error fetching types", error)
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
      type:types(name),
      footprint:footprints(name)
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
        logger.error("Error fetching base teams", teamError)
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
      handleDatabaseError(error, "getFilteredBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getFilteredBases", err)
    return []
  }
}

export async function getMetaBases(limit = 6): Promise<Base[]> {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(name),
        footprint:footprints(name)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      handleDatabaseError(error, "getMetaBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getMetaBases, attempting fallback", err)
    try {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from("bases")
        .select(`
          *,
          creator:creators(name, channel_youtube_id),
          type:types(name),
          footprint:footprints(name)
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        handleDatabaseError(error, "getMetaBases fallback")
      }

      return (data || []) as Base[]
    } catch (fallbackErr) {
      logger.error("Fallback also failed in getMetaBases", fallbackErr)
      return []
    }
  }
}

export async function getPopularBases(limit = 6): Promise<Base[]> {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(name),
        footprint:footprints(name)
      `)
      .order("youtube_clicks", { ascending: false, nullsFirst: false })
      .limit(limit)

    if (error) {
      handleDatabaseError(error, "getPopularBases")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getPopularBases, attempting fallback", err)
    try {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from("bases")
        .select(`
          *,
          creator:creators(name, channel_youtube_id),
          type:types(name),
          footprint:footprints(name)
        `)
        .eq("status", "published")
        .order("youtube_clicks", { ascending: false, nullsFirst: false })
        .limit(limit)

      if (error) {
        handleDatabaseError(error, "getPopularBases fallback")
      }

      return (data || []) as Base[]
    } catch (fallbackErr) {
      logger.error("Fallback also failed in getPopularBases", fallbackErr)
      return []
    }
  }
}

export async function incrementYoutubeClicks(baseId: string): Promise<void> {
  const supabase = createPublicClient()

  try {
    const { error } = await supabase.rpc("increment_youtube_clicks", { base_id: baseId })

    if (error) {
      logger.error("Error incrementing youtube clicks", error)
    }
  } catch (err) {
    logger.error("Error in incrementYoutubeClicks", err)
  }
}

export async function getBasesByCreator(creatorId: string, currentBaseId: string, limit = 3): Promise<Base[]> {
  const supabase = createPublicClient()

  try {
    const { data, error } = await supabase
      .from("published_bases")
      .select(`
        *,
        creator:creators(name, channel_youtube_id),
        type:types(name),
        footprint:footprints(name)
      `)
      .eq("creator_id", creatorId)
      .neq("id", currentBaseId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      handleDatabaseError(error, "getBasesByCreator")
    }

    return (data || []) as Base[]
  } catch (err) {
    logger.error("Error in getBasesByCreator", err)
    return []
  }
}
