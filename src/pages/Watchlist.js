import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { ui } from "../reducers/ui";
import { Loading } from "../components/Loading";
import { WatchlistCard } from "../components/WatchlistCard";

export const Watchlist = () => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState([]);
  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const isLoading = useSelector((store) => store.ui.isLoading);
  const dispatch = useDispatch();

  const getWatchlist = () => {
    dispatch(ui.actions.setLoading(true));
    fetch(TEST_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setWatchlist(json.userWatchlist);
        dispatch(ui.actions.setLoading(false));
      });
  };

  useEffect(() => {
    getWatchlist();
  }, []);
  console.log(watchlist);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <h1>Watchlist page</h1>
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
