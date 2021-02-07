import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const SlideTile = ({ movieTitle, movieId, backdropPath }) => {
  return (
    <>
      <SlideContentContainer>
        <SlideOverlay>
          <Link to={`/movies/${movieId}`}>
            <SlideOverlayText>{movieTitle}</SlideOverlayText>
          </Link>
          <Image src={`https://image.tmdb.org/t/p/w780/${backdropPath}`} />
        </SlideOverlay>
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

const SlideOverlay = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 1024px) {
    width: 780px;
  }
`;

const SlideOverlayText = styled.h3`
  max-width: 95%;
  background-color: rgba(22, 21, 21, 0.7);
  padding: 5px;
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-size: 14px;
  margin: 0;
  border-bottom: 1px solid transparent;
  @media (min-width: 768px) {
    max-width: 80%;
    font-size: 20px;
    padding: 8px;
    bottom: 25px;
    left: 25px;
  }

  @media (min-width: 1024px) {
    :hover {
      border-bottom: 1px solid #fff;
      transition: all 0.3s ease-in;
    }
  }
`;

const Image = styled.img`
  width: 100%;

  @media (min-width: 1024px) {
    width: 780px;
  }
`;
