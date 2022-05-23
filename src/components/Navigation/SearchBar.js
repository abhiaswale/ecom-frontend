import React, { useState } from "react";

const suggestions = ["Mobile", "Laptop", "Camera", "Samsung", "Apple"];

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggest, setSuggest] = useState([]);

  const changeHandler = (e) => {
    let array = [];
    setSearchItem(e.target.value);

    if (searchItem.length >= 2) {
      array = suggestions.filter((item) => {
        return item.toLowerCase().startsWith(searchItem.toLowerCase());
      });
    }
    console.log(array);
    setSuggest(array);
  };

  return (
    <>
      <input type="text" onChange={changeHandler} value={searchItem}></input>
      <ul>
        {suggest &&
          suggest.map((i) => {
            <li>{i}</li>;
          })}
      </ul>
    </>
  );
};

export default SearchBar;
