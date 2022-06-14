import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import CartContext from "../Context/cart-context";
import Filters from "../Filters/Filters";
import Layout from "../Layout/Layout";
import LoadingSpinner from "../util/LoadingSpinner";

const Shop = () => {
  const location = useLocation();
  // console.log(location.state);
  const filterId = location.state;
  const [products, setProducts] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [fP, setfP] = useState([]);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  //Get the Products
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
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
        console.log("wishlist", data.data);
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
          updatedItem = { ...p, wishlist: true };
          prod[index] = updatedItem;
          console.log(prod[index]); //Ithe wishlist true set ae for each product in wishlist
        }
        // else {
        //   updatedItem = { ...p, wishlist: false };
        //   prod[index] = updatedItem;
        // }
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
    cartCtx.addToCart(id);
  };

  return (
    <Layout>
      {/* <div className="absolute lg:mt-[4rem] mt-[6rem]"> */}
      {Loading && <LoadingSpinner />}
      {products && fP && (
        <Filters
          products={products}
          wishlistProds={fP}
          fId={filterId}
          onAdd={addtoCartHandler}
          wishlist={wishlist}
        />
      )}
      {/* </div> */}
    </Layout>
  );
};

export default Shop;
