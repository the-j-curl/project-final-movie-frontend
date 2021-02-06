import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loading } from "../components/Loading";
import { WatchlistCard } from "../components/WatchlistCard";
import { Heading } from "../components/ScrollLane";

export const Watchlist = () => {
  const userId = useSelector(store => store.user.login.userId);
  const accessToken = useSelector(store => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const getWatchlist = () => {
    setIsLoading(true);
    fetch(LIVE_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(json => {
        setWatchlist(json.userWatchlist);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWatchlist();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (watchlist) {
    return (
      <>
        <Heading>My watchlist</Heading>
        <MovieWrapper>
          {watchlist.length <= 0 ? (
            <h3>Currently you have no movies in your watchlist</h3>
          ) : (
            watchlist.map(movie => (
              <WatchlistCard
                key={movie.movieId}
                movieId={movie.movieId}
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

const MovieWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
