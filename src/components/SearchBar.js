import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import styled from "styled-components/macro";

import { searchResults } from "../reducers/movies";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const searchMovieResults = useSelector(store => store.movies.movies);
  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchMovie = event => {
    event.preventDefault();
    dispatch(searchResults(searchText));
    setSearchText("");
  };

  // Toggle search visibility
  const toggleSearchInput = () => setShowSearchInput(!showSearchInput);

  return (
    <>
      <SearchForm onSubmit={handleSearchMovie}>
        <SearchIconButton type="button" onClick={toggleSearchInput}>
          <SearchIcon />
        </SearchIconButton>
        <SearchMovieInput
          type="text"
          placeholder="Search movie..."
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          required
          showSearchInput={showSearchInput}
        />
      </SearchForm>
      {searchMovieResults.length > 0 ? (
        <Redirect to="/search" />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const SearchForm = styled.form`
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    position: absolute;
    right: 6px;
    top: 10px;
  }

  @media (min-width: 1024px) {
    position: unset;
  }
`;

const SearchIconButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

const SearchIcon = styled(GoSearch)`
  color: gray;
  font-size: 32px;
`;

const SearchMovieInput = styled.input`
  display: ${props => (props.showSearchInput === true ? "block" : "none")};
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid #3f39fc;
  padding: 0 8px;
  color: #fff;
  height: 30px;
  font-size: 16px;
  padding: 2px;
  ::placeholder {
    font-weight: 500;
  }

  :focus {
    border-bottom: 2px solid #fff;
    transition: all 0.3s ease-in;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    display: block;
    ::placeholder {
      font-size: 18px;
    }
  }
`;
