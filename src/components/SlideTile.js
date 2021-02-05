import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const SlideTile = ({ movieTitle, movieId, backdropPath }) => {
  return (
    <>
      <SlideContentContainer>
        <Link to={`/movies/${movieId}`}>
          <H3>{movieTitle}</H3>
        </Link>
        <Image src={`https://image.tmdb.org/t/p/w780/${backdropPath}`} />
      </SlideContentContainer>
    </>
  );
};

const SlideContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 1024px) {
    align-items: center;
  }
`;

const H3 = styled.h3`
  font-size: 14px;
  margin: 4px 0 8px 0;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Image = styled.img`
  width: 100%;

  @media (min-width: 1024px) {
    width: 780px;
  }
`;
