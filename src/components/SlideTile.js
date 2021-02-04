import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const SlideTile = ({ movieTitle, movieId, backdropPath }) => {
  return (
    <SlideImageContainer>
      <h3>{movieTitle}</h3>
      <Link to={`/movies/${movieId}`}>
        <Image src={`https://image.tmdb.org/t/p/w780/${backdropPath}`} />
      </Link>
    </SlideImageContainer>
  );
};

const SlideImageContainer = styled.div`
  width: 280px;
  @media (min-width: 1024px) {
    margin: 0 100px;
    width: 100%;
  }
`;

const Image = styled.img`
  width: 90%;

  @media (min-width: 768px) {
    width: 700px;
  }

  @media (min-width: 1024px) {
    width: 780px;
  }
`;
