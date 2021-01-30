import React from "react";
import styled from "styled-components/macro";

export const CheckIcon = () => {
  return (
    <Icon viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
      {/* <path d= "M0,-1 V1 M-1,0 H1" /> */}
    </Icon>
  );
};

const Icon = styled.svg`
  fill: none;
  stroke: #fff;
  stroke-width: 4px;
  background: #3f39fc;
  border-radius: 50%;
  width: 26px;

  @media (min-width: 768px) {
    width: 30px;
  }
`;
