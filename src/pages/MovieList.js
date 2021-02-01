import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";

export const MovieList = () => {
  const { category } = useParams();
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => setMovies(json.results));
  }, [category, MOVIES_URL]);

  console.log(movies);

  if (movies) {
    return (
      <>
        <h1>{category}</h1>
        <main className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </main>
      </>
    );
  } else {
    return <NotFound />;
  }
};
