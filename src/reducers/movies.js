import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";

const initialState = {
  movies: [],
};

export const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchMovies: (store, action) => {
      store.movies = action.payload;
    },
  },
});

export const searchResults = (searchText) => {
  return (dispatch) => {
    dispatch(movies.actions.setSearchMovies([]));
    dispatch(ui.actions.setLoading(true));
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&query=${searchText}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(movies.actions.setSearchMovies(json.results));
        dispatch(ui.actions.setLoading(false));
      });
  };
};
