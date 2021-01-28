import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { ScrollLane } from "../components/ScrollLane";

export const Home = () => {
  const username = useSelector(store => store.user.login.username);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  return (
    <>
      <ScrollLane category={"now_playing"} title={"Now playing"} />
      <ScrollLane category={"top_rated"} title={"Top rated"} />
      <ScrollLane category={"upcoming"} title={"Upcoming"} />
      <ScrollLane category={"popular"} title={"Popular"} />
    </>
  );
};
