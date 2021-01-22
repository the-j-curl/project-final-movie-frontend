import React from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignupForm from "../components/SignupForm";

const SignUp = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  return (
    <Wrapper>
      <h1>Signup</h1>
      <SignupForm />
      {accessToken && <Redirect to="/" />}
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
