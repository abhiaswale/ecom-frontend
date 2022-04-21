import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../Context/auth-context";

const Account = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      Account
      <div>
        <nav>
          <NavLink
            to="/profile/details"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/profile/address"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Address
          </NavLink>
          <NavLink
            to="/profile/setting"
            className={({ isActive }) => (isActive ? "text-lg" : "text-sm")}
          >
            Setting
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
