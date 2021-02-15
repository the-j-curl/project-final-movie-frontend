import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import { CheckIcon } from "./CheckIcon";
import { PlusIcon } from "./PlusIcon";

export const SmallWatchlistButton = ({ movieId, onUpdateWatchlist }) => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  const [inWatchlist, setInWatchlist] = useState();

  const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const handleToggleWatchlist = (inWatchlist) => {
    setInWatchlist(inWatchlist);
    fetch(`${LIVE_URL}`, {
      method: "PUT",
      body: JSON.stringify({ movieId, watchlist: inWatchlist }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          onUpdateWatchlist();
        }
        return res.json();
      })
      .then((json) => {
        // This is our backend error
        if (json.error) {
          throw Error(json.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userId) return;
    fetch(LIVE_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.userWatchlist.length > 0) {
          json.userWatchlist.forEach((movie) => {
            if (movie.movieId === movieId) {
              setInWatchlist(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, LIVE_URL, accessToken, movieId]);

  return (
    <WatchlistButton
      onClick={() => handleToggleWatchlist(!inWatchlist)}
      disabled={!isLoggedIn}>
      {inWatchlist ? <CheckIcon /> : <PlusIcon />}
    </WatchlistButton>
  );
};

const WatchlistButton = styled.button`
  background-color: rgba(215, 215, 215, 0.9);
  padding: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 8px 8px 0;
  outline: none;
  opacity: 0.9;
  transition: all 0.3s ease-in;
  :hover {
    cursor: pointer;
    border: 3px solid #3f39fc;
  }
  &:disabled {
    border: 2px solid grey;
    background-color: rgba(215, 215, 215, 0.7);
    :hover {
      cursor: unset;
    }
  }
`;
