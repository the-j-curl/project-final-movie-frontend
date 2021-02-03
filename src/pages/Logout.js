import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userLogout } from "../reducers/user";

export const Logout = () => {
  const isLoggedIn = useSelector(store => store.user.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return <>{!isLoggedIn && <Redirect to="/" />}</>;
};
