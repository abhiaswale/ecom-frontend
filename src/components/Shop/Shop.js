import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../Filters/Filters";
import Navigation from "../Navigation/Navigation";
import Prod from "../Prod";

const Shop = () => {
  const location = useLocation();
  const filterId = location.state;
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
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      {products && <Filters products={products} fId={filterId} />}
      {/* <div>{content}</div> */}
      {/* <Prod /> */}
    </div>
  );
};

export default Shop;
