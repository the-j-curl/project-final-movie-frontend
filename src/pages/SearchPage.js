import React, { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";
import { MovieListHeading, MovieListGrid } from "./MovieList";

export const SearchPage = () => {
  // const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&query=${searchMovie}&page=1&include_adult=false`;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&query=soul&page=1&include_adult=false`;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${SEARCH_URL}`)
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
  }, [SEARCH_URL]);

  if (isLoading) {
    return <Loading />;
  } else if (movies.length > 0) {
    return (
      <>
        <MovieListHeading>Search results</MovieListHeading>
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
