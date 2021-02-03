import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";

export const MovieList = () => {
  const { category } = useParams();
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${MOVIES_URL}`)
      .then(res => res.json())
      .then(json => {
        if (json.results) {
          setMovies(json.results);
        } else {
          setMovies([]);
        }
      });
  }, [category, MOVIES_URL]);

  if (movies.length > 0) {
    return (
      <>
        <h1>{category}</h1>
        <MovieListGrid>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              id={movie.id}
            />
          ))}
        </MovieListGrid>
      </>
    );
  } else {
    return <NotFound />;
  }
};

const MovieListGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
