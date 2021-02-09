import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    username: localStorage.username || "",
    isLoggedIn: localStorage.isLoggedIn || false,
    errorMessage: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoginStatus: (store, action) => {
      const { accessToken, userId, username, isLoggedIn } = action.payload;
      store.login.accessToken = accessToken;
      store.login.userId = userId;
      store.login.username = username;
      store.login.isLoggedIn = isLoggedIn;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", isLoggedIn);
    },
    setErrorMessage: (store, action) => {
      const { errorMessage } = action.payload;
      store.login.errorMessage = errorMessage;
    },
  },
});

// Thunks
// Signup
export const signup = (username, email, password) => {
  // const SIGNUP_URL = "http://localhost:8080/users";
  const SIGNUP_URL = "https://final-project-moviedb.herokuapp.com/users";
  return dispatch => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(ui.actions.setLoading(true));
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not create account. Username already exists.");
        }
        return res.json();
      })
      .then(json => {
        dispatch(
          user.actions.setLoginStatus({
            accessToken: json.accessToken,
            userId: json.userId,
            username: json.username,
            isLoggedIn: true,
          })
        );
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(err => {
        dispatch(userLogout());
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
        dispatch(ui.actions.setLoading(false));
      });
  };
};

// Login
export const login = (username, password) => {
  // const LOGIN_URL = "http://localhost:8080/sessions";
  const LOGIN_URL = "https://final-project-moviedb.herokuapp.com/sessions";
  return dispatch => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(ui.actions.setLoading(true));
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Incorrect username and/or password");
      })
      .then(json => {
        dispatch(
          user.actions.setLoginStatus({
            accessToken: json.accessToken,
            userId: json.userId,
            username: json.username,
            isLoggedIn: true,
          })
        );
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(ui.actions.setLoading(false));
      })
      .catch(err => {
        dispatch(userLogout());
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
        dispatch(ui.actions.setLoading(false));
      });
  };
};

// Logout
export const userLogout = () => {
  return dispatch => {
    dispatch(
      user.actions.setLoginStatus({
        accessToken: null,
        userId: null,
        username: "",
        isLoggedIn: false,
      })
    );
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
  };
};
