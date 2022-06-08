import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import CartContext from "../Context/cart-context";
import Filters from "../Filters/Filters";
import Navigation from "../Navigation/Navigation";
import Prod from "../Prod";

const Shop = () => {
  const location = useLocation();
  // console.log(location.state);
  const filterId = location.state;
  const [products, setProducts] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [fP, setfP] = useState([]);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  //Get the Products
  useEffect(() => {
    fetch("http://localhost:3000/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getWishlist();
  }, []);

  const getWishlist = () => {
    fetch("http://localhost:3000/user/wishlist", {
      method: "GET",
      headers: {
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("wishlist", data.data);
        setWishlist(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Temp = () => {
    const prod = [...products];
    prod.forEach((p) => {
      let updatedItem;
      wishlist.forEach((e) => {
        const index = prod.findIndex((i) => p._id === i._id);
        if (e.productId._id === p._id) {
          console.log("match", index);
          updatedItem = { ...p, wishlist: true };
          prod[index] = updatedItem;
          console.log(prod[index]); //Ithe wishlist true set ae for each product in wishlist
        } else if (e.productId._id !== p._id) {
          console.log(" no match", index);
          updatedItem = { ...p, wishlist: false };
          prod[index] = updatedItem;
        }
      });
    });
    console.log(prod); // ithe sagle false set hotay except for the lastest product added in the wishlist
    setfP(prod);
  };
  useEffect(() => {
    if (wishlist && wishlist.length > 0 && products.length > 0) {
      Temp();
    }
  }, [wishlist, products]);

  const addtoCartHandler = (id) => {
    fetch(`http://localhost:3000/user/add-to-cart/${id}`, {
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
        <Filters
          products={products}
          wishlistProds={fP}
          fId={filterId}
          onAdd={addtoCartHandler}
          wishlist={wishlist}
        />
      )}
    </div>
  );
};

export default Shop;
