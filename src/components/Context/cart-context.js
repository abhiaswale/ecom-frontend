import React, { useState, useEffect } from "react";
const CartContext = React.createContext({
  cartQuantity: 0,
  wishlistQuantity: 0,
  updateCartQuan: () => {},
  updateWishlistQuan: () => {},
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  cart: [],
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);
  const [wishlistquan, setWishlistQuan] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const getWishlistItems = () => {
    fetch("http://localhost:3000/user/wishlist", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("wishlist", data.data);
        setWishlistItems(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCart = () => {
    console.log("cart called");
    fetch("http://localhost:3000/user/cart", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCartItems(data.data);
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateCart();
      updateWishlist();
    }
  }, []);

  const addItemToCart = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("called");
        setCartItems(data.data.items);
        updateCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemFromCart = (id) => {
    fetch(`http://localhost:3000/user/delete-from-cart/${id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.data.items);
      })
      .then(() => {
        updateCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextValue = {
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
    cartQuantity: quan,
    updateCartQuan: updateCart,
    wishlistQuantity: wishlistquan,
    updateWishlistQuan: updateWishlist,
    cart: cartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
