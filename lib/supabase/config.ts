// Supabase configuration with comprehensive error handling
export function getSupabaseConfig() {
  const envVars = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    STORAGE_SUPABASE_URL: process.env.STORAGE_SUPABASE_URL,
    STORAGE_NEXT_PUBLIC_SUPABASE_URL: process.env.STORAGE_NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STORAGE_SUPABASE_ANON_KEY: process.env.STORAGE_SUPABASE_ANON_KEY,
    STORAGE_NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.STORAGE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  // Log all environment variables (server-side only)
  if (typeof window === "undefined") {
    console.log("[v0] Environment variables check:")
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`[v0] ${key}:`, value ? `${value.substring(0, 20)}...` : "undefined")
    })
  }

  const url =
    envVars.SUPABASE_URL ||
    envVars.NEXT_PUBLIC_SUPABASE_URL ||
    envVars.STORAGE_SUPABASE_URL ||
    envVars.STORAGE_NEXT_PUBLIC_SUPABASE_URL

  const anonKey =
    envVars.SUPABASE_ANON_KEY ||
    envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    envVars.STORAGE_SUPABASE_ANON_KEY ||
    envVars.STORAGE_NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    const errorMessage = `
      Supabase configuration error:
      - URL found: ${!!url}
      - Key found: ${!!anonKey}
      
      Please ensure the Supabase integration is connected:
      1. Open the sidebar on the left
      2. Go to "Connect" section
      3. Add or verify the Supabase integration
      4. Make sure the environment variables are set in the "Vars" section
    `
    console.error("[v0]", errorMessage)
    throw new Error(errorMessage)
  }

  // Validate URL format
  try {
    new URL(url)
  } catch (e) {
    throw new Error(`Invalid Supabase URL format: ${url}. Please check your Supabase configuration.`)
  }

  return { url, anonKey }
}
