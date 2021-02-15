import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const Footer = () => {
  return (
    <FooterContainer>
      <P>
        Created by:{" "}
        <FooterLink to="https://github.com/the-j-curl">Jamie Cook</FooterLink>{" "}
        and{" "}
        <FooterLink to="https://github.com/ylvan75">Ylva Nilsson</FooterLink>
      </P>
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
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    margin-top: 26px;
    height: 90px;
  }
`;

const P = styled.p`
  font-size: 12px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const FooterLink = styled(Link)`
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-in;
  }
`;
