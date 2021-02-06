import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.ui.isLoading);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // To login a user.
  const handleLogin = event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <Form onSubmit={handleLogin}>
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
        Password:
        <Input
          required
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Label>
      <button type="submit">Login</button>
      <Link to="/signup">
        <button type="button">Not a member?</button>
      </Link>
      {isLoading && <p>Logging in...</p>}
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Form>
  );
};
export default LoginForm;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

export const Input = styled.input`
  background: none;
  height: 40px;
  width: 100%;
  border: 2px solid #fff;
  margin: 10px 0 20px 0;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
`;
