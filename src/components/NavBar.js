import React from "react";
import { useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components/macro";

import { userLogout } from "../reducers/user";

export const NavBar = ({ toggleSideBar }) => {
  const username = useSelector(store => store.user.login.username);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);

  return (
    <>
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
          <NavBtnLink to="/logout">Logout</NavBtnLink>
        </NavBtn>
      )}
      {!isLoggedIn && (
        <NavBtn>
          <NavBtnLink to="/login">Log in</NavBtnLink>
        </NavBtn>
      )}
    </>
  );
};

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
