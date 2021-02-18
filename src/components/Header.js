import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Link to="/">
            <Logo />
          </Link>
          <NavBar toggleSideBar={toggleSideBar} />
        </HeaderWrapper>
        <SearchBar />
      </HeaderContainer>
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
    </>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 6px;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-bottom: 16px;
    position: relative;
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
    padding: 5px 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;
