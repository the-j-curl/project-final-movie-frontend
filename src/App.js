import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import styled from "styled-components/macro";

import { user } from "./reducers/user";
import { ui } from "./reducers/ui";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Watchlist } from "./pages/Watchlist";
import { MovieList } from "./pages/MovieList";
import { MoviePage } from "./pages/MoviePage";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { NotFound } from "./pages/NotFound";
import { Footer } from "./components/Footer";

const reducer = combineReducers({ user: user.reducer, ui: ui.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <MainWrapper>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/watchlist" exact component={Watchlist} />
            <Route path="/movielist/:category" exact component={MovieList} />
            <Route path="/movies/:id" exact component={MoviePage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </MainWrapper>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

const MainWrapper = styled.main`
  padding: 0 10px;
`;
