"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { Base } from "@/lib/types"

export async function getAllBases(): Promise<Base[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("bases").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching bases:", error)
    return []
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    youtubeUrl: row.youtube_url,
    thumbnailUrl: row.thumbnail_url,
    category: row.category,
    difficulty: row.difficulty,
    buildTime: row.build_time,
    materials: row.materials,
    featured: row.featured,
    views: row.views,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }))
}

export async function createBase(data: Partial<Base>): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.from("bases").insert({
    title: data.title,
    description: data.description,
    youtube_url: data.youtubeUrl,
    thumbnail_url: data.thumbnailUrl || "/placeholder.svg?height=400&width=600",
    category: data.category,
    difficulty: data.difficulty,
    build_time: data.buildTime,
    materials: data.materials,
    featured: data.featured || false,
    views: 0,
  })

  if (error) {
    console.error("[v0] Error creating base:", error)
    throw new Error("Failed to create base")
  }

  revalidatePath("/")
  revalidatePath("/bases")
  revalidatePath("/admin")
}

export async function updateBase(id: string, data: Partial<Base>): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("bases")
    .update({
      title: data.title,
      description: data.description,
      youtube_url: data.youtubeUrl,
      thumbnail_url: data.thumbnailUrl,
      category: data.category,
      difficulty: data.difficulty,
      build_time: data.buildTime,
      materials: data.materials,
      featured: data.featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("[v0] Error updating base:", error)
    throw new Error("Failed to update base")
  }

  revalidatePath("/")
  revalidatePath("/bases")
  revalidatePath("/admin")
  revalidatePath(`/base/${id}`)
}

export async function deleteBase(id: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.from("bases").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting base:", error)
    throw new Error("Failed to delete base")
  }

  revalidatePath("/")
  revalidatePath("/bases")
  revalidatePath("/admin")
}
