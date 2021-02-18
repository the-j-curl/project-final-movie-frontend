import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { MovieCard } from "./MovieCard";
import { MovieListGrid } from "../pages/MovieList";
import { BackButton } from "./BackButton";

export const ActorDetails = () => {
  const [actorInfo, setActorInfo] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const { actorId } = useParams();
  const history = useHistory();

  const ACTOR_URL = `https://api.themoviedb.org/3/person/${actorId}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US`;
  const ACTOR_FILMS_URL = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=5e0af1d18e77dbd12a3e994aa1316cbf`;

  useEffect(() => {
    fetch(ACTOR_URL)
      .then(res => res.json())
      .then(json => {
        setActorInfo(json);
      });
  }, [ACTOR_URL]);

  useEffect(() => {
    fetch(ACTOR_FILMS_URL)
      .then(res => res.json())
      .then(json => {
        setActorMovies(json.cast);
      });
  }, [ACTOR_FILMS_URL]);

  return (
    <>
      <BackButton className="movies-back-button" history={history} />
      <ActorDetailsSection>
        {actorInfo.profile_path !== null ? (
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
          <p>
            Born: <BoldText>{actorInfo.birthday}</BoldText> |
            <BoldText> {actorInfo.place_of_birth}</BoldText>
          </p>
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
    </>
  );
};
// <p>{actor.biography === "" ? "We don't have a lot of information on this actor yet.": actor.biography }</p>

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
