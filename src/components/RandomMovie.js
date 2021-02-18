import React from "react";
import styled from "styled-components/macro";

import { NavButton } from "./NavBar";

export const RandomMovie = ({ onClickRandom }) => {
  return (
    <RandomMovieButton onClick={onClickRandom}>
      Select Random Movie
    </RandomMovieButton>
  );
};

const RandomMovieButton = styled(NavButton)`
  background: #d12368;
  width: 200px;
  padding: 8px 8px;
  border-radius: 50px;
`;
