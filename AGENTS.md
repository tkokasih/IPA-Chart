# Agent Guidelines for CashflowCast

Welcome! This project is primarily developed via Codex Server and frequently from a mobile device. To keep the collaboration smooth and accessible, please adhere to the following expectations whenever you work anywhere inside this repository:

1. **Collaborative Discovery First**
   - Before writing code, ask the user clarifying questions to confirm your understanding of the request.
   - When there are meaningful design choices to be made, offer at least three distinct implementation approaches (or variants) for the user to choose from before proceeding.

2. **Local Quality Gates**
   - After completing your implementation, always run the formatter and linter locally:
     - `npm run format`
     - `npm run lint`
   - Resolve any issues they surface before marking the task complete.

3. **Build Parity Checks**
   - Before finalising work, mirror the production build steps locally:
     - `npm run check`
     - `npm run build`
   - Address any failures from these commands so that the main-branch deployment remains stable.

4. **Progressive Web App Focus**
   - The application is deployed directly to the `main` branch and published through GitHub Pages. Keep deployments safe for immediate release.

5. **Text-Based Assets Preferred**
   - Whenever possible, avoid adding binary files (such as raster images). Favour vector or code-based assets that remain reviewable within Codex.

6. **Mobile-First Snapshots**
   - If you provide visual snapshots or screenshots for review, capture them using a mobile viewport (roughly 375px wide) to reflect the primary target experience.

Thank you for helping keep the workflow predictable and mobile-friendly!
