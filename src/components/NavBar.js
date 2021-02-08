import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components/macro";

export const NavBar = ({ toggleSideBar }) => {
  const username = useSelector(store => store.user.login.username);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);

  return (
    <>
      <HamburgerBar onClick={toggleSideBar} />
      <NavMenu>
        <NavBarLink to="/" exact>
          Home
        </NavBarLink>
        {isLoggedIn && (
          <NavBarLink to="/watchlist" exact>
            Watchlist
          </NavBarLink>
        )}
        <NavBarLink to="/movielist/now_playing" exact>
          Now playing
        </NavBarLink>
        <NavBarLink to="/movielist/top_rated" exact>
          Top rated
        </NavBarLink>
        <NavBarLink to="/movielist/upcoming" exact>
          Upcoming
        </NavBarLink>
        <NavBarLink to="/movielist/popular" exact>
          Popular
        </NavBarLink>
      </NavMenu>
      {isLoggedIn && (
        <NavBarRight>
          {<UserHeading>{username}</UserHeading>}
          <NavLink to="/logout">
            <NavButton>Logout</NavButton>
          </NavLink>
        </NavBarRight>
      )}
      {!isLoggedIn && (
        <NavBarRight>
          <NavLink to="/login">
            <NavButton>Log in</NavButton>
          </NavLink>
        </NavBarRight>
      )}
    </>
  );
};

const NavBarLink = styled(NavLink)`
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

const NavMenu = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    margin-right: -24px;
  }
`;

const NavBarRight = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const UserHeading = styled.h4`
  font-size: 16px;
  text-transform: uppercase;
  margin: 6px 0;
`;

export const NavButton = styled.button`
  width: 100%;
  text-transform: uppercase;
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
    opacity: 0.8;
  }
`;
