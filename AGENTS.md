# Movie Finder API — Agent Instructions

## Stack
- Node.js ESM (`"type": "module"`), Express 5, Axios, dotenv, nodemon.
- Package manager: pnpm.
- Port: `process.env.PORT || 3000`.

## Project Structure (do not change)
- `server.js` — entry point. dotenv first, `express.json()`, mount `/api`.
- `routes/movieRoutes.js` — Router only, no business logic.
- `controllers/movieController.js` — OMDb logic only, using axios.

## OMDb API (operational summary)
- Base URL: `http://www.omdbapi.com/`
- Key from `process.env.OMDB_API_KEY`. Never log or commit the key.
- Search: `GET ?s={title}&apikey=KEY`
- Details: `GET ?i={imdbID}&apikey=KEY`
- Full parameter reference lives in `README.md`. Do not duplicate it here.

## API Contracts
- `GET /api/search?title=<term>` → `searchMovies`
  - 400 `{ "error": "Title query parameter is required" }` when `title` is missing.
  - 404 `{ "error": "<OMDb Error>" }` when OMDb returns `Response: "False"`.
  - 500 `{ "error": "Failed to fetch movies" }` on unexpected failure.
- `GET /api/movies/:id` → `getMovieDetails`
  - 404 when OMDb returns `Response: "False"`.
  - 500 `{ "error": "Failed to fetch movie details" }` on unexpected failure.
- Always use `try...catch` in controllers. Always respond with JSON.

## Conventions
- ESM `import`/`export` only, no `require`.
- Routes import controllers via `../controllers/movieController.js`.
- Keep responses thin: forward OMDb JSON directly.

## Commands
- `pnpm install` — install dependencies
- `pnpm dev` — run with nodemon (`server.js`)
- `pnpm start` — run with node (`server.js`)
