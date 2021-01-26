import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { CheckIcon } from "./CheckIcon";

export const LargeWatchlistButton = ({ movieId }) => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [inWatchlist, setInWatchlist] = useState();

  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const handleToggleWatchlist = (inWatchlist) => {
    setInWatchlist(inWatchlist);
    fetch(`${TEST_URL}`, {
      method: "PUT",
      body: JSON.stringify({ movieId, watchlist: inWatchlist }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      // .then((json) => { // TO-DO: Can this be removed? One to one question - what happens here to json? Should we do anything with this data?
      //   console.log(json);
      // })
      .catch((error) => {
        // TO-DO: What should we do with the error? One to one question
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userId) return;
    fetch(`${TEST_URL}?movieId=${movieId}`, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setInWatchlist(false);
          throw Error(res.statusText);
        }
      })
      .then((json) => {
        if (json && json.movie.watchlist) {
          setInWatchlist(json.movie.watchlist);
        } else {
          setInWatchlist(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <WatchlistButton onClick={() => handleToggleWatchlist(!inWatchlist)}>
      {inWatchlist ? <CheckIcon /> : "+"}
      {inWatchlist ? "In my watchlist" : " to my watchlist"}
    </WatchlistButton>
  );
};

const WatchlistButton = styled.button`
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  outline: none;
  opacity: 0.9;
`;
