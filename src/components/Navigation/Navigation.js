import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import CartContext from "../Context/cart-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [count, setCount] = useState(cartContext.cartQuantity);

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <div className="h-16 bg-[#0E3EDA] flex justify-around items-center ">
        <section className="flex justify-center items-center">
          <span>
            <h3 className="font-bold text-lg">ECom.</h3>
            <p className="text-sm">Let's Design Together</p>
          </span>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-pink-700" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "text-pink-700" : "")}
          >
            Shop Now
          </NavLink>
        </section>
        <span className="w-24">
          <input placeholder="Search" />
        </span>
        <section className="flex justify-evenly items-center flex-row">
          {authCtx.isAuth && <button onClick={logoutHandler}>Logout</button>}
          <Link to="/profile" className="">
            <AccountCircleIcon />
            {authCtx.isAuth && <p>Hi,{authCtx.userName}</p>}
            {!authCtx.isAuth && <p>Login</p>}
          </Link>
          <Badge badgeContent={count} color="primary">
            <Link to="/profile/wishlist">
              <FavoriteIcon />
              <p>Wishlist</p>
            </Link>
          </Badge>
          <Badge badgeContent={count} color="primary">
            <Link to="/profile/cart">
              <ShoppingCartIcon />
              <p>Cart</p>
            </Link>
          </Badge>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
