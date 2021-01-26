import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogout } from "../reducers/user";

export const NavBar = () => {
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <ul>
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
      {isLoggedIn && (
        <li>
          <button onClick={() => handleLogout()}>logout</button>
        </li>
      )}
    </ul>
  );
};
