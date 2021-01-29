import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components/macro";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <LogoLink to="/">
          <h1>JYDB</h1>
        </LogoLink>
        <NavBar toggleSideBar={toggleSideBar} />
      </HeaderContainer>
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
    </>
  );
};

const HeaderContainer = styled.header`
  background: #222222;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 5px; /* 0.5rem calc((100vw - 1000px) / 2) */
  /* z-index: 10; */

  @media (min-width: 1024px) {
    justify-content: space-between;
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

// import { NavBar } from "./NavBar";
// import { LogoutBox } from "./LogoutBox";

// export const Header = () => {
//   return (
//     <HeaderContainer>
//       <LogoHeading>JYDB</LogoHeading>
//       <NavBar />
//       <LogoutBox />
//     </HeaderContainer>
//   );
// };

// const HeaderContainer = styled.header`
//   background-color: #222222;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 120px;
// `;

// const LogoHeading = styled.h1`
//   color: #3f39fc;
//   border: 2px solid #3f39fc;
//   padding: 6px;
//   border-radius: 2px;
// `;
