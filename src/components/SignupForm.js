import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../reducers/user";

const SignupForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // To sign up a user.
  const handleSignup = event => {
    event.preventDefault();
    dispatch(signup(username, email, password));
  };

  return (
    <Wrapper>
      <Form onSubmit={event => handleSignup(event)}>
        <label>
          Username
          <input
            required
            type="text"
            minLength="2"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            placeholder="E-mail address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Sign-Up</button>
      </Form>
      <Link to="/login">
        <button>Already a member?</button>
      </Link>
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Wrapper>
  );
};
export default SignupForm;

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
