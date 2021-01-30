import React from "react";
import styled from "styled-components/macro";

export const Footer = () => {
  return (
    <FooterContainer>
      <h6>
        Created by:
        <a href="https://www.linkedin.com/in/jamiepcook/">
          {" "}
          Jamie Cook
        </a> and{" "}
        <a href="https://www.linkedin.com/in/ylvanilsson/">Ylva Nilsson</a>
      </h6>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #111111;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  @media (min-width: 768px) {
    font-size: 18px;
    height: 70px;
    @media (min-width: 1024px) {
      font-size: 20px;
      margin-top: 26px;
      height: 90px;
    }
  }
`;
