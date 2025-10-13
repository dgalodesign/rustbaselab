import { createClient } from "@/lib/supabase/server"
import type { Base, Footprint, TeamSize, Tag, Creator } from "./types"

export async function getAllBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  console.log("[v0] getAllBases - data:", data)
  console.log("[v0] getAllBases - error:", error)

  if (error) {
    console.error("[v0] Error fetching bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function getBaseBySlug(slug: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").select("*").eq("slug", slug).eq("status", "published").single()

  console.log("[v0] getBaseBySlug - slug:", slug)
  console.log("[v0] getBaseBySlug - data:", data)
  console.log("[v0] getBaseBySlug - error:", error)

  if (error) {
    console.error("[v0] Error fetching base:", error)
    return null
  }

  return data as Base
}

export async function getBaseById(id: string): Promise<Base | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").select("*").eq("id", id).single()

  console.log("[v0] getBaseById - id:", id)
  console.log("[v0] getBaseById - data:", data)
  console.log("[v0] getBaseById - error:", error)

  if (error) {
    console.error("[v0] Error fetching base:", error)
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

  console.log("[v0] searchBases - query:", query)
  console.log("[v0] searchBases - data:", data)
  console.log("[v0] searchBases - error:", error)

  if (error) {
    console.error("[v0] Error searching bases:", error)
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
    console.error("[v0] Error fetching bases by type:", error)
    return []
  }

  return (data || []) as Base[]
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

export async function getFeaturedBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6)

  console.log("[v0] getFeaturedBases - data:", data)
  console.log("[v0] getFeaturedBases - error:", error)

  if (error) {
    console.error("[v0] Error fetching featured bases:", error)
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
    console.error("[v0] Error fetching related bases:", error)
    return []
  }

  return (data || []) as Base[]
}

export async function incrementBaseViews(id: string): Promise<void> {
  // For now, we'll skip this as it requires a custom RPC function in Supabase
  console.log("[v0] View increment skipped for base:", id)
}
