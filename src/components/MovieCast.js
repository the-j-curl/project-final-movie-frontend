import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const CAST_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    fetch(CAST_URL)
      .then(res => res.json())
      .then(json => setCast(json.cast));
  }, [CAST_URL]);

  return (
    <MovieCastWrapper>
      {cast.slice(0, 6).map(actor => (
        <MovieCastCard key={actor.id}>
          <CastLink to={`/movies/${movieId}/cast/${actor.id}`}>
            <ImageWrapper>
              {actor.profile_path ? (
                <CastImage
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <CastImage
                  src="../images/dummy-cast-img.jpg"
                  alt="Actor profile picture"
                />
              )}
            </ImageWrapper>

            <CastName>{actor.name}</CastName>
          </CastLink>
        </MovieCastCard>
      ))}
    </MovieCastWrapper>
  );
};

const MovieCastWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    margin-top: 10px;
  }

  @media (min-width: 1024px) {
    width: 70%;
    max-width: 850px;
  }
`;

const MovieCastCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 16%;
    margin-bottom: unset;
  }
`;

const CastName = styled.p`
  padding: 5px;
  margin: 0 2px;
  font-size: 12px;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  padding: 0;
  :hover {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-in;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  padding-bottom: 20px;
  width: 100px;
`;

const CastLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover ${CastName} {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-in;
  }
`;

const CastImage = styled.img`
  width: 100%;
  margin: -20% 0px 0px;
  :hover {
    opacity: 0.9;
  }
`;
