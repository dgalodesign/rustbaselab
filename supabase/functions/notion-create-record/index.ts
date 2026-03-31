import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const NOTION_API_KEY = Deno.env.get("NOTION_API_TOKEN")
const NOTION_DATABASE_ID = Deno.env.get("NOTION_DATABASE_ID")

// Only allow requests from the production domain and localhost for development
const ALLOWED_ORIGINS = [
  "https://rustbaselab.com",
  "http://localhost:3000",
  "http://localhost:3001",
]

function getAllowedOrigin(requestOrigin: string | null): string | null {
  if (!requestOrigin) return null
  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : null
}

// Simple in-memory rate limiter (resets when function instance restarts)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

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

serve(async (req) => {
  const requestOrigin = req.headers.get("origin")
  const allowedOrigin = getAllowedOrigin(requestOrigin)

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  if (allowedOrigin) {
    corsHeaders["Access-Control-Allow-Origin"] = allowedOrigin
  }

  if (req.method === "OPTIONS") {
    if (!allowedOrigin) {
      return new Response(null, { status: 403 })
    }
    return new Response("ok", { headers: corsHeaders })
  }

  // Block requests from disallowed origins
  if (!allowedOrigin) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Rate limiting by IP
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  }

  try {
    const { title, message } = await req.json()

    if (!title || !message) {
      return new Response(JSON.stringify({ error: "Title and message are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // Sanitize inputs to prevent injection in Notion properties
    const safeTitle = String(title).slice(0, 200)
    const safeMessage = String(message).slice(0, 1000)

    const notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          title: {
            title: [{ text: { content: safeTitle } }],
          },
          message: {
            rich_text: [{ text: { content: safeMessage } }],
          },
        },
      }),
    })

    if (!notionResponse.ok) {
      const error = await notionResponse.json()
      console.error("[RustBaseLab] Notion API error:", error)
      return new Response(JSON.stringify({ error: "Notion API error" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    const data = await notionResponse.json()
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  } catch (error) {
    console.error("[RustBaseLab] Error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  }
})
