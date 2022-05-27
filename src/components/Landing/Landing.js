import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/ecom.jpg";
import Logo from "../Assets/L1.png";
import Navigation from "../Navigation/Navigation";
import Divider from "@mui/material/Divider";

const Landing = () => {
  const navigate = useNavigate();

  const filterHandler = (id) => {
    navigate("/shop", { state: id });
  };
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
          <div className="w-4/5 grid grid-cols-4 h-52 gap-8">
            <div className="relative">
              <div
                style={{ backgroundImage: `url(${bg})` }}
                className="w-full h-full opacity-60 absolute hover:tr"
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full text-center"
                onClick={() => {
                  filterHandler("Mobile Phone");
                }}
              >
                Mobile Phone
              </div>
            </div>
            <div className="relative">
              <div
                style={{ backgroundImage: `url(${bg})` }}
                className="w-full h-full opacity-60 absolute"
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full"
                onClick={() => {
                  filterHandler("Mobile Phone");
                }}
              >
                Mobile Phone
              </div>
            </div>
            <div className="relative">
              <div
                style={{ backgroundImage: `url(${bg})` }}
                className="w-full h-full opacity-60 absolute"
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full "
                onClick={() => {
                  filterHandler("Mobile Phone");
                }}
              >
                Mobile Phone
              </div>
            </div>
            <div className="relative">
              <div
                style={{ backgroundImage: `url(${bg})` }}
                className="w-full h-full opacity-60 absolute"
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full"
                onClick={() => {
                  filterHandler("Mobile Phone");
                }}
              >
                Mobile Phone
              </div>
            </div>
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
        <div>
          <div className="grid grid-cols-4">
            <div>Brand 1</div>
            <div>Brand 2</div>
            <div>Brand 3</div>
            <div>Brand 4</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
