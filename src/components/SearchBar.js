import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

import { searchResults } from "../reducers/movies";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState();
  const searchMovieResults = useSelector(store => store.movies.movies);

  const handleSearchMovie = event => {
    event.preventDefault();
    dispatch(searchResults(searchText));
    setSearchText("");
  };

  return (
    <>
      <form onSubmit={handleSearchMovie}>
        <SearchMovieInput
          type="text"
          placeholder="Search movie..."
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          required
        />
      </form>
      {searchMovieResults.length > 0 ? (
        <Redirect to="/search" />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const SearchMovieInput = styled.input`
  background: none;
  border: 2px solid #fff;
  border-radius: 4px;
  color: #fff;
  height: 30px;
  font-size: 16px;
  padding: 2px;
  ::placeholder {
    font-weight: 500;
  }
`;
