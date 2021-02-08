import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../reducers/user";
import {
  Form,
  Label,
  Input,
  InputWrapper,
  IconButton,
  OpenEye,
  ClosedEye,
  ButtonWrapper,
  LoginText,
  FormMessage,
  HR,
} from "./LoginForm";
import { NavButton } from "./NavBar";

const SignupForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.ui.isLoading);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkPasswordMatch = () => {
    if (password === confirmPassword) {
      setPasswordMatch(true);
      return true;
    } else {
      setPasswordMatch(false);
      return false;
    }
  };

  // To sign up a user.
  const handleSignup = event => {
    event.preventDefault();
    if (checkPasswordMatch()) {
      dispatch(signup(username, email, password));
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Toggle confirm password visibility
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Form onSubmit={event => handleSignup(event)}>
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
      <Label htmlFor="email">Email:</Label>
      <InputWrapper>
        <Input
          required
          id="email"
          type="email"
          value={email}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={event => setEmail(event.target.value)}
        />
      </InputWrapper>
      <Label htmlFor="password">Password:</Label>
      <InputWrapper>
        <Input
          required
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <IconButton type="button" onClick={toggleShowPassword}>
          {/* toggles */}
          {showPassword ? <ClosedEye /> : <OpenEye />}
        </IconButton>
      </InputWrapper>

      <Label>
        Confirm password:
        <InputWrapper>
          <Input
            required
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
          />
          <IconButton type="button" onClick={toggleShowConfirmPassword}>
            {/* toggles */}
            {showConfirmPassword ? <ClosedEye /> : <OpenEye />}
          </IconButton>
        </InputWrapper>
      </Label>
      <ButtonWrapper>
        <NavButton type="submit">Sign up</NavButton>
        <HR />
        <LoginText>Already a member?</LoginText>
        <Link to="/login">
          <NavButton type="submit">Log in</NavButton>
        </Link>
      </ButtonWrapper>
      {isLoading && <FormMessage>Signing up...</FormMessage>}
      {!passwordMatch && <FormMessage>Passwords do not match</FormMessage>}
      {errorMessage && <FormMessage>{`${errorMessage}`}</FormMessage>}
    </Form>
  );
};
export default SignupForm;
