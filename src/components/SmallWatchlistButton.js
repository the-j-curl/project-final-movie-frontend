import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { CheckIcon } from "./CheckIcon";

export const SmallWatchlistButton = ({ movieId, onUpdateWatchlist }) => {
  const userId = useSelector(store => store.user.login.userId);
  const accessToken = useSelector(store => store.user.login.accessToken);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  const [inWatchlist, setInWatchlist] = useState();

  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  // const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const handleToggleWatchlist = inWatchlist => {
    setInWatchlist(inWatchlist);
    fetch(`${TEST_URL}`, {
      method: "PUT",
      body: JSON.stringify({ movieId, watchlist: inWatchlist }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then(res => {
        if (res.ok) {
          onUpdateWatchlist();
        }
        return res.json();
      })
      .then(json => {
        // This is our backend error
        if (json.error) {
          throw Error(json.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userId) return;
    fetch(TEST_URL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.userWatchlist.length > 0) {
          json.userWatchlist.forEach(movie => {
            if (movie.movieId === movieId) {
              setInWatchlist(true);
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <WatchlistButton
      onClick={() => handleToggleWatchlist(!inWatchlist)}
      disabled={!isLoggedIn}
    >
      {inWatchlist ? <CheckIcon /> : "+"}
    </WatchlistButton>
  );
};

const WatchlistButton = styled.button`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  outline: none;
  opacity: 0.9;
  font-size: 36px;
  transition: all 0.3s ease-in;
  :hover {
    cursor: pointer;
    border: 2px solid #3f39fc;
  }
  &:disabled {
    border: 2px solid grey;
    background-color: rgba(239, 239, 239, 0.9);
    :hover {
      cursor: unset;
    }
  }
  @media (min-width: 768px) {
    top: 2px;
    left: 2px;
  }
`;
