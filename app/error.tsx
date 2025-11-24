"use client"

import { useEffect } from "react"
import { SupabaseConfigWarning } from "@/components/supabase-config-warning"
import { logger } from "@/lib/logger"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    logger.error("Application error", error)
  }, [error])

  const errorMessage = error?.message || error?.toString() || "An unknown error occurred"
  
  const isSupabaseConfigError =
    errorMessage.includes("SUPABASE_") ||
    errorMessage.includes("INVALID_SUPABASE_URL") ||
    errorMessage.includes("Invalid supabaseUrl")

  if (isSupabaseConfigError) {
    return <SupabaseConfigWarning errorMessage={errorMessage} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-semibold text-amber-500">Error</h2>
        <p className="text-sm text-zinc-400">{errorMessage}</p>
        <button
          onClick={reset}
          className="w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-medium hover:bg-amber-700"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
