import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { MovieReviews } from "./MovieReviews";
import { LargeWatchlistButton } from "./LargeWatchlistButton";
import { BackButton } from "./BackButton";
import { MovieCast } from "./MovieCast";
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
    <>
      <MovieDetailsWrapper
        style={
          backdropPath
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("https://image.tmdb.org/t/p/w1280/${backdropPath}")`,
              }
            : {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("../images/cinema-image.jpg")`,
              }
        }
      >
        <BackButton className="movies-back-button" history={history} />
        <MovieDetailsContainer>
          <A href={`${movieHomepage}`}>
            <MoviePoster
              src={
                posterPath
                  ? `https://image.tmdb.org/t/p/w342/${posterPath}`
                  : `../images/dummy-posterPath-image.jpg`
              }
              alt={title}
            />{" "}
          </A>
          <MovieDetailsText>
            <MovieDetailsTitle>{title}</MovieDetailsTitle>
            <MovieLength>
              <a href={`https://www.imdb.com/title/${imdbId}/`}>
                <IMDBText>IMDB</IMDBText>
              </a>{" "}
              | {runtime} mins |<Rating>Rating: {voteAverage}/10</Rating>
            </MovieLength>

            <LargeWatchlistButton movieId={id} />
            <MovieDetailsDescription>{overview}</MovieDetailsDescription>
            <Genres>
              {genres.map(item => (
                <GenresLi key={item.id}>{item.name}</GenresLi>
              ))}
            </Genres>
          </MovieDetailsText>
        </MovieDetailsContainer>
        <MovieCast movieId={id} />
      </MovieDetailsWrapper>
      <MovieReviews movieId={id} />
    </>
  );
};

export const MovieDetailsWrapper = styled.section`
  min-height: 74vh;
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

  @media (min-width: 1024px) {
    margin: 10px 0;
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
    width: 55%;
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

export const MovieDetailsTitle = styled(MovieTitle)`
  border-bottom: unset;
  :hover {
    border-bottom: unset;
  }
`;

const Rating = styled.span`
  color: #fd8a06;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const MovieDetailsDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin: 12px 0 0 0;
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
