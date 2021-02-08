import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    username: localStorage.username || "",
    isLoggedIn: localStorage.isLoggedIn || false,
    secretMessage: null,
    errorMessage: null,
    watchlist: [],
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
    setSecretMessage: (store, action) => {
      const { secretMessage } = action.payload;
      store.login.secretMessage = secretMessage;
    },
    setErrorMessage: (store, action) => {
      const { errorMessage } = action.payload;
      store.login.errorMessage = errorMessage;
    },
    setWatchlist: (store, action) => {
      const { watchlist } = action.payload;
      store.login.watchlist = watchlist;
    },
  },
});

// // Thunks
// // Signup
// export const signup = (username, email, password) => {
//   // const SIGNUP_URL = "http://localhost:8080/users";
//   const SIGNUP_URL = "https://final-project-moviedb.herokuapp.com/users";
//   return dispatch => {
//     dispatch(user.actions.setErrorMessage({ errorMessage: null }));
//     dispatch(ui.actions.setLoading(true));
//     fetch(SIGNUP_URL, {
//       method: "POST",
//       body: JSON.stringify({ username, email, password }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error("Could not create account. Username already exists.");
//         }
//         return res.json();
//       })
//       .then(json => {
//         dispatch(
//           user.actions.setLoginStatus({
//             accessToken: json.accessToken,
//             userId: json.userId,
//             username: json.username,
//             isLoggedIn: true,
//           })
//         );
//         dispatch(user.actions.setErrorMessage({ errorMessage: null }));
//         dispatch(ui.actions.setLoading(false));
//       })
//       .catch(err => {
//         dispatch(userLogout());
//         dispatch(user.actions.setErrorMessage({ errorMessage: err }));
//         dispatch(ui.actions.setLoading(false));
//       });
//   };
// };

// // Login
// export const login = (username, password) => {
//   // const LOGIN_URL = "http://localhost:8080/sessions";
//   const LOGIN_URL = "https://final-project-moviedb.herokuapp.com/sessions";
//   return dispatch => {
//     dispatch(user.actions.setErrorMessage({ errorMessage: null }));
//     dispatch(ui.actions.setLoading(true));
//     fetch(LOGIN_URL, {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error("Incorrect username and/or password");
//       })
//       .then(json => {
//         dispatch(
//           user.actions.setLoginStatus({
//             accessToken: json.accessToken,
//             userId: json.userId,
//             username: json.username,
//             isLoggedIn: true,
//           })
//         );
//         dispatch(user.actions.setErrorMessage({ errorMessage: null }));
//         dispatch(ui.actions.setLoading(false));
//       })
//       .catch(err => {
//         dispatch(userLogout());
//         dispatch(user.actions.setErrorMessage({ errorMessage: err }));
//         dispatch(ui.actions.setLoading(false));
//       });
//   };
// };

// // SecretMesssage
// export const getSecretMessage = () => {
//   // const USERS_URL = "http://localhost:8080/users";
//   const USERS_URL = "https://final-project-moviedb.herokuapp.com/users";
//   return (dispatch, getState) => {
//     const accessToken = getState().user.login.accessToken;
//     const userId = getState().user.login.userId;
//     fetch(`${USERS_URL}/${userId}/secret`, {
//       method: "GET",
//       headers: { Authorization: accessToken },
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error(
//           "Could not get information. Make sure you are logged in and try again."
//         );
//       })
//       .then(json => {
//         dispatch(
//           user.actions.setSecretMessage({
//             secretMessage: JSON.stringify(json.secretMessage),
//           })
//         );
//       })
//       .catch(err => {
//         dispatch(user.actions.setErrorMessage({ errorMessage: err }));
//       });
//   };
// };

// // Logout
// export const userLogout = () => {
//   return dispatch => {
//     dispatch(
//       user.actions.setLoginStatus({
//         accessToken: null,
//         userId: null,
//         username: "",
//         isLoggedIn: false,
//       })
//     );
//     dispatch(user.actions.setErrorMessage({ errorMessage: null }));
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("username");
//     localStorage.removeItem("isLoggedIn");
//   };
// };
