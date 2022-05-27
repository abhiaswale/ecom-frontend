import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";

const Account = () => {
  return (
    <div>
      <Navigation />
      <span className="text-xxl">ACCOUNT</span>
      <div className="flex flex-row">
        <nav className="flex flex-col">
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
            end
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
