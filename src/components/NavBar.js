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
      <Link to="/movielist/:category">
        <li>category</li>
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
