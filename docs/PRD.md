# Product Requirements Document (PRD)

## 1. Product Summary

**IPA Chart** is a mobile-first Progressive Web App that displays the International Phonetic Alphabet as an interactive reference, comparing the consonant and vowel inventories of Indonesian, Korean, and Arabic side by side on a shared grid.

**Target users**: Language learners, linguistics students, polyglots, and phonology researchers who want a quick, visual way to compare how different languages map onto the IPA.

## 2. Problem Statement

Standard IPA charts show the full alphabet but don't indicate which sounds belong to which language. Learners studying multiple languages must cross-reference separate sources to compare phoneme inventories. Existing tools are either desktop-only, single-language, or not available offline.

## 3. Goals

| Goal                      | Metric / Definition of Done                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| Quick phoneme lookup      | User can find any phoneme's IPA symbol, grapheme, and language membership in under 5 seconds        |
| Cross-language comparison | Consonant and vowel charts display all three languages simultaneously with clear visual distinction |
| Mobile-first experience   | Fully usable on a 375px viewport with touch-friendly interactions                                   |
| Offline access            | App works without network after first visit (PWA with service worker)                               |
| Zero-friction deployment  | Push to `main` auto-deploys; feature branches get preview URLs                                      |

## 4. Features

### 4.1 Consonant Chart

- Displays a grid of manner of articulation (rows) vs. place of articulation (columns)
- Each cell shows IPA reference symbols in gray plus color-coded phonemes for each language
- Grapheme annotations show how each language writes the sound (e.g., Korean ㅂ for /p/)
- Context tags indicate positional variants (e.g., "syllable-final", "loans")
- Sticky header row and left column for navigation during scroll

### 4.2 Vowel Chart

- Displays a grid of vowel height (rows) vs. backness (columns)
- Cells subdivided by rounding (unrounded / rounded)
- Same color-coded language overlay as the consonant chart
- Supports long vowel notation (e.g., Arabic /iː/, /uː/, /aː/)

### 4.3 Language Legend

- Color-coded key identifying each language
- Shows metadata: language name, variety (e.g., "Seoul" for Korean), script, and notes
- Positioned above the charts for immediate context

### 4.4 Notable Realisations

- Displays allophonic rules, distributional patterns, and phonotactic constraints
- Rendered as per-language cards (e.g., Indonesian e-ambiguity: /e/ → [e] in stressed syllables, [ə] in unstressed)
- Only shown if at least one language has rules defined

### 4.5 Progressive Web App

- Installable on mobile home screens
- Offline-capable after first load
- Fast: zero runtime dependencies, prerendered static HTML

## 5. Languages Supported

| Language   | Variety  | Script | Consonants | Vowels | Rules           |
| ---------- | -------- | ------ | ---------- | ------ | --------------- |
| Indonesian | Standard | Latin  | 23         | 6      | 1 (e-ambiguity) |
| Korean     | Seoul    | Hangul | 19         | 8      | 1 (aspiration)  |
| Arabic     | MSA      | Arabic | 20         | 6      | 0               |

## 6. Non-Functional Requirements

| Requirement     | Detail                                                       |
| --------------- | ------------------------------------------------------------ |
| Performance     | Static site; no server calls; loads in <1s on 3G after cache |
| Accessibility   | Semantic HTML, ARIA labels, color + text differentiation     |
| Browser support | Modern evergreen browsers (Chrome, Firefox, Safari, Edge)    |
| Responsiveness  | Mobile-first (375px baseline); scales to desktop             |
| Maintainability | TypeScript strict mode; ESLint + Prettier enforced in CI     |

## 7. Out of Scope (Current Version)

- Audio playback of phonemes
- User-contributed languages or phonemes
- Search / filter functionality
- Backend or database
- Authentication or user accounts
- Suprasegmentals (tone, stress, intonation charts)
- Traditional trapezoidal vowel chart rendering

## 8. Future Considerations

- **More languages**: The data model supports arbitrary languages; adding one is a data-only change.
- **Audio samples**: Could embed short audio clips for each phoneme.
- **Search**: A search bar to jump to a specific IPA symbol or grapheme.
- **Comparison mode**: Toggle languages on/off to focus on a subset.
- **SVG vowel trapezoid**: Render the vowel chart in the traditional IPA trapezoid shape.
- **Testing**: Add Vitest for unit tests and Playwright for e2e tests.
