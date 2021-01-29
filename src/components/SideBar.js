import React from "react";
import { useSelector } from "react-redux";
import { Link as LinkR } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";

import { userLogout } from "../reducers/user";

export const SideBar = ({ isOpen, toggleSideBar }) => {
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggleSideBar}>
      <Icon onClick={toggleSideBar}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {isLoggedIn && <SidebarLink to="/watchlist">Watchlist</SidebarLink>}
          <SidebarLink to="/movielist/now_playing">Now Playing</SidebarLink>
          <SidebarLink to="/movielist/top_rated">Top rated</SidebarLink>
          <SidebarLink to="/movielist/upcoming">Upcoming</SidebarLink>
          <SidebarLink to="/movielist/popular">Popular</SidebarLink>
        </SidebarMenu>
        {isLoggedIn && (
          <SideBtnWrap>
            <SideBtnLink to="/logout">Logout</SideBtnLink>
          </SideBtnWrap>
        )}
        {!isLoggedIn && (
          <SideBtnWrap>
            <SideBtnLink to="/login">Log in</SideBtnLink>
          </SideBtnWrap>
        )}
      </SidebarWrapper>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #222222;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.2 ease-in-out; /* 0.3 */
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

const Icon = styled.div`
  position: absolute;
  top: 12px; /* 1.2rem */
  right: 16px; /* 1.5rem */
  background: transparent;
  font-size: 20px; /* 2rem */
  cursor: pointer;
  outline: none;
`;

const SidebarWrapper = styled.div`
  color: #fff;
`;

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 60px);
  text-align: center;
  padding-inline-start: 0;

  @media (min-width: 480px) {
    grid-template-rows: repeat(6, 80px);
  }
`;

const SidebarLink = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 1.5rem */
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
    color: #15cdfc;
    transition: 0.2s ease-in-out;
  }
`;

const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const SideBtnLink = styled(LinkR)`
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
    opacity: 0.6;
  }
`;
