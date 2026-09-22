import { Router } from "express";
import { searchMovies, getMovieDetails } from "../controllers/movieController.js";

const router = Router();

router.get("/search", searchMovies);
router.get("/movies/:id", getMovieDetails);

export default router;
