import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SmallWatchlistButton } from "../components/SmallWatchlistButton";
import { MovieTitle } from "../components/WatchlistCard";

export const MovieCard = ({ title, releaseDate, posterPath, id }) => {
  return (
    <>
      <MovieThumb>
        <Link to={`/movies/${id}`}>
          <MovieThumbImage
            src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
            alt={title}
          />

          <MovieThumbInfo>
            <MovieTitle>{title}</MovieTitle>
            <MovieCardP>Release date: {releaseDate}</MovieCardP>
          </MovieThumbInfo>
        </Link>
        <SmallWatchlistButton movieId={id} />
      </MovieThumb>
    </>
  );
};

const MovieThumbInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 95%;
  color: #fff;
  position: absolute;
  top: 50%;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  transition: all 0.5s ease-in-out;
`;

const MovieThumb = styled.article`
  position: relative;
  flex: 1 0 40%; // flex-basis shorthand
  :a {
    width: 25%; // TO-DO What does this :a style?
    color: #fff;
    text-decoration: none;
  }
  &:hover ${MovieThumbInfo} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px 10px;
  }
  @media (min-width: 768px) {
    flex: 1 0 23%;
  }
  @media (min-width: 1024px) {
    flex: 1 0 15%;
  }
`;

const MovieThumbImage = styled.img`
  width: 90%;
  @media (min-width: 1024px) {
    width: 95%;
  }
`;

const MovieCardP = styled.p`
  font-size: 14px;
`;
