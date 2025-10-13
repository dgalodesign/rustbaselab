import { createClient } from "@/lib/supabase/server"
import type { Base, BaseType, Footprint, TeamSize, Tag, Creator } from "./types"

export async function getAllBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      type:types(name),
      footprint:footprints(name),
      creator:creators(name, channel_youtube_id),
      team_sizes:base_teams(team_size:team_sizes(size)),
      tags:base_tags(tag:tags(tag, description))
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching bases:", error)
    return []
  }

  return data || []
}

export async function getBaseBySlug(slug: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      type:types(name),
      footprint:footprints(name),
      creator:creators(name, channel_youtube_id),
      team_sizes:base_teams(team_size:team_sizes(size)),
      tags:base_tags(tag:tags(tag, description))
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("[v0] Error fetching base:", error)
    return null
  }

  return data
}

export async function getBaseById(id: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      type:types(name),
      footprint:footprints(name),
      creator:creators(name, channel_youtube_id),
      team_sizes:base_teams(team_size:team_sizes(size)),
      tags:base_tags(tag:tags(tag, description))
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("[v0] Error fetching base:", error)
    return null
  }

  return data
}

export async function searchBases(query: string): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      type:types(name),
      footprint:footprints(name),
      creator:creators(name, channel_youtube_id),
      team_sizes:base_teams(team_size:team_sizes(size)),
      tags:base_tags(tag:tags(tag, description))
    `)
    .eq("status", "published")
    .or(`title.ilike.%${query}%,features.ilike.%${query}%,seo_description.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error searching bases:", error)
    return []
  }

  return data || []
}

export async function getBasesByType(typeId: string): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select(`
      *,
      type:types(name),
      footprint:footprints(name),
      creator:creators(name, channel_youtube_id),
      team_sizes:base_teams(team_size:team_sizes(size)),
      tags:base_tags(tag:tags(tag, description))
    `)
    .eq("type_id", typeId)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching bases by type:", error)
    return []
  }

  return data || []
}

export async function getAllTypes(): Promise<BaseType[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("types").select("*").order("name")

  if (error) {
    console.error("[v0] Error fetching types:", error)
    return []
  }

  return data || []
}

export async function getAllFootprints(): Promise<Footprint[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("footprints").select("*").order("name")

  if (error) {
    console.error("[v0] Error fetching footprints:", error)
    return []
  }

  return data || []
}

export async function getAllTeamSizes(): Promise<TeamSize[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("team_sizes").select("*").order("size")

  if (error) {
    console.error("[v0] Error fetching team sizes:", error)
    return []
  }

  return data || []
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("tags").select("*").order("tag")

  if (error) {
    console.error("[v0] Error fetching tags:", error)
    return []
  }

  return data || []
}

export async function getAllCreators(): Promise<Creator[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("creators").select("*").order("name")

  if (error) {
    console.error("[v0] Error fetching creators:", error)
    return []
  }

  return data || []
}

// Admin functions for CRUD operations
export async function createBase(baseData: Partial<Base>): Promise<{ data: Base | null; error: any }> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").insert([baseData]).select().single()

  return { data, error }
}

export async function updateBase(id: string, baseData: Partial<Base>): Promise<{ data: Base | null; error: any }> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").update(baseData).eq("id", id).select().single()

  return { data, error }
}

export async function deleteBase(id: string): Promise<{ error: any }> {
  const supabase = await createClient()

  const { error } = await supabase.from("bases").delete().eq("id", id)

  return { error }
}
