import { logger } from "@/lib/logger"

const NOTION_API_BASE = "https://api.notion.com/v1"
const NOTION_VERSION = "2022-06-28"

function getNotionHeaders() {
  const token = process.env.NOTION_API_TOKEN
  if (!token) {
    throw new Error("NOTION_API_TOKEN is not configured")
  }
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  }
}

function getDatabaseId() {
  const id = process.env.NOTION_BLOG_DATABASE_ID
  if (!id) {
    throw new Error("NOTION_BLOG_DATABASE_ID is not configured")
  }
  return id
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  publishedDate: string | null
  updatedDate: string | null
  category: string | null
  tags: string[]
  coverImageUrl: string | null
}

export interface RichTextItem {
  type: string
  text?: { content: string; link: { url: string } | null }
  annotations?: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text?: string
  href?: string | null
}

export interface NotionBlock {
  id: string
  type: string
  has_children?: boolean
  paragraph?: { rich_text: RichTextItem[]; color: string }
  heading_1?: { rich_text: RichTextItem[]; color: string }
  heading_2?: { rich_text: RichTextItem[]; color: string }
  heading_3?: { rich_text: RichTextItem[]; color: string }
  bulleted_list_item?: { rich_text: RichTextItem[]; color: string }
  numbered_list_item?: { rich_text: RichTextItem[]; color: string }
  quote?: { rich_text: RichTextItem[]; color: string }
  callout?: { rich_text: RichTextItem[]; icon?: { type: string; emoji?: string }; color: string }
  code?: { rich_text: RichTextItem[]; language: string; caption: RichTextItem[] }
  image?: {
    type: "external" | "file"
    external?: { url: string }
    file?: { url: string; expiry_time: string }
    caption?: RichTextItem[]
  }
  divider?: Record<string, never>
  children?: NotionBlock[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractRichText(items: RichTextItem[] | undefined): string {
  if (!items) return ""
  return items.map((item) => item.plain_text || "").join("")
}

function parsePageToPost(page: any): BlogPost {
  const props = page.properties

  const titleItems: RichTextItem[] = props.Name?.title ?? []
  const slugItems: RichTextItem[] = props.Slug?.rich_text ?? []
  const descriptionItems: RichTextItem[] = props.Description?.rich_text ?? []

  return {
    id: page.id,
    title: extractRichText(titleItems),
    slug: extractRichText(slugItems),
    description: extractRichText(descriptionItems),
    publishedDate: props.PublishedDate?.date?.start ?? null,
    updatedDate: props.UpdatedDate?.date?.start ?? null,
    category: props.Category?.select?.name ?? null,
    tags: (props.Tags?.multi_select ?? []).map((tag: { name: string }) => tag.name),
    coverImageUrl: props.CoverImageUrl?.url ?? null,
  }
}

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetches all published blog posts, sorted by PublishedDate DESC.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const databaseId = getDatabaseId()

    const response = await fetch(`${NOTION_API_BASE}/databases/${databaseId}/query`, {
      method: "POST",
      headers: getNotionHeaders(),
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [
          {
            property: "PublishedDate",
            direction: "descending",
          },
        ],
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const error = await response.text()
      logger.error("Notion API error in getAllBlogPosts", error)
      return []
    }

    const data = await response.json()
    return (data.results ?? []).map(parsePageToPost)
  } catch (err) {
    logger.error("Error in getAllBlogPosts", err)
    return []
  }
}

/**
 * Fetches a single published blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const databaseId = getDatabaseId()

    const response = await fetch(`${NOTION_API_BASE}/databases/${databaseId}/query`, {
      method: "POST",
      headers: getNotionHeaders(),
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Published",
              checkbox: { equals: true },
            },
            {
              property: "Slug",
              rich_text: { equals: slug },
            },
          ],
        },
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const error = await response.text()
      logger.error("Notion API error in getBlogPostBySlug", error)
      return null
    }

    const data = await response.json()
    if (!data.results || data.results.length === 0) return null

    return parsePageToPost(data.results[0])
  } catch (err) {
    logger.error("Error in getBlogPostBySlug", err)
    return null
  }
}

/**
 * Estimates reading time in minutes from an array of Notion blocks (~200 wpm).
 */
export function estimateReadingTime(blocks: NotionBlock[]): number {
  let wordCount = 0

  for (const block of blocks) {
    const textBlocks = [
      block.paragraph?.rich_text,
      block.heading_1?.rich_text,
      block.heading_2?.rich_text,
      block.heading_3?.rich_text,
      block.bulleted_list_item?.rich_text,
      block.numbered_list_item?.rich_text,
      block.quote?.rich_text,
      block.callout?.rich_text,
      block.code?.rich_text,
    ]
    for (const richText of textBlocks) {
      if (richText) {
        const text = richText.map((r) => r.plain_text ?? "").join(" ")
        wordCount += text.split(/\s+/).filter(Boolean).length
      }
    }
  }

  return Math.max(1, Math.ceil(wordCount / 200))
}

/**
 * Returns up to `limit` posts related to the current one by category or tags.
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string | null,
  limit = 3
): Promise<BlogPost[]> {
  const all = await getAllBlogPosts()
  const others = all.filter((p) => p.slug !== currentSlug)

  // Prefer same category first, then fallback to any other post
  const sameCategory = others.filter((p) => p.category && p.category === category)
  const rest = others.filter((p) => p.category !== category)

  return [...sameCategory, ...rest].slice(0, limit)
}

/**
 * Fetches the full block content of a Notion page, handling pagination.
 */
export async function getBlogPostContent(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = []

  try {
    let cursor: string | undefined = undefined

    do {
      const url = new URL(`${NOTION_API_BASE}/blocks/${pageId}/children`)
      url.searchParams.set("page_size", "100")
      if (cursor) url.searchParams.set("start_cursor", cursor)

      const response = await fetch(url.toString(), {
        headers: getNotionHeaders(),
        next: { revalidate: 3600 },
      })

      if (!response.ok) {
        const error = await response.text()
        logger.error("Notion API error in getBlogPostContent", error)
        break
      }

      const data = await response.json()
      blocks.push(...(data.results ?? []))
      cursor = data.has_more ? data.next_cursor : undefined
    } while (cursor)
  } catch (err) {
    logger.error("Error in getBlogPostContent", err)
  }

  return blocks
}
