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
    setSuggest(array);
  };

  const getSuggestions = () => {
    if (suggest.length === 0) {
      return;
    }
    return (
      <ul>
        {suggest &&
          suggest.map((item) => (
            <li
              className="cursor-pointer"
              onClick={() => {
                setSearchItem(item);
                submitHandler();
                setSuggest([]);
              }}
            >
              {item}
            </li>
          ))}
      </ul>
    );
  };

  const submitHandler = (e) => {
    // e.preventDefault();
    console.log(searchItem);
    fetch(`http://localhost:3000/search?searchTerm=${searchItem}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={changeHandler} value={searchItem}></input>
        {searchItem && getSuggestions()}
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchBar;
