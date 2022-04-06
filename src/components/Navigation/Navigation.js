import React, { useContext } from "react";
import AuthContext from "../Context/auth-context";

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
          {!authCtx.isAuth && <p>Login</p>}
          {authCtx.isAuth && <button onClick={logoutHandler}>Logout</button>}
          <p>Wishlist</p>
          <p>Cart</p>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
