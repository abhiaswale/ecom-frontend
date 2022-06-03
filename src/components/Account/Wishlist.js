import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const authCtx = useContext(AuthContext);
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
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      {wishlist && wishlist.map((w) => <p>{w.productId.productName}</p>)}
    </div>
  );
};

export default Wishlist;
