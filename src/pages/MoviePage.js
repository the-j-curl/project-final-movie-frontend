import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieDetails } from "../components/MovieDetails";
import { NotFound } from "./NotFound";

export const MoviePage = () => {
  const { id } = useParams();
  console.log({ id });
  const MOVIEDETAIL_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetch(`${MOVIEDETAIL_URL}`)
      .then(response => response.json())
      .then(json => {
        setMovieDetails(json);
      });
  }, [id, MOVIEDETAIL_URL]);

  if (movieDetails.id) {
    return (
      <MovieDetails
        backdropPath={movieDetails.backdrop_path}
        posterPath={movieDetails.poster_path}
        title={movieDetails.title}
        voteAverage={movieDetails.vote_average}
        overview={movieDetails.overview}
        genres={movieDetails.genres}
        runtime={movieDetails.runtime}
        imdbId={movieDetails.imdb_id}
        id={movieDetails.id}
        movieHomepage={movieDetails.homepage}
      />
    );
  } else {
    return <NotFound />;
  }
};
