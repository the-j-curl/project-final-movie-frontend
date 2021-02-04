import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components/macro";

import { SlideTile } from "./SlideTile";

export const Hero = () => {
  const HERO_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`;
  const [heroMovies, setHeroMovies] = useState([]);

  useEffect(() => {
    fetch(`${HERO_MOVIES_URL}`)
      .then((res) => res.json())
      .then((json) => {
        const heroMovieIds = json.results.map((item) => {
          const movieId = item.id;
          const backdropPath = item.backdrop_path;
          const movieTitle = item.title;
          return { movieId, backdropPath, movieTitle };
        });

        setHeroMovies(heroMovieIds);
      });
  }, [HERO_MOVIES_URL]);

  console.log(heroMovies);

  const selectedHeroMovies = heroMovies.slice(4, 9);

  console.log(selectedHeroMovies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <SlideContainer>
      <Slider {...settings}>
        {selectedHeroMovies.map((movie) => (
          <SlideTile
            key={movie.movieId}
            movieTitle={movie.movieTitle}
            movieId={movie.movieId}
            backdropPath={movie.backdropPath}
          />
        ))}
      </Slider>
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  width: 300px;
  @media (min-width: 1024px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-arrow {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    z-index: 1;
  }

  .slick-prev:before {
    font-size: 60px;
    color: #fff;
  }

  .slick-prev:before:hover {
    color: red;
  }

  .slick-next:before {
    font-size: 60px;
    color: #fff;
  }

  .slick-dots li button:before {
    color: #fff;
    font-size: 14px;
  }
`;
