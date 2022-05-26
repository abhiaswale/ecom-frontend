import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import CartContext from "../Context/cart-context";
import Filters from "../Filters/Filters";
import Navigation from "../Navigation/Navigation";
import Prod from "../Prod";

const Shop = () => {
  const location = useLocation();
  const filterId = location.state;
  const [products, setProducts] = useState("");
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
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

  const addtoCartHandler = (id) => {
    fetch(`http://localhost:3000/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        cartCtx.updateCartQuan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navigation />
      {products && (
        <Filters products={products} fId={filterId} onAdd={addtoCartHandler} />
      )}
    </div>
  );
};

export default Shop;
