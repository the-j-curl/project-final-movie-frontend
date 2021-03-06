import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import { LoginForm } from "../components/LoginForm";
import { Heading } from "../components/ScrollLane";

export const Login = () => {
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);

  return (
    <FormWrapper>
      <Heading>Login</Heading>
      <LoginForm />
      {isLoggedIn && <Redirect to="/" />}
    </FormWrapper>
  );
};

export const FormWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
