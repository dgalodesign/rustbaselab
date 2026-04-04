"use client"

import { AlertCircle, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupabaseConfigWarning({ errorMessage }: { errorMessage?: string }) {
  const hasEncryptedValue =
    errorMessage?.includes("ENCRYPTED") || errorMessage?.includes("==") || errorMessage?.includes("+")

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-2xl space-y-6 rounded-lg border border-amber-500/20 bg-zinc-900 p-8">
        <div className="flex items-center gap-3 text-amber-500">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Problema con la Integración de Supabase</h2>
        </div>

        {hasEncryptedValue && (
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
            <p className="text-sm font-semibold text-red-400">⚠️ Variables encriptadas detectadas</p>
            <p className="mt-1 text-sm text-zinc-300">
              Las variables de entorno de Supabase contienen valores encriptados. Esto indica que la integración no está
              configurada correctamente en v0.
            </p>
          </div>
        )}

        <div className="space-y-4 text-zinc-300">
          <div className="space-y-3 rounded-lg bg-zinc-950 p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-amber-500">Solución: Reconectar la integración</h3>
            </div>
            <ol className="list-decimal space-y-3 pl-5 text-sm">
              <li>
                <span className="font-semibold">Abre el panel lateral izquierdo</span> en v0 (haz clic en el ícono del
                menú)
              </li>
              <li>
                <span className="font-semibold">Ve a la sección "Connect"</span>
              </li>
              <li>
                <span className="font-semibold">Si ves Supabase conectado, desconéctalo</span> (haz clic en el botón de
                desconectar)
              </li>
              <li>
                <span className="font-semibold">Vuelve a conectar Supabase</span> siguiendo el flujo de integración
              </li>
              <li>
                <span className="font-semibold">v0 configurará automáticamente</span> las variables de entorno correctas
              </li>
            </ol>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
            <p className="text-sm font-semibold text-amber-400">💡 Importante:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• NO agregues las variables manualmente en la sección "Vars"</li>
              <li>• La integración de Supabase debe manejar esto automáticamente</li>
              <li>• Si el problema persiste, contacta al soporte de Vercel</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-lg bg-zinc-950 p-4">
            <h3 className="font-semibold text-amber-500">¿No tienes un proyecto de Supabase?</h3>
            <p className="text-sm">
              Si aún no tienes un proyecto de Supabase, créalo primero en{" "}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-500 hover:underline"
              >
                supabase.com/dashboard
                <ExternalLink className="h-3 w-3" />
              </a>
              , luego conéctalo en v0.
            </p>
          </div>
        </div>

        {errorMessage && (
          <details className="rounded-lg bg-zinc-950 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-zinc-400">Ver error técnico</summary>
            <pre className="mt-2 overflow-x-auto text-xs text-red-400">{errorMessage}</pre>
          </details>
        )}

        <Button onClick={() => window.location.reload()} className="w-full bg-amber-600 hover:bg-amber-700">
          Recargar después de reconectar
        </Button>
      </div>
    </main>
  )
}
