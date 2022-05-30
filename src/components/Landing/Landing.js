import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/ecom.jpg";
import Logo from "../Assets/L1.png";
import Navigation from "../Navigation/Navigation";
import Divider from "@mui/material/Divider";

const Landing = () => {
  const navigate = useNavigate();

  const filterHandler = (id) => {
    console.log("Called");
    navigate("/shop", { state: id });
  };

  const categoriesArray = [
    {
      background: bg,
      name: "Mobile",
    },
    {
      background: bg,
      name: "Laptop",
    },
    {
      background: bg,
      name: "Camera",
    },
    {
      background: bg,
      name: "Mobile",
    },
  ];

  const brandsArray = [
    {
      background: bg,
      name: "Samsung",
    },
    {
      background: bg,
      name: "Lenovo",
    },
    {
      background: bg,
      name: "Apple",
    },
    {
      background: bg,
      name: "Nikon",
    },
  ];
  return (
    <div>
      <Navigation />
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
        <h1 className="text-5xl font-semibold">FEATURED CATEGORIES</h1>
        <div className="flex justify-center items-center my-2">
          <Divider
            sx={{
              borderBottomWidth: 5,
              backgroundColor: "#0E3EDA",
              width: "400px",
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-3/5 grid grid-cols-4 h-52 gap-8">
            {categoriesArray.map((item) => (
              <div className="cursor-pointer relative transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl">
                <div
                  onClick={() => {
                    filterHandler(item.name);
                  }}
                  style={{ backgroundImage: `url(${item.background})` }}
                  className="w-full h-full opacity-60 absolute"
                ></div>

                <div className="absolute top-[40%] left-1/3 text-center">
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
        <div className="flex justify-center items-center">
          <div className="w-3/5 grid grid-cols-4 h-52 gap-8">
            {brandsArray.map((item) => (
              <div className="cursor-pointer relative transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl">
                <div
                  onClick={() => {
                    filterHandler(item.name);
                  }}
                  style={{ backgroundImage: `url(${item.background})` }}
                  className="w-full h-full opacity-60 absolute"
                ></div>

                <div className="absolute top-[40%] left-1/3 text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
