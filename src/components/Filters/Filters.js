import React, { useState } from "react";

const Filters = (props) => {
  const categoryFilters = [
    { id: 1, name: "Mobile Phone", type: "category" },
    { id: 2, name: "Laptop", type: "category" },
    { id: 3, name: "Camera", type: "category" },
  ];
  const brandFilters = [
    { id: "b1", name: "Apple", type: "brand" },
    { id: "b2", name: "Samsung", type: "brand" },
  ];

  const [filtering, setFiltering] = useState(false);
  const [checked, setChecked] = useState([]);
  const [bChecked, setBChecked] = useState([]);
  const [fProd, setFProd] = useState([]);

  let filteredProducts = [];

  const filterHandler = (id, type) => {
    setFiltering(true);
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const brandfilterHandler = (id, type) => {
    setFiltering(true);
    const currentIndex = bChecked.indexOf(id);
    const newChecked = [...bChecked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    if (checked.length > 0) {
      setBChecked(newChecked);
    }
  };

  if (filtering) {
    console.log(checked);
    filteredProducts = props.products.filter((product) => {
      if (
        checked.includes(product.productCategory) ||
        checked.includes(product.productBrand)
      ) {
        return product;
      }

      return null;
    });
    console.log(filteredProducts); //logs the filtered products
    setFProd(filteredProducts); //too many re-renders error
    setFiltering(false);
  }

  if (filtering) {
    if (checked.length > 0 && bChecked.length > 0) {
      const prods = [...fProd];
      filteredProducts = prods.filter((p) => {
        if (
          checked.includes(p.productCategory) &&
          bChecked.includes(p.productBrand)
        ) {
          console.log(p);
          return p;
        } else if (bChecked.includes(p.productBrand)) {
          return p;
        }
        return null;
      });
      setFProd(filteredProducts);
      setFiltering(false);
    }
  }

  if (fProd.length > 0) {
    console.log(fProd);
  }

  let content;
  if (props.products) {
    content = (
      <div className="grid grid-cols-2">
        {props.products.map((prod) => (
          <div key={prod._id}>
            <h1>{prod.productName}</h1>
            <span>{prod.productPrice}</span>
            <img src={prod.productImage} className="w-60"></img>
          </div>
        ))}
      </div>
    );
  }

  if (fProd.length > 0) {
    content = (
      <div className="grid grid-cols-2">
        {fProd.map((prod) => (
          <div key={prod._id}>
            <h1>{prod.productName}</h1>
            <span>{prod.productPrice}</span>
            <img src={prod.productImage} className="w-60"></img>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <section>
        <h1>CATEGORY</h1>
        {categoryFilters.map((value, index) => (
          <div key={index}>
            <label>{value.name}</label>
            <input
              type="checkbox"
              onChange={() => {
                filterHandler(value.name, value.type);
              }}
              // checked={checked.indexOf(value.name) === -1 ? false : true}
            ></input>
          </div>
        ))}
      </section>
      <section>
        <h1>BRAND</h1>
        {brandFilters.map((value, index) => (
          <div key={index}>
            <label>{value.name}</label>
            <input
              type="checkbox"
              onChange={() => {
                brandfilterHandler(value.name, value.type);
              }}
            ></input>
          </div>
        ))}
      </section>

      <div>{content}</div>
    </div>
  );
};

export default Filters;
