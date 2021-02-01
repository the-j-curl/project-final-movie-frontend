import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { WatchlistCard } from "../components/WatchlistCard";

export const Watchlist = () => {
  const userId = useSelector(store => store.user.login.userId);
  const accessToken = useSelector(store => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState([]);
  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const getWatchlist = () => {
    fetch(TEST_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(json => setWatchlist(json.userWatchlist));
  };

  useEffect(() => {
    getWatchlist();
  }, []);
  console.log(watchlist);

  return (
    <>
      <h1>My watchlist</h1>
      <MovieWrapper>
        {watchlist.map(movie => (
          <WatchlistCard
            key={movie.movieId}
            movieId={movie.movieId}
            onUpdateWatchlist={() => getWatchlist()}
          />
        ))}
      </MovieWrapper>
    </>
  );
};

const MovieWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
