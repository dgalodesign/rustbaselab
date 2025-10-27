import type { MetadataRoute } from "next"
import { createPublicClient } from "@/lib/supabase/public-client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient()

  const baseUrl = "https://rustbaselab.com"

  // Páginas estáticas
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
      priority: 0.9,
    },
  ]

  // Obtener todas las bases publicadas para el sitemap
  const { data: bases } = await supabase
    .from("published_bases")
    .select("slug, updated_at")
    .order("updated_at", { ascending: false })

  const basePages: MetadataRoute.Sitemap =
    bases?.map((base) => ({
      url: `${baseUrl}/base/${base.slug}`,
      lastModified: new Date(base.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || []

  // Obtener todos los tipos para páginas filtradas
  const { data: types } = await supabase.from("types").select("id")

  const typePages: MetadataRoute.Sitemap =
    types?.map((type) => ({
      url: `${baseUrl}/bases?type=${type.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  return [...staticPages, ...basePages, ...typePages]
}
