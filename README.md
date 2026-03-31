# RustBaseLab

Catálogo de diseños de bases para el videojuego Rust. Sitio web moderno con diseño gamer oscuro y colores neón.

## Características

- 🎮 Diseño gamer con efectos neón (cyan, magenta, púrpura)
- 🌐 Internacionalización (Español/Inglés)
- ���� Búsqueda y filtros avanzados
- 📱 Responsive design (mobile-first)
- ⚡ Performance optimizado con Next.js 15
- 🗄️ Integración con Supabase
- 📊 SEO optimizado con sitemap dinámico

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Base de Datos**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **UI Components**: shadcn/ui

## Estructura del Proyecto

\`\`\`
rustbaselab/
├── app/                    # Páginas y rutas
│   ├── page.tsx           # Homepage
│   ��── bases/             # Catálogo de bases
│   ├── base/[id]/         # Detalle de base
│   ├── search/            # Búsqueda
│   ├── not-found.tsx      # Página 404
│   ├── sitemap.ts         # Sitemap dinámico
│   ├── robots.ts          # Robots.txt
│   └── manifest.ts        # PWA manifest
├── components/            # Componentes reutilizables
│   ├── header.tsx
│   ├── footer.tsx
│   ├── base-card.tsx
│   └── ui/               # Componentes shadcn/ui
├── lib/                   # Utilidades y lógica
│   ├── db-queries.ts     # Queries de base de datos
│   ├── supabase/         # Clientes de Supabase
│   ├── i18n/             # Internacionalización
│   └── types.ts          # Tipos TypeScript
└── scripts/              # Scripts SQL
\`\`\`

## Instalación Local

1. Clona el repositorio
2. Instala dependencias:
   \`\`\`bash
   npm install
   \`\`\`
3. Configura variables de entorno (crea `.env.local`):
   \`\`\`bash
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   \`\`\`
4. Ejecuta el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Abre [http://localhost:3000](http://localhost:3000)

## Deployment en Vercel

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

**Resumen rápido:**
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Deploy automático en cada push

## Base de Datos

El proyecto usa Supabase con las siguientes tablas principales:

- `bases` - Información de las bases
- `published_bases` - Vista de bases publicadas
- `types` - Tipos de bases (Solo, Duo, Clan, etc.)
- `footprints` - Tamaños de bases (2x2, 3x3, etc.)
- `team_sizes` - Tamaños de equipo recomendados
- `creators` - Creadores de contenido

Ver scripts SQL en `/scripts` para la estructura completa.

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa [DEPLOYMENT.md](./DEPLOYMENT.md) para problemas de deployment
2. Abre un issue en GitHub
3. Contacta al equipo de desarrollo

## Roadmap

- [ ] Sistema de favoritos
- [ ] Comentarios y valoraciones
- [ ] Dashboard de administración
- [ ] Filtros avanzados adicionales
- [ ] Modo claro (light mode)
- [ ] Compartir en redes sociales
