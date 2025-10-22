# Guía de Solución de Problemas en Vercel

## Error 404 en Producción

Si ves un error 404 después de desplegar en Vercel, sigue estos pasos:

### 1. Verificar Variables de Entorno

Las variables de entorno deben estar configuradas en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Verifica que estas variables existan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Verificar Valores de Variables

Asegúrate de que los valores sean correctos:

- `NEXT_PUBLIC_SUPABASE_URL` debe ser algo como: `https://xxxxx.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` debe ser una clave larga (JWT token)

**IMPORTANTE:** No uses las variables encriptadas de Vercel (las que empiezan con `encrypted:`). Usa los valores reales de Supabase.

### 3. Redeploy Después de Agregar Variables

Las variables de entorno solo se aplican en nuevos builds:

1. Ve a **Deployments** en tu proyecto de Vercel
2. Click en los **3 puntos** del último deployment
3. Selecciona **Redeploy**
4. Espera a que el build termine

### 4. Verificar Build Logs

Si el error persiste:

1. Ve a **Deployments**
2. Click en el deployment más reciente
3. Ve a la pestaña **Build Logs**
4. Busca errores relacionados con Supabase o variables de entorno

### 5. Verificar Runtime Logs

Para ver errores en tiempo de ejecución:

1. Ve a **Deployments**
2. Click en el deployment activo
3. Ve a la pestaña **Functions**
4. Busca logs con `[v0]` para ver mensajes de debug

### 6. Obtener Credenciales de Supabase

Si no tienes las credenciales:

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 7. Verificar que la Vista Existe

Asegúrate de que la vista `published_bases` existe en Supabase:

1. Ve a Supabase Dashboard
2. SQL Editor
3. Ejecuta: `SELECT * FROM published_bases LIMIT 1;`
4. Si da error, ejecuta el script `003-update-published-bases-view.sql`

## Errores Comunes

### "Missing Supabase environment variables"
- **Causa:** Variables no configuradas en Vercel
- **Solución:** Sigue los pasos 1-3 arriba

### "column bases.youtube_clicks does not exist"
- **Causa:** Script SQL no ejecutado
- **Solución:** Ejecuta los scripts en `scripts/` en Supabase SQL Editor

### "Dynamic server usage: Route couldn't be rendered statically"
- **Causa:** Ya resuelto con `dynamic = 'force-dynamic'`
- **Solución:** Ya está implementado en el código

## Contacto

Si después de seguir todos estos pasos el error persiste, verifica:
1. Que el proyecto de Vercel esté conectado al repositorio correcto
2. Que el branch correcto esté desplegado
3. Que no haya errores de TypeScript en el build
