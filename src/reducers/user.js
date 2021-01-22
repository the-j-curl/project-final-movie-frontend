import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    secretMessage: null,
    errorMessage: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
  },
});

// Thunks
// Signup
export const signup = (username, email, password) => {
  const SIGNUP_URL = "http://localhost:8080/users";
  return dispatch => {
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (!res.ok /* if not 200, 201, 204 */) {
          throw "Could not create account. Email already exists.";
        }

        // OK
        return res.json();
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// Login
export const login = (username, password) => {
  const LOGIN_URL = "http://localhost:8080/sessions";
  return dispatch => {
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (res.ok /* if 200, 201, 204 */) {
          return res.json();
        }

        // Not OK
        throw "Unable to sign in. Please check your username and password are correct";
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
      })
      .catch(err => {
        dispatch(logout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// SecretMesssage
export const getSecretMessage = () => {
  // const USERS_URL = 'http://localhost:8080/users';
  const USERS_URL = "https://auth-by-ylva-tara.herokuapp.com/users";
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw "Could not get information. Make sure you are logged in and try again.";
      })
      .then(json => {
        dispatch(
          user.actions.setSecretMessage({
            secretMessage: JSON.stringify(json.secretMessage),
          })
        );
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// Logout
export const logout = () => {
  return dispatch => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }));
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  };
};
