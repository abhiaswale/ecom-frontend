import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <div className="h-16 bg-[#0E3EDA] flex justify-around items-center ">
        <section className="flex justify-center items-center">
          <h3>ECom.</h3>
          <p>Let's Design Together</p>
          <span className="w-24">
            <input placeholder="Search" />
          </span>
        </section>

        <section className="flex justify-evenly items-center">
          {authCtx.isAuth && (
            <Link to="/profile">
              <AccountCircleIcon />
            </Link>
          )}
          {!authCtx.isAuth && <Link to="/login">Login</Link>}
          {authCtx.isAuth && <button onClick={logoutHandler}>Logout</button>}

          {
            <section>
              <span>
                <Badge badgeContent={0} color="primary">
                  <Link to="/profile/wishlist">
                    <FavoriteIcon />
                  </Link>
                </Badge>
              </span>
              <span>
                <Badge badgeContent={0} color="primary">
                  <Link to="/profile/cart">
                    <ShoppingCartIcon />
                  </Link>
                </Badge>
              </span>
            </section>
          }
        </section>
      </div>
    </div>
  );
};

export default Navigation;
