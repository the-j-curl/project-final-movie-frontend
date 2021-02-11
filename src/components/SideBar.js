import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";

import { UserHeading } from "./NavBar";

export const SideBar = ({ isOpen, toggleSideBar }) => {
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  const username = useSelector((store) => store.user.login.username);

  return (
    <SideBarContainer isOpen={isOpen} onClick={toggleSideBar}>
      <Icon onClick={toggleSideBar}>
        <CloseIcon />
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLink to="/" exact>
            Home
          </SideBarLink>
          {isLoggedIn && (
            <SideBarLink to="/watchlist" exact>
              Watchlist
            </SideBarLink>
          )}
          <SideBarLink to="/movielist/now_playing" exact>
            Now Playing
          </SideBarLink>
          <SideBarLink to="/movielist/top_rated" exact>
            Top rated
          </SideBarLink>
          <SideBarLink to="/movielist/upcoming" exact>
            Upcoming
          </SideBarLink>
          <SideBarLink to="/movielist/popular" exact>
            Popular
          </SideBarLink>
        </SideBarMenu>
        {isLoggedIn && (
          <SideBarBottom>
            <UserHeading>{username}</UserHeading>
            <SideButtonLink to="/logout">Logout</SideButtonLink>
          </SideBarBottom>
        )}
        {!isLoggedIn && (
          <SideBarBottom>
            <SideButtonLink to="/login">Log in</SideButtonLink>
          </SideBarBottom>
        )}
      </SideBarWrapper>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #222222;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.2 ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

const Icon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  font-size: 25px;
  cursor: pointer;
  outline: none;

  @media (min-width: 768px) {
    top: 16px;
    right: 16px;
    font-size: 30px;
  }
`;

const SideBarWrapper = styled.div`
  color: #fff;
`;

const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 60px);
  text-align: center;
  padding-inline-start: 0;

  @media (min-width: 480px) {
    grid-template-rows: repeat(6, 80px);
  }
`;

const SideBarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;

  &.active {
    color: #3f39fc;
  }

  &:hover {
    color: #3f39fc;
    transition: 0.2s ease-in-out;
  }
`;

const SideBarBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SideButtonLink = styled(NavLink)`
  font-size: 14px;
  font-weight: 600;
  border-radius: 50px;
  background: #3f39fc;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010101;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.8;
  }
`;
