import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { ui } from "../reducers/ui";
import { Loading } from "../components/Loading";
import { MovieDetails } from "./MovieDetails";
import { NotFound } from "./NotFound";

export const MoviePage = () => {
  const { id } = useParams();
  console.log({ id });
  const MOVIEDETAIL_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movieDetails, setMovieDetails] = useState({});

  const isLoading = useSelector((store) => store.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(`${MOVIEDETAIL_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setMovieDetails(json);
        dispatch(ui.actions.setLoading(false));
      });
  }, [id, MOVIEDETAIL_URL]);

  if (isLoading) {
    return <Loading />;
  } else if (movieDetails.id) {
    return (
      <MovieDetails
        backdrop_path={movieDetails.backdrop_path}
        poster_path={movieDetails.poster_path}
        title={movieDetails.title}
        vote_average={movieDetails.vote_average}
        overview={movieDetails.overview}
        genres={movieDetails.genres}
        runtime={movieDetails.runtime}
        imdb_id={movieDetails.imdb_id}
        id={movieDetails.id}
      />
    );
  } else {
    return <NotFound />;
  }
};
