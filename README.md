# Movie Finder API

## Scenario

You are a junior backend developer at a new startup creating a movie review website. Your first task is to build the core of the backend: a "Movie Finder" API. This API stores no data itself; instead, it acts as an intermediary, fetching movie information from the public OMDb database and returning cleaned-up, relevant JSON to the future front-end application.

This project tests core backend skills: structuring a server, handling routes, interacting with an external service, and managing configuration securely.

## RESTful Principles

- **Client-Server:** the front-end only needs to know the endpoint URI (e.g. `/api/search`); client and server evolve independently.
- **Statelessness:** every request carries all needed info (`?title=`, `:id`); the server stores no client state between requests.
- **Uniform Interface:**
  - Resource-based URLs with nouns, not verbs. Good: `/api/movies/:id`. Bad: `/api/getMovieDetails`.
  - HTTP verbs: this API uses `GET` only (retrieve a resource).
  - Standard representation: requests and responses are JSON.

## Stack

- Node.js ESM (`"type": "module"`), Express 5, Axios, dotenv, nodemon (dev only).
- Package manager: pnpm.
- Port: `process.env.PORT || 3000`.

### Why Axios over fetch here

- **Query string:** `axios.get(url, { params: { s: title, y: year } })` builds `?s=...&y=...` automatically and skips `undefined` optionals. With `fetch` you build `URLSearchParams` by hand.
- **JSON parsing:** Axios gives you `response.data` already parsed. With `fetch` you need two steps: `await fetch(url)` + `await res.json()`.
- **Error flow:** Axios throws on non-2xx HTTP status, so failures land in your `catch` → `500`. With `fetch` you must check `if (!response.ok)` yourself.
- **Caveat:** OMDb returns HTTP 200 even on failure, with `{ "Response": "False", "Error": "..." }`. Both clients need the manual `if (data.Response === "False")` check → translated to `404` in the controllers.
- **Bottom line:** Axios means less boilerplate for this proxy. `fetch` is native with zero dependencies and is equally valid for a lightweight production service.

## Setup

1. Get a free key at http://www.omdbapi.com/apikey.aspx (FREE plan, key arrives by email).
2. Create a `.env` file in the project root:

   ```env
   PORT=3000
   OMDB_API_KEY=your_key_here
   ```

3. Make sure `.env` and `node_modules/` are listed in `.gitignore`. Never hardcode or commit the key.

## API Usage

All movie routes are mounted under `/api` (see `server.js`).

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/search?title=` | Search movies by title |
| GET | `/api/search?title=&year=&type=&page=` | Search with optional filters |
| GET | `/api/movies/:id` | Movie details by IMDb ID |

Optional search filters map to OMDb as `year → y`, `type → type` (`movie\|series\|episode`), `page → page` (`1–100`).

### Try in your browser

Paste these into the address bar with the server running on port 3000:

```
http://localhost:3000/api/search?title=batman
http://localhost:3000/api/search?title=batman&year=2005&type=movie&page=2
http://localhost:3000/api/movies/tt0372784
```

Error cases to try:

```
http://localhost:3000/api/search
http://localhost:3000/api/search?title=zxqwyv12345
http://localhost:3000/api/movies/tt0000000
```

## Error responses

- `400 { "error": "Title query parameter is required" }` when `title` is missing.
- `404 { "error": "<OMDb Error>" }` when OMDb returns `Response: "False"`.
- `500 { "error": "Failed to fetch movies" }` or `{ "error": "Failed to fetch movie details" }` on unexpected failures.

## OMDb Parameter Reference

### By ID or Title

| Parameter | Required | Valid Options | Default | Description |
| --------- | -------- | ------------- | ------- | ----------- |
| `i` | Optional* | — | empty | A valid IMDb ID (e.g. tt1285016) |
| `t` | Optional* | — | empty | Movie title to search for |
| `type` | No | movie, series, episode | empty | Type of result to return |
| `y` | No | — | empty | Year of release |
| `plot` | No | short, full | short | Return short or full plot |
| `r` | No | json, xml | json | The data type to return |
| `callback` | No | — | empty | JSONP callback name |
| `v` | No | — | 1 | API version (reserved for future use) |

_* Both `i` and `t` are optional, but at least one is required._

### By Search

| Parameter | Required | Valid Options | Default | Description |
| --------- | -------- | ------------- | ------- | ----------- |
| `s` | Yes | — | empty | Movie title to search for |
| `type` | No | movie, series, episode | empty | Type of result to return |
| `y` | No | — | empty | Year of release |
| `r` | No | json, xml | json | The data type to return |
| `page` | No | 1–100 | 1 | Page number to return |
| `callback` | No | — | empty | JSONP callback name |
| `v` | No | — | 1 | API version (reserved for future use) |

## Project Structure

```text
server.js
routes/movieRoutes.js
controllers/movieController.js
.env
```
