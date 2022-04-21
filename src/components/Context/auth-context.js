import React, { useState } from "react";
const AuthContext = React.createContext({
  token: null,
  userId: null,
  isAuth: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const initialUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(initialUserId);
  let isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const userIdHandler = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    isLoggedIn = false;
  };

  const contextValue = {
    token: token,
    userId: userId,
    userHandler: userIdHandler,
    isAuth: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
