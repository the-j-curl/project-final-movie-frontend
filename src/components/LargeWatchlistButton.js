import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { CheckIcon } from "./CheckIcon";

export const LargeWatchlistButton = ({ movieId, onUpdateWatchlist }) => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [inWatchlist, setInWatchlist] = useState(false);

  const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
  // const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

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
          onUpdateWatchlist();
        }
        return res.json();
        // else {
        //   const response = res.json();
        //   response.then((res) => {
        //     console.log(response);
        //     throw Error(response.message);
        //   });
        //   return response;
        // }
      })
      .then((json) => {
        // TO-DO: Can this be removed? One to one question - what happens here to json? Should we do anything with this data?
        if (json.error) {
          throw Error(json.message);
        }
      })
      .catch((error) => {
        // TO-DO: What should we do with the error? One to one question
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
  /* font-font-family  Helvetica futura bondoni */

  @media (min-width: 768px) {
    width: 170px;
    height: 46px;
    font-size: 16px;
  }
`;
