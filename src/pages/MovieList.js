import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import MovieCard from "../components/MovieCard";

const MovieList = () => {
  const { category } = useParams();
  // const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(json => setMovies(json.results));
  }, [category]);

  return (
    <>
      <h1>{category}</h1>
      <main className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </main>
    </>
  );
};

export default MovieList;
