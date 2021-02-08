import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

export const SearchBar = () => {
  const [searchMovie, setSearchMovie] = useState();
  const [searchResults, setSearchResults] = useState([]);
  // const handleSearchMovie = () => {
  //   useEffect(() => {
  //     handleSearchMovie();
  //   }, [searchMovie]);
  //   console.log(`search results: ${searchResults}`);
  // };
  return (
    // <form onSubmit={handleSearchMovie()}>
    <form>
      <SearchMovieInput
        type="text"
        placeholder="Search movie..."
        value={searchMovie}
        onChange={event => setSearchMovie(event.target.value)}
      />
    </form>
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
