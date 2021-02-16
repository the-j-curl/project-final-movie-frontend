import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { BackButton } from "../components/BackButton";

export const NotFound = () => {
  const history = useHistory();

  return (
    <ErrorMessage>
      <BackButton history={history} />
      <Heading>404 - Page Not Found</Heading>
      <ErrorText>
        Ooops, something went wrong - Please try again later
      </ErrorText>
    </ErrorMessage>
  );
};

const ErrorMessage = styled.main`
  height: 74vh;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 0.5)),
    url("../images/cinema-image.jpg");
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
`;

const Heading = styled.h3`
  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const ErrorText = styled.p`
  font-size: 16px;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
