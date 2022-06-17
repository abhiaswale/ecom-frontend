import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CartContext = React.createContext({
  cartQuantity: 0,
  wishlistQuantity: 0,
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  addToWishlist: (id) => {},
  removeFromWishlist: (id) => {},
  cart: [],
  wishlist: [],
  snack: "",
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);
  const [wishlistquan, setWishlistQuan] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [snackbarContent, setSnackbar] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //WISHLIST
  const updateWishlist = () => {
    fetch("http://localhost:3000/user/wishlist", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setWishlistItems(data.data);
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        setWishlistQuan(count);
      });
  };

  const addItemToWishlist = (id) => {
    setSnackbar("Adding item to wishlist");
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetch(`http://localhost:3000/user/add-to-wishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setWishlistItems(data.data);
        updateWishlist();
        setSnackbar("Added Item to Wishlist");
        closeSnack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemFromWishlist = (id) => {
    setSnackbar("Removing item from wishlist");
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetch(`http://localhost:3000/user/remove-from-wishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setWishlistItems(data.data);
        updateWishlist();
        setSnackbar("Removed item from Wishlist");
        closeSnack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////SNACKBAR

  const closeSnack = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  ///////////////////CART

  const updateCart = () => {
    fetch("http://localhost:3000/user/cart", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setCartItems(data.data);
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        setQuan(count);
      });
  };

  const addItemToCart = (id) => {
    setSnackbar("Adding item to the cart");
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
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
        setSnackbar("Added Item to cart");
        closeSnack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemFromCart = (id) => {
    setSnackbar("Removing Item from the cart");
    setOpen(true);
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
        setSnackbar("Removed Item from the cart");
        closeSnack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateCart();
      updateWishlist();
    }
  }, []);

  const contextValue = {
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
    cartQuantity: quan,
    cart: cartItems,
    ////////////////////////
    addToWishlist: addItemToWishlist,
    removeFromWishlist: removeItemFromWishlist,
    wishlistQuantity: wishlistquan,
    wishlist: wishlistItems,
    ////////////////////////
    snack: snackbarContent,
    open: open,
    setOpen: closeSnack,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
