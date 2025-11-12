import { createClient } from "@supabase/supabase-js"
import { logger } from "@/lib/logger"

let clientInstance: ReturnType<typeof createClient> | null = null

export function createPublicClient() {
  if (clientInstance) {
    return clientInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    logger.error(
      "Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
    )
    return createMockClient()
  }

  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
    logger.info("Supabase client created successfully")
    return clientInstance
  } catch (error) {
    logger.error("Failed to create Supabase client", error)
    return createMockClient()
  }
}

function createMockClient() {
  logger.warn("Using mock Supabase client - data will not be available")

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
