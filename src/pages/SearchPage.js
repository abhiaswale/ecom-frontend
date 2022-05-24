import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const SearchPage = () => {
  const location = useLocation();
  const searchItems = location.state;
  const searchResults = searchItems.data.data;
  const keyword = searchItems.searchItem;

  return (
    <>
      <Navigation />
      <p>Search Results for : {keyword}</p>
      {searchResults.length > 0 &&
        searchResults.map((item, index) => (
          <span key={index}>
            <p>{item.productCategory}</p>
            <p>{item.productName}</p>
            <p>{item.productPrice}</p>
          </span>
        ))}
      {searchResults.length <= 0 && <p>No products found</p>}
    </>
  );
};

export default SearchPage;
