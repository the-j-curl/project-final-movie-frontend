import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

import { login } from "../reducers/user";
import { NavButton } from "./NavBar";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.ui.isLoading);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // To login a user.
  const handleLogin = event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Form onSubmit={handleLogin}>
      <Label htmlFor="username">Username:</Label>
      <InputWrapper>
        <Input
          required
          id="username"
          type="text"
          minLength="2"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </InputWrapper>
      <Label htmlFor="password">Password:</Label>
      <InputWrapper>
        <Input
          id="password"
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <IconButton type="button" onClick={toggleShowPassword}>
          {/* toggles */}
          {showPassword ? <ClosedEye /> : <OpenEye />}
        </IconButton>
      </InputWrapper>
      <ButtonWrapper>
        <NavButton type="submit">Log in</NavButton>
        <HR />
        <LoginText>Not a member?</LoginText>
        <Link to="/signup">
          <NavButton type="submit">Sign up</NavButton>
        </Link>
      </ButtonWrapper>
      {isLoading && <FormMessage>Logging in...</FormMessage>}
      {errorMessage && <FormMessage>{`${errorMessage}`}</FormMessage>}
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
  font-size: 18px;
  font-weight: 600;
  width: 100%;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const Input = styled.input`
  background: none;
  height: 40px;
  width: 100%;
  border: none;
  color: #fff;
  font-size: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  border: 2px solid #fff;
  border-radius: 4px;
  width: 300px;
  margin: 3px 0 6px 0;

  @media (min-width: 375px) {
    margin: 8px 0 16px 0;
  }

  @media (min-width: 1024px) {
    margin: 10px 0 20px 0;
  }
`;

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const ClosedEye = styled(FiEyeOff)`
  color: #fff;
  font-size: 22px;
`;

export const OpenEye = styled(FiEye)`
  color: #fff;
  font-size: 22px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HR = styled.hr`
  color: #fff;
  margin-top: 20px;
  width: 100%;
  font-size: 20px;
`;

export const LoginText = styled.p`
  font-weight: 600;
  width: max-content;
`;

export const FormMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
