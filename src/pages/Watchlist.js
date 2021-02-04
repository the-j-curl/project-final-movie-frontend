import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loading } from "../components/Loading";
import { WatchlistCard } from "../components/WatchlistCard";

export const Watchlist = () => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  // const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const getWatchlist = () => {
    setIsLoading(true);
    fetch(TEST_URL, {
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
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (watchlist) {
    return (
      <>
        <h1>My watchlist</h1>
        <MovieWrapper>
          {watchlist.map((movie) => (
            <WatchlistCard
              key={movie.movieId}
              movieId={movie.movieId}
              onUpdateWatchlist={() => getWatchlist()}
            />
          ))}
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
