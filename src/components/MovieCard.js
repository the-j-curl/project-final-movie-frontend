import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SmallWatchlistButton } from "../components/SmallWatchlistButton";

export const MovieCard = ({ title, release_date, poster_path, id }) => {
  return (
    <>
      <MovieThumb>
        <Link to={`/movies/${id}`}>
          <MovieThumbImage
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={title}
          />

          <MovieThumbInfo>
            <h2>{title}</h2>
            <p>Release date: {release_date}</p>
          </MovieThumbInfo>
        </Link>
        <SmallWatchlistButton movieId={id} />
      </MovieThumb>
    </>
  );
};

const MovieThumbInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
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
  flex: 1 0 40%;
  /* margin-right: 10px; */
  :a {
    width: 25%;
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
    flex: 1 0 33%;
  }
  @media (min-width: 1024px) {
    flex: 1 0 20%;
    /* margin-right: 20px; */
  }
`;

const MovieThumbImage = styled.img`
  width: 100%;
`;
