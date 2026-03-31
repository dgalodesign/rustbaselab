import { type NextRequest, NextResponse } from "next/server"

interface NotionRequestBody {
  baseId: string
  baseTitle: string
  baseSlug: string
  requestType: "build_cost" | "upkeep"
}

// Simple in-memory rate limiter — max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }
  try {
    const body: NotionRequestBody = await request.json()
    const { baseId, baseTitle, baseSlug, requestType } = body

    if (!baseId || !baseTitle || !baseSlug || !requestType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const notionToken = process.env.NOTION_API_TOKEN
    const notionDatabaseId = process.env.NOTION_DATABASE_ID

    if (!notionToken || !notionDatabaseId) {
      return NextResponse.json({ error: "Notion configuration missing" }, { status: 500 })
    }

    // Create page in Notion database
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: `[${requestType.toUpperCase()}] ${baseTitle}`,
                },
              },
            ],
          },
          "Base ID": {
            rich_text: [
              {
                text: {
                  content: baseId,
                },
              },
            ],
          },
          "Base Slug": {
            rich_text: [
              {
                text: {
                  content: baseSlug,
                },
              },
            ],
          },
          "Request Type": {
            select: {
              name: requestType === "build_cost" ? "Build Cost" : "Upkeep",
            },
          },
          Status: {
            select: {
              name: "Pending",
            },
          },
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Notion API error:", error)
      return NextResponse.json({ error: "Failed to create Notion record" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error creating Notion record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
