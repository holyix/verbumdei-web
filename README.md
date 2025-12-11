# VerbumDei Web

## Project design
- **Vision:** Verbum Quest is a Catholic quiz journey through Salvation History (Creation → Prophets → Christ → Church → Doctrine) with medals and progressive unlocking.
- **Purpose:** Teach Bible, Catechism, and key Church documents in an engaging, catechetical way.
- **Form factor:** Web-first PWA, later mobile wrapper; offline-friendly with installable shell and static art assets.
- **Stack:** SvelteKit + TypeScript frontend; Rust (Axum) backend; MongoDB for questions/progress; Docker for deploy; assets as static `.webp`.
- **Future ideas:** Verbum API integration, semantic graph (Neo4j), seasonal editions (Advent, Lent, Pentecost).

SvelteKit PWA for the Verbum Dei project. The app can talk to the backend via `VITE_API_URL`.

## Prerequisites
- Node 18+ and npm 9+ (matches the `package-lock.json`)

## Quickstart
```bash
npm install
npm run dev -- --open
```

## Scripts
- `npm run build` — production build
- `npm run preview` — run the built app locally
- `npm run lint` — lint Svelte/TypeScript
- `npm run typecheck` — SvelteKit sync + TypeScript check

## Environment
Create a `.env` file if you need to point the app at an API:
```bash
VITE_API_URL=https://your-api.example.com
```
