import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { ui } from "../reducers/ui";
import { Loading } from "../components/Loading";
import { ScrollLane } from "../components/ScrollLane";

export const Home = () => {
  const username = useSelector((store) => store.user.login.username);
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);

  const isLoading = useSelector((store) => store.ui.isLoading);
  const dispatch = useDispatch();

  const updateIsLoading = (updateValue) => {
    console.log("Is this happening");
    console.log(updateValue);
    dispatch(ui.actions.setLoading(updateValue));
  };

  // if (isLoading) {
  //   return <Loading />;
  // } else {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollLane
            category={"now_playing"}
            title={"Now playing"}
            updateIsLoading={(updateValue) => updateIsLoading(updateValue)}
          />
          <ScrollLane
            category={"top_rated"}
            title={"Top rated"}
            updateIsLoading={(updateValue) => updateIsLoading(updateValue)}
          />
          <ScrollLane
            category={"upcoming"}
            title={"Upcoming"}
            updateIsLoading={(updateValue) => updateIsLoading(updateValue)}
          />
          <ScrollLane
            category={"popular"}
            title={"Popular"}
            updateIsLoading={(updateValue) => updateIsLoading(updateValue)}
          />
        </>
      )}
    </>
  );
  // }
};
