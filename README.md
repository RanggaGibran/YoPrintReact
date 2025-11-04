# YoPrintAnime

YoPrintAnime is a modern instant-search experience for anime fans built with React, TypeScript, Redux Toolkit, and Vite. It consumes the public Jikan API to surface thousands of anime titles with rich detail views and fast navigation.

## ✨ Core capabilities
- **Instant search results** that update while typing, powered by a 250 ms debounced query.
- **Network-friendly API orchestration** with in-flight request cancellation for rapid input changes.
- **Server-side pagination** wired to Jikan's pagination metadata, with intuitive navigation controls.
- **Immersive detail pages** featuring hero imagery, stats, genres, and trailers when available.
- **Polished UI/UX** including glassmorphism styling, responsive layouts, and skeleton loaders to smooth transitions.

## 🛠️ Tech stack
- React 18 with functional components and hooks
- TypeScript with strict compiler settings
- Redux Toolkit + React Redux for state management
- React Router DOM for client-side routing
- Vite 5 for bundling and dev tooling
- ESLint with `@typescript-eslint` ruleset

## 🚀 Getting started
```powershell
npm install
npm run dev
```
The development server automatically binds to **http://localhost:4000**.

### Helpful scripts
- `npm run lint` – static analysis across `src/**/*.{ts,tsx}`
- `npm run build` – type-check and create an optimized production bundle
- `npm run preview` – serve the production build locally on port 4000

## 🧩 Architecture highlights
- **State slices**: `search` manages query text, pagination, results, and error states; `detail` handles rich anime metadata.
- **Async workflows**: `createAsyncThunk` orchestrates API calls with module-level `AbortController` instances to ensure stale requests are cancelled.
- **UI composition**: Reusable components (`SearchBar`, `AnimeCard`, `Pagination`, `SkeletonCard`, etc.) keep layout tidy and accessible.
- **Styling**: A single `global.css` file establishes design tokens, gradients, and responsive breakpoints without external UI libraries.
- **No environment configuration**: All API endpoints are hard-coded so the app runs without `.env` setup.

## 🌐 API usage
All data comes from the public [Jikan REST API](https://docs.api.jikan.moe/). Search queries hit `/v4/anime` with SFW filtering, ordering, and page parameters; detail pages use `/v4/anime/:id/full`.

## 📦 Deployment checklist
- Host the contents of `dist/` on Netlify, Vercel, or a static hosting provider of choice.
- Ensure the production app is reachable and add the public URL here:
  - **Live demo**: _add your deployed link_

## ✅ Quality gates
- `npm run lint`
- `npm run build`

## 📝 Notes
- Transitive npm advisories are currently reported as moderate by `npm audit`; review and patch if your deployment security policy requires it.
- The UI is designed in English as requested and omits non-essential code comments for a clean production feel.
