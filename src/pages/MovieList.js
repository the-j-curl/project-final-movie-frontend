import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import { ui } from "../reducers/ui";
import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";

export const MovieList = () => {
  const { category } = useParams();
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  const isLoading = useSelector((store) => store.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(`${MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
        dispatch(ui.actions.setLoading(false));
      });
  }, [category, MOVIES_URL]);

  console.log(movies);

  if (isLoading) {
    return <Loading />;
  } else {
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
  }
};
