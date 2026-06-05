---
name: vena-digital-design
description: Use this skill to generate well-branded interfaces and assets for Vena Digital ("IA práctica que funciona para negocios reales"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand idea:** "IA práctica que funciona para negocios reales." Concept: **Interfaz humana**.
- **Mood:** Cercana, ingeniosa, práctica, clara, enérgica. Spanish (LATAM).
- **Avoid:** futurismo frío, agencia corporativa, vendehumo, doodles infantiles, gradientes invasivos.
- **Tokens:** all in `colors_and_type.css` (CSS custom properties).
- **Components:** `ui_kits/shared/components.css` — pill buttons, tags, cards, inputs.
- **Icons:** inline Lucide-style SVGs in `ui_kits/shared/Brand.jsx`.
- **Fonts:** Manrope (display), DM Sans (body), IBM Plex Mono (eyebrow/tags). Local TTFs in `fonts/` with Google Fonts fallback.
- **Colors:** azul noche `#0A2142` structure · coral `#FF6B5E` action · amarillo `#F5C935` energy · marfil `#F7F5EF` page bg.
- **Radii:** buttons are pills (999px), cards 24px, inputs 16px, containers 32px. **Always.**

Read `README.md` for content/voice rules, visual foundations, and the full index of files.
