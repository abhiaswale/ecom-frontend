import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";

const Account = () => {
  return (
    <>
      <Navigation />
      <div className="text-3xl p-4 my-4 font-semibold">ACCOUNT</div>
      <div className=" my-4 border-b-[1px] border-indigo-500 mx-80"></div>
      <div className="flex justify-center items-center flex-row">
        <div className="grid grid-cols-20/80 divide-x divide-indigo-500  w-1/2">
          <nav className="grid grid-cols-1 divide-y divide-indigo-500 w-auto font-semibold">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
              end
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/account/address"
              className={({ isActive }) =>
                isActive ? " font-bold" : " font-thin"
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
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
