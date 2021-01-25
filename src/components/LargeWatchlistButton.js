import React, { useState } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

const LargeWatchlistButton = ({ movieId }) => {
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [watchlist, setWatchlist] = useState(false);

  const CheckIcon = () => {
    return (
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    );
  };

  const handleToggleWatchlist = (userId) => {
    const TEST_URL = `http://localhost:8080/users/${userId}/watchlist`;
    const LIVE_URL = `https://final-project-moviedb.herokuapp.com/users/${userId}/watchlist`;

    fetch(TEST_URL, {
      method: "PUT",
      body: JSON.stringify({ movieId, watchlist: false }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw "Couldn't make changes to watchlist";
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <WatchlistButton onClick={() => handleToggleWatchlist(userId)}>
      <CheckIcon></CheckIcon> In my watchlist
    </WatchlistButton>
  );
};

export default LargeWatchlistButton;

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

const Icon = styled.svg`
  fill: none;
  stroke: #fff;
  stroke-width: 4px;
  background: blue;
  border-radius: 50%;
  width: 20px;
`;
