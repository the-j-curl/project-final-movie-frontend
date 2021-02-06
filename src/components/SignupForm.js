import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../reducers/user";
import { Form, Label, Input } from "./LoginForm";

const SignupForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.ui.isLoading);
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
    <Form onSubmit={event => handleSignup(event)}>
      <Label>
        Username:
        <Input
          required
          type="text"
          minLength="2"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </Label>
      <Label>
        Email:
        <Input
          required
          type="email"
          value={email}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={event => setEmail(event.target.value)}
        />
      </Label>
      <Label>
        Password:
        <Input
          required
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Label>
      <button type="submit">Sign-Up</button>
      <Link to="/login">
        <button>Already a member?</button>
      </Link>
      {isLoading && <p>Signing up...</p>}
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Form>
  );
};
export default SignupForm;
