import React from "react";
import styled from "styled-components/macro";

import { NavBar } from "./NavBar";
import { LogoutBox } from "./LogoutBox";

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoHeading>JYDB</LogoHeading>
      <NavBar />
      <LogoutBox />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
`;

const LogoHeading = styled.h1`
  color: #3f39fc;
  border: 2px solid #3f39fc;
  padding: 6px;
  border-radius: 2px;
`;
