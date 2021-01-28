import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { MovieCard } from "./MovieCard";

export const ScrollLane = ({ category, title }) => {
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${MOVIES_URL}`)
      .then(res => res.json())
      .then(json => setMovies(json.results));
  }, [category, MOVIES_URL]);

  console.log(movies);

  return (
    <section>
      <CategoryText>
        <h2>{title}</h2>
        <Link to={`/movielist/${category}`}>
          <h5>See all</h5>
        </Link>
      </CategoryText>
      <ScrollList>
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </ScrollList>
    </section>
  );
};

const ScrollList = styled.div`
  display: flex;
  flex-direction: row-reverse;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  &:img {
    width: 200px;
  }
`;

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
