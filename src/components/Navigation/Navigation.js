import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import CartContext from "../Context/cart-context";
import EComLogo from "../Assets/L1.png";
import SearchBar from "./SearchBar";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartContext.cartQuantity);
  });

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <div className="h-16 bg-[#0E3EDA] flex justify-around items-center ">
        <nav className="flex justify-center items-center">
          <Link to="">
            <img src={EComLogo} className="h-10 w-32"></img>
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white mx-6" : "mx-6"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "text-white" : "")}
          >
            Shop Now
          </NavLink>
        </nav>

        <span className="w-96">
          {/* <input placeholder="Search" className="" /> */}
          <SearchBar />
        </span>

        <section className="flex justify-evenly items-center flex-row">
          {authCtx.isAuth && <button onClick={logoutHandler}>Logout</button>}
          <Link to="/account" className="text-lg">
            <AccountCircleIcon className="text-lg" />
            {authCtx.isAuth && <p className="text-sm">Hi,{authCtx.userName}</p>}
            {!authCtx.isAuth && <p className="text-sm">Login</p>}
          </Link>
          <Badge badgeContent={authCtx.isAuth ? count : 0} color="primary">
            <Link to="/profile/wishlist">
              <FavoriteIcon />
              <p>Wishlist</p>
            </Link>
          </Badge>
          <Badge badgeContent={authCtx.isAuth ? count : 0} color="primary">
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
