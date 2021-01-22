import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

const Home = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  return (
    <>
      <h1>Home page</h1>
      {accessToken && <h2>User is logged in: {accessToken}</h2>};
    </>
  );
};

export default Home;
