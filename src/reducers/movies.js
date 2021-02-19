import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

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
  const MOVIE_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`;

  return dispatch => {
    dispatch(movies.actions.setSearchMovies([]));
    dispatch(ui.actions.setLoading(true));
    fetch(MOVIE_SEARCH_URL)
      .then(res => res.json())
      .then(json => {
        dispatch(movies.actions.setSearchMovies(json.results));
        dispatch(ui.actions.setLoading(false));
      });
  };
};

export const movieCategoryResults = category => {
  const MOVIE_CATEGORY_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;

  return dispatch => {
    dispatch(ui.actions.setLoading(true));
    fetch(MOVIE_CATEGORY_URL)
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
