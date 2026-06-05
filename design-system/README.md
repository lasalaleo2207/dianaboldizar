# Vena Digital — Design System

> **IA práctica que funciona para negocios reales.**
> Concepto visual: **Interfaz humana.**

This is the design system for **Vena Digital**, a brand built around teaching and applying AI to real-world businesses, led by **Laura** as the human guide. The system is editorial-meets-UI: clean cards, structural deep-blue, coral as the action color, an energetic yellow mascot, and language that's direct, witty, and free of jargon.

---

## What this brand is

| | |
|---|---|
| **Nombre** | Vena Digital |
| **Idea madre** | IA práctica que funciona para negocios reales |
| **Concepto visual** | Interfaz humana |
| **Personalidad** | Cercana · Ingeniosa · Práctica · Clara · Enérgica |
| **Voz humana** | Laura — guía práctica, no figura corporativa |
| **Mascota** | Personaje amarillo con chompa coral, gesto de paz |
| **Idioma principal** | Español (LATAM) |

**What it is not:** futurismo frío, agencia corporativa aburrida, vendehumo, doodles infantiles, gradientes invasivos, composiciones caóticas.

---

## Products & surfaces

Vena Digital is a content + education brand led by Laura. The surfaces it shows up on:

1. **Landing page (Vena Digital website)** — hero, academia, recursos, contacto. Marketing-led.
2. **Academia IA para Emprendedores** — course/lesson UI for the educational product (class miniatures, lesson player, downloadable resources).
3. **Instagram & social** — primary content surface. 1080×1350 carousels, opinion posts, lanzamiento templates.
4. **Slide decks** — internal + masterclass presentation templates.

> No production codebase or Figma file was attached for this project. Source of truth is `reference/brandkit_vena_digital.md` (Brand Kit v1.0) plus four reference cover/spread images in `assets/brand-kit-*.png`. UI kits in this design system are visual recreations from those references — **not** ports of an existing codebase.

---

## Sources

- `reference/brandkit_vena_digital.md` — full Brand Kit v1.0 markdown (16 chapters)
- `assets/brand-kit-portada.png` — cover spread
- `assets/brand-kit-paleta.png` — color palette spread
- `assets/brand-kit-tipografia.png` — typography spread
- `assets/brand-kit-lenguaje-grafico.png` — UI language spread

---

## Index

```
README.md                 ← you are here
SKILL.md                  ← skill manifest (cross-compatible with Claude Code)
colors_and_type.css       ← all CSS vars (color + type + spacing + radii + motion)

assets/                   ← official brand artwork:
                              logo-horizontal.png · mascota.png
                              favicon.png · favicon.svg
                              brand-kit-*.png (reference spreads)
fonts/                    ← Manrope-Bold · DMSans (variable) · IBMPlexMono-Regular
reference/                ← original brand kit markdown
preview/                  ← design-system preview cards (rendered in the DS tab)

ui_kits/
  shared/
    Brand.jsx             ← Mascot, Wordmark, LogoLockup, Lucide-style icons
    components.css        ← buttons, tags, cards, inputs, progress
  landing/                ← Vena Digital marketing website
  academia/               ← Academia IA — course/lesson UI
  social-instagram/       ← Instagram post templates (Educativo/Opinión/Lanzamiento/Story)

slides/                   ← 6-slide pitch deck template (1920×1080, deck-stage.js)
```

> Slides folder is intentionally absent — the brand kit doesn't include a deck template. Add one and we'll generate `slides/` with TitleSlide, BigQuoteSlide, etc.

---

## CONTENT FUNDAMENTALS

### Voice

Vena Digital sounds like **a smart friend who runs a business and happens to know AI** — never like an academy, never like an agency. Laura is the human anchor; the brand speaks _with_ the reader, not at them.

| Dimension | Vena Digital does | Vena Digital doesn't |
|---|---|---|
| Person | "Tú" (informal) — direct address | "Usted" (too distant); "nosotros" overused |
| Stance | Opinionated, practical | Hedged, neutral, "depends" |
| Humor | Dry, intelligent asides | Punny, cute, emoji-laden |
| Density | One idea per piece | Wall-of-text or buzzword soup |
| Action | Always closes with a concrete move | "Stay tuned," "thoughts?" |

### Tone in one line

> **Directo. Claro. Con humor inteligente. Sin tecnicismos. Accionable.**

### Casing

- **Headlines and CTAs:** Sentence case. ("IA práctica que funciona para negocios reales.")
- **Tags / etiquetas / chips:** ALL CAPS, IBM Plex Mono. (`PROMPT LISTO`, `IA SIN DRAMA`, `NEGOCIO REAL`).
- **Eyebrow labels** (e.g. "PORTADA", "PALETA"): ALL CAPS with a small coral dot, IBM Plex Mono.
- **Body copy:** Sentence case, normal punctuation. Periods at the end of standalone titles when the brand kit uses them ("IA práctica que funciona para negocios reales.").

### Emoji & symbols

- **Emoji: avoid.** The brand kit explicitly warns against "exceso de stickers o elementos cute." The mascot _is_ the emoji.
- **Unicode symbols:** sparing. The `>` in `Claro > complicado` is intentional and brand-canonical.
- **Arrows in CTAs:** `→` used after link-style CTAs ("Explorar →", "Ver más →").
- **Icons:** custom-feel SVGs, line/duotone, never decorative for decoration's sake.

### Microcopy library (canonical)

**CTAs:** "Quiero un sistema" · "Ver academia" · "Guarda este post" · "Copiar prompt" · "Usar en mi negocio" · "Explorar →" · "Ver más →"

**Tags:** `PROMPT LISTO` · `NEGOCIO REAL` · `IA SIN DRAMA` · `MENOS CAOS` · `MÁS SISTEMA` · `TECNOLOGÍA FÁCIL` · `SISTEMA SIMPLE` · `CERCANÍA HUMANA` · `CLARO Y HUMANO` · `LISTO PARA CRECER`

**Brand phrases:** "IA práctica que funciona para negocios reales." · "Tecnología sin drama técnico." · "Menos caos, más sistema." · "Primero ordenas. Luego automatizas." · "No necesitas más herramientas, necesitas más criterio." · "Claro > complicado."

### Content structure (every piece)

1. **Gancho** — captamos atención
2. **Problema real** — algo con lo que conectan
3. **Explicación útil** — claridad y valor
4. **Acción concreta** — qué pueden hacer ya

### Pre-publish checklist

- ¿Se entiende en menos de 3 segundos?
- ¿Una sola idea principal?
- ¿Titular claro y fuerte?
- ¿Suficiente aire?
- ¿El color ayuda o decora por ansiedad?
- ¿La foto/mascota aporta al mensaje?
- ¿CTA concreto?
- ¿Suena como Vena Digital, no como plantilla reciclada?

---

## VISUAL FOUNDATIONS

### Color

The system runs on **three roles, four colors of weight, lots of cream-white neutral**:

- **Azul noche `#0A2142`** — structure, titles, dark backgrounds, secondary buttons. Carries authority. ~22% of any composition.
- **Coral acción `#FF6B5E`** — CTAs, key emphasis words, single-keyword highlighting in headlines. ~14%. Use it sparingly or it stops meaning anything.
- **Amarillo energía `#F5C935`** — energetic accents, mascot, highlight-style buttons. ~8%. Never a dominant background.
- **Marfil digital `#F7F5EF` + Blanco + Gris niebla** — fills 50% of any composition. Warm, not sterile. Default page background is _marfil_, not pure white.
- **Support:** Azul suave (`#BFD7EA`), Gris carbón (`#2D2D2D`), Verde sistema (`#5FAE8B`), Coral suave (`#F4A299`).

**Rule:** "El azul estructura. El coral activa. El amarillo aporta energía." Two protagonist colors per piece, max.

### Typography

- **Manrope** — Bold/ExtraBold — display & headlines. Geometric, friendly, thick weights only.
- **DM Sans** — Regular/Medium — body, UI labels, buttons (sometimes), descriptions.
- **IBM Plex Mono** — Medium/SemiBold — eyebrow labels, tags, chips, technical notes. Used as **accent only**, never for paragraphs.
- **Hierarchy:** H1 56 / H2 32 / H3 24 / Body 16 / Caption 12.
- Letter-spacing: tight (-0.02em) on display; wide (+0.12em) and uppercased on mono eyebrows.
- **Principle:** "Claro > complicado." Tight headlines, lots of air, mono only as accent.

### Backgrounds

- **No full-bleed photo backgrounds.** Photos always live inside a rounded card or a circular frame.
- **No gradients as decoration.** The brand kit explicitly bans "gradientes invasivos." Solid color blocks only.
- **No textures, no patterns, no grain.** The look is _editorial UI_ — flat, clean, intentional.
- **Marfil digital (`#F7F5EF`)** is the default page background. White (`#FFFFFF`) is reserved for cards and elevated surfaces — that contrast is the system's quiet structural signal.

### Borders

- Subtle warm-grey (`#E3DFD6` ~ `#D8D4C9`) at 1–1.5px on cards floating over marfil.
- 2px strong azul-noche outlines on tertiary buttons and the chat-window header.
- The mascot logo itself uses ~3–4px azul-noche outlines — a brand signature, but that weight is **mascot-only**, never imitated on regular UI.

### Shadows

Soft, low-elevation, blue-tinted (rgba of azul-noche, never grey-black):

- **shadow-1:** card resting on marfil — `0 1px 2px rgba(10,33,66,.04)`
- **shadow-2:** elevated card — `0 2px 8px rgba(10,33,66,.06)`
- **shadow-3:** hovered/raised card — `0 8px 24px rgba(10,33,66,.08)`
- **shadow-pop:** modal/menu — `0 12px 36px rgba(10,33,66,.12)`

Inner shadows used only for input "pressed" feel (rare).

### Corner radii

| Element | Radius |
|---|---:|
| Tarjetas / cards | 20–28 px (default `--radius-card: 24px`) |
| Botones | 999 px (pill — _all_ buttons) |
| Inputs | 14–18 px |
| Marcos de imagen | 20–32 px |
| Contenedores grandes | 28–40 px |
| Avatares / mascot frame | 50% |

Pill buttons are **non-negotiable** brand DNA. Square or 8px-radius buttons read as a different brand.

### Spacing & layout

- **8pt base scale**, with generous editorial steps (24, 32, 48, 64, 96).
- Wide outer margins; copy never butts against card edges (24–32px internal padding minimum).
- "Mucho aire entre bloques."
- One idea per piece. The cover spread has _eight_ visual elements and feels calm — that's the bar.
- Page header is a thin rule with a brand-kit eyebrow on the left and a section name in coral on the right. Page footer mirrors it.

### Cards

- Background: `#FFFFFF` on top of `#F7F5EF` page → white pops gently.
- Radius: 24px (~`--radius-card`).
- Border: 1.5px `#E3DFD6` for subtle definition. Optional.
- Shadow: `--shadow-2` only when elevation is meaningful (modal, menu, dropped panel).
- Padding: 24–32px.
- An eyebrow + title + content + optional CTA at the bottom-left. CTA uses coral text + `→`.

### Buttons

Four variants, **all pill-shaped**:

| Variant | Bg | Fg | Use |
|---|---|---|---|
| **Primary** | Coral | White | Main CTAs only. One per view. |
| **Secondary** | Azul noche | White | Supporting actions. |
| **Tertiary** | White | Azul noche, 2px azul-noche border | Quiet/cancel actions. |
| **Highlight** | Amarillo | Azul noche | Energetic moments, never for "submit." |

Buttons can carry a leading icon inside a small circular badge of the inverse color (see `Lenguaje gráfico` spread).

### Hover & press states

- **Hover:** ~5–8% darker shade of the same hue. (`#FF6B5E` → `#F4574A`.)
- **Press:** ~12–15% darker, plus optional 1px translateY for tactile feel.
- **Disabled:** 40% opacity, no hover transition.
- Keep transitions short — 120–200ms on `cubic-bezier(.2, .8, .2, 1)`. No bounces.
- Cards on hover: lift to `--shadow-3`, never scale.

### Animation

- **Easing:** `cubic-bezier(.2, .8, .2, 1)` (standard) and `cubic-bezier(.16, 1, .3, 1)` (out) — confident, not bouncy.
- **Durations:** 120ms (micro), 200ms (default), 320ms (page-level).
- **No bounces, no springs**, no overshooting. The brand is _practical_, not playful-cute.
- Fades + soft translates only. Mascot can have a subtle pulse on hover; otherwise static.

### Transparency & blur

- **Avoid blur entirely.** No backdrop-filter, no glassmorphism. The brand reads as solid blocks.
- Transparent overlays only for image protection gradients on photo cards (rare, brief).

### Imagery & photo treatment

- Laura, casual/explanatory poses. Real tools (laptop, phone, libreta). Clean light, simple background.
- Always inside a **rounded card** or **circular avatar frame** — never full-bleed.
- Mood: warm, neutral. **Not** cool, not graded blue, not B&W, no grain.
- Photo as support, not as the message.

### Layout rules

- One idea per piece. Max two protagonist colors.
- Anchored eyebrow in top-left, section/page name top-right (often coral).
- Margins generous; cards float in air, don't touch viewport edges.
- Mascot is _support_, never the dominant element (except on pure brand pieces like covers).

### Logo & protection

- Three versions: **Horizontal** (web/headers), **Isotipo** (avatar/favicon), **Sello** (community/whatsapp).
- Min sizes: 25mm print / 120px digital width.
- Clear-space: at least the height of the mascot's hand or the word "Vena."
- Light backgrounds preferred. No deformation. No drop shadow on the logo itself.

---

## ICONOGRAPHY

The brand kit specifies a **two-tier icon system**:

**Tier 1 — Sistema / interfaz** (UI utility):
chat · checklist · calendar · cursor · folder · file · bell · bar chart · gear · laptop · browser window

**Tier 2 — Marca** (story-telling):
peace hand · spark/sparkle · simplified mascot face · simple heart · lightning · rocket · lightbulb · briefcase

### Style

- **Line, rounded caps, ~2px stroke**, slight informal feel. Look at the `Lenguaje gráfico` spread: the icons are line-based with rounded line caps and gentle curves, never engineering-precise. Some have small filled accents (e.g., the dots on the chat icon).
- **Filled icons appear inside circular badges** (e.g., the briefcase inside the small coral circle on the "Negocio real" card; the peace-hand inside the orange "Así somos" badge).
- Two color modes: **outline azul-noche** (default) and **filled white-on-color circles** (badge mode).

### What's used in this system

We do not yet have the original brand SVGs. **For all UI surfaces in this design system, we use Lucide icons via CDN (`https://unpkg.com/lucide@latest`)** as the closest match — Lucide is line-based, ~2px stroke, with rounded caps, which matches the brand kit's icon language well.

> **⚠️ Substitution flagged:** the brand's actual icon SVGs aren't available. If/when Vena ships an icon set, we should drop it into `assets/icons/` and swap. The mascot ("carita") and the peace-hand have no Lucide equivalent — we use placeholder PNGs and a Lucide `hand` substitute respectively.

### Emoji & unicode

- **Emoji: do not use** in Vena Digital surfaces. The mascot replaces them.
- **Unicode arrows** (`→`) are canonical in CTAs.
- The literal character `>` is used in the brand phrase `Claro > complicado` — it's a typographic motif, not an icon.

### Logo & mascot

The mascot ("carita feliz amarilla con chompa coral") is the unmistakable signature of the brand.

> **⚠️ Substitution flagged:** the original mascot SVG/PNG was not provided as a clean cut-out — we only have it embedded in the brand-kit reference images. For UI usage, we render the mascot via a CSS-styled placeholder badge in `assets/mascot-placeholder.svg`. **Please send over the actual mascot artwork** (SVG preferred) and we'll swap.

---

## Fonts

All three brand families are loaded **locally from `fonts/`** with Google Fonts as a fallback for weights we don't have on disk:

- **Manrope** — `fonts/Manrope-Bold.ttf` (700/800). Other weights (400/500/600) come from Google Fonts.
- **DM Sans** — `fonts/DMSans-VariableFont_opsz_wght.ttf` (variable, all weights).
- **IBM Plex Mono** — `fonts/IBMPlexMono-Regular.ttf` (400). Heavier weights (500/600) currently fall back to system mono if Google Fonts is unavailable; ship `IBMPlexMono-Medium.ttf` and `IBMPlexMono-SemiBold.ttf` to remove the dependency entirely.

> **Heads-up:** Manrope only has Bold on disk, so non-bold Manrope text still hits Google Fonts. If offline parity matters, drop `Manrope-Regular/Medium/SemiBold.ttf` into `fonts/` and we'll add the @font-face rules.

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">

<h1>IA práctica que funciona para <span style="color:var(--vena-coral-accion)">negocios reales</span></h1>
<p>Clara, ingeniosa y sin drama técnico.</p>

<button class="btn btn-primary">Quiero un sistema</button>
<span class="tag-mono">IA SIN DRAMA</span>
```

Component classes are defined per-UI-kit; see `ui_kits/landing/components.css` for the canonical implementations.
