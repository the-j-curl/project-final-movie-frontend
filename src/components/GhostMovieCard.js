import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SmallWatchlistButton } from "./SmallWatchlistButton";

export const GhostMovieCard = () => {
  return (
    <>
      <MovieThumb>
        <GhostThumbWrapper>
          <GhostMovieThumbImage />
        </GhostThumbWrapper>
      </MovieThumb>
    </>
  );
};

const MovieThumb = styled.article`
  position: relative;
  flex: 1 0 40%;
  @media (min-width: 768px) {
    flex: 1 0 33%;
  }
  @media (min-width: 1024px) {
    flex: 1 0 20%;
    /* margin-right: 20px; */
  }
`;

const GhostThumbWrapper = styled.div`
  width: 95%;
`;

const GhostMovieThumbImage = styled.img`
  background: #3f39fc;
  width: 342px;
  height: 513px;
  margin-right: 10px;
`;
