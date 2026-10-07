# CLAUDE.md — Plan Maestro de nomudev.com

> Documento rector del rediseño de **nomudev.com**, la marca personal y el portafolio de **Noel Muñoz**, Ingeniero de Software.
> Toda decisión de diseño, copy o código debe poder justificarse con este documento. Si algo no encaja, primero se actualiza este archivo y después se implementa.

---

## 0. Contexto operativo (leer siempre)

### Estado actual del repo
- **Stack:** Astro 5 (salida estática) + Tailwind CSS v4 (plugin de Vite, sin `tailwind.config.js`) + islas React 19. Las fuentes son Inter y JetBrains Mono en versión variable (`@fontsource-variable/*`).
- **Despliegue:** cada push a `master` se publica en GitHub Pages ([.github/workflows/astro.yml](.github/workflows/astro.yml), Node 20). El dominio está en [public/CNAME](public/CNAME) y existe [public/.nojekyll](public/.nojekyll). **No borres ninguno de los dos.**
- **Arquitectura:** capas `src/domain` (tipos) → `src/application` (datos/servicios) → `src/infrastructure/ui` (atoms / molecules / organisms) → `src/pages`. Respeta esta separación.
- **Tokens (Nomu DS v2):** [src/styles/theme.css](src/styles/theme.css) organiza los tokens en tres capas: primitivos (`--zinc-*`, `--blue-400`… en `:root`, **prohibidos en componentes**), semánticos (`@theme inline`) y de componente. Clases semánticas: fondos `bg-canvas` / `bg-surface` / `bg-raised` / `bg-overlay`; texto `text-fg` / `text-fg-body` / `text-fg-muted` / `text-fg-subtle`; bordes `border-line` / `border-line-strong`; acción `primary` / `primary-hover` / `success` / `danger`; categorías `cat-landing` / `cat-webapp` / `cat-erp` / `cat-native`. Tipografía: `text-display`, `text-h2`, `text-title`, `text-h3`, `text-lead`, `text-ui`, `text-eyebrow`, `text-metric`. Movimiento: `--duration-fast|base|slow` y `--ease-out-soft|in-out`. Utilidades: `.container-page`, `.section-y`, `.bg-dots`, `.text-gradient` y `.bento-cell`, y la animación de entrada `[data-reveal]` (solo con la clase `.js` en `<html>`).
- **Idiomas (i18n):** español principal sin prefijo (`/`) e inglés en `/en/` (`i18n` en [astro.config.mjs](astro.config.mjs), `trailingSlash: 'always'`: **todas las rutas internas terminan en `/`**). Todo el copy vive en [src/i18n/es.ts](src/i18n/es.ts) (define el tipo `Dict`) y [src/i18n/en.ts](src/i18n/en.ts) (debe replicar su forma); el contenido largo de las páginas de servicio, en `src/i18n/services.{es,en}.ts`. Los componentes obtienen el idioma con `getLang(Astro.currentLocale)` y el texto con `useTranslations(lang)`. **Nunca se escribe copy directamente en un componente.** `ProjectService` y `ProfileService` solo guardan datos estructurales (ids, colores, cifras, URLs).
- **Páginas:** las homes [src/pages/index.astro](src/pages/index.astro) y `src/pages/en/index.astro` renderizan [HomePage.astro](src/infrastructure/ui/templates/HomePage.astro). Las páginas de servicio `src/pages/[service].astro` y `src/pages/en/[service].astro` renderizan [ServicePage.astro](src/infrastructure/ui/templates/ServicePage.astro) con slugs por idioma (es: `/desarrollo-web-valencia/`, `/desarrollo-aplicaciones-web-valencia/`, `/aplicaciones-escritorio-a-medida/`, `/erp-a-medida-valencia/`; en: `/en/web-development-valencia/`, `/en/web-app-development/`, `/en/desktop-app-development/`, `/en/custom-erp-development/`). Cambiar un slug rompe URLs indexadas: si hay que hacerlo, se añade una redirección.
- **SEO / AEO:** [Layout.astro](src/layouts/Layout.astro) exige `title`, `description` y `alternates` (ruta en cada idioma) y genera canónica, hreflang (es-ES, en, x-default→es), Open Graph/Twitter, geo-meta de Valencia y el JSON-LD. Los datos estructurados salen de [SeoService.ts](src/application/SeoService.ts) en un único `@graph`: la home lleva WebSite + ProfessionalService (zona de servicio Valencia / Comunitat Valenciana / España, sin dirección postal) + Person + FAQPage; los servicios, ProfessionalService + Service + FAQPage + BreadcrumbList. Las FAQ (sección `#faq` y las de cada servicio) se escriben con la respuesta directa en la primera frase, porque son lo que citan los asistentes de IA. También forman parte: `@astrojs/sitemap` (excluye `/privacy/`), [public/robots.txt](public/robots.txt) (crawlers de IA permitidos), [public/llms.txt](public/llms.txt) (resumen para LLMs: **actualizarlo si cambian los servicios o los slugs**), las imágenes OG por idioma y los favicons, que se regeneran con `npm run brand` ([scripts/generate-brand-assets.mjs](scripts/generate-brand-assets.mjs)).
- **Pendiente SEO:** `privacy.astro` sigue en inglés, con `noindex`, y con texto inexacto (habla de cookies y analítica que no existen); hay que reescribirla en los dos idiomas. Las páginas de servicio de Landings y Desktop todavía no tienen casos reales.
- **Elementos gráficos:** el Hero muestra [ProductBento.astro](src/infrastructure/ui/molecules/ProductBento.astro), cuatro mini-interfaces decorativas (Landing, Web App, Desktop, ERP) en su color de categoría, con flotación (`.float-y`) y perspectiva en `lg`. Cada servicio lleva su SVG en [ServiceIllustration.astro](src/infrastructure/ui/molecules/ServiceIllustration.astro). Grid estructural: guías verticales (`.grid-guides`, en `index.astro`) y [SectionDivider.astro](src/infrastructure/ui/molecules/SectionDivider.astro) con cruces entre secciones. Haces de luz (`.beam`) en los pasos del cierre y en la trayectoria; onda de audio (`.wave-bar`) en la caja Off-stage. Todo respeta reduced-motion vía la regla global de `theme.css`.
- **Logo:** el diseño es el de `public/images/3d/nomudevLogoVector.svg` (812 KB, trazado automático: archivo maestro, **no se referencia**). La web usa [src/assets/brand/nomudev-mark.png](src/assets/brand/nomudev-mark.png) (recortado, 256 px) a través de `<Image>`, que genera WebP de pocos KB.
- **Gobernanza:** `npm run check` ejecuta `lint:tokens` (falla con hex, rgb/hsl, paleta de Tailwind o valores arbitrarios de color/tamaño fuera de `theme.css`; para una excepción justificada se añade `tokens-ignore` en la línea) y `check:contrast` (todos los pares texto/fondo deben cumplir AA). CI lo ejecuta antes del build. La lista `LEGACY_FILES` de [scripts/check-tokens.mjs](scripts/check-tokens.mjs) solo puede encogerse.
- **Layout:** [src/layouts/Layout.astro](src/layouts/Layout.astro) incluye la Navbar, el Footer, el skip-link, la textura de grano y el IntersectionObserver de las entradas. Las páginas solo aportan su `<main>`.
- **Home (implementada según el doc "nomudev.com — Copy y estructura de conversión", https://claude.ai/code/artifact/27031399-c533-4041-8d36-71780347b137):** Hero → Services (`#services`, [Services.astro](src/infrastructure/ui/organisms/Services.astro)) → Work (`#work`, una subsección por categoría: `#work-landing`, `#work-webapp`, `#work-desktop`, `#work-erp`) → About bento de 9 cajas (`#about`, [About.astro](src/infrastructure/ui/organisms/About.astro)) → cierre (`#contact`, [ContactCTA.astro](src/infrastructure/ui/organisms/ContactCTA.astro)). El copy de cada servicio/categoría (pain, headline, body, tags) vive en `ProjectService.getCategories()`. Los datos del perfil y los compromisos comerciales (plazas, trimestre, tiempo de respuesta, Dante) viven en [ProfileService.ts](src/application/ProfileService.ts); los marcados `[[PENDIENTE]]` los tiene que validar Noel. Las cards de proyecto son estáticas: el modal de vídeo de ejemplo ya no se usa (TVModal, ContactButton y CyberRain quedan sin usar hasta la iteración 4 del plan del design system).
- **Contacto:** la URL de LinkedIn vive en [src/application/ProfileService.ts](src/application/ProfileService.ts) (`LINKEDIN_URL`).

### Comandos
```sh
npm install        # CI usa npm ci
npm run dev        # localhost:4321
npm run build      # build estático a ./dist — es la validación obligatoria antes de cada commit
npm run preview
```
No hay tests ni linter. Un cambio se da por válido cuando `npm run build` termina sin errores y la página se revisa visualmente en móvil (375px) y en escritorio (1440px).

### Deuda conocida
- `privacy.astro` usa `prose` sin tener `@tailwindcss/typography`, y su "Last Updated" muestra la fecha del build (se resuelve en T18). Además publica `contact@nomudev.com`: el RGPD exige un medio de contacto para ejercer los derechos de privacidad, así que ese email debe seguir ahí aunque la web no muestre contacto directo.
- El `<title>` y la description de `Layout.astro` siguen diciendo "Senior" (se cambian con el copy, en T4/T9).
- `TVModal` se abre en todas las cards con el mismo vídeo de ejemplo (`wp43OdtAAkM`) hasta que existan los casos de estudio (T8).
- Las capturas con Chrome sin interfaz tienen un ancho mínimo de 500px. Para revisar móvil, carga la página dentro de un `<iframe>` de 375px.

### Reglas de trabajo para Claude
1. Implementa **una tarea de la Fase 4 por iteración** y no avances sin validación del usuario.
2. No inventes métricas, clientes ni años de experiencia. Los datos que faltan se marcan como `[[PENDIENTE: …]]` y se le preguntan a Noel.
3. Todo color, radio, sombra o tamaño sale de los tokens de la Fase 1. Nada de valores hex sueltos en los componentes.
4. JavaScript en cliente solo donde aporte valor real (filtros, microinteracciones). Por defecto, HTML estático.
5. El copy del sitio se escribe en **inglés** (mercado internacional, coherente con el sitio actual). La documentación interna va en español.

---

## FASE 1 — Brandbook y Posicionamiento

### 1.0 Perfil profesional (fuente de verdad: CV de Noel, octubre 2026)

Todo dato biográfico del sitio sale de esta tabla. Si no aparece aquí, no se publica.

| Campo | Dato |
|---|---|
| Nombre | Noel Muñoz |
| Ubicación | Valencia, España (trabajo remoto/internacional) |
| Titular del CV | Fullstack Developer |
| Resumen | Fullstack con visión de producto end-to-end. Une interfaces de alto rendimiento (Next.js, Tailwind CSS) con backends robustos (Java Spring Boot, Python). Aplica DDD y Clean Architecture para escalar aplicaciones complejas y modernizar sistemas legacy. Despliegue en Google Cloud y pipelines CI/CD. |
| Idiomas | Español y valenciano (nativos), inglés B2 |
| Formación | CFGS en Desarrollo de Aplicaciones Multiplataforma (DAM), I.E.S. Abastos · Bachillerato Humanístico-Social, C.E.E.D. La Misericordia |
| Stack del CV | React, Next.js, Spring Boot, Python, MongoDB, Git, Docker (+ GCP, Vertex AI, CI/CD) |
| Software creativo | Photoshop, Premiere, Ableton Live |
| Enlaces | nomudev.com · LinkedIn `https://es.linkedin.com/in/nomudev` · **Canal de contacto único: LinkedIn.** No se publican ni email, ni teléfono, ni enlaces de agenda (decisión de Noel). |
| Foto | `src/assets/images/noel-munoz.jpg` (627×627). Pendiente: una versión de mayor resolución o con el fondo neutro/oscuro coherente con la marca |

**Experiencia**

| Periodo | Rol | Empresa / proyecto | Logros |
|---|---|---|---|
| 2025 | **CTO · Backend Engineer** | Proyecto UNNE | Dirigió perfiles técnicos y de producto con Scrum (Jira, Slack). Definió la arquitectura técnica integral, programó el core backend y desplegó la infraestructura en Google Cloud. |
| Ene 2025 – Dic 2025 | **Fullstack Developer · Cloud & DevOps Specialist** | Huming Music S.L. | Migró un ERP monolítico en JS a Next.js. Construyó con Spring Boot la orquestación de datos musicales masivos (Spotify, Soundcharts), conectada a Vertex AI para automatizar insights y consultoría estratégica. |
| Ene 2024 – Ene 2025 | **Backend Developer** | Infinity Apps | Diseñó y desarrolló el frontend de una app de gestión de catálogo musical. Integró varias APIs (Spotify) y colas asíncronas para la importación y el registro de singles y álbumes. |
| Abr 2021 – Dic 2023 | Otras experiencias | — | Hostelería, imagen y sonido. |

**Lado humano** (para About, con moderación): técnico de sonido (FOH) e iluminación en proyectos solidarios de la Comunidad Valenciana; miembro de la junta directiva de la asociación Ribarock; músico en la banda Vanity Flair; fotografía, diseño gráfico y producción musical. Soft skills: comunicación, negociación, resolución de conflictos, aprendizaje rápido.

**Implicaciones para la marca**
1. **Nicho diferencial: industria musical.** Los tres empleos de desarrollo pertenecen al sector musical (catálogos, distribución, datos de Spotify y Soundcharts, IA aplicada). Es un nicho creíble y raro: "the engineer who speaks both code and music business". Se usa como prueba de dominio sin cerrarse a otros sectores.
2. **Liderazgo técnico real.** El rol de CTO en UNNE respalda el discurso de "arquitectura + dirección de equipo", más allá de programar.
3. **Seniority honesta.** Son unos 2 años de desarrollo profesional, más el rol de CTO. **No se usa la etiqueta "Senior"** (el `<title>` actual dice "Senior Backend & Cloud Architect" y hay que cambiarlo). La autoridad se transmite con resultados concretos, alcance (ERP, IA, cloud, equipo) y calidad visible, no con años. Titular recomendado: **"Fullstack Engineer & Software Architect"**.
4. **DAM respalda la categoría Native Apps.** La formación multiplataforma da credibilidad a las apps nativas, aunque haga falta un proyecto que lo demuestre.
5. **Perfil creativo.** Diseño, fotografía y producción musical justifican el argumento del "craft visual": un ingeniero con ojo de diseñador.

### 1.1 Definición de la marca

**Nomudev** = *Noel Muñoz · Developer*. Es la marca de un ingeniero que diseña y construye software de punta a punta: desde la landing que convierte hasta el ERP que sostiene la operación de una empresa.

| | |
|---|---|
| **Misión** | Convertir problemas de negocio complejos en software fiable, rápido y mantenible, con la misma exigencia en la arquitectura que en la experiencia de usuario. |
| **Visión** | Ser el ingeniero al que una empresa llama cuando el software es crítico: cuando hay que migrar un legado sin parar el negocio, escalar una plataforma o lanzar un producto que tiene que funcionar el primer día. |
| **Propuesta de valor** | Un solo interlocutor técnico que cubre arquitectura, backend, frontend y cloud. Menos traspasos, menos deuda técnica y entregas que se pueden medir. |
| **Posicionamiento** | Fullstack Engineer & Software Architect con perfil *product-minded* y experiencia como CTO. Especialidad: arquitectura (DDD / Clean), modernización de legado y cloud en GCP. Nicho de dominio: industria musical. No "hago webs": *diseño sistemas que generan resultados*. |

**Pilares de marca**
1. **Ingeniería primero:** arquitectura limpia (DDD, hexagonal), código mantenible, decisiones justificadas.
2. **Impacto medible:** cada proyecto se cuenta con un problema, una solución y un resultado.
3. **Craft visual:** el detalle de la interfaz demuestra el mismo rigor que el backend.
4. **Transparencia:** un lenguaje claro, sin humo y sin jerga innecesaria.

### 1.2 Tono de comunicación (copy de la web)

| Sí | No |
|---|---|
| Directo, seguro, concreto | Arrogante, grandilocuente |
| Orientado al resultado de negocio ("cut release time from days to minutes") | Listas de tecnologías sin contexto |
| Técnico cuando aporta credibilidad (una línea, no un párrafo) | Buzzwords vacíos ("synergy", "cutting-edge solutions") |
| Primera persona ("I design…, I migrated…") | "Nosotros" impostado de agencia |
| Frases cortas con verbos de acción | Párrafos de más de 3 líneas |

**Fórmula de copy:** `Problema de negocio → Qué construí → Resultado medible → Stack (como prueba, no como titular)`.

**Microcopy recurrente:** las etiquetas de sección van en mono y con estilo terminal (`// 01 — EXPERTISE`, `> available_for_projects`). Es un guiño técnico dosificado: como máximo uno por sección.

### 1.3 Paleta de colores

Evoluciona la paleta actual: se mantienen el azul y el verde de marca y se añade una escala de superficies para el sistema Bento.

| Token (`@theme`) | HEX | Uso |
|---|---|---|
| `--color-bg` | `#09090B` | Fondo de página |
| `--color-surface` | `#111113` | Cards Bento, navegación |
| `--color-surface-2` | `#18181B` | Cards anidadas, inputs, hover de superficie |
| `--color-surface-3` | `#1F1F23` | Estados activos, tooltips |
| `--color-border` | `#27272A` | Bordes por defecto (1px) |
| `--color-border-strong` | `#3F3F46` | Bordes en hover/focus |
| `--color-text` | `#FAFAFA` | Titulares |
| `--color-text-body` | `#D4D4D8` | Texto de párrafo |
| `--color-text-muted` | `#A1A1AA` | Texto secundario, metadatos |
| `--color-text-subtle` | `#71717A` | Placeholders, labels terciarios (solo ≥14px) |
| `--color-accent` | `#29B6F6` | **Primario:** CTAs, enlaces, foco, highlights |
| `--color-accent-hover` | `#4FC3F7` | Hover del primario |
| `--color-accent-2` | `#00E676` | **Secundario:** estado "disponible", métricas positivas, éxito |
| `--color-accent-3` | `#A78BFA` | Terciario: solo para diferenciar categorías |
| `--color-danger` | `#F87171` | Errores de formulario |

**Color por categoría de proyecto** (se usa solo en badges, en el borde superior de las cards y en el indicador del filtro):

| Categoría | Token | HEX |
|---|---|---|
| Webs / Landings | `--color-cat-web` | `#29B6F6` |
| Web Apps | `--color-cat-app` | `#00E676` |
| Native Apps | `--color-cat-native` | `#A78BFA` |
| ERPs / CRMs | `--color-cat-erp` | `#FBBF24` |

**Reglas**
- Los acentos ocupan como mucho el 10% de la superficie visible: el oscuro manda y el color dirige la atención.
- El gradiente de marca (`#29B6F6 → #00E676`, 90°) se usa **una sola vez por vista**, típicamente en una palabra clave del H1.
- Contraste mínimo AA: el texto body sobre `surface` cumple ≥ 4.5:1. `text-subtle` no se usa en párrafos.

### 1.4 Jerarquía tipográfica

- **Primaria:** Inter Variable (`@fontsource-variable/inter`) para UI, titulares y párrafos.
- **Secundaria:** JetBrains Mono Variable para etiquetas, badges de stack, métricas, código y microcopy técnico.
- Titulares con `font-feature-settings: "ss01", "cv11"` y kerning negativo.

| Rol | Fuente | Tamaño (fluido) | Peso | Line-height | Tracking |
|---|---|---|---|---|---|
| Display / H1 | Inter | `clamp(2.5rem, 3.5vw + 1.25rem, 4rem)` | 700 | 1.05 | -0.035em |
| H2 | Inter | `clamp(2rem, 3vw + 1rem, 3rem)` | 650 | 1.1 | -0.03em |
| H3 (títulos de card) | Inter | `1.375rem` | 600 | 1.25 | -0.015em |
| H4 | Inter | `1.125rem` | 600 | 1.35 | -0.01em |
| Lead | Inter | `clamp(1.125rem, 1vw + 0.9rem, 1.3125rem)` | 400 | 1.6 | 0 |
| Body | Inter | `1rem` (16px) | 400 | 1.7 | 0 |
| Small | Inter | `0.875rem` | 400 | 1.55 | 0 |
| Eyebrow / label | JetBrains Mono | `0.75rem` | 500 | 1.4 | 0.12em, MAYÚSCULAS |
| Métrica | JetBrains Mono | `clamp(2rem, 3vw, 2.75rem)` | 600 | 1 | -0.02em |
| Badge / código | JetBrains Mono | `0.75rem` | 500 | 1 | 0.02em |

Ancho máximo de párrafo: `65ch`.

### 1.5 Identidad gráfica

**Radios**

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `6px` | Badges, inputs, chips |
| `--radius-md` | `10px` | Botones |
| `--radius-lg` | `16px` | Cards |
| `--radius-xl` | `24px` | Celdas Bento grandes, modales |
| `--radius-full` | `9999px` | Pills del filtro, avatar, indicadores de estado |

Regla de anidación: radio interior = radio exterior − padding.

**Bordes**
- Siempre `1px solid var(--color-border)`. En hover pasan a `--color-border-strong`.
- Las cards destacadas llevan un *borde con gradiente* sutil (máscara de `accent` → transparente) que solo aparece en hover.

**Sombras y profundidad.** En dark mode la profundidad se consigue con luz, no con sombra:
- `--shadow-card`: `0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 8px 24px -12px rgb(0 0 0 / 0.6)`
- `--shadow-glow`: `0 0 0 1px rgb(41 182 246 / 0.35), 0 8px 32px -8px rgb(41 182 246 / 0.35)` (solo en hover del CTA primario y de las cards destacadas)
- **Spotlight:** un gradiente radial que sigue al cursor dentro de las cards Bento (`radial-gradient(400px at var(--x) var(--y), rgb(41 182 246 / 0.08), transparent 60%)`).

**Patrones de fondo**
- **Dot-grid** global: `radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px)` con `background-size: 24px 24px`, enmascarado con `radial-gradient` para que se desvanezca hacia los bordes.
- **Aurora:** 1–2 manchas de `accent` y `accent-2` muy desenfocadas (`blur(120px)`, opacidad ≤ 0.15) detrás del Hero.
- **Grano:** textura de ruido SVG al 3% de opacidad sobre toda la página, que elimina el banding de los gradientes.
- Se mantienen, como acento puntual y no como tema global, las scanlines y el estilo terminal ya existentes (TVModal, CookieMatrix).

**Iconografía:** Lucide con trazo de 1.5px, a 16 o 20px. Logos de tecnologías monocromos (`text-muted`) que se colorean en hover.

**Movimiento**
- Duraciones: 150ms (hover), 250ms (UI) y 500–700ms (entradas de sección).
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Entradas: fade + translateY(12px), escalonadas cada 60ms.
- Se respeta siempre `prefers-reduced-motion`: sin parallax, sin tilt y solo fades.

---

## FASE 2 — Design System y Arquitectura de Componentes

### 2.1 Stack tecnológico recomendado

**Decisión: seguir con Astro, no migrar a Next.js.** El sitio es contenido estático con islas de interactividad, que es exactamente el caso para el que está diseñado Astro:

| Criterio | Astro 5 (recomendado) | Next.js |
|---|---|---|
| JS enviado por defecto | 0 KB (islas bajo demanda) | Runtime de React en todas las páginas |
| Hosting actual (GitHub Pages) | Nativo | Requiere `output: export` y pierde ISR, imágenes y middleware |
| Lighthouse 100 | Fácil | Requiere esfuerzo |
| Contenido tipado | Content Collections + Zod | Hay que montarlo a mano |
| Coste de migración | 0 | Reescribir todo |

Next.js aparece en el portafolio como habilidad demostrada en proyectos de clientes. Que la web propia saque 100 en Lighthouse es mejor prueba de criterio técnico que usar el framework de moda.

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Astro 5** (estático) | Rendimiento máximo, cero JS por defecto |
| Contenido | **Astro Content Collections** (MDX + esquema Zod) | Proyectos tipados, un archivo por caso de estudio |
| Estilos | **Tailwind CSS v4** + tokens en `@theme` | Ya está instalado; tokens como única fuente de verdad |
| Interactividad | **Islas React 19** solo donde haga falta | Filtro del portafolio, menú móvil, spotlight |
| Animación | **Motion** (`motion/react`) en las islas + CSS y **View Transitions** de Astro (`<ClientRouter />`) entre páginas | Transiciones fluidas entre el grid y el caso de estudio |
| Imágenes | `astro:assets` (`<Image />`, AVIF/WebP) | Sin CLS, con tamaños responsivos |
| Iconos | `lucide-astro` / `lucide-react` + `simple-icons` para logos de tecnologías | Consistencia |
| Fuentes | `@fontsource-variable/inter` y `@fontsource-variable/jetbrains-mono` | Variable fonts autoalojadas con `font-display: swap` |
| SEO | `@astrojs/sitemap`, Open Graph por página, JSON-LD (`Person`, `CreativeWork`) | Visibilidad |
| Analítica | Sin cookies (Umami o Plausible) | Permite simplificar el banner de cookies |
| Contacto | **Solo LinkedIn** (`https://es.linkedin.com/in/nomudev`). Sin email, sin Cal.com y sin formularios | Decisión de Noel |
| Calidad | `@astrojs/check`, Prettier + `prettier-plugin-astro`, Lighthouse CI en GitHub Actions | Validación automática |

**Objetivos de rendimiento (bloquean el merge):** Lighthouse ≥ 95 en las cuatro categorías, LCP < 1.8s, CLS < 0.05 y JS inicial < 50 KB gzip en la home.

### 2.2 Estructura de carpetas objetivo

```
src/
├── content/
│   ├── config.ts                 # esquemas Zod de las colecciones
│   └── projects/*.mdx            # un archivo por proyecto o caso de estudio
├── domain/
│   └── models.ts                 # ProjectCategory, Project, Expertise… (derivados del esquema)
├── application/
│   ├── ProjectService.ts         # getProjects({ category }), getFeatured(), getBySlug()
│   └── ProfileService.ts         # bio, expertise, stack, enlaces sociales
├── infrastructure/ui/
│   ├── atoms/                    # Button, Badge, TechBadge, Eyebrow, Icon, StatusDot, Link
│   ├── molecules/                # ProjectCard, BentoCell, StatBlock, FilterPills, NavLink, SectionHeader
│   ├── organisms/                # Navbar, Hero, About, Expertise, PortfolioGrid, ContactCTA, Footer
│   └── islands/                  # *.tsx hidratados: PortfolioFilter, MobileMenu, Spotlight
├── layouts/
│   ├── BaseLayout.astro          # head, SEO, fuentes, fondo, Navbar y Footer
│   └── CaseStudyLayout.astro
├── pages/
│   ├── index.astro
│   ├── work/index.astro
│   ├── work/[slug].astro
│   ├── privacy.astro
│   └── 404.astro
└── styles/theme.css              # @theme con todos los tokens de la Fase 1
```

### 2.3 Átomos

| Componente | Variantes / props | Notas |
|---|---|---|
| `Button` | `variant: primary \| secondary \| ghost \| link`, `size: sm \| md \| lg`, `href?`, `icon?`, `iconPosition` | `primary`: fondo `accent`, texto `#09090B`, glow en hover. `secondary`: `surface-2` con borde. Siempre con `focus-visible:ring-2 ring-accent ring-offset-bg`. Si recibe `href`, renderiza `<a>`. |
| `Badge` | `tone: neutral \| accent \| success \| category`, `category?` | Mono, 12px, `radius-sm`, fondo con el color al 10% y texto al 100% |
| `TechBadge` | `name`, `icon?` | Logo de `simple-icons` en gris que se colorea en hover; usado en cards y stack |
| `Eyebrow` | `index?`, `children` | `// 01 — EXPERTISE` en mono, color `accent` |
| `StatusDot` | `status: available \| busy` | Punto verde con un pulso suave (se desactiva con reduced-motion) |
| `Icon` | `name`, `size` | Wrapper de Lucide con trazo de 1.5px |

### 2.4 Moléculas

| Componente | Descripción |
|---|---|
| `SectionHeader` | `Eyebrow` + H2 + lead opcional, alineado a la izquierda (o centrado en el CTA final) |
| `BentoCell` | Contenedor base del grid: `surface`, borde, `radius-xl`, padding de 24–32px, spotlight en hover y props `colSpan` / `rowSpan` |
| `ProjectCard` | Imagen (16:10) con overlay, `Badge` de categoría, título H3, una línea de impacto, una métrica destacada (`StatBlock`) y hasta 4 `TechBadge`. Variantes: `featured` (2×2 en el bento) y `default`. Toda la card es clicable y lleva a `/work/[slug]`, con View Transition sobre la imagen. |
| `StatBlock` | Número grande en mono + label. Ej.: `-50%` / `codebase size` |
| `FilterPills` | Grupo de pills (`All`, `Landings`, `Web Apps`, `ERP / CRM`, `Native Apps`) con contador y un indicador animado (Motion `layoutId`). Accesible como `role="tablist"`. |
| `NavLink` | Enlace con un subrayado animado y estado activo según la sección visible (IntersectionObserver) |

### 2.5 Organismos

- **`Navbar`:** sticky, `surface/70` con `backdrop-blur`, borde inferior, altura de 64px. Logo a la izquierda; enlaces `Work · Expertise · About · Contact`; CTA `Connect on LinkedIn ↗` a la derecha. En móvil, menú overlay (isla).
- **`Footer`:** logo, una línea de posicionamiento, enlaces sociales (LinkedIn y, si se aporta, GitHub), enlace a Privacy, `© {year}` y un guiño en mono `Built with Astro · Lighthouse 100`.

### 2.6 Sistema de filtrado del portafolio

**Modelo de datos** (`src/content/config.ts`):
```ts
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['landing', 'webapp', 'erp', 'native']),
    summary: z.string().max(140),          // una línea de impacto para la card
    client: z.string().optional(),         // u "Confidential"
    year: z.number(),
    role: z.string(),                      // "Lead Engineer", "Software Architect"…
    stack: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3),
    cover: image(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    links: z.object({ live: z.string().url().optional(), repo: z.string().url().optional() }).optional(),
  }),
});
```

**Etiquetas visibles por categoría**

| `category` | Label | Icono Lucide |
|---|---|---|
| `landing` | Websites & Landings | `globe` |
| `webapp` | Web Apps | `app-window` |
| `erp` | ERP & CRM Systems (implantados en producción) | `layers` |
| `native` | Native Apps (escritorio y móvil) | `monitor-smartphone` |

**Comportamiento**
- Todas las cards se renderizan en HTML estático (son indexables y funcionan sin JS). La isla `PortfolioFilter` solo alterna su visibilidad.
- El estado del filtro vive en la URL (`/work?category=erp`), de modo que es compartible y respeta atrás/adelante (`history.replaceState`).
- La transición entre filtros usa `AnimatePresence` + `layout` de Motion (reordenación fluida, 250ms).
- Las pills muestran un contador por categoría y se ocultan si la categoría tiene 0 proyectos.
- La home muestra solo los proyectos `featured` en el bento, con el CTA `View all work →` hacia `/work`.

**Plantilla de caso de estudio** (`/work/[slug]`): Hero con cover → ficha (rol, año, stack, cliente) → **The challenge** → **The approach** (arquitectura, con diagrama si aplica) → **The result** (métricas) → galería → navegación al proyecto siguiente.

---

## FASE 3 — Estructura de la Web (Sitemap y Wireframing de contenido)

### 3.1 Sitemap

```
/                 Home (landing de una sola página con anclas)
├── #work         Portafolio destacado (bento)
├── #expertise    Áreas de expertise
├── #about        Sobre mí
└── #contact      CTA final
/work             Portafolio completo con filtro
/work/[slug]      Caso de estudio
/privacy          Privacidad y cookies
/404              Página no encontrada (con estilo terminal)
```

Orden de secciones en la home: **Hero → Logos/Stack strip → Work (bento) → Expertise → About → Contact**. El trabajo va antes que el "sobre mí" porque la prueba convence más que la biografía.

### 3.2 Hero

**Layout:** a la izquierda (7/12) va el copy; a la derecha (5/12) el logo holográfico actual (`StylizedLogo`) o una card bento "live terminal" con un snippet animado. Debajo hay una fila de 3 `StatBlock`. Detrás, dot-grid + aurora.

```
[● Available for new projects — Q[[PENDIENTE]] 2026]        ← Badge success + StatusDot

I engineer software
that runs your business.                                    ← H1 ("runs your business" con gradiente)

From high-converting landing pages to the ERP that
powers your operations — I design, build and scale
end-to-end systems with clean architecture and
production-grade cloud infrastructure.                      ← Lead

[ See my work → ]   [ Let's talk on LinkedIn ↗ ]            ← primary / secondary

-50%                  <50ms                 CTO
legacy code removed   real-time sync        led architecture & team      ← StatBlocks
```

Alternativas de H1 para validar con Noel:
- *"Software that scales with your business, not against it."*
- *"From landing page to ERP. One engineer, zero handoffs."*

### 3.3 Franja de stack (prueba social técnica)

Una línea `// TRUSTED STACK` con un marquee lento y monocromo de logos: Next.js, React, TypeScript, Java/Spring Boot, Python/FastAPI, .NET, Node.js, GCP, Firebase, Docker, PostgreSQL. Se pausa en hover y es estático con reduced-motion. Si hay logos de clientes con permiso, sustituyen a esta franja.

### 3.4 Work (portafolio destacado)

**Header:** `// 01 — SELECTED WORK` · H2 *"Systems built to move the needle."* · Lead: *"A selection of products I've architected and shipped — each one starting from a business problem, not a tech stack."*

**Grid Bento** (12 columnas en escritorio, 6 en tablet, 1 en móvil; gap de 16px):

```
┌───────────────────────────┬─────────────┐
│ ERP · Music Industry       │ Web App     │
│ (featured 2×2, 8 cols)     │ AI Music BI │
│ -50% code · GCP · DDD      │ (4 cols)    │
│                            ├─────────────┤
│                            │ Landing /   │
│                            │ Distribution│
├─────────────┬──────────────┴─────────────┤
│ Desktop     │ Match-Booker Algorithm      │
│ (4 cols)    │ (8 cols)                    │
└─────────────┴────────────────────────────┘
                     [ View all work → ]
```

Se procura que cada categoría tenga al menos un proyecto destacado. Contenido inicial, migrado de `ProjectService` y a completar:

| Proyecto | Categoría | Línea de impacto | Métrica |
|---|---|---|---|
| Music Industry ERP Ecosystem | `erp` | Re-architected a legacy monolith into a hexagonal, DDD-based platform on GCP with fully automated CI/CD. | `-50%` codebase |
| AI-Driven Music Intelligence | `webapp` | Spring Boot API with Vertex AI for predictive trends and hybrid MySQL/Firestore sync. | `<50ms` sync latency |
| Match-Booker Algorithm | `webapp` | FastAPI matching engine connecting venues and artists, with serverless reporting. | `3x` matching efficiency |
| Musicadders Distribution Platform | `web` / `webapp` | Next.js distribution platform with one-click migration of full Spotify catalogs. | Instant catalog import |
| `[[PENDIENTE: app nativa]]` | `native` | — | — |
| `[[PENDIENTE: landing destacada]]` | `web` | — | — |

### 3.5 Expertise

**Header:** `// 02 — EXPERTISE` · H2 *"One engineer. Four kinds of problems solved."* · Lead: *"Different products demand different trade-offs. Here's what I bring to each."*

**Layout:** bento de 4 celdas (2×2 en escritorio). Cada celda lleva un icono, el color de su categoría como borde superior, un título, el problema de negocio, lo que aporta Noel y los entregables.

| Área | Problema de negocio | Lo que aporto | Entregables |
|---|---|---|---|
| **Websites & Landings** | *"My site looks fine but doesn't convert, and it's slow."* | Performance-first builds (Core Web Vitals in the green), conversion-oriented structure, technical SEO and a CMS your team can actually use. | Lighthouse 95+, SEO setup, analytics, CMS |
| **Web Apps** | *"We need a product that works on day one and scales on day 100."* | Product-minded engineering: typed end-to-end, solid auth, real-time data, and a UI that feels instant. Next.js/React on the front, robust APIs behind. | MVP to production, API design, CI/CD |
| **Native Apps** | *"Our team needs a tool that runs locally, offline, and integrates with our hardware/files."* | Cross-platform desktop apps with native performance, auto-updates and secure sync with your cloud backend. | Windows/macOS builds, installers, auto-update |
| **ERP / CRM Systems** | *"Our operations run on spreadsheets and a legacy system nobody dares to touch."* | Domain-Driven Design to model your real business, incremental legacy migration without downtime, integrations and role-based workflows. | Domain model, migration plan, integrations, dashboards |

Cierre de la sección: *"Not sure which one you need? That's usually the first thing we figure out together."* → CTA `Let's talk on LinkedIn ↗`.

### 3.6 About

**Header:** `// 03 — ABOUT` · H2 *"Engineer by training. Architect by obsession."*

**Layout:** bento de 3 celdas: (a) una foto profesional de Noel en grande con un borde sutil; (b) la bio; (c) una mini timeline o "principios" + stack agrupado (reutilizando las categorías actuales de `getTechStack()`).

**Bio (basada en el CV; Noel debe validarla):**
> I'm Noel Muñoz, a Fullstack Engineer and Software Architect based in Valencia, Spain. I build products end-to-end — from pixel-perfect Next.js interfaces to Spring Boot and Python backends running on Google Cloud.
>
> Most recently I led the technical side of UNNE as CTO, defining the full system architecture, writing the core backend and running the team with Scrum. Before that, at Huming Music, I migrated a legacy JavaScript ERP to Next.js and built data pipelines that pull massive music datasets from Spotify and Soundcharts into Vertex AI to automate business insights. At Infinity Apps I built a music-catalog platform fed by async imports from multiple APIs.
>
> I apply Domain-Driven Design and Clean Architecture so software stays fast to change long after launch. And when I'm not coding, I'm probably behind a mixing desk — I've spent years as a live sound engineer, which taught me that things have to work on the night, not just in rehearsal.

**Timeline** (mini-card con los datos de la tabla 1.0):
`2025 — CTO · UNNE` · `2025 — Fullstack & Cloud · Huming Music` · `2024 — Backend Developer · Infinity Apps` · `DAM — Multiplatform App Development`

**Principios (3 mini-cards):**
1. **Business first.** *"Every technical decision answers a business question."*
2. **Built to last.** *"Clean architecture today is speed six months from now."*
3. **Ship, measure, iterate.** *"Small releases, real metrics, no big-bang rewrites."*

**Stack agrupado:** Backend & Core · Architecture & Frontend · Cloud & DevOps (GCP) · Data & AI, con `TechBadge` dentro de cada grupo.

**Foto:** `src/assets/images/noel-munoz.jpg`, renderizada con `<Image />` en formato cuadrado, `radius-xl`, un leve `grayscale(20%)` y un borde `border`.

**Enlaces:** `LinkedIn ↗` (`https://es.linkedin.com/in/nomudev`) · `GitHub ↗` `[[PENDIENTE]]` · `Download CV` `[[PENDIENTE: CV en inglés con la identidad visual de Nomudev; el CV actual está en español y usa una paleta naranja que no encaja con la marca]]`. El teléfono no se publica en la web.

### 3.7 Contact / CTA final

**Layout:** una gran celda bento a todo el ancho con el dot-grid más visible, glow `accent` en el borde y el texto centrado.

```
// 04 — CONTACT

Have a project that can't afford to fail?
Let's build it right the first time.

Send me a message on LinkedIn with what you're trying to
achieve. I'll reply with honest feedback — even if I'm not
the right fit.

[ Message me on LinkedIn ↗ ]                                ← único CTA (abre en una pestaña nueva)

● Currently accepting projects for [[PENDIENTE]]
```

Se mantiene `ContactButton` (la animación de "gravedad" + lluvia hacia LinkedIn) como *easter egg* opcional, no como CTA principal: el CTA principal no puede sacar al usuario del sitio de forma inesperada.

### 3.8 Componentes existentes: qué se conserva

| Componente | Decisión |
|---|---|
| `StylizedLogo` | Se conserva en el Hero |
| `TVModal` | Se reconvierte en reproductor opcional de demos en vídeo de los casos de estudio, en lugar de abrirse en todas las cards |
| `CookieMatrix` | Se conserva el concepto. Si la analítica pasa a ser sin cookies, se simplifica a un aviso informativo |
| `ThreeDCard` | Se sustituye por el spotlight de `BentoCell`, más sobrio y premium |
| `ContactButton` + `CyberRainTransition` | Pasan a ser un easter egg (ver 3.7) |
| `Nomudev3DLogo` y las dependencias de three | Se eliminan |

---

## FASE 4 — Plan de Ejecución

Cada tarea es una iteración. Antes de pasar a la siguiente: `npm run build` sin errores, revisión visual en 375px y en 1440px, y commit atómico con un mensaje descriptivo.

### Bloque A — Cimientos
- [ ] **T0 · Recopilar datos pendientes.** ✅ CV volcado en la sección 1.0. ✅ Foto añadida. Falta: detalle de los proyectos (incluidos una app nativa y una landing), GitHub, disponibilidad y CV en inglés. (Contacto: resuelto, solo LinkedIn.) Se reemplazan todos los `[[PENDIENTE]]`.
- [x] **T1 · Saneamiento.** Arreglar los imports duplicados del Hero, eliminar `Nomudev3DLogo` y las dependencias de three, borrar `global.css`, reescribir el `README.md`, añadir `@astrojs/check` + Prettier y el script `npm run check`.
- [x] **T2 · Tokens.** Reescribir `theme.css` con todos los tokens de la Fase 1 (colores, radios, sombras, escala tipográfica, easing). Migrar las fuentes a las versiones variables. Crear la utilidad del fondo dot-grid + grano en `BaseLayout`.
- [x] **T3 · Átomos.** (Hecho, salvo `/_styleguide` y `TechBadge`, que se dejan para cuando haya logos de `simple-icons`.) `Button`, `Badge`, `TechBadge`, `Eyebrow`, `StatusDot` e `Icon` según la Fase 2.3. Crear una página interna `/_styleguide` (excluida del sitemap) para revisarlos.
- [ ] **T4 · Layout base.** `BaseLayout` con SEO (title `Noel Muñoz — Fullstack Engineer & Software Architect | Nomudev`, description, OG, canonical, JSON-LD `Person` con `jobTitle`, `address` Valencia, `sameAs` LinkedIn), `Navbar` (con la isla del menú móvil), `Footer`, `@astrojs/sitemap` y View Transitions.

### Bloque B — Contenido y portafolio
- [ ] **T5 · Content Collection.** Definir el esquema de `projects` y migrar los 4 proyectos actuales de `ProjectService` a MDX. `ProjectService` pasa a leer la colección mediante `getCollection`.
- [ ] **T6 · Moléculas Bento.** `BentoCell` (con spotlight), `ProjectCard` (`featured` / `default`), `StatBlock`, `SectionHeader`.
- [ ] **T7 · Página `/work`.** Grid completo + isla `PortfolioFilter` con el estado en la URL, contadores y animación de layout. Debe funcionar sin JS.
- [ ] **T8 · Caso de estudio.** `CaseStudyLayout` + `/work/[slug]` con la plantilla de la Fase 2.6, la transición de la imagen desde la card y la navegación al siguiente proyecto.

### Bloque C — Landing
- [ ] **T9 · Hero** + franja de stack (Fase 3.2–3.3).
- [ ] **T10 · Work bento** en la home con los proyectos `featured` (Fase 3.4).
- [ ] **T11 · Expertise** (Fase 3.5).
- [ ] **T12 · About** (Fase 3.6).
- [ ] **T13 · Contact CTA** con un único botón a LinkedIn (Fase 3.7). Reubicar `ContactButton` como easter egg.

### Bloque D — Pulido y lanzamiento
- [ ] **T14 · Motion.** Entradas escalonadas, hover states, `prefers-reduced-motion` y revisión de la carga de JS por isla.
- [ ] **T15 · Accesibilidad.** Navegación por teclado completa, foco visible, contraste AA, `alt` en las imágenes, landmarks y skip-link.
- [ ] **T16 · Rendimiento y SEO.** Imágenes con `astro:assets`, preload de la fuente del H1, una imagen OG por página, `robots.txt`, página 404. Cumplir los objetivos de la Fase 2.1.
- [ ] **T17 · CI de calidad.** Añadir al workflow `astro check` + Lighthouse CI (umbral ≥ 95) antes del deploy.
- [ ] **T18 · Legal y analítica.** Actualizar `privacy.astro` (fecha fija, tipografía sin `prose` o con el plugin instalado), integrar la analítica sin cookies y adaptar `CookieMatrix`.
- [ ] **T19 · Lanzamiento.** Revisión final del copy con Noel, actualización de este documento (sección 0) con el nuevo estado del repo, y merge a `master`.

### Backlog (post-lanzamiento)
- Versión en español (`/es`) con la i18n de Astro.
- Blog técnico (`/notes`) con una colección MDX: artículos sobre DDD, migraciones de legado y GCP.
- Testimonios de clientes en el bento.
- Command palette (`⌘K`) para navegar el sitio, como guiño para el público técnico.
