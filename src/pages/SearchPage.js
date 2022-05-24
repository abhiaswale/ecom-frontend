import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const SearchPage = () => {
  const location = useLocation();
  const searchItems = location.state;
  console.log(searchItems);
  return (
    <>
      <Navigation />
      {}
    </>
  );
};

export default SearchPage;
