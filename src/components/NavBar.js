import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

export const NavBar = () => {
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);

  return (
    <UL>
      <Link to="/">
        <li>home</li>
      </Link>
      <Link to="/watchlist">
        <li>watchlist</li>
      </Link>
      <Link to="/movielist/now_playing">
        <li>Now playing</li>
      </Link>
      <Link to="/movielist/top_rated">
        <li>Top rated</li>
      </Link>
      <Link to="/movielist/upcoming">
        <li>Upcoming</li>
      </Link>
      <Link to="/movielist/popular">
        <li>Popular</li>
      </Link>
      {!isLoggedIn && (
        <Link to="/signup">
          <li>sign up</li>
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/login">
          <li>login</li>
        </Link>
      )}
    </UL>
  );
};

const UL = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;
