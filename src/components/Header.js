import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <LogoLink to="/">
          <Logo />
        </LogoLink>
        <NavBar toggleSideBar={toggleSideBar} />
      </HeaderContainer>
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
    </>
  );
};

const HeaderContainer = styled.header`
  background: #111111;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 5px;

  @media (min-width: 1024px) {
    justify-content: space-between;
    padding: 5px 20px;
  }
`;

const LogoLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;
