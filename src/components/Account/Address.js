import React from "react";
import { useLocation } from "react-router-dom";

const Address = () => {
  const location = useLocation();
  const userData = location.state;
  console.log(userData);
  return <div></div>;
};

export default Address;
