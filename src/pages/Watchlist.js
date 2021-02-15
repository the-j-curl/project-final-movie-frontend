import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RandomMovie } from "../components/RandomMovie";
import { Loading } from "../components/Loading";
import { WatchlistCard } from "../components/WatchlistCard";
import { Heading } from "../components/ScrollLane";

export const Watchlist = () => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [randomMovieId, setRandomMovieId] = useState();
  // const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const getWatchlist = () => {
    setIsLoading(true);
    fetch(LIVE_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setWatchlist(json.userWatchlist);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWatchlist();
    //eslint-disable-next-line
  }, []);

  const randomNumberGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const onGenerateNumber = () => {
    if (watchlist.length > 1) {
      let maxNum = watchlist.length;
      let randomNumber = randomNumberGenerator(0, maxNum);
      setRandomMovieId(watchlist[randomNumber].movieId);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (watchlist) {
    return (
      <>
        <WatchlistHeadingWrapper>
          <Heading>My watchlist</Heading>
          {watchlist.length > 1 && (
            <RandomMovie onClickRandom={onGenerateNumber} />
          )}
        </WatchlistHeadingWrapper>
        <MovieWrapper>
          {watchlist.length <= 0 ? (
            <h3>Currently you have no movies in your watchlist</h3>
          ) : (
            watchlist.map((movie) => (
              <WatchlistCard
                key={movie.movieId}
                movieId={movie.movieId}
                randomMovieId={randomMovieId}
                onUpdateWatchlist={() => getWatchlist()}
              />
            ))
          )}
        </MovieWrapper>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const WatchlistHeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const MovieWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
