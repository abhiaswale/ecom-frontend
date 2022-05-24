import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";

const Account = () => {
  const authCtx = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
        console.log(userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navigation />
      <div className="flex flex-row">
        <nav className="flex flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/account/orders"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/account/address"
            state={{ details: userDetails }}
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
          >
            Address
          </NavLink>
          <NavLink
            to="/account/setting"
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
