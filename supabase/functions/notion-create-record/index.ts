import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Deno } from "https://deno.land/std@0.168.0/io/mod.ts" // Declare Deno variable

const NOTION_API_KEY = Deno.env.get("NOTION_API_TOKEN")
const NOTION_DATABASE_ID = Deno.env.get("NOTION_DATABASE_ID")

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  try {
    const { title, message } = await req.json()

    if (!title || !message) {
      return new Response(JSON.stringify({ error: "Title and message are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

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
            title: [{ text: { content: title } }],
          },
          message: {
            rich_text: [{ text: { content: message } }],
          },
        },
      }),
    })

    if (!notionResponse.ok) {
      const error = await notionResponse.json()
      console.error("[v0] Notion API error:", error)
      return new Response(JSON.stringify({ error: "Notion API error", details: error }), {
        status: 502,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    const data = await notionResponse.json()
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  } catch (error) {
    console.error("[v0] Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  }
})
