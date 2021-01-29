import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components/macro";

import { userLogout } from "../reducers/user";

export const NavBar = ({ toggleSideBar }) => {
  const username = useSelector((store) => store.user.login.username);
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <>
      {/* <Nav> */}
      {/* <NavLogoLink to="/">
        <h1>JYDB</h1>
      </NavLogoLink> */}
      <HamburgerBar onClick={toggleSideBar} />
      <NavMenu>
        {isLoggedIn && <NavLink to="/watchlist">Watchlist</NavLink>}
        <NavLink to="/movielist/now_playing">Now playing</NavLink>
        <NavLink to="/movielist/top_rated">Top rated</NavLink>
        <NavLink to="/movielist/upcoming">Upcoming</NavLink>
        <NavLink to="/movielist/popular">Popular</NavLink>
      </NavMenu>
      {isLoggedIn && (
        <NavBtn>
          {<h3>{username}</h3>}
          <NavBtnLogout onClick={() => handleLogout()}>Logout</NavBtnLogout>
        </NavBtn>
      )}
      {!isLoggedIn && (
        <NavBtn>
          <NavBtnLink to="/login">Log in</NavBtnLink>
        </NavBtn>
      )}
      {/* </Nav> */}
    </>
  );
};

// const Nav = styled.nav`
//   /* background: #222222;
//   height: 120px;
//   display: flex;
//   justify-content: space-between;
//   padding: 5px; /* 0.5rem calc((100vw - 1000px) / 2) */
//   /*z-index: 10; */
// `;

// const NavLogoLink = styled(Link)`
//   color: #fff;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   padding: 0 10px;
//   height: 100%;
//   cursor: pointer;

//   &.active {
//     color: #15cdfc;
//   }
// `;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 3px;
  font-weight: 600;
  height: 40px;
  cursor: pointer;

  &.active {
    background-color: rgba(255, 255, 255, 0.95);
    color: #000;
    :hover {
      background-color: rgba(255, 255, 255, 0.95);
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const HamburgerBar = styled(FaBars)`
  display: block;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(75%, 100%);
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    margin-right: -24px;
  }
`;

const NavBtn = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    margin-right: 24px;
  }
`;

const NavBtnLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  background: #3f39fc;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.6;
  }
`;
const NavBtnLogout = styled.button`
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  background: #3f39fc;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.6;
  }
`;
