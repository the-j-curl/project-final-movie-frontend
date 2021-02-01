import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { CheckIcon } from "./CheckIcon";

export const SmallWatchlistButton = ({ movieId, onUpdateWatchlist }) => {
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
  @media (min-width: 768px) {
    top: 2px;
    left: 2px;
  }
`;
