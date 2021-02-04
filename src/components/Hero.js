import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components/macro";

export const Hero = ({ heroMovies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
  };
  return (
    <SlideTest>
      <Slider {...settings}>
        <SlideTile>
          <h3>Movie Title</h3>
          <Image
            src={`https://image.tmdb.org/t/p/w780/8MjzBahFKCuQbwytpPPds7qboQa.jpg`}
          />
        </SlideTile>
        <SlideTile>
          <h3>Movie Title</h3>
          <Image
            src={`https://image.tmdb.org/t/p/w780/cjaOSjsjV6cl3uXdJqimktT880L.jpg`}
          />
        </SlideTile>
        <SlideTile>
          <h3>Movie Title</h3>
          <Image
            src={`https://image.tmdb.org/t/p/w780/srYya1ZlI97Au4jUYAktDe3avyA.jpg`}
          />
        </SlideTile>
        <SlideTile>
          <h3>Movie Title</h3>
          <Image
            src={`https://image.tmdb.org/t/p/w780/n9KlvCOBFDmSyw3BgNrkUkxMFva.jpg`}
          />
        </SlideTile>
      </Slider>
    </SlideTest>
  );
};

const Image = styled.img``;

const SlideTile = styled.div`
  margin: 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SlideTest = styled.div`
  padding: 30px;
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
