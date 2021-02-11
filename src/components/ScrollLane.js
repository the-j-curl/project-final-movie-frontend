import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import styled from "styled-components/macro";

import { Loading } from "../components/Loading";
import { MovieCard } from "./MovieCard";

export const ScrollLane = ({ category, title }) => {
  const MOVIES_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [rightScrollNumber, setRightScrollNumber] = useState(600);
  // const [leftScrollNumber, setLeftScrollNumber] = useState(-600);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
        setIsLoading(false);
      });
  }, [category, MOVIES_URL]);

  const scrollListElement = useRef(null);

  const onRightButtonClick = () => {
    if (scrollListElement.current.scrollLeft <= 0) {
      scrollListElement.current.scrollLeft += 450; // 50px extra here is the black part left of the first poster
    } else {
      scrollListElement.current.scrollLeft += 400;
    }

    // const width = inputEl.current.offsetWidth;
    // console.log(width);

    // const offsetLeft = inputEl.current.offsetLeft;
    // console.log(offsetLeft);

    // const positionScrollLeft = inputEl.current.scrollLeft;
    // console.log(positionScrollLeft);

    // const windowScrollX = window.scrollX;
    // console.log(windowScrollX);

    // const widthWindow = inputEl.current.getBoundingClientRect();
    // console.log(widthWindow);
    // console.log(`Window width: ${widthWindow.width}`); // I need to take widthWindow.width to get the width, returns a lot of values

    // const widthScrollList = inputEl.current.scrollWidth;
    // console.log(`Scrolllist width: ${widthScrollList}`);

    // const numberOfPoster = widthScrollList / widthWindow.width;
    // console.log(`Number of posters: ${numberOfPoster}`);

    // const posterSize = widthWindow.width / numberOfPoster;
    // console.log(`Size of poster: ${posterSize}`);

    // inputEl.current.scrollTo({
    //   left: rightScrollNumber,
    //   behavior: "smooth",
    // });

    // setRightScrollNumber(rightScrollNumber + 600);
  };

  const onLeftButtonClick = () => {
    scrollListElement.current.scrollLeft -= 400;

    // inputEl.current.scrollTo({
    //   left: leftScrollNumber,
    //   behavior: "smooth",
    // });
    // setRightScrollNumber(leftScrollNumber - 600);
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
          {movies.map((movie) => (
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
