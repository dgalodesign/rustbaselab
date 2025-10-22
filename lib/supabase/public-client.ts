import { createClient } from "@supabase/supabase-js"

let clientInstance: ReturnType<typeof createClient> | null = null

export function createPublicClient() {
  // Return cached instance if available
  if (clientInstance) {
    return clientInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Supabase environment check:")
  console.log("[v0] NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "configured" : "missing")
  console.log("[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "configured" : "missing")

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] ERROR: Missing Supabase environment variables")
    console.error("[v0] This will cause the application to fail in production")
    console.error("[v0] Please configure these variables in Vercel:")
    console.error("[v0] 1. Go to your Vercel project settings")
    console.error("[v0] 2. Navigate to Environment Variables")
    console.error("[v0] 3. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
    console.error("[v0] 4. Redeploy your application")

    return createMockClient()
  }

  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
    console.log("[v0] Supabase client created successfully")
    return clientInstance
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    return createMockClient()
  }
}

function createMockClient() {
  console.warn("[v0] Using mock Supabase client - data will not be available")

  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          data: [],
          error: { message: "Supabase not configured" },
        }),
        order: () => ({
          limit: () => ({
            data: [],
            error: { message: "Supabase not configured" },
          }),
        }),
        limit: () => ({
          data: [],
          error: { message: "Supabase not configured" },
        }),
        data: [],
        error: { message: "Supabase not configured" },
      }),
      data: [],
      error: { message: "Supabase not configured" },
    }),
    rpc: () => ({
      data: null,
      error: { message: "Supabase not configured" },
    }),
  } as any
}
