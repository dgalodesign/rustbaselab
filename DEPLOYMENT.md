# Guía de Deployment en Vercel

## Variables de Entorno Requeridas

Para que el sitio web funcione correctamente en producción, debes configurar las siguientes variables de entorno en tu proyecto de Vercel:

### Variables de Supabase (REQUERIDAS)

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
\`\`\`

## Cómo Configurar Variables de Entorno en Vercel

### Opción 1: Desde el Dashboard de Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **Settings** (Configuración)
3. Ve a la sección **Environment Variables**
4. Agrega cada variable:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Tu URL de Supabase (ejemplo: `https://kpyjrccmvaquwpvileot.supabase.co`)
   - **Environment**: Selecciona Production, Preview, y Development
   - Haz clic en **Save**
5. Repite para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. **Redeploy** tu proyecto para aplicar los cambios

### Opción 2: Desde la CLI de Vercel

\`\`\`bash
# Instalar Vercel CLI si no la tienes
npm i -g vercel

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Redeploy
vercel --prod
\`\`\`

## Dónde Encontrar tus Credenciales de Supabase

1. Ve a tu [Dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Verificar el Deployment

Después de configurar las variables de entorno y redeploy:

1. Visita tu sitio en producción
2. Abre las DevTools del navegador (F12)
3. Ve a la pestaña **Console**
4. Si ves errores relacionados con Supabase, verifica que las variables estén correctamente configuradas
5. Si todo está bien, deberías ver las bases cargándose correctamente

## Troubleshooting

### Error 404 en todas las páginas

**Causa**: Variables de entorno no configuradas o incorrectas

**Solución**:
1. Verifica que las variables estén configuradas en Vercel
2. Asegúrate de que los valores sean correctos (sin espacios extra)
3. Redeploy el proyecto después de agregar las variables

### Error "Missing Supabase environment variables"

**Causa**: Las variables no están disponibles en el entorno de build

**Solución**:
1. Asegúrate de que las variables tengan el prefijo `NEXT_PUBLIC_`
2. Verifica que estén configuradas para el entorno correcto (Production)
3. Redeploy el proyecto

### Las páginas cargan pero no muestran datos

**Causa**: Las credenciales de Supabase son incorrectas o el proyecto no tiene acceso

**Solución**:
1. Verifica que la URL de Supabase sea correcta
2. Verifica que la anon key sea la correcta
3. Asegúrate de que las políticas RLS (Row Level Security) permitan acceso público de lectura

## Optimizaciones de Producción

El sitio está configurado con:

- ✅ **ISR (Incremental Static Regeneration)**: Las páginas se regeneran cada hora
- ✅ **Sitemap dinámico**: Generado automáticamente en `/sitemap.xml`
- ✅ **Robots.txt**: Configurado para SEO óptimo
- ✅ **Manifest PWA**: Soporte básico para Progressive Web App
- ✅ **Favicon dinámico**: Generado automáticamente

## Monitoreo Post-Deployment

Después del deployment, monitorea:

1. **Vercel Analytics**: Para métricas de tráfico y performance
2. **Vercel Logs**: Para errores en runtime
3. **Lighthouse Score**: Para verificar performance, SEO, y accesibilidad
4. **Core Web Vitals**: LCP, FID, CLS

## Comandos Útiles

\`\`\`bash
# Ver logs en tiempo real
vercel logs --follow

# Ver variables de entorno configuradas
vercel env ls

# Redeploy forzado
vercel --prod --force
\`\`\`

## Checklist de Deployment

- [ ] Variables de entorno configuradas en Vercel
- [ ] Scripts SQL ejecutados en Supabase
- [ ] Vista `published_bases` creada y actualizada
- [ ] Políticas RLS configuradas para acceso público de lectura
- [ ] Build exitoso sin errores
- [ ] Sitio accesible en producción
- [ ] Datos cargándose correctamente
- [ ] Favicon visible
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`
