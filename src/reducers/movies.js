import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";

const initialState = {
  movies: {
    searchMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    popularMovies: [],
  },
};

export const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchMovies: (store, action) => {
      store.movies.searchMovies = action.payload;
    },
    setNowPlayingMovies: (store, action) => {
      store.movies.nowPlayingMovies = action.payload;
    },
    setTopRatedMovies: (store, action) => {
      store.movies.topRatedMovies = action.payload;
    },
    setUpcomingMovies: (store, action) => {
      store.movies.upcomingMovies = action.payload;
    },
    setPopularMovies: (store, action) => {
      store.movies.popularMovies = action.payload;
    },
  },
});

export const searchResults = searchText => {
  return dispatch => {
    dispatch(movies.actions.setSearchMovies([]));
    dispatch(ui.actions.setLoading(true));
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&query=${searchText}&page=1&include_adult=false`
    )
      .then(res => res.json())
      .then(json => {
        dispatch(movies.actions.setSearchMovies(json.results));
        dispatch(ui.actions.setLoading(false));
      });
  };
};

export const movieCategoryResults = category => {
  return dispatch => {
    dispatch(ui.actions.setLoading(true));
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=5e0af1d18e77dbd12a3e994aa1316cbf&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(json => {
        if (category === "now_playing") {
          dispatch(movies.actions.setNowPlayingMovies(json.results));
        } else if (category === "top_rated") {
          dispatch(movies.actions.setTopRatedMovies(json.results));
        } else if (category === "upcoming") {
          dispatch(movies.actions.setUpcomingMovies(json.results));
        } else if (category === "popular") {
          dispatch(movies.actions.setPopularMovies(json.results));
        }
        dispatch(ui.actions.setLoading(false));
      });
  };
};
