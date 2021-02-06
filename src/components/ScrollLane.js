import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { Loading } from "../components/Loading";
import { MovieCard } from "./MovieCard";

export const ScrollLane = ({ category, title }) => {
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${MOVIES_URL}`)
      .then(res => res.json())
      .then(json => {
        setMovies(json.results);
        setIsLoading(false);
      });
  }, [category, MOVIES_URL]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section>
        <CategoryText>
          <Heading>{title}</Heading>
          <SeeAllLink to={`/movielist/${category}`}>
            <SeeAll>See all</SeeAll>
          </SeeAllLink>
        </CategoryText>
        <ScrollList>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              id={movie.id}
            />
          ))}
        </ScrollList>
      </section>
    );
  }
};

const ScrollList = styled.div`
  display: flex;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const Heading = styled.h2`
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 22px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
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
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;
