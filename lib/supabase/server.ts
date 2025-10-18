import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "SUPABASE_NOT_CONFIGURED: Las variables de entorno de Supabase no están configuradas. " +
        "Por favor, conecta la integración de Supabase en la sección 'Connect' del panel lateral de v0.",
    )
  }

  // Detectar si la URL está encriptada (contiene caracteres de base64)
  const isEncrypted = /[+/=]/.test(supabaseUrl) && !supabaseUrl.startsWith("http")

  if (isEncrypted) {
    throw new Error(
      "SUPABASE_ENCRYPTED_VALUES: Las variables de Supabase contienen valores encriptados. " +
        "Esto indica que la integración no está configurada correctamente. " +
        "Por favor, ve a 'Connect' en el panel lateral, desconecta Supabase y vuelve a conectarlo. " +
        "v0 debería configurar automáticamente las variables correctas.",
    )
  }

  // Validar formato de URL
  try {
    new URL(supabaseUrl)
  } catch (e) {
    throw new Error(
      `INVALID_SUPABASE_URL: La URL de Supabase no es válida: "${supabaseUrl}". ` +
        "Asegúrate de que sea una URL completa como https://xxxxx.supabase.co",
    )
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
