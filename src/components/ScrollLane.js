import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import styled from "styled-components/macro";

import { movieCategoryResults } from "../reducers/movies";
import { Loading } from "../components/Loading";
import { MovieCard } from "./MovieCard";

export const ScrollLane = ({ category, title }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.ui.isLoading);
  const nowPlayingMovies = useSelector(
    store => store.movies.movies.nowPlayingMovies
  );
  const topRatedMovies = useSelector(
    store => store.movies.movies.topRatedMovies
  );
  const upcomingMovies = useSelector(
    store => store.movies.movies.upcomingMovies
  );
  const popularMovies = useSelector(store => store.movies.movies.popularMovies);

  useEffect(() => {
    dispatch(movieCategoryResults(category));
  }, [category, dispatch]);

  let movieList = [];

  if (category === "now_playing") {
    movieList = nowPlayingMovies;
  } else if (category === "top_rated") {
    movieList = topRatedMovies;
  } else if (category === "upcoming") {
    movieList = upcomingMovies;
  } else if (category === "popular") {
    movieList = popularMovies;
  }

  const scrollListElement = useRef(null);

  const onRightButtonClick = () => {
    if (scrollListElement.current.scrollLeft <= 0) {
      scrollListElement.current.scrollLeft += 850; // 50px extra here is the black part left of the first poster
    } else {
      scrollListElement.current.scrollLeft += 800;
    }
  };

  const onLeftButtonClick = () => {
    scrollListElement.current.scrollLeft -= 800;
  };

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
        <ScrollList ref={scrollListElement}>
          <ArrowLeftButton onClick={onLeftButtonClick}>
            <ArrowLeftIcon />
          </ArrowLeftButton>
          {movieList.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              id={movie.id}
            />
          ))}
          <ArrowRightButton onClick={onRightButtonClick}>
            <ArrowRightIcon />
          </ArrowRightButton>
        </ScrollList>
      </section>
    );
  }
};

const ScrollList = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
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

const ArrowLeftButton = styled.button`
  display: none;
  @media (min-width: 915px) {
    display: inline;
    background: none;
    outline: none;
    opacity: 0.7;
    border: none;
    height: 47px;
    width: 47px;
    z-index: 1;
    position: sticky;
    left: 0px;
    top: 100px;

    :hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
`;

const ArrowLeftIcon = styled(FaChevronCircleLeft)`
  display: none;
  @media (min-width: 915px) {
    display: inline;
    color: #fff;
    font-size: 36px;
  }
`;

const ArrowRightButton = styled(ArrowLeftButton)`
  @media (min-width: 915px) {
    right: 0px;
  }
`;

const ArrowRightIcon = styled(FaChevronCircleRight)`
  display: none;

  @media (min-width: 915px) {
    display: inline;
    color: #fff;
    font-size: 36px;
  }
`;
