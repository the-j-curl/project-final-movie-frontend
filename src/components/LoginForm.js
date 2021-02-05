import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // To login a user.
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <Wrapper>
      <Form>
        <label>
          Username
          <input
            required
            type="text"
            minLength="2"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </Form>
      <Link to="/signup">
        <button type="submit">Not a member?</button>
      </Link>
      {isLoading && <p>Logging in...</p>}
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Wrapper>
  );
};
export default LoginForm;

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
