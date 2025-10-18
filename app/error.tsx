"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  const isSupabaseError = error.message.includes("Supabase") || error.message.includes("supabaseUrl")

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-2 text-amber-500">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Configuration Error</h2>
        </div>

        {isSupabaseError ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">
              The Supabase database connection is not configured correctly. Please follow these steps:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-300">
              <li>Open the sidebar on the left side of the screen</li>
              <li>Click on the "Connect" section</li>
              <li>Verify that the Supabase integration is connected</li>
              <li>
                Go to the "Vars" section and ensure these variables are set:
                <ul className="mt-1 list-disc pl-5 text-xs text-zinc-400">
                  <li>NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                </ul>
              </li>
            </ol>
          </div>
        ) : (
          <p className="text-sm text-zinc-400">{error.message}</p>
        )}

        <Button onClick={reset} className="w-full bg-amber-600 hover:bg-amber-700">
          Try Again
        </Button>
      </div>
    </div>
  )
}
