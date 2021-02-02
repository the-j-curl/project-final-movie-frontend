import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { ui } from "../reducers/ui";
import { LargeWatchlistButton } from "./LargeWatchlistButton";

export const WatchlistCard = ({ movieId, onUpdateWatchlist }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const MOVIEDETAIL_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(ui.actions.setLoading(true));
    fetch(`${MOVIEDETAIL_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setMovieDetails(json);
        // dispatch(ui.actions.setLoading(false));
      });
  }, [MOVIEDETAIL_URL]);

  return (
    <MovieCard>
      <PosterImage
        src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`}
      />
      <MovieText>
        <MovieTitle>{movieDetails.title}</MovieTitle>
        <MovieLength>
          {" "}
          <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}>
            {/* <IMDBImage src="../images/imdb-image.png" alt="imdb logo" /> */}
            <YellowText>IMDb </YellowText> {movieDetails.year}
          </a>{" "}
          | {movieDetails.runtime} mins
        </MovieLength>
        <MovieDescription>{movieDetails.overview}</MovieDescription>

        <LargeWatchlistButton
          movieId={movieId}
          onUpdateWatchlist={onUpdateWatchlist}
        />
      </MovieText>
    </MovieCard>
  );
};

const MovieCard = styled.article`
  background-color: rgba(73, 71, 71, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 350px;
  padding: 6px 4px;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    width: 80%;
    max-width: 800px;
  }
  @media (min-width: 1024px) {
    width: 48%;
    padding: 8px 4px;
    max-width: 500px;
    margin: 6px 4px;
  }
`;

const PosterImage = styled.img`
  width: 40%;
  max-width: 150px;
  border-radius: 10px;
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 55%;
  height: 200px;
  padding: 2px;
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 768px) {
    width: 65%;
  }
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const MovieDescription = styled.p`
  display: none;
  @media (min-width: 768px) {
    overflow: hidden;
    overflow-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin: 4px 0 16px 0;
  }
`;

const IMDBImage = styled.img`
  width: 50px;
`;

const YellowText = styled.span`
  color: gold;
  font-weight: 600;
`;

const MovieLength = styled.p`
  font-size: 14px;
  margin: 10px 0 0 0;
`;
