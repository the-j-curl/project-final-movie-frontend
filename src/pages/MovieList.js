import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";
import { Heading } from "../components/ScrollLane";

export const MovieList = () => {
  const { category } = useParams();
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${MOVIES_URL}`)
      .then(res => res.json())
      .then(json => {
        if (json.results) {
          setMovies(json.results);
          setIsLoading(false);
        } else {
          setMovies([]);
          setIsLoading(false);
        }
      });
  }, [category, MOVIES_URL]);

  if (isLoading) {
    return <Loading />;
  } else if (movies.length > 0) {
    return (
      <>
        <MovieListHeading>{category}</MovieListHeading>
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

const MovieListHeading = styled(Heading)`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

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
