import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../Context/auth-context";

export const PrivateRoutes = ({ path, ...props }) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  console.log(token);
  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Route {...props} path={path} />

    // <Navigate replace to="/login" />
  );
};
