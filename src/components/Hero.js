import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components/macro";

import { SlideTile } from "./SlideTile";

export const Hero = () => {
  const upcomingMovies = useSelector(
    store => store.movies.movies.upcomingMovies
  );

  const randomNumberGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const randomNumber = randomNumberGenerator(0, 16);
  const selectedHeroMovies = upcomingMovies.slice(
    randomNumber,
    randomNumber + 5
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 915,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <StyledSlider {...settings}>
      {selectedHeroMovies.map(movie => (
        <SlideTile
          key={movie.id}
          movieTitle={movie.title}
          movieId={movie.id}
          backdropPath={movie.backdrop_path}
        />
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  .slick-arrow {
    margin: 0 18px;
    z-index: 1;
  }

  .slick-prev:before {
    color: #fff;
    font-size: 50px;
  }

  .slick-prev:before:hover {
    color: red;
  }

  .slick-next:before {
    color: #fff;
    font-size: 50px;
  }

  .slick-prev {
    left: -29px;
  }

  .slick-next {
    right: 1px;
  }

  .slick-dots li button:before {
    color: #fff;
    font-size: 12px;
  }
`;
