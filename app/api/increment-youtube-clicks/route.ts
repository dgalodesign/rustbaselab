import { type NextRequest, NextResponse } from "next/server"
import { incrementYoutubeClicks } from "@/lib/db-queries"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { baseId } = body

    if (!baseId || typeof baseId !== "string") {
      return NextResponse.json({ error: "Missing or invalid baseId" }, { status: 400 })
    }

    await incrementYoutubeClicks(baseId)
    return NextResponse.json({ success: true })
  } catch {
    // Non-critical endpoint: return 200 to avoid client-side errors
    return NextResponse.json({ success: false })
  }
}
