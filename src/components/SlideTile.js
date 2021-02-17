import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const SlideTile = ({ movieTitle, movieId, backdropPath }) => {
  return (
    <SlideContentContainer>
      <SlideOverlay>
        <Link to={`/movies/${movieId}`}>
          <OverlayTextWrapper>
            <SlideOverlayText>{movieTitle}</SlideOverlayText>
          </OverlayTextWrapper>
        </Link>
        <Image src={`https://image.tmdb.org/t/p/w780/${backdropPath}`} />
      </SlideOverlay>
    </SlideContentContainer>
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

const OverlayTextWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  width: auto;
  background-color: rgba(22, 21, 21, 0.7);
  padding: 4px;
  max-width: 95%;

  @media (min-width: 768px) {
    padding: 6px;
    bottom: 25px;
    left: 25px;
    max-width: 80%;
  }
`;

const SlideOverlayText = styled.h3`
  font-size: 14px;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid transparent;

  @media (min-width: 768px) {
    font-size: 16px;
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
