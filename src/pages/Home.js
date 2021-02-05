import React from "react";

import { Hero } from "../components/Hero";
import { ScrollLane } from "../components/ScrollLane";

export const Home = () => {
  return (
    <>
      <Hero />
      <ScrollLane category={"now_playing"} title={"Now playing"} />
      <ScrollLane category={"top_rated"} title={"Top rated"} />
      <ScrollLane category={"upcoming"} title={"Upcoming"} />
      <ScrollLane category={"popular"} title={"Popular"} />
    </>
  );
};
