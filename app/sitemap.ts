import type { MetadataRoute } from "next"
import { createPublicClient } from "@/lib/supabase/public-client"

interface BaseData {
  slug: string
  updated_at: string
}

interface TypeData {
  id: string
  name: string
}

interface TeamSizeData {
  id: string
  name: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient()

  const baseUrl = "https://rustbaselab.com"

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/bases`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95, // Increased priority based on analytics
    },
    // Future static landing pages (Sprint 2)
    {
      url: `${baseUrl}/bases/solo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bases/duo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bases/trio`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bases/quad`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]

  // Obtener todas las bases publicadas para el sitemap
  const { data: bases } = await supabase
    .from("published_bases")
    .select("slug, updated_at")
    .order("updated_at", { ascending: false })

  const basePages: MetadataRoute.Sitemap =
    bases?.map((base: BaseData) => ({
      url: `${baseUrl}/base/${base.slug}`,
      lastModified: new Date(base.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.85, // Increased priority for individual bases
    })) || []

  // Obtener todos los tipos para páginas filtradas
  const { data: types } = await supabase.from("types").select("id, name")

  const typePages: MetadataRoute.Sitemap =
    types?.map((type: TypeData) => ({
      url: `${baseUrl}/bases?type=${type.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  // Obtener todos los team sizes para páginas filtradas
  // Note: These will be less important once we have static landing pages
  const { data: teamSizes } = await supabase.from("team_sizes").select("id, name")

  const teamSizePages: MetadataRoute.Sitemap =
    teamSizes?.map((size: TeamSizeData) => ({
      url: `${baseUrl}/bases?teamSize=${size.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6, // Lowered priority in favor of static pages
    })) || []

  return [...staticPages, ...basePages, ...typePages, ...teamSizePages]
}
