import React, { useState, useEffect } from "react";
const CartContext = React.createContext({
  cartQuantity: 0,
  wishlistQuantity: 0,
  updateCartQuan: () => {},
  updateWishlistQuan: () => {},
  addToCart: (id) => {},
  cart: [],
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);
  const [wishlistquan, setWishlistQuan] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const updateCart = () => {
    fetch("http://localhost:3000/user/cart", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        setQuan(count);
      });
  };

  const updateWishlist = () => {
    fetch("http://localhost:3000/user/wishlist", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        setWishlistQuan(count);
      });
  };

  const addtoCartHandler = (id) => {
    fetch(`http://localhost:3000/user/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: localStorage.getItem("token") },
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.data.items);
        updateCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateCart();
    updateWishlist();
  }, []);

  const contextValue = {
    cartQuantity: quan,
    updateCartQuan: updateCart,
    wishlistQuantity: wishlistquan,
    updateWishlistQuan: updateWishlist,
    addtoCart: addtoCartHandler,
    cartItems: cartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
