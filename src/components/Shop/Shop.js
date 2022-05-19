import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../Filters/Filters";
import Prod from "../Prod";

const Shop = () => {
  const location = useLocation();
  const filterId = location.state;

  // console.log(filterId);
  const [products, setProducts] = useState("");
  // const [cart, setCart] = useState({});

  // const getCartHandler = () => {
  //   fetch(`http://localhost:3000/cart`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setCart(data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
      {products && <Filters products={products} fId={filterId} />}
      {/* <div>{content}</div> */}
      {/* <Prod /> */}
    </div>
  );
};

export default Shop;
