import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducers/user";
import Header from "./components/Header";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watchlist" exact component={Watchlist} />
          <Route path="/movielist/:category" exact component={MovieList} />
          <Route path="/movie/:id" exact component={MovieDetails} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};
