import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { CheckIcon } from "./CheckIcon";

export const LargeWatchlistButton = ({ movieId, onUpdateWatchlist }) => {
  const userId = useSelector(store => store.user.login.userId);
  const accessToken = useSelector(store => store.user.login.accessToken);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  const [inWatchlist, setInWatchlist] = useState(false);

  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  // const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

  const handleToggleWatchlist = inWatchlist => {
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
          setInWatchlist(inWatchlist);
          onUpdateWatchlist();
        }
        return res.json();
      })
      .then(json => {
        if (json.error) {
          throw Error(json.message);
        }
      })
      .catch(error => {
        // This is our backend error
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
      {inWatchlist ? "In my watchlist" : " to my watchlist"}
    </WatchlistButton>
  );
};

const WatchlistButton = styled.button`
  width: 150px;
  height: 40px;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 26px;
  outline: none;
  opacity: 0.9;
  font-size: 14px;
  font-weight: 500;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-right: auto;
  margin-left: auto;
  transition: all 0.3s ease-in;
  :hover {
    cursor: pointer;
    border: 3px solid #3f39fc;
    padding: 4px;
  }
  &:disabled {
    background-color: rgba(239, 239, 239, 0.9);
    border: 2px solid grey;
    :hover {
      cursor: unset;
    }
  }

  @media (min-width: 768px) {
    width: 170px;
    height: 46px;
    font-size: 16px;
  }
`;
