import { Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const [showS, setshowS] = useState(false);
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
      {showS && (
        <Snackbar
          open={showS}
          autoHideDuration={6000}
          message="Note archived"
        />
      )}
      <button
        onClick={() => {
          setshowS(!showS);
        }}
      >
        Show snackbar
      </button>
      {wishlist && wishlist.map((w) => <p>{w.productId.productName}</p>)}
    </div>
  );
};

export default Wishlist;
