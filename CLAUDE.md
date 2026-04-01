# CLAUDE.md

## Project Overview

IPA Chart is a multilingual Interactive Phonetic Alphabet reference app. It renders consonant and vowel inventories for Indonesian, Korean, and Arabic on a shared IPA grid. Built with SvelteKit 2, TypeScript, and deployed as a static PWA to GitHub Pages.

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 + TypeScript (strict mode)
- **Build**: Vite 7, `@sveltejs/adapter-static` for GitHub Pages
- **Linting**: ESLint 9 + Prettier 3 + prettier-plugin-svelte
- **Deployment**: GitHub Actions → GitHub Pages (with branch preview URLs)
- **No runtime dependencies** — pure static frontend

## Key Commands

```bash
npm run dev          # Dev server at localhost:5173
npm run build        # Static production build → build/
npm run check        # SvelteKit sync + svelte-check (type checking)
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (check only)
```

Always run `npm run format && npm run lint` before committing. Run `npm run check && npm run build` to verify nothing breaks.

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte          # Main page: renders both charts + language legend + rules
│   └── +layout.svelte        # App shell with meta tags and global styles
├── lib/
│   ├── components/
│   │   ├── ConsonantChart.svelte  # CSS Grid consonant chart (manner × place)
│   │   └── VowelChart.svelte      # CSS Grid vowel chart (height × backness)
│   ├── data/
│   │   └── ipa.ts            # All IPA data: types, phoneme inventories, reference grids, languages
│   └── index.ts              # Barrel exports
├── app.html                  # HTML template
├── app.d.ts                  # Type declarations
└── service-worker.ts         # Offline caching (cache-first app shell, network-first content)
static/                       # PWA manifest, icons, robots.txt
.github/workflows/deploy.yml  # CI: lint → format:check → check → build → deploy
```

## Architecture at a Glance

- **Data-driven**: All linguistic content lives in `src/lib/data/ipa.ts`. Adding a language means adding an entry to the `languages` array — no component changes needed.
- **Type-safe**: TypeScript union types for place/manner/height/backness/voicing ensure data correctness at compile time.
- **Two chart components**: `ConsonantChart` and `VowelChart` each receive a `languages` array (with assigned colors) and a reference grid, then render a CSS Grid table.
- **Color assignment**: `+page.svelte` assigns colors from a 5-color palette to languages by index.
- **PWA**: Service worker caches assets for offline use. Manifest enables "Add to Home Screen."

## Data Model

The core types in `src/lib/data/ipa.ts`:

- `ConsonantPhoneme` — IPA symbol + place + manner + optional voicing/graphemes/contexts
- `VowelPhoneme` — IPA symbol + height + backness + rounding + optional graphemes/contexts
- `Language` — id, name, variety, script, phonemes array, optional rules/notes
- `LanguageRule` — allophone/distribution/phonotactic rules with realizations

## Coding Conventions

- Mobile-first responsive design; use `clamp()` for fluid typography
- No runtime dependencies; keep the bundle zero-dep
- Prefer SVG/code-based assets over binary images
- CSS Grid for chart layouts; sticky headers for scroll navigation
- Follow existing Svelte 5 patterns (no legacy `$:` reactivity)

## CI/CD

The GitHub Actions workflow runs on every push:

1. `npm run lint` + `npm run format:check` + `npm run check`
2. `npm run build` (with `BASE_PATH` for GitHub Pages)
3. Deploy to GitHub Pages (main → root path, branches → `/branch-slug/`)

## No Test Framework

There is currently no test runner configured. Validation relies on TypeScript strict mode, ESLint, and the build step.
