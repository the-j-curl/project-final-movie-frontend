import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";
import { MovieListHeading, MovieListGrid } from "./MovieList";

export const SearchPage = () => {
  const isLoading = useSelector(store => store.ui.isLoading);
  const movies = useSelector(store => store.movies.movies);

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
  } else if (movies.length <= 0 || !movies) {
    return <Redirect to="/" />;
  } else {
    return <NotFound />;
  }
};
