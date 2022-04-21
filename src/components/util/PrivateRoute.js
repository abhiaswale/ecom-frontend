import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../Context/auth-context";

export const PrivateRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  console.log(token);
  if (token) {
    return children;
  }
  return <Navigate replace to="/login" />;
};