import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { LargeWatchlistButton } from "./LargeWatchlistButton";

export const WatchlistCard = ({
  movieId,
  onUpdateWatchlist,
  randomMovieId,
}) => {
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
    <MovieCard randomMovieId={randomMovieId} movieId={movieId}>
      <Link to={`/movies/${movieId}`}>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`}
        />{" "}
      </Link>
      <MovieText>
        <Link to={`/movies/${movieId}`}>
          <MovieTitle>{movieDetails.title}</MovieTitle>
        </Link>
        <MovieLength>
          {" "}
          <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}>
            <IMDBText>IMDb </IMDBText> {movieDetails.year}
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

export const MovieCard = styled.article`
  background-color: ${(props) =>
    props.randomMovieId === props.movieId
      ? "rgba(209, 35, 104, 0.9)"
      : "rgba(73, 71, 71, 0.3)"};
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
    margin: 6px 6px;
  }
`;

const PosterImage = styled.img`
  width: 90%;
  max-width: 150px;
  border-radius: 10px;
  border: 2px solid #000;
  &:hover {
    border: 2px solid #3f39fc;
    transition: all 0.3s ease-in;
  }
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

export const MovieTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-in;
  }
`;

export const MovieLength = styled.p`
  font-size: 14px;
  margin: 12px 0;
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

export const IMDBText = styled.span`
  color: #ffd700;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: 1px solid #ffd700;
    transition: all 0.3s ease-in;
  }
`;

export const MovieDescription = styled.p`
  display: none;
  font-family: "Roboto", sans-serif;
  @media (min-width: 768px) {
    overflow: hidden;
    overflow-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin: 4px 0 16px 0;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;
