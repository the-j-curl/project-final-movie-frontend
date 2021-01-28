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
        <a href="https://www.linkedin.com/in/ylvanilsson/">Ylva Nillson</a>
      </h6>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;
