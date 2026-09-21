# Movie Finder API

RESTful server built with Node.js, Express 5, Axios, and dotenv. It proxies the OMDb (Open Movie Database) API.

## Setup

1. Get a free key at http://www.omdbapi.com/apikey.aspx.
2. Create a `.env` file in the project root:

   ```env
   PORT=3000
   OMDB_API_KEY=your_key_here
   ```

3. Install and run:

   ```bash
   pnpm install
   pnpm dev    # nodemon server.js
   pnpm start  # node server.js
   ```

## Endpoints

| Method | Endpoint               | Description                  | Example                          |
| ------ | ---------------------- | ---------------------------- | -------------------------------- |
| GET    | `/api/search?title=`   | Search movies by title       | `/api/search?title=batman`       |
| GET    | `/api/search?title=&page=` | Search with pagination   | `/api/search?title=batman&page=2`|
| GET    | `/api/movies/:id`      | Movie details by IMDb ID     | `/api/movies/tt1285016`          |

Error responses:

- `400 { "error": "Title query parameter is required" }` when `title` is missing.
- `404 { "error": "<OMDb Error>" }` when OMDb returns `Response: "False"`.
- `500` on unexpected failures.

## OMDb Parameter Reference

### By ID or Title

| Parameter | Required | Valid Options        | Default | Description                          |
| --------- | -------- | -------------------- | ------- | ------------------------------------ |
| `i`       | Optional*| —                    | empty   | A valid IMDb ID (e.g. tt1285016)     |
| `t`       | Optional*| —                    | empty   | Movie title to search for            |
| `type`    | No       | movie, series, episode | empty | Type of result to return             |
| `y`       | No       | —                    | empty   | Year of release                      |
| `plot`    | No       | short, full          | short   | Return short or full plot            |
| `r`       | No       | json, xml            | json    | The data type to return              |
| `callback`| No       | —                    | empty   | JSONP callback name                  |
| `v`       | No       | —                    | 1       | API version (reserved for future use) |

_* Both `i` and `t` are optional, but at least one is required._

### By Search

| Parameter | Required | Valid Options        | Default | Description                          |
| --------- | -------- | -------------------- | ------- | ------------------------------------ |
| `s`       | Yes      | —                    | empty   | Movie title to search for            |
| `type`    | No       | movie, series, episode | empty | Type of result to return             |
| `y`       | No       | —                    | empty   | Year of release                      |
| `r`       | No       | json, xml            | json    | The data type to return              |
| `page`    | No       | 1–100                | 1       | Page number to return                |
| `callback`| No       | —                    | empty   | JSONP callback name                  |
| `v`       | No       | —                    | 1       | API version (reserved for future use) |

## Project Structure

```text
server.js
routes/movieRoutes.js
controllers/movieController.js
.env
```
