import React from "react";

import { ScrollLane } from "../components/ScrollLane";

export const Home = () => {
  return (
    <>
      <ScrollLane category={"now_playing"} title={"Now playing"} />
      <ScrollLane category={"top_rated"} title={"Top rated"} />
      <ScrollLane category={"upcoming"} title={"Upcoming"} />
      <ScrollLane category={"popular"} title={"Popular"} />
    </>
  );
};
