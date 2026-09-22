import axios from "axios";

const OMDB_BASE_URL = "http://www.omdbapi.com/";

export const searchMovies = async (req, res) => {
  const { title, year, type, page } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    // This is like a translator from our params and the api params
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        s: title,
        // correct way if I have optional params
        ...(year && { y: year }),
        ...(type && { type: type }),
        ...(page && { page: page }),
        apikey: process.env.OMDB_API_KEY,
      },
    });

    // OMDb always answer with http 200, even if fails, but when fail it returns a "False" string
    //  Ex. { "Response": "False", "Error": "Movie not found!" }
    if (response.data.Response === "False") {
      return res.status(404).json({ error: response.data.Error });
    }

    // if "True" { "Response": "True", "Search": [...] }
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        i: id,
        apikey: process.env.OMDB_API_KEY,
      },
    });

    if (response.data.Response === "False") {
      return res.status(404).json({ error: response.data.Error });
    }

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch movie details" });
  }
};
