import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import MovieDetails from "./MovieDetails";
// import { BackButton } from "../components/BackButton";
import NotFound from "./NotFound";

const MoviePage = () => {
  const { id } = useParams();
  console.log({ id });
  // const history = useHistory();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(json => {
        setMovieDetails(json);
      });
  }, [id]);

  if (movieDetails.id) {
    return <MovieDetails {...movieDetails} />;
  } else {
    return <NotFound />;
  }
};

export default MoviePage;
