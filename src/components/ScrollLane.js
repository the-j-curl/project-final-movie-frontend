import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { Loading } from "../components/Loading";
import { MovieCard } from "./MovieCard";
import { GhostMovieCard } from "./GhostMovieCard";

export const ScrollLane = ({ category, title }) => {
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    console.log("what is happening...loop");
    setIsLoading(true);
    fetch(`${MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
        setIsLoading(false);
      });
  }, [category, MOVIES_URL]);

  console.log(movies);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <CategoryText>
            <h2>{title}</h2>
            <Link to={`/movielist/${category}`}>
              <h5>See all</h5>
            </Link>
          </CategoryText>
          <ScrollList>
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </ScrollList>
        </section>
      )}
    </>
  );
};

const ScrollList = styled.div`
  display: flex;
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
