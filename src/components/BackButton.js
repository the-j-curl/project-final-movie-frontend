import React from "react";
import styled from "styled-components/macro";

export const BackButton = ({ history, className }) => {
  return (
    <Button
      onClick={() => {
        history.goBack();
      }}
      className={className}
      type="button">
      <LeftArrow></LeftArrow>
      <BackButtonText>Back</BackButtonText>
    </Button>
  );
};

const LeftArrow = styled.div`
  border-color: transparent rgb(63, 57, 252);
  border-style: solid;
  border-width: 20px 20px 20px 0px;
  height: 0px;
  width: 0px;
  position: absolute;
  left: 12px;
  top: 4px;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 2px solid black;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  margin: 8px 0 5px 0;
  border-radius: 10px;
  padding: 6px;
  :hover {
    border-color: #3f39fc;
    transition: all 0.3s ease-in;
  }
  &:hover ${LeftArrow} {
    animation-name: arrow-slide;
    transition: all 0.3s ease-in;
    animation-duration: 250ms;
    animation-delay: 0.3s;
  }
  @keyframes arrow-slide {
    0% {
      transform: translateX(-6px);
    }
    100% {
      transform: translateX(-12px);
    }
  }
`;

const BackButtonText = styled.p`
  position: absolute;
  right: 10px;
  top: -4px;
`;
