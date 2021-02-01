import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { LargeWatchlistButton } from "../components/LargeWatchlistButton";

import { BackButton } from "../components/BackButton";
import { IMDBText, MovieTitle, MovieLength } from "../components/WatchlistCard";

export const MovieDetails = ({
  backdrop_path,
  poster_path,
  title,
  vote_average,
  overview,
  genres,
  runtime,
  imdb_id,
  id,
  movieHomepage,
}) => {
  const history = useHistory();

  return (
    <MovieDetailsWrapper
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("https://image.tmdb.org/t/p/w1280/${backdrop_path}")`,
      }}
    >
      <BackButton className="movies-back-button" history={history} />
      <MovieDetailsContainer>
        <A href={`${movieHomepage}`}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={title}
          />{" "}
        </A>
        <MovieDetailsText>
          <MovieTitle>
            {title}
            <Rating>Rating: {vote_average}/10</Rating>
          </MovieTitle>
          <MovieLength>
            <a href={`https://www.imdb.com/title/${imdb_id}/`}>
              <IMDBText>IMDB</IMDBText>
            </a>{" "}
            | {runtime} mins
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
  border-radius: 10px;
  max-width: 400px;
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
  font-size: 15px;
  margin: 12px 0 0 0;
  @media (min-width: 1024px) {
    font-size: 16px;
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
