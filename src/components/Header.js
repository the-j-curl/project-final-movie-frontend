import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/">
          <Logo />
        </Link>
        <NavBar toggleSideBar={toggleSideBar} />
      </HeaderContainer>
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
    </>
  );
};

const HeaderContainer = styled.header`
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 6px;

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
    padding: 5px 20px;
    margin-bottom: 36px;
  }
`;
