# Revisión de UX Copy — RustBaseLab
**Fecha:** 31 de marzo de 2026
**Tono objetivo:** Moderno y dinámico — energético, innovador, con personalidad gamer
**Audiencia:** Jugadores de Rust (español e inglés)

---

## Resumen ejecutivo

El copy de RustBaseLab tiene una buena base: el hero es directo, la voz gamer está presente en mayúsculas y en algunos títulos, y la página About comunica bien la misión. Sin embargo, hay **cinco problemas críticos** que afectan la experiencia:

1. **Inconsistencia de idioma** — el sitio mezcla español e inglés de forma impredecible
2. **Errores técnicos expuestos a usuarios** — mensajes internos visibles en producción
3. **Estados vacíos planos** — no orientan ni enganchan al usuario
4. **Cookie consent engañoso** — el botón X rechaza cookies pero dice "Cerrar"
5. **Oportunidades de tono** — copy genérico donde podría ser más específico y gamer

---

## 1. Inconsistencia de idioma 🔴 CRÍTICO

### El problema

El sistema i18n está bien construido pero **no se usa de forma consistente**. Muchos textos están hardcodeados en inglés incluso cuando existe la traducción al español.

| Elemento | Estado actual | Problema |
|----------|--------------|---------|
| Hero (home) | Inglés hardcodeado | Ignora el sistema i18n |
| Página Feedback | Inglés hardcodeado | Mezcla con UI en español |
| Página Error (`error.tsx`) | Botón en español, resto en inglés | Inconsistente |
| Footer — `t.footer.terms` | `"Terms"` (no traducido) | Falta traducción ES |
| Footer — `t.footer.contact` | `"Contact"` (no traducido) | Falta traducción ES |
| Nav — "Favorites" | Hardcodeado en inglés en header y mobile nav | No tiene clave i18n |
| Sección "SHOWING X BASES" | Inglés hardcodeado | Ignora `t.basesPage.showing` |
| `base/[slug]` — "Published today", "Published X days ago" | Inglés hardcodeado | Hay función `getRelativeTime` duplicada que ignora i18n |

### Correcciones en el archivo `translations.ts`

**Añadir en `es`:**
```ts
footer: {
  terms: "Términos",      // Era "Terms"
  contact: "Contacto",   // Era "Contact"
},
nav: {
  favorites: "Favoritos", // No existía
}
```

**Añadir en `en`:**
```ts
nav: {
  favorites: "Favorites",
}
```

---

## 2. Errores técnicos expuestos a usuarios 🔴 CRÍTICO

### El problema — `app/page.tsx` (home)

```tsx
// ACTUAL — expone detalles técnicos internos:
<h2>Connection Error</h2>
<p>Could not connect to the database. Please verify that environment variables
are correctly configured in Vercel.</p>
```

Un usuario regular no sabe qué son "environment variables" ni "Vercel". Esto rompe la confianza y parece un sitio roto.

### Recomendación

```tsx
// PROPUESTO:
<h2>Estamos teniendo problemas</h2>
<p>No pudimos cargar las bases en este momento. Inténtalo de nuevo en unos minutos.</p>
```

---

### El problema — `app/bases/solo/page.tsx`

```tsx
// ACTUAL — error técnico expuesto:
return <div>Solo team size not found</div>
```

### Recomendación

```tsx
// PROPUESTO:
return <div className="container mx-auto px-4 py-16 text-center">
  <p className="text-lg text-muted-foreground">No encontramos bases Solo disponibles. Intenta más tarde.</p>
</div>
```

---

## 3. Copy del Hero — oportunidad de mejora 🟡

### Estado actual (inglés)

```
Badge:    BEST RUST BASE DESIGNS
H1:       BUILD BETTER, SURVIVE LONGER
Subtitle: Discover professional Rust base designs with detailed video tutorials.
          From beginner bases to massive fortresses.
CTA:      VIEW ALL BASES
```

El H1 es bueno — corto, imperativo, con ritmo. El subtitle es funcional pero genérico.

### Propuestas para el subtitle

| Opción | Copy | Tono |
|--------|------|------|
| A (actual) | "Discover professional Rust base designs with detailed video tutorials. From beginner bases to massive fortresses." | Neutro/informativo |
| B (recomendado) | "Stop getting raided. Find battle-tested base designs with step-by-step video tutorials — for every team size." | Dinámico, habla del dolor |
| C | "Your base is your lifeline. Browse curated designs built to survive — solo to zerg, starter to fortress." | Emocional, narrativo |

**Recomendación:** Opción B. Apela directamente al dolor del jugador ("getting raided") y comunica el valor (video tutorials + team sizes) de forma más enganchante.

### Propuestas para el badge

| Opción | Copy |
|--------|------|
| Actual | BEST RUST BASE DESIGNS |
| A (recomendado) | UPDATED FOR 2026 |
| B | META-APPROVED BUILDS |
| C | 🔥 TOP BASES THIS WIPE |

**Recomendación:** "META-APPROVED BUILDS" — más específico al vocabulario gamer y diferencia el contenido de una simple lista.

---

## 4. Estados vacíos — muy planos 🟡

### Estado actual

```
"NO META BASES AVAILABLE"
"NO POPULAR BASES AVAILABLE"
"NO BASES FOUND WITH THESE FILTERS"
"NO SOLO BASES FOUND"
```

Estos mensajes comunican el problema pero no orientan al usuario ni mantienen el tono energético del sitio.

### Estructura recomendada: Problema + Solución accionable

| Estado vacío | Copy actual | Copy propuesto |
|-------------|-------------|----------------|
| No hay meta bases | NO META BASES AVAILABLE | **NO META BASES YET** — Check back after the next update |
| No hay bases populares | NO POPULAR BASES AVAILABLE | **THE COMMUNITY HASN'T VOTED YET** — Be the first to explore |
| Filtros sin resultados | NO BASES FOUND WITH THESE FILTERS | **NO BUILDS MATCH** — Try removing a filter or [View All Bases →] |
| Sin bases para tamaño | NO SOLO BASES FOUND | **BUILDING THE SOLO COLLECTION** — Check back soon |

---

## 5. Cookie consent — botón X engañoso 🟡

### El problema — `components/cookie-consent.tsx`

```tsx
// El botón X llama a rejectCookies() pero el aria-label dice "Cerrar"
<button onClick={rejectCookies} aria-label="Cerrar">
  <X className="h-5 w-5" />
</button>
```

El usuario que hace clic en X cree que está cerrando el banner, cuando en realidad está rechazando las cookies. Esto puede tener implicaciones de compliance (GDPR/LOPD).

### Opciones

**Opción A — Hacer el X neutro (solo cierra, no acepta ni rechaza):**
```tsx
aria-label="Posponer decisión"
// onClick => simplemente oculta el banner sin guardar preferencia
```

**Opción B — Cambiar el aria-label para ser honesto:**
```tsx
aria-label="Rechazar cookies y cerrar"
```

**Recomendación:** Opción B es más fácil de implementar y más honesta. Opción A es mejor para conversión.

### Mejora adicional — botones asimétricos

```
Actual:   [Aceptar cookies]  [Rechazar]
Problema: "Rechazar" no dice qué se rechaza

Propuesto: [Aceptar todo]  [Solo esenciales]
Razón: Más claro, menos intimidante, mejor práctica de consent
```

---

## 6. Footer — tagline críptico 🟢

### Estado actual

```
"Built for the Rust community • Powered by RustBaseLab DS"
```

"RustBaseLab DS" es opaco — ¿Design System? ¿Data Storage? Los usuarios no entienden qué significa.

### Opciones

| Opción | Copy |
|--------|------|
| A | Built for the Rust community — by players, for players |
| B (recomendado) | Crafted for the Rust community. No affiliation with Facepunch Studios. |
| C | Built for survivors. © RustBaseLab |

**Recomendación:** Opción B — añade el disclaimer de Facepunch que ya existe en los Terms pero no está visible en el footer, lo cual es buena práctica legal.

---

## 7. Página de contacto — oportunidades 🟢

### Estado actual

La página Contact tiene buena estructura, pero la sección FAQ tiene respuestas defensivas.

```
Pregunta: ¿Puedo enviar mis propios diseños de bases?
Respuesta actual: "Actualmente no aceptamos envíos de usuarios, pero estamos
trabajando en esta funcionalidad. Mantente atento a futuras actualizaciones."
```

### Recomendación — convertir la limitación en hype

```
Propuesto: "¡Pronto! Estamos construyendo la función de envío de bases.
¿Tienes un diseño que quieras ver en RustBaseLab? Escríbenos y lo tendremos
en cuenta para el lanzamiento."
```

---

## 8. Página About — pequeños ajustes de tono 🟢

El copy de About es sólido y bien estructurado. Un ajuste de tono para hacerlo más dinámico:

### Estado actual
```
"Sabemos lo frustrante que es perder todo tu progreso por una base mal diseñada."
```

### Propuesto — más gamer, más directo
```
"Todos hemos perdido un wipe por una base que no aguantó el primer offline raid.
RustBaseLab existe para que eso no vuelva a pasar."
```

---

## 9. Botón "Request Information" — demasiado vago 🟢

### Estado actual — `components/request-info-button.tsx`

```tsx
// Label:
"Request Information"

// Toast de confirmación:
"Request sent! We'll update the information soon."
```

El label no dice qué información se solicita. El toast es genérico.

### Propuestas

| Contexto | Copy actual | Copy propuesto |
|---------|-------------|----------------|
| Build cost | Request Information | Request Build Cost |
| Upkeep cost | Request Information | Request Upkeep Data |
| Toast éxito | "Request sent! We'll update the information soon." | "Got it! We'll add the build cost shortly." |

---

## 10. Página 404 — ¡bien hecha! ✅

La página 404 está lograda. El diseño con el 404 en background y "ERROR" animado encima es efectivo para el tono gamer. El copy es claro y las dos CTAs son útiles.

```
"The page you're looking for doesn't exist or has been moved.
The link might be broken or the base may have been deleted."
```

Única sugerencia menor: cambiar "Go Home" → **"Back to Base"** para mantener el vocabulario del juego.

---

## Resumen de prioridades

| # | Problema | Impacto | Esfuerzo |
|---|---------|---------|---------|
| 1 | Inconsistencia de idioma | 🔴 Alto | Medio |
| 2 | Errores técnicos expuestos | 🔴 Alto | Bajo |
| 3 | Cookie consent engañoso | 🟡 Medio | Bajo |
| 4 | Hero subtitle genérico | 🟡 Medio | Bajo |
| 5 | Estados vacíos planos | 🟡 Medio | Bajo |
| 6 | Footer tagline críptico | 🟢 Bajo | Bajo |
| 7 | FAQ defensivo | 🟢 Bajo | Bajo |
| 8 | Botón request vago | 🟢 Bajo | Bajo |
| 9 | Tono About page | 🟢 Bajo | Bajo |
| 10 | 404 "Go Home" → "Back to Base" | 🟢 Cosmético | Bajo |

---

*Revisión generada el 31-03-2026 • Tono objetivo: Moderno y dinámico*
