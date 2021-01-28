import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { userLogout } from "../reducers/user";

export const LogoutBox = () => {
  const username = useSelector(store => store.user.login.username);
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <LogoutContainer>
      {username && <h3>{username}</h3>}

      {isLoggedIn && <button onClick={() => handleLogout()}>logout</button>}
    </LogoutContainer>
  );
};

const LogoutContainer = styled.p`
  border: 1px solid #3f39fc;
  height: 90px;
  width: 90px;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
