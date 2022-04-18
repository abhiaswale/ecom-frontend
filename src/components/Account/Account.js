import React, { useContext } from "react";
import AuthContext from "../Context/auth-context";

const Account = () => {
  const authCtx = useContext(AuthContext);
  return <div>Account</div>;
};

export default Account;
