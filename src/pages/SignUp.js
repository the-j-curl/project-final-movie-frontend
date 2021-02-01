import React from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignupForm from "../components/SignupForm";

export const SignUp = () => {
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  return (
    <Wrapper>
      <h1>Signup</h1>
      <SignupForm />
      {isLoggedIn && <Redirect to="/" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;
