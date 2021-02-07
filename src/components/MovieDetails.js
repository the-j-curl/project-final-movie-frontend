import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { LargeWatchlistButton } from "./LargeWatchlistButton";
import { BackButton } from "./BackButton";
import { IMDBText, MovieTitle, MovieLength } from "./WatchlistCard";

export const MovieDetails = ({
  backdropPath,
  posterPath,
  title,
  voteAverage,
  overview,
  genres,
  runtime,
  imdbId,
  id,
  movieHomepage,
}) => {
  const history = useHistory();

  return (
    <MovieDetailsWrapper
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("https://image.tmdb.org/t/p/w1280/${backdropPath}")`,
      }}>
      <BackButton className="movies-back-button" history={history} />
      <MovieDetailsContainer>
        <A href={`${movieHomepage}`}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
            alt={title}
          />{" "}
        </A>
        <MovieDetailsText>
          <MovieTitle>
            {title}
            <Rating>Rating: {voteAverage}/10</Rating>
          </MovieTitle>
          <MovieLength>
            <a href={`https://www.imdb.com/title/${imdbId}/`}>
              <IMDBText>IMDB</IMDBText>
            </a>{" "}
            | {runtime} mins
          </MovieLength>

          <LargeWatchlistButton movieId={id} />
          <MovieDetailsDescription>{overview}</MovieDetailsDescription>
          <Genres>
            {genres.map((item) => (
              <GenresLi key={item.id}>{item.name}</GenresLi>
            ))}
          </Genres>
        </MovieDetailsText>
      </MovieDetailsContainer>
    </MovieDetailsWrapper>
  );
};

const MovieDetailsWrapper = styled.section`
  min-height: 80vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 768px) {
    padding: 10px;
  }
`;

const MovieDetailsContainer = styled.article`
  color: #fff;
  display: flex;
  align-content: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 830px;
  }
`;

const MoviePoster = styled.img`
  border: 2px solid #fff;
  width: 70%;
  max-width: 400px;
  border-radius: 10px;
  margin: 14px 0;
  :hover {
    border-color: #3f39fc;
    transition: all 0.3s ease-in;
  }
  @media (min-width: 768px) {
    width: 90%;
    margin: 0;
  }
`;

const MovieDetailsText = styled.div`
  background-color: rgba(22, 21, 21, 0.7);
  padding: 5px;
  width: 90%;
  margin: 10px auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    width: 50%;
    align-items: flex-start;
  }
  @media (min-width: 1024px) {
    padding: 15px;
  }
`;

const A = styled.a`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Rating = styled.span`
  color: #fd8a06;
  margin-left: 10px;
  font-size: 16px;
`;

const MovieDetailsDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin: 12px 0 0 0;
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const Genres = styled.ul`
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
`;

const GenresLi = styled.li`
  display: inline;
  margin: 8px 8px 0 0;
  background-color: rgba(17, 69, 226, 0.7);
  padding: 4px 2px;
  font-size: 14px;
`;
