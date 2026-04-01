# High-Level Design

## 1. System Context

IPA Chart is a client-side-only static web application that visualises phoneme inventories of multiple languages on standard International Phonetic Alphabet grids. There is no backend, database, or external API. The app is built at CI time into static HTML/CSS/JS and served from GitHub Pages.

```
┌──────────────┐     HTTPS      ┌────────────────────┐
│   Browser    │ ◄────────────► │   GitHub Pages CDN  │
│  (PWA + SW)  │                │   (static assets)   │
└──────────────┘                └────────────────────┘
```

## 2. Core Design Decisions

### 2.1 Data-Driven Architecture

All linguistic content is defined in a single TypeScript module (`src/lib/data/ipa.ts`). The UI components are generic chart renderers that consume typed data arrays. This separation means:

- **Adding a language** requires only appending to the `languages` array — zero component changes.
- **Modifying the IPA grid** (e.g., adding a consonant place) requires updating the reference arrays and type unions.
- **Data correctness** is enforced at compile time through TypeScript union types rather than runtime validation.

### 2.2 Component Hierarchy

```
+layout.svelte              ← App shell (meta, global styles, slot)
└── +page.svelte            ← Page orchestrator
    ├── Language Legend      ← Inline in +page.svelte
    ├── ConsonantChart      ← Reusable grid component
    ├── VowelChart          ← Reusable grid component
    └── Notable Realisations ← Inline rules section
```

The two chart components (`ConsonantChart`, `VowelChart`) share the same rendering pattern:

1. Receive a `languages` array (each with an assigned color) and a reference grid.
2. For each cell in the reference grid (manner×place or height×backness), filter matching phonemes from all languages.
3. Render a CSS Grid where each cell shows the IPA reference symbol plus color-coded language phonemes.

### 2.3 Type System

The phonetic classification uses TypeScript union literal types rather than enums:

| Domain     | Types                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------- |
| Consonants | `ConsonantPlace` (12 values), `ConsonantManner` (9 values), `ConsonantVoicing` (4 values) |
| Vowels     | `VowelHeight` (7 values), `VowelBackness` (5 values), `VowelRounding` (2 values)          |
| Phonemes   | `ConsonantPhoneme`, `VowelPhoneme`, discriminated via `Phoneme` union                     |
| Languages  | `Language` with `phonemes: Phoneme[]` and optional `rules: LanguageRule[]`                |

Type guards `isConsonant()` and `isVowel()` discriminate the `Phoneme` union at runtime.

### 2.4 Rendering Strategy

- **CSS Grid** is used for both charts because the IPA chart is inherently a 2D matrix.
- **Sticky positioning** on header rows and left columns enables navigation within large grids on small screens.
- **Horizontal scroll** is enabled on narrow viewports rather than collapsing columns.
- **Color coding** uses a 5-color palette assigned by language index. Colors are passed via CSS custom properties (`--lang-color`).

### 2.5 Offline & PWA

- `src/service-worker.ts` implements a hybrid caching strategy:
  - Cache-first for the app shell (HTML, CSS, JS)
  - Network-first for other resources
- `static/manifest.webmanifest` provides PWA metadata for "Add to Home Screen."
- The static adapter ensures all routes are prerendered at build time.

## 3. Data Flow

```
ipa.ts (static data)
  │
  ▼
+page.svelte
  ├── assigns colors to languages
  ├── passes languages + consonantReference → ConsonantChart
  ├── passes languages + vowelReference → VowelChart
  └── renders rules section from languages[].rules
```

There is no state management library. All data flows top-down through Svelte component props. The app has no user-mutable state — it is a read-only reference.

## 4. Build & Deploy Pipeline

```
npm install
    │
    ▼
lint → format:check → svelte-check (type check)
    │
    ▼
vite build (with BASE_PATH env var)
    │
    ▼
Upload build/ artifact
    │
    ▼
GitHub Pages deployment
    ├── main branch → /{repo-name}/
    └── feature branches → /{repo-name}/{branch-slug}/
```

## 5. Extensibility Points

| What                   | Where to change                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Add a new language     | Append to `languages[]` in `ipa.ts`                                                              |
| Add a consonant place  | Add to `ConsonantPlace` type + `consonantPlaces` + `consonantPlaceLabels` + `consonantReference` |
| Add phonological rules | Add `rules` array to the language entry                                                          |
| Change color palette   | Modify `palette` array in `+page.svelte`                                                         |
| Add a new chart type   | Create a new component following ConsonantChart/VowelChart pattern                               |

## 6. Constraints & Trade-offs

- **No server**: All data is bundled at build time. Adding dynamic features (e.g., user-contributed languages) would require a backend.
- **No test framework**: Correctness relies on TypeScript strict mode + ESLint + build verification. Adding Vitest/Playwright would improve confidence.
- **Static language set**: The three languages are hardcoded in `ipa.ts`. The architecture supports more, but there's no runtime language loading.
- **CSS Grid over SVG**: The traditional IPA vowel chart is a trapezoid, but we use a rectangular grid for consistency and simplicity.
