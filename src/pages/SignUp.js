import React from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignupForm from "../components/SignupForm";
import { Heading } from "../components/ScrollLane";
import { FormWrapper } from "./Login";

export const SignUp = () => {
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);

  return (
    <FormWrapper>
      <Heading>Signup</Heading>
      <SignupForm />
      {isLoggedIn && <Redirect to="/" />}
    </FormWrapper>
  );
};
