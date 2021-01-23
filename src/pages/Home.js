import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import MovieList from "../pages/MovieList";

const Home = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  return (
    <>
      <h1>Home page</h1>
      {accessToken && <h2>User is logged in: {accessToken}</h2>};
      <Link to="/movielist/now_playing">
        <h3>Now playing</h3>
      </Link>
      <Link to="/movielist/top_rated">
        <h3>Top rated</h3>
      </Link>
      <Link to="/movielist/upcoming">
        <h3>Upcoming</h3>
      </Link>
      <Link to="/movielist/popular">
        <h3>Popular</h3>
      </Link>
    </>
  );
};

export default Home;
