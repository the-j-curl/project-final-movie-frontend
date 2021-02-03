import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { WatchlistCard } from "../components/WatchlistCard";

export const Watchlist = () => {
  const userId = useSelector(store => store.user.login.userId);
  const accessToken = useSelector(store => store.user.login.accessToken);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  const [watchlist, setWatchlist] = useState([]);
  // const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const getWatchlist = () => {
    fetch(LIVE_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(json => setWatchlist(json.userWatchlist));
  };

  useEffect(() => {
    getWatchlist();
    //eslint-disable-next-line
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <h1>My watchlist</h1>
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
