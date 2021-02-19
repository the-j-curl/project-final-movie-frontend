import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { MovieCard } from "./MovieCard";
import { MovieListGrid } from "../pages/MovieList";
import { BackButton } from "./BackButton";
import { Loading } from "./Loading";

export const ActorDetails = () => {
  const [actorInfo, setActorInfo] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { actorId } = useParams();
  const history = useHistory();
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const ACTOR_URL = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`;
  const ACTOR_FILMS_URL = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(ACTOR_URL)
      .then(res => res.json())
      .then(json => {
        setActorInfo(json);
        setIsLoading(false);
      });
  }, [ACTOR_URL]);

  useEffect(() => {
    setIsLoading(true);
    fetch(ACTOR_FILMS_URL)
      .then(res => res.json())
      .then(json => {
        setActorMovies(json.cast);
        setIsLoading(false);
      });
  }, [ACTOR_FILMS_URL]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <BackButton className="movies-back-button" history={history} />
      <ActorDetailsSection>
        {actorInfo.profile_path ? (
          <ActorInfoImage
            src={`https://image.tmdb.org/t/p/w342${actorInfo.profile_path}`}
            alt={actorInfo.name}
          />
        ) : (
          <ActorInfoImage
            src="https://images.unsplash.com/photo-1519225924453-b28226426689?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1834&q=80"
            alt="Actor profile picture"
          />
        )}

        <ActorInfoText>
          <p>
            <BoldText>{actorInfo.name}</BoldText>
          </p>
          {actorInfo.birthday && (
            <p>
              Born: <BoldText>{actorInfo.birthday}</BoldText> |
              <BoldText> {actorInfo.place_of_birth}</BoldText>
            </p>
          )}
          {actorInfo.deathday && (
            <p>
              Died: <BoldText>{actorInfo.deathday}</BoldText>
            </p>
          )}
          {actorInfo.biography === "" ? (
            <Biography>
              We don't have a lot of information on this actor/actress yet.
            </Biography>
          ) : (
            <Biography>{actorInfo.biography}</Biography>
          )}
        </ActorInfoText>
      </ActorDetailsSection>
      <h3>{actorInfo.name} films</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <MovieListGrid>
          {actorMovies.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              id={movie.id}
            />
          ))}
        </MovieListGrid>
      )}
    </>
  );
};

const ActorDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 21, 21, 0.7);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 30px;
  }
`;

const ActorInfoImage = styled.img`
  width: 250px;

  @media (min-width: 1024px) {
    width: 330px;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const ActorInfoText = styled.div`
  font-size: 14px;

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Biography = styled.p`
  font-style: italic;
`;
