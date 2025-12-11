# VerbumDei Web

A SvelteKit progressive web app for the Verbum Dei project. The frontend consumes the `verbumdei-api` service and expects its base URL in `VITE_API_URL`.

## Requirements
- Node.js 20+
- pnpm 9+

## Quickstart
```bash
pnpm install
# set your API endpoint before starting the dev server
export VITE_API_URL="https://api.example.com"
pnpm dev
```
The app runs on <http://localhost:5173> by default. If you prefer npm, replace `pnpm` with `npm run` equivalents.

## Useful scripts
- `pnpm build` — create a production build with Vite.
- `pnpm preview` — serve the built app locally for smoke testing.
- `pnpm lint` — run ESLint against the project.
- `pnpm typecheck` — run SvelteKit sync and TypeScript checks.

## Environment variables
Create a `.env` or `.env.local` file if you do not want to export variables manually. At minimum set:
```dotenv
VITE_API_URL=https://api.example.com
```
