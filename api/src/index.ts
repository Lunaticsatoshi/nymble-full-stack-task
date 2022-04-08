import express, { Request, Response } from "express";
import { genres, movies } from "./db";
import { Movie, Genre } from "./types";

const app = express();
const PORT = 5000;

/**
 * Return movies that match the 'search term' with movie 'title'.
 * If search term is not provided, return all movies.
 */
app.get("/movies", (req: Request, resp: Response) => {
  // req.params.search
  const query: string | null = req.params.search || "";
  try {
    if (query === "") {
      return resp.send(movies);
    }
    const results: Array<Movie> = movies.filter((movie) =>
      movie.title.includes(query)
    );

    return resp.send(results);
  } catch (err) {
    resp.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * Return all genres.
 */
app.get("/genres", (req: Request, resp: Response) => {
  return resp.send(genres);
});

/**
 * Return movies that match the provided ID.
 */
app.get("/movies/:id", (req, resp) => {
  try {
    const movie: Movie | undefined = movies.find(
      (movie) => movie.id === parseInt(req.params.id)
    );
    if (!movie) {
      return resp.status(404).send("Movie not found");
    }
    return resp.send(movie);
  } catch (e) {
    return resp.status(500).send({ message: "Something went wrong" });
  }
});

/**
 * Return genre that match the provided ID.
 */
app.get("/genres/:id", (req, resp) => {
  // TODO
  try {
    const id = Number(req.params.id);
    const genre: Genre | undefined = genres.find((genre) => genre.id === id);
    if (!genre) {
      return resp.status(404).send({ error: "Genre not found" });
    }
    return resp.send(genre);
  } catch (error) {
    return resp.status(500).send({ message: "Something went wrong" });
  }
});

/**
 * Add rating to a movie.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.post("/movies/:id/ratings", (req, resp) => {
  // TODO
  const ratingVal = req.body.ratingVal;
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return resp.status(404).send({ error: "Movie not found" });
  }
  const movieIndex = movies.indexOf(movie);
  movies[movieIndex].vote_count += 1;
  movies[movieIndex].vote_average =
    (movie.vote_average * (movie.vote_count - 1) + ratingVal) /
    movie.vote_count;
  return resp.send(movies);
});

/**
 * Sort the movie list by popularity.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.get("/movies/sort/popularity", (req, resp) => {
  // TODO
  try {
    const movieListCopy: Array<Movie> = [...movies];
    movieListCopy.sort(
      (a, b) =>
        parseFloat(String(b.popularity)) - parseFloat(String(a.popularity))
    );
    return resp.send(movieListCopy);
  } catch (error) {
    return resp.status(500).send({ message: "Something went wrong" });
  }
});

/**
 * Filter the movie list by genre.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.get("/movies/filter/:genre", (req, resp) => {
  // TODO
  try {
    const genre: string = req.params.genre;
    const movieListCopy: Array<Movie> = [...movies];
    const filteredMovies: Array<Movie> = [];
    const genreId: number | undefined = genres.find(
      (genreItem) => genreItem.name === genre
    )?.id;
    if (genreId) {
      movieListCopy.forEach((movie) => {
        if (movie.genre_ids.includes(genreId)) {
          filteredMovies.push(movie);
        }
      });
    }
    return resp.send(filteredMovies);
  } catch (error) {
    return resp.status(500).send({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
