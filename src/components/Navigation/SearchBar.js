import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "Mobile",
  "Laptop",
  "Camera",
  "Samsung",
  "Apple",
  "Lenovo",
];

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggest, setSuggest] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();
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
              key={item}
              className="cursor-pointer"
              onClick={(e) => {
                inputRef.current.value = item;
                submitHandler(e);
              }}
            >
              {item}
            </li>
          ))}
      </ul>
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit called");
    fetch(`http://localhost:3000/search?searchTerm=${inputRef.current.value}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const searchData = {
          data: data,
          searchItem: inputRef.current.value,
        };
        navigate("/search", { state: searchData });
      });
  };

  return (
    <>
      <input
        className="w-full"
        type="text"
        onChange={changeHandler}
        ref={inputRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            submitHandler();
          }
        }}
      ></input>
      {searchItem && getSuggestions()}
      <button onClick={submitHandler} type="submit">
        Search
      </button>
    </>
  );
};

export default SearchBar;
