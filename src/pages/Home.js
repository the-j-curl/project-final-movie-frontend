import React, { useState, useEffect } from "react";

import { Hero } from "../components/Hero";
import { ScrollLane } from "../components/ScrollLane";

export const Home = () => {
  const HERO_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [heroMovies, setHeroMovies] = useState([]);

  useEffect(() => {
    fetch(`${HERO_MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => {
        const heroMovieIds = json.results.map((item) => item.id);
        setHeroMovies(heroMovieIds);
      });
  }, [HERO_MOVIES_URL]);

  console.log(heroMovies);

  return (
    <>
      <Hero heroMovies={heroMovies} />
      <ScrollLane category={"now_playing"} title={"Now playing"} />
      <ScrollLane category={"top_rated"} title={"Top rated"} />
      <ScrollLane category={"upcoming"} title={"Upcoming"} />
      <ScrollLane category={"popular"} title={"Popular"} />
    </>
  );
};
