import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { LargeWatchlistButton } from "./LargeWatchlistButton";

export const WatchlistCard = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const MOVIEDETAIL_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;

  useEffect(() => {
    fetch(`${MOVIEDETAIL_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setMovieDetails(json);
      });
  }, [MOVIEDETAIL_URL]);

  return (
    <MovieWrapper>
      <MovieCard>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`}
        />
        <MovieText>
          <p>{movieDetails.title}</p>
          <p>{movieDetails.overview}</p>
          {movieDetails.imdb_id}
          {movieDetails.runtime}
          <LargeWatchlistButton movieId={movieId} />
        </MovieText>
      </MovieCard>
    </MovieWrapper>
  );
};

const MovieWrapper = styled.main`
  width: 100%;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MovieCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  width: 45%;
`;

const PosterImage = styled.img`
  border-radius: 10px;
`;

const MovieText = styled.div`
  width: 50%;
  border: 1px dotted red;
`;
