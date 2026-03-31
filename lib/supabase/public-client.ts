import { createClient } from "@supabase/supabase-js"
import { logger } from "@/lib/logger"

export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    logger.error(
      "Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
    )
    return createMockClient()
  }

  // Validate URL format to prevent "Failed to fetch" errors due to invalid URLs
  try {
    new URL(supabaseUrl)
  } catch (e) {
    logger.error(`Invalid Supabase URL: ${supabaseUrl}`, e)
    return createMockClient()
  }

  try {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
    return client
  } catch (error) {
    logger.error("Failed to create Supabase client", error)
    return createMockClient()
  }
}

function createMockClient() {
  logger.warn("Using mock Supabase client - data will not be available")

  const mockError = { message: "Supabase not configured" }
  const emptyResult = { data: null, error: mockError }
  const emptyArrayResult = { data: [], error: mockError }

  // Chainable query builder that always resolves to empty results
  const mockQuery = (): any => {
    const query: any = {
      select: () => mockQuery(),
      eq: () => mockQuery(),
      neq: () => mockQuery(),
      in: () => mockQuery(),
      or: () => mockQuery(),
      order: () => mockQuery(),
      limit: () => mockQuery(),
      single: () => emptyResult,
      // Make the object itself awaitable (for direct destructuring like `const { data } = await supabase.from(...).select(...)`)
      then: (resolve: (value: any) => void) => Promise.resolve(emptyArrayResult).then(resolve),
      data: [],
      error: mockError,
    }
    return query
  }

  return {
    from: () => mockQuery(),
    rpc: () => Promise.resolve(emptyResult),
  } as any
}
