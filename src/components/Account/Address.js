import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../Context/auth-context";

const Address = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const userData = location.state.details;
  console.log(userData.user.addresses);
  const [addresses, setAddresses] = useState(userData.user.addresses);

  const addAddress = () => {
    fetch("http://localhost:3000/user/add-address", {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };
  return (
    <div>
      {addresses.map((i) => (
        <p>{i.Name}</p>
      ))}
    </div>
  );
};

export default Address;
