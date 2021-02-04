import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { MovieCard } from "./MovieCard";

export const ScrollLane = ({ category, title }) => {
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => setMovies(json.results));
  }, [category, MOVIES_URL]);

  return (
    <section>
      <CategoryText>
        <h2>{title}</h2>
        <SeeAllLink to={`/movielist/${category}`}>
          <SeeAll>See all</SeeAll>
        </SeeAllLink>
      </CategoryText>
      <ScrollList>
        <ArrowLeft>{" < "}</ArrowLeft>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            id={movie.id}
          />
        ))}
        <ArrowRight>{" > "}</ArrowRight>
      </ScrollList>
    </section>
  );
};

const ScrollList = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowLeft = styled.button`
  width: 20px;
  height: 40px;
  z-index: 1;
  position: absolute;
  left: 10px;
  top: 100px;
`;

const ArrowRight = styled.button`
  width: 20px;
  height: 40px;
  z-index: 1;
  position: absolute;
  right: 10px;
  top: 100px;
`;

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SeeAllLink = styled(Link)`
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-in;
  }
`;

const SeeAll = styled.h5`
  margin: 0;
`;
