import React from "react";
import styled from "styled-components/macro";

export const CheckIcon = () => {
  return (
    <Icon viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
};

const Icon = styled.svg`
  fill: none;
  stroke: #fff;
  stroke-width: 4px;
  background: blue;
  border-radius: 50%;
  width: 20px;
`;
