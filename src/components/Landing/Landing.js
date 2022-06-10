import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/ecom.jpg";
import Logo from "../Assets/L1.png";
import Navigation from "../Navigation/Navigation";
import Divider from "@mui/material/Divider";

import Mobile from "../Assets/Categories/Mobile.jpg";
import Laptop from "../Assets/Categories/Laptop.jpg";
import Watch from "../Assets/Categories/watch.jpg";
import Headphones from "../Assets/Categories/Headphones.jpg";

import samsung from "../Assets/Brands/samsung.png";
import apple from "../Assets/Brands/apple.png";
import dell from "../Assets/Brands/dell.png";
import asus from "../Assets/Brands/asus.jpg";
import Layout from "../Layout/Layout";

const Landing = () => {
  const navigate = useNavigate();

  const filterHandler = (id, type) => {
    const detail = {
      id: id,
      type: type,
    };
    console.log("Called");
    navigate("/shop", { state: detail });
  };

  const categoriesArray = [
    {
      background: Mobile,
      name: "Mobile",
    },
    {
      background: Laptop,
      name: "Laptop",
    },
    {
      background: Headphones,
      name: "Headphone",
    },
    {
      background: Watch,
      name: "Watch",
    },
  ];

  const brandsArray = [
    {
      background: samsung,
      name: "Samsung",
    },
    {
      background: apple,
      name: "Apple",
    },
    {
      background: dell,
      name: "Dell",
    },
    {
      background: asus,
      name: "Asus",
    },
  ];

  return (
    <Layout>
      {/* <Navigation /> */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover w-full h-[55vh]"
      >
        <img src={Logo} className="inline h-16 my-6" />
        <h1 className="font-semibold text-6xl my-4">SUMMER SALE</h1>
        <h4 className="font-semibold  text-3xl">
          Upto<span className="font-bold text-5xl"> 70% Off</span> on Various
          products
        </h4>
        <button className="text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]">
          <Link to="/shop">Shop Now</Link>
        </button>
      </div>
      <section>
        <h1 className="text-5xl font-semibold mt-8">FEATURED CATEGORIES</h1>
        <div className="flex justify-center items-center my-2">
          <Divider
            sx={{
              borderBottomWidth: 5,
              backgroundColor: "#0E3EDA",
              width: "400px",
            }}
          />
        </div>
        <div className="flex justify-center items-center my-24">
          <div className="w-3/5 grid grid-cols-4 h-48 gap-8">
            {categoriesArray.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  filterHandler(item.name, "category");
                }}
                className="w-48 cursor-pointer relative transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl"
              >
                <img
                  src={item.background}
                  className="bg-cover w-full h-auto opacity-40 border-2 border-teal-500 rounded-xl absolute"
                ></img>

                <div className="font-bold absolute top-1/2 left-1/2 text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-5xl font-semibold">FEATURED BRANDS</h1>
        <div className="flex justify-center items-center my-2">
          <Divider
            sx={{
              borderBottomWidth: 5,
              backgroundColor: "#0E3EDA",
              width: "400px",
            }}
          />
        </div>
        <div className="flex justify-center items-center my-24">
          <div className="w-3/5 grid grid-cols-4 h-52 gap-8">
            {brandsArray.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  filterHandler(item.name, "brand");
                }}
                className="cursor-pointer relative transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl flex justify-center items-center"
              >
                <img
                  src={item.background}
                  className="bg-cover w-full h-auto absolute"
                ></img>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
