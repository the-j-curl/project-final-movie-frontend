import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components/macro";

import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { NotFound } from "./NotFound";
import { Heading } from "../components/ScrollLane";

export const MovieList = () => {
  const { category } = useParams();
  const isLoading = useSelector(store => store.ui.isLoading);
  const nowPlayingMovies = useSelector(
    store => store.movies.movies.nowPlayingMovies
  );
  const topRatedMovies = useSelector(
    store => store.movies.movies.topRatedMovies
  );
  const upcomingMovies = useSelector(
    store => store.movies.movies.upcomingMovies
  );
  const popularMovies = useSelector(store => store.movies.movies.popularMovies);

  // Function capitalises first letter and replaces underscore with a space
  const capitalizeFirstLetter = category => {
    const editCategory = category.replace("_", " ");
    return editCategory[0].toUpperCase() + editCategory.slice(1);
  };

  let movieList = [];

  if (category === "now_playing") {
    movieList = nowPlayingMovies;
  } else if (category === "top_rated") {
    movieList = topRatedMovies;
  } else if (category === "upcoming") {
    movieList = upcomingMovies;
  } else if (category === "popular") {
    movieList = popularMovies;
  }

  if (isLoading) {
    return <Loading />;
  } else if (movieList.length > 0) {
    return (
      <>
        <MovieListHeading>{capitalizeFirstLetter(category)}</MovieListHeading>
        <MovieListGrid>
          {movieList.map(movie => (
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
  } else if (movieList.length === 0) {
    return <Redirect to="/" />;
  } else {
    return <NotFound />;
  }
};

export const MovieListHeading = styled(Heading)`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

export const MovieListGrid = styled.section`
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
