import React, { useEffect, useState } from "react";
import Filters from "../Filters/Filters";

const Shop = () => {
  const [products, setProducts] = useState("");
  //Get the Products
  useEffect(() => {
    fetch("http://localhost:3000/get-products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let content;
  if (products) {
    content = (
      <div className="grid grid-cols-2">
        {products.map((prod) => (
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
      {products && <Filters products={products} />}
      {/* <div>{content}</div> */}
    </div>
  );
};

export default Shop;
