import React from "react";
import styled, { keyframes } from "styled-components/macro";

export const Loading = () => {
  return (
    <LoaderContainer>
      <Load></Load>
    </LoaderContainer>
  );
};

const breatheAnimation = keyframes`
 {0% { height: 60px; width: 60px; }
 30% { height: 200px; width: 200px; opacity: 1 }
 40% { height: 205px; width: 205px; opacity: 0.3; }
 100% { height: 60px; width: 60px; opacity: 0.6; }}
 `;

const breatheAnimationLarge = keyframes`
{0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }}
`;

const Load = styled.div`
  height: 60px;
  width: 60px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  border-color: #3f39fc;
  animation-name: ${breatheAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;

  @media (min-width: 768px) {
    height: 100px;
    width: 100px;
    animation-name: ${breatheAnimationLarge};
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;
