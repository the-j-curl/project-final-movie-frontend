import React from "react";
import styled from "styled-components/macro";

export const Logo = () => {
  return <LogoHeading>JYDB</LogoHeading>;
};

const LogoHeading = styled.h1`
  color: #3f39fc;
  font-size: 40px;
  border: 2px solid #3f39fc;
  border-radius: 2px;
  text-shadow: 1px 2px 3px #3f39fc;
  box-shadow: 4px 4px 4px #3f39fc;
  padding: 6px;

  @media (min-width: 768px) {
    padding: 10px;
  }
  @media (min-width: 1024px) {
    padding: 12px;
    font-size: 50px;
  }
`;
