import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      <Link to="/signup">
        <li>sign up</li>
      </Link>
      <Link to="/login">
        <li>login</li>
      </Link>
    </ul>
  );
};

export default NavBar;
