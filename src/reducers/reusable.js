import { user } from "./user";
import { ui } from "./ui";

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
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
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
        dispatch(getWatchlist());
        dispatch(ui.actions.setLoading(false));
      })
      .catch(err => {
        dispatch(userLogout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
        dispatch(ui.actions.setLoading(false));
      });
  };
};

// Get Watchlist
export const getWatchlist = () => {
  const USERS_URL = `https://final-project-moviedb.herokuapp.com/users`;
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    fetch(`${USERS_URL}/${userId}/watchlist`, {
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          "Could not get watchlist. Please log in and try again."
        );
      })
      .then(json => {
        dispatch(
          user.actions.setWatchlist({
            watchlist: json.userWatchlist,
          })
        );
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// Update Watchlist
export const updateWatchlist = (movieId, inWatchlist) => {
  const USERS_URL = `https://final-project-moviedb.herokuapp.com/users`;
  return (dispatch, getState) => {
    console.log(movieId);
    console.log(inWatchlist);
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    console.log(accessToken);
    console.log(userId);
    fetch(`${USERS_URL}/${userId}/watchlist`, {
      method: "PUT",
      body: JSON.stringify({ movieId, watchlist: inWatchlist }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Unable to update watchlist.");
      })
      .then(() => {
        dispatch(getWatchlist());
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// fetch(`${LIVE_URL}`, {
//     method: "PUT",
//     body: JSON.stringify({ movieId, watchlist: inWatchlist }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: accessToken,
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         setInWatchlist(inWatchlist);
//         onUpdateWatchlist();
//       }
//       return res.json();
//     })
//     .then((json) => {
//       if (json.error) {
//         throw Error(json.message);
//       }
//     })
//     .catch((error) => {
//       // This is our backend error
//       console.log(error);
//     });
// };

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
