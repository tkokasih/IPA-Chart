# Template PWA Mobile

A mobile-first [SvelteKit](https://kit.svelte.dev/) Progressive Web App template ready to deploy to
GitHub Pages. It combines an offline-capable service worker, a responsive starter UI, and a
pre-configured Actions workflow so you can focus on building product features.

## Features

- ⚡️ SvelteKit 2 with TypeScript and Prettier/ESLint already wired up
- 📱 Mobile-first landing page that scales nicely to larger screens
- 📦 Static adapter configured for GitHub Pages with branch preview support
- 🔋 Offline-ready service worker and web app manifest
- 🤖 GitHub Actions workflow that lint/check/builds before deploying

## Getting started

```bash
npm install
npm run dev -- --open
```

The dev server runs on [http://localhost:5173](http://localhost:5173). Edit files inside `src/` and
SvelteKit will hot-reload the changes.

## Available scripts

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                             |
| `npm run lint`    | Lint Svelte and TypeScript files with ESLint          |
| `npm run format`  | Format the project using Prettier                     |
| `npm run check`   | Run SvelteKit sync and type-check the project         |
| `npm run build`   | Generate a production build in the `build/` directory |
| `npm run preview` | Preview the production build locally                  |

## Progressive Web App setup

- `static/manifest.webmanifest` defines the application metadata and icons.
- `src/service-worker.ts` caches the app shell for repeat visits and offline usage.
- `svelte.config.js` enables automatic service worker registration and configures the static adapter.

When you run `npm run build`, the generated assets are safe to host from GitHub Pages.

## Continuous deployment

The included workflow at `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages.
Non-`main` branches receive preview URLs scoped to the branch name so you can share WIP builds.

To customise the deployment base path, update the `BASE_PATH` environment variable in the workflow or
set it manually before running `npm run build`.
