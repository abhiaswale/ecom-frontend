import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";

const Account = () => {
  return (
    <>
      <Navigation />
      <div className="text-3xl p-4 my-4 font-semibold">ACCOUNT</div>
      <div className="border-b-[1px] border-indigo-500 mx-80"></div>
      <div className="flex justify-center items-center flex-row">
        <div className="grid grid-cols-20/80 divide-x divide-indigo-500 w-3/5">
          <nav className=" px-4 grid grid-cols-1 divide-y divide-indigo-500 w-auto font-semibold text-xl h-auto">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
              end
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/account/address"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
            >
              Address
            </NavLink>
            <NavLink
              to="/account/setting"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
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
